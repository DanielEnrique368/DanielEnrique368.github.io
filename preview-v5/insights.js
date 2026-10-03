(function () {
  "use strict";

  const chapters = [
    { n: 1, title: "Gestión de datos", question: "¿Qué valor de negocio justifica gestionar estos datos?", plan: "Partir de una decisión, reconocer sus consumidores y convertir el valor esperado en prioridades de trabajo. La lectura distinguirá actividad, capacidad y utilidad comprobada." },
    { n: 2, title: "Ética en el tratamiento de datos", question: "¿A quién podría perjudicar este uso del dato?", plan: "Revisar finalidad, personas afectadas y consecuencias, incluso cuando un uso sea técnicamente posible. Incluirá preguntas para registrar tensiones y decidir cuándo escalar." },
    { n: 3, title: "Gobierno de datos", question: "¿Quién decide cuando dos áreas necesitan cosas distintas?" },
    { n: 4, title: "Arquitectura de datos", question: "¿Qué capacidades de negocio debe habilitar el diseño?", plan: "Relacionar necesidades, dependencias y restricciones con decisiones de arquitectura. El foco será qué acuerdos permiten evolucionar el diseño sin perder contexto." },
    { n: 5, title: "Modelado y diseño de datos", question: "¿Compartimos el significado de aquello que medimos?", plan: "Explorar cómo entidades, relaciones y reglas hacen explícito un significado compartido. Usará un ejemplo propio para separar el concepto de negocio de su representación técnica." },
    { n: 6, title: "Almacenamiento y operaciones de datos", question: "¿Qué necesita el negocio para mantener disponible su información?", plan: "Conectar disponibilidad, recuperación y continuidad con un uso concreto. La lectura identificará qué debe comprobarse, quién responde y qué evidencia permite reanudar una operación." },
    { n: 7, title: "Seguridad de datos", question: "¿Quién necesita acceso, para qué y bajo qué condiciones?", plan: "Distinguir autorización, aplicación del permiso y revisión del acceso efectivo. Se apoyará en un ejemplo de alcance, contexto y obligaciones de protección." },
    { n: 8, title: "Integración e interoperabilidad de datos", question: "¿Qué acuerdos permiten compartir datos sin perder su significado?", plan: "Trabajar con contratos entre productor y consumidor: significado, entrega, cambios y responsabilidad. Revisará qué ocurre cuando un dato cruza los límites de un equipo." },
    { n: 9, title: "Gestión de documentos y contenido", question: "¿Podemos encontrar la versión vigente de una decisión?", plan: "Relacionar clasificación, acceso, vigencia y conservación con la trazabilidad de los acuerdos. Incluirá una ficha para reconocer la versión autorizada y a su responsable." },
    { n: 10, title: "Datos de referencia y datos maestros", question: "¿Qué ocurre cuando cada área identifica al mismo cliente de forma distinta?", plan: "Explorar identidad, vocabularios y resolución de diferencias entre fuentes. La lectura separará la consolidación técnica de la autoridad para aceptar una correspondencia." },
    { n: 11, title: "Almacenes de datos e inteligencia de negocios", question: "¿Qué decisiones deben sostener nuestros indicadores?", plan: "Relacionar definición, población, corte y procedencia de un indicador con su uso. Examinará qué necesita conocer una persona antes de actuar sobre un reporte." },
    { n: 12, title: "Gestión de metadatos", question: "¿Puede otra persona entender y usar el dato con confianza?", plan: "Conectar definición, procedencia, responsable y condiciones de uso. El criterio de utilidad será lo que el consumidor puede resolver con ese contexto, además de su registro en un catálogo." },
    { n: 13, title: "Calidad de datos", question: "¿Qué error importa más para el uso que queremos habilitar?", plan: "Pasar de una regla aislada a un acuerdo sobre población, prueba y aceptación. Abordará priorización de hallazgos, tratamiento de excepciones y evidencia de cierre." },
    { n: 14, title: "Big Data y ciencia de datos", question: "¿Qué hipótesis merece inversión y cómo comprobaremos su utilidad?", plan: "Unir propósito, datos disponibles, evaluación y condiciones de uso. Revisará cómo conservar las limitaciones cuando una exploración se convierte en una propuesta para el negocio." },
    { n: 15, title: "Evaluación de madurez de la gestión de datos", question: "¿Qué capacidad conviene mejorar primero y por qué?", plan: "Separar una capacidad declarada de la evidencia de que funciona. La lectura propondrá preguntas para priorizar una mejora, sin presentar una evaluación ni una puntuación oficial." },
    { n: 16, title: "Organización de la gestión de datos y expectativas de los roles", question: "¿Los responsables tienen autoridad y capacidad para cumplir su papel?", plan: "Conectar mandato, tiempo, conocimientos y escalamiento con decisiones concretas. Comparará responsabilidades nominales con condiciones que permiten ejercerlas." },
    { n: 17, title: "Gestión de datos y gestión del cambio organizacional", question: "¿Qué debe cambiar en el trabajo diario para sostener la adopción?", plan: "Observar hábitos, incentivos, acompañamiento y retroalimentación. El foco será cómo comprobar que una práctica sirve y se mantiene después de su presentación inicial." }
  ];

  function breadcrumb(ctx, label, parent) {
    return `<nav class="breadcrumb" aria-label="Ubicación">${ctx.link("inicio", "Inicio", "text")}${parent ? `<span aria-hidden="true">/</span>${ctx.link(parent.route, parent.label, "text")}` : ""}<span aria-hidden="true">/</span><span aria-current="page">${ctx.escape(label)}</span></nav>`;
  }

  function heading(title, lead, status) {
    return `<header class="page-head"><h1>${title}</h1><p class="lead">${lead}</p>${status ? `<p class="case-status">${status}</p>` : ""}</header>`;
  }

  function table(label, columns, rows) {
    return `<div class="table-wrap" tabindex="0" role="region" aria-label="${label}"><table class="data-table"><caption>${label}</caption><thead><tr>${columns.map(c => `<th scope="col">${c}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr><th scope="row">${row[0]}</th>${row.slice(1).map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  }

  function readingNav(items, label) {
    return `<nav class="reading-nav" aria-label="${label || "En esta página"}"><h2>En esta página</h2>${items.map(([id, name]) => `<button type="button" data-scroll="${id}">${name}</button>`).join("")}</nav>`;
  }

  function related(ctx, title, text, links) {
    return `<section class="related section"><div class="section-head"><h2>${title}</h2><p>${text}</p></div><div class="actions">${links.map(([route, label]) => ctx.link(route, label, "text")).join("")}</div></section>`;
  }

  function download(url, title, description) {
    return `<aside class="download"><div><h3>${title}</h3><p>${description}</p></div><a class="button" href="${url}" download>Descargar JSON</a></aside>`;
  }

  window.INSIGHT_PAGES = {
    enfoque(ctx) {
      return `${breadcrumb(ctx, "Mi enfoque")}${heading("El gobierno empieza por una decisión que importa.", "Conecto prioridades de negocio, responsabilidades y controles. El trabajo tiene sentido cuando las personas saben qué pueden decidir y cuentan con evidencia para hacerlo.")}
      <div class="reading-layout">
        ${readingNav([["enfoque-recorrido", "Cómo trabajo"], ["enfoque-marcos", "Qué aporta cada marco"], ["enfoque-evidencia", "Cómo lo compruebo"]])}
        <div class="reading-main">
          <section class="section" id="enfoque-recorrido" aria-labelledby="recorrido-title">
            <div class="section-head"><h2 id="recorrido-title">De la prioridad al acuerdo operativo</h2><p>Antes de elegir una herramienta, necesito entender qué decisión está detenida, qué la hace importante y a quién afecta.</p></div>
            <ol class="step-list">
              <li><div><h3>Precisar el uso</h3><p>Acordar qué necesita decidir el negocio, con qué datos y qué riesgo aparece si el criterio es incorrecto. El alcance debe ser lo bastante concreto para poder comprobarlo.</p><p><strong>Queda definido:</strong> propósito, consumidores, población y límites.</p></div></li>
              <li><div><h3>Dar autoridad a la responsabilidad</h3><p>Identificar quién acepta el significado y el uso, quién mantiene el dato y quién resuelve un desacuerdo. El mandato debe acompañarse de tiempo y capacidad para ejercerlo.</p><p><strong>Queda definido:</strong> alcance de decisión, ejecución y escalamiento.</p></div></li>
              <li><div><h3>Convertir el acuerdo en un control</h3><p>Traducir el criterio en una definición, regla o condición de acceso. Acordar cómo se prueba y qué evidencia necesita la persona que autoriza avanzar.</p><p><strong>Queda definido:</strong> criterio de aceptación, prueba y tratamiento del fallo.</p></div></li>
              <li><div><h3>Comprobar el uso y ajustar</h3><p>Revisar los resultados con productores y consumidores. Un hallazgo se cierra cuando existe evidencia de corrección y aceptación; ampliar el alcance requiere revisar de nuevo los riesgos.</p><p><strong>Queda definido:</strong> seguimiento, decisión de cierre y próxima revisión.</p></div></li>
            </ol>
          </section>
          <section class="section" id="enfoque-marcos" aria-labelledby="marcos-title">
            <div class="section-head"><h2 id="marcos-title">Tres referencias, preguntas complementarias</h2><p>Uso los marcos para ordenar el razonamiento y acordar una mejora que pueda revisarse.</p></div>
            ${table("Cómo conecto DAMA-DMBOK, DCAM y PREC", ["Referencia", "Pregunta de trabajo", "Qué aporta a esta propuesta"], [
              ["DAMA-DMBOK", "¿Qué prácticas de gestión de datos hacen falta?", "Seleccionar prácticas de gobierno, calidad, metadatos, seguridad e integración según el uso y el contexto."],
              ["DCAM", "¿Qué capacidad existe y con qué evidencia se sostiene?", "Contrastar mandatos, procesos y evidencia para reconocer brechas y priorizar su mejora."],
              ["PREC", "¿Cómo organizamos la ejecución?", "En esta propuesta, ordenar proyectos, roles, estructuras y calidad con responsables y entregables concretos."]
            ])}
            <p class="notice">Esta conexión es una interpretación aplicada propia. PREC estructura la propuesta; la tabla no representa equivalencias oficiales, un método certificado ni una evaluación puntuada de madurez.</p>
            <p class="source-links">Referencias: <a href="https://dama.org/learning-resources/dama-data-management-body-of-knowledge-dmbok/" target="_blank" rel="noopener noreferrer">DAMA-DMBOK</a> y <a href="https://edmcouncil.org/frameworks/dcam/" target="_blank" rel="noopener noreferrer">DCAM, de EDM Association</a>.</p>
          </section>
          <section class="section" id="enfoque-evidencia" aria-labelledby="evidencia-title">
            <div class="section-head"><h2 id="evidencia-title">La evidencia cambia la conversación</h2><p>El mismo criterio se puede aplicar a responsabilidades, calidad y contexto.</p></div>
            ${table("Del acuerdo a su comprobación", ["Tema", "Acuerdo que busco", "Evidencia que revisaría"], [
              ["Responsabilidad", "Quién acepta el significado y el uso de un activo prioritario.", "Mandato confirmado, alcance de decisión y una ruta conocida para resolver conflictos."],
              ["Calidad", "Qué condiciones debe cumplir el dato para un uso concreto.", "Control ejecutado sobre una población conocida, hallazgos revisados y prueba de cierre."],
              ["Metadatos", "Qué necesita saber el consumidor para utilizar el dato.", "Definición y procedencia vigentes, responsable y validación del contexto con sus consumidores."]
            ])}
          </section>
        </div>
      </div>
      ${related(ctx, "Ver el criterio en contexto", "El modelo distribuye autoridad. Los casos muestran cómo esa autoridad se convierte en decisiones y controles.", [["modelos", "Comparar modelos"], ["mineria", "Explorar el caso minero"], ["ia", "Gobierno de IA"], ["dama", "Leer DAMA aplicado"]])}`;
    },

    modelos(ctx) {
      return `${breadcrumb(ctx, "Modelos de gobernanza", { route: "enfoque", label: "Mi enfoque" })}${heading("Distribuir autoridad sin perder responsabilidad.", "Centralizar, delegar o coordinar cambia dónde se decide y cómo se resuelven los desacuerdos. La elección depende del riesgo, las capacidades y las relaciones entre áreas.")}
      <section class="section" aria-labelledby="modelos-comparacion">
        <div class="section-head"><h2 id="modelos-comparacion">Comparar lo que cada opción exige</h2><p>Los tres modelos pueden coexistir dentro de una organización. Su utilidad se comprueba sobre decisiones concretas.</p></div>
        ${table("Comparación de modelos de gobernanza", ["Criterio", "Centralizado", "Descentralizado", "Federado"], [
          ["Autoridad", "Una instancia central concentra políticas y decisiones comunes; delimita la ejecución local.", "Las unidades deciden sobre sus prácticas locales dentro de las obligaciones corporativas.", "El centro acuerda reglas comunes; los dominios deciden dentro de ellas y participan en su coordinación."],
          ["Agilidad", "Puede resolver rápido criterios comunes. La demanda que supera su capacidad acumula aprobaciones.", "Acerca la decisión al contexto local. Los acuerdos entre áreas pueden exigir trabajo adicional.", "Facilita decisiones locales dentro de límites compartidos. Los asuntos transversales requieren coordinación."],
          ["Capacidad necesaria", "Equipo central con mandato, conocimiento del negocio y capacidad de atender la demanda.", "Responsables locales capaces de operar controles, conservar evidencia y responder por sus decisiones.", "Capacidad en los dominios, una función común efectiva y mecanismos para resolver desacuerdos."],
          ["Riesgo que vigilar", "Cuellos de botella y distancia entre el criterio común y el problema de negocio.", "Definiciones incompatibles, duplicidad de esfuerzos y controles de alcance desigual.", "Responsabilidades ambiguas, excepciones sin resolver y coordinación que solo existe en el papel."],
          ["Cuándo lo consideraría", "Cuando se consolidan criterios comunes o es necesario concentrar conocimiento escaso.", "Cuando las necesidades locales difieren y cada unidad puede sostener su autonomía.", "Cuando varios dominios necesitan autonomía y comparten datos, riesgos o decisiones."]
        ])}
      </section>
      <section class="section split" aria-labelledby="modelos-criterios">
        <div><div class="section-head"><h2 id="modelos-criterios">La elección empieza con cuatro preguntas</h2></div>
          <ol class="step-list">
            <li><div><h3>¿Qué riesgo necesita revisión común?</h3><p>Identificar quién acepta el riesgo, qué decisiones puede asumir un dominio y quién autoriza excepciones.</p></div></li>
            <li><div><h3>¿Quién puede sostener lo que se delega?</h3><p>Comprobar mandato, tiempo, conocimiento y capacidad de conservar evidencia.</p></div></li>
            <li><div><h3>¿Qué atraviesa los límites de un área?</h3><p>Reconocer definiciones, productos y consumidores que dependen de acuerdos compartidos.</p></div></li>
            <li><div><h3>¿Dónde aparecen demoras o duplicidad?</h3><p>Probar una distribución de decisiones y observar su funcionamiento antes de ampliarla.</p></div></li>
          </ol>
        </div>
        <aside class="evidence"><h2>Un indicador compartido</h2><p>En un ejemplo hipotético, Operaciones y Finanzas necesitan un criterio común sobre costos.</p><p>La definición transversal puede requerir una autoridad compartida, mientras cada área conserva la responsabilidad de ejecutar controles sobre su fuente.</p><p>La decisión que debe quedar clara es quién resuelve una diferencia y con qué evidencia. Un comité sin ese mandato deja el problema abierto.</p>${ctx.link("mineria", "Seguir el caso minero", "text")}</aside>
      </section>
      <aside class="notice"><p>La federación es una opción que debe poder sostenerse. Un organigrama, una matriz RACI o un catálogo ayudan a expresar los acuerdos; el funcionamiento se comprueba cuando alguien tiene que decidir.</p></aside>
      ${related(ctx, "Llevar el modelo al trabajo diario", "La distribución de autoridad debe conectarse con reglas, personas y condiciones de aceptación.", [["enfoque", "Volver a mi enfoque"], ["purview", "Ver el programa de gobierno"], ["capitulo-3", "Leer sobre acuerdos y autoridad"]])}`;
    },

    ia(ctx) {
      return `${breadcrumb(ctx, "Gobierno de IA")}${heading("Una IA útil también necesita límites y responsables.", "Antes de habilitar un uso, conecto propósito, datos, evaluación y supervisión. La responsabilidad continúa mientras la solución se utiliza y cuando cambia.", "Diseño de referencia · ficha sintética · sin despliegue ni pruebas ejecutadas")}
      <div class="reading-layout">
        ${readingNav([["ia-caso", "El caso de referencia"], ["ia-recorrido", "Decisiones del ciclo de uso"], ["ia-responsables", "Quién puede decidir"], ["ia-intervenir", "Cuándo intervenir"], ["ia-ficha", "Explorar la ficha"]])}
        <div class="reading-main">
          <section class="section" id="ia-caso" aria-labelledby="ia-caso-title">
            <div class="section-head"><h2 id="ia-caso-title">Sugerir una etiqueta para revisión humana</h2></div>
            <p>La ficha propone un clasificador ficticio que recibe esquemas y descripciones sintéticas, y recomienda tipo semántico y sensibilidad. Su finalidad está delimitada: ayudar a revisar una clasificación.</p>
            <div class="evidence"><h3>La condición de uso</h3><p>Una recomendación permanece pendiente hasta que una persona competente la revisa. La etiqueta oficial y los permisos conservan su estado mientras falte esa decisión.</p><p>La demostración no conecta un proveedor de IA ni envía datos reales. La ficha conserva <code>habilitado: false</code> y <code>publicar: false</code>.</p></div>
          </section>
          <section class="section" id="ia-recorrido" aria-labelledby="ia-recorrido-title">
            <div class="section-head"><h2 id="ia-recorrido-title">Siete decisiones que deben tener respuesta</h2></div>
            <ol class="step-list">
              <li><div><h3>Acordar la finalidad</h3><p>Precisar qué ayuda se espera, qué usos quedan fuera y qué personas podrían verse afectadas. Cambiar la finalidad exige revisar el caso.</p></div></li>
              <li><div><h3>Confirmar datos y responsabilidad</h3><p>Identificar origen, significado y condiciones de uso. El dueño de datos confirma ese contexto; el responsable de negocio acepta el propósito y los límites.</p></div></li>
              <li><div><h3>Examinar el riesgo</h3><p>Describir qué puede salir mal, sus consecuencias y la capacidad de detectarlo. En este ejemplo, una etiqueta incorrecta podría trasladarse a un control de acceso si se publicara sin revisión.</p></div></li>
              <li><div><h3>Definir y ejecutar la evaluación</h3><p>Acordar criterios por categoría y criticidad antes de probar. Registrar errores, ambigüedades y aspectos que siguen sin evaluarse.</p></div></li>
              <li><div><h3>Decidir la habilitación</h3><p>Separar construcción, validación y autorización. La autoridad competente decide con evidencia y condiciones explícitas; el constructor no se autoaprueba.</p></div></li>
              <li><div><h3>Supervisar el uso</h3><p>Asignar quién revisa las recomendaciones, atiende hallazgos y registra intervenciones. La supervisión necesita tiempo, competencia y cobertura.</p></div></li>
              <li><div><h3>Intervenir y reevaluar</h3><p>Conservar la capacidad de detener el uso afectado. Corregir y repetir la revisión antes de una nueva decisión cuando cambian datos, finalidad, modelo o comportamiento.</p></div></li>
            </ol>
          </section>
          <section class="section" id="ia-responsables" aria-labelledby="ia-responsables-title">
            <div class="section-head"><h2 id="ia-responsables-title">Una decisión distinta para cada responsabilidad</h2><p>La matriz organiza el trabajo. La autorización técnica de acceso y despliegue debe implementarse y comprobarse por separado.</p></div>
            ${table("Responsabilidades propuestas para el caso de IA", ["Función", "Decisión o responsabilidad", "Evidencia esperada"], [
              ["Dueño de datos", "Confirmar significado y condiciones de uso.", "Contexto, límites y datos autorizados para el propósito."],
              ["Responsable de negocio", "Aceptar finalidad, límites y criterios del caso.", "Propósito y condiciones de aceptación acordados."],
              ["Constructor", "Desarrollar la solución y aportar evidencia.", "Versión identificada, documentación y resultados de pruebas."],
              ["Validador", "Contrastar pruebas con independencia del constructor.", "Revisión de errores, limitaciones y criterios pendientes."],
              ["Autoridad de habilitación", "Autorizar el uso tras la validación y aceptación.", "Decisión registrada con alcance y condiciones; su designación debe confirmarse."],
              ["Supervisor", "Revisar recomendaciones e intervenir cuando corresponda.", "Registro de hallazgos, correcciones y detenciones."]
            ])}
          </section>
          <section class="section" id="ia-intervenir" aria-labelledby="ia-intervenir-title">
            <div class="section-head"><h2 id="ia-intervenir-title">Saber cuándo mantener el uso detenido</h2></div>
            ${table("Condiciones de fallo y respuesta propuesta", ["Señal", "Respuesta"], [
              ["Una categoría no tiene evidencia suficiente", "Mantener ese uso deshabilitado hasta completar una evaluación revisada."],
              ["La salida incumple el contrato o el vocabulario", "Detener el uso afectado, registrar el caso y revisar la causa antes de repetir la prueba."],
              ["Un criterio falla o sigue sin evaluarse", "Conservar el hallazgo abierto y resolverlo antes de autorizar."],
              ["La supervisión no puede intervenir", "Mantener o poner el uso en pausa hasta disponer de cobertura competente y capacidad de detenerlo."]
            ])}
            <p>También revisaría los controles ante cambios de finalidad, personas afectadas, datos, vocabulario, modelo, proveedor o versión, y ante un incidente o patrón de error relevante.</p>
          </section>
          <section class="section" id="ia-ficha" aria-labelledby="ia-ficha-title">
            <div class="section-head"><h2 id="ia-ficha-title">Una ficha que permite discutir el diseño</h2><p>El archivo reúne finalidad, funciones, pruebas requeridas, criterios de fallo y condiciones de reevaluación. Su estado actual es pendiente de revisión, sin pruebas ejecutadas.</p></div>
            ${download("assets/ficha-gobierno-ia.json", "Ficha sintética de gobierno de IA", "Ejemplo original sobre un catálogo ficticio. Sirve para revisar qué decisiones faltan antes de habilitar el uso.")}
            <details class="chapter-planned"><summary>Cómo relaciono este diseño con NIST AI RMF</summary><div><p>Mi lectura conecta GOVERN con responsabilidades y escalamiento; MAP con finalidad, contexto y consecuencias; MEASURE con pruebas y revisión de errores; y MANAGE con tratamiento de hallazgos, intervención y reevaluación.</p><p>Es una propuesta de trabajo; no acredita certificación, cumplimiento ni evaluación ejecutada.</p><a href="https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook" target="_blank" rel="noopener noreferrer">Consultar el AI RMF Playbook de NIST</a></div></details>
          </section>
        </div>
      </div>
      ${related(ctx, "Del gobierno al control concreto", "La clasificación, la calidad y el acceso requieren decisiones relacionadas, con responsabilidades diferenciadas.", [["clasificacion", "Revisar el caso de clasificación"], ["purview", "Explorar reglas de calidad"], ["acceso", "Probar el acceso por contexto"]])}`;
    },

    dama(ctx) {
      const index = chapters.map(chapter => chapter.n === 3
        ? `<li class="chapter-row chapter-available"><div class="chapter-number">${chapter.n}</div><div><h3>${ctx.escape(chapter.title)}</h3><p>${ctx.escape(chapter.question)}</p><p class="case-status">Artículo de muestra · borrador propio</p>${ctx.link("capitulo-3", "Leer el capítulo 3", "text")}</div></li>`
        : `<li class="chapter-row"><div class="chapter-number" aria-hidden="true">${chapter.n}</div><details class="chapter-planned"><summary><span class="sr-only">Capítulo ${chapter.n}: </span><span>${ctx.escape(chapter.title)}</span><span class="chapter-status">En preparación</span></summary><div><h4>${ctx.escape(chapter.question)}</h4><p>${ctx.escape(chapter.plan)}</p><p class="case-status">Plan editorial; el artículo todavía no está escrito.</p></div></details></li>`).join("");
      return `${breadcrumb(ctx, "DAMA, mi lectura aplicada")}${heading("DAMA, capítulo a capítulo. Una lectura desde las decisiones.", "Relaciono los temas de DAMA-DMBOK2 con preguntas del trabajo diario: qué acordar, quién responde y qué evidencia permite avanzar.", "Serie editorial en desarrollo · un artículo de muestra disponible")}
      <section class="section split" aria-labelledby="dama-entrada">
        <div><div class="section-head"><h2 id="dama-entrada">Empezar por un desacuerdo realista</h2></div><p>Dos áreas utilizan la misma palabra y esperan decisiones distintas. El capítulo 3 parte de esa situación para explorar autoridad, definición y seguimiento.</p>${ctx.link("capitulo-3", "Leer acuerdos que hacen posible decidir")}</div>
        <aside class="evidence"><h2>Cómo está construida la serie</h2><p>Cada lectura conectará una pregunta de negocio, una interpretación propia, un ejemplo y una forma de comprobar su utilidad.</p><p>Las preguntas y ejemplos son originales. El índice conserva la numeración del editor; los títulos en español son traducciones editoriales propias.</p></aside>
      </section>
      <section class="section" aria-labelledby="dama-indice">
        <div class="section-head"><h2 id="dama-indice">El recorrido de los 17 capítulos</h2><p>Abre un capítulo en preparación para conocer su pregunta y alcance. El capítulo 3 contiene el artículo de muestra.</p></div>
        <ol class="chapter-list">${index}</ol>
      </section>
      <section class="section" aria-labelledby="dama-fuentes"><div class="section-head"><h2 id="dama-fuentes">Lectura propia, referencia reconocida</h2></div><p>La serie ofrece una interpretación aplicada y no reproduce el contenido del libro. La numeración se basa en el índice público de DAMA-DMBOK2 de Technics Publications.</p><p class="source-links"><a href="https://technicspub.com/wp-content/uploads/2023/07/DAMA-DMBOK2.pdf" target="_blank" rel="noopener noreferrer">Consultar el índice del editor (PDF)</a> · <a href="https://technicspub.com/dmbok/" target="_blank" rel="noopener noreferrer">Ver la publicación</a></p>
      ${download("assets/ficha-lectura-aplicada.json", "Ficha para una lectura aplicada", "Plantilla original para relacionar una idea, una decisión, sus responsables y la evidencia que conviene buscar.")}</section>
      ${related(ctx, "Conectar la lectura con una práctica", "Los marcos sirven cuando ayudan a formular una decisión que el equipo puede ejercer.", [["enfoque", "Conocer mi enfoque"], ["modelos", "Comparar modelos de gobernanza"]])}`;
    },

    "capitulo-3"(ctx) {
      return `${breadcrumb(ctx, "Capítulo 3", { route: "dama", label: "DAMA" })}${heading("Gobierno de datos: acuerdos que hacen posible decidir.", "Cuando dos áreas necesitan cosas distintas, una definición compartida solo funciona si alguien puede acordarla, aplicarla y revisarla.", "Capítulo 3 · interpretación original de Daniel Carhuas · borrador de muestra")}
      <div class="reading-layout">
        ${readingNav([["cap3-pregunta", "La pregunta de negocio"], ["cap3-autoridad", "Una responsabilidad que se pueda ejercer"], ["cap3-ejemplo", "Un ejemplo para discutir"], ["cap3-evidencia", "Cómo evaluaría su utilidad"], ["cap3-pregunta-final", "Llevarlo a tu contexto"]])}
        <article class="reading-main article-body" aria-label="Lectura aplicada del capítulo 3">
          <section class="section" id="cap3-pregunta"><h2>La pregunta de negocio</h2><p>Si dos áreas discrepan sobre la definición de un indicador, ¿quién tiene autoridad para resolverlo? Esa pregunta acerca el gobierno de datos a una necesidad cotidiana: disponer de un criterio compartido para actuar.</p><p>La dificultad puede aparecer aunque ambas áreas hayan calculado correctamente. Cada una quizá usa una población, una fecha de corte o una finalidad diferente. Antes de corregir una consulta, conviene aclarar qué decisión debe sostener el indicador.</p><blockquote><p>Una política crea valor cuando las personas pueden usarla para tomar una decisión y hacerse responsables de ella.</p><footer>La idea que guía esta lectura</footer></blockquote><p>Mi lectura de este capítulo parte de ese vínculo: conectar las responsabilidades con decisiones concretas y con la evidencia necesaria para ejercerlas.</p></section>
          <section class="section" id="cap3-autoridad"><h2>Una responsabilidad que se pueda ejercer</h2><p>Designar un dueño de datos abre la conversación. Para que esa responsabilidad funcione, hace falta delimitar su ámbito: qué significado acepta, sobre qué usos puede decidir, qué puede delegar y cuándo debe escalar.</p><p>También necesita capacidad para intervenir. Un nombre en una matriz resulta insuficiente si esa persona carece de tiempo, información o una vía reconocida para resolver un conflicto entre dominios.</p><p>Un modelo federado puede conectar reglas comunes con decisiones locales cuando existen esas condiciones. Un modelo centralizado o descentralizado puede responder mejor a otras necesidades. La elección debe explicarse desde el riesgo, las capacidades y las dependencias del contexto.</p><p>Lo que buscaría en cualquiera de ellos es un recorrido reconocible: alguien plantea el problema, una autoridad competente decide, un equipo aplica el acuerdo y otra persona puede comprobar qué ocurrió.</p>${ctx.link("modelos", "Comparar la distribución de autoridad", "text")}</section>
          <section class="section" id="cap3-ejemplo"><h2>Un ejemplo para discutir</h2><p class="case-status">Situación hipotética · sin datos ni resultados de una empresa</p><p>Comercial utiliza «cliente activo» para describir una relación vigente. Operaciones utiliza el mismo término para una persona con actividad registrada en el periodo. Las dos cifras son distintas porque responden a preguntas distintas.</p><p>Forzar una única cifra demasiado pronto escondería esa diferencia. Primero aclararía la decisión: ¿se necesita atender una relación vigente o planificar una operación según actividad? A partir de esa respuesta, propondría acordar lo siguiente.</p>
            ${table("Acuerdos para el indicador cliente activo", ["Acuerdo", "Pregunta que debe quedar resuelta"], [
              ["Finalidad y nombre", "¿Para qué decisión se utiliza? ¿Conviene distinguir cliente con relación vigente de cliente con actividad en el periodo?"],
              ["Población y corte", "¿Qué registros entran, qué condiciones los excluyen y a qué fecha corresponde la lectura?"],
              ["Autoridad y ejecución", "¿Quién acepta la definición compartida y quién implementa la regla en cada fuente?"],
              ["Prueba de aplicación", "¿Qué casos revisaremos para comprobar inclusiones, exclusiones y el tratamiento de una ausencia de datos?"],
              ["Excepciones y revisión", "¿Quién acepta una excepción, por qué, con qué alcance y cuándo debe revisarla?"]
            ])}
            <p>El resultado esperado de este ejercicio es un acuerdo que pueda aplicarse y revisarse. Una ficha del indicador conservaría la definición aceptada, la versión, sus responsables y la evidencia de comprobación.</p><p>Si Comercial y Operaciones no pueden resolver la diferencia dentro de su mandato, el escalamiento debe llevar una pregunta concreta a la instancia común. Así esa instancia puede decidir con contexto y registrar el criterio utilizado.</p>
          </section>
          <section class="section" id="cap3-evidencia"><h2>Cómo evaluaría su utilidad</h2><p>Empezaría comprobando si productores y consumidores conocen el propósito del indicador y saben a quién acudir cuando aparece una discrepancia. Después revisaría si la definición aceptada coincide con la regla implementada.</p><p>Buscaría evidencias pequeñas pero suficientes: el acuerdo vigente, una prueba con casos comprensibles, un desacuerdo resuelto por la autoridad adecuada y una excepción que tenga revisión prevista.</p><p>Para hablar de mejora haría falta un punto de partida y un periodo comparable. Esta lectura propone preguntas de evaluación; no presenta una reducción de tiempos ni un impacto de negocio medido.</p><p>También observaría el costo del acuerdo. Si cada ajuste menor necesita una escalada extensa, conviene revisar qué decisiones pueden delegarse y con qué límites. El modelo debe poder sostener el trabajo diario.</p></section>
          <section class="section" id="cap3-pregunta-final"><h2>Llevarlo a tu contexto</h2><div class="evidence"><h3>¿Qué decisión sobre datos sigue hoy sin un responsable con autoridad para resolverla?</h3><p>Elige una. Describe el desacuerdo, quién necesita decidir, qué evidencia falta y qué alcance tendría una resolución aceptable. Esa conversación puede ser el inicio de una mejora concreta.</p></div>
            ${download("assets/ficha-lectura-aplicada.json", "Preparar una lectura aplicada", "Plantilla propia para llevar una pregunta del capítulo a una decisión, un responsable y una comprobación.")}
            <p class="notice">Texto y ejemplo originales. Interpretación aplicada del tema Gobierno de datos de DAMA-DMBOK2; borrador para discusión, sin reproducción del capítulo ni atribución de estas propuestas al libro.</p>
            <p><a href="https://technicspub.com/dmbok/" target="_blank" rel="noopener noreferrer">Referencia editorial: DAMA-DMBOK2, Technics Publications</a></p>
          </section>
        </article>
      </div>
      ${related(ctx, "Continuar la lectura", "El índice muestra las preguntas previstas para los demás capítulos. El caso minero lleva estos acuerdos a otro contexto.", [["dama", "Volver a los 17 capítulos"], ["mineria", "Explorar el caso minero"], ["enfoque", "Conectar con mi enfoque"]])}`;
    },

    perfil(ctx) {
      return `${breadcrumb(ctx, "Perfil")}${heading("Daniel Carhuas. Negocio, datos y responsabilidad.", "Mi enfoque como Data & AI Governance Lead conecta el uso de los datos con las personas que toman decisiones, los acuerdos que las sostienen y los controles que permiten confiar en ellas.")}
      <section class="section split" aria-labelledby="perfil-experiencia">
        <div><div class="section-head"><h2 id="perfil-experiencia">La experiencia que sostiene mi enfoque</h2></div><p>He desempeñado funciones de Data Steward y Data Steward Senior, con más de cuatro años de experiencia en banca, minería y educación. Mi formación en Estadística e Informática conecta el razonamiento sobre los datos con su aplicación en procesos y decisiones.</p><p>Me interesa el punto en el que negocio y equipos especializados necesitan ponerse de acuerdo: qué significa un dato, quién responde por él, qué calidad requiere un uso y cómo comprobar las condiciones acordadas.</p><p>Data &amp; AI Governance Lead expresa el foco profesional de este portafolio. La trayectoria documentada corresponde a los roles de Data Steward y Data Steward Senior.</p></div>
        <dl class="facts"><div><dt>Trayectoria</dt><dd>Más de cuatro años</dd></div><div><dt>Roles desempeñados</dt><dd>Data Steward y Data Steward Senior</dd></div><div><dt>Sectores</dt><dd>Banca, minería y educación</dd></div><div><dt>Formación</dt><dd>Estadística e Informática</dd></div></dl>
      </section>
      <section class="section" aria-labelledby="perfil-contribucion"><div class="section-head"><h2 id="perfil-contribucion">Lo que busco aportar a un equipo</h2><p>Una forma de trabajo que hace comprensibles las decisiones y ayuda a llevarlas a la práctica.</p></div>
        <ol class="step-list">
          <li><div><h3>Traducir una necesidad en un acuerdo</h3><p>Precisar el propósito y conectar a negocio, Data, Seguridad, TI y Calidad alrededor de una decisión con alcance claro.</p></div></li>
          <li><div><h3>Hacer operables las responsabilidades</h3><p>Relacionar el rol con su mandato, su capacidad para intervenir y una ruta de escalamiento comprensible.</p></div></li>
          <li><div><h3>Conectar la política con la evidencia</h3><p>Vincular definiciones, controles y seguimiento para que un acuerdo pueda comprobarse y revisarse.</p></div></li>
          <li><div><h3>Acompañar la adopción</h3><p>Escuchar a quienes producen y consumen los datos, identificar fricciones y ajustar la práctica para que pueda sostenerse.</p></div></li>
        </ol>
      </section>
      <section class="section split" aria-labelledby="perfil-portafolio"><div><div class="section-head"><h2 id="perfil-portafolio">Cómo leer este portafolio</h2></div><p>Los casos permiten explorar mi criterio mediante diseños de referencia, propuestas y demostraciones sintéticas. Cada uno señala su alcance y la evidencia disponible.</p><p>La experiencia profesional se presenta aquí de forma separada. Los ejemplos públicos no revelan información interna ni atribuyen resultados medidos a una organización.</p>${ctx.link("casos", "Explorar los casos")}</div><aside class="evidence"><h2>Una conversación útil</h2><p>El mejor punto de partida es una necesidad concreta: una decisión que se retrasa, un indicador discutido, un dato difícil de usar o una responsabilidad que necesita aclararse.</p>${ctx.link("contacto", "Preparar una conversación", "text")}</aside></section>
      ${related(ctx, "Conocer cómo pienso", "El enfoque explica mis criterios; DAMA abre un espacio para desarrollar y discutir esa lectura.", [["enfoque", "Ver mi enfoque"], ["dama", "Explorar mi lectura aplicada"], ["ia", "Revisar gobierno de IA"]])}`;
    }
  };
})();
