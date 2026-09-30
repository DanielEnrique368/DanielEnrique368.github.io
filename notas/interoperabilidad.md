---
title: "Databricks y Fabric: decidir dónde ejecutar y cómo compartir"
tipo: "Interoperabilidad"
estado: referencia
---

# Databricks y Fabric: decidir dónde ejecutar y cómo compartir

Una guía de decisiones sobre ejecución, lectura, identidad y costos; no un ranking de plataformas.

Fabric puede preparar datos y entrenar modelos con notebooks, además de registrar experimentos con MLflow. La elección del entorno de entrenamiento necesita considerar herramientas, operación, dependencias y capacidad; no se reduce a asignar una plataforma a BI y otra a machine learning.

La publicación de datos de Unity Catalog hacia Fabric documentada por Microsoft está en Preview. Ofrece lectura desde Fabric, mantiene las escrituras en Databricks y requiere una capacidad de Fabric. Es una opción de interoperabilidad que exige revisar prerrequisitos, alcance de datos y costos antes de usarla.

Los permisos y políticas de Unity Catalog no se replican automáticamente a Fabric. La documentación de mirroring advierte que sus controles RLS y ABAC no se aplican al acceso directo al almacenamiento. Hay que configurar y comprobar controles en Fabric y OneLake, identificar la identidad de conexión y probar las rutas de acceso efectivas.

La guía propone decidir primero dónde se transforma y escribe, después qué consumidores necesitan lectura y finalmente qué evidencia prueba permisos y comportamiento. Un piloto con datos sintéticos puede contrastar esas decisiones; aquí no se presentan mediciones ni una integración desplegada.

## Decisión

Documentar propietario de escritura, consumidores de lectura, identidad de conexión, controles efectivos y capacidad requerida antes de elegir el mecanismo de intercambio.

## Compromiso

Compartir datos puede reducir copias, pero introduce dependencias de disponibilidad, compatibilidad y autorización entre servicios. La condición Preview y los requisitos de capacidad forman parte de la decisión.

## Conexiones

- [[despliegue|Promover una versión conocida entre entornos]]
- [[metadatos|Los metadatos son una entrada de seguridad]]
- [[minimo-privilegio|Permitir una operación no implica mostrar todas sus columnas]]
- [[gobierno-datos-ia|Gobernar datos e IA mediante decisiones y evidencia]]

## Proyectos relacionados

- [RBAC + ABAC explicable](https://danielenrique368.github.io/#caso/acceso)
- [Evolución de automatización en Databricks](https://danielenrique368.github.io/#caso/databricks)

## Referencias

- [Microsoft · tutorial de ciencia de datos en Fabric](https://learn.microsoft.com/en-us/fabric/data-science/tutorial-data-science-introduction)
- [Microsoft · publicar datos de Unity Catalog en Fabric (Preview)](https://learn.microsoft.com/en-us/azure/databricks/partners/bi/fabric-publish)
- [Microsoft · modelo de control de acceso de OneLake](https://learn.microsoft.com/en-us/fabric/onelake/security/data-access-control-model)
- [Microsoft · seguridad de mirroring de Azure Databricks](https://learn.microsoft.com/en-us/fabric/mirroring/azure-databricks-security)

Lectura inicial: Databricks vs. Microsoft Fabric, Daniel Portugal / Daniel Datashow (PDF facilitado para revisión). Síntesis propia contrastada con documentación oficial.

Las decisiones descritas son propuestas de este cuaderno. Los ejemplos son sintéticos.

