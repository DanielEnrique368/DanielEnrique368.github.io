(() => {
  const intents = {
    valor: {
      question: '¿Qué producto de datos merece prioridad?',
      sourceLabel: 'Propuesta',
      source: 'Dar seguimiento a costos y producción',
      criteria: [
        ['Uso', 'La decisión del negocio que habilita.'],
        ['Responsable', 'Quién responde por su uso.'],
        ['Viabilidad', 'Datos, reglas y controles necesarios.']
      ],
      result: 'La prioridad se justifica por la decisión que habilita.',
      route: 'mineria',
      action: 'Explorar el caso de minería',
      note: 'Ejemplo ilustrativo de priorización'
    },
    confianza: {
      question: '¿Podemos usar este dato para decidir?',
      sourceLabel: 'Dato a evaluar',
      source: 'Estado de mantenimiento de un equipo',
      criteria: [
        ['Definición', 'Un significado acordado entre áreas.'],
        ['Responsable', 'Alguien que atienda las dudas.'],
        ['Calidad', 'Un control para el uso previsto.']
      ],
      result: 'La confianza necesita un criterio y evidencia verificable.',
      route: 'purview',
      action: 'Ver reglas y controles en Purview',
      note: 'Ejemplo ilustrativo de una condición de uso'
    },
    ia: {
      question: '¿Hasta dónde puede decidir la IA?',
      sourceLabel: 'Uso propuesto',
      source: 'Recomendar la clasificación de un documento',
      criteria: [
        ['Límite', 'Qué recomienda y qué no ejecuta.'],
        ['Revisión humana', 'Quién confirma o corrige.'],
        ['Trazabilidad', 'La evidencia de cada decisión.']
      ],
      result: 'La IA propone. Una persona conserva la responsabilidad.',
      route: 'ia',
      action: 'Explorar el gobierno de IA',
      note: 'Ejemplo ilustrativo de un uso supervisado'
    }
  };

  const routeArrow = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const documentMark = '<svg aria-hidden="true" viewBox="0 0 32 36" fill="none"><path d="M6 2h13l7 7v25H6V2Z" stroke="currentColor" stroke-width="1.6"/><path d="M19 2v8h7M11 17h10M11 22h10M11 27h6" stroke="currentColor" stroke-width="1.6"/></svg>';

  window.HOME_PAGE = (ctx) => {
    const selected = Object.hasOwn(intents, ctx.state.intent) ? ctx.state.intent : 'valor';
    const current = intents[selected];
    const link = ctx.link;
    return `
      <div class="home-page">
        <section class="home-hero container" aria-labelledby="home-title">
          <div class="hero-introduction">
            <h1 id="home-title">Daniel <br>Carhuas<span class="hero-role">Data &amp; AI Governance Lead</span></h1>
            <p class="hero-thesis">Conectar el dato con la decisión.</p>
            <p class="hero-description">Reglas claras, responsabilidades compartidas y controles útiles. Mi enfoque parte del negocio y conecta a las personas que hacen posible usar los datos con confianza.</p>
            <div class="hero-actions">${link('casos', 'Explorar casos aplicados', 'button')}${link('enfoque', 'Mi enfoque', 'text-link')}</div>
            <div class="hero-experience"><span class="experience-line" aria-hidden="true"></span><p>Experiencia como Data Steward y Senior <br>en banca, minería y educación.</p></div>
          </div>
          <div class="briefing" role="group" aria-label="Explora una decisión de gobierno">
            <div class="intent-switch" role="group" aria-label="Elige una prioridad">
              ${[['valor','Crear valor'],['confianza','Confiar en un dato'],['ia','Usar IA con criterio']].map(([value,label]) => `<button type="button" data-intent="${value}" aria-pressed="${selected === value}" aria-controls="briefing-content">${label}</button>`).join('')}
            </div>
            <div id="briefing-content" class="briefing-content" aria-live="polite" aria-atomic="true">
              <h2>${current.question}</h2>
              <div class="decision-map">
                <div class="decision-source">${documentMark}<p class="source-label">${current.sourceLabel}</p><p class="source-title">${current.source}</p></div>
                <div class="decision-criteria">
                  <p class="criteria-caption">Lo que debe quedar claro</p>
                  <ol class="criteria-list">
                    ${current.criteria.map(([label,description],i)=>`<li><span class="criterion-sequence" aria-hidden="true">${i + 1}</span><div><h3>${label}</h3><p>${description}</p></div></li>`).join('')}
                  </ol>
                </div>
              </div>
              <div class="decision-conclusion"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="m5 12 4 4L19 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg><p>${current.result}</p></div>
              <div class="briefing-bottom">${link(current.route,current.action,'text-link')}<p>${current.note}</p></div>
            </div>
          </div>
        </section>

        <section class="home-cases section container" aria-labelledby="selected-cases-title">
          <div class="section-head"><div><h2 id="selected-cases-title">El criterio, llevado a casos.</h2><p>Referencias para explorar cómo se conectan negocio, gobierno y tecnología.</p></div>${link('casos','Explorar todos los casos','text-link')}</div>
          <article class="flagship flagship-mining">
            <div class="flagship-copy"><h3>Gobierno de datos<br>de extremo a extremo.</h3><p class="case-status">Caso de referencia</p><p>Una operación minera sirve de contexto para conectar la necesidad del negocio con definiciones, responsables, controles y adopción.</p><div class="case-topics"><span>Minería</span><span>DAMA · DCAM · PREC</span></div>${link('mineria','Recorrer el caso de minería','button')}</div>
            <div class="mining-preview" role="group" aria-label="Cadena de decisiones del caso de minería">
              <div class="mining-preview-top"><span>Una misma cadena de decisiones</span>${routeArrow}</div>
              <div class="governance-chain">
                <div class="chain-start"><span class="chain-mark" aria-hidden="true"></span><h4>Necesidad<br>del negocio</h4><p>La decisión que queremos mejorar</p></div>
                <div class="chain-steps"><div><span>Definiciones</span><p>Hablar de lo mismo</p></div><div><span>Responsables</span><p>Saber quién decide</p></div><div><span>Controles</span><p>Verificar las condiciones</p></div></div>
                <div class="chain-end"><span class="chain-mark" aria-hidden="true"></span><h4>Uso y<br>adopción</h4><p>Hacer que el acuerdo funcione</p></div>
              </div>
              <p class="preview-caption">El dato conserva su contexto durante todo el recorrido.</p>
            </div>
          </article>
          <article class="flagship flagship-purview">
            <div class="rule-preview" role="group" aria-label="Ejemplo de una regla de negocio"><div class="rule-heading">${documentMark}<span>Una regla que puede revisarse</span></div><blockquote>Un activo crítico debe tener un responsable identificado.</blockquote><dl><div><dt>Regla</dt><dd>Expresa una condición del negocio</dd></div><div><dt>Control</dt><dd>Comprueba si esa condición se cumple</dd></div><div><dt>Responsable</dt><dd>Atiende la excepción y decide la acción</dd></div></dl><p class="preview-caption">Ejemplo ilustrativo. No representa un control en producción.</p></div>
            <div class="flagship-copy"><h3>Las reglas antes<br>que la herramienta.</h3><p class="case-status">Diseño de referencia</p><p>Un programa de gobierno con Purview que reúne reglas de negocio, calidad, responsables, metadatos y alertas en seis ámbitos de trabajo.</p><div class="case-topics"><span>Microsoft Purview</span><span>Calidad y responsabilidad</span></div>${link('purview','Examinar el programa','secondary')}</div>
          </article>
        </section>

        <section class="dama-feature" aria-labelledby="dama-home-title"><div class="container dama-feature-inner"><div class="dama-feature-copy"><h2 id="dama-home-title">De un marco de referencia<br>a una forma de pensar.</h2><p>DAMA, capítulo a capítulo, desde una lectura propia: qué significa cada tema, qué decisiones ayuda a ordenar y cómo llevarlo a una situación de negocio.</p>${link('dama','Leer DAMA con contexto','secondary')}</div><a class="chapter-feature" href="#/capitulo-3"><div class="chapter-feature-top"><span class="chapter-number" aria-label="Capítulo 3">03</span></div><h3>Gobierno de datos</h3><p>¿Quién decide, con qué criterio y cómo se verifica?</p><div class="chapter-feature-bottom"><span>Lectura disponible · Interpretación original</span>${routeArrow}</div></a></div></section>

        <section class="home-profile section container" aria-labelledby="home-profile-title"><div class="profile-signature" aria-hidden="true"><span>Daniel</span><span>Carhuas</span><i></i></div><div><h2 id="home-profile-title">El gobierno también<br>es trabajo con personas.</h2><p>Mi formación en Estadística e Informática y mi experiencia de más de cuatro años en banca, minería y educación dan contexto a mi forma de abordar los datos: entender el uso, aclarar la responsabilidad y construir acuerdos que se puedan sostener.</p><div class="hero-actions">${link('perfil','Ver mi perfil profesional','text-link')}${link('enfoque','Explorar mi enfoque','text-link')}</div></div></section>
      </div>`;
  };
})();
