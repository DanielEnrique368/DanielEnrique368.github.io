---
title: "Promover una versión conocida entre entornos"
tipo: "Despliegue en Databricks"
estado: referencia
---

# Promover una versión conocida entre entornos

Código y definición del job describen el cambio; cada entorno aporta sus parámetros e identidad.

La referencia propone mantener el manifiesto del bundle junto al código y revisar ambos en el mismo cambio. Los destinos de desarrollo y producción expresan diferencias de entorno sin mantener copias independientes del proceso.

La secuencia propuesta es validar configuración, ejecutar una prueba controlada, revisar la evidencia y desplegar una revisión identificable. Una identidad de servicio obtendría sus credenciales mediante el mecanismo autorizado del entorno de CI/CD.

## Decisión

Versionar los archivos de configuración sin secretos y promover una revisión identificada del repositorio.

## Compromiso

La repetibilidad exige preparar identidades, permisos, cómputo y datos de prueba. Un despliegue técnicamente correcto todavía puede contener una transformación incorrecta.

## Conexiones

- [[observabilidad|Un job terminado no basta para dar los datos por buenos]]
- [[metadatos|Los metadatos son una entrada de seguridad]]

## Proyectos relacionados

- [Evolución de automatización en Databricks](https://danielenrique368.github.io/#caso/databricks)

## Referencia

[Databricks · bundles y recursos declarativos](https://docs.databricks.com/aws/en/dev-tools/bundles)

Las decisiones descritas son propuestas de este cuaderno. Los ejemplos son sintéticos.

