(function () {
  "use strict";

  const qualityBatchExample = {
    tipo: "contrato_ilustrativo_no_payload_api",
    version: "1.0",
    datos: "sinteticos",
    publicar: false,
    proveedor_ia_conectado: false,
    activo: "demo.pedidos",
    reglas: [
      {
        nombre: "Importe no negativo",
        columna: "importe",
        tipo_dato: "decimal",
        dimension_propuesta: "validez",
        expresion_sql_propuesta: "importe >= 0",
        estado: "pendiente_revision"
      },
      {
        nombre: "Estado reconocido",
        columna: "estado",
        tipo_dato: "string",
        dimension_propuesta: "validez",
        vocabulario_propuesto: ["pendiente", "completado", "cancelado"],
        estado: "pendiente_revision"
      }
    ],
    revision: {
      aprobacion_negocio: "pendiente",
      validacion_tecnica: "pendiente",
      autorizacion_publicacion: "pendiente"
    },
    sandbox: {
      sql: "sin_ejecutar",
      vocabulario: "sin_validar",
      duplicados: "sin_validar"
    },
    control_por_regla: {
      registro: ["huella_contenido", "estado_remoto", "intentos", "motivo"],
      reintento: "Solo ante fallo transitorio confirmado; reconciliar antes un estado remoto incierto.",
      ejecutor: "Servicio backend; sin credenciales en el frontend."
    }
  };

  window.PORTFOLIO = {
    cases: [
      {
        id: "clasificacion",
        business: {
          question: "¿Qué datos podemos usar y qué revisión requieren?",
          intent: "Facilitar el uso responsable del dato con significado, sensibilidad y aprobación trazables.",
          contribution: "Articulación propuesta entre dueño del dato, steward y seguridad para acordar categorías, revisar sugerencias y resolver ambigüedades.",
          measure: "Medir en un piloto errores por categoría, tiempo de revisión y proporción de etiquetas con responsable y aprobación.",
          status: "Diseño de referencia",
          proof: "Mapa de arquitectura y contrato JSON sintético de clasificación."
        },
        title: "Del nombre de una columna a una clasificación defendible",
        shortTitle: "Clasificación y uso responsable de IA",
        category: "Clasificación de datos",
        summary: "GenAI como apoyo a una clasificación trazable, con contexto y aprobación del responsable del dato.",
        governance: "En este diseño, el dueño del dato define significado y sensibilidad; el steward coordina la revisión; seguridad verifica la coherencia de los atributos antes de usarlos en políticas. El criterio de avance es una clasificación aprobada, versionada y con responsable.",
        problem: "Un campo llamado identificador no explica si contiene una clave técnica, un documento personal o una referencia pública. Clasificar solo por nombre propaga etiquetas equivocadas hacia los controles de acceso.",
        approach: "El diseño combina metadatos del esquema, reglas conocidas y contexto del dominio. GenAI propone tipo semántico y sensibilidad; una revisión humana resuelve ambigüedades antes de publicar atributos en el catálogo. El diagrama conecta esa clasificación con la siguiente decisión: quién puede consumir el dato.",
        decisions: [
          { title: "Separar tipo de sensibilidad", text: "STRING describe almacenamiento. Identificador personal describe significado. Restringido expresa una decisión de gobierno. Se guardan por separado para poder revisar cada dimensión." },
          { title: "Recomendación antes que automatismo", text: "Una respuesta del modelo no concede permisos. El estado pendiente evita que una clasificación propuesta modifique automáticamente la política vigente." },
          { title: "Contexto mínimo y versión visible", text: "El contrato registra recurso, regla o modelo usado, motivo y versión. En una implementación real, las muestras solo se compartirían si están autorizadas y minimizadas." }
        ],
        evidence: "El mapa Archify muestra el recorrido entre fuentes, clasificación y catálogo. El contrato de abajo es un ejemplo sintético escrito para explicar la interfaz; no es la salida de una API ni una ejecución de un modelo.",
        limits: "Este caso publica una arquitectura de referencia. No mide precisión, no procesa datos reales y no acredita un clasificador desplegado. Para validar el enfoque harían falta un conjunto etiquetado, revisión de errores y criterios de aceptación por categoría.",
        codeLanguage: "JSON · ejemplo sintético",
        code: '{\n  "recurso": "demo.personas.documento",\n  "tipo_fisico": "STRING",\n  "propuesta": {\n    "tipo_semantico": "identificador_personal",\n    "sensibilidad": "restringido",\n    "motivo": "El contexto del esquema indica un documento personal"\n  },\n  "estado": "pendiente_revision",\n  "origen": "ejemplo_sintetico_sin_api",\n  "version_contrato": "1.0"\n}',
        related: ["revision-humana", "metadatos", "decision-explicable", "calidad-por-contrato", "gobierno-datos-ia"]
      },
      {
        id: "acceso",
        business: {
          question: "¿Quién puede usar este dato, con qué fin y bajo qué condiciones?",
          intent: "Agilizar decisiones de acceso con reglas comprensibles, restricciones explícitas y responsables definidos.",
          contribution: "Articulación propuesta entre negocio, seguridad y plataforma para separar autorización, aplicación de permisos y revisión del acceso efectivo.",
          measure: "Contrastar en un piloto decisiones esperadas y obtenidas, tiempo de resolución y solicitudes con finalidad justificada.",
          status: "Prototipo interactivo",
          proof: "Simulador local RBAC + ABAC con condiciones y decisiones explicadas."
        },
        title: "Acceso según rol y contexto del dato",
        shortTitle: "Privacidad y gobierno del acceso",
        category: "Gobierno de acceso",
        summary: "Traducir políticas de uso en controles RBAC + ABAC que permitan explicar quién accede y por qué.",
        governance: "El dueño del dato define usos permitidos; seguridad revisa la política; el equipo técnico implementa y verifica el control. El diseño propone aprobar accesos con alcance, responsable y evidencia de aplicación, no solo con una solicitud aceptada.",
        problem: "Un rol genérico de analista suele ser demasiado amplio para distinguir recursos de distintos dominios. Multiplicar roles para cada combinación de contexto vuelve difícil entender por qué alguien puede leer un dato.",
        approach: "La demostración asigna al rol una capacidad básica de lectura y evalúa atributos sobre un recurso fijo: finanzas.movimientos. Devuelve permitir, enmascarar o denegar con sus comprobaciones. La regla es local, determinista y se puede probar cambiando los cuatro atributos.",
        decisions: [
          { title: "Denegar con contexto incompleto", text: "Un rol desconocido, un atributo ausente o un valor fuera del vocabulario detiene la evaluación. El sistema no interpreta una ausencia como un permiso." },
          { title: "Una excepción tiene alcance", text: "Un auditor puede cruzar departamentos con propósito de auditoría. Un analista necesita pertenecer a finanzas y declarar analítica para consultar información no pública." },
          { title: "Decisión y aplicación son piezas distintas", text: "Enmascarar es una obligación para el componente que entrega datos. Un motor de reglas en el navegador explica la política, pero no protege un backend ni sustituye sus controles." }
        ],
        evidence: "El simulador de esta página ejecuta policy.js en el navegador. Puede reproducir decisiones y mostrar las reglas que las sustentan; sus atributos y el recurso son ficticios.",
        limits: "No hay inicio de sesión, identidad verificada ni consulta a una base de datos. En un sistema real el servidor obtendría atributos confiables, aplicaría las obligaciones y registraría la decisión. El propósito seleccionado por una persona no basta como prueba de autorización.",
        codeLanguage: "JavaScript · motor real de esta demostración",
        code: 'PolicyDemo.evaluate({\n  role: "auditor",\n  department: "operaciones",\n  sensitivity: "restringido",\n  purpose: "auditoria"\n});\n\n// decision: "mask"\n// Auditoría permite cruzar departamentos.\n// La sensibilidad obliga a enmascarar.',
        related: ["minimo-privilegio", "decision-explicable", "metadatos", "gobierno-datos-ia", "interoperabilidad"]
      },
      {
        id: "databricks",
        business: {
          question: "¿Cómo cambiar una automatización sin perder control de la entrega?",
          intent: "Reducir el riesgo de cambios y facilitar la continuidad operativa con versiones y evidencias revisables.",
          contribution: "Articulación propuesta entre negocio, ingeniería y operación para acordar aceptación, trazabilidad de versiones y respuesta ante fallos.",
          measure: "Medir en un piloto cambios con evidencia completa, fallos tras despliegue y tiempo de recuperación comprobado.",
          status: "Diseño de referencia",
          proof: "Fragmento YAML de configuración y notas de despliegue y observabilidad."
        },
        title: "Hacer que una automatización también se pueda cambiar",
        shortTitle: "Automatización con controles operativos",
        category: "Automatización",
        summary: "Hacer sostenibles las automatizaciones en Databricks mediante versiones, validación y evidencia de ejecución.",
        governance: "Negocio acuerda el resultado esperado; el equipo técnico aporta pruebas; la función autorizadora decide la promoción y operación asume seguimiento y recuperación. La propuesta separa construir, aceptar y autorizar, con criterios verificables para cada cambio.",
        problem: "Un notebook que funciona manualmente deja preguntas abiertas: qué versión se ejecuta, con qué parámetros, cómo se promueve a otro entorno y qué permite reconstruir un fallo.",
        approach: "La referencia usa una definición declarativa del job y plantea una entrega por etapas: validar configuración, probar en desarrollo, revisar el cambio y promover la misma versión. El mapa conecta la operación con evidencia auditable; las notas detallan decisiones de despliegue y observabilidad.",
        decisions: [
          { title: "Configuración junto al código", text: "Un bundle permite describir recursos y destinos en archivos versionados. Los parámetros de entorno se resuelven al desplegar; las credenciales no forman parte del manifiesto." },
          { title: "Validar no equivale a probar", text: "La validación de configuración detecta errores de definición. Una prueba de datos pequeña verifica comportamiento. Ambas preceden a una promoción, pero ninguna garantiza por sí sola el resultado productivo." },
          { title: "Diseñar el reintento", text: "La automatización necesita una clave de ejecución o partición y una estrategia de escritura idempotente. Reintentar un job no debería duplicar un resultado ya confirmado." }
        ],
        evidence: "El fragmento YAML documenta la estructura propuesta y las notas enlazan la documentación oficial. Es un ejemplo de configuración; este portal no despliega ni ejecuta recursos de Databricks.",
        limits: "No se incluye un notebook ejecutable ni una canalización CI/CD conectada. El despliegue requeriría un workspace, identidad de servicio, permisos, cómputo y pruebas sobre datos autorizados. Los costos de ese entorno quedan fuera de esta web estática.",
        codeLanguage: "YAML · fragmento de referencia",
        code: 'bundle:\n  name: automatizacion-datos\n\nvariables:\n  cluster_id:\n    description: Cluster autorizado del entorno\n  notebook_path:\n    description: Ruta del notebook validado\n\nresources:\n  jobs:\n    pipeline:\n      name: automatizacion-datos\n      tasks:\n        - task_key: procesar\n          existing_cluster_id: ${var.cluster_id}\n          notebook_task:\n            notebook_path: ${var.notebook_path}\n\ntargets:\n  dev:\n    mode: development\n    default: true',
        related: ["despliegue", "observabilidad", "decision-explicable", "calidad-por-contrato", "interoperabilidad"]
      },
      {
        id: "purview",
        business: {
          question: "¿Cómo ampliar controles de calidad con criterios de negocio consistentes?",
          intent: "Extender controles de calidad con reglas revisadas y seguimiento de lo aprobado, publicado y pendiente.",
          contribution: "Articulación propuesta entre dueño del dato, steward e ingeniería para acordar criterios, revisar reglas y controlar su publicación por lote.",
          measure: "Medir en un piloto reglas revisadas, duplicados detectados, fallos de publicación y tiempo desde propuesta hasta decisión.",
          status: "Diseño de referencia",
          proof: "Contrato JSON descargable con reglas sintéticas y revisión pendiente."
        },
        title: "Calidad en Purview: de reglas aisladas a lotes revisables",
        shortTitle: "Calidad de datos a escala",
        category: "Calidad de datos",
        summary: "Propuesta para Purview: reglas asistidas por IA y API, con criterios de negocio y revisión por lote.",
        governance: "El dueño del dato acuerda la calidad requerida para su uso; el steward mantiene criterios y excepciones; la revisión técnica contrasta las reglas. Solo un lote aceptado y autorizado avanzaría a publicación. La IA propone, pero no define el riesgo aceptable ni aprueba por sí sola.",
        problem: "Crear reglas una por una dificulta mantener criterios consistentes y reconstruir qué se aprobó. La automatización también puede multiplicar errores si confunde una sugerencia de calidad con una regla lista para publicar.",
        approach: "El diseño propone que una IA reciba metadatos mínimos y sugiera reglas conservando origen y motivo, sin aprobarlas. Negocio revisaría el significado y una validación técnica comprobaría cada propuesta antes de preparar el lote. Una integración futura usaría la API de Data Quality: Create Rules opera en el contexto de dominio, producto de datos y activo, y la versión referenciada está en Preview. Atlas entity/bulk pertenece al Data Map de metadatos y linaje; no sustituye la API de reglas de calidad.",
        decisions: [
          { title: "Contrato entre propuesta y publicación", text: "El esquema conserva activo, columna, tipo, regla propuesta y estado de revisión. Negocio confirma el criterio; la revisión técnica comprueba que se puede expresar y evaluar. Solo las propuestas aceptadas forman un lote publicable." },
          { title: "Validar antes de ejecutar", text: "Una zona de pruebas aislada verifica sintaxis y dialecto SQL, compatibilidad de tipos, tratamiento de nulos, vocabulario permitido y reglas duplicadas. Los umbrales se acuerdan antes de medir; no se adoptan cifras del ejemplo como objetivos reales." },
          { title: "Controlar identidad y reintentos", text: "La identidad de servicio y sus credenciales pertenecen al backend. Un registro por regla conserva huella, revisión, resultado remoto e intentos. Ante una respuesta incierta, se consulta y reconcilia el estado antes de reenviar; el contrato no presupone idempotencia de la API." }
        ],
        evidence: "El JSON descargable es un contrato original con dos reglas sintéticas, revisión pendiente y publicar:false. Permite revisar la estructura del lote; no es un payload oficial de Microsoft, una ejecución de Purview ni una salida generada por IA.",
        limits: "Diseño de referencia sin proveedor de IA conectado, llamadas remotas ni resultados de calidad medidos. No acredita una carga masiva implementada. Un adaptador real tendría que mapear el contrato a la API vigente, verificar permisos y compatibilidad del origen y ensayar publicación y recuperación en un entorno autorizado.",
        codeLanguage: "JSON · contrato sintético, no payload de API",
        code: JSON.stringify(qualityBatchExample, null, 2),
        artifactReading: "Este contrato separa propuesta, revisión, pruebas y publicación. Todos sus controles siguen pendientes: publicar:false impide presentarlo como un lote autorizado. El archivo no se envía directamente a Purview; una integración posterior necesita un adaptador específico y validación contra la documentación vigente.",
        noArchitecture: true,
        downloads: [{ label: "Descargar lote de calidad de ejemplo", url: "recursos/lote-calidad-ejemplo.json" }],
        sources: [
          { label: "Microsoft · Data Quality Create Rules (Preview)", url: "https://learn.microsoft.com/en-us/rest/api/purview/purviewdataquality/create-rules?view=rest-purview-purviewdataquality-2026-01-12-preview" },
          { label: "Microsoft · Data Map Entity Bulk Create or Update", url: "https://learn.microsoft.com/en-us/rest/api/purview/datamapdataplane/entity/bulk-create-or-update?view=rest-purview-datamapdataplane-2023-09-01" },
          { label: "Microsoft · IA responsable en Unified Catalog", url: "https://learn.microsoft.com/en-us/purview/unified-catalog-responsible-ai-faq?azure-portal=true" }
        ],
        related: ["calidad-por-contrato", "gobierno-datos-ia", "metadatos", "observabilidad"]
      }
    ],
    notes: [
      {
        id: "revision-humana",
        title: "Una propuesta de clasificación no es una aprobación",
        category: "Decisión de clasificación",
        summary: "Mantener un estado pendiente evita que una inferencia cambie permisos sin revisión.",
        paragraphs: [
          "En esta referencia se distinguen tres hechos: lo observado en el esquema, lo recomendado por el clasificador y lo aprobado por el responsable del dato. Cada uno puede cambiar en momentos distintos.",
          "La cola de revisión debe mostrar contexto y motivo, permitir corregir la propuesta y conservar quién aprobó la nueva etiqueta. Las discrepancias forman un conjunto útil para evaluar versiones posteriores del clasificador."
        ],
        decision: "Publicar al catálogo de políticas únicamente atributos aprobados y versionados; conservar la propuesta como evidencia separada.",
        tradeoff: "La revisión agrega tiempo y trabajo. Se puede priorizar por ambigüedad y sensibilidad, pero el umbral de automatización exige datos de evaluación reales.",
        related: ["metadatos", "decision-explicable"],
        source: { label: "Contexto: NIST SP 800-162 · atributos y políticas", url: "https://csrc.nist.gov/pubs/sp/800/162/upd2/final" }
      },
      {
        id: "metadatos",
        title: "Los metadatos son una entrada de seguridad",
        category: "Contrato de atributos",
        summary: "Dueño, sensibilidad y vigencia necesitan un origen confiable para intervenir en una autorización.",
        paragraphs: [
          "Una política ABAC evalúa atributos del sujeto, del recurso y de la operación, y puede incorporar condiciones del entorno. En esta demostración se usan departamento, sensibilidad y propósito; el recurso pertenece siempre a finanzas.",
          "La decisión de diseño es mantener un vocabulario controlado, un responsable y una versión por atributo relevante. Los valores del formulario sirven para explorar escenarios; en producción deberían provenir de identidad y catálogo confiables."
        ],
        decision: "Denegar cuando falte un atributo obligatorio o su valor no esté reconocido. Revisar también su vigencia en una implementación real.",
        tradeoff: "El control depende de la calidad del catálogo. Una etiqueta desactualizada puede afectar disponibilidad o exposición aunque la regla esté bien escrita.",
        related: ["revision-humana", "minimo-privilegio"],
        source: { label: "NIST SP 800-162 · definición de ABAC", url: "https://csrc.nist.gov/pubs/sp/800/162/upd2/final" }
      },
      {
        id: "minimo-privilegio",
        title: "Permitir una operación no implica mostrar todas sus columnas",
        category: "Control de acceso",
        summary: "La respuesta puede incluir obligaciones que el componente de datos debe hacer cumplir.",
        paragraphs: [
          "La política de ejemplo separa la capacidad del rol de las condiciones de acceso. Visitante no tiene lectura; analista y auditor deben cumplir el propósito y ámbito definidos para información no pública.",
          "Si la información es restringida, una evaluación favorable produce enmascaramiento. El resultado solo es válido si un componente confiable oculta los identificadores antes de entregar datos; un indicador visual no cumple esa obligación."
        ],
        decision: "Tratar permitir, denegar y permitir con obligaciones como resultados distintos. Si una obligación no puede aplicarse, no entregar el resultado.",
        tradeoff: "El enmascaramiento puede reducir utilidad analítica y no evita por sí solo la reidentificación. La política requiere revisar qué columnas y combinaciones se exponen.",
        related: ["metadatos", "decision-explicable"],
        source: { label: "NIST SP 800-162 · evaluación de políticas", url: "https://csrc.nist.gov/pubs/sp/800/162/upd2/final" }
      },
      {
        id: "decision-explicable",
        title: "Guardar el porqué junto a la decisión",
        category: "Decisión de trazabilidad",
        summary: "Una denegación comprensible facilita soporte; una evidencia versionada permite reconstruirla.",
        paragraphs: [
          "El simulador muestra cada condición y su resultado. Para una implementación se propone un registro con identificador de solicitud, recurso, operación, versión de política, decisión y obligaciones aplicadas.",
          "La explicación al usuario y el registro de auditoría tienen públicos distintos. Se puede comunicar la condición que falta sin revelar atributos sensibles o detalles internos que no sean necesarios."
        ],
        decision: "Conservar una evidencia mínima y correlacionable. No copiar filas de negocio, tokens ni credenciales al registro de autorización.",
        tradeoff: "Más detalle ayuda a investigar, pero aumenta exposición y almacenamiento. El contenido, acceso y retención del registro requieren una política propia.",
        related: ["minimo-privilegio", "observabilidad", "revision-humana"],
        source: { label: "Contexto: NIST SP 800-162 · consideraciones de ABAC", url: "https://csrc.nist.gov/pubs/sp/800/162/upd2/final" }
      },
      {
        id: "despliegue",
        title: "Promover una versión conocida entre entornos",
        category: "Despliegue en Databricks",
        summary: "Código y definición del job describen el cambio; cada entorno aporta sus parámetros e identidad.",
        paragraphs: [
          "La referencia propone mantener el manifiesto del bundle junto al código y revisar ambos en el mismo cambio. Los destinos de desarrollo y producción expresan diferencias de entorno sin mantener copias independientes del proceso.",
          "La secuencia propuesta es validar configuración, ejecutar una prueba controlada, revisar la evidencia y desplegar una revisión identificable. Una identidad de servicio obtendría sus credenciales mediante el mecanismo autorizado del entorno de CI/CD."
        ],
        decision: "Versionar los archivos de configuración sin secretos y promover una revisión identificada del repositorio.",
        tradeoff: "La repetibilidad exige preparar identidades, permisos, cómputo y datos de prueba. Un despliegue técnicamente correcto todavía puede contener una transformación incorrecta.",
        related: ["observabilidad", "metadatos"],
        source: { label: "Databricks · bundles y recursos declarativos", url: "https://docs.databricks.com/aws/en/dev-tools/bundles" }
      },
      {
        id: "observabilidad",
        title: "Un job terminado no basta para dar los datos por buenos",
        category: "Operación de datos",
        summary: "Estado técnico, calidad del resultado y contexto de ejecución responden preguntas diferentes.",
        paragraphs: [
          "La evidencia propuesta relaciona versión del código, parámetros no sensibles, identificador de ejecución, partición procesada y resultado de controles de datos. Así se puede comparar una ejecución correcta con una fallida.",
          "La estrategia de recuperación debe decidir qué se puede repetir, qué necesita compensación y cómo detectar una salida ya confirmada. El reintento automático solo es útil si la escritura tolera esa repetición."
        ],
        decision: "Definir controles de datos y criterios de reintento junto con el job. Enlazar la ejecución con la revisión desplegada.",
        tradeoff: "Los controles añaden tiempo de ejecución y mantenimiento. Deben responder a fallos concretos del proceso, con umbrales que se validen sobre datos reales.",
        related: ["despliegue", "decision-explicable"],
        source: { label: "Databricks · prácticas de CI/CD", url: "https://docs.databricks.com/aws/en/dev-tools/ci-cd" }
      },
      {
        id: "calidad-por-contrato",
        title: "Una regla de calidad necesita un contrato y una decisión",
        category: "Calidad por contrato",
        summary: "Metadatos, criterio de negocio y evidencia técnica cumplen funciones distintas dentro de un lote revisable.",
        paragraphs: [
          "La propuesta parte del esquema y del uso esperado del dato. Cada candidato conserva activo, columna, tipo, expresión o vocabulario y motivo. El responsable de negocio confirma el significado; una revisión técnica comprueba dialecto SQL, nulos, tipos y duplicados en una zona de pruebas antes de habilitar la publicación.",
          "En Purview, la API Data Quality Create Rules referencia dominio, producto de datos y activo; la versión enlazada es Preview. Atlas entity/bulk crea o actualiza entidades de metadatos en Data Map y participa en diseños de linaje. Publicar esas entidades no crea por sí mismo reglas de calidad.",
          "El lote descargable es un contrato propio, sintético y pendiente de revisión. Un adaptador posterior traduciría reglas aceptadas al servicio de calidad. El registro por regla debe conservar el resultado remoto y resolver respuestas inciertas antes de un reintento; una lista de reglas no demuestra una carga masiva implementada.",
          "La guía de IA responsable de Unified Catalog requiere revisar las sugerencias antes de adoptarlas. En este diseño, una recomendación asistida conservaría su origen y justificación; el ejemplo publicado no conecta un proveedor ni demuestra generación automática."
        ],
        decision: "Separar los estados propuesta, revisión, prueba y autorización. Mantener publicar:false mientras falte evidencia y resolver la identidad de servicio fuera del navegador.",
        tradeoff: "El contrato añade trabajo de mapeo y mantenimiento frente a cambios de API, pero permite revisar qué cambia, descartar duplicados y recuperar fallos sin asumir que toda operación remota es idempotente.",
        related: ["metadatos", "revision-humana", "observabilidad", "gobierno-datos-ia"],
        source: { label: "Microsoft · Data Quality Create Rules (Preview)", url: "https://learn.microsoft.com/en-us/rest/api/purview/purviewdataquality/create-rules?view=rest-purview-purviewdataquality-2026-01-12-preview" },
        sources: [
          { label: "Microsoft · Data Map Entity Bulk Create or Update", url: "https://learn.microsoft.com/en-us/rest/api/purview/datamapdataplane/entity/bulk-create-or-update?view=rest-purview-datamapdataplane-2023-09-01" },
          { label: "Microsoft · IA responsable en Unified Catalog", url: "https://learn.microsoft.com/en-us/purview/unified-catalog-responsible-ai-faq?azure-portal=true" }
        ],
        downloads: [{ label: "Lote sintético de calidad", url: "recursos/lote-calidad-ejemplo.json" }]
      },
      {
        id: "gobierno-datos-ia",
        title: "Gobernar datos e IA mediante decisiones y evidencia",
        category: "Gobierno de datos e IA",
        summary: "Un marco operativo conecta responsables, criterios de aceptación y capacidad de intervención.",
        paragraphs: [
          "Para datos, DAMA DMBOK relaciona gobierno, calidad y metadatos. El Data Owner es una responsabilidad de negocio que responde por decisiones dentro de su dominio; documentar ese mandato permite revisar quién acepta significado, calidad y uso.",
          "La propuesta distingue dueño de datos, responsable de negocio, constructor, validador y supervisor. Aceptar un resultado, autorizar su uso, conceder acceso y desplegarlo son decisiones separadas. La RACI organiza responsabilidades; no crea permisos técnicos.",
          "El mapeo propuesto al NIST AI RMF usa GOVERN para responsabilidades y escalamiento; MAP para finalidad, personas afectadas y límites; MEASURE para pruebas, errores y revisión diferenciada; MANAGE para tratamiento de hallazgos, supervisión y reevaluación. El Playbook ofrece orientaciones adaptables: este mapeo no demuestra certificación ni cumplimiento.",
          "La ficha descargable describe un clasificador ficticio que solo recomienda etiquetas. El constructor no se autoaprueba; un revisor contrasta la evidencia y una autoridad distinta decide la habilitación. El supervisor puede detener el uso. Un cambio de datos, finalidad o versión requiere revisar los controles afectados."
        ],
        decision: "No habilitar el caso con pruebas pendientes, criterios de fallo sin resolver o supervisión sin responsable. Una sugerencia de IA no modifica etiquetas oficiales ni permisos.",
        tradeoff: "Separar responsabilidades exige capacidad y tiempo de revisión. El rigor se adapta al riesgo del uso y conserva explícitas las limitaciones.",
        related: ["revision-humana", "decision-explicable", "calidad-por-contrato", "minimo-privilegio"],
        source: { label: "NIST · AI RMF Playbook", url: "https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook" },
        sources: [
          { label: "DAMA · revisión DMBOK y responsabilidad del Data Owner", url: "https://dama.org/dama-dmbok-revision/" },
          { label: "DAMA · marco DMBOK de gestión de datos", url: "https://dama.org/learning-resources/dama-data-management-body-of-knowledge-dmbok/" }
        ],
        downloads: [{ label: "Ficha sintética de gobierno de IA", url: "recursos/ficha-gobierno-ia.json" }]
      },
      {
        id: "interoperabilidad",
        title: "Databricks y Fabric: decidir dónde ejecutar y cómo compartir",
        category: "Interoperabilidad",
        summary: "Una guía de decisiones sobre ejecución, lectura, identidad y costos; no un ranking de plataformas.",
        paragraphs: [
          "Fabric puede preparar datos y entrenar modelos con notebooks, además de registrar experimentos con MLflow. La elección del entorno de entrenamiento necesita considerar herramientas, operación, dependencias y capacidad; no se reduce a asignar una plataforma a BI y otra a machine learning.",
          "La publicación de datos de Unity Catalog hacia Fabric documentada por Microsoft está en Preview. Ofrece lectura desde Fabric, mantiene las escrituras en Databricks y requiere una capacidad de Fabric. Es una opción de interoperabilidad que exige revisar prerrequisitos, alcance de datos y costos antes de usarla.",
          "Los permisos y políticas de Unity Catalog no se replican automáticamente a Fabric. La documentación de mirroring advierte que sus controles RLS y ABAC no se aplican al acceso directo al almacenamiento. Hay que configurar y comprobar controles en Fabric y OneLake, identificar la identidad de conexión y probar las rutas de acceso efectivas.",
          "La guía propone decidir primero dónde se transforma y escribe, después qué consumidores necesitan lectura y finalmente qué evidencia prueba permisos y comportamiento. Un piloto con datos sintéticos puede contrastar esas decisiones; aquí no se presentan mediciones ni una integración desplegada."
        ],
        decision: "Documentar propietario de escritura, consumidores de lectura, identidad de conexión, controles efectivos y capacidad requerida antes de elegir el mecanismo de intercambio.",
        tradeoff: "Compartir datos puede reducir copias, pero introduce dependencias de disponibilidad, compatibilidad y autorización entre servicios. La condición Preview y los requisitos de capacidad forman parte de la decisión.",
        related: ["despliegue", "metadatos", "minimo-privilegio", "gobierno-datos-ia"],
        source: { label: "Microsoft · tutorial de ciencia de datos en Fabric", url: "https://learn.microsoft.com/en-us/fabric/data-science/tutorial-data-science-introduction" },
        sources: [
          { label: "Microsoft · publicar datos de Unity Catalog en Fabric (Preview)", url: "https://learn.microsoft.com/en-us/azure/databricks/partners/bi/fabric-publish" },
          { label: "Microsoft · modelo de control de acceso de OneLake", url: "https://learn.microsoft.com/en-us/fabric/onelake/security/data-access-control-model" },
          { label: "Microsoft · seguridad de mirroring de Azure Databricks", url: "https://learn.microsoft.com/en-us/fabric/mirroring/azure-databricks-security" }
        ],
        attribution: "Lectura inicial: Databricks vs. Microsoft Fabric, Daniel Portugal / Daniel Datashow (PDF facilitado para revisión). Síntesis propia contrastada con documentación oficial."
      }
    ]
  };
})();
