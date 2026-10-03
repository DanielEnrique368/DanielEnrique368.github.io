(function () {
  'use strict';
  const data = window.PORTFOLIO;
  const governanceLibrary = window.GOVERNANCE_LIBRARY; const leadershipProfile = window.LEADERSHIP_PROFILE;
  const app = document.getElementById('app');
  const main = document.getElementById('contenido');
  const menu = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const escape = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const icon = (name, cls = '') => `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const theme = id => id === 'acceso' ? 'teal' : id === 'databricks' ? 'orange' : '';
  const lookupNote = id => data.notes.find(note => note.id === id);
  const heading = (title, text) => `<div class="page-heading"><h1>${escape(title)}</h1><p>${escape(text)}</p></div>`;
  const back = (to, label) => `<a class="backlink" href="#${to}">${icon('arrow')}${label}</a>`;

  if (!data || !window.PolicyDemo || !governanceLibrary || !leadershipProfile) {
    app.innerHTML = heading('El portafolio no pudo cargarse.', 'Recarga la página para volver a intentarlo.') + '<a class="button" href="arquitectura.html">Abrir diagrama de referencia</a>';
    return;
  }

  function downloadLinks(items = []) {
    return items.map(item => `<a class="text-link" href="${escape(item.url)}" download>${escape(item.label)} ${icon('doc')}</a>`).join('');
  }

  function sourceLinks(items = []) {
    return items.length ? `<section class="source-citation"><h2>Referencias para profundizar</h2><ul>${items.map(item => `<li><a href="${escape(item.url)}" target="_blank" rel="noopener noreferrer">${escape(item.label)}</a></li>`).join('')}</ul></section>` : '';
  }

  const heroScenarios = {
    analytics: {role:'analista', department:'finanzas', sensitivity:'interno', purpose:'analitica'},
    audit: {role:'auditor', department:'operaciones', sensitivity:'restringido', purpose:'auditoria'},
    other: {role:'auditor', department:'operaciones', sensitivity:'restringido', purpose:'marketing'}
  };

  function heroDecision(scenario = 'audit') {
    const result = window.PolicyDemo.evaluate(heroScenarios[scenario]);
    const wording = {
      allow: ['Uso habilitado', 'El analista de Finanzas puede consultar datos internos para analítica.', 'Registrar la decisión'],
      mask: ['Uso con condiciones', 'La auditoría puede avanzar. Los identificadores deben permanecer ocultos.', 'Enmascarar y registrar'],
      deny: ['Este uso no procede', 'Tener acceso para auditar no habilita el uso de los mismos datos para marketing.', 'No entregar información']
    }[result.decision];
    return `<div class="verdict-label">${icon(result.decision === 'deny' ? 'doc' : 'check')}<span>Decisión de la política</span></div><h3>${wording[0]}</h3><p>${wording[1]}</p><dl><div><dt>Finalidad</dt><dd>${scenario === 'analytics' ? 'Analítica financiera' : scenario === 'audit' ? 'Auditoría' : 'Marketing'}</dd></div><div><dt>Control requerido</dt><dd>${wording[2]}</dd></div></dl>`;
  }

  function decisionPreview() {
    return `<section class="decision-preview" aria-label="Demostración de una decisión de gobierno"><div class="preview-top"><span class="status-dot" aria-hidden="true"></span><span class="preview-label">Demostración interactiva · datos sintéticos</span></div><h2>¿Quién puede usar este dato?</h2><p>Una misma política. Tres contextos de negocio. Elige uno.</p><div class="preview-options" role="group" aria-label="Contexto de uso del dato"><button data-scenario="analytics" aria-pressed="false" aria-controls="hero-decision">Analítica</button><button data-scenario="audit" aria-pressed="true" aria-controls="hero-decision">Auditoría</button><button data-scenario="other" aria-pressed="false" aria-controls="hero-decision">Otro uso</button></div><div id="hero-decision" class="hero-verdict" data-decision="mask" aria-live="polite" aria-atomic="true">${heroDecision()}</div><a class="preview-link" href="#laboratorio">Explorar la política completa ${icon('arrow')}</a></section>`;
  }

  function projectStories() {
    const quality = data.cases.find(c => c.id === 'purview');
    const storyTitles = {clasificacion:'Clasificar con IA, decidir con contexto.', acceso:'Habilitar acceso sin perder el control.', databricks:'Automatizar también exige gobernar el cambio.'};
    return `<div class="work-grid"><article class="work-featured"><div class="work-copy"><h3>Purview: del catálogo a decisiones de negocio.</h3><p class="case-status">Purview · ${escape(quality.business.status)}</p><p>Un programa que conecta ownership, calidad, alertas, productos de datos y metadatos de negocio. El contrato de reglas es su primera pieza pública.</p><p class="work-evidence">${escape(quality.business.proof)}</p><a class="text-link" href="#purview">Explorar el programa Purview ${icon('arrow')}</a></div><div class="rule-preview"><h4>Antes de publicar una regla</h4><p class="artifact-label">Vista del contrato sintético · demo.pedidos</p><div class="rule-row"><span>Importe no negativo</span><strong>Pendiente de revisión</strong></div><div class="rule-row"><span>Estado reconocido</span><strong>Pendiente de revisión</strong></div><div class="rule-row"><span>Publicación del lote</span><strong>No autorizada</strong></div><p class="artifact-footnote">La IA puede proponer. La aprobación sigue siendo una responsabilidad explícita.</p></div></article>${['clasificacion','acceso','databricks'].map(id => {const c = data.cases.find(item => item.id === id);return `<article class="work-story work-${id}"><h3>${storyTitles[id]}</h3><p class="case-status">${id === 'clasificacion' ? 'GenAI' : id === 'acceso' ? 'RBAC + ABAC' : 'Databricks'} · ${escape(c.business.status)}</p><p>${escape(c.business.intent)}</p><dl class="business-details"><div><dt>Evidencia disponible</dt><dd>${escape(c.business.proof)}</dd></div></dl><a class="text-link" href="#caso/${id}">Explorar ${id === 'clasificacion' ? 'clasificación' : id === 'acceso' ? 'acceso responsable' : 'automatización'} ${icon('arrow')}</a></article>`;}).join('')}</div>`;
  }

  function leadershipContent() {
    return `<div class="leadership-grid"><div class="leadership-copy"><p>Mi enfoque de Data &amp; AI Governance Lead conecta estrategia, modelo operativo y ejecución. Parte de una pregunta: ¿qué necesita poder decidir y hacer el negocio con sus datos y su IA?</p><ul><li><strong>Dirección:</strong> priorizar usos, riesgos y responsabilidades; traducir los marcos en acuerdos que la organización pueda aplicar.</li><li><strong>Gobierno de datos:</strong> significado, ownership, calidad, linaje y acceso al servicio de productos y decisiones concretas.</li><li><strong>Gobierno de IA:</strong> propósito, permisos, contexto, retención y supervisión de los agentes; no solo automatizar tareas con un modelo.</li></ul><div class="professional-profile"><details class="profile-details"><summary>Trayectoria y formación</summary><p>Soy estadístico e informático, con más de cuatro años de experiencia en banca, minería y educación. He desempeñado roles de Data Steward, Data Steward Senior y analista de gobierno de datos.</p><p>He trabajado en modelos federados, plataformas de gobierno, adopción de estándares y controles sobre datos y agentes de IA. Complemento esa práctica con formación en Data Strategy, Lead Data Officer, Data Governance y Stewardship, y estrategia e implementación de IA.</p><p>DAMA-DMBOK y DCAM aportan el marco; mi foco está en llevar sus criterios a responsabilidades, decisiones y controles concretos.</p></details></div></div><div class="leadership-practice"><h3>De la prioridad al seguimiento</h3><ol><li><strong>Acordar el uso y su criticidad</strong><span>Qué decisión se busca habilitar, qué riesgo importa y qué criterio define un resultado aceptable.</span></li><li><strong>Definir quién decide</strong><span>Responsables, autoridad, dependencias y ruta de escalamiento entre negocio, datos, TI y seguridad.</span></li><li><strong>Convertir acuerdos en controles</strong><span>Reglas de calidad, contexto de negocio, políticas de acceso y límites de uso de la IA, con revisión y evidencia.</span></li><li><strong>Verificar adopción y ajustar</strong><span>Uso efectivo, calidad, incidencias y excepciones. Un control publicado necesita seguimiento y aceptación del negocio.</span></li></ol></div></div>`;
  }

  function graph() {
    return `<svg class="graph" viewBox="0 0 600 435" aria-label="Mapa navegable de proyectos y notas relacionadas">
      <g aria-hidden="true"><path d="M170 137 337 135 420 237M170 137 420 237M170 137 88 64M170 137 305 53M337 135 305 53M337 135 492 85M337 135 228 269M420 237 228 269M420 237 532 284M420 237 474 169M170 137 228 269M90 237 170 137M90 237 90 365M90 365 300 390M337 135 300 390M420 237 490 390M90 237 300 390"/></g>
      <a href="#nota/revision-humana" aria-label="Nota: revisión humana"><circle class="node-circle note-node" cx="88" cy="64" r="7"/><text x="88" y="43" text-anchor="middle" class="detail-label">Revisión humana</text></a>
      <a href="#nota/metadatos" aria-label="Nota: metadatos"><circle class="node-circle note-node" cx="305" cy="53" r="8"/><text x="305" y="31" text-anchor="middle" class="detail-label">Metadatos</text></a>
      <a href="#nota/minimo-privilegio" aria-label="Nota: mínimo privilegio"><circle class="node-circle note-node" cx="492" cy="85" r="7"/><text x="492" y="62" text-anchor="middle" class="detail-label">Mínimo privilegio</text></a>
      <a href="#nota/decision-explicable" aria-label="Nota: decisión explicable"><circle class="node-circle note-node" cx="228" cy="269" r="8"/><text x="228" y="298" text-anchor="middle" class="detail-label">Decisión explicable</text></a>
      <a href="#nota/despliegue" aria-label="Nota: despliegue"><circle class="node-circle note-node" cx="474" cy="169" r="7"/><text x="497" y="172" class="detail-label">Despliegue</text></a>
      <a href="#nota/observabilidad" aria-label="Nota: observabilidad"><circle class="node-circle note-node" cx="532" cy="284" r="7"/><text x="509" y="315" text-anchor="middle" class="detail-label">Observabilidad</text></a>
      <a href="#caso/clasificacion" aria-label="Proyecto: clasificación GenAI"><circle class="node-circle main-node" cx="170" cy="137" r="17"/><text class="project-label" x="165" y="179" text-anchor="middle">Clasificación GenAI</text></a>
      <a href="#caso/acceso" aria-label="Proyecto: RBAC y ABAC"><circle class="node-circle access-node" cx="337" cy="135" r="17"/><text class="project-label" x="337" y="111" text-anchor="middle">RBAC + ABAC</text></a>
      <a href="#caso/databricks" aria-label="Proyecto: automatización Databricks"><circle class="node-circle ops-node" cx="420" cy="237" r="17"/><text class="project-label" x="420" y="273" text-anchor="middle">Databricks</text></a>
      <a href="#caso/purview" aria-label="Proyecto: calidad en Purview"><circle class="node-circle main-node" cx="90" cy="237" r="17"/><text class="project-label" x="90" y="275" text-anchor="middle">Purview · calidad</text></a>
      <a href="#nota/calidad-por-contrato" aria-label="Nota: reglas de calidad por contrato"><circle class="node-circle note-node" cx="90" cy="365" r="7"/><text x="90" y="394" text-anchor="middle">Reglas de calidad</text></a>
      <a href="#nota/gobierno-datos-ia" aria-label="Nota: gobierno de datos e IA"><circle class="node-circle note-node" cx="300" cy="390" r="8"/><text x="300" y="419" text-anchor="middle">Gobierno de datos e IA</text></a>
      <a href="#nota/interoperabilidad" aria-label="Nota: interoperabilidad"><circle class="node-circle note-node" cx="490" cy="390" r="7"/><text x="490" y="419" text-anchor="middle">Interoperabilidad</text></a>
    </svg><div class="mobile-map">${data.cases.map(c => `<div><a class="mobile-project" href="#caso/${c.id}"><span class="project-dot ${theme(c.id) || 'purple'}"></span>${escape(c.shortTitle)}</a><div class="mobile-connections">${c.related.map(id => `<a href="#nota/${id}">${escape(lookupNote(id)?.title || id)}</a>`).join('')}</div></div>`).join('')}</div><div class="graph-caption"><span><i></i>Proyectos</span><span><i style="background:#b4aec9"></i>Notas</span><span>Selecciona un nodo para explorar</span></div>`;
  }

  function projectList() {
    return `<div class="project-list">${data.cases.map(c => `<a class="project-row" href="#caso/${c.id}"><span class="project-symbol ${theme(c.id)}">${icon(c.id === 'clasificacion' ? 'network' : c.id === 'acceso' ? 'lab' : 'folder')}</span><span><h2>${escape(c.shortTitle)}</h2><p>${escape(c.summary)}</p></span><span class="row-meta">Ver caso</span>${icon('arrow', 'row-arrow')}</a>`).join('')}</div>`;
  }

  function home() {
    return `<div class="executive-home"><section class="executive-hero"><div class="hero-copy"><h1><span>Gobernar datos e IA.</span> <span>Habilitar negocio.</span></h1><p class="hero-description">Conecto estrategia, modelo operativo y ejecución para acordar qué priorizar, quién decide y bajo qué controles se usan los datos y la IA.</p><a class="button" href="#proyectos">Explorar los casos de negocio ${icon('arrow')}</a><p class="hero-byline">Daniel Carhuas<br><strong>Data &amp; AI Governance Lead</strong></p></div>${decisionPreview()}</section><div class="experience-band" aria-label="Trayectoria profesional"><div><strong>Banca, minería y educación</strong><span>Contextos de mi experiencia</span></div><div><strong>Estrategia, gobierno y ejecución</strong><span>Una mirada de principio a fin</span></div><div><strong>Más de cuatro años</strong><span>De experiencia profesional</span></div></div><section class="selected-work" id="casos-seleccionados"><div class="section-heading"><div><h2>De la intención<br>a una decisión concreta.</h2></div><p>Cuatro casos para explorar cómo se conecta el gobierno con la ejecución. Diseños de referencia y un prototipo; sin atribuirles resultados productivos.</p></div>${projectStories()}</section><section class="leadership-section"><div class="section-heading"><h2>El gobierno necesita<br>personas que lo hagan posible.</h2></div>${leadershipContent()}<a class="text-link profile-depth-link" href="#perfil">Conocer mi experiencia y criterio de gobierno ${icon('arrow')}</a></section><div class="resource-footer"><div><h2>Marcos para decidir. Evidencia para sostener.</h2><p>DAMA-DMBOK, interpretación propia y experiencias revisadas, conectados con decisiones y artefactos.</p></div><a class="text-link" href="#marcos">Explorar marcos aplicados ${icon('arrow')}</a></div></div>`;
  }

  function profilePage() {
    return `${back('inicio','Volver al inicio')}${heading('Data & AI Governance Lead.', 'Soy Daniel Carhuas. Mi propuesta conecta dirección de negocio, responsabilidad sobre los datos y gobierno del uso de IA: del modelo operativo a controles que puedan aplicarse, revisarse y sostenerse.')}<section class="leadership-section profile-page">${leadershipContent()}</section><section class="profile-areas"><h2>Experiencia aplicada.<br>Decisiones que importan.</h2><p>Estos ámbitos sintetizan mi trayectoria y el criterio con que abordo decisiones de gobierno. La evidencia indicada describe qué revisar; los enlaces llevan a ejemplos públicos, no a documentación de mis empleadores.</p><div class="profile-areas-list">${leadershipProfile.areas.map(area => `<article class="profile-area" id="enfoque-${escape(area.id)}"><h3>${escape(area.title)}</h3><div class="profile-area-body"><p>${escape(area.experience)}</p><dl><div><dt>Decisión de negocio</dt><dd>${escape(area.decision)}</dd></div><div><dt>Evidencia para sostenerla</dt><dd>${escape(area.evidence)}</dd></div></dl><a class="text-link" href="${escape(area.link)}">${escape(area.label)} ${icon('arrow')}</a></div></article>`).join('')}</div></section><div class="resource-footer"><div><h2>Del criterio al caso de negocio.</h2><p>Explora los contratos, las decisiones de diseño y la demostración interactiva de acceso.</p></div><a class="text-link" href="#proyectos">Ver casos de negocio ${icon('arrow')}</a></div>`;
  }

  function resourcesPage() {
    const resources = [
      ['#marcos','doc','Marcos aplicados al negocio','DAMA-DMBOK como referencia, interpretación propia y evidencia de aplicación.'],
      ['#notas','doc','Notas y marcos de gobernanza','Calidad, gobierno de datos e IA y decisiones de plataforma. Con búsqueda y descargas.'],
      ['#mapa','network','Mapa de conexiones','Cómo se relacionan los casos y sus notas.'],
      ['arquitectura.html','network','Arquitectura del sistema','Visor Archify: clasificación, revisión, políticas y operación.'],
      ['#laboratorio','lab','Laboratorio de acceso','Demostración del caso RBAC + ABAC: permitir, enmascarar o denegar.']
    ];
    return `${heading('Recursos de los proyectos.', 'Elige el material que necesitas para profundizar en un caso.')}<div class="resource-catalog">${resources.map(([url,symbol,title,description]) => `<a class="resource-entry" href="${url}">${icon(symbol)}<span><strong>${title}</strong><small>${description}</small></span>${icon('arrow','row-arrow')}</a>`).join('')}</div><p class="notice">Los diagramas y ejemplos son de referencia. El visor Archify tiene contenido en español y controles en inglés.</p>`;
  }

  function mapPage() {
    return `${back('recursos','Recursos')}${heading('Mapa de conexiones.', 'Selecciona un proyecto o una nota para abrir su contenido. Las líneas muestran vínculos de lectura.')}<section class="graph-panel connection-map" aria-label="Mapa de proyectos y notas">${graph()}</section>`;
  }

  function frameworksPage() {
    const framework = governanceLibrary.framework;
    return `${heading(framework.title, framework.intro)}<div class="framework-intro"><section><h2>De la lectura a la decisión</h2><ol class="framework-method">${framework.method.map(step => `<li><strong>${escape(step.title)}</strong><span>${escape(step.text)}</span></li>`).join('')}</ol></section><aside class="framework-scope"><h2>DAMA-DMBOK, con criterio propio</h2><p>La serie por capítulos se desarrollará a partir del ejemplar en español y de mi experiencia profesional contrastada con evidencia. Esta primera sección ofrece un método y notas propias; no presenta capítulos del libro como ya analizados.</p><a class="text-link" href="recursos/ficha-lectura-aplicada.json" download>Descargar plantilla de lectura aplicada ${icon('doc')}</a><p><a class="text-link" href="https://dama.org/learning-resources/dama-data-management-body-of-knowledge-dmbok/" target="_blank" rel="noopener noreferrer">Referencia oficial de DAMA ${icon('out')}</a></p></aside></div><section class="program-section"><h2>Criterios que ya puedes explorar</h2><p>Notas de aplicación propias. No son resúmenes de capítulos ni equivalencias oficiales entre marcos.</p><div class="framework-topics">${framework.topics.map(topic => `<a class="framework-topic" href="#nota/${escape(topic.noteId)}"><div><h3>${escape(topic.title)}</h3><p>${escape(topic.question)}</p></div><span>Leer nota ${icon('arrow')}</span></a>`).join('')}</div></section><p class="framework-status">${escape(framework.disclaimer)}</p><section class="program-bridge"><div><h2>Un marco también debe llegar a la operación.</h2><p>Explora cómo ownership, calidad y metadatos se conectan en el programa propuesto para Purview.</p></div><a class="button" href="#purview">Explorar Purview ${icon('arrow')}</a></section>`;
  }

  function signalDetail(id) {
    const signal = governanceLibrary.purview.signals.find(item => item.id === id) || governanceLibrary.purview.signals[0];
    return `<h3>${escape(signal.question)}</h3><p>${escape(signal.metric)}</p><dl><div><dt>Definición propuesta</dt><dd>${escape(signal.formula)}</dd></div><div><dt>Decisión que habilita</dt><dd>${escape(signal.action)}</dd></div></dl><p class="reading-note">${escape(signal.caution)}</p>`;
  }

  function purviewProgramPage() {
    const program = governanceLibrary.purview;
    return `${back('proyectos','Volver a los casos de negocio')}${heading('Purview como programa de gobierno.', 'Conectar reglas de negocio, responsables y contexto para construir productos de datos que puedan usarse con criterio.')}<p class="evidence-boundary">Propuesta de evolución del portafolio. Aquí no hay una instancia de Purview conectada, reportes corporativos ni resultados productivos acreditados.</p><div class="program-intro"><h2>El catálogo es el punto de partida.</h2><p>El objetivo es que cada señal llegue a alguien capaz de actuar: un dueño que decide, un steward que coordina y un equipo que resuelve. La herramienta acompaña un modelo operativo; no sustituye esas responsabilidades.</p></div><section class="program-section" aria-label="Ámbitos del programa"><h2>Seis ámbitos, una responsabilidad compartida</h2><div class="program-pillars">${program.pillars.map(pillar => `<article class="program-pillar"><h3>${escape(pillar.title)}</h3><p>${escape(pillar.decision)}</p><dl><div><dt>Artefacto propuesto</dt><dd>${escape(pillar.artifact)}</dd></div><div><dt>Cómo evaluar el avance</dt><dd>${escape(pillar.measure)}</dd></div></dl></article>`).join('')}</div><div class="supporting"><a class="button" href="#caso/purview">Ver el diseño de reglas de calidad ${icon('arrow')}</a><a class="text-link" href="#marcos">Conectar con marcos de gobierno</a></div></section><section class="program-section"><h2>Del reporte a una decisión de negocio</h2><p>Elige una pregunta para explorar una propuesta de indicador y la acción que debería provocar. Son definiciones para diseñar un cuadro de mando, no mediciones de una organización.</p><div class="signal-explorer"><div class="signal-controls"><label for="business-signal">Qué necesita saber el negocio</label><select id="business-signal" aria-controls="signal-detail">${program.signals.map(signal => `<option value="${escape(signal.id)}">${escape(signal.label)}</option>`).join('')}</select><p>Sin datos conectados. La línea base, las metas, las poblaciones y el responsable de cada indicador deben acordarse antes de medir.</p></div><div class="signal-detail" id="signal-detail" aria-live="polite" aria-atomic="true">${signalDetail(program.signals[0].id)}</div></div></section><section class="program-section"><h2>Reportes de Purview: insumos, no el objetivo final</h2><p>La documentación de Microsoft enumera seis reportes clásicos y otros dos de salud. Distinguir ambas familias evita confundir cobertura del catálogo, adopción y calidad.</p><div class="report-groups"><section><h3>Seis reportes clásicos</h3><ul><li>Activos</li><li>Adopción del catálogo</li><li>Clasificaciones</li><li>Data stewardship</li><li>Glosario</li><li>Etiquetas de sensibilidad</li></ul></section><section><h3>Salud de gobierno y calidad</h3><ul><li>Data governance</li><li>Data quality health</li></ul><p>La disponibilidad efectiva se valida en cada entorno y experiencia del producto.</p></section></div><p>Los reportes incorporados no se personalizan. Self-serve analytics publica metadatos en OneLake o ADLS Gen2 para construir análisis propios. Mi propuesta es relacionarlos con criticidad, responsables y seguimiento de acciones, en lugar de equiparar cantidad de activos catalogados con valor conseguido.</p><p class="notice">La exportación tiene alcance y permisos propios: no reproduce el acceso por dominio del catálogo, solo incluye activos gobernados y puede conservar historial de calidad eliminado del producto. El modelo de negocio deberá validar permisos, población y vigencia.</p><p class="source-citation"><a href="https://learn.microsoft.com/en-us/purview/unified-catalog-self-serve-analytics" target="_blank" rel="noopener noreferrer">Microsoft · Reportes y self-serve analytics</a></p></section><section class="program-section"><h2>Un data lake con contexto de negocio</h2><p>Ejemplo sintético: una tabla puede estar disponible y seguir siendo difícil de interpretar. El enriquecimiento propuesto relaciona su estructura con significado, responsabilidad, uso y evidencia.</p><div class="metadata-comparison"><article><h3>El dato técnico</h3><dl><div><dt>Activo</dt><dd>demo.pedidos</dd></div><div><dt>Columna</dt><dd>importe</dd></div><div><dt>Tipo</dt><dd>decimal</dd></div></dl><p>Esto describe la estructura. Aún no explica si sirve para una decisión concreta.</p></article><article><h3>El contexto que falta acordar</h3><dl><div><dt>Significado propuesto</dt><dd>Importe bruto del pedido</dd></div><div><dt>Responsable propuesto</dt><dd>Owner de Operaciones comerciales</dd></div><div><dt>Regla candidata</dt><dd>Importe no negativo, sujeto a validar excepciones</dd></div><div><dt>Producto candidato</dt><dd>Seguimiento de pedidos</dd></div><div><dt>Evidencia de calidad</dt><dd>Pendiente de medición; no certificado</dd></div></dl></article></div><p>Los términos del glosario aportan contexto a activos y productos. Un producto agrupa activos para un uso definido; enriquecer el catálogo no modifica por sí solo los archivos del lake ni vuelve correctos sus datos.</p><p class="source-citation"><a href="https://learn.microsoft.com/en-us/purview/unified-catalog-glossary-terms" target="_blank" rel="noopener noreferrer">Microsoft · Glosario</a> · <a href="https://learn.microsoft.com/en-us/purview/unified-catalog-data-products" target="_blank" rel="noopener noreferrer">Microsoft · Productos de datos</a></p></section><section class="program-section"><h2>Una alerta debe terminar en una acción.</h2><p>Purview permite notificar por umbrales, caídas del puntaje y fallos de escaneo. El diseño propuesto añade triage, asignación, seguimiento y verificación de cierre; no supone que enviar un correo resuelva el problema.</p><p>Una alerta de calidad tampoco equivale a una alerta en tiempo real de cada transacción. La frescura de la señal depende del escaneo y de la configuración. Integraciones, capacidad y costos se evaluarían en un piloto autorizado; este portafolio no despliega ninguno.</p><p class="source-citation"><a href="https://learn.microsoft.com/en-us/purview/unified-catalog-data-quality-alerts" target="_blank" rel="noopener noreferrer">Microsoft · Alertas de calidad</a></p></section><div class="resource-footer"><div><h2>Primera pieza disponible: el contrato de reglas.</h2><p>Consulta el ejemplo descargable, sus controles pendientes y sus límites.</p></div><a class="text-link" href="#caso/purview">Abrir el caso de calidad ${icon('arrow')}</a></div>`;
  }

  function related(ids, caseId) {
    const c = data.cases.find(item => item.id === caseId);
    return `<aside class="related-panel"><h2>Notas conectadas</h2>${ids.map(id => { const note = lookupNote(id); return note ? `<a class="note-link" href="#nota/${id}">${escape(note.title)}</a>` : ''; }).join('')}<h2>Artefactos del caso</h2>${c.noArchitecture ? '' : '<a class="note-link" href="arquitectura.html">Diagrama Archify</a>'}${(c.downloads || []).map(item => `<a class="note-link" href="${escape(item.url)}" download>${escape(item.label)}</a>`).join('')}${caseId === 'acceso' ? '<a class="note-link" href="#laboratorio">Simulador de políticas</a><a class="note-link" href="https://github.com/DanielEnrique368/DanielEnrique368.github.io/blob/main/policy.js" target="_blank" rel="noopener noreferrer">Código del evaluador</a>' : ''}<h2>Alcance publicado</h2><p>Diseño de referencia y ejemplos sintéticos. La evidencia de un despliegue productivo no forma parte de este portafolio.</p></aside>`;
  }

  function casePage(id) {
    const c = data.cases.find(item => item.id === id);
    if (!c) return missing();
    return `${id === 'purview' ? back('purview','Programa de gobierno en Purview') : back('proyectos','Todos los casos de negocio')}<header class="case-heading"><h1>${escape(c.business.question)}</h1><p>${escape(c.summary)}</p><span class="pill ${theme(id)}">${escape(c.business.status)} · ${escape(c.category)}</span></header><section class="business-brief" aria-label="Lectura ejecutiva del caso"><p class="business-question">${escape(c.business.intent)}</p><div class="business-brief-grid"><dl><dt>Responsabilidades</dt><dd>${escape(c.business.contribution)}</dd></dl><dl><dt>Cómo medir el valor</dt><dd>${escape(c.business.measure)}</dd></dl><dl><dt>Qué puedes comprobar aquí</dt><dd>${escape(c.business.proof)}</dd></dl></div></section>
      <div class="case-toolbar"><div class="case-tabs" role="tablist" aria-label="Contenido del caso"><button id="tab-diseno" class="case-tab" role="tab" aria-selected="true" aria-controls="panel-diseno" data-tab="diseno">Enfoque de gobierno</button><button id="tab-artefacto" class="case-tab" role="tab" aria-selected="false" aria-controls="panel-artefacto" tabindex="-1" data-tab="artefacto">Artefacto técnico</button></div></div>
      <div class="article-layout"><div class="prose"><section id="panel-diseno" role="tabpanel" aria-labelledby="tab-diseno"><h2>El problema</h2><p>${escape(c.problem)}</p><h2>Responsabilidades y criterio de avance</h2><p>${escape(c.governance)}</p><h2>Cómo se lleva a la práctica</h2><p>${escape(c.approach)}</p><h2>Decisiones y responsabilidades</h2><ul class="decisions">${c.decisions.map(d => `<li><strong>${escape(d.title)}</strong>${escape(d.text)}</li>`).join('')}</ul><div class="reading-note">${escape(c.limits)}</div>${c.noArchitecture ? '<a class="button secondary" href="#nota/calidad-por-contrato">Leer criterios de calidad</a>' : id === 'acceso' ? '<a class="button" href="#laboratorio">Experimentar con la política</a>' : '<a class="button secondary" href="arquitectura.html">Ver el flujo completo</a>'}</section>
      <section id="panel-artefacto" role="tabpanel" aria-labelledby="tab-artefacto" hidden><h2>Una pieza concreta del diseño</h2><p>${escape(c.evidence)}</p><div class="code-block"><div class="code-bar"><span>${escape(c.codeLanguage)}</span><button class="copy-button" data-copy="${id}">Copiar código</button></div><pre><code>${escape(c.code)}</code></pre></div><p class="notice" id="copy-status" role="status"></p><h2>Cómo leer este artefacto</h2><p>${c.artifactReading ? escape(c.artifactReading) : id === 'clasificacion' ? 'El contrato conserva la propuesta separada de la aprobación. La clasificación se publica tras su aprobación; el acceso se decide mediante una política independiente.' : id === 'acceso' ? 'La función devuelve una decisión y sus obligaciones. Puedes ejecutar esta misma evaluación desde el laboratorio y contrastar sus condiciones.' : 'Este fragmento muestra dónde se versionan el job y sus parámetros. Hay que aportar valores de entorno y un notebook validado antes de poder desplegarlo.'}</p><div class="supporting">${downloadLinks(c.downloads)}${c.noArchitecture ? '' : `<a class="text-link" href="arquitectura.dataflow.json" download>Descargar especificación del mapa ${icon('doc')}</a>`}${id === 'acceso' ? '<a class="text-link" href="#laboratorio">Abrir laboratorio</a>' : ''}</div>${sourceLinks(c.sources)}</section></div>${related(c.related, id)}</div>`;
  }

  function notesPage() {
    return back('recursos','Recursos') + heading('Notas técnicas.', 'Patrones y decisiones de los casos, conectados entre sí y disponibles en Markdown.') + `<label class="catalog-search">${icon('search')}<input type="search" id="note-search" placeholder="Buscar por tema, patrón o decisión…" aria-label="Buscar notas" autocomplete="off"></label><p id="note-count" class="note-count" role="status"></p><div id="note-results" class="note-grid"></div>`;
  }

  function updateNotes(query = '') {
    const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const q = normalize(query.trim());
    const matches = data.notes.filter(n => normalize([n.title,n.summary,n.category,n.decision,n.tradeoff,...n.paragraphs].join(' ')).includes(q));
    document.getElementById('note-count').textContent = `${matches.length} ${matches.length === 1 ? 'nota encontrada' : 'notas encontradas'}`;
    document.getElementById('note-results').innerHTML = matches.length ? matches.map(n => `<a class="note-item" href="#nota/${n.id}"><span class="note-type">${escape(n.category)}</span><h2>${escape(n.title)}</h2><p>${escape(n.summary)}</p></a>`).join('') : '<div class="empty-state"><h2>No hay notas con ese término.</h2><p>Prueba con “acceso”, “metadatos” o “despliegue”.</p><button class="button secondary" id="clear-search">Limpiar búsqueda</button></div>';
  }

  function notePage(id) {
    const n = lookupNote(id);
    if (!n) return missing();
    const linkedCases = data.cases.filter(c => c.related.includes(id));
    return `${back('notas','Todas las notas')}<header class="case-heading"><span class="pill">${escape(n.category)}</span><h1>${escape(n.title)}</h1><p>${escape(n.summary)}</p></header><div class="article-layout"><article class="prose">${n.paragraphs.map(p => `<p>${escape(p)}</p>`).join('')}<h2>Decisión de diseño</h2><p>${escape(n.decision)}</p><h2>El compromiso que implica</h2><p>${escape(n.tradeoff)}</p>${sourceLinks([n.source,...(n.sources || [])].filter((item,index,all) => item && all.findIndex(other => other?.url === item.url) === index))}${n.attribution ? `<p class="notice">${escape(n.attribution)}</p>` : ''}<p class="notice">Las decisiones descritas son propuestas de este portafolio.</p><div class="supporting"><a class="button secondary" href="notas/${n.id}.md" download>Descargar nota .md ${icon('doc')}</a>${downloadLinks(n.downloads)}</div><p class="notice">Markdown con enlaces entre notas, listo para incorporarlo a un cuaderno de Obsidian.</p></article><aside class="related-panel"><h2>Conectada con</h2>${n.related.map(id => `<a class="note-link" href="#nota/${id}">${escape(lookupNote(id).title)}</a>`).join('')}<h2>Aparece en estos proyectos</h2>${linkedCases.map(c => `<a class="note-link" href="#caso/${c.id}">${escape(c.shortTitle)}</a>`).join('')}<h2>Mapa de conexiones</h2><a class="note-link" href="#mapa">Explorar conexiones</a></aside></div>`;
  }

  function labPage() {
    return `${back('caso/acceso','Caso de RBAC + ABAC')}${heading('Laboratorio de acceso.', 'Cambia los atributos y observa la decisión. Esta demostración evalúa una regla local sobre un recurso ficticio; no consulta datos ni servicios externos.')}<div class="presets" aria-label="Escenarios de ejemplo"><button class="preset" data-preset="allow">Analista de finanzas</button><button class="preset" data-preset="mask">Auditor con dato restringido</button><button class="preset" data-preset="deny">Visitante sin lectura</button></div>
      <div class="lab-layout"><form id="policy-form" class="lab-form"><h2>Contexto de la solicitud</h2><p>Recurso: <code>finanzas.movimientos</code></p>
      <label class="field"><span>Rol de la persona</span><select name="role"><option value="analista">Analista</option><option value="auditor">Auditor</option><option value="visitante">Visitante</option></select></label>
      <label class="field"><span>Departamento</span><select name="department"><option value="finanzas">Finanzas</option><option value="operaciones">Operaciones</option></select></label>
      <label class="field"><span>Sensibilidad del dato</span><select name="sensitivity"><option value="publico">Público</option><option value="interno" selected>Interno</option><option value="restringido">Restringido</option></select></label>
      <label class="field"><span>Propósito de uso</span><select name="purpose"><option value="analitica">Analítica</option><option value="auditoria">Auditoría</option><option value="marketing">Marketing</option></select></label></form><section id="policy-result" class="decision-panel" aria-live="polite" aria-atomic="true"></section></div>
      <section class="sample-result"><h2>Vista del resultado sintético</h2><pre id="sample-data"></pre></section><div class="reading-note">Este formulario explica una política; no es un sistema de autenticación. En producción, identidad y atributos se verifican en el servidor, que también aplica el enmascaramiento antes de entregar datos.</div><div class="supporting"><a class="text-link" href="#caso/acceso">Leer el caso de RBAC + ABAC ${icon('arrow')}</a><a class="text-link" href="https://github.com/DanielEnrique368/DanielEnrique368.github.io/blob/main/policy.js" target="_blank" rel="noopener noreferrer">Ver la regla en GitHub ${icon('out')}</a></div>`;
  }

  function evaluatePolicy() {
    const form = document.getElementById('policy-form');
    const values = Object.fromEntries(new FormData(form));
    const result = window.PolicyDemo.evaluate(values);
    const panel = document.getElementById('policy-result');
    panel.dataset.decision = result.decision;
    const meaningful = result.checks.filter(c => c.label.startsWith('RBAC') || c.label.startsWith('ABAC'));
    panel.innerHTML = `<span class="decision-state">${result.decision === 'allow' ? 'Permitir' : result.decision === 'mask' ? 'Permitir con obligaciones' : 'Denegar'}</span><h2>${escape(result.title)}</h2><p>${escape(result.reason)}</p><ul class="check-list">${meaningful.map(c => `<li><span class="check-symbol ${c.pass ? '' : 'no'}" aria-label="${c.pass ? 'Cumple' : 'No cumple'}">${c.pass ? icon('check') : '<span aria-hidden="true">×</span>'}</span>${escape(c.label)}</li>`).join('')}</ul><div class="obligation"><strong>${result.obligations.length ? 'Obligaciones de la decisión' : 'Resultado de la política'}</strong><br>${result.obligations.length ? result.obligations.map(escape).join('<br>') : 'No entregar filas del recurso solicitado.'}</div>`;
    document.getElementById('sample-data').textContent = result.decision === 'deny' ? 'No se entregan filas. La solicitud no cumple la política.' : JSON.stringify({id_movimiento:'DEMO-001',documento:result.decision === 'mask' ? '********' : 'ID-SINTETICO-001',importe_demo:1250,moneda:'PEN'},null,2);
  }

  function archivePage() {
    const repos = [ ['ProgrammingAssignment2','R Programming','Programación y funciones en R'],['ExData_Plotting1','Exploratory Data Analysis','Exploración y visualización de datos'],['RepData_PeerAssessment1','Reproducible Research','Análisis reproducible'],['JHU-reproducible-research-course-project-2','Research Project','Proyecto de investigación reproducible'],['-Coursera-Getting-and-Cleaning-Data-Course-Project-','Getting & Cleaning Data','Preparación y limpieza de datos'],['Exploratory-Data-Analysis-Week-4-Project-2','EDA Week 4','Ejercicios de análisis exploratorio'] ];
    return heading('El archivo de aprendizaje.', 'Cursos, ejercicios y repositorios anteriores. Un historial de formación que acompaña a mi trayectoria en gobierno y gestión de datos.') + `<div class="archive-list">${repos.map(([repo,title,desc]) => `<a href="https://github.com/DanielEnrique368/${repo}" target="_blank" rel="noopener noreferrer"><span>${escape(title)}<small>${escape(desc)}</small></span>${icon('out')}</a>`).join('')}</div>`;
  }

  function missing() { return heading('No encontramos esta página.', 'Vuelve a los casos de negocio para continuar explorando.') + '<a class="button" href="#proyectos">Ver casos de negocio</a>'; }
  function closeMenu() { sidebar.classList.remove('open'); menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Abrir navegación'); }
  function render(initial = false) {
    const [route = 'inicio', id] = location.hash.slice(1).split('/');
    const active = ['','inicio','proyectos','caso','purview'].includes(route) ? 'proyectos' : route === 'marcos' ? 'marcos' : route === 'perfil' ? 'perfil' : ['recursos','mapa','notas','nota','laboratorio'].includes(route) ? 'recursos' : null;
    const handlers = {inicio:home,proyectos:home,marcos:frameworksPage,purview:purviewProgramPage,perfil:profilePage,recursos:resourcesPage,mapa:mapPage,caso:() => casePage(id),notas:notesPage,nota:() => notePage(id),laboratorio:labPage,archivo:archivePage};
    const routeKey = route || 'inicio';
    app.innerHTML = (Object.hasOwn(handlers,routeKey) ? handlers[routeKey] : missing)();
    document.querySelectorAll('[data-nav]').forEach(a => { if(a.dataset.nav === active) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current'); });
    const title = app.querySelector('h1');
    document.title = `${['','inicio','proyectos'].includes(route) ? 'Data & AI Governance Lead' : title ? title.textContent : 'Data & AI Governance Lead'} | Daniel Carhuas`;
    if (route === 'notas') updateNotes();
    if (route === 'laboratorio') evaluatePolicy();
    closeMenu();
    if (!initial) { main.focus({preventScroll:true}); window.scrollTo(0,0); }
    if (route === 'proyectos') document.getElementById('casos-seleccionados')?.scrollIntoView({behavior:'instant',block:'start'});
  }

  app.addEventListener('click', async event => {
    const scenario = event.target.closest('[data-scenario]');
    if (scenario && Object.hasOwn(heroScenarios, scenario.dataset.scenario)) {
      app.querySelectorAll('[data-scenario]').forEach(button => button.setAttribute('aria-pressed', String(button === scenario)));
      const panel = document.getElementById('hero-decision');
      panel.dataset.decision = window.PolicyDemo.evaluate(heroScenarios[scenario.dataset.scenario]).decision;
      panel.innerHTML = heroDecision(scenario.dataset.scenario);
    }
    const tab = event.target.closest('[data-tab]');
    if(tab) {
      document.querySelectorAll('[data-tab]').forEach(b => { const active = b === tab; b.setAttribute('aria-selected',String(active)); b.tabIndex = active ? 0 : -1; document.getElementById(`panel-${b.dataset.tab}`).hidden = !active; });
    }
    const copy = event.target.closest('[data-copy]');
    if(copy) {
      try { await navigator.clipboard.writeText(data.cases.find(c => c.id === copy.dataset.copy).code); document.getElementById('copy-status').textContent = 'Código copiado.'; }
      catch { document.getElementById('copy-status').textContent = 'No se pudo copiar automáticamente. Selecciona el bloque y usa Copiar.'; }
    }
    if(event.target.closest('#clear-search')) { const field = document.getElementById('note-search');field.value='';updateNotes();field.focus(); }
    const preset = event.target.closest('[data-preset]');
    if(preset) {
      const values = {allow:['analista','finanzas','interno','analitica'],mask:['auditor','operaciones','restringido','auditoria'],deny:['visitante','finanzas','publico','analitica']}[preset.dataset.preset];
      const form = document.getElementById('policy-form');
      ['role','department','sensitivity','purpose'].forEach((key,i) => {form.elements[key].value=values[i];}); evaluatePolicy();
    }
  });
  app.addEventListener('input',event => { if(event.target.id === 'note-search') updateNotes(event.target.value); });
  app.addEventListener('change',event => { if(event.target.closest('#policy-form')) evaluatePolicy(); if(event.target.id === 'business-signal') document.getElementById('signal-detail').innerHTML = signalDetail(event.target.value); });
  app.addEventListener('submit',event => event.preventDefault());
  app.addEventListener('keydown',event => {
    const tab = event.target.closest('[data-tab]');
    if(tab && ['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) { event.preventDefault();const tabs=[...document.querySelectorAll('[data-tab]')];const target = event.key==='Home' ? tabs[0] : event.key==='End' ? tabs.at(-1) : tabs[(tabs.indexOf(tab)+1)%tabs.length];target.click();target.focus(); }
  });
  menu.addEventListener('click',() => {const open=sidebar.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar navegación':'Abrir navegación');});
  const searchShortcut = document.querySelector('.search-shortcut');
  searchShortcut.setAttribute('aria-label','Buscar notas');
  searchShortcut.addEventListener('click',() => setTimeout(()=>document.getElementById('note-search')?.focus(),0));
  document.addEventListener('click',event => {if(sidebar.classList.contains('open') && !sidebar.contains(event.target) && !menu.contains(event.target)) closeMenu();});
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.hash !== location.hash || link.hash === '#contenido') return;
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    render();
  });
  document.addEventListener('keydown',event => {
    if(event.key==='Escape') {if(sidebar.classList.contains('open')) {closeMenu();menu.focus();}}
    if(event.key==='/' && !event.ctrlKey && !event.metaKey && !['INPUT','SELECT','TEXTAREA'].includes(document.activeElement.tagName)) {event.preventDefault();if(location.hash!=='#notas') location.hash='notas';setTimeout(()=>document.getElementById('note-search')?.focus(),0);}
  });
  window.addEventListener('hashchange',() => {if(location.hash!=='#contenido') render();});
  render(true);
})();
