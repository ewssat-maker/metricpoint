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
MAX_TESELAS = 1500
_teselas = {}             # (id, z, x, y) -> (momento, bytes)


def _tesela_bytes(reg_id, z, x, y):
    """PNG de una tesela (con caché). Devuelve bytes, b'' si no hay datos (404) o None si WebMet falló."""
    clave = (reg_id, z, x, y)
    ahora = time.time()
    with _lock:
        entrada = _teselas.get(clave)
    if entrada and ahora - entrada[0] < TTL_TESELAS:
        return entrada[1]
    try:
        r = requests.get(f"{WEBMET}/api/v1/tiles/{reg_id}/{z}/{x}/{y}.png",
                         headers={"User-Agent": USER_AGENT}, timeout=10)
    except Exception as e:
        print(f"Radar tesela {clave}: {e}")
        return None
    if r.status_code == 404:
        cuerpo = b""
    elif not r.ok or "image/png" not in r.headers.get("Content-Type", ""):
        return None
    else:
        cuerpo = r.content
    with _lock:
        if len(_teselas) >= MAX_TESELAS:                       # descarta las más viejas
            for k in sorted(_teselas, key=lambda k: _teselas[k][0])[: MAX_TESELAS // 4]:
                _teselas.pop(k, None)
        _teselas[clave] = (ahora, cuerpo)
    return cuerpo


@radar_bp.route("/api/radar/tile/<int:reg_id>/<int:z>/<int:x>/<int:y>.png", methods=["GET"])
def radar_tile(reg_id, z, x, y):
    if not (0 <= z <= 12) or x < 0 or y < 0 or x >= 2 ** z or y >= 2 ** z:
        abort(404)
    cuerpo = _tesela_bytes(reg_id, z, x, y)
    if cuerpo is None:
        abort(502)
    if cuerpo == b"":
        abort(404)
    return Response(cuerpo, mimetype="image/png",
                    headers={"Cache-Control": "public, max-age=600", "Access-Control-Allow-Origin": "*"})


# ===========================================================================================================
# HISTORIAL DE LAS ÚLTIMAS 6 IMÁGENES + CLASIFICACIÓN (lluvia / tormenta / tormenta severa) + SEGUIMIENTO DE LA CELDA
# MÁS CONVECTIVA (movimiento presente y posible futuro).
#
#  - Un trabajo periódico consulta "la última imagen" de cada radar y guarda las últimas N (6) observaciones.
#    Con el servidor siempre encendido, a los ~50 minutos ya hay 6 imágenes.
#  - Cada imagen nueva se lee (teselas en un zoom fijo), se pasa de color a dBZ con la paleta de WebMet y se buscan
#    las celdas (zonas conexas con dBZ >= umbral de tormenta).
#  - La celda con mayor dBZ de la última imagen se rastrea hacia atrás en las imágenes anteriores; con eso se estima
#    velocidad y rumbo y se proyecta su posición a +10, +20, +30 y +60 min con una zona de incertidumbre.
#
# Requiere: numpy y Pillow en requirements.txt. Los umbrales son reglas prácticas ORIENTATIVAS y se ajustan con
# variables de entorno (RADAR_UMBRAL_LLUVIA, _TORMENTA, _SEVERA, _GRANIZO).
# ===========================================================================================================
import json as _json
import math
import os
from datetime import datetime, timezone

try:
    import numpy as np
    from PIL import Image
    import io as _io
    _ANALISIS_OK = True
except Exception as _e:              # sin numpy/Pillow el resto del proxy sigue funcionando
    print(f"Radar: análisis desactivado ({_e}). Agregar numpy y Pillow a requirements.txt")
    _ANALISIS_OK = False

N_OBS = 6
SEG_Z = int(os.environ.get("RADAR_SEG_Z", "7"))                 # zoom de análisis (~1,1 km por píxel en Tucumán)
UMBRAL_LLUVIA = float(os.environ.get("RADAR_UMBRAL_LLUVIA", "20"))
UMBRAL_TORMENTA = float(os.environ.get("RADAR_UMBRAL_TORMENTA", "40"))
UMBRAL_SEVERA = float(os.environ.get("RADAR_UMBRAL_SEVERA", "50"))
UMBRAL_GRANIZO = float(os.environ.get("RADAR_UMBRAL_GRANIZO", "55"))
MIN_PIXELES_CELDA = int(os.environ.get("RADAR_MIN_PIXELES", "4"))
V_MAX_KMH = 120.0                                               # velocidad máxima creíble de una celda
# Paleta de WebMet (dBZ -> color); la misma que usa el mapa
PALETA = [(10, "#439cb3"), (12.5, "#3be580"), (15, "#37dd70"), (17.5, "#2ccc64"), (20, "#22bd5a"), (22.5, "#16ae50"),
          (25, "#10a144"), (27.5, "#54bc2e"), (30, "#93d61b"), (32.5, "#cbdf0b"), (35, "#f4b701"), (37.5, "#e66003"),
          (40, "#c72503"), (42.5, "#960701"), (45, "#5d0313"), (47.5, "#650056"), (50, "#9f0089"), (52.5, "#68005b"),
          (55, "#18586e"), (57.5, "#00c4c4"), (60, "#086a6a"), (62.5, "#7a9e9e"), (65, "#a0a4a4"), (67.5, "#545454"),
          (70, "#636369")]
LOCALIDADES = [
    ("La Madrid", -27.64, -65.25), ("Monteros", -27.17, -65.50), ("Famaillá", -27.05, -65.40), ("Concepción", -27.34, -65.59),
    ("Aguilares", -27.43, -65.62), ("Alberdi", -27.59, -65.62), ("Graneros", -27.65, -65.44), ("Leales", -27.19, -65.30),
    ("Simoca", -27.26, -65.35), ("Bella Vista", -27.03, -65.30), ("Lules", -26.93, -65.33), ("Yerba Buena", -26.82, -65.30),
    ("San Miguel de Tucumán", -26.83, -65.20), ("Banda del Río Salí", -26.85, -65.16), ("Tafí Viejo", -26.73, -65.26),
    ("Trancas", -26.23, -65.28), ("Burruyacú", -26.50, -64.74), ("Tafí del Valle", -26.85, -65.71),
    ("Salta", -24.79, -65.41), ("Cerrillos", -24.90, -65.48), ("Rosario de Lerma", -24.98, -65.58), ("Campo Quijano", -24.91, -65.64),
    ("La Caldera", -24.60, -65.38), ("Güemes", -24.67, -65.05), ("Metán", -25.50, -64.97), ("Rosario de la Frontera", -25.80, -64.97),
    ("Cafayate", -26.07, -65.98), ("Orán", -23.13, -64.33),
]
_obs = {}                  # (radar, campo) -> [observaciones, de la más vieja a la más nueva]
_celdas = {}               # id de observación -> {"celdas": [...], "resumen": {...}}
_seguimiento = {}          # radar -> último resultado del seguimiento
_obs_lock = threading.Lock()


def _clase(dbz):
    if dbz >= UMBRAL_SEVERA:
        return "tormenta_severa"
    if dbz >= UMBRAL_TORMENTA:
        return "tormenta"
    if dbz >= UMBRAL_LLUVIA:
        return "lluvia"
    return "debil"


def _hex_rgb(h):
    return tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))


def _pixel_a_latlon(gx, gy, z):
    n = 256 * (2 ** z)
    lon = gx / n * 360.0 - 180.0
    lat = math.degrees(math.atan(math.sinh(math.pi * (1 - 2 * gy / n))))
    return lat, lon


def _latlon_a_tile(lat, lon, z):
    n = 2 ** z
    x = int((lon + 180.0) / 360.0 * n)
    y = int((1 - math.asinh(math.tan(math.radians(lat))) / math.pi) / 2 * n)
    return max(0, min(n - 1, x)), max(0, min(n - 1, y))


def _decodificar_teselas(reg):
    """Arma el mosaico de la observación y lo pasa a dBZ. Devuelve (matriz dBZ con NaN, x0 tile, y0 tile) o None."""
    bb = reg["bbox"]
    x0, y1 = _latlon_a_tile(bb["min_lat"], bb["min_lon"], SEG_Z)
    x1, y0 = _latlon_a_tile(bb["max_lat"], bb["max_lon"], SEG_Z)
    nx, ny = x1 - x0 + 1, y1 - y0 + 1
    if nx * ny > 36:
        raise ValueError("área de análisis demasiado grande")
    mosaico = np.zeros((ny * 256, nx * 256, 4), dtype=np.uint8)
    hubo = False
    for ty in range(y0, y1 + 1):
        for tx in range(x0, x1 + 1):
            cuerpo = _tesela_bytes(reg["id"], SEG_Z, tx, ty)
            if cuerpo is None:
                raise IOError("WebMet no entregó una tesela")
            if cuerpo:
                im = Image.open(_io.BytesIO(cuerpo)).convert("RGBA")
                mosaico[(ty - y0) * 256:(ty - y0 + 1) * 256, (tx - x0) * 256:(tx - x0 + 1) * 256] = np.asarray(im)
                hubo = True
    dbz = np.full(mosaico.shape[:2], np.nan, dtype=np.float32)
    if not hubo:
        return dbz, x0, y0
    pal = np.array([_hex_rgb(c) for _, c in PALETA], dtype=np.int32)
    val = np.array([v for v, _ in PALETA], dtype=np.float32)
    activo = mosaico[..., 3] >= 40
    empaq = (mosaico[..., 0].astype(np.int64) << 16) | (mosaico[..., 1].astype(np.int64) << 8) | mosaico[..., 2].astype(np.int64)
    unicos, inv = np.unique(empaq[activo], return_inverse=True)
    rgb = np.stack([(unicos >> 16) & 255, (unicos >> 8) & 255, unicos & 255], axis=1).astype(np.int32)
    d2 = ((rgb[:, None, :] - pal[None, :, :]) ** 2).sum(axis=2)
    j = d2.argmin(axis=1)
    ok = d2[np.arange(len(j)), j] <= 48 ** 2
    dv = np.where(ok, val[j], np.nan).astype(np.float32)
    dbz[activo] = dv[inv]
    return dbz, x0, y0


def _componentes(mascara):
    """Zonas conexas (8 vecinos) de una matriz booleana. Devuelve listas de (fila, columna)."""
    filas, cols = np.nonzero(mascara)
    pendientes = set(zip(filas.tolist(), cols.tolist()))
    comps = []
    while pendientes:
        ini = pendientes.pop()
        pila, comp = [ini], [ini]
        while pila:
            r, c = pila.pop()
            for dr in (-1, 0, 1):
                for dc in (-1, 0, 1):
                    v = (r + dr, c + dc)
                    if v in pendientes:
                        pendientes.remove(v)
                        pila.append(v)
                        comp.append(v)
        comps.append(comp)
    return comps


def _analizar_observacion(reg):
    """Celdas (dBZ >= umbral de tormenta) y resumen por clase de una observación."""
    dbz, x0, y0 = _decodificar_teselas(reg)
    validos = np.isfinite(dbz)
    celdas = []
    if validos.any():
        for comp in _componentes(np.where(validos, dbz, -99) >= UMBRAL_TORMENTA):
            if len(comp) < MIN_PIXELES_CELDA:
                continue
            rr = np.array([c[0] for c in comp])
            cc = np.array([c[1] for c in comp])
            v = dbz[rr, cc]
            w = np.maximum(v - (UMBRAL_TORMENTA - 5), 1.0)           # el centro de la celda pesa más en el promedio
            gx = x0 * 256 + float((cc * w).sum() / w.sum()) + 0.5
            gy = y0 * 256 + float((rr * w).sum() / w.sum()) + 0.5
            lat, lon = _pixel_a_latlon(gx, gy, SEG_Z)
            km_px = 40075.017 * math.cos(math.radians(lat)) / (256 * 2 ** SEG_Z)
            mx = float(v.max())
            celdas.append({"lat": round(lat, 4), "lon": round(lon, 4), "max_dbz": round(mx, 1),
                           "area_km2": round(len(comp) * km_px ** 2, 1), "clase": _clase(mx),
                           "granizo_posible": bool(mx >= UMBRAL_GRANIZO)})
    resumen = {"max_dbz": round(float(np.nanmax(dbz)), 1) if validos.any() else None}
    if validos.any():
        lat_c = (reg["bbox"]["min_lat"] + reg["bbox"]["max_lat"]) / 2
        a_px = (40075.017 * math.cos(math.radians(lat_c)) / (256 * 2 ** SEG_Z)) ** 2
        resumen.update({
            "lluvia_km2": round(float(((dbz >= UMBRAL_LLUVIA) & (dbz < UMBRAL_TORMENTA)).sum() * a_px), 0),
            "tormenta_km2": round(float(((dbz >= UMBRAL_TORMENTA) & (dbz < UMBRAL_SEVERA)).sum() * a_px), 0),
            "severa_km2": round(float((dbz >= UMBRAL_SEVERA).sum() * a_px), 0)})
    celdas.sort(key=lambda c: (-c["max_dbz"], -c["area_km2"]))
    return {"celdas": celdas[:30], "resumen": resumen}


def _t(iso):
    d = datetime.fromisoformat(str(iso).replace("Z", "+00:00"))
    return (d if d.tzinfo else d.replace(tzinfo=timezone.utc)).timestamp()


def _rumbo_texto(grados):
    return ["N", "NE", "E", "SE", "S", "SO", "O", "NO"][int(((grados % 360) + 22.5) // 45) % 8]


def _dist_km(a, b):
    return math.hypot(a[0] - b[0], a[1] - b[1])


def _rastrear(inicio, tiempos, celdas_por_frame, ref):
    """Sigue una celda hacia atrás. Devuelve los puntos [(t, x_km, y_km, celda)] de más viejo a más nuevo."""
    lat0, lon0 = ref
    kx = 111.32 * math.cos(math.radians(lat0))

    def xy(c):
        return ((c["lon"] - lon0) * kx, (c["lat"] - lat0) * 110.57)
    traza = [(tiempos[-1], *xy(inicio), inicio)]
    for k in range(len(tiempos) - 2, -1, -1):
        dt_h = (traza[0][0] - tiempos[k]) / 3600.0
        if dt_h <= 0:
            continue
        alcance = V_MAX_KMH * dt_h
        esperado = None
        if len(traza) >= 2:                                   # con 2+ puntos se predice dónde debía estar
            (ta, xa, ya, _), (tb, xb, yb, _) = traza[1], traza[0]
            if tb > ta:
                vx, vy = (xb - xa) / (tb - ta), (yb - ya) / (tb - ta)
                esperado = (xb - vx * (tb - tiempos[k]), yb - vy * (tb - tiempos[k]))
        mejor, mejor_d = None, None
        for c in celdas_por_frame[k]:
            p = xy(c)
            ref_p = esperado if esperado else (traza[0][1], traza[0][2])
            d = _dist_km(p, ref_p)
            lim = max(8.0, 0.35 * alcance) if esperado else alcance
            if d <= lim and (mejor is None or d < mejor_d):
                mejor, mejor_d = c, d
        if mejor is None:
            break
        traza.insert(0, (tiempos[k], *xy(mejor), mejor))
    return traza


def _ajuste_lineal(traza):
    """Velocidad (km/h) por mínimos cuadrados. Devuelve (vx, vy, rms_km)."""
    t = np.array([p[0] for p in traza]) - traza[-1][0]
    x = np.array([p[1] for p in traza])
    y = np.array([p[2] for p in traza])
    if len(traza) < 2 or np.ptp(t) == 0:
        return 0.0, 0.0, 0.0
    ax, bx = np.polyfit(t, x, 1)
    ay, by = np.polyfit(t, y, 1)
    rms = float(np.sqrt(np.mean((x - (ax * t + bx)) ** 2 + (y - (ay * t + by)) ** 2)))
    return float(ax * 3600), float(ay * 3600), rms


def _analizar_seguimiento(code, obs):
    """Resultado completo para un radar a partir de sus observaciones ya analizadas."""
    marcos = [(o, _celdas.get(o["id"])) for o in obs]
    marcos = [(o, c) for o, c in marcos if c]
    base = {"radar": code, "umbrales": umbrales(), "frames": [{"id": o["id"], "hora": o["observation_time"]} for o, _ in marcos],
            "celda": None, "otras_celdas": [], "ecos_fijos": [], "actualizado": datetime.now(timezone.utc).isoformat()}
    if not marcos:
        base["mensaje"] = "Todavía no hay imágenes analizadas."
        return base
    ultimo_o, ultimo_c = marcos[-1]
    base["resumen"] = ultimo_c["resumen"]
    tiempos = [_t(o["observation_time"]) for o, _ in marcos]
    por_frame = [c["celdas"] for _, c in marcos]
    bb = ultimo_o["bbox"]
    ref = ((bb["min_lat"] + bb["max_lat"]) / 2, (bb["min_lon"] + bb["max_lon"]) / 2)
    candidatas = por_frame[-1][:8]
    if not candidatas:
        base["mensaje"] = "Sin celdas con %d dBZ o más en la última imagen." % UMBRAL_TORMENTA
        return base
    elegida = None
    for cand in candidatas:
        traza = _rastrear(cand, tiempos, por_frame, ref)
        vx, vy, rms = _ajuste_lineal(traza)
        vel = math.hypot(vx, vy)
        desplaz = _dist_km(traza[0][1:3], traza[-1][1:3])
        fijo = len(traza) >= 4 and desplaz < 4.0 and vel < 3.0
        if fijo:
            base["ecos_fijos"].append({"lat": cand["lat"], "lon": cand["lon"], "max_dbz": cand["max_dbz"],
                                       "nota": "Eco casi inmóvil en %d imágenes: puede ser relieve o interferencia, no una tormenta." % len(traza)})
            continue
        if elegida is None:
            elegida = (cand, traza, vx, vy, rms, vel)
        else:
            base["otras_celdas"].append({"lat": cand["lat"], "lon": cand["lon"], "max_dbz": cand["max_dbz"], "clase": cand["clase"]})
    if elegida is None:
        base["mensaje"] = "Las celdas intensas detectadas no se mueven (posible relieve): sin seguimiento."
        return base
    cand, traza, vx, vy, rms, vel = elegida
    n = len(traza)
    rumbo = (math.degrees(math.atan2(vx, vy)) + 360) % 360 if vel >= 1.0 else None
    dbzs = [p[3]["max_dbz"] for p in traza]
    tend = None
    if n >= 3:
        th = np.array([p[0] for p in traza]) / 3600.0
        pend10 = float(np.polyfit(th, np.array(dbzs), 1)[0]) / 6.0           # dBZ cada 10 min
        tend = "intensificándose" if pend10 >= 1.5 else ("debilitándose" if pend10 <= -1.5 else "estable")
    confianza = "alta" if (n >= 5 and rms < 3) else ("media" if n >= 4 and rms < 6 else "baja")
    lat_c, lon_c = cand["lat"], cand["lon"]
    kx = 111.32 * math.cos(math.radians(ref[0]))
    previsto = []
    if vel >= 3.0:
        for minutos in (10, 20, 30, 60):
            h = minutos / 60.0
            incert = max(3.0, 2.0 * rms) + 0.15 * vel * h * (1 + (0 if n >= 5 else 0.6))
            previsto.append({"min": minutos, "lat": round(lat_c + vy * h / 110.57, 4), "lon": round(lon_c + vx * h / kx, 4),
                             "incertidumbre_km": round(incert, 1)})
    llegadas = []
    if previsto:
        p1 = (0.0, 0.0)
        for nombre, la, lo in LOCALIDADES:
            dx, dy = (lo - lon_c) * kx, (la - lat_c) * 110.57
            seg = (vx, vy)                                               # km/h; el segmento cubre 60 min
            largo2 = seg[0] ** 2 + seg[1] ** 2
            s = max(0.0, min(1.0, (dx * seg[0] + dy * seg[1]) / largo2)) if largo2 > 0 else 0.0
            d = math.hypot(dx - seg[0] * s, dy - seg[1] * s)
            incert = previsto[-1]["incertidumbre_km"] * s + 8.0
            if d <= incert:
                llegadas.append({"localidad": nombre, "en_min": int(round(s * 60)), "distancia_km": round(d, 1)})
        llegadas.sort(key=lambda x: x["en_min"])
    base["celda"] = {
        "lat": lat_c, "lon": lon_c, "max_dbz": cand["max_dbz"], "area_km2": cand["area_km2"], "clase": cand["clase"],
        "granizo_posible": cand["granizo_posible"],
        "trayectoria": [{"hora": datetime.fromtimestamp(p[0], timezone.utc).isoformat(), "lat": p[3]["lat"], "lon": p[3]["lon"],
                         "max_dbz": p[3]["max_dbz"]} for p in traza],
        "velocidad_kmh": round(vel, 0), "rumbo_grados": (round(rumbo) if rumbo is not None else None),
        "rumbo_texto": ("hacia el " + _rumbo_texto(rumbo)) if rumbo is not None else "casi sin desplazamiento",
        "tendencia": tend, "puntos_usados": n, "confianza": confianza, "error_ajuste_km": round(rms, 1),
        "pronostico": previsto, "podria_alcanzar": llegadas[:6]}
    base["aviso"] = ("Estimación automática por extrapolación lineal de la última hora: orientativa. Las celdas pueden "
                     "cambiar de rumbo, dividirse o disiparse. No reemplaza los avisos del SMN ni de Defensa Civil.")
    return base


def umbrales():
    return {"lluvia": {"desde_dbz": UMBRAL_LLUVIA, "hasta_dbz": UMBRAL_TORMENTA, "texto": "Lluvia"},
            "tormenta": {"desde_dbz": UMBRAL_TORMENTA, "hasta_dbz": UMBRAL_SEVERA, "texto": "Tormenta"},
            "tormenta_severa": {"desde_dbz": UMBRAL_SEVERA, "texto": "Tormenta severa"},
            "granizo_posible_desde_dbz": UMBRAL_GRANIZO,
            "nota": "Reglas prácticas orientativas sobre la reflectividad máxima de la columna (COLMAX); no son una "
                    "categoría oficial. Cerca de las sierras puede haber ecos de relieve y zonas sin cobertura."}


# ---------- registro de las últimas N observaciones ----------
def _tabla_obs():
    url = os.environ.get("DATABASE_URL")
    if not url:
        return None
    try:
        import psycopg2
        con = psycopg2.connect(url)
        with con.cursor() as cur:
            cur.execute("CREATE TABLE IF NOT EXISTS radar_obs (radar TEXT, campo TEXT, datos TEXT, PRIMARY KEY (radar, campo))")
        con.commit()
        return con
    except Exception as e:
        print(f"Radar (BD): {e}")
        return None


def _cargar_obs(code, campo):
    clave = (code, campo)
    if clave in _obs:
        return
    _obs[clave] = []
    con = _tabla_obs()
    if con:
        try:
            with con.cursor() as cur:
                cur.execute("SELECT datos FROM radar_obs WHERE radar=%s AND campo=%s", (code, campo))
                fila = cur.fetchone()
            if fila:
                _obs[clave] = _json.loads(fila[0])[-N_OBS:]
        except Exception as e:
            print(f"Radar (BD leer): {e}")
        finally:
            con.close()


def _guardar_obs(code, campo):
    con = _tabla_obs()
    if not con:
        return
    try:
        with con.cursor() as cur:
            cur.execute("INSERT INTO radar_obs(radar,campo,datos) VALUES (%s,%s,%s) "
                        "ON CONFLICT (radar,campo) DO UPDATE SET datos=EXCLUDED.datos",
                        (code, campo, _json.dumps(_obs[(code, campo)])))
        con.commit()
    except Exception as e:
        print(f"Radar (BD guardar): {e}")
    finally:
        con.close()


def registrar_observacion(code, campo="COLMAX"):
    """Consulta WebMet; si hay una imagen nueva la guarda (y, para COLMAX, la analiza). Devuelve True si hubo novedad."""
    with _obs_lock:
        _cargar_obs(code, campo)
        datos = _consultar_webmet(code, campo)
        lista = _obs[(code, campo)]
        if any(o["id"] == datos["id"] for o in lista):
            return False
        lista.append({"id": datos["id"], "observation_time": datos["observation_time"], "bbox": datos["bbox"],
                      "tile_url": datos["tile_url"]})
        lista.sort(key=lambda o: o["observation_time"])
        del lista[:-N_OBS]
        _guardar_obs(code, campo)
        nuevo = datos
    if campo == "COLMAX" and _ANALISIS_OK:
        _asegurar_analisis(code)
    return True


def _asegurar_analisis(code):
    """Analiza las observaciones que falten (normalmente solo la última) y recalcula el seguimiento."""
    obs = list(_obs.get((code, "COLMAX"), []))
    for o in obs:
        if o["id"] not in _celdas:
            try:
                _celdas[o["id"]] = _analizar_observacion(o)
            except Exception as e:
                print(f"Radar {code}: no se pudo analizar la observación {o['id']}: {e}")
    vivos = {o["id"] for o in obs}
    for k in [k for k in _celdas if k not in vivos and len(_celdas) > 40]:
        _celdas.pop(k, None)
    _seguimiento[code] = _analizar_seguimiento(code, obs)


def _trabajo_periodico():
    for code in sorted(SEG_RADARES):
        campos = {"COLMAX"} | {c for (r, c) in list(_obs) if r == code}      # también Z@0,5° si alguien lo pidió
        for campo in sorted(campos):
            try:
                registrar_observacion(code, campo)
            except Exception as e:
                print(f"Radar {code}/{campo}: seguimiento: {e}")


SEG_RADARES = {c.strip().upper() for c in os.environ.get("RADAR_SEG_RADARES", "RMA11,RMA20,RMA7").split(",") if c.strip()} & RADARES_PERMITIDOS


def iniciar_seguimiento(scheduler):
    """Programa la revisión periódica en el planificador de la app (APScheduler)."""
    minutos = max(2, int(os.environ.get("RADAR_SEG_MIN", "4")))
    from datetime import timedelta
    scheduler.add_job(func=_trabajo_periodico, trigger="interval", minutes=minutos, max_instances=1, coalesce=True,
                      next_run_time=datetime.now() + timedelta(seconds=90))
    print(f"Radar: seguimiento cada {minutos} min para {sorted(SEG_RADARES)}")


@radar_bp.route("/api/radar/umbrales", methods=["GET"])
def radar_umbrales():
    return jsonify(umbrales())


@radar_bp.route("/api/radar/<code>/historial", methods=["GET"])
def radar_historial(code):
    code = code.upper()
    campo = request.args.get("campo", "COLMAX").upper()
    if code not in RADARES_PERMITIDOS or campo not in CAMPOS_PERMITIDOS:
        abort(404)
    with _obs_lock:
        _cargar_obs(code, campo)
        lista = list(_obs[(code, campo)])
    if not lista:                              # primera vez: guarda al menos la última imagen
        try:
            registrar_observacion(code, campo)
            lista = list(_obs[(code, campo)])
        except Exception as e:
            print(f"Radar {code}: historial: {e}")
    for o in lista:
        o["tile_cors"] = f"/api/radar/tile/{o['id']}/{{z}}/{{x}}/{{y}}.png"
    return jsonify({"radar": code, "campo": campo, "n": len(lista), "maximo": N_OBS, "completo": len(lista) >= N_OBS,
                    "observaciones": lista})


@radar_bp.route("/api/radar/<code>/seguimiento", methods=["GET"])
def radar_seguimiento(code):
    code = code.upper()
    if code not in RADARES_PERMITIDOS:
        abort(404)
    if not _ANALISIS_OK:
        return jsonify({"error": "Análisis no disponible: falta numpy/Pillow en el servidor"}), 503
    res = _seguimiento.get(code)
    if res is None:
        try:
            with _obs_lock:
                _cargar_obs(code, "COLMAX")
            if not _obs[(code, "COLMAX")]:
                registrar_observacion(code, "COLMAX")
            else:
                _asegurar_analisis(code)
            res = _seguimiento.get(code)
        except Exception as e:
            print(f"Radar {code}: seguimiento: {e}")
    if res is None:
        return jsonify({"error": "Radar no disponible"}), 502
    return jsonify(res)
