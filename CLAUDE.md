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
