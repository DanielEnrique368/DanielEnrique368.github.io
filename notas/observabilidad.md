---
title: "Un job terminado no basta para dar los datos por buenos"
tipo: "Operación de datos"
estado: referencia
---

# Un job terminado no basta para dar los datos por buenos

Estado técnico, calidad del resultado y contexto de ejecución responden preguntas diferentes.

La evidencia propuesta relaciona versión del código, parámetros no sensibles, identificador de ejecución, partición procesada y resultado de controles de datos. Así se puede comparar una ejecución correcta con una fallida.

La estrategia de recuperación debe decidir qué se puede repetir, qué necesita compensación y cómo detectar una salida ya confirmada. El reintento automático solo es útil si la escritura tolera esa repetición.

## Decisión

Definir controles de datos y criterios de reintento junto con el job. Enlazar la ejecución con la revisión desplegada.

## Compromiso

Los controles añaden tiempo de ejecución y mantenimiento. Deben responder a fallos concretos del proceso, con umbrales que se validen sobre datos reales.

## Conexiones

- [[despliegue|Promover una versión conocida entre entornos]]
- [[decision-explicable|Guardar el porqué junto a la decisión]]

## Proyectos relacionados

- [Evolución de automatización en Databricks](https://danielenrique368.github.io/#caso/databricks)

## Referencia

[Databricks · prácticas de CI/CD](https://docs.databricks.com/aws/en/dev-tools/ci-cd)

Las decisiones descritas son propuestas de este cuaderno. Los ejemplos son sintéticos.

