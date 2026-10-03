(function () {
  "use strict";

  window.LEADERSHIP_PROFILE = {
    "areas": [
      {
        "id": "modelo-federado",
        "title": "Modelos de gobernanza y responsabilidades",
        "experience": "Formalicé un marco de Gobierno de Datos e IA que conectó políticas, lineamientos y procedimientos con responsabilidades de negocio. Definí el papel de los Data Owners, los niveles de decisión y la matriz RACI. Mi trabajo articuló a Data, negocio, Seguridad, TI y Calidad para convertir el modelo federado en acuerdos que cada función pudiera aplicar y revisar.",
        "decision": "Evalúo modelos centralizados, descentralizados y federados según riesgo, autonomía, capacidad de los responsables y dependencias entre áreas; después acuerdo quién decide, qué se delega y cómo escalar conflictos.",
        "evidence": "Mandatos aceptados, matriz RACI, versiones de políticas y registro de decisiones: permiten saber quién tiene autoridad y qué acuerdos siguen pendientes.",
        "link": "#modelos",
        "label": "Comparar modelos de gobernanza"
      },
      {
        "id": "catalogo-calidad",
        "title": "Catálogo, significado y calidad",
        "experience": "Habilité Purview con integración de Unity Catalog, Fabric, Power BI, Azure SQL, Storage y Data Factory. Trabajé catálogo, metadatos, glosario, calidad y linaje, junto con una capa semántica y ontológica. Utilicé DAMA y DCAM como referencias para conectar significado, ownership y consumo, considerando Data Mesh y productos de datos como parte del diseño.",
        "decision": "Vinculo cada activo con su significado, responsable y uso previsto; la aceptación depende de criterios de negocio y evidencia de calidad, además de su catalogación.",
        "evidence": "Definiciones acordadas, linaje verificado y controles de calidad por uso: permiten distinguir un activo catalogado de un dato aceptado para consumo.",
        "link": "#purview",
        "label": "Ver el programa propuesto"
      },
      {
        "id": "privacidad-acceso",
        "title": "Privacidad y acceso llevado a piloto",
        "experience": "Sobre Unity Catalog, diseñé y llevé a piloto un enfoque de privacidad con clasificación y aprobación por campo. El diseño combinó ABAC con enmascaramiento de columnas y filtrado de filas por institución, y RBAC mediante grupos. Incluí un plan de aplicación sellado, verificación posterior y evidencias de ejecución. La experiencia descrita corresponde a ese piloto.",
        "decision": "Separo la aprobación del uso, la configuración del control y su comprobación efectiva; los permisos deben respetar el propósito, el alcance y las restricciones acordadas.",
        "evidence": "Aprobaciones por campo, plan de aplicación, pruebas de acceso permitido y denegado, y verificación del enmascaramiento: la política debe comprobarse en su aplicación.",
        "link": "#caso/acceso",
        "label": "Explorar el prototipo didáctico"
      },
      {
        "id": "agentes-gobierno-ia",
        "title": "Agentes, supervisión y gobierno de IA",
        "experience": "Implementé agentes en Copilot Studio con contexto de negocio y acompañé su uso con manuales, permisos, criterios de retención y diseño de prompts. También trabajé formación y seguimiento de uso y desempeño. Esa experiencia sustenta mi enfoque: gobernar el propósito y comportamiento de un agente es distinto de usar IA para automatizar tareas de gobierno.",
        "decision": "Defino para qué se usa un agente, qué información puede manejar, quién supervisa sus respuestas y qué condiciones exigen intervenir, ajustar su comportamiento o detenerlo.",
        "evidence": "Propósito del agente, permisos y retención definidos, versiones de instrucciones y seguimiento de respuestas y desempeño: base para revisar su uso y decidir ajustes.",
        "link": "#nota/gobierno-datos-ia",
        "label": "Leer la nota de referencia"
      },
      {
        "id": "adopcion-continuidad",
        "title": "Adopción y continuidad operativa",
        "experience": "Gestioné metadatos técnicos y funcionales de extremo a extremo, interfaces de tópicos y eventos, perfilamiento y ratificación de datos. Atendí incidencias y cambios sobre datos cargados, evaluando impactos y exposición de información sensible, incluidos PAN en el ámbito PCI. Articulé remediación, cierres verificados, criterios de preparación y cierre (DOR/DOD) y capacitaciones con negocio y equipos técnicos, incluidos DevOps y FinOps.",
        "decision": "Priorizo los cambios por su impacto en el uso del dato y acuerdo criterios de entrada, cierre y continuidad con quienes construyen, operan y consumen.",
        "evidence": "Evaluación de impacto, criterios de entrada y cierre, pruebas de remediación y aceptación del responsable: un ticket cerrado no basta para demostrar que el uso afectado se recuperó.",
        "link": "#caso/databricks",
        "label": "Explorar el diseño de referencia"
      }
    ]
  };
})();

