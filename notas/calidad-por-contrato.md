---
title: "Una regla de calidad necesita un contrato y una decisión"
tipo: "Calidad por contrato"
estado: referencia
---

# Una regla de calidad necesita un contrato y una decisión

Metadatos, criterio de negocio y evidencia técnica cumplen funciones distintas dentro de un lote revisable.

La propuesta parte del esquema y del uso esperado del dato. Cada candidato conserva activo, columna, tipo, expresión o vocabulario y motivo. El responsable de negocio confirma el significado; una revisión técnica comprueba dialecto SQL, nulos, tipos y duplicados en una zona de pruebas antes de habilitar la publicación.

En Purview, la API Data Quality Create Rules referencia dominio, producto de datos y activo; la versión enlazada es Preview. Atlas entity/bulk crea o actualiza entidades de metadatos en Data Map y participa en diseños de linaje. Publicar esas entidades no crea por sí mismo reglas de calidad.

El lote descargable es un contrato propio, sintético y pendiente de revisión. Un adaptador posterior traduciría reglas aceptadas al servicio de calidad. El registro por regla debe conservar el resultado remoto y resolver respuestas inciertas antes de un reintento; una lista de reglas no demuestra una carga masiva implementada.

La guía de IA responsable de Unified Catalog requiere revisar las sugerencias antes de adoptarlas. En este diseño, una recomendación asistida conservaría su origen y justificación; el ejemplo publicado no conecta un proveedor ni demuestra generación automática.

## Decisión

Separar los estados propuesta, revisión, prueba y autorización. Mantener publicar:false mientras falte evidencia y resolver la identidad de servicio fuera del navegador.

## Compromiso

El contrato añade trabajo de mapeo y mantenimiento frente a cambios de API, pero permite revisar qué cambia, descartar duplicados y recuperar fallos sin asumir que toda operación remota es idempotente.

## Recursos

- [Lote sintético de calidad](https://danielenrique368.github.io/recursos/lote-calidad-ejemplo.json)

## Conexiones

- [[metadatos|Los metadatos son una entrada de seguridad]]
- [[revision-humana|Una propuesta de clasificación no es una aprobación]]
- [[observabilidad|Un job terminado no basta para dar los datos por buenos]]
- [[gobierno-datos-ia|Gobernar datos e IA mediante decisiones y evidencia]]

## Proyectos relacionados

- [Clasificación asistida por GenAI](https://danielenrique368.github.io/#caso/clasificacion)
- [Evolución de automatización en Databricks](https://danielenrique368.github.io/#caso/databricks)
- [Calidad por lotes en Purview](https://danielenrique368.github.io/#caso/purview)

## Referencias

- [Microsoft · Data Quality Create Rules (Preview)](https://learn.microsoft.com/en-us/rest/api/purview/purviewdataquality/create-rules?view=rest-purview-purviewdataquality-2026-01-12-preview)
- [Microsoft · Data Map Entity Bulk Create or Update](https://learn.microsoft.com/en-us/rest/api/purview/datamapdataplane/entity/bulk-create-or-update?view=rest-purview-datamapdataplane-2023-09-01)
- [Microsoft · IA responsable en Unified Catalog](https://learn.microsoft.com/en-us/purview/unified-catalog-responsible-ai-faq?azure-portal=true)

Las decisiones descritas son propuestas de este cuaderno. Los ejemplos son sintéticos.

