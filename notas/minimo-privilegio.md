---
title: "Permitir una operación no implica mostrar todas sus columnas"
tipo: "Control de acceso"
estado: referencia
---

# Permitir una operación no implica mostrar todas sus columnas

La respuesta puede incluir obligaciones que el componente de datos debe hacer cumplir.

La política de ejemplo separa la capacidad del rol de las condiciones de acceso. Visitante no tiene lectura; analista y auditor deben cumplir el propósito y ámbito definidos para información no pública.

Si la información es restringida, una evaluación favorable produce enmascaramiento. El resultado solo es válido si un componente confiable oculta los identificadores antes de entregar datos; un indicador visual no cumple esa obligación.

## Decisión

Tratar permitir, denegar y permitir con obligaciones como resultados distintos. Si una obligación no puede aplicarse, no entregar el resultado.

## Compromiso

El enmascaramiento puede reducir utilidad analítica y no evita por sí solo la reidentificación. La política requiere revisar qué columnas y combinaciones se exponen.

## Conexiones

- [[metadatos|Los metadatos son una entrada de seguridad]]
- [[decision-explicable|Guardar el porqué junto a la decisión]]

## Proyectos relacionados

- [RBAC + ABAC explicable](https://danielenrique368.github.io/#caso/acceso)

## Referencia

[NIST SP 800-162 · evaluación de políticas](https://csrc.nist.gov/pubs/sp/800/162/upd2/final)

Las decisiones descritas son propuestas de este cuaderno. Los ejemplos son sintéticos.

