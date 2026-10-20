"""
Proxy con caché hacia la API de WebMet (OHMC Córdoba) para los radares RMA11, RMA20 y RMA7.

SOLO hace falta si el navegador no puede consultar WebMet directo (error de CORS).
Con la caché, WebMet recibe como máximo 1 consulta cada 5 minutos por radar,
sin importar cuántos visitantes tenga tu página.

Instalación (Flask):
  1. Guardar este archivo como  modulos/radar_webmet.py
  2. En app_moisture.py agregar:
         from modulos.radar_webmet import radar_bp
         app.register_blueprint(radar_bp)
  3. Redesplegar.

Los tiles (imágenes) los sigue cargando el navegador directo desde WebMet;
este proxy solo sirve el JSON con la última observación.
"""
import threading
import time

import requests
from flask import Blueprint, Response, abort, jsonify, request

radar_bp = Blueprint("radar_webmet", __name__)

WEBMET = "https://webmet.ohmc.ar"
RADARES_PERMITIDOS = {"RMA11", "RMA20", "RMA7"}
CAMPOS_PERMITIDOS = {"COLMAX", "DBZH"}   # DBZH = Z@0.5° (reflectividad del barrido más bajo)
TTL_SEGUNDOS = 300
USER_AGENT = "MetricPoint/1.0 (+https://metricpoint.onrender.com)"

_cache = {}               # code -> (momento, datos)
_lock = threading.Lock()


def _consultar_webmet(code, campo):
    r = requests.get(
        f"{WEBMET}/api/v1/cogs/latest",
        params=[
            ("radar_code", code),
            ("product_key", campo),
            ("vol_nr", "01"),
            ("vol_nr", "02"),
            ("strategy", "0315"),
        ],
        headers={"User-Agent": USER_AGENT},
        timeout=10,
    )
    r.raise_for_status()
    datos = r.json()
    # Defensa: WebMet debe devolver el radar y el campo pedidos. Si no, el dato no se sirve ni se
    # guarda en caché (se usa el último dato bueno, si lo hay).
    if datos.get("radar_code") != code or datos.get("product_key") != campo:
        raise ValueError(
            f"WebMet devolvió {datos.get('radar_code')}/{datos.get('product_key')} en vez de {code}/{campo}"
        )
    return datos


@radar_bp.route("/api/radar/<code>/latest", methods=["GET"])
def radar_latest(code):
    code = code.upper()
    campo = request.args.get("campo", "COLMAX").upper()
    if code not in RADARES_PERMITIDOS or campo not in CAMPOS_PERMITIDOS:
        abort(404)
    clave = (code, campo)

    ahora = time.time()
    with _lock:
        entrada = _cache.get(clave)
    if entrada and ahora - entrada[0] < TTL_SEGUNDOS:
        return jsonify(entrada[1])

    try:
        datos = _consultar_webmet(code, campo)
    except Exception as e:
        print(f"Radar {code}: error consultando WebMet: {e}")
        if entrada:                      # si WebMet falla, sirve el último dato conocido
            return jsonify(entrada[1])
        return jsonify({"error": "Radar no disponible"}), 502

    with _lock:
        _cache[clave] = (ahora, datos)
    return jsonify(datos)


# ---------------------------------------------------------------------------
# Teselas (imágenes) del radar con CORS, para el visor 3D (radar3d.html).
# El visor 3D usa las imágenes como textura WebGL, y eso exige que el servidor permita CORS.
# Solo se usa si WebMet no lo permite directo. Caché en memoria para no sobrecargar a WebMet.
# ---------------------------------------------------------------------------
TTL_TESELAS = 3600
MAX_TESELAS = 700
_teselas = {}             # (id, z, x, y) -> (momento, bytes)


@radar_bp.route("/api/radar/tile/<int:reg_id>/<int:z>/<int:x>/<int:y>.png", methods=["GET"])
def radar_tile(reg_id, z, x, y):
    if not (0 <= z <= 12) or x < 0 or y < 0 or x >= 2 ** z or y >= 2 ** z:
        abort(404)
    clave = (reg_id, z, x, y)
    ahora = time.time()
    with _lock:
        entrada = _teselas.get(clave)
    if entrada and ahora - entrada[0] < TTL_TESELAS:
        cuerpo = entrada[1]
    else:
        try:
            r = requests.get(f"{WEBMET}/api/v1/tiles/{reg_id}/{z}/{x}/{y}.png",
                             headers={"User-Agent": USER_AGENT}, timeout=10)
        except Exception as e:
            print(f"Radar tesela {clave}: {e}")
            abort(502)
        if r.status_code == 404:
            abort(404)
        if not r.ok or "image/png" not in r.headers.get("Content-Type", ""):
            abort(502)
        cuerpo = r.content
        with _lock:
            if len(_teselas) >= MAX_TESELAS:                       # descarta las más viejas
                for k in sorted(_teselas, key=lambda k: _teselas[k][0])[: MAX_TESELAS // 4]:
                    _teselas.pop(k, None)
            _teselas[clave] = (ahora, cuerpo)
    return Response(cuerpo, mimetype="image/png",
                    headers={"Cache-Control": "public, max-age=600", "Access-Control-Allow-Origin": "*"})
