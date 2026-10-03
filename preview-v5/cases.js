(function () {
  'use strict';

  const miningImage = 'assets/metodologia-gobierno-integrada.png';
  const qualityFile = 'assets/lote-calidad-ejemplo.json';
  const diagramFile = 'assets/databricks-governance.html';

  const phases = [
    {
      id: 'evaluar', title: 'Evaluar', question: '¿Qué decisión está bloqueada?',
      action: 'Finanzas y Operaciones contrastan periodo, población y definiciones. Distinguen un error del dato de una diferencia legítima de criterio.',
      deliverable: 'Ficha del problema, fuentes y diferencias; línea base pendiente de medir.',
      authority: 'El sponsor prioriza; los responsables de las fuentes explican sus restricciones.',
      gate: 'Problema delimitado y decisión identificada.'
    },
    {
      id: 'direccion', title: 'Definir dirección', question: '¿Qué producto ayudaría a decidir?',
      action: 'Delimitar una vista de costos y producción: consumidores, frecuencia y preguntas fuera del alcance inicial.',
      deliverable: 'Ficha del producto: propósito, consumidores, owner y criterios de aceptación.',
      authority: 'Negocio acepta el uso; los consumidores acuerdan qué necesitan comprobar.',
      gate: 'Alcance y responsabilidad aceptados.'
    },
    {
      id: 'disenar', title: 'Diseñar', question: '¿Qué acuerdos debe conservar el dato?',
      action: 'Acordar costo, producción, periodo y unidad; diseñar conciliación, excepciones y autoridad para aceptar diferencias.',
      deliverable: 'Contrato del dato, responsabilidades, criterios de calidad y ruta de escalamiento.',
      authority: 'El owner aprueba; el steward coordina; el equipo técnico revisa viabilidad.',
      gate: 'Criterios comprobables y con responsables.'
    },
    {
      id: 'implementar', title: 'Implementar', question: '¿El piloto cumple lo acordado?',
      action: 'Probar procedencia y reglas; registrar hallazgos y repetir las pruebas tras corregirlos.',
      deliverable: 'Plan de prueba, resultados, hallazgos y aceptación del piloto.',
      authority: 'El equipo técnico aporta pruebas; negocio comprueba la utilidad del producto.',
      gate: 'Aceptación sustentada y pendientes con tratamiento.'
    },
    {
      id: 'mejorar', title: 'Medir y mejorar', question: '¿Se utiliza para tomar una acción?',
      action: 'Contrastar uso, conciliación e incidencias con la línea base. Revisar acciones pendientes y siguiente inversión.',
      deliverable: 'Revisión de utilidad y propuesta de continuar, corregir o ampliar.',
      authority: 'Sponsor, owner y consumidores acuerdan el siguiente alcance.',
      gate: 'Continuidad decidida con evidencia.'
    }
  ];

  const purviewScopes = [
    {
      id: 'calidad', title: 'Calidad', question: '¿Qué condición hace aceptable el dato para este uso?',
      decision: 'Acordar población, regla, tratamiento de nulos y excepciones antes de automatizar. Una propuesta de IA conserva su origen y motivo; negocio revisa el significado y el equipo técnico contrasta que pueda evaluarse.',
      evidence: 'Contrato de reglas con activo, columna, criterio, revisión, prueba y autorización. El ejemplo disponible mantiene todos esos controles pendientes.',
      action: 'Ensayar la regla sobre un conjunto autorizado, resolver duplicados y obtener aceptación antes de preparar su publicación.',
      detail: 'La publicación propuesta requiere un adaptador para la API de calidad vigente y un registro por regla. Una respuesta incierta exige reconciliar el estado remoto antes de reenviar.'
    },
    {
      id: 'responsabilidad', title: 'Responsabilidad', question: '¿Quién tiene autoridad para aceptar significado, calidad y uso?',
      decision: 'Confirmar el mandato del owner y distinguirlo de la coordinación del steward y de la ejecución técnica. El alcance debe indicar qué puede decidir cada función y qué excepciones requieren escalamiento.',
      evidence: 'Ficha de responsabilidad: dominio, decisiones asignadas, capacidad disponible, suplencia y registro de acuerdos pendientes.',
      action: 'Resolver un vacío de autoridad antes de ampliar el consumo. La presencia de un nombre en el catálogo no confirma que pueda asumir esa decisión.',
      detail: 'En un modelo federado, los dominios actúan dentro de acuerdos comunes. La distribución también puede ser centralizada o descentralizada; se elige según riesgo, capacidad y dependencias.'
    },
    {
      id: 'productos', title: 'Productos de datos', question: '¿Para quién se ofrece el dato y qué puede esperar de él?',
      decision: 'Delimitar propósito, consumidores, activos, condiciones de calidad y acceso. Productor y consumidor acuerdan qué entrega se acepta y cómo se comunicarán cambios o limitaciones.',
      evidence: 'Ficha de producto y contrato de entrega con uso previsto, owner, condiciones de aceptación y evidencia de revisión por el consumidor.',
      action: 'Validar utilidad con un primer consumidor antes de ampliar el catálogo; atender los productos publicados que no tienen un uso confirmado.',
      detail: 'Un producto agrupa activos para un uso definido. La documentación del catálogo aporta contexto, pero su publicación no demuestra que el consumo sea útil o esté autorizado.'
    },
    {
      id: 'alertas', title: 'Alertas y respuesta', question: '¿Qué debe ocurrir cuando falla un control?',
      decision: 'Priorizar el hallazgo según el uso afectado. Acordar quién recibe, analiza, resuelve y acepta el cierre; diferenciar un fallo de escaneo de una regla evaluada que no se cumple.',
      evidence: 'Registro de hallazgo con población, corte, criterio incumplido, impacto, responsable, plazo y prueba posterior.',
      action: 'Asignar tratamiento, repetir el control después de la corrección y pedir aceptación del responsable del uso antes de cerrar.',
      detail: 'Una notificación inicia la respuesta. La frescura de la señal depende del escaneo y la configuración; no se plantea como control en tiempo real de cada transacción.'
    },
    {
      id: 'reportes', title: 'Reportes para decidir', question: '¿Qué decisión debe provocar cada indicador?',
      decision: 'Relacionar cobertura, criticidad, responsabilidad y seguimiento. Acordar población, corte y fuente para que un aumento de activos catalogados no se interprete automáticamente como valor obtenido.',
      evidence: 'Definición de indicador con fórmula, límites de interpretación, responsable y acción esperada. Abajo se pueden explorar cuatro propuestas, sin mediciones conectadas.',
      action: 'Revisar riesgos sin tratamiento, compromisos vencidos y productos sin uso confirmado; registrar la decisión y su siguiente revisión.',
      detail: 'Los reportes de activos, adopción, clasificaciones, stewardship, glosario y sensibilidad aportan señales diferentes de los reportes de salud de gobierno y calidad. El alcance y los permisos de cualquier exportación deben validarse.'
    },
    {
      id: 'metadatos', title: 'Contexto del lake', question: '¿Puede otra persona interpretar el dato sin adivinar?',
      decision: 'Conectar estructura técnica con significado, procedencia, responsable y uso permitido. Una columna denominada importe necesita una definición acordada y el contexto de la población que representa.',
      evidence: 'Ficha de activo vinculada al glosario y al producto: definición, unidad, periodo, origen, clasificación, owner y controles de calidad asociados.',
      action: 'Priorizar los activos cuyo significado o procedencia impide una decisión. Contrastar la ficha con la fuente y revisar los cambios con sus consumidores.',
      detail: 'Enriquecer el catálogo no modifica los archivos del lake ni corrige sus valores. El contexto y las pruebas de calidad se revisan como evidencias complementarias.'
    }
  ];

  window.PURVIEW_SIGNALS = [
    { id: 'aptitud', label: 'Cobertura de evaluación', question: '¿Qué datos críticos siguen sin una evaluación revisada para el uso acordado?', metric: 'Cobertura de evaluación revisada, propuesta para un piloto.', formula: 'Activos críticos con controles ejecutados y revisados / activos críticos priorizados.', action: 'Priorizar la evaluación faltante y resolver incumplimientos antes de aceptar el uso afectado.', caution: 'La cobertura no mide conformidad. Sin evaluación no declarar aptitud; si la población es cero, informar no evaluable.' },
    { id: 'responsabilidad', label: 'Responsabilidad efectiva', question: '¿Las decisiones sobre datos tienen un responsable con mandato y capacidad?', metric: 'Cobertura de responsabilidad confirmada, propuesta para seguimiento.', formula: 'Activos prioritarios con responsable y alcance confirmados / activos prioritarios del periodo.', action: 'Resolver vacíos de responsabilidad y conflictos de alcance antes de escalar una entrega.', caution: 'Un nombre en el catálogo no demuestra mandato ni capacidad. Verificar ambos; con población cero, informar no evaluable.' },
    { id: 'remediacion', label: 'Hallazgos que frenan el negocio', question: '¿Qué problemas siguen bloqueando un uso crítico después del plazo acordado?', metric: 'Hallazgos críticos abiertos fuera de plazo, propuesta para priorización.', formula: 'Hallazgos críticos abiertos y vencidos al corte / hallazgos críticos abiertos con plazo acordado.', action: 'Revisar causa, responsable y tratamiento; cerrar solo tras una nueva prueba y aceptación competente.', caution: 'Mostrar también hallazgos sin plazo. Si no hay población, informar no aplica; un cierre administrativo no demuestra corrección.' },
    { id: 'adopcion', label: 'Uso de productos de datos', question: '¿Qué productos publicados se usan para el propósito acordado?', metric: 'Productos con consumo confirmado, propuesta para evaluar adopción.', formula: 'Productos con evidencia de uso autorizado durante el periodo / productos publicados destinados a ese periodo.', action: 'Contrastar utilidad con consumidores y atender productos sin uso antes de ampliar el catálogo.', caution: 'Buscar o visitar una ficha no prueba consumo. Se necesitan señales autorizadas y validación del consumidor; sin población, no evaluable.' }
  ];

  function facts(ctx, rows) {
    return `<dl class="facts">${rows.map(([term, description]) => `<div><dt>${ctx.escape(term)}</dt><dd>${ctx.escape(description)}</dd></div>`).join('')}</dl>`;
  }

  function head(ctx, current, heading, lead, status) {
    return `<nav class="breadcrumb" aria-label="Ubicación">${ctx.link('casos', 'Casos', 'text')}<span aria-current="page">${ctx.escape(current)}</span></nav><header class="page-head"><h1>${heading}</h1><p class="lead">${lead}</p><p class="case-status">${status}</p></header>`;
  }

  function tabs(ctx, items, prefix, label, content, extraClass) {
    return `<div data-tabs class="${extraClass || ''}"><div class="tabs ${prefix === 'mineria' ? 'phase-tabs' : ''}" role="tablist" aria-label="${label}">${items.map((item, index) => `<button type="button" role="tab" id="tab-${prefix}-${item.id}" data-panel-tab="${prefix}-${item.id}" aria-controls="${prefix}-${item.id}" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}">${prefix === 'mineria' ? `${index + 1}. ` : ''}${ctx.escape(item.title)}</button>`).join('')}</div>${items.map((item, index) => `<section id="${prefix}-${item.id}" class="tab-panel ${prefix === 'mineria' ? 'phase-panel' : ''}" role="tabpanel" aria-labelledby="tab-${prefix}-${item.id}" data-panel="${prefix}-${item.id}"${index ? ' hidden' : ''}>${content(item, index)}</section>`).join('')}</div>`;
  }

  function initialSignal(ctx) {
    const signal = window.PURVIEW_SIGNALS[0];
    return `<h3>${ctx.escape(signal.question)}</h3>${facts(ctx, [['Indicador propuesto', signal.metric], ['Definición', signal.formula], ['Acción que debería provocar', signal.action]])}<p class="notice">${ctx.escape(signal.caution)}</p>`;
  }

  const yaml = 'bundle:\n  name: automatizacion-datos\n\nvariables:\n  cluster_id:\n    description: Cluster autorizado\n  notebook_path:\n    description: Notebook validado\n\nresources:\n  jobs:\n    pipeline:\n      name: automatizacion-datos\n      tasks:\n        - task_key: procesar\n          existing_cluster_id: ${var.cluster_id}\n          notebook_task:\n            notebook_path: ${var.notebook_path}';

  window.CASE_PAGES = {
    casos(ctx) {
      return `<header class="page-head"><h1>Una decisión de negocio.<br>Un recorrido para sostenerla.</h1><p class="lead">Explora cómo conecto prioridades, responsabilidades y controles. Los casos de referencia permiten revisar el criterio y las piezas propuestas; la trayectoria profesional se presenta por separado.</p></header>
        <article class="case-teaser case-teaser-mining"><div><h2>Costos mineros: acordar el dato antes de decidir.</h2><p class="case-status">Caso de referencia E2E</p><p>Cuando Finanzas y Operaciones no comparten definiciones o cortes, una desviación requiere conciliación antes de orientar una acción. El caso recorre el problema, el producto propuesto y la evidencia necesaria para avanzar.</p>${facts(ctx, [['Pregunta', '¿Qué desviación de costo merece una acción?'], ['Dentro del caso', 'Cinco fases, responsables, lámina original y criterios de medición.']])}${ctx.link('mineria', 'Explorar el caso minero')}</div><figure class="figure"><img src="${miningImage}" width="1536" height="1024" alt="Lámina de la metodología integrada de gobierno de datos, desde evaluar hasta medir y mejorar." loading="lazy"><figcaption>DAMA, DCAM y PREC aplicados a un recorrido de negocio.</figcaption></figure></article>
        <article class="case-teaser case-teaser-purview"><div><h2>Purview: del catálogo a una respuesta del negocio.</h2><p class="case-status">Programa propuesto</p><p>Una regla necesita criterio; un hallazgo, responsable; un producto, consumidores. Seis ámbitos conectan calidad, ownership, productos, alertas, reportes y contexto del lake.</p>${ctx.link('purview', 'Explorar el programa Purview')}</div><div class="evidence"><h3>Lo que puedes revisar</h3><ul><li>Decisión y siguiente acción en cada ámbito.</li><li>Contrato sintético de reglas, visible y descargable.</li><li>Indicadores propuestos con límites de interpretación.</li></ul></div></article>
        <section class="section"><div class="section-head"><h2>Capacidades que llevan el criterio a la práctica.</h2><p>Piezas independientes para profundizar en una decisión concreta.</p></div><div class="related"><article><h3>Clasificar con contexto</h3><p>Cómo revisar una recomendación de IA antes de convertirla en un atributo aprobado.</p>${ctx.link('clasificacion', 'Revisar la clasificación', 'text')}</article><article><h3>Autorizar un uso</h3><p>Explorar rol, finalidad, sensibilidad y aprobación en una demostración local de acceso.</p>${ctx.link('acceso', 'Probar las condiciones de acceso', 'text')}</article><article><h3>Cambiar con control</h3><p>Seguir una versión desde el criterio de aceptación hasta la evidencia operativa.</p>${ctx.link('databricks', 'Explorar el flujo de Databricks', 'text')}</article></div></section>`;
    },

    mineria(ctx) {
      return `${head(ctx, 'Minería E2E', 'Decidir sobre costos mineros con un criterio compartido.', 'De una diferencia entre reportes a un producto con responsables y condiciones de aceptación.', 'Caso de referencia · Entregables y mediciones propuestos')}
        <section class="split section"><div><h2>La pregunta que organiza el trabajo.</h2><p>¿Qué desviación de costo merece una acción? Compararla exige acordar periodos, poblaciones y definiciones.</p><p>Empiezo por el acuerdo pendiente, su responsable y un primer producto útil.</p></div><div class="evidence"><h3>Producto propuesto</h3><p>Una vista de costos y producción con definiciones, diferencias pendientes y responsables de resolución.</p><p>Su utilidad para decidir debe comprobarse en un piloto.</p></div></section>
        <section class="section"><div class="section-head"><h2>El recorrido completo, en una lámina.</h2><button type="button" class="download" data-enlarge="${miningImage}">Ampliar metodología</button></div><figure class="figure"><img src="${miningImage}" width="1536" height="1024" alt="Metodología integrada: evaluar, definir dirección, diseñar, implementar, medir y mejorar. Relaciona DAMA, DCAM y PREC con decisiones y entregables."><figcaption>Lámina original de la propuesta. DAMA aporta prácticas; DCAM orienta capacidades y evidencia; PREC organiza la ejecución. La integración es una lectura aplicada propia, no un método oficial ni una evaluación DCAM.</figcaption></figure></section>
        <section class="section"><div class="section-head"><h2>Cinco fases. Una decisión para avanzar en cada una.</h2><p>Explora el trabajo, el entregable y la autoridad necesaria. Una brecha puede exigir volver a una fase anterior.</p></div>${tabs(ctx, phases, 'mineria', 'Fases del caso minero', phase => `<h3>${phase.question}</h3><p>${phase.action}</p>${facts(ctx, [['Entregable propuesto', phase.deliverable], ['Quién decide y participa', phase.authority], ['Qué permite avanzar', phase.gate]])}`)}</section>
        <section class="section split"><div><h2>Una diferencia que el gobierno debe aclarar.</h2><p>Ejemplo hipotético: Finanzas calcula el costo por tonelada con un corte contable; Operaciones usa producción de otro periodo. Ambas cifras pueden ser correctas para su propio uso y resultar incompatibles al compararlas.</p><p>El acuerdo debe fijar numerador, denominador, periodo y excepciones. El steward documenta la diferencia; el owner acepta el criterio; el equipo técnico lo implementa; el consumidor comprueba que resuelve su pregunta.</p></div><div><h2>Cómo propondría medir la utilidad.</h2>${facts(ctx, [['Conciliación', 'Tiempo hasta un cierre aceptado, con periodos y alcances comparables.'], ['Confianza para decidir', 'Diferencias pendientes por criticidad y evidencia de los controles revisados.'], ['Acción del negocio', 'Decisiones tomadas con el producto, responsable y seguimiento.']])}<p class="notice">Línea base y metas pendientes de acordar. No se presentan ahorros ni resultados de una operación minera.</p></div></section>
        <section class="related"><div><h2>El modelo también se elige.</h2><p>La distribución de autoridad responde al riesgo, la capacidad y las dependencias entre áreas.</p>${ctx.link('modelos', 'Comparar modelos de gobernanza')}</div><div><h2>Profundizar en el criterio.</h2><p>Cómo conecto prácticas, capacidades y evidencia sin confundir los marcos.</p>${ctx.link('enfoque', 'Explorar mi criterio', 'text')}</div></section>`;
    },

    purview(ctx) {
      return `${head(ctx, 'Programa Purview', 'Del dato catalogado a una decisión con responsable.', 'Un programa de gobierno conecta significado, calidad, ownership y consumo. Purview puede apoyar su operación; las decisiones y la aceptación siguen teniendo responsables de negocio.', 'Programa propuesto · Ejemplos sintéticos, sin instancia conectada')}
        <section class="section"><div class="section-head"><h2>Seis ámbitos que se necesitan entre sí.</h2><p>Elige un ámbito para revisar su pregunta, la decisión que exige y la evidencia que permitiría avanzar.</p></div>${tabs(ctx, purviewScopes, 'purview', 'Ámbitos del programa Purview', scope => `<h3>${scope.question}</h3><p>${scope.decision}</p>${facts(ctx, [['Evidencia propuesta', scope.evidence], ['Siguiente acción', scope.action]])}<p>${scope.detail}</p>`)}</section>
        <section class="section"><div class="section-head"><h2>Una regla debe terminar en una acción.</h2><p>Recorrido propuesto de un control. La publicación y el cierre requieren decisiones explícitas.</p></div><ol class="step-list"><li><strong>Acordar la regla de negocio</strong><p>Uso, población, excepciones y owner.</p></li><li><strong>Proponer el criterio de calidad</strong><p>Expresión y contexto; la IA puede asistir.</p></li><li><strong>Revisar el significado</strong><p>Negocio acepta, corrige o rechaza.</p></li><li><strong>Probar el control</strong><p>Tipos, nulos, sintaxis, duplicados y resultados.</p></li><li><strong>Autorizar la publicación</strong><p>Solo reglas aceptadas; registrar el estado por regla.</p></li><li><strong>Asignar el hallazgo</strong><p>Impacto, responsable y tratamiento.</p></li><li><strong>Verificar el cierre</strong><p>Nueva prueba y aceptación del uso afectado.</p></li></ol></section>
        <section class="section"><div class="section-head"><h2>El contrato de calidad que puedes inspeccionar.</h2><a class="download" href="${qualityFile}" download>Descargar contrato JSON</a></div><p>Ejemplo sintético para <code>demo.pedidos</code>. Conserva por separado la propuesta, la revisión y la autorización; no es un payload oficial de la API.</p><div class="table-wrap"><table class="data-table"><caption>Reglas propuestas; ninguna está autorizada para publicar</caption><thead><tr><th scope="col">Campo</th><th scope="col">Criterio propuesto</th><th scope="col">Qué revisar</th><th scope="col">Estado</th></tr></thead><tbody><tr><th scope="row">importe</th><td><code>importe &gt;= 0</code></td><td>Excepciones del negocio y tratamiento de nulos.</td><td>Pendiente</td></tr><tr><th scope="row">estado</th><td>pendiente, completado, cancelado</td><td>Vocabulario aceptado para el uso.</td><td>Pendiente</td></tr></tbody></table></div><div class="evidence"><h3>La publicación permanece deshabilitada.</h3><pre><code>{
  "datos": "sinteticos",
  "activo": "demo.pedidos",
  "publicar": false,
  "proveedor_ia_conectado": false,
  "revision": {
    "aprobacion_negocio": "pendiente",
    "validacion_tecnica": "pendiente",
    "autorizacion_publicacion": "pendiente"
  }
}</code></pre><p>Un servicio backend tendría que adaptar el contrato, validar permisos y compatibilidad, y conservar estado e intentos por regla. Las credenciales no pertenecen al navegador.</p></div></section>
        <section class="section"><div class="section-head"><h2>Indicadores propuestos para decidir qué atender.</h2><p>Sin datos conectados ni resultados calculados. La población, el corte, la línea base y el responsable se acuerdan antes de medir.</p></div><div class="split"><div class="field"><label for="signal-select">Qué necesita saber el negocio</label><select id="signal-select" aria-controls="signal-detail">${window.PURVIEW_SIGNALS.map(signal => `<option value="${signal.id}">${ctx.escape(signal.label)}</option>`).join('')}</select><p>La definición importa tanto como el indicador: cada señal debe conducir a una acción concreta.</p></div><div id="signal-detail" class="evidence" aria-live="polite" aria-atomic="true">${initialSignal(ctx)}</div></div></section>
        <section class="section split"><div><h2>Del nombre técnico al contexto de negocio.</h2><p><code>demo.pedidos.importe</code> describe una ubicación. Para interpretarla, el producto necesita acordar qué importe representa, quién responde por él, en qué periodo se usa y qué controles sustentan su aceptación.</p><p>Relacionar glosario, activos y productos permite conservar ese contexto. La calidad del dato requiere una comprobación independiente.</p></div><div><h2>Referencias para una implementación posterior.</h2><ul><li><a href="https://learn.microsoft.com/en-us/purview/unified-catalog-self-serve-analytics" target="_blank" rel="noopener noreferrer">Microsoft · reportes y self-serve analytics</a></li><li><a href="https://learn.microsoft.com/en-us/purview/unified-catalog-data-quality-alerts" target="_blank" rel="noopener noreferrer">Microsoft · alertas de calidad</a></li><li><a href="https://learn.microsoft.com/en-us/purview/unified-catalog-data-products" target="_blank" rel="noopener noreferrer">Microsoft · productos de datos</a></li></ul></div></section>
        <section class="related"><div><h2>Quién puede aceptar cada decisión.</h2>${ctx.link('modelos', 'Explorar responsabilidades y modelos')}</div><div><h2>Cómo gobernar la asistencia de IA.</h2>${ctx.link('ia', 'Explorar el gobierno de IA', 'text')}</div></section>`;
    },

    clasificacion(ctx) {
      return `${head(ctx, 'Clasificación con IA', 'Entender el dato antes de recomendar su uso.', 'Un nombre de columna no explica por sí solo su significado o sensibilidad. Este diseño combina contexto y revisión humana para construir una clasificación trazable.', 'Diseño de referencia · Contrato sintético, sin modelo ni API conectados')}
        <section class="split section"><div><h2>El problema empieza con una ambigüedad.</h2><p>Un campo llamado <code>identificador</code> puede ser una clave técnica, una referencia pública o un documento personal. Propagar una etiqueta equivocada hacia una política de acceso puede afectar el uso del dato.</p><p>El dueño del dato acuerda significado y sensibilidad; el steward organiza la revisión y Seguridad contrasta los atributos que utilizará la política.</p></div><div class="evidence"><h3>Tres cosas que conviene distinguir</h3>${facts(ctx, [['Tipo físico', 'STRING describe cómo se almacena.'], ['Significado', 'Identificador personal describe qué representa.'], ['Sensibilidad', 'Restringido expresa un criterio de gobierno que necesita aprobación.']])}</div></section>
        <section class="section"><h2>De la observación a una clasificación aprobada.</h2><ol class="step-list"><li><strong>Reunir contexto autorizado</strong><p>Esquema, descripción, dominio y finalidad; cualquier muestra necesita autorización y minimización.</p></li><li><strong>Conservar la propuesta</strong><p>Tipo semántico, sensibilidad, motivo y versión quedan separados de la clasificación vigente.</p></li><li><strong>Resolver la ambigüedad</strong><p>El revisor acepta, corrige o rechaza; registra el motivo y el responsable.</p></li><li><strong>Publicar atributos aprobados</strong><p>La decisión de acceso evalúa su propia política después de esa aprobación.</p></li></ol></section>
        <section class="section split"><div><h2>Un contrato para revisar.</h2><p>Ejemplo sintético: el contexto describe <code>demo.personas.documento</code> como documento personal. La propuesta sigue pendiente; no modifica el catálogo ni concede permisos.</p><pre><code>{
  "recurso": "demo.personas.documento",
  "tipo_fisico": "STRING",
  "propuesta": {
    "tipo_semantico": "identificador_personal",
    "sensibilidad": "restringido"
  },
  "estado": "pendiente_revision",
  "origen": "ejemplo_sintetico_sin_api",
  "version_contrato": "1.0"
}</code></pre></div><div><h2>La revisión debe poder cambiar la conclusión.</h2><p>Si el campo contiene una referencia pública y no un documento personal, el responsable corrige la propuesta y conserva la razón. La salida del modelo no es una fuente de autoridad.</p><h3>Qué comprobaría en un piloto</h3><ul><li>Errores y casos ambiguos por categoría.</li><li>Tiempo y capacidad necesarios para revisar.</li><li>Etiquetas con aprobación y responsable identificables.</li><li>Ausencia de cambios de permisos por sugerencias pendientes.</li></ul><p>El conjunto etiquetado y los criterios de aceptación deben existir antes de atribuir precisión o utilidad.</p></div></section>
        <section class="related"><div><h2>La siguiente decisión: quién puede usarlo.</h2>${ctx.link('acceso', 'Probar una política de acceso')}</div><div><h2>Supervisar el uso del modelo.</h2>${ctx.link('ia', 'Explorar controles de gobierno de IA', 'text')}</div></section>`;
    },

    acceso(ctx) {
      return `${head(ctx, 'Acceso responsable', 'El acceso depende del uso, además del rol.', 'Explora cómo propósito, sensibilidad y aprobación cambian una decisión. La demostración hace explícitas las condiciones que una política debe poder explicar.', 'Demostración local · Datos ficticios; no autentica personas ni concede permisos reales')}
        <section class="section split"><div><h2>Una autorización tiene alcance.</h2><p>El rol aporta una capacidad; los atributos y el propósito delimitan el uso. El dueño del dato acepta la finalidad, Seguridad revisa la política y el equipo técnico aplica y verifica las restricciones.</p><p>Seleccionar una aprobación en este formulario solo permite explorar el escenario. En un sistema real, identidad, atributos y aprobaciones deben proceder de fuentes confiables.</p></div><div class="evidence"><h3>Decidir y aplicar son responsabilidades distintas.</h3><p>Una respuesta que exige enmascarar necesita un componente que oculte los campos antes de entregar datos. Mostrar la condición en pantalla no la hace cumplir.</p></div></section>
        <section class="section"><div class="section-head"><h2>Evalúa un escenario.</h2><p>Cambia las condiciones y revisa qué decisión produce la política didáctica.</p></div><div class="split"><form id="access-demo" class="form-grid"><div class="field"><label for="access-role">Rol</label><select id="access-role" name="role"><option value="analista">Analista</option><option value="auditor">Auditor</option><option value="externo">Usuario externo</option></select></div><div class="field"><label for="access-purpose">Finalidad</label><select id="access-purpose" name="purpose"><option value="analitica">Analítica</option><option value="auditoria">Auditoría</option><option value="otro">Otro propósito</option></select></div><div class="field"><label for="access-sensitivity">Sensibilidad del recurso</label><select id="access-sensitivity" name="sensitivity"><option value="interno">Interno</option><option value="personal">Contiene datos personales</option><option value="restringido">Restringido</option></select></div><div class="field"><label for="access-approved"><input id="access-approved" type="checkbox" name="approved"> El escenario incluye una aprobación del uso</label></div><button type="submit" class="button">Evaluar condiciones</button></form><div id="access-result" class="decision-result" role="status" aria-live="polite" aria-atomic="true"><h3>Define un escenario para empezar.</h3><p>La evaluación mostrará la decisión y las condiciones que deben cumplirse.</p></div></div></section>
        <section class="section"><h2>Qué exigiría fuera de la demostración.</h2><div class="table-wrap"><table class="data-table"><thead><tr><th scope="col">Decisión</th><th scope="col">Responsable</th><th scope="col">Evidencia que revisaría</th></tr></thead><tbody><tr><th scope="row">Aceptar propósito y alcance</th><td>Responsable del dato</td><td>Aprobación vigente, recurso y límites del uso.</td></tr><tr><th scope="row">Aplicar el control</th><td>Equipo de plataforma</td><td>Atributos verificados, filtrado y enmascaramiento efectivos.</td></tr><tr><th scope="row">Comprobar y revisar</th><td>Funciones de control y responsables del uso</td><td>Pruebas de acceso permitido y denegado; revisión de excepciones.</td></tr></tbody></table></div><p class="notice">El propósito declarado por una persona no prueba autorización. La verificación y la aplicación efectiva pertenecen al servidor.</p></section>
        <section class="related"><div><h2>La política necesita atributos confiables.</h2>${ctx.link('clasificacion', 'Explorar cómo se revisa la clasificación')}</div><div><h2>Un cambio en el control también se gobierna.</h2>${ctx.link('databricks', 'Seguir el recorrido de un cambio', 'text')}</div></section>`;
    },

    databricks(ctx) {
      return `${head(ctx, 'Automatización en Databricks', 'Cambiar una automatización sin perder control.', 'Acordar aceptación, revisar una versión y conservar evidencia. El gobierno conecta esas decisiones; la plataforma habilita su ejecución.', 'Diseño de referencia · Sin workspace, notebook ejecutable ni CI/CD conectados')}
        <section class="section"><div class="section-head"><h2>Del acuerdo a la evidencia.</h2><a class="download" href="${diagramFile}" target="_blank" rel="noopener noreferrer">Abrir diagrama completo</a></div><p class="diagram-scroll-hint" id="diagram-scroll-help">Desliza horizontalmente para recorrer el diagrama. Con teclado, enfoca el visor y usa las flechas.</p><div class="full-diagram" role="region" aria-label="Diagrama de gobierno de la automatización, desplazable horizontalmente" aria-describedby="diagram-scroll-help" tabindex="0"><iframe src="${diagramFile}?embed=1" title="Diagrama Archify: criterios de negocio, cambio versionado, pruebas, autorización, operación y evidencia" loading="lazy"></iframe></div><p class="notice">Flujo de referencia integrado con Archify. La aprobación es una decisión explícita entre probar y operar.</p></section>
        <section class="section"><h2>El mismo recorrido, paso a paso.</h2><ol class="step-list"><li><strong>Acordar el uso y la aceptación</strong><p>Negocio define el resultado esperado y qué evidencia permitiría aceptarlo.</p></li><li><strong>Preparar un cambio versionado</strong><p>El equipo técnico conserva una revisión identificable del código y la configuración.</p></li><li><strong>Validar y probar</strong><p>Validar configuración y probar comportamiento con datos autorizados son comprobaciones diferentes.</p></li><li><strong>Autorizar el avance</strong><p>La función autorizadora revisa pruebas y aceptación antes de promover esa versión.</p></li><li><strong>Operar con seguimiento</strong><p>Operación conserva versión, parámetros y contexto de ejecución; responde ante fallos.</p></li><li><strong>Revisar el resultado</strong><p>Negocio y operación contrastan calidad, incidencias y criterios de recuperación.</p></li></ol></section>
        <section class="section split"><div><h2>Una ejecución correcta no agota la aceptación.</h2><p>Un job puede terminar sin errores y producir datos que no sirven para el uso acordado. Por eso separo pruebas técnicas, aceptación del consumidor y autorización del cambio.</p><p>Para reconstruir un fallo se necesita saber qué revisión se ejecutó, con qué parámetros y qué comprobaciones se realizaron.</p></div><div><h2>Reintentar también es una decisión de diseño.</h2><p>La propuesta requiere una clave de ejecución o partición y una estrategia de escritura que no duplique resultados confirmados. Antes de reenviar un trabajo con resultado incierto, se comprueba su estado.</p><p>Recuperación y reversión necesitan criterios acordados y ensayados; no se presumen resueltas por versionar un archivo.</p></div></section>
        <section class="section"><h2>La configuración, como pieza revisable.</h2><p>Este fragmento de referencia declara un job y sus parámetros. Los valores de entorno, permisos y notebook validado deben aportarse antes de cualquier despliegue.</p><details class="evidence"><summary>Ver el fragmento YAML</summary><pre><code>${ctx.escape(yaml)}</code></pre></details><p>En un piloto propondría medir cambios con evidencia completa, fallos posteriores y recuperación comprobada. No se presentan resultados medidos.</p></section>
        <section class="related"><div><h2>El control depende de responsabilidades claras.</h2>${ctx.link('modelos', 'Revisar quién decide y quién ejecuta')}</div><div><h2>Volver al problema de negocio.</h2>${ctx.link('casos', 'Explorar los casos', 'text')}</div></section>`;
    }
  };
})();
