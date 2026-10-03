# Daniel Carhuas · Data & AI Governance Lead

[Abrir portafolio](https://danielenrique368.github.io) · [Laboratorio de políticas](https://danielenrique368.github.io/#laboratorio) · [Arquitectura interactiva](https://danielenrique368.github.io/arquitectura.html)

Portafolio de Daniel Carhuas con posicionamiento Data & AI Governance Lead: estrategia, modelo operativo, responsabilidad, adopción y ejecución. La trayectoria mantiene los cargos realmente desempeñados; el sitio no lo presenta como arquitecto de datos ni como CDO en ejercicio.

La síntesis de trayectoria está basada en el CV facilitado por el autor. No se publica ese documento ni sus datos de contacto. Los casos públicos siguen siendo referencias didácticas, separados de la experiencia profesional.

Sitio estático con cuatro casos de referencia: clasificación con recomendación GenAI, calidad en Purview, acceso RBAC + ABAC y automatización en Databricks. Incluye nueve notas conectadas, marcos de gobernanza aplicados, dos contratos JSON descargables y un evaluador de políticas ejecutable en el navegador.

## Explorar

- Inicio presenta la propuesta de Data & AI Governance Lead y los accesos a proyectos, enfoque y marcos. No contiene casos ni demostraciones de permisos.
- Proyectos abre una vista independiente (`#proyectos`) con cuatro ejemplos: no desplaza la portada hacia abajo. Cada proyecto conserva intención, responsabilidades, medición propuesta y evidencia pública; los beneficios esperados no son resultados conseguidos.
- [Marcos aplicados](https://danielenrique368.github.io/#marcos) conecta DAMA-DMBOK y DCAM mediante prácticas, capacidades y decisiones de mejora. Incluye tres conexiones propias (ownership, calidad y metadatos), referencias oficiales y fichas propias descargables. No es un mapeo ni una evaluación oficial; no mezcla la experiencia en DCAM 2.2 con la documentación pública v3. La serie DAMA-DMBOK por capítulos sigue pendiente del ejemplar.
- [Programa Purview](https://danielenrique368.github.io/#purview) organiza calidad, ownership, productos, alertas, reportes y metadatos de negocio. Permite explorar cuatro indicadores propuestos, sin datos conectados ni resultados atribuidos a una implementación.
- Mi enfoque desarrolla cinco ámbitos de experiencia: modelo federado, contexto y calidad, privacidad, gobierno de IA y continuidad operativa. Cada uno conecta trabajo realizado, decisión de negocio y evidencia esperada, sin exponer entregables internos.
- Recursos reúne las notas, el mapa de conexiones, el visor Archify y el laboratorio.
- Archivo de aprendizaje, en el pie de página, mantiene los cursos y ejercicios separados de los casos principales.
- Prueba cambios de rol, departamento, sensibilidad y propósito en el laboratorio.
- Busca notas con el acceso de la barra superior o la tecla `/`.
- Descarga notas Markdown desde cada nota. Los archivos de `notas/` usan wikilinks compatibles con Obsidian; copia esa carpeta completa al vault para resolver todos los enlaces.
- Abre `arquitectura.html` para usar el visor Archify (contenido español, controles fijos en inglés).

## Alcance

Los ejemplos son sintéticos. GenAI se presenta como diseño y contrato de datos; no se invoca ningún modelo. El laboratorio ejecuta una regla determinista local. No autentica personas ni protege datos de un servidor. El fragmento de Databricks es una referencia y no despliega recursos. El lote Purview es un contrato didáctico propio, no un payload oficial ni un generador IA conectado. La API de reglas DQ documentada es preview; no se confunde con Atlas entity/bulk para metadatos y linaje. DAMA-DMBOK y NIST AI RMF se presentan como referencias de diseño, no certificaciones ni cumplimiento acreditado. No se publican el PDF aportado ni las fuentes internas de Obsidian.

## Archivos

| Archivo | Propósito |
|---|---|
| `index.html`, `styles.css`, `executive.css`, `app.js` | Interfaz, sistema visual ejecutivo, navegación por hash y búsqueda |
| `cases.js` | Casos y notas; fuente del contenido visible |
| `governance.js`, `profile.js` | Método de lectura aplicada, propuesta Purview y ámbitos de experiencia profesional |
| `policy.js` | Política de demostración, exportada para navegador y Node |
| `recursos/*.json` | Contratos sintéticos de calidad y gobierno de IA; fichas propias de lectura y mejora, sin completar |
| `notas/*.md` | Notas descargables para Obsidian |
| `arquitectura.dataflow.json` | Fuente editable Archify |
| `arquitectura.html` | Visor autónomo generado por Archify |
| `arquitectura.delivery.json` | Recibo de validación y hashes del diagrama |

## Mantener y publicar

Sin dependencias de compilación: abrir `index.html` o servir la carpeta por HTTP. GitHub Pages publica `main` desde `/ (root)`. Actualiza los casos en `cases.js` y conserva las notas Markdown sincronizadas. No publiques credenciales, datos de clientes ni archivos privados.

El contenido de marcos y las señales propuestas para Purview se mantienen en `governance.js`. Antes de publicar una lectura aplicada, verificar la edición y el capítulo, separar la síntesis propia de la experiencia demostrable y revisar confidencialidad. No redistribuir el libro ni capturas de sus páginas. Los ejemplos de metadatos son sintéticos: enriquecer el catálogo aporta contexto, pero no acredita por sí solo la calidad del dato.

La web no conecta bases de datos, APIs de pago ni cómputo de Databricks. La fuente de la interfaz se carga desde Google Fonts y tiene una alternativa local del sistema.

## Comprobaciones

- Recorridos de escritorio y móvil: casos, pestañas, búsqueda, descargas y menú.
- Marcos y Purview: referencias DAMA/DCAM, tres conexiones aplicadas, fichas descargables, seis ámbitos y cuatro definiciones de indicadores; sin desbordamiento horizontal en anchos de 320 a 1920 px.
- Navegación: CTA por teclado, vistas separadas, historial atrás/adelante, acceso directo y recarga; anchos de 320 a 1920 px y movimiento reducido.
- Evaluador: permitir, enmascarar, denegar y entradas inválidas.
- Archify: 9/9 controles showcase; comprobación de pantalla sin desbordamiento en cuatro resoluciones. Consulta el recibo para el alcance exacto de revisión.
