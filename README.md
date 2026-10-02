# Daniel Carhuas · Gobierno de datos e IA

[Abrir portafolio](https://danielenrique368.github.io) · [Laboratorio de políticas](https://danielenrique368.github.io/#laboratorio) · [Arquitectura interactiva](https://danielenrique368.github.io/arquitectura.html)

Portafolio profesional de un especialista en gobierno y gestión de datos, con proyección a Governance Lead / CDO. El posicionamiento prioriza estrategia, responsabilidades, adopción y control; no presenta al autor como arquitecto de datos ni como CDO en ejercicio.

La síntesis de trayectoria está basada en el CV facilitado por el autor. No se publica ese documento ni sus datos de contacto. Los casos públicos siguen siendo referencias didácticas, separados de la experiencia profesional.

Sitio estático con cuatro casos de referencia: clasificación con recomendación GenAI, calidad en Purview, acceso RBAC + ABAC y automatización en Databricks. Incluye nueve notas conectadas, marcos de gobernanza aplicados, dos contratos JSON descargables y un evaluador de políticas ejecutable en el navegador.

## Explorar

- La portada permite probar tres contextos de una decisión de acceso: analítica, auditoría y otro uso. Utiliza el mismo evaluador que el laboratorio.
- Casos de negocio lleva a cuatro ejemplos con intención, responsabilidades, medición propuesta y evidencia pública. Los beneficios esperados no se presentan como resultados conseguidos.
- [Marcos aplicados](https://danielenrique368.github.io/#marcos) conecta fuentes, decisiones, evidencia y revisión. Incluye una plantilla editorial propia; la serie por capítulos de DAMA-DMBOK queda pendiente del ejemplar y de experiencias validadas con el autor.
- [Programa Purview](https://danielenrique368.github.io/#purview) organiza calidad, ownership, productos, alertas, reportes y metadatos de negocio. Permite explorar cuatro indicadores propuestos, sin datos conectados ni resultados atribuidos a una implementación.
- Mi enfoque separa la trayectoria profesional y la proyección Governance Lead / CDO de los ejemplos ilustrativos.
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
| `governance.js` | Método de lectura aplicada y propuesta de gobierno con Purview |
| `policy.js` | Política de demostración, exportada para navegador y Node |
| `recursos/*.json` | Contratos sintéticos de calidad y gobierno de IA; plantilla de lectura aplicada sin completar |
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
- Marcos y Purview: enlaces, plantilla, seis ámbitos y cuatro definiciones de indicadores; sin desbordamiento horizontal en anchos de 320 a 1920 px.
- Portada: decisiones accesibles por teclado, cinco anchos adicionales de 320 a 1920 px y movimiento reducido.
- Evaluador: permitir, enmascarar, denegar y entradas inválidas.
- Archify: 9/9 controles showcase; comprobación de pantalla sin desbordamiento en cuatro resoluciones. Consulta el recibo para el alcance exacto de revisión.
