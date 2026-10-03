(() => {
  'use strict';
  const main = document.querySelector('#main');
  const footer = document.querySelector('#footer');
  const state = { intent: 'valor', connection: 'mineria' };
  let currentRoute = '';
  let toastTimer;
  const paths = {
    arrow:'M4 12h15m-6-6 6 6-6 6', external:'M14 4h6v6M20 4l-9 9M10 5H5a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-5',
    chevron:'m9 5 7 7-7 7', back:'M20 12H5m6-6-6 6 6 6', check:'m5 12 4 4L19 6',
    file:'M6 3h8l4 4v14H6V3Zm8 0v5h4M9 12h6M9 16h6', book:'M12 6c-3-3-7-3-10-2v15c4-1 7 0 10 2 3-2 6-3 10-2V4c-3-1-7-1-10 2Zm0 0v15',
    search:'M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 6 6', download:'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
    network:'M6 6h.01M18 7h.01M12 19h.01M8 6.2l8 .6M7 8l4 9m6-8-4 8', spark:'m12 3 2 7 7 2-7 2-2 7-2-7-7-2 7-2 2-7Z',
    copy:'M8 8h12v13H8V8ZM4 16H3V3h12v1', close:'m6 6 12 12M6 18 18 6', mail:'M3 5h18v14H3V5Zm0 1 9 7 9-7',
    plus:'M12 5v14M5 12h14', dot:'M12 12h.01', person:'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a8 8 0 0 1 16 0v2', shield:'M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Zm-4 9 3 3 5-6'
  };
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon = name => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name] || paths.arrow}"/></svg>`;
  const link = (route,label,kind='button') => `<a class="${kind === 'text' || kind === 'text-link' ? 'text-link' : kind === 'secondary' ? 'button button-secondary' : 'button'}" href="#/${escape(route)}">${escape(label)}${icon('arrow')}</a>`;
  const ctx = {state,escape,icon,link};
  const crumb = name => `<nav class="breadcrumb" aria-label="Ruta"><a href="#/inicio">Inicio</a><span aria-hidden="true">/</span><span>${escape(name)}</span></nav>`;
  const contact = {email:'dcarhuasc@gmail.com',linkedin:'https://www.linkedin.com/in/danirique',github:'https://github.com/DanielEnrique368'};
  const resourceItems = [
    {type:'Caso',title:'Gobierno E2E en minería',desc:'Cinco fases, marcos complementarios y entregables de gobierno.',route:'mineria'},
    {type:'Programa',title:'Gobierno con Purview',desc:'Calidad, ownership, productos, alertas, reportes y contexto del lake.',route:'purview'},
    {type:'Descarga',title:'Contrato de reglas de calidad',desc:'Lote sintético: revisión, prueba y publicación controlada.',file:'lote-calidad-ejemplo.json'},
    {type:'Descarga',title:'Ficha de gobierno de IA',desc:'Propósito, responsabilidades, evaluación e intervención.',file:'ficha-gobierno-ia.json'},
    {type:'Descarga',title:'Ficha de mejora de gobierno',desc:'Convertir una brecha de capacidad en una acción con evidencia.',file:'ficha-mejora-gobierno.json'},
    {type:'Descarga',title:'Plantilla de lectura aplicada',desc:'Del capítulo de DAMA a una pregunta de negocio.',file:'ficha-lectura-aplicada.json'},
    {type:'Demostración',title:'Decisión de acceso',desc:'Probar cómo cambian las condiciones según rol, finalidad y sensibilidad.',route:'acceso'},
    {type:'Diagrama',title:'Gobierno de una automatización',desc:'Flujo Archify de aceptación, cambio, pruebas, autorización y operación.',route:'databricks'},
    {type:'Lectura',title:'DAMA: gobierno de datos',desc:'Borrador original del capítulo 3, desde acuerdos y responsabilidades.',route:'capitulo-3'}
  ];
  const connectionItems = [
    {id:'mineria',name:'Minería E2E',need:'Decidir con un indicador compartido',question:'¿Qué desviación de costo merece atención?',criteria:['Definición y corte','Responsabilidad','Criterio de aceptación'],evidence:'Metodología integrada y entregables por etapa',framework:'DAMA, DCAM y PREC'},
    {id:'purview',name:'Programa Purview',need:'Convertir una señal de calidad en una acción',question:'¿Quién actúa cuando un dato crítico falla?',criteria:['Uso y criticidad','Regla revisada','Asignación y cierre'],evidence:'Contrato de calidad y señales propuestas',framework:'Calidad, metadatos y modelo operativo'},
    {id:'clasificacion',name:'Clasificación con IA',need:'Clasificar sin perder el contexto',question:'¿Qué puede recomendar la IA y qué debe decidir una persona?',criteria:['Propósito','Contexto del dato','Revisión documentada'],evidence:'Ejemplo de recomendación y revisión',framework:'Gobierno de datos y supervisión de IA'},
    {id:'acceso',name:'Acceso responsable',need:'Permitir el uso adecuado del dato',question:'¿Qué condiciones cambian al cambiar el propósito?',criteria:['Rol y atributos','Finalidad','Obligaciones de uso'],evidence:'Simulador local de una política didáctica',framework:'Seguridad, privacidad y responsabilidad'},
    {id:'databricks',name:'Automatización',need:'Evolucionar sin perder trazabilidad',question:'¿Qué evidencia permite autorizar un cambio?',criteria:['Versión identificable','Pruebas y aceptación','Continuidad'],evidence:'Recorrido Archify y configuración de referencia',framework:'Gobierno del cambio y operación'}
  ];
  function resources(){
    return `${crumb('Recursos')}<header class="page-head"><h1>Material para llevar a la práctica.</h1><p class="lead">Una selección de casos, demostraciones y fichas. Cada recurso tiene un propósito y un lugar dentro del recorrido.</p></header><section class="resource-tools" aria-label="Buscar recursos"><label for="resource-search">¿Qué quieres explorar?</label><div class="search-field">${icon('search')}<input id="resource-search" type="search" placeholder="Prueba con calidad, IA o DAMA" autocomplete="off"><button type="button" data-clear-search>Limpiar</button></div><p id="search-count" role="status">${resourceItems.length} recursos disponibles</p></section><div class="resource-list">${resourceItems.map(item=>`<article class="resource-item" data-resource data-search="${escape(`${item.type} ${item.title} ${item.desc}`)}"><span class="resource-kind">${item.type}</span><div><h2>${item.title}</h2><p>${item.desc}</p></div>${item.file?`<a class="text-link" href="assets/${item.file}" download>Descargar JSON${icon('download')}</a>`:link(item.route,'Explorar','text')}</article>`).join('')}</div><section id="search-empty" class="empty" hidden><h2>No hay coincidencias.</h2><p>Prueba otra palabra o vuelve a ver toda la selección.</p><button class="button" type="button" data-clear-search>Ver todos los recursos</button></section><section class="related"><div><h2>¿Cómo se conectan?</h2><p>Del problema de negocio al caso, el criterio y la evidencia.</p></div>${link('mapa','Explorar conexiones')}</section>`;
  }
  function connections(){
    const selected=connectionItems.find(item=>item.id===state.connection)||connectionItems[0];
    return `${crumb('Conexiones')}<header class="page-head"><h1>Un problema. Un recorrido con sentido.</h1><p class="lead">Las conexiones explican cómo se relacionan el negocio, los criterios de gobierno y los materiales que puedes revisar.</p></header><div class="connection-map"><div class="connection-selector" role="group" aria-label="Selecciona un recorrido">${connectionItems.map(item=>`<button type="button" data-connection="${item.id}" aria-pressed="${item.id===selected.id}">${item.name}</button>`).join('')}</div><div class="connection-route"><section class="connection-need"><span>La necesidad</span><h2>${selected.need}</h2><p>${selected.question}</p></section><div class="connection-bridge" aria-hidden="true">${icon('arrow')}</div><section class="connection-criteria"><h2>Lo que hay que acordar</h2><ol>${selected.criteria.map(item=>`<li>${icon('check')}<span>${item}</span></li>`).join('')}</ol></section><div class="connection-bridge" aria-hidden="true">${icon('arrow')}</div><section class="connection-proof"><span>La evidencia disponible</span><h2>${selected.evidence}</h2>${link(selected.id,'Entrar en el caso')}</section></div><div class="connection-caption"><p><strong>El criterio que lo sostiene:</strong> ${selected.framework}.</p>${link('enfoque','Entender mi enfoque','text')}</div></div><p class="notice">Este mapa conecta lecturas y casos de referencia. No representa una única plataforma empresarial desplegada.</p><section class="related"><div><h2>Profundizar sin perder el contexto.</h2><p>Los marcos ayudan a formular mejores preguntas; el caso muestra cómo abordarlas.</p></div>${link('dama','Ir a las lecturas de DAMA','text')}${link('casos','Ver los casos','text')}</section>`;
  }
  function contactPage(){
    return `${crumb('Contacto')}<section class="contact-layout"><div><h1>Empecemos por lo que necesita tu negocio.</h1><p class="lead">Una decisión difícil, un programa de gobierno o una iniciativa de IA que necesita criterio. Una buena conversación puede empezar ahí.</p><div class="contact-signature"><strong>Daniel Carhuas</strong><span>Data &amp; AI Governance Lead</span></div><div class="contact-channels"><a href="mailto:${contact.email}">${icon('mail')}<span><small>Correo personal</small><strong>${contact.email}</strong></span>${icon('arrow')}</a><a href="${contact.linkedin}" target="_blank" rel="noopener noreferrer">${icon('person')}<span><small>LinkedIn</small><strong>Conectar con Daniel</strong></span>${icon('external')}</a><a href="${contact.github}" target="_blank" rel="noopener noreferrer">${icon('file')}<span><small>GitHub personal</small><strong>Explorar proyectos y recursos</strong></span>${icon('external')}</a></div></div><section class="conversation-builder"><h2>Prepara el punto de partida.</h2><p>Organiza tu idea en dos líneas. Nada se envía desde esta página.</p><form id="conversation-form"><label for="conversation-topic">Quiero conversar sobre</label><select id="conversation-topic" name="topic"><option>Un programa de gobierno de datos</option><option>Calidad, ownership y productos</option><option>Gobierno del uso de IA</option><option>Una oportunidad profesional</option></select><label for="conversation-need">La decisión o el reto</label><textarea id="conversation-need" name="need" rows="4" maxlength="600" placeholder="Qué necesitas poder decidir o hacer, y qué lo dificulta hoy."></textarea><button class="button" type="submit">Preparar mi mensaje${icon('arrow')}</button></form><div id="conversation-result" class="message-draft" hidden><h3>Tu borrador</h3><pre id="draft-text"></pre><div class="draft-actions"><a id="draft-mail" class="button">Abrir en mi correo${icon('mail')}</a><button class="button button-secondary" type="button" data-copy-draft>Copiar texto${icon('copy')}</button></div><p>Revisa el mensaje en tu aplicación de correo antes de enviarlo.</p></div></section></section>`;
  }
  const notFound=()=>`${crumb('Página no encontrada')}<section class="empty"><h1>Este recorrido todavía no existe.</h1><p>Vuelve a los casos o explora las lecturas disponibles.</p>${link('casos','Explorar casos')}${link('inicio','Volver al inicio','text')}</section>`;
  function renderFooter(){
    footer.innerHTML=`${currentRoute==='contacto'?'':`<div class="footer-invitation"><div><h2>El siguiente paso puede ser una conversación.</h2><p>Sobre lo que importa al negocio y lo que hace falta para avanzar.</p></div>${link('contacto','Conversemos')}</div>`}<div class="footer-bottom"><div><strong>Daniel Carhuas</strong><p>Datos, IA y responsabilidad.</p></div><nav aria-label="Recursos y contacto"><a href="#/recursos">Recursos</a><a href="#/mapa">Conexiones</a><a href="${contact.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="${contact.github}" target="_blank" rel="noopener noreferrer">GitHub</a></nav><p class="footer-scope">Casos de referencia y ejemplos sintéticos.<br>Sin información corporativa confidencial.</p></div>`;
  }
  function routeName(){try{return decodeURIComponent(location.hash.replace(/^#\/?/,'').split('?')[0]||'inicio');}catch{return 'no-encontrado';}}
  function render({reset=true,focus=false}={}){
    currentRoute=routeName();
    main.classList.toggle('container',currentRoute!=='inicio');
    const pages={inicio:window.HOME_PAGE,...window.CASE_PAGES,...window.INSIGHT_PAGES,recursos:resources,mapa:connections,contacto:contactPage};
    const view=pages[currentRoute]||notFound;
    try {main.innerHTML=view(ctx);} catch(error) {console.error(error);main.innerHTML=`<section class="empty"><h1>No se pudo mostrar esta página.</h1><p>Vuelve al inicio para continuar.</p>${link('inicio','Volver al inicio')}</section>`;}
    document.body.dataset.route=currentRoute;
    const group=['mineria','purview','clasificacion','acceso','databricks'].includes(currentRoute)?'casos':['modelos','ia','mapa'].includes(currentRoute)?'enfoque':currentRoute==='capitulo-3'?'dama':currentRoute;
    document.querySelectorAll('[data-nav]').forEach(a=>{if(a.dataset.nav===group)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    document.title=`${main.querySelector('h1')?.innerText.replace(/\s+/g,' ').trim() || 'Inicio'} | Daniel Carhuas`;
    renderFooter(); bindView(); closeMenu();
    if(reset)window.scrollTo({top:0,behavior:'instant'});
    if(focus)main.focus({preventScroll:true});
  }
  function closeMenu(){document.querySelector('.nav-toggle').setAttribute('aria-expanded','false');document.querySelector('.nav').classList.remove('is-open');}
  function showToast(message){const toast=document.querySelector('#toast');toast.textContent=message;toast.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{toast.hidden=true;},3000);}
  function selectTab(button){
    const wrapper=button.closest('[data-tabs]');if(!wrapper)return;
    const id=button.dataset.panelTab;
    wrapper.querySelectorAll('[data-panel-tab]').forEach(tab=>{const active=tab===button;tab.setAttribute('aria-selected',String(active));tab.setAttribute('tabindex',active?'0':'-1');tab.classList.toggle('is-active',active);});
    wrapper.querySelectorAll('[data-panel]').forEach(panel=>{panel.hidden=panel.dataset.panel!==id;});
  }
  function bindView(){
    main.querySelectorAll('.table-wrap').forEach(table=>{table.tabIndex=0;table.setAttribute('role','region');table.setAttribute('aria-label',table.querySelector('caption')?.textContent||'Tabla comparativa; desliza para ver todas las columnas');});
    main.querySelectorAll('[data-tabs]').forEach((wrapper,index)=>{
      const buttons=[...wrapper.querySelectorAll('[data-panel-tab]')];
      buttons.forEach((button,i)=>{const id=button.dataset.panelTab;button.id ||= `tab-${index}-${i}`;button.setAttribute('role','tab');button.setAttribute('aria-controls',`panel-${index}-${i}`);const panel=[...wrapper.querySelectorAll('[data-panel]')].find(p=>p.dataset.panel===id);if(panel){panel.id=`panel-${index}-${i}`;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',button.id);}if(button.parentElement)button.parentElement.setAttribute('role','tablist');});
      if(buttons.length)selectTab(buttons.find(b=>b.getAttribute('aria-selected')==='true')||buttons[0]);
    });
    main.querySelector('#signal-select')?.addEventListener('change',e=>showSignal(e.target.value));
    main.querySelector('#resource-search')?.addEventListener('input',filterResources);
    main.querySelector('#access-demo')?.addEventListener('submit',evaluateAccess);
    main.querySelector('#conversation-form')?.addEventListener('submit',prepareConversation);
  }
  function showSignal(id){
    const signal=window.PURVIEW_SIGNALS?.find(s=>s.id===id);const panel=main.querySelector('#signal-detail');if(!signal||!panel)return;
    panel.innerHTML=`<h3>${escape(signal.question)}</h3><dl class="facts"><div><dt>Qué observar</dt><dd>${escape(signal.metric)}</dd></div><div><dt>Definición propuesta</dt><dd>${escape(signal.formula)}</dd></div><div><dt>Qué decisión provoca</dt><dd>${escape(signal.action)}</dd></div></dl><p class="notice">${escape(signal.caution)}</p>`;
  }
  function filterResources(){
    const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    const query=normalize(main.querySelector('#resource-search').value.trim());let count=0;
    main.querySelectorAll('[data-resource]').forEach(item=>{item.hidden=!normalize(item.dataset.search).includes(query);if(!item.hidden)count++;});
    main.querySelector('#search-count').textContent=`${count} ${count===1?'recurso encontrado':'recursos encontrados'}`;
    main.querySelector('#search-empty').hidden=count!==0;
  }
  function evaluateAccess(event){
    event.preventDefault();const values=new FormData(event.currentTarget);const role=values.get('role');const purpose=values.get('purpose');const sensitivity=values.get('sensitivity');const approved=values.get('approved')==='on';
    let title='No autorizar en este contexto';let text='La finalidad o el rol no justifican este uso en la política didáctica.';let conditions=['Revisar el propósito con el responsable del dato.'];let result='deny';
    if(role==='analista'&&purpose==='analitica'&&sensitivity==='interno'){title='Uso permitido por esta regla';text='El rol y la finalidad coinciden con el uso interno definido en el ejemplo.';conditions=['Conservar el propósito autorizado.','Registrar el uso y revisar cambios de alcance.'];result='allow';}
    if(role==='auditor'&&purpose==='auditoria'&&sensitivity!=='restringido'){title=sensitivity==='personal'?'Uso con condiciones':'Uso permitido por esta regla';text='La revisión de auditoría puede avanzar dentro del alcance acordado.';conditions=sensitivity==='personal'?['Ocultar identificadores personales.','Registrar acceso y evidencia de la revisión.']:['Limitar el acceso a la revisión.','Registrar la evidencia.'];result=sensitivity==='personal'?'conditional':'allow';}
    if(sensitivity==='restringido'){title=approved&&role==='auditor'&&purpose==='auditoria'?'Uso condicionado a aprobación verificada':'No autorizar sin una aprobación válida';text=approved&&role==='auditor'&&purpose==='auditoria'?'La casilla representa una aprobación para simular el ejemplo; un sistema real tendría que verificarla.':'La sensibilidad exige una decisión adicional del responsable autorizado.';conditions=['Verificar alcance, vigencia y autoridad de la aprobación.','Aplicar mínimo privilegio y registrar el uso.'];result=approved&&role==='auditor'&&purpose==='auditoria'?'conditional':'deny';}
    const output=main.querySelector('#access-result');output.className=`decision-result result-${result}`;output.innerHTML=`<h3>${title}</h3><p>${text}</p><ul>${conditions.map(c=>`<li>${escape(c)}</li>`).join('')}</ul><p class="demo-boundary">Simulación local: no autentica usuarios ni concede permisos reales.</p>`;output.setAttribute('tabindex','-1');output.focus({preventScroll:true});
  }
  function prepareConversation(event){
    event.preventDefault();const values=new FormData(event.currentTarget);const topic=String(values.get('topic'));const need=String(values.get('need')||'').trim();
    const body=`Hola Daniel,\n\nMe gustaría conversar sobre ${topic.toLowerCase()}.\n\n${need||'Quisiera contrastar el reto y los siguientes pasos contigo.'}\n\n¿Podemos coordinar una conversación?`;
    main.querySelector('#draft-text').textContent=body;
    main.querySelector('#draft-mail').href=`mailto:${contact.email}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(body)}`;
    main.querySelector('#conversation-result').hidden=false;
    main.querySelector('#conversation-result').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest'});
  }
  main.addEventListener('click',async event=>{
    const intent=event.target.closest('[data-intent]');if(intent){state.intent=intent.dataset.intent;const y=window.scrollY;render({reset:false});main.querySelector(`[data-intent="${state.intent}"]`)?.focus({preventScroll:true});window.scrollTo({top:y,behavior:'instant'});document.querySelector('#interaction-status').textContent=main.querySelector('.briefing h2')?.textContent||'Recorrido actualizado';return;}
    const connection=event.target.closest('[data-connection]');if(connection){state.connection=connection.dataset.connection;render({reset:false});main.querySelector(`[data-connection="${state.connection}"]`)?.focus({preventScroll:true});document.querySelector('#interaction-status').textContent=main.querySelector('.connection-need h2')?.textContent||'Conexiones actualizadas';return;}
    const tab=event.target.closest('[data-panel-tab]');if(tab){selectTab(tab);return;}
    const scroll=event.target.closest('[data-scroll]');if(scroll){event.preventDefault();document.getElementById(scroll.dataset.scroll)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});return;}
    const enlarge=event.target.closest('[data-enlarge]');if(enlarge){const viewer=document.querySelector('#image-viewer');document.querySelector('#viewer-image').src=enlarge.dataset.enlarge||'assets/metodologia-gobierno-integrada.png';viewer.showModal();return;}
    if(event.target.closest('[data-clear-search]')){const input=main.querySelector('#resource-search');input.value='';filterResources();input.focus();return;}
    if(event.target.closest('[data-copy-draft]')){try{await navigator.clipboard.writeText(main.querySelector('#draft-text').textContent);showToast('Texto copiado. Puedes pegarlo donde prefieras.');}catch{showToast('Selecciona el borrador y cópialo con el teclado.');}}
  });
  main.addEventListener('keydown',event=>{
    const current=event.target.closest('[data-panel-tab]');if(!current||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    const buttons=[...current.closest('[data-tabs]').querySelectorAll('[data-panel-tab]')];const i=buttons.indexOf(current);const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(i+(event.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;event.preventDefault();buttons[next].focus();selectTab(buttons[next]);
  });
  document.querySelector('.nav-toggle').addEventListener('click',event=>{const open=event.currentTarget.getAttribute('aria-expanded')!=='true';event.currentTarget.setAttribute('aria-expanded',String(open));document.querySelector('.nav').classList.toggle('is-open',open);});
  document.querySelector('.skip-link').addEventListener('click',event=>{event.preventDefault();main.focus();main.scrollIntoView({block:'start'});});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
  document.querySelector('[data-close-viewer]').addEventListener('click',()=>document.querySelector('#image-viewer').close());
  document.querySelector('#image-viewer').addEventListener('click',event=>{if(event.target===event.currentTarget)event.currentTarget.close();});
  window.addEventListener('hashchange',()=>render({focus:true}));
  render();
})();
