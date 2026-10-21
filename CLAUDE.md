# Teoría Ascenso F11 — CTA/RFEF

App de exámenes de ascenso arbitral de Fútbol 11 (CTA/RFEF).

## Arquitectura

- Toda la app vive en un único `index.html` (HTML + CSS + JS + banco de preguntas). No dividirlo en varios archivos.
- Se publica en GitHub Pages como PWA (`manifest.webmanifest`, `sw.js`, iconos).
- El progreso de cada usuario se guarda en Firebase, proyecto `f11-examen`.
- El título de la app es **«Teoría Ascenso F11 — CTA/RFEF»**. Úsalo igual en `<title>`, en el manifest y en la interfaz.

## Reglas del banco de preguntas

- **No renumerar IDs.** Si se borra una pregunta, su ID queda como hueco. Las preguntas nuevas ocupan primero los huecos de su bloque.
- **No borrar ni cambiar preguntas en bloque sin preguntarme antes.**
- Las preguntas de Normativa del tipo «¿Qué título tiene el Artículo X?» **se quedan**: no hay que borrarlas.

## Exámenes oficiales (`ExamenActa1.pdf`, `ExamenActa2.pdf`)

- Son de temporadas pasadas: **sirven solo como referencia de estructura, nunca de contenido.**
- Úsalos para: número de preguntas, reparto por apartados (reglas, artículos, glosario), proporción de situaciones de juego frente a teoría, estilo de redacción y forma de las opciones.
- No los uses para: sacar respuestas, añadir o corregir preguntas, marcar preguntas como «salieron en examen», ni para elegir artículos o documentos (p. ej. su numeración del «Reglamento General» no es la nuestra).
- El contenido sale siempre de los documentos vigentes: Reglas de Juego 2026/27, Reglamento de Competiciones 2025 y Bases de Competición.
