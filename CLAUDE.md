# Teoría Ascenso F11 — CTA/RFEF

App de exámenes de ascenso arbitral de Fútbol 11 (CTA/RFEF).

## Arquitectura

- Toda la app vive en un único `index.html` (HTML + CSS + JS + banco de preguntas). No dividirlo en varios archivos.
- Se publica en GitHub Pages como PWA (`manifest.webmanifest`, `sw.js`, `iconos/`). `sw.js` debe seguir en la raíz para controlar toda la web.
- El progreso de cada usuario se guarda en Firebase, proyecto `f11-examen`.
- El título de la app es **«Teoría Ascenso F11 — CTA/RFEF»**. Úsalo igual en `<title>`, en el manifest y en la interfaz.

## Estructura de carpetas

- Raíz: solo lo que forma la app (`index.html`, `manifest.webmanifest`, `sw.js`) y este archivo.
- `iconos/`: iconos de la PWA (los usan `index.html`, el manifest y `sw.js`).
- `documentos/`: PDF vigentes. La app abre desde aquí los tres de la barra de documentos (Reglas de Juego y los dos resúmenes); en el banco, `fuente` guarda solo el nombre del archivo y la app añade `documentos/`.
- `referencia/`: exámenes oficiales antiguos, `Preguntas_dudosas.pdf` y la clasificación de árbitros.
- `banco/`: Excel exportado con el banco de preguntas.
- `revision/` y `material/`: locales, fuera de git (ver abajo).
- Si se mueve o renombra un archivo que use la app, actualizar sus rutas en `index.html`, el manifest y `sw.js`, y subir la versión de `CACHE` en `sw.js`.

## Reglas del banco de preguntas

- **No renumerar IDs.** Si se borra una pregunta, su ID queda como hueco. Las preguntas nuevas ocupan primero los huecos de su bloque.
- **No borrar ni cambiar preguntas en bloque sin preguntarme antes.**
- Las preguntas de Normativa del tipo «¿Qué título tiene el Artículo X?» **se quedan**: no hay que borrarlas.

## Exámenes oficiales (`referencia/ExamenActa1.pdf`, `referencia/ExamenActa2.pdf`)

- Son de temporadas pasadas: **sirven solo como referencia de estructura, nunca de contenido.**
- Úsalos para: número de preguntas, reparto por apartados (reglas, artículos, glosario), proporción de situaciones de juego frente a teoría, estilo de redacción y forma de las opciones.
- No los uses para: sacar respuestas, añadir o corregir preguntas, marcar preguntas como «salieron en examen», ni para elegir artículos o documentos (p. ej. su numeración del «Reglamento General» no es la nuestra).
- El contenido sale siempre de los documentos vigentes: Reglas de Juego 2026/27, Reglamento de Competiciones 2025 y Bases de Competición.

## Revisión del banco (`revision/`)

- Carpeta local de trabajo para revisar el banco; está en `.gitignore` (el repositorio es público).
- `banco.json`: copia del banco de `index.html`. `docs/`: texto de los PDF vigentes por páginas.
- `ctx.py ID…` muestra preguntas con los fragmentos del documento que las respaldan; `apply.py ed/loteNN.json` valida (citas literales) y aplica cambios a `banco.json`.
- Lo aplicado se registra en `ed/` (`hechas.json`, `duplicadas.json`, `epocas.json`…); `duplicadas_y_dudosas.md` es la propuesta pendiente de confirmar.

## Material de partida (`material/`)

- Carpeta local, en `.gitignore`, con lo rescatado de la antigua carpeta `~/Escritorio/Arbitraje` (borrada el 2026-10-29; su app era una versión vieja que ya está en el historial de git).
- Originales editables de los resúmenes (`.odt`, `.docx`), `Reglamento_Articulos_Seleccionados.docx` y `ReglamentoGeneralVigente.pdf`. Este último **no** es un documento vigente para el banco (ver la regla de arriba sobre el «Reglamento General»).
