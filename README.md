# Daniel Enrique · Cuaderno de arquitectura

[Abrir portafolio](https://danielenrique368.github.io) · [Laboratorio de políticas](https://danielenrique368.github.io/#laboratorio) · [Arquitectura interactiva](https://danielenrique368.github.io/arquitectura.html)

Portafolio estático con tres casos de referencia: clasificación con recomendación GenAI, acceso RBAC + ABAC y automatización en Databricks. Incluye seis notas conectadas y un evaluador de políticas ejecutable en el navegador.

## Explorar

- Empieza por uno de los tres proyectos de la portada para abrir sus decisiones y artefactos.
- Recursos reúne las notas, el mapa de conexiones, el visor Archify y el laboratorio.
- Archivo de aprendizaje mantiene los cursos y ejercicios separados de los proyectos principales.
- Prueba cambios de rol, departamento, sensibilidad y propósito en el laboratorio.
- Busca notas con el acceso de la barra superior o la tecla `/`.
- Descarga notas Markdown desde cada nota. Los archivos de `notas/` usan wikilinks compatibles con Obsidian; copia esa carpeta completa al vault para resolver todos los enlaces.
- Abre `arquitectura.html` para usar el visor Archify (contenido español, controles fijos en inglés).

## Alcance

Los ejemplos son sintéticos. GenAI se presenta como diseño y contrato de datos; no se invoca ningún modelo. El laboratorio ejecuta una regla determinista local. No autentica personas ni protege datos de un servidor. El fragmento de Databricks es una referencia y no despliega recursos.

## Archivos

| Archivo | Propósito |
|---|---|
| `index.html`, `styles.css`, `app.js` | Interfaz, navegación por hash y búsqueda |
| `cases.js` | Casos y notas; fuente del contenido visible |
| `policy.js` | Política de demostración, exportada para navegador y Node |
| `notas/*.md` | Notas descargables para Obsidian |
| `arquitectura.dataflow.json` | Fuente editable Archify |
| `arquitectura.html` | Visor autónomo generado por Archify |
| `arquitectura.delivery.json` | Recibo de validación y hashes del diagrama |

## Mantener y publicar

Sin dependencias de compilación: abrir `index.html` o servir la carpeta por HTTP. GitHub Pages publica `main` desde `/ (root)`. Actualiza los casos en `cases.js` y conserva las notas Markdown sincronizadas. No publiques credenciales, datos de clientes ni archivos privados.

La web no conecta bases de datos, APIs de pago ni cómputo de Databricks. La fuente de la interfaz se carga desde Google Fonts y tiene una alternativa local del sistema.

## Comprobaciones

- Recorridos de escritorio y móvil: casos, pestañas, búsqueda, descargas y menú.
- Evaluador: permitir, enmascarar, denegar y entradas inválidas.
- Archify: 9/9 controles showcase; comprobación de pantalla sin desbordamiento en cuatro resoluciones. Consulta el recibo para el alcance exacto de revisión.
