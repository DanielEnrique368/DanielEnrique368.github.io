(function () {
  'use strict';

  const esc = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const imagePath = 'recursos/metodologia-gobierno-integrada.png';
  const link = (href, label) => `<a class="text-link" href="${href}">${label}</a>`;
  const steps = [
    ['Evaluar', 'Acordar qué decisión de costos está bloqueada, identificar fuentes y contrastar definiciones.', 'Problema priorizado, sponsor y línea base por medir.'],
    ['Definir dirección', 'Delimitar un primer producto de costos y producción, sus consumidores y el uso esperado.', 'Alcance, owner y criterios de aceptación acordados.'],
    ['Diseñar', 'Definir quién decide, reglas de conciliación, contrato del dato y ruta de escalamiento.', 'Modelo operativo, responsabilidades y controles revisados.'],
    ['Implementar', 'Probar el producto, verificar calidad y linaje, y registrar diferencias con su responsable.', 'Evidencia del piloto y aceptación de sus consumidores.'],
    ['Medir y mejorar', 'Revisar si el reporte se usa para decidir, qué incidencias persisten y qué conviene ampliar.', 'Decisión de continuar, corregir o escalar respaldada por evidencia.']
  ];

  window.STRATEGY_PAGES = {
    feature() {
      return `<article class="strategy-feature"><div><h2>Gobierno E2E para decisiones de costos mineros.</h2><p>Un caso de referencia que conecta estrategia, responsabilidades, calidad y productos de datos. La metodología integrada explica cómo llevar DAMA, DCAM y PREC a decisiones y entregables.</p>${link('#mineria','Explorar el caso y su metodología')}</div><dl><div><dt>Decisión de negocio</dt><dd>¿Qué desviación de costo requiere una acción y con qué datos la respaldamos?</dd></div><div><dt>Material disponible</dt><dd>Una lámina original seleccionada y una lectura aplicada del recorrido completo.</dd></div></dl></article>`;
    },

    mining() {
      return `<a class="backlink" href="#proyectos">Volver a proyectos</a>
        <header class="page-heading"><h1>Gobierno de datos para decidir sobre costos mineros.</h1><p>Un caso de referencia de extremo a extremo: de una pregunta de negocio a un producto de datos con responsables, controles y criterios para medir su utilidad.</p></header>
        <section class="strategy-question"><h2>¿Qué desviación de costo merece una acción?</h2><p>Cuando Finanzas y Operaciones usan definiciones o cortes distintos, el reporte puede requerir conciliación antes de servir para decidir. La propuesta es acordar significado, población, periodo y responsables, y conectar el costo con su contexto de producción.</p><p><strong>Producto propuesto:</strong> una vista de costos y producción acompañada de diferencias pendientes, decisiones requeridas y responsables de su resolución.</p></section>
        <section class="strategy-artifact" aria-labelledby="integrated-method-title"><h2 id="integrated-method-title">Una metodología que conecta los tres marcos.</h2><p>Seleccioné esta lámina porque reúne dirección de negocio, responsabilidades, ejecución y medición. Conserva el diseño original y permite leer el recorrido completo en una sola vista.</p>
          <figure><a class="strategy-image-link" href="${imagePath}" target="_blank" rel="noopener noreferrer" aria-label="Abrir metodología integrada a tamaño completo en una pestaña nueva"><img src="${imagePath}" width="1536" height="1024" alt="Metodología de cinco fases: evaluar, definir dirección, diseñar, implementar, medir y mejorar. PREC organiza proyectos, roles, estructuras y calidad; DAMA aporta cobertura de gestión de datos y DCAM orienta capacidades y evidencia." decoding="async"></a><figcaption>Lámina original de la propuesta; no es un método oficial de los marcos. ${link(imagePath,'Abrir imagen a tamaño completo')}</figcaption></figure>
          <p class="strategy-scope">Lectura aplicada del material aportado, no un mapeo oficial entre marcos ni una evaluación DCAM. PREC se presenta como la estructura operativa utilizada en esta propuesta. Las fases y los puntos de decisión de la lámina no constituyen un método oficial de DCAM.</p>
        </section>
        <section class="strategy-reading"><h2>Qué aporta cada marco a la decisión.</h2><dl><div><dt>DAMA-DMBOK</dt><dd>Ayuda a revisar las prácticas necesarias: gobierno, calidad, metadatos, integración y seguridad. Por ejemplo, acordar una definición de costo antes de comparar reportes.</dd></div><div><dt>DCAM</dt><dd>Orienta el contraste de capacidades y evidencia: no basta con nombrar un owner; importa su mandato, el proceso de decisión y la evidencia de que funciona.</dd></div><div><dt>PREC, en esta propuesta</dt><dd>Ordena la ejecución en proyectos y priorización, roles y responsabilidades, estructuras y estándares, y calidad y confianza.</dd></div></dl></section>
        <section class="strategy-route"><h2>Cómo llevarlo al caso minero.</h2><p>Las etapas permiten volver sobre decisiones anteriores cuando aparecen brechas. El avance depende de la evidencia acordada, no solo del calendario.</p><ol>${steps.map(([title,action,evidence]) => `<li><h3>${title}</h3><div><p>${action}</p><p class="strategy-evidence"><strong>Qué permite avanzar:</strong> ${evidence}</p></div></li>`).join('')}</ol></section>
        <section class="strategy-measure"><h2>Medir valor, no solo actividad.</h2><dl><div><dt>Tiempo de conciliación</dt><dd>Horas necesarias para obtener un cierre aceptado, comparando periodos equivalentes y cambios de alcance.</dd></div><div><dt>Confianza para decidir</dt><dd>Diferencias de cifras pendientes, su criticidad y los controles revisados sobre los datos que sustentan la decisión.</dd></div><div><dt>Acción del negocio</dt><dd>Decisiones tomadas con el producto, responsable asignado y seguimiento de la acción acordada.</dd></div></dl><p class="notice">No se publican cifras de una minera ni ahorros obtenidos. El caso es ilustrativo: la línea base, las metas y los resultados deben medirse y validarse antes de atribuir un beneficio.</p></section>
        <div class="resource-footer"><div><h2>El modelo de gobernanza también se elige.</h2><p>La distribución de autoridad debe responder al contexto. El modelo federado es una alternativa, no el punto de partida obligatorio.</p></div>${link('#modelos','Comparar modelos de gobernanza')}</div>`;
    },

    models() {
      const content = window.GOVERNANCE_LIBRARY.operatingModels;
      return `<a class="backlink" href="#perfil">Volver a mi enfoque</a>
        <header class="page-heading model-heading"><h1>Modelos de gobernanza y responsabilidades.</h1><p>${esc(content.intro)}</p></header>
        <section class="model-comparison" aria-labelledby="model-comparison-title"><h2 id="model-comparison-title">Dónde se decide y qué exige cada opción.</h2><p>Comparación orientativa para diseñar el modelo operativo. Las organizaciones pueden combinar enfoques o evolucionar entre ellos; la distribución real de autoridad debe quedar explícita.</p>${content.models.map(model => `<article class="model-option" id="modelo-${esc(model.id)}"><h3>${esc(model.name)}</h3><dl><div><dt>Distribución de autoridad</dt><dd>${esc(model.allocation)}</dd></div><div><dt>Cuándo considerarlo</dt><dd>${esc(model.fit)}</dd></div><div><dt>Qué hay que cuidar</dt><dd>${esc(model.tradeoff)}</dd></div></dl></article>`).join('')}</section>
        <section class="model-criteria"><h2>Mi criterio para elegir y evolucionar.</h2><p>El nombre del modelo no resuelve los conflictos de decisión. Estas preguntas ayudan a acordar qué se define en común, qué delegar y cómo verificar que el modelo funciona.</p><dl>${content.decisionCriteria.map(item => `<div><dt>${esc(item.title)}</dt><dd>${esc(item.question)}</dd></div>`).join('')}</dl></section>
        <section class="model-authority"><h2>Responsabilidades que deben quedar claras.</h2><p>En cualquiera de los modelos, acuerdo quién acepta definiciones y calidad, quién autoriza el uso, quién ejecuta controles y quién resuelve excepciones. La matriz RACI acompaña esos derechos de decisión, sus límites y los mecanismos de escalamiento.</p><p>Para casos de IA, incorporo además quién acepta el propósito, quién supervisa el comportamiento y quién puede restringir o detener su uso. La rendición de cuentas no desaparece al delegar la ejecución.</p></section>
        <section class="source-citation"><h2>Referencias y alcance</h2><p>La comparación y los criterios son una síntesis aplicada propia. La experiencia federada descrita en mi perfil no implica haber implementado todos estos modelos.</p><ul>${content.sources.map(source => `<li><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.label)}</a></li>`).join('')}</ul></section>
        <div class="resource-footer"><div><h2>Del modelo a su aplicación.</h2><p>Explora cómo conectar responsabilidad, controles y una decisión de negocio en el caso minero.</p></div>${link('#mineria','Ver el caso de gobierno E2E')}</div>`;
    }
  };
})();
