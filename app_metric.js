const BACKEND_URL = "https://metricmoisture-backend.onrender.com";

// ==========================================
// 1. TRADUCCIONES COMPLETAS
// ==========================================
const traducciones = {
    en: {
        "landing_title": "Geospatial Intelligence", "landing_subtitle": "Direct SAR telemetry to your agronomic control center.", "landing_scroll": "▼ Discover MetricPoint's architecture ▼", "login_desc": "Precision Agrometeorology. Enter your credentials.", "lbl_email": "Email Address", "ph_email": "example@company.com", "lbl_pass": "Password", "btn_login": "Sign In", "lbl_or": "or", "btn_trial": "Create Corporate Account",
        "reg_title": "Create Corporate Account", "reg_sec1": "1. Corporate & Tax Info", "reg_razon": "Company Name:", "reg_cuit": "Tax ID:", "ph_cuit": "No dashes", "reg_domicilio": "Legal Address:", 
        "reg_sec2": "2. Authorized Contact", "reg_nombre": "Full Name:", "reg_cargo": "Role (e.g., Agronomist):", "reg_tel": "Phone (with country code):",
        "reg_sec3": "3. Agrometeorological Profile", "reg_coord": "Lot Coordinates (Lat, Lon):", "ph_coord": "Ex: -26.83, -65.22", "reg_hec": "Total Area (Hectares):", "reg_crop": "Main Crop:",
        "crop_soy": "Soy / Corn", "crop_citrus": "Citrus (Lemon)", "crop_sugarcane": "Sugarcane", "crop_aqua": "Aquaculture", "crop_other": "Other", "btn_submit_reg": "Register Corporate Account", "btn_back_login": "Back to Login", "lbl_jurisdiction": ", submitting to the jurisdiction of New York.",
        "lbl_read": "I have read and accept the ", "lbl_tyc": "Terms and Conditions", "lbl_and": " and the ", "lbl_priv": "Privacy Policy", "msg_tyc_req": "You must accept the legal terms to register.",
        "legal_title": "Terms and Conditions of Use", "legal_p1": "By registering, accessing or using the MetricPoint platform, you agree to be bound by these terms.", "legal_h1": "1. Agronomic Disclaimer", "legal_p2": "The Platform provides satellite and radar telemetry tools. You understand that it is strictly a decision assistance tool and does not replace agronomic judgment in the field. MetricPoint assumes no liability for yield losses or crop damage resulting from decisions made based on the platform.", "legal_h2": "2. Third Party Data Sources", "legal_p3": "The architecture is fed by the European Space Agency (Copernicus) and the National Meteorological Service (SMN). We do not guarantee 100% uptime in case of government server crashes.", "legal_h3": "3. Use and Licenses", "legal_p4": "Trial access lasts 48 hours. Web scraping, resale of information or sharing credentials without a commercial license is explicitly prohibited.", 
        "legal_h4": "4. Limitation of Liability", "legal_p5": "In no event shall MetricPoint, its developers or affiliates be liable for direct, indirect, lost profits, crop loss, irrigation system failure, or damages arising from agronomic or business decisions made based on information provided by the Platform.", 
        "legal_h5": "5. Governing Law and Jurisdiction", "legal_p6": "These Terms and Conditions shall be governed by and construed in accordance with the laws of the State of New York, USA. Any dispute, controversy or litigation arising in connection with the Platform shall be submitted to the exclusive jurisdiction of the state and federal courts located in New York County, New York.", "btn_close": "Close",
        "priv_title": "Privacy Policy", "priv_h1": "1. Information we collect", "priv_p1": "We collect your corporate information, email (with hashed password) and geospatial coordinates (polygons) of the analyzed lots to calculate water balances. Consultation histories, agricultural coordinates and financial diagnostics are processed and stored using military-grade encryption. The Platform operates with a zero-knowledge architecture.", "priv_h2": "2. Sharing with Third Parties", "priv_p2": "MetricPoint does not sell or trade your data. We send coordinates anonymously to Google Earth Engine and the European Space Agency exclusively for processing SAR images and 3D Models.", "priv_h3": "3. User Rights", "priv_p3": "In compliance with current regulations, you may request the permanent deletion of your corporate account, profile and encrypted polygons by contacting the system administrator at any time.",
        "tab_intro_who": "Who We Are", "tab_intro_prod": "Our Products", "tab_intro_contact": "Contact Us", "who_title": "MetricPoint: Geospatial Intelligence", "who_p1": "MetricPoint is a cutting-edge AgTech platform specializing in geospatial intelligence and agronomic modeling using SAR satellite technology.", "who_p2": "With a solid base of operations and research in the United States, we develop solutions that push the boundaries of crop monitoring.", "who_p3": "We are preparing for a major launch in Argentina, bringing our suite to revolutionize precision agriculture in South America, anticipating water stress with millimeter accuracy.", "prod_gem_title": "Volumetric Digital Twins", "prod_gem_desc": "Visualize your field's subsoil like never before. Our 3D technology allows real-time terrain tomography, identifying the exact distribution of edaphic moisture to optimize irrigation and prevent water stress before it becomes irreversible.", "prod_rvi_title": "RVI Vigor & Phenological Monitoring", "prod_rvi_desc": "We overcome the limitations of traditional optical indices (NDVI). Using Synthetic Aperture Radar (SAR), we measure real vigor and biomass structure regardless of cloud cover, ensuring uninterrupted tracking of your crop's development.", "prod_pol_title": "MetricPoli: Smart Pollination", "prod_pol_desc": "Maximize your yield by understanding the interaction between climate and pollinators. Analyze real-time meteorological variables to predict optimal flight windows, guaranteeing exceptional fruit set and sustainable harvests.",
        "contact_title": "Get in Touch", "contact_desc": "Interested in bringing MetricPoint's technology to your fields? Drop us a message.", "contact_name": "Full Name", "contact_msg": "Your Message", "btn_send": "Send Message",
        "paywall_title": "Trial Period Expired", "paywall_desc": "Your 48 hours of free access have ended. To continue using ESA satellites and injecting 3D topography, please upgrade to a Premium subscription.", "btn_upgrade": "Get Premium License", "btn_logout": "Sign Out",
        "hub_subtitle": "Select the analysis module you want to use", "hub_vid_title": "MetricMoisture 3D Engine", "hub_vid_desc": "Interactive Volumetric Digital Twins for precision monitoring.", "mod_moisture_desc": "Deep edaphic moisture analysis with SAR satellites, 3D topography and water balance.", "mod_weather_title": "Weather Forecast", "mod_weather_desc": "Atmospheric modeling, live SMN radars and predictive meteorological variables.", "mod_poli_desc": "Comprehensive pollination suite, hive monitoring and advanced phenological analysis.", "mod_hydro_desc": "Hydrological monitoring, early flood warnings and basin status.", "mod_mine_desc": "ESG auditing, water stress in salt flats and health of high Andean wetlands.", "mine_header_subtitle": "Mining Monitoring and ESG Module", "hydro_header_subtitle": "Hydrological Early Warning & Basin Telemetry", "hydro_title": "[ HYDROLOGICAL OPERATIONS CENTER - TUCUMÁN ]", "hydro_tab_adv": "⚠️ Warnings Panel", "hydro_tab_sit": "📊 Current Situation (Basin)", "hydro_tab_admin": "⚙️ Internal Use (Admin)", "hydro_normal_title": "Normal Operational Level", "hydro_normal_desc": "The basin does not register hydrological anomalies at this time.", "hydro_radar_badge": "ACTIVE SATELLITE RADAR", "hydro_history_title": "[ EVENT HISTORY ]", "hydro_no_history": "No events registered in the current session.", "hydro_rfs_title": "[ RFS : RIVER Forecast System - TUCUMAN BASIN ]", "hydro_rfs_sub": "Global hydrological flow and flood risk model (GEOGLOWS)", "hydro_admin_title": "⚠️ Emergency Dispatch Console (GOD MODE)", "hydro_admin_desc": "The message drafted here will be sent via SMS to registered contacts and will immediately update the public Warnings panel and the risk map.", "hydro_lbl_msg": "Draft Alert Message:", "hydro_btn_dispatch": "🚀 DISPATCH SMS AND WEB ALERT",
        "mod1_subtitle": "Satellite Edaphic Moisture", "btn_back": "Back to Menu", "lbl_lot_params": "Lot Parameters", "lbl_start_date": "Start Date (YYYY-MM-DD):", "lbl_end_date": "End Date (YYYY-MM-DD):", "lbl_sow_date": "Sowing Date (YYYY-MM-DD):", "lbl_manual_input": "Manual Input / Field Station", "lbl_reg_date": "Record Date:", "lbl_rain": "Rain (mm):", "btn_add_rec": "+ Add Record", "btn_execute": "EXECUTE ANALYSIS", "lbl_soil_props": "Analyzed Soil Properties", "lbl_sand": "Sand Texture:", "lbl_clay": "Clay Texture:", "lbl_cc": "Field Capacity (CC):", "lbl_pmp": "Wilting Point (PMP):", "lbl_query_prof": "Query Profile by Date", "btn_scan_3d": "Scan Topography", "lbl_surf10": "Surface (10 cm):", "lbl_sub30": "Subsurface (30 cm):", "lbl_root60": "Deep Roots (60 cm):", "lbl_res100": "Reserve (100 cm):", "lbl_et0": "Evapotranspiration (ET0):", "lbl_climate_data": "Climate Data", "lbl_total_rain": "Total Accumulated Rain:", "lbl_diag": "Agrometeorological Diagnostics",
        "tab_moist": "Moisture & Vigor", "tab_clim": "Climate & Rain", "tab_3d": "3D Model (Campaign)", "tab_xray": "Spatial X-Ray",
        "mod2_subtitle": "SINARAME Network - Live Precipitation Echoes", "lbl_layers": "Layer Control", "lbl_layer_desc": "Real-time monitoring of rain echoes using the National Meteorological Service radar network.", "btn_refresh": "Refresh Radar",
        "msg_auth_err": "Please fill all required fields.", "msg_login": "Signing in...", "msg_reg": "Registering corporate profile...", "msg_err_serv": "Connection error to server.",
        "diag_base": "During the analyzed campaign (START to END), the lot received an accumulated <strong>RAIN mm</strong> of precipitation. The average atmospheric demand (ET0) remained at <strong>ET0 mm/day</strong>.<br><br>", "diag_def": "The global balance shows a <strong>marked water deficit</strong>, forcing the crop to structurally depend on the edaphic profile. ", "diag_fav": "The global balance shows a <strong>favorable</strong> atmospheric behavior. ", "diag_opt": "Currently, the deep reserve of the lot (100 cm) is at <strong>optimal</strong> levels (above 65% of useful water), guaranteeing root stability against upcoming heat waves.", "diag_reg": "Currently, the deep reserve (100 cm) is in a state of <strong>regular transition</strong>. It is suggested to monitor surface drying to avoid phenological stress.", "diag_crit": "<span style='color:#d73027;'><strong>Alert:</strong> The deep reserve of the lot has entered <strong>critical</strong> levels near the Permanent Wilting Point, representing a high risk of penalization on the potential yield of the crop.</span>",
        "wf_title": "WEATHER FORECAST", "wf_subtitle": "Agrometeorological Assimilation Module", "support_title": "MetricPoint Support", "support_desc": "Contact channel enabled, send us your question.", "support_btn": "Contact Channel"
    },
    es: {
        "landing_title": "Inteligencia Geoespacial", "landing_subtitle": "Telemetría SAR directa a su centro de control agronómico.", "landing_scroll": "▼ Descubre la arquitectura de MetricPoint ▼", "login_desc": "Agrometeorología de Precisión. Ingrese sus credenciales.", "lbl_email": "Correo Electrónico", "ph_email": "ejemplo@empresa.com", "lbl_pass": "Contraseña", "btn_login": "Iniciar Sesión", "lbl_or": "o", "btn_trial": "Crear Cuenta Corporativa",
        "reg_title": "Crear Cuenta Corporativa", "reg_sec1": "1. Información Corporativa y Fiscal", "reg_razon": "Razón Social (Empresa):", "reg_cuit": "Identificación Tributaria (CUIT):", "ph_cuit": "Sin guiones", "reg_domicilio": "Domicilio Legal / Fiscal:", 
        "reg_sec2": "2. Contacto Autorizado", "reg_nombre": "Nombre y Apellido Completo:", "reg_cargo": "Cargo (Ej: Ing. Agrónomo):", "reg_tel": "Teléfono (Con código de país):",
        "reg_sec3": "3. Perfil Operativo (Calibración)", "reg_coord": "Coordenadas del Lote (Lat, Lon):", "ph_coord": "Ej: -26.83, -65.22", "reg_hec": "Superficie Total (Hectáreas):", "reg_crop": "Cultivo Principal:",
        "crop_soy": "Soja / Maíz", "crop_citrus": "Citrus (Limón)", "crop_sugarcane": "Caña de Azúcar", "crop_aqua": "Acuicultura", "crop_other": "Otro", "btn_submit_reg": "Registrar Cuenta Corporativa", "btn_back_login": "Volver al Inicio de Sesión", "lbl_jurisdiction": ", sometiéndome a la jurisdicción de Nueva York.",
        "lbl_read": "He leído y acepto los ", "lbl_tyc": "Términos y Condiciones", "lbl_and": " y la ", "lbl_priv": "Política de Privacidad", "msg_tyc_req": "Debes aceptar los términos legales para registrarte.",
        "legal_title": "Términos y Condiciones de Uso", "legal_p1": "Al registrarse, acceder o utilizar la plataforma MetricPoint, usted acepta estar sujeto a estos términos.", "legal_h1": "1. Descargo de Responsabilidad Agronómica", "legal_p2": "La Plataforma proporciona herramientas de telemetría satelital y radar. Usted comprende que es estrictamente una herramienta de asistencia para la toma de decisiones y no reemplaza el juicio agronómico a campo. MetricPoint no asume ninguna responsabilidad por pérdidas de rendimiento o daños a cultivos resultantes de decisiones tomadas en base a la plataforma.", "legal_h2": "2. Fuentes de Datos de Terceros", "legal_p3": "La arquitectura se nutre de la Agencia Espacial Europea (Copernicus) y el Servicio Meteorológico Nacional (SMN). No garantizamos un uptime del 100% en caso de caídas de servidores gubernamentales.", "legal_h3": "3. Uso y Licencias", "legal_p4": "El acceso Trial dura 48 horas. Se prohíbe explícitamente el web scraping, reventa de información o compartir credenciales sin licencia comercial.",
        "legal_h4": "4. Limitación de Responsabilidad", "legal_p5": "En ningún caso MetricPoint, sus desarrolladores o afiliados serán responsables por daños directos, indirectos, lucro cesante, pérdida de cosechas, fallas en sistemas de riego, o daños derivados de decisiones agronómicas o comerciales tomadas basándose en la información provista por la Plataforma.", 
        "legal_h5": "5. Ley Aplicable y Jurisdicción (Foro)", "legal_p6": "Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes del Estado de Nueva York, Estados Unidos de América. Cualquier disputa, controversia o litigio que surja en relación con la Plataforma será sometido a la jurisdicción exclusiva de los tribunales estatales y federales ubicados en el Condado de Nueva York, Nueva York.", "btn_close": "Cerrar",
        "priv_title": "Aviso de Privacidad", "priv_h1": "1. Información que recopilamos", "priv_p1": "Recopilamos su información corporativa, correo electrónico (con contraseña cifrada en hash) y las coordenadas geoespaciales (polígonos) de los lotes analizados para calcular los balances hídricos. Los historiales de consultas, coordenadas agrícolas y diagnósticos financieros son procesados y almacenados utilizando cifrado de grado militar. La Plataforma opera con una arquitectura donde sus datos son inaccesibles en texto plano para los administradores.", "priv_h2": "2. Compartición con Terceros", "priv_p2": "MetricPoint no vende ni comercializa sus datos. Enviamos coordenadas de forma anónima a Google Earth Engine y la Agencia Espacial Europea exclusivamente para el procesamiento de imágenes SAR y Modelos 3D.", "priv_h3": "3. Derechos del Usuario", "priv_p3": "En cumplimiento con las normativas vigentes, usted puede solicitar la eliminación definitiva de su cuenta corporativa, perfil y polígonos cifrados contactando al administrador del sistema en cualquier momento.",
        "tab_intro_who": "Quiénes Somos", "tab_intro_prod": "Nuestros Productos", "tab_intro_contact": "Contacto", "who_title": "MetricPoint: Inteligencia Geoespacial", "who_p1": "MetricPoint es una plataforma AgTech de vanguardia especializada en inteligencia geoespacial y modelado agronómico mediante tecnología satelital SAR.", "who_p2": "Con una base sólida de operaciones e investigación en Estados Unidos, desarrollamos soluciones que cruzan la barrera de lo posible en el monitoreo de cultivos.", "who_p3": "Nos preparamos para un gran desembarco en Argentina, trayendo nuestra suite para revolucionar la agricultura de precisión en Sudamérica, anticipándonos al estrés hídrico con precisión milimétrica.", "prod_gem_title": "Gemelos Digitales Volumétricos", "prod_gem_desc": "Visualice el subsuelo de su lote como nunca antes. Nuestra tecnología 3D permite realizar tomografías del terreno en tiempo real, identificando la distribución exacta de la humedad edáfica para optimizar el riego y prevenir el estrés hídrico antes de que sea irreversible.", "prod_rvi_title": "Vigor RVI y Monitoreo Fenológico", "prod_rvi_desc": "Superamos las limitaciones de los índices ópticos tradicionales (NDVI). Utilizando Radar de Apertura Sintética (SAR), medimos el vigor real y la estructura de la biomasa sin importar la nubosidad, asegurando un seguimiento ininterrumpido del desarrollo de su cultivo.", "prod_pol_title": "MetricPoli: Polinización Inteligente", "prod_pol_desc": "Maximice su rendimiento comprendiendo la interacción entre el clima y los polinizadores. Analice variables meteorológicas en tiempo real para predecir ventanas óptimas de vuelo, garantizando un cuajado de frutos excepcional y cosechas sostenibles.",
        "contact_title": "Póngase en Contacto", "contact_desc": "¿Interesado en llevar la tecnología de MetricPoint a sus campos? Envíenos un mensaje.", "contact_name": "Nombre Completo", "contact_msg": "Su Mensaje", "btn_send": "Enviar Mensaje",
        "paywall_title": "Período de Prueba Expirado", "paywall_desc": "Tus 48 horas de acceso gratuito han finalizado. Para seguir utilizando los satélites de la Agencia Espacial Europea e inyectar topografía 3D, por favor actualiza a una suscripción Premium.", "btn_upgrade": "Adquirir Licencia Premium", "btn_logout": "Cerrar sesión",
        "hub_subtitle": "Seleccione el módulo de análisis que desea utilizar", "mod_hydro_desc": "Monitoreo hidrológico, advertencias tempranas de crecidas y estado de la cuenca.", "mod_mine_desc": "Auditoría ESG, estrés hídrico en salares y salud de vegas altoandinas.", "mine_header_subtitle": "Módulo de Monitoreo Minero y ESG", "hydro_header_subtitle": "Hydrological Early Warning", "hydro_title": "[ CENTRO DE OPERACIONES HIDROLÓGICAS - TUCUMÁN ]", "hydro_tab_adv": "⚠️ Panel de Advertencias", "hydro_tab_sit": "📊 Situación Actual (Cuenca)", "hydro_tab_admin": "⚙️ Uso Interno (Admin)", "hydro_normal_title": "Nivel Operativo Normal", "hydro_normal_desc": "La cuenca no registra anomalías hídricas en este momento.", "hydro_radar_badge": "RADAR SATELITAL ACTIVO", "hydro_history_title": "[ HISTORIAL DE EVENTOS ]", "hydro_no_history": "No hay eventos registrados en la sesión actual.", "hydro_rfs_title": "[ RFS : RIVER FORECAST SYSTEM - CUENCA TUCUMÁN ]", "hydro_rfs_sub": "Modelo hidrológico global de caudal y riesgo de crecidas (GEOGLOWS)", "hydro_summary_title": "[ TELEMETRÍA Y ESTADO DE CUENCAS - TIEMPO REAL ]", "hydro_btn_refresh": "🔄 Actualizar Datos", "hydro_admin_title": "⚠️ Consola de Disparo de Emergencias (MODO DIOS)", "hydro_admin_desc": "El mensaje redactado aquí se enviará vía SMS a los contactos registrados y actualizará inmediatamente el panel público de Advertencias y el mapa de riesgo.", "hydro_lbl_msg": "Redactar Mensaje de Alerta:", "hydro_btn_dispatch": "🚀 DISPARAR ALERTA SMS Y WEB",
        "btn_gps": "📍 Usar Mi Ubicación GPS (4 ha)", "mod1_subtitle": "Humedad Edáfica Satelital", "btn_back": "Volver al Menú", "lbl_lot_params": "Parámetros del Lote", "lbl_start_date": "Fecha Inicio (YYYY-MM-DD):", "lbl_end_date": "Fecha Fin (YYYY-MM-DD):", "lbl_sow_date": "Fecha Siembra (YYYY-MM-DD):", "lbl_manual_input": "Carga Manual / Estación", "lbl_reg_date": "Fecha Registro:", "lbl_rain": "Lluvia (mm):", "btn_add_rec": "+ Agregar Registro", "btn_execute": "EJECUTAR ANÁLISIS", "lbl_soil_props": "Propiedades del Suelo", "lbl_sand": "Textura Arena:", "lbl_clay": "Textura Arcilla:", "lbl_cc": "Cap. de Campo (CC):", "lbl_pmp": "Pto. Marchitez (PMP):", "lbl_query_prof": "Consultar Perfil por Fecha", "btn_scan_3d": "Escanear Topografía 3D", "lbl_surf10": "Superficie (10 cm):", "lbl_sub30": "Subsuperficie (30 cm):", "lbl_root60": "Raíces Prof. (60 cm):", "lbl_res100": "Reserva (100 cm):", "lbl_et0": "Evapotranspiración (ET0):", "lbl_climate_data": "Datos Climáticos", "lbl_total_rain": "Lluvia Acumulada Total:", "lbl_diag": "Diagnóstico Agrometeorológico",
        "tab_moist": "Humedad y Vigor", "tab_clim": "Clima y Precipitaciones", "tab_3d": "Modelo 3D (Campaña)", "tab_xray": "Spatial X-Ray",
        "mod2_subtitle": "Red SINARAME - Ecos en Vivo", "lbl_layers": "Control de Capas", "lbl_layer_desc": "Monitoreo en tiempo real de ecos de lluvia sobre la región utilizando el SMN.", "btn_refresh": "Refrescar Radar",
        "msg_auth_err": "Complete todos los campos requeridos.", "msg_login": "Iniciando sesión...", "msg_reg": "Registrando perfil corporativo...", "msg_err_serv": "Error de conexión al servidor.",
        "diag_base": "Durante la campaña analizada (START al END), el lote recibió un acumulado de <strong>RAIN mm</strong> de precipitaciones. La demanda atmosférica promedio (ET0) se mantuvo en <strong>ET0 mm/día</strong>.<br><br>", "diag_def": "El balance global muestra un <strong>déficit hídrico marcado</strong>, obligando al cultivo a depender estructuralmente del perfil edáfico. ", "diag_fav": "El balance global muestra un comportamiento atmosférico <strong>favorable</strong>. ", "diag_opt": "Actualmente, la reserva profunda del lote (100 cm) se encuentra en niveles <strong>óptimos</strong> (por encima del 65% de agua útil), garantizando estabilidad radicular ante olas de calor venideras.", "diag_reg": "Actualmente, la reserva profunda (100 cm) se encuentra en un estado de <strong>transición regular</strong>. Se sugiere monitorear el secado superficial para evitar estrés fenológico.", "diag_crit": "<span style='color:#d73027;'><strong>Alerta:</strong> La reserva profunda del lote ha ingresado en niveles <strong>críticos</strong> cercanos al Punto de Marchitez Permanente, lo que representa un riesgo alto de penalización sobre el rendimiento potencial del cultivo.</span>",
        "wf_title": "WEATHER FORECAST", "wf_subtitle": "Módulo de Asimilación Agrometeorológica", "support_title": "Soporte MetricPoint", "support_desc": "Canal habilitado para contacto, envíanos tu pregunta.", "support_btn": "Canal de Contacto"
    },
    pt: {
        "landing_title": "Inteligência Geoespacial", "landing_subtitle": "Telemetria SAR direta para seu centro de controle agronômico.", "landing_scroll": "▼ Descubra a arquitetura MetricPoint ▼", "login_desc": "Agrometeorologia de Precisão. Insira suas credenciais.", "lbl_email": "Correio Eletrônico", "ph_email": "exemplo@empresa.com", "lbl_pass": "Senha", "btn_login": "Entrar", "lbl_or": "ou", "btn_trial": "Criar Conta Corporativa",
        "reg_title": "Criar Conta Corporativa", "reg_sec1": "1. Informações Corporativas e Fiscais", "reg_razon": "Razão Social (Empresa):", "reg_cuit": "Identificação Tributária (CNPJ/NIF):", "ph_cuit": "Sem traços", "reg_domicilio": "Endereço Legal:", 
        "reg_sec2": "2. Contato Autorizado", "reg_nombre": "Nome Completo:", "reg_cargo": "Cargo (Ex: Eng. Agrônomo):", "reg_tel": "Telefone (com código de país):",
        "reg_sec3": "3. Perfil Operacional (Calibração)", "reg_coord": "Coordenadas do Lote (Lat, Lon):", "ph_coord": "Ex: -26.83, -65.22", "reg_hec": "Área Total (Hectares):", "reg_crop": "Cultura Principal:",
        "crop_soy": "Soja / Milho", "crop_citrus": "Citrus (Limão)", "crop_sugarcane": "Cana-de-açúcar", "crop_aqua": "Aquicultura", "crop_other": "Outro", "btn_submit_reg": "Registrar Conta Corporativa", "btn_back_login": "Voltar ao Login", "lbl_jurisdiction": ", submetendo-me à jurisdição de Nova York.",
        "lbl_read": "Li e aceito os ", "lbl_tyc": "Termos e Condições", "lbl_and": " e a ", "lbl_priv": "Política de Privacidade", "msg_tyc_req": "Você deve aceitar os termos legais para se registrar.",
        "legal_title": "Termos e Condições de Uso", "legal_p1": "Ao se registrar, acessar ou usar a plataforma MetricPoint, você concorda em ficar vinculado a estes termos.", "legal_h1": "1. Isenção de Responsabilidade Agronômica", "legal_p2": "A Plataforma fornece ferramentas de telemetria de satélite e radar. Você entende que é estritamente uma ferramenta de assistência à decisão e não substitui o julgamento agronômico em campo. MetricPoint não assume nenhuma responsabilidade por perdas de rendimento ou danos às colheitas resultantes de decisões tomadas com base na plataforma.", "legal_h2": "2. Fontes de Dados de Terceiros", "legal_p3": "A arquitetura é alimentada pela Agência Espacial Europeia (Copernicus) e pelo Serviço Meteorológico Nacional (SMN). Não garantimos 100% de tempo de atividade em caso de falhas em servidores governamentais.", "legal_h3": "3. Uso e Licenças", "legal_p4": "O acesso de avaliação dura 48 horas. A extração da web, revenda de informações ou compartilhamento de credenciais sem uma licença comercial é explicitamente proibida.",
        "legal_h4": "4. Limitação de Responsabilidade", "legal_p5": "Em nenhum caso a MetricPoint, seus desenvolvedores ou afiliados serão responsáveis por danos diretos, indiretos, lucros cessantes, perda de safra, falha no sistema de irrigação ou danos decorrentes de decisões agronômicas ou de negócios tomadas com base nas informações fornecidas pela Plataforma.", 
        "legal_h5": "5. Lei Aplicável e Jurisdição (Foro)", "legal_p6": "Estes Termos e Condições serão regidos e interpretados de acordo com as leis do Estado de Nova York, EUA. Qualquer disputa, controvérsia ou litígio decorrente em relação à Plataforma será submetido à jurisdição exclusiva dos tribunais estaduais e federais localizados no Condado de Nova York, Nova York.", "btn_close": "Fechar",
        "priv_title": "Aviso de Privacidade", "priv_h1": "1. Informações que coletamos", "priv_p1": "Coletamos suas informações corporativas, e-mail (com senha criptografada em hash) e coordenadas geoespaciais (polígonos) dos lotes analisados para calcular balanços hídricos. Os históricos de consultas, coordenadas agrícolas e diagnósticos financeiros são processados e armazenados usando criptografia de nível militar. A Plataforma opera com uma arquitetura de conhecimento zero.", "priv_h2": "2. Compartilhamento com Terceiros", "priv_p2": "MetricPoint não vende nem negocia seus dados. Enviamos coordenadas anonimamente para o Google Earth Engine e a Agência Espacial Europeia exclusivamente para o processamento de imagens SAR e Modelos 3D.", "priv_h3": "3. Direitos do Usuário", "priv_p3": "Em conformidade com os regulamentos vigentes, você pode solicitar a exclusão permanente de sua conta corporativa, perfil e polígonos criptografados entrando em contato com o administrador do sistema a qualquer momento.",
        "hub_subtitle": "Selecione o módulo de análise que deseja usar", "mod_hydro_desc": "Monitoramento hidrológico, alertas precoces de cheias e status da bacia.", "mod_mine_desc": "Auditoria ESG, estresse hídrico em salinas e saúde de áreas úmidas altoandinas.", "mine_header_subtitle": "Módulo de Monitoramento de Mineração e ESG", "hydro_header_subtitle": "Hydrological Early Warning", "hydro_title": "[ CENTRO DE OPERAÇÕES HIDROLÓGICAS - TUCUMÁN ]", "hydro_tab_adv": "⚠️ Painel de Alertas", "hydro_tab_sit": "📊 Situação Atual (Bacia)", "hydro_tab_admin": "⚙️ Uso Interno (Admin)", "hydro_normal_title": "Nível Operacional Normal", "hydro_normal_desc": "A bacia não registra anomalias hidrológicas no momento.", "hydro_radar_badge": "RADAR DE SATÉLITE ATIVO", "hydro_history_title": "[ HISTÓRICO DE EVENTOS ]", "hydro_no_history": "Nenhum evento registrado na sessão atual.", "hydro_rfs_title": "[ RFS : RIVER FORECAST SYSTEM - BACIA TUCUMÁN ]", "hydro_rfs_sub": "Modelo hidrológico global de vazão e risco de inundações (GEOGLOWS)", "hydro_summary_title": "[ TELEMETRIA E STATUS DA BACIA - TEMPO REAL ]", "hydro_btn_refresh": "🔄 Atualizar Dados", "btn_gps": "📍 Usar Minha Localização GPS (4 ha)",
        "tab_intro_who": "Quem Somos", "tab_intro_prod": "Nuestros Productos", "tab_intro_contact": "Contato", "who_title": "MetricPoint: Inteligência Geoespacial", "who_p1": "A MetricPoint é uma plataforma AgTech de ponta especializada em inteligência geoespacial e modelagem agronômica usando tecnologia de satélite SAR.", "who_p2": "Com uma base sólida de operações e pesquisas nos Estados Unidos, desenvolvemos soluções que ultrapassam os limites do monitoramento de safras.", "who_p3": "Estamos nos preparando para um grande lançamento na Argentina, trazendo nossa suíte para revolucionar a agricultura de precisão na América do Sul, antecipando o estresse hídrico com precisão milimétrica.", "prod_gem_title": "Gêmeos Digitais Volumétricos", "prod_gem_desc": "Visualize o subsolo do seu campo como nunca antes. Nossa tecnologia 3D permite tomografia de terreno em tempo real, identificando a distribuição exata da umidade edáfica para otimizar a irrigação e prevenir o estresse hídrico antes que seja irreversível.", "prod_rvi_title": "Vigor RVI e Monitoramento Fenológico", "prod_rvi_desc": "Vá além dos índices ópticos tradicionais. Correlacionamos o vigor estrutural da cultura (Radar Vegetation Index) com o balanço hídrico profundo do solo para prever com precisão o potencial produtivo, sem interferência de nuvens.", "prod_pol_title": "MetricPoli: Polinização e Fenologia", "prod_pol_desc": "Suite completa de polinização. Monitore o desempenho das colmeias e as fases fenológicas da cultura para maximizar a frutificação, garantindo colheitas sustentáveis e altamente produtivas.", "contact_title": "Entre em Contato", "contact_desc": "Interessado em levar a tecnologia da MetricPoint para seus campos? Envie-nos uma mensagem.", "contact_name": "Nome Completo", "contact_msg": "Sua Mensagem", "btn_send": "Enviar Mensagem",
        "wf_title": "WEATHER FORECAST", "wf_subtitle": "Módulo de Assimilação Agrometeorológica", "support_title": "Suporte MetricPoint", "support_desc": "Canal habilitado para contato, envie-nos sua pergunta.", "support_btn": "Canal de Contato", "msg_auth_err": "Preencha todos os campos obrigatórios.", "msg_login": "Iniciando sessão...", "msg_reg": "Registrando perfil corporativo...", "msg_err_serv": "Erro de conexão com o servidor."
    }
};

// ==========================================
// 2. NÚCLEO DE APLICACIÓN Y UI
// ==========================================
function cambiarIdioma(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (traducciones[lang] && traducciones[lang][key]) {
            if ((el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && el.hasAttribute('placeholder')) { 
                el.placeholder = traducciones[lang][key]; 
            } else { el.innerHTML = traducciones[lang][key]; }
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('visible'); } else { entry.target.classList.remove('visible'); } });
    }, { threshold: 0.2 }); 

    document.querySelectorAll('.tech-card, .product-showcase').forEach(card => observer.observe(card));
    if (localStorage.getItem("metric_token")) {
        document.getElementById("landingWrapper").style.display = "none"; document.getElementById("workspace").style.display = "block"; document.getElementById("dashboardHub").style.display = "block";
    }
    cambiarIdioma(document.getElementById('langSwitch').value);
});

function abrirIntroTab(tabId, elementoBtn) {
    document.querySelectorAll('.intro-tab-content').forEach(tab => tab.classList.remove('active')); 
    document.querySelectorAll('.intro-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).classList.add('active'); 
    elementoBtn.classList.add('active'); 
}
function abrirTyC() { document.getElementById('modalTyC').style.display = 'flex'; }
function cerrarTyC() { document.getElementById('modalTyC').style.display = 'none'; }
function abrirPrivacidad() { document.getElementById('modalPrivacidad').style.display = 'flex'; }
function cerrarPrivacidad() { document.getElementById('modalPrivacidad').style.display = 'none'; }
function mostrarRegistro() { document.getElementById('loginFormContainer').style.display = 'none'; document.getElementById('registerFormContainer').style.display = 'block'; document.getElementById('authStatusReg').innerText = ''; }
function mostrarLogin() { document.getElementById('registerFormContainer').style.display = 'none'; document.getElementById('loginFormContainer').style.display = 'block'; document.getElementById('authStatusLogin').innerText = ''; }
function getMsg(key) { return traducciones[document.getElementById('langSwitch').value][key] || key; }
function cerrarSesion() { localStorage.removeItem("metric_token"); localStorage.removeItem("metric_email"); location.reload(); }

function abrirModulo(moduloId) {
    ['dashboardHub','moduloAgrometeo','moduloPronostico','moduloMetricPoli','moduloHydro','moduloMining'].forEach(id => document.getElementById(id).style.display = 'none');
    
    if (moduloId === 'agrometeo') { document.getElementById('moduloAgrometeo').style.display = 'block'; setTimeout(() => { if(map) map.invalidateSize(); }, 100); } 
    else if (moduloId === 'pronostico') { document.getElementById('moduloPronostico').style.display = 'block'; }
    else if (moduloId === 'metricpoli') { document.getElementById('moduloMetricPoli').style.display = 'block'; }
    else if (moduloId === 'hydro') { 
        document.getElementById('moduloHydro').style.display = 'block'; 
        if (!window.hydroMap) {
            window.hydroMap = L.map('hydroMap').setView([-27.633, -65.250], 10);
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; CARTO' }).addTo(window.hydroMap);
        } else { setTimeout(() => window.hydroMap.invalidateSize(), 100); }
    }
    else if (moduloId === 'mining') { document.getElementById('moduloMining').style.display = 'block'; }
}

function volverAlHub() { 
    ['moduloAgrometeo','moduloPronostico','moduloMetricPoli','moduloHydro','moduloMining'].forEach(id => document.getElementById(id).style.display = 'none');
    document.getElementById('dashboardHub').style.display = 'block'; 
}

// ==========================================
// 3. SEGURIDAD Y CONEXIÓN
// ==========================================
async function hacerRegistroCorp() {
    const r_social = document.getElementById("regRazon").value; const r_cuit = document.getElementById("regCuit").value; const r_domicilio = document.getElementById("regDomicilio").value; const r_nombre = document.getElementById("regNombre").value; const r_cargo = document.getElementById("regCargo").value; const r_tel = document.getElementById("regTel").value; const r_email = document.getElementById("regEmail").value; const r_password = document.getElementById("regPassword").value; const r_coord = document.getElementById("regCoord").value; const r_hec = document.getElementById("regHectareas").value; const r_cultivo = document.getElementById("regCultivo").value;
    const tycChecked = document.getElementById("chkLegalReg").checked; const statusLabel = document.getElementById("authStatusReg");
    if(!r_social || !r_cuit || !r_nombre || !r_email || !r_password || !r_coord || !r_hec) { statusLabel.innerText = getMsg("msg_auth_err"); return; }
    if(!tycChecked) { statusLabel.innerText = getMsg("msg_tyc_req"); return; }
    statusLabel.innerText = getMsg("msg_reg");
    try {
        const payload = { razon_social: r_social, cuit: r_cuit, domicilio: r_domicilio, nombre_contacto: r_nombre, cargo: r_cargo, telefono: r_tel, email: r_email, password: r_password, coordenadas: r_coord, hectareas: parseFloat(r_hec), cultivo: r_cultivo };
        const res = await fetch(`${BACKEND_URL}/api/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const data = await res.json();
        if(res.ok) { 
            localStorage.setItem("metric_token", data.token); localStorage.setItem("metric_email", r_email); 
            document.getElementById("landingWrapper").style.display = "none"; document.getElementById("workspace").style.display = "block"; document.getElementById("dashboardHub").style.display = "block"; 
        } else { statusLabel.innerText = data.error || "Error al registrar cliente corporativo."; }
    } catch(e) { statusLabel.innerText = getMsg("msg_err_serv"); }
}

async function hacerLogin() {
    const email = document.getElementById("authEmail").value; const password = document.getElementById("authPassword").value; const statusLabel = document.getElementById("authStatusLogin");
    if(!email || !password) { statusLabel.innerText = getMsg("msg_auth_err"); return; }
    statusLabel.innerText = getMsg("msg_login");
    try {
        const res = await fetch(`${BACKEND_URL}/api/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
        const data = await res.json();
        if(res.ok) { 
            localStorage.setItem("metric_token", data.token); localStorage.setItem("metric_email", email); 
            document.getElementById("landingWrapper").style.display = "none"; document.getElementById("workspace").style.display = "block"; document.getElementById("dashboardHub").style.display = "block"; 
        } else { statusLabel.innerText = data.error; }
    } catch(e) { statusLabel.innerText = getMsg("msg_err_serv"); }
}

// ==========================================
// 4. MAPA LEAFLET PARA DRAWING
// ==========================================
var map = L.map('map').setView([-27.00, -65.30], 11);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {maxZoom: 18}).addTo(map);
L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {maxZoom: 18}).addTo(map);
var drawnItems = new L.FeatureGroup(); map.addLayer(drawnItems);
var drawControl = new L.Control.Draw({ draw: { polyline: false, polygon: true, circle: false, rectangle: false, marker: false }, edit: { featureGroup: drawnItems } }); map.addControl(drawControl);
var poligonoActual = null; map.on(L.Draw.Event.CREATED, function (event) { drawnItems.clearLayers(); drawnItems.addLayer(event.layer); poligonoActual = event.layer.toGeoJSON().geometry.coordinates; });

window.datosSimulacion = []; window.parametrosSimulacion = null; window.topografiaLote = []; window.datosLocalesManuales = []; window.ultimoDatoCalculado = null; 

function obtenerUbicacionGPS() {
    if (navigator.geolocation) {
        document.getElementById('status').innerText = 'Obteniendo coordenadas satelitales...'; document.getElementById('status').style.color = '#08306b';
        navigator.geolocation.getCurrentPosition(crearCuadriculaDesdeGPS, function(error) { document.getElementById('status').innerText = 'Error obteniendo GPS: ' + error.message; document.getElementById('status').style.color = '#d73027'; });
    } else { alert("Geolocalización no soportada."); }
}

function crearCuadriculaDesdeGPS(position) {
    const lat = position.coords.latitude; const lon = position.coords.longitude;
    const dLat = 100 / 111320; const dLon = 100 / (111320 * Math.cos(lat * Math.PI / 180));
    const coordsGeoJSON = [ [lon - dLon, lat + dLat], [lon + dLon, lat + dLat], [lon + dLon, lat - dLat], [lon - dLon, lat - dLat], [lon - dLon, lat + dLat] ];
    poligonoActual = [coordsGeoJSON];
    drawnItems.clearLayers();
    const latlngs = [ [lat + dLat, lon - dLon], [lat + dLat, lon + dLon], [lat - dLat, lon + dLon], [lat - dLat, lon - dLon] ];
    const rect = L.polygon(latlngs, {color: '#31a354', weight: 3}).addTo(drawnItems);
    map.fitBounds(rect.getBounds(), {padding: [20, 20]});
    document.getElementById('status').innerText = '✅ Polígono de 4 ha generado mediante GPS.'; document.getElementById('status').style.color = '#31a354';
}

function agregarDatoManual() {
    const f = document.getElementById('m_fecha').value, ll = document.getElementById('m_lluvia').value, et = document.getElementById('m_et0').value;
    if (!f) return alert("Select Date");
    let registro = { timestamp: f }; if (ll !== "") registro.lluvia = parseFloat(ll); if (et !== "") registro.et0 = parseFloat(et);
    window.datosLocalesManuales = window.datosLocalesManuales.filter(b=>b.timestamp!==f); window.datosLocalesManuales.push(registro);
    document.getElementById('m_status').innerText = `${window.datosLocalesManuales.length} records.`; document.getElementById('m_lluvia').value = ''; document.getElementById('m_et0').value = ''
}

function abrirPestana(tabId, elementoBtn) {
    document.querySelectorAll('#moduloAgrometeo .tab-content').forEach(tab => tab.classList.remove('active')); 
    document.querySelectorAll('#moduloAgrometeo .tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabId).classList.add('active'); elementoBtn.classList.add('active'); document.getElementById('infoClima').style.display = tabId === 'tabClima' ? 'block' : 'none';
    setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 10);
}

function generarInforme(datos, params) {
    const lluviaTotal = datos.reduce((acc, d) => acc + d.Lluvia, 0); const et0Promedio = datos.reduce((acc, d) => acc + d.ET0, 0) / datos.length; const humUltima = datos[datos.length-1].Humedad_100cm;
    let texto = getMsg("diag_base").replace("START", datos[0].timestamp).replace("END", datos[datos.length-1].timestamp).replace("RAIN", lluviaTotal.toFixed(1)).replace("ET0", et0Promedio.toFixed(1));
    if (lluviaTotal < (et0Promedio * datos.length * 0.5)) { texto += getMsg("diag_def"); } else { texto += getMsg("diag_fav"); }
    let aguaUtil = (humUltima - params.PMP) / (params.CC - params.PMP);
    if (aguaUtil > 0.65) { texto += getMsg("diag_opt"); } else if (aguaUtil > 0.35) { texto += getMsg("diag_reg"); } else { texto += getMsg("diag_crit"); }
    document.getElementById('textoInforme').innerHTML = texto; document.getElementById('contenedorInforme').style.display = 'block';
}

// ==========================================
// 5. MOTOR DE GRÁFICOS (PLOTLY PURO)
// ==========================================
async function correrAnalisis() {
    if (!poligonoActual) return document.getElementById('status').innerText = 'Error: Draw polygon.';
    const token = localStorage.getItem("metric_token"); if (!token) { document.getElementById("workspace").style.display = "none"; document.getElementById("landingWrapper").style.display = "flex"; return; }
    document.getElementById('status').innerText = 'Simulating...'; document.getElementById('status').style.color = '#08306b';
    ['contenedorInforme','tabMenu','contenedorLineasAgro','contenedorCalor','contenedorLineasClima','contenedor3D','contenedorGeo3D','infoSuelo','infoClima'].forEach(id => document.getElementById(id).style.display = 'none');
    try {
        const response = await fetch(`${BACKEND_URL}/api/calcular`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: token, start_date: document.getElementById('startDate').value, end_date: document.getElementById('endDate').value, fecha_siembra: document.getElementById('siembraDate').value, coordenadas: poligonoActual, datos_locales: window.datosLocalesManuales }) });
        const jsonResponse = await response.json();
        if (response.status === 403 && jsonResponse.error === "TRIAL_EXPIRED") { document.getElementById('status').innerText = ''; document.getElementById('paywallScreen').style.display = 'flex'; return; }
        if (response.ok) {
            document.getElementById('status').innerText = 'Analysis Complete!'; document.getElementById('status').style.color = '#31a354';
            window.datosSimulacion = jsonResponse.data; window.parametrosSimulacion = jsonResponse.suelo; window.topografiaLote = jsonResponse.topografia; 
            document.getElementById('infoSuelo').style.display = 'block'; document.getElementById('valArena').innerText = jsonResponse.suelo.Arena; document.getElementById('valArcilla').innerText = jsonResponse.suelo.Arcilla; document.getElementById('valCC').innerText = jsonResponse.suelo.CC.toFixed(3); document.getElementById('valPMP').innerText = jsonResponse.suelo.PMP.toFixed(3);
            let act = {}; jsonResponse.data.forEach(b => { let m = b.timestamp.substring(0,7); act[m] = (act[m]||0)+b.Lluvia; }); document.getElementById('listaMeses').innerHTML = Object.entries(act).filter(a=>a[1]>0).map(a=>`<li>${a[0]}: <strong>${a[1].toFixed(1)} mm</strong></li>`).join('');
            
            window.ultimoDatoCalculado = jsonResponse.data[jsonResponse.data.length - 1];
            generarInforme(jsonResponse.data, jsonResponse.suelo); 
            ['tabMenu','contenedorLineasAgro','contenedorCalor','contenedorLineasClima','contenedor3D'].forEach(id => document.getElementById(id).style.display = 'flex'); 
            abrirPestana('tabAgronomia', document.querySelector('#moduloAgrometeo .tab-btn.active')); 
            
            renderizarGraficosPuros(jsonResponse.data, jsonResponse.suelo);

            let uF = window.ultimoDatoCalculado.timestamp;
            document.getElementById('fechaConsultaGeo3D').value = uF; document.getElementById('fechaConsultaGemelo').value = uF;
            consultarFechaGlobal('fechaConsultaGemelo'); 
        } else { document.getElementById('status').innerText = 'Error: ' + jsonResponse.error; }
    } catch (error) { document.getElementById('status').innerText = 'Server Error.'; }
}

function renderizarGraficosPuros(datos, params) {
    const fechas = datos.map(a => a.timestamp); 
    const lluvia = datos.map(a => a.Lluvia), et0 = datos.map(a => a.ET0), fisio = datos.map(a => a.Modelo_Fisiologico), g = datos.map(a => a.RVI_Crudo), h = datos.map(a => a.Proxy_Humedad); 
    const i = datos.map(a => a.Humedad_10cm), j = datos.map(a => a.Humedad_30cm), k = datos.map(a => a.Humedad_60cm), l = datos.map(a => a.Humedad_100cm); 
    const m = params ? params.CC : .3, n = params ? params.PMP : .15;
    
    // PLOTLY 2D
    var traceHum = { x: fechas, y: h, name: 'Humedad SAR', type: 'scatter', line: {color: '#1f77b4', width: 3} };
    var traceVig = { x: fechas, y: g, name: 'Vigor RVI', type: 'scatter', yaxis: 'y2', line: {color: '#2ca02c', width: 3} };
    var traceFis = { x: fechas, y: fisio, name: 'Modelo Ideal', type: 'scatter', yaxis: 'y2', line: {color: '#333333', width: 2, dash: 'dot'} };
    Plotly.newPlot('chartAgro', [traceHum, traceVig, traceFis], { margin: { t: 20, b: 40, l: 50, r: 50 }, yaxis: { title: 'Humedad (v/v)', range: [0, 0.6] }, yaxis2: { title: 'Vigor', overlaying: 'y', side: 'right', range: [0, 1.2] }, legend: { orientation: 'h', y: -0.2 } }, {responsive: true});

    var traceRain = { x: fechas, y: lluvia, name: 'Lluvia (mm)', type: 'bar', marker: {color: '#1f77b4'} };
    var traceEt0 = { x: fechas, y: et0, name: 'ET0', type: 'scatter', line: {color: '#ff7f0e', dash: 'dash'} };
    Plotly.newPlot('chartClima', [traceRain, traceEt0], { margin: { t: 20, b: 40, l: 50, r: 50 }, yaxis: { title: 'Milímetros (mm)' }, legend: { orientation: 'h', y: -0.2 } }, {responsive: true});
    
    // PLOTLY 3D
    const o = Math.max(0, n - .03); const p = m + .05; const q = (p - o) / 10;
    let r = [], s = []; for (let a = 0; a <= 5; a++) { let b = o + a * (p - o) / 5; r.push(b); s.push(`${b.toFixed(2)} (${(b * 100).toFixed(0)}%)`); }
    const t = [[0, "#d7191c"], [.25, "#fdae61"], [.5, "#ffffbf"], [.75, "#abdda4"], [1, "#2b83ba"]];
    
    var u = [{ z: [l, k, j, i, i], x: fechas, y: [-100,-60,-30,-10,0], type: 'contour', colorscale: t, zmin: o, zmax: p, contours: { coloring: 'fill', showlines: true, start: o, end: p, size: q }, colorbar: { title: 'Moisture', thickness: 15, tickvals: r, ticktext: s } }]; 
    Plotly.newPlot('soilHeatmap', u, {margin: { t: 20, b: 50, l: 90, r: 40 }, yaxis: { title: 'Depth', tickvals: [0, -10, -30, -60, -100], ticktext: ["Surface", "-10 cm", "-30 cm", "-60 cm", "-100 cm"] }}, {responsive: true});
    
    var v = [{ z: [l, k, j, i, i], x: fechas, y: [-100,-60,-30,-10,0], type: 'surface', colorscale: t, cmin: o, cmax: p, colorbar: { title: 'm³/m³', thickness: 15, tickvals: r, ticktext: s } }]; 
    Plotly.newPlot('soil3D', v, { margin: { l: 0, r: 0, b: 0, t: 30 }, scene: { xaxis: { title: 'Date' }, yaxis: { title: 'Depth (cm)', tickvals: [0, -10, -30, -60, -100] }, zaxis: { title: 'Moisture (V/V)', range: [Math.max(0, n - .05), m + .15] }, camera: { eye: { x: 1.3, y: -1.6, z: 0.6 } } } }, {responsive: true});
}

function isPointInPoly(pt, poly) { let x = pt[0], y = pt[1], isInside = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { let xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1]; let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi); if (intersect) isInside = !isInside; } return isInside; }

function renderizarGeo3D(dato, parametros_suelo, puntosDEM) {
    let poly = poligonoActual[0]; let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity; poly.forEach(p => { if(p[0]<minX)minX=p[0]; if(p[0]>maxX)maxX=p[0]; if(p[1]<minY)minY=p[1]; if(p[1]>maxY)maxY=p[1]; });
    const gridSize = 60; let xArr = [], yArr = []; for(let i=0; i<gridSize; i++) { xArr.push(minX + (maxX-minX)*(i/(gridSize-1))); yArr.push(minY + (maxY-minY)*(i/(gridSize-1))); }
    let minCota = Infinity, maxCota = -Infinity; if (puntosDEM && puntosDEM.length > 0) { puntosDEM.forEach(p => { if (p.z<minCota) minCota=p.z; if (p.z>maxCota) maxCota=p.z; }); } else { minCota = 0; maxCota = 1; }
    let rangoCota = (maxCota - minCota) === 0 ? 1 : (maxCota - minCota);
    function getRelieveZ(lon, lat) { if (!puntosDEM || puntosDEM.length === 0) return 0; let sum_w = 0, sum_z_w = 0, smoothing = 0.00005; for (let i = 0; i < puntosDEM.length; i++) { let p = puntosDEM[i], d2 = Math.pow(p.lon-lon, 2) + Math.pow(p.lat-lat, 2); let w = 1/(d2+smoothing); sum_w += w; sum_z_w += (p.z-minCota)*w; } return sum_z_w / sum_w; }
    const layers = [ { name: '10 cm', offset: 0, hum: dato.Humedad_10cm }, { name: '30 cm', offset: -25, hum: dato.Humedad_30cm }, { name: '60 cm', offset: -50, hum: dato.Humedad_60cm }, { name: '100 cm', offset: -75, hum: dato.Humedad_100cm } ];
    const colorScaleRojoPurpura = [[0.0, 'rgb(215,25,28)'], [0.25, 'rgb(253,174,97)'], [0.5, 'rgb(255,255,191)'], [0.75, 'rgb(44,123,182)'], [1.0, 'rgb(128,0,128)']];
    let globalMin = Math.max(0.01, Math.min(dato.Humedad_10cm, dato.Humedad_30cm, dato.Humedad_60cm, dato.Humedad_100cm) - 0.10); let globalMax = Math.min(1.0, Math.max(dato.Humedad_10cm, dato.Humedad_30cm, dato.Humedad_60cm, dato.Humedad_100cm) + 0.10);
    let traces = [];
    layers.forEach((layer, index) => {
        let zMatrix = [], colorMatrix = [], textMatrix = [];
        for(let j=0; j<gridSize; j++) { let zRow = [], cRow = [], tRow = []; for(let i=0; i<gridSize; i++) { if (isPointInPoly([xArr[i], yArr[j]], poly)) { let relieveBase = getRelieveZ(xArr[i], yArr[j]); zRow.push(relieveBase + layer.offset); let cotaNorm = (relieveBase - minCota) / rangoCota; let factorAgua = (0.5 - cotaNorm); let humedadLocal = layer.hum + (factorAgua * 0.15); humedadLocal = Math.max(0.01, Math.min(1.0, humedadLocal)); cRow.push(humedadLocal); tRow.push(`Moisture: ${humedadLocal.toFixed(3)} m³/m³<br>Level: ${layer.name}`); } else { zRow.push(null); cRow.push(null); tRow.push(null); } } zMatrix.push(zRow); colorMatrix.push(cRow); textMatrix.push(tRow); }
        traces.push({ name: `Prof: ${layer.name}`, x: xArr, y: yArr, z: zMatrix, surfacecolor: colorMatrix, text: textMatrix, type: "surface", colorscale: colorScaleRojoPurpura, cauto: false, cmin: globalMin, cmax: globalMax, showscale: index === 0, colorbar: { title: "Moisture", thickness: 15, len: .8, y: .5, tickformat: ".3f" }, hoverinfo: 'text', opacity: 1 });
    });
    Plotly.purge('soilGeo3D'); Plotly.newPlot('soilGeo3D', traces, { margin: { l:0, r:0, b:0, t:0 }, scene: { xaxis: {title: 'Longitud', visible: true}, yaxis: {title: 'Latitud', visible: true}, zaxis: {visible:false}, camera: { eye: {x:1.3, y:-1.6, z:0.6} }, aspectratio: {x:1, y:1, z:0.9} }, paper_bgcolor: "#ffffff" }, {responsive: !0});
}

function construirGemeloVolumetricoInteractiva(dato, parametros_suelo, puntosDEM, profundidadSeleccionada) {
    if (!dato || !poligonoActual) return;
    let poly = poligonoActual[0]; let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity; poly.forEach(p => { if(p[0]<minX)minX=p[0]; if(p[0]>maxX)maxX=p[0]; if(p[1]<minY)minY=p[1]; if(p[1]>maxY)maxY=p[1]; });
    const gridSize = 60; let minCota = Infinity, maxCota = -Infinity; if (puntosDEM && puntosDEM.length > 0) { puntosDEM.forEach(p => { if (p.z<minCota) minCota=p.z; if (p.z>maxCota) maxCota=p.z; }); } else { minCota = 0; maxCota = 1; }
    let rangoCota = (maxCota - minCota) === 0 ? 1 : (maxCota - minCota);
    function getRelieveZ(lon, lat) { if (!puntosDEM || puntosDEM.length === 0) return 0; let sum_w = 0, sum_z_w = 0, smoothing = 0.00005; for (let i = 0; i < puntosDEM.length; i++) { let p2 = puntosDEM[i]; let d2 = Math.pow(p2.lon-lon, 2) + Math.pow(p2.lat-lat, 2); let w = 1/(d2+smoothing); sum_w += w; sum_z_w += p2.z*w; } return sum_z_w / sum_w; }
    let profTop = parseInt(profundidadSeleccionada); let profBot = 100; const colorScaleRojoPurpura = [[0.0, 'rgb(215,25,28)'], [0.25, 'rgb(253,174,97)'], [0.5, 'rgb(255,255,191)'], [0.75, 'rgb(44,123,182)'], [1.0, 'rgb(128,0,128)']];
    let globalMin = Math.max(0.01, Math.min(dato.Humedad_10cm, dato.Humedad_30cm, dato.Humedad_60cm, dato.Humedad_100cm) - 0.10); let globalMax = Math.min(1.0, Math.max(dato.Humedad_10cm, dato.Humedad_30cm, dato.Humedad_60cm, dato.Humedad_100cm) + 0.10);
    let zOffsets = { 10: 0, 30: -25, 60: -50, 100: -75 }; let current_z_offset_top = zOffsets[profTop]; let current_z_offset_bot = -75; 
    let z_crop = [], c_crop = []; let z_top = [], c_top = []; let z_bot = [], c_bot = []; let scat_x = [], scat_y = [], scat_z = [], scat_c = [];
    function getHumedad(depth_cm, cotaReal) { let hum_base = dato.Humedad_10cm; if (depth_cm <= 10) hum_base = dato.Humedad_10cm; else if (depth_cm <= 30) hum_base = dato.Humedad_10cm + (dato.Humedad_30cm - dato.Humedad_10cm) * ((depth_cm - 10)/20); else if (depth_cm <= 60) hum_base = dato.Humedad_30cm + (dato.Humedad_60cm - dato.Humedad_30cm) * ((depth_cm - 30)/30); else if (depth_cm <= 100) hum_base = dato.Humedad_60cm + (dato.Humedad_100cm - dato.Humedad_60cm) * ((depth_cm - 60)/40); let cotaNorm = (cotaReal - minCota) / rangoCota; let factorAgua = (0.5 - cotaNorm); let hum = hum_base + (factorAgua * 0.15); return Math.max(0.01, Math.min(1.0, hum)); }
    let plotX = [], plotY = []; for(let i=0; i<gridSize; i++) plotX.push(minX + (maxX-minX)*(i/(gridSize-1))); for(let j=0; j<gridSize; j++) plotY.push(minY + (maxY-minY)*(j/(gridSize-1)));
    for(let j=0; j<gridSize; j++) { let row_z_crop = [], row_c_crop = []; let row_z_top = [], row_c_top = []; let row_z_bot = [], row_c_bot = []; let ry = plotY[j]; for(let i=0; i<gridSize; i++) { let rx = plotX[i]; if (isPointInPoly([rx, ry], poly)) { let cotaReal = getRelieveZ(rx, ry); row_z_crop.push(cotaReal + 15); row_c_crop.push(Math.sin(j * 2) > 0 ? 1 : 0.2); row_z_top.push(cotaReal + current_z_offset_top); row_c_top.push(getHumedad(profTop, cotaReal)); row_z_bot.push(cotaReal + current_z_offset_bot); row_c_bot.push(getHumedad(profBot, cotaReal)); if (profTop < 100 && i%2===0 && j%2===0) { for (let s = 1; s < 6; s++) { let w = s / 6; scat_x.push(rx); scat_y.push(ry); scat_z.push(cotaReal + current_z_offset_top + w * (current_z_offset_bot - current_z_offset_top)); scat_c.push(getHumedad(profTop + w * (profBot - profTop), cotaReal)); } } } else { row_z_crop.push(null); row_c_crop.push(null); row_z_top.push(null); row_c_top.push(null); row_z_bot.push(null); row_c_bot.push(null); } } z_crop.push(row_z_crop); c_crop.push(row_c_crop); z_top.push(row_z_top); c_top.push(row_c_top); z_bot.push(row_z_bot); c_bot.push(row_c_bot); }
    const trace_crop = { x: plotX, y: plotY, z: z_crop, surfacecolor: c_crop, type: 'surface', colorscale: [[0, '#4a2f1d'], [0.5, '#784725'], [1, '#166534']], showscale: false, opacity: 1, name: 'Superficie', hovertemplate: "<b>Capa Vegetal</b><extra></extra>" };
    const trace_hum_top = { x: plotX, y: plotY, z: z_top, surfacecolor: c_top, type: 'surface', colorscale: colorScaleRojoPurpura, cmin: globalMin, cmax: globalMax, cauto: false, showscale: true, colorbar: { title: 'Moisture', thickness: 15, len: 0.8, y: 0.5, tickformat: '.3f' }, opacity: 1.0, name: `Capa Consultada` };
    const trace_hum_bot = { x: plotX, y: plotY, z: z_bot, surfacecolor: c_bot, type: 'surface', colorscale: colorScaleRojoPurpura, cmin: globalMin, cmax: globalMax, cauto: false, showscale: false, opacity: 1.0, name: `Fondo de Humedad` };
    const trace_scatter = { x: scat_x, y: scat_y, z: scat_z, mode: 'markers', type: 'scatter3d', marker: { size: 5, color: scat_c, colorscale: colorScaleRojoPurpura, cmin: globalMin, cmax: globalMax, cauto: false, opacity: 0.08 }, name: 'Interior', showlegend: false };
    let periX = [], periY = [], periZ_100 = [], periZ_110 = [], periC = []; for(let k = 0; k < poly.length; k++) { let pt = poly[k]; let cotaReal = getRelieveZ(pt[0], pt[1]); periX.push(pt[0]); periY.push(pt[1]); periZ_100.push(cotaReal - 75.0); periZ_110.push(cotaReal - 85.0); periC.push(0); } periX.push(periX[0]); periY.push(periY[0]); periZ_100.push(periZ_100[0]); periZ_110.push(periZ_110[0]); periC.push(0);
    const trace_skirt = { x: [periX, periX], y: [periY, periY], z: [periZ_100, periZ_110], surfacecolor: [periC, periC], type: 'surface', colorscale: [[0, '#3e2723'], [1, '#3e2723']], showscale: false, hoverinfo: 'none', name: 'Base Sólida (-110cm)' };
    Plotly.react('soilGemeloVolumetrico', [trace_crop, trace_hum_top, trace_hum_bot, trace_scatter, trace_skirt], { paper_bgcolor: 'transparent', plot_bgcolor: 'transparent', margin: { l: 0, r: 120, b: 0, t: 0 }, scene: { camera: { eye: { x: 1.3, y: -1.6, z: 0.6 } }, xaxis: { visible: true }, yaxis: { visible: true }, zaxis: { visible: false }, aspectratio: { x: 1, y: 1, z: 0.9 } } }, {responsive: true, displayModeBar: false});
}

function cambiarCapaGemeloVolumetrico(profundidad) { if (!window.ultimoDatoCalculado) return; construirGemeloVolumetricoInteractiva(window.ultimoDatoCalculado, window.parametrosSimulacion, window.topografiaLote, profundidad); }

function consultarFechaGlobal(inputId) {
    const fecha = document.getElementById(inputId).value;
    if (!fecha || window.datosSimulacion.length === 0) return alert("Seleccione una fecha válida.");
    const dato = window.datosSimulacion.find(d => d.timestamp === fecha);
    if (dato) {
        window.ultimoDatoCalculado = dato;
        document.getElementById('rG_10').innerText = dato.Humedad_10cm.toFixed(3); document.getElementById('rG_30').innerText = dato.Humedad_30cm.toFixed(3); document.getElementById('rG_60').innerText = dato.Humedad_60cm.toFixed(3); document.getElementById('rG_100').innerText = dato.Humedad_100cm.toFixed(3); document.getElementById('rG_et0').innerText = dato.ET0.toFixed(1);
        document.getElementById('rB_10').innerText = dato.Humedad_10cm.toFixed(3); document.getElementById('rB_30').innerText = dato.Humedad_30cm.toFixed(3); document.getElementById('rB_60').innerText = dato.Humedad_60cm.toFixed(3); document.getElementById('rB_100').innerText = dato.Humedad_100cm.toFixed(3);
        document.getElementById('resGeo3D').style.display = 'block'; document.getElementById('resGemelo').style.display = 'block';
        document.getElementById('contenedorGeo3D').style.display = 'block'; document.getElementById('lblFechaGeo3D').innerText = `(Date: ${dato.timestamp})`;
        document.getElementById('fechaConsultaGeo3D').value = fecha; document.getElementById('fechaConsultaGemelo').value = fecha;
        renderizarGeo3D(dato, window.parametrosSimulacion, window.topografiaLote); 
        let profPorDefecto = document.getElementById('selProfundidadGemelo').value;
        construirGemeloVolumetricoInteractiva(dato, window.parametrosSimulacion, window.topografiaLote, profPorDefecto);
    } else alert("Fecha fuera del rango de simulación.");
}

// ==========================================
// 6. FUNCIONES MÓDULO METRIC HYDRO
// ==========================================
let hydroAlertHistory = []; let hydroMapPolygon = null;
function abrirPestanaHydro(tabId, elementoBtn) { document.querySelectorAll('#moduloHydro .tab-content').forEach(tab => tab.classList.remove('active')); document.querySelectorAll('#moduloHydro .hydro-cmd-btn').forEach(btn => btn.classList.remove('active')); document.getElementById(tabId).classList.add('active'); elementoBtn.classList.add('active'); if (tabId === 'tabHydroAdv' && window.hydroMap) { setTimeout(() => window.hydroMap.invalidateSize(), 100); } if (tabId === 'tabHydroSit') { cargarEstadoCuencasReal(); } }
function verificarUsoInterno(elementoBtn) { const emailActivo = localStorage.getItem("metric_email"); if(emailActivo && emailActivo.toLowerCase() === "ews.sat@gmail.com") { abrirPestanaHydro('tabHydroInt', elementoBtn); } else { alert("Access Denied: This emergency console is exclusive to the General Administration account."); } }
function verificarUsoInternoOraculo(elementoBtn) { const emailActivo = localStorage.getItem("metric_email"); if(emailActivo && emailActivo.toLowerCase() === "ews.sat@gmail.com") { abrirPestanaHydro('tabHydroOraculo', elementoBtn); } else { alert("Acceso Denegado: El modelo predictivo requiere licencia institucional."); } }

async function cargarEstadoCuencasReal() {
    const contenedor = document.getElementById("contenedorResumenCuencas");
    try {
        const res = await fetch(`${BACKEND_URL}/api/hidro/estado`); const data = await res.json();
        if(res.ok && data.estaciones) {
            contenedor.innerHTML = data.estaciones.map(est => {
                let colorEstado = "#22c55e"; let textEstado = est.estado;
                if(textEstado === "VIGILANCIA") colorEstado = "#eab308"; else if(textEstado === "ALERTA") colorEstado = "#f97316"; else if(textEstado === "ALERTA SEVERA") colorEstado = "#ef4444"; else if(textEstado === "EMERGENCIA") colorEstado = "#831843"; else if(textEstado === "PRECAUCIÓN") colorEstado = "#eab308"; else if(textEstado === "PELIGRO") colorEstado = "#ef4444";
                return `<div style="background: #1e293b; padding: 15px; border-radius: 6px; border-left: 4px solid ${colorEstado};"><div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;"><strong style="color: #f8fafc; font-size: 14px;">${est.rio}</strong><span style="background: ${colorEstado}; color: #ffffff; padding: 3px 8px; border-radius: 4px; font-size: 10px; font-weight: bold;">${textEstado}</span></div><p style="margin: 4px 0; font-size: 12px; color: #94a3b8;">Ubicación: <span style="color:#fff;">${est.ubicacion}</span></p><p style="margin: 4px 0; font-size: 12px; color: #94a3b8;">Altura actual: <strong style="color:#fff;">${est.altura_m} m</strong></p><p style="margin: 4px 0; font-size: 12px; color: #94a3b8;">Caudal estimado: <strong style="color:#fff;">${est.caudal_m3s} m³/s</strong></p><p style="margin: 4px 0; font-size: 11px; color: #64748b;">Tendencia: ${est.tendencia}</p></div>`;
            }).join('');
        }
    } catch(e) { contenedor.innerHTML = `<div style="color: #ef4444; font-size: 13px;">Error de conexión hidrológica.</div>`; }
}

async function dispararAlertaHydro(event) {
    const msg = document.getElementById("txtAlertaHydro").value; if(!msg) return alert("Por favor, escriba un mensaje de advertencia antes de disparar.");
    const btn = event.target; const status = document.getElementById("lblStatusHydro"); btn.innerText = "PROCESANDO ENVÍO..."; status.innerText = "Conectando con el servidor...";
    try {
        const response = await fetch(`${BACKEND_URL}/api/alerta`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mensaje: msg }) });
        if(response.ok) {
            const now = new Date(); const timestamp = `${now.toLocaleDateString('es-AR')} - ${now.toLocaleTimeString('es-AR')}`;
            hydroAlertHistory.unshift({ time: timestamp, text: msg });
            document.getElementById("msgSinHistorial").style.display = "none";
            document.getElementById("historialAlertas").innerHTML = hydroAlertHistory.map(alerta => `<div class="alert-history-item"><span class="alert-history-time">📅 ${alerta.time}</span>${alerta.text}</div>`).join('');
            const advCont = document.getElementById("advContainer"); advCont.className = "chart-container alert-active"; 
            document.getElementById("advIcon").innerText = "🚨"; document.getElementById("advTitle").innerText = "ALERTA ACTIVA"; document.getElementById("advTitle").style.color = "#dc2626"; document.getElementById("advText").innerText = msg; document.getElementById("advText").style.color = "#991b1b";
            if (window.hydroMap) { if (hydroMapPolygon) window.hydroMap.removeLayer(hydroMapPolygon); hydroMapPolygon = L.circle([-27.633, -65.250], { color: '#ef4444', fillColor: '#f43f5e', fillOpacity: 0.5, radius: 12000 }).addTo(window.hydroMap); window.hydroMap.fitBounds(hydroMapPolygon.getBounds()); }
            status.innerText = "✅ Orden enviada a Twilio."; btn.innerText = "🚀 DISPARAR NUEVA ALERTA"; document.getElementById("txtAlertaHydro").value = ""; actualizarContadorSMS();
        } else { status.innerText = "❌ El servidor rechazó la orden."; btn.innerText = "🚀 REINTENTAR"; }
    } catch(e) { status.innerText = "❌ Error de red."; btn.innerText = "🚀 REINTENTAR"; }
}

function actualizarContadorSMS() { const texto = document.getElementById("txtAlertaHydro").value; const contador = document.getElementById("contadorSMS"); if (contador) { contador.innerText = `${texto.length} / 160 caracteres`; contador.style.color = texto.length >= 150 ? "#991b1b" : "#e11d48"; } }

async function dispararWhatsAppPersonal() {
    const mensaje = document.getElementById("txtAlertaWA").value; if (!mensaje) return alert("Escriba el mensaje para WhatsApp.");
    try { await navigator.clipboard.writeText(mensaje); alert("✅ Copiado al portapapeles. Se abrirá WhatsApp."); const esCelular = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent); window.location.href = esCelular ? "whatsapp://app" : "https://web.whatsapp.com"; } 
    catch (err) { alert("❌ El navegador bloqueó el copiado automático. Por favor, copiá manualmente."); }
}

async function consultarOraculo(event) {
    const lluviaSinguil = parseFloat(document.getElementById("oraLluviaSinguil").value) || 0; const lluviaLlanura = parseFloat(document.getElementById("oraLluviaLlanura").value) || 0; const cotaAyer = parseFloat(document.getElementById("oraCotaAyer").value) || 624.00; const cotaActual = parseFloat(document.getElementById("oraCotaEscaba").value) || 625.50;
    const status = document.getElementById("lblStatusOraculo"); const btn = event.target; btn.innerText = "FORZANDO SIMULACIÓN..."; document.getElementById("resOraculoBox").style.display = "none"; document.getElementById("resOraWait").style.display = "block";
    try {
        const response = await fetch(`${BACKEND_URL}/api/hidro/prediccion_24h`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ cota_actual: cotaActual, cota_ayer: cotaAyer, lluvia_singuil_mm: lluviaSinguil, lluvia_lamadrid_mm: lluviaLlanura }) });
        const data = await response.json();
        if (response.ok) {
            document.getElementById("resOraWait").style.display = "none"; document.getElementById("resOraculoBox").style.display = "block"; document.getElementById("resOraCota").innerText = `${data.escaba_cota_proyectada} msnm`; document.getElementById("resOraCaudal").innerText = `${data.escaba_caudal_erogado} m³/s`;
            const alertaBox = document.getElementById("resOraAlertaBox"); const btnSMS = document.getElementById("btnOraDispararSMS");
            if (data.nivel_riesgo !== "NORMAL") {
                alertaBox.style.display = "block"; btnSMS.style.display = "block"; document.getElementById("resOraAltura").innerText = `${data.madrid_altura_proyectada} m`; document.getElementById("resOraTiempo").innerText = `${data.madrid_tiempo_impacto_hs} horas`; document.getElementById("resOraNivel").innerText = data.nivel_riesgo;
                btnSMS.setAttribute("data-sms", `ALERTA ${data.nivel_riesgo} MARAPA. Altura proj: ${data.madrid_altura_proyectada}m. Impacto en ${data.madrid_tiempo_impacto_hs}hs. Dique erogando ${data.escaba_caudal_erogado}m3/s.`);
            } else { alertaBox.style.display = "none"; btnSMS.style.display = "none"; }
            status.innerText = "✅ Override Manual Completado."; btn.innerText = "▶️ FORZAR SIMULACIÓN MANUAL";
        } else { status.innerText = `❌ Error: ${data.error}`; btn.innerText = "▶️ REINTENTAR"; }
    } catch(e) { status.innerText = "❌ Error conectando al XGBoost."; btn.innerText = "▶ REINTENTAR"; }
}

function transferirOraculoAlerta() { const smsText = document.getElementById("btnOraDispararSMS").getAttribute("data-sms"); const tabAdmin = Array.from(document.querySelectorAll('.hydro-cmd-btn')).find(btn => btn.innerText.includes("Uso Interno")); if (tabAdmin) { verificarUsoInterno(tabAdmin); document.getElementById("txtAlertaHydro").value = smsText; actualizarContadorSMS(); document.getElementById("txtAlertaHydro").scrollIntoView({ behavior: 'smooth', block: 'center' }); } }
