(function () {
  "use strict";

  window.GOVERNANCE_LIBRARY = {
    framework: {
      title: "Marcos aplicados al negocio.",
      intro: "Conecto necesidades de negocio con prácticas DAMA-DMBOK, capacidades y evidencia DCAM para proponer mejoras verificables. La metodología integrada incorpora la estructura PREC del material seleccionado, con una lectura aplicada propia.",
      comparison: [
        {
          name: "DAMA-DMBOK",
          role: "Principios, funciones y prácticas de gestión de datos",
          question: "¿Qué prácticas ayudan a atender esta necesidad de negocio?",
          description: "Organiza principios, funciones y prácticas para gestionar datos. Orienta decisiones adaptadas al contexto; no prescribe una implantación única ni actúa como manual de un proveedor.",
          url: "https://dama.org/learning-resources/dama-data-management-body-of-knowledge-dmbok/",
          label: "DAMA · referencia oficial de DMBOK"
        },
        {
          name: "DCAM",
          role: "Capacidades, estrategia y mejora con evidencia",
          question: "¿Qué capacidad necesitamos desarrollar y con qué evidencia la contrastamos?",
          description: "Data Management Capability Assessment Model, de EDM Association, combina mejores prácticas, capacidades, objetivos y criterios de evaluación. Apoya estrategia, caso de negocio, modelo operativo y hoja de ruta mediante preguntas y evidencia.",
          url: "https://edmcouncil.org/frameworks/dcam/",
          label: "EDM Association · referencia oficial de DCAM"
        }
      ],
      method: [
        {
          title: "Partir de la necesidad",
          text: "Precisar decisión, uso del dato, riesgo y resultado esperado antes de elegir prácticas o controles."
        },
        {
          title: "Seleccionar prácticas DMBOK",
          text: "Elegir principios, funciones y prácticas pertinentes, y explicar su adaptación al contexto con responsables y criterios de aceptación."
        },
        {
          title: "Contrastar capacidad con DCAM",
          text: "Revisar objetivos, capacidad y evidencia para reconocer fortalezas y brechas; distinguir lo observado de lo declarado."
        },
        {
          title: "Priorizar y dar seguimiento",
          text: "Acordar mejoras por valor, riesgo y dependencia; asignar responsables y comprobar avances antes de ampliar el alcance."
        }
      ],
      connections: [
        {
          topic: "Ownership",
          practice: "Acordar responsabilidades y derechos de decisión con el negocio para cada dominio.",
          capability: "Contrastar mandato, capacidad y evidencia de decisiones, además de la designación nominal.",
          decision: "Resolver los vacíos de autoridad en activos críticos antes de habilitar nuevos consumidores."
        },
        {
          topic: "Calidad",
          practice: "Definir reglas, población, uso y criterios de aceptación con los consumidores del dato.",
          capability: "Contrastar ejecución de controles, revisión de resultados y capacidad de remediación con evidencia trazable.",
          decision: "Concentrar la remediación en fallos que bloquean usos críticos y exigir una prueba de cierre antes de ampliar el alcance."
        },
        {
          topic: "Metadatos",
          practice: "Relacionar definiciones de negocio, metadatos técnicos, procedencia y responsables para facilitar un uso comprensible del dato.",
          capability: "Contrastar cobertura, actualización, ownership y utilización del contexto, sin equiparar cantidad de registros con una capacidad efectiva.",
          decision: "Priorizar productos cuyo significado o procedencia impide su uso, antes de ampliar el catálogo; verificar la mejora con sus consumidores."
        }
      ],
      topics: [
        {
          title: "Responsabilidad y adopción",
          question: "¿Quién decide, quién ejecuta y qué evidencia permite avanzar?",
          noteId: "gobierno-datos-ia"
        },
        {
          title: "Calidad orientada al uso",
          question: "¿Qué condiciones debe cumplir el dato para servir a una decisión de negocio?",
          noteId: "calidad-por-contrato"
        },
        {
          title: "Contexto y significado",
          question: "¿Qué significa el dato, quién responde por él y para qué puede utilizarse?",
          noteId: "metadatos"
        },
        {
          title: "Supervisión de IA",
          question: "¿Quién revisa una recomendación y puede corregirla antes de convertirla en una decisión?",
          noteId: "revision-humana"
        }
      ],
      disclaimer: "Serie DAMA-DMBOK por capítulos en preparación. Las conexiones son mi interpretación propuesta, no equivalencias oficiales ni evaluaciones puntuadas. Distingo referencias, propuestas y experiencia validada."
    },
    operatingModels: {
      intro: "Un modelo de gobernanza distribuye autoridad, ejecución y rendición de cuentas; no es una herramienta. Esta síntesis compara opciones para decidir según el contexto. Pueden coexistir y evolucionar: no hay una respuesta universal.",
      models: [
        {
          id: "centralizado",
          name: "Centralizado",
          allocation: "Una instancia central concentra políticas y decisiones comunes; las áreas pueden ejecutar actividades cotidianas con responsabilidades delimitadas.",
          fit: "Lo consideraría al consolidar criterios comunes o concentrar conocimiento escaso, comprobando que el equipo central pueda atender la demanda.",
          tradeoff: "Favorece consistencia; puede acumular aprobaciones y alejar las decisiones del contexto de negocio."
        },
        {
          id: "descentralizado",
          name: "Descentralizado",
          allocation: "Las unidades o dominios asumen mayor autonomía sobre decisiones y prácticas locales, sin quedar exentos de obligaciones corporativas.",
          fit: "Lo evaluaría para necesidades locales distintas, con responsables capaces de sostener sus decisiones, controles y operación.",
          tradeoff: "Acerca la decisión al negocio; puede duplicar esfuerzos y fragmentar definiciones, controles y datos compartidos."
        },
        {
          id: "federado",
          name: "Federado",
          allocation: "Una función central acuerda reglas comunes y supervisión; los dominios gobiernan sus datos dentro de ese marco y participan en la coordinación.",
          fit: "Lo consideraría cuando varios dominios necesitan autonomía, pero comparten datos, riesgos o decisiones que requieren coherencia transversal.",
          tradeoff: "Combina contexto local y acuerdos comunes; exige mandatos claros, coordinación y un mecanismo efectivo para resolver conflictos."
        }
      ],
      decisionCriteria: [
        {
          title: "Riesgo y derechos de decisión",
          question: "¿Qué decisiones requieren revisión común y cuáles puede asumir un dominio? ¿Quién acepta el riesgo y autoriza excepciones?"
        },
        {
          title: "Capacidad y responsabilidad",
          question: "¿Hay responsables con mandato, tiempo y capacidades para operar los controles, responder por sus decisiones y conservar evidencia?"
        },
        {
          title: "Dependencias entre dominios",
          question: "¿Qué definiciones, productos o usos cruzan áreas? ¿Cómo se acuerdan cambios sin trasladar el problema a otro consumidor?"
        },
        {
          title: "Agilidad y costo de coordinación",
          question: "¿Dónde se acumulan demoras o duplicidades? ¿Qué distribución de decisiones conviene probar y revisar antes de ampliar su alcance?"
        }
      ],
      sources: [
        {
          label: "AWS · estilos de gobernanza de datos",
          url: "https://aws.amazon.com/what-is/data-governance/"
        },
        {
          label: "Microsoft Learn · enfoque federado de gobernanza",
          url: "https://learn.microsoft.com/en-us/purview/data-governance-overview#federated-approach-to-data-governance"
        }
      ]
    },
    purview: {
      pillars: [
        {
          id: "calidad",
          title: "Reglas de negocio y calidad asistida",
          decision: "Acordar criterios de negocio antes de proponer reglas con IA y publicarlas mediante la API de calidad tras revisión.",
          artifact: "Propuesta por validar: contrato de regla, revisión humana, prueba y registro por regla del lote.",
          measure: "Medición propuesta: reglas revisadas, duplicados, fallos de publicación y tiempo hasta una decisión."
        },
        {
          id: "ownership",
          title: "Responsabilidad sobre los datos",
          decision: "Definir quién acepta significado, uso y calidad, con mandato y capacidad dentro de cada dominio.",
          artifact: "Propuesta por validar: ficha de responsabilidad, alcance de decisión y ruta de escalamiento.",
          measure: "Medición propuesta: activos prioritarios con responsable confirmado y decisiones pendientes por falta de autoridad."
        },
        {
          id: "productos",
          title: "Productos de datos orientados al consumo",
          decision: "Acordar propósito, consumidores, contrato, calidad requerida y condiciones de acceso antes de ofrecer un producto.",
          artifact: "Propuesta por validar: ficha de producto y contrato de entrega aceptado por productor y consumidor.",
          measure: "Medición propuesta: productos con criterios aceptados, consumidores autorizados y revisión de utilidad."
        },
        {
          id: "alertas",
          title: "Alertas que activan una respuesta",
          decision: "Asignar cada incumplimiento a su causa y responsable, con prioridad según el uso afectado y evidencia para cerrarlo.",
          artifact: "Propuesta por validar: regla de alerta, registro de hallazgo, escalamiento y nueva prueba de cierre.",
          measure: "Medición propuesta: hallazgos que bloquean usos críticos, tiempo de atención y recurrencia tras el cierre."
        },
        {
          id: "reportes",
          title: "Reportes para decidir y dar seguimiento",
          decision: "Mostrar riesgos, decisiones pendientes y tratamientos con responsables; distinguir actividad registrada de valor comprobado.",
          artifact: "Propuesta por validar: reporte ejecutivo con población, corte, fuente, limitaciones y decisiones requeridas.",
          measure: "Medición propuesta: decisiones con seguimiento, compromisos vencidos y cierres respaldados por evidencia."
        },
        {
          id: "lake",
          title: "Metadatos de negocio en el lake",
          decision: "Vincular activos del lake con definición, dueño, uso permitido y procedencia; comprobar su calidad por separado.",
          artifact: "Propuesta por validar: ficha de activo con término de negocio, clasificación, procedencia y responsable.",
          measure: "Medición propuesta: activos prioritarios con contexto revisado y discrepancias entre catálogo y datos observados."
        }
      ],
      signals: [
        {
          id: "aptitud",
          label: "Cobertura de evaluación",
          question: "¿Qué datos críticos siguen sin una evaluación revisada para el uso acordado?",
          metric: "Cobertura de evaluación revisada, propuesta para un piloto.",
          formula: "Activos críticos con controles ejecutados y revisados / activos críticos priorizados.",
          action: "Priorizar la evaluación faltante y resolver incumplimientos antes de aceptar el uso afectado.",
          caution: "La cobertura no mide conformidad. Sin evaluación no declarar aptitud; si la población es cero, informar no evaluable."
        },
        {
          id: "responsabilidad",
          label: "Responsabilidad efectiva",
          question: "¿Las decisiones sobre datos tienen un responsable con mandato y capacidad?",
          metric: "Cobertura de responsabilidad confirmada, propuesta para seguimiento.",
          formula: "Activos prioritarios con responsable y alcance confirmados / activos prioritarios del periodo.",
          action: "Resolver vacíos de responsabilidad y conflictos de alcance antes de escalar una entrega.",
          caution: "Un nombre en el catálogo no demuestra mandato ni capacidad. Verificar ambos; con población cero, informar no evaluable."
        },
        {
          id: "remediacion",
          label: "Hallazgos que frenan el negocio",
          question: "¿Qué problemas siguen bloqueando un uso crítico después del plazo acordado?",
          metric: "Hallazgos críticos abiertos fuera de plazo, propuesta para priorización.",
          formula: "Hallazgos críticos abiertos y vencidos al corte / hallazgos críticos abiertos con plazo acordado.",
          action: "Revisar causa, responsable y tratamiento; cerrar solo tras una nueva prueba y aceptación competente.",
          caution: "Mostrar también hallazgos sin plazo. Si no hay población, informar no aplica; un cierre administrativo no demuestra corrección."
        },
        {
          id: "adopcion",
          label: "Uso de productos de datos",
          question: "¿Qué productos publicados se usan para el propósito acordado?",
          metric: "Productos con consumo confirmado, propuesta para evaluar adopción.",
          formula: "Productos con evidencia de uso autorizado durante el periodo / productos publicados destinados a ese periodo.",
          action: "Contrastar utilidad con consumidores y atender productos sin uso antes de ampliar el catálogo.",
          caution: "Buscar o visitar una ficha no prueba consumo. Se necesitan señales autorizadas y validación del consumidor; sin población, no evaluable."
        }
      ]
    }
  };
})();
