---
title: "Los metadatos son una entrada de seguridad"
tipo: "Contrato de atributos"
estado: referencia
---

# Los metadatos son una entrada de seguridad

Dueño, sensibilidad y vigencia necesitan un origen confiable para intervenir en una autorización.

Una política ABAC evalúa atributos del sujeto, del recurso y de la operación, y puede incorporar condiciones del entorno. En esta demostración se usan departamento, sensibilidad y propósito; el recurso pertenece siempre a finanzas.

La decisión de diseño es mantener un vocabulario controlado, un responsable y una versión por atributo relevante. Los valores del formulario sirven para explorar escenarios; en producción deberían provenir de identidad y catálogo confiables.

## Decisión

Denegar cuando falte un atributo obligatorio o su valor no esté reconocido. Revisar también su vigencia en una implementación real.

## Compromiso

El control depende de la calidad del catálogo. Una etiqueta desactualizada puede afectar disponibilidad o exposición aunque la regla esté bien escrita.

## Conexiones

- [[revision-humana|Una propuesta de clasificación no es una aprobación]]
- [[minimo-privilegio|Permitir una operación no implica mostrar todas sus columnas]]

## Proyectos relacionados

- [Clasificación asistida por GenAI](https://danielenrique368.github.io/#caso/clasificacion)
- [RBAC + ABAC explicable](https://danielenrique368.github.io/#caso/acceso)

## Referencia

[NIST SP 800-162 · definición de ABAC](https://csrc.nist.gov/pubs/sp/800/162/upd2/final)

Las decisiones descritas son propuestas de este cuaderno. Los ejemplos son sintéticos.

