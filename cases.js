(function () {
  "use strict";

  window.PORTFOLIO = {
    cases: [
      {
        id: "clasificacion",
        title: "Del nombre de una columna a una clasificación defendible",
        shortTitle: "Clasificación asistida por GenAI",
        category: "Clasificación de datos",
        summary: "Una recomendación necesita contexto, una justificación y una persona responsable de aprobarla.",
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
        related: ["revision-humana", "metadatos", "decision-explicable"]
      },
      {
        id: "acceso",
        title: "Acceso según rol y contexto del dato",
        shortTitle: "RBAC + ABAC explicable",
        category: "Gobierno de acceso",
        summary: "Rol, departamento, sensibilidad y propósito producen una decisión que se puede inspeccionar.",
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
        related: ["minimo-privilegio", "decision-explicable", "metadatos"]
      },
      {
        id: "databricks",
        title: "Hacer que una automatización también se pueda cambiar",
        shortTitle: "Evolución de automatización en Databricks",
        category: "Automatización",
        summary: "Versionar la configuración, separar entornos y conservar evidencia de ejecución hace revisable cada cambio.",
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
        related: ["despliegue", "observabilidad", "decision-explicable"]
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
      }
    ]
  };
})();
