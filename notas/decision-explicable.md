---
title: "Guardar el porqué junto a la decisión"
tipo: "Decisión de trazabilidad"
estado: referencia
---

# Guardar el porqué junto a la decisión

Una denegación comprensible facilita soporte; una evidencia versionada permite reconstruirla.

El simulador muestra cada condición y su resultado. Para una implementación se propone un registro con identificador de solicitud, recurso, operación, versión de política, decisión y obligaciones aplicadas.

La explicación al usuario y el registro de auditoría tienen públicos distintos. Se puede comunicar la condición que falta sin revelar atributos sensibles o detalles internos que no sean necesarios.

## Decisión

Conservar una evidencia mínima y correlacionable. No copiar filas de negocio, tokens ni credenciales al registro de autorización.

## Compromiso

Más detalle ayuda a investigar, pero aumenta exposición y almacenamiento. El contenido, acceso y retención del registro requieren una política propia.

## Conexiones

- [[minimo-privilegio|Permitir una operación no implica mostrar todas sus columnas]]
- [[observabilidad|Un job terminado no basta para dar los datos por buenos]]
- [[revision-humana|Una propuesta de clasificación no es una aprobación]]

## Proyectos relacionados

- [Clasificación asistida por GenAI](https://danielenrique368.github.io/#caso/clasificacion)
- [RBAC + ABAC explicable](https://danielenrique368.github.io/#caso/acceso)
- [Evolución de automatización en Databricks](https://danielenrique368.github.io/#caso/databricks)

## Referencia

[Contexto: NIST SP 800-162 · consideraciones de ABAC](https://csrc.nist.gov/pubs/sp/800/162/upd2/final)

Las decisiones descritas son propuestas de este cuaderno. Los ejemplos son sintéticos.

