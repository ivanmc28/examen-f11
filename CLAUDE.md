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

## Progreso, repaso y reportes

- Cada usuario guarda su progreso en Firebase (`/usuarios/<usuario>`); las reglas solo permiten leer y escribir dentro de ese espacio.
- Falladas: una pregunta sale del repaso tras `ACIERTOS_PARA_SALIR` (2) aciertos seguidos en exámenes distintos; `f11_repaso` guarda fallos, aciertos seguidos y fecha. El repaso coge hasta `MAX_REPASO` (40), empezando por las que tocan y las más falladas.
- Reportes de preguntas: se guardan en `f11_reportes` de la cuenta de quien reporta y además en el buzón común `/usuarios/BUZON-REPORTES` (en mayúsculas para que nadie pueda entrar en él desde la app; se escribe con ETag + if-match para no pisar reportes ajenos). `revision/reportes.py` lista los del buzón (o los de un usuario con `reportes.py USUARIO`), solo lectura.
- Si se cambia `index.html` a mano (sin `sync.py`), subir `APP_VERSION` para que los usuarios reciban la versión nueva.
- `EPOCAS_IDS`: al borrar una pregunta o reutilizar un ID se sube su época para que los navegadores olviden lo guardado de la anterior. `sync.py` lo hace solo.

## Reglas del banco de preguntas

- **No renumerar IDs.** Si se borra una pregunta, su ID queda como hueco. Las preguntas nuevas ocupan primero los huecos de su bloque.
- **No borrar ni cambiar preguntas en bloque sin preguntarme antes.**
- Las preguntas de Normativa que preguntan un artículo por su nombre («¿Qué título tiene el Artículo X?») o al revés (qué artículo regula tal cosa) **no se borran nunca**. En Normativa solo se borran duplicadas concretas (mismo dato preguntado dos veces).

## Exámenes oficiales (`referencia/ExamenActa1.pdf`, `referencia/ExamenActa2.pdf`)

- Son de temporadas pasadas: **sirven solo como referencia de estructura, nunca de contenido.**
- Úsalos para: número de preguntas, reparto por apartados (reglas, artículos, glosario), proporción de situaciones de juego frente a teoría, estilo de redacción y forma de las opciones.
- No los uses para: sacar respuestas, añadir o corregir preguntas, marcar preguntas como «salieron en examen», ni para elegir artículos o documentos (p. ej. su numeración del «Reglamento General» no es la nuestra).
- El contenido sale siempre de los documentos vigentes: Reglas de Juego 2026/27, Reglamento de Competiciones 2025 y Bases de Competición.

## Revisión del banco (`revision/`)

- Carpeta local de trabajo para revisar el banco; está en `.gitignore` (el repositorio es público).
- `banco.json`: copia del banco de `index.html`. `docs/`: texto de los PDF vigentes por páginas.
- `ctx.py ID…` muestra preguntas con los fragmentos del documento que las respaldan; `apply.py ed/loteNN.json` valida (citas literales) y aplica cambios a `banco.json`.
- `add.py ed/nuevas_XX.json` añade preguntas nuevas: valida citas literales, opciones, que la correcta no destaque por larga y el parecido con las existentes, y asigna ID ocupando huecos. `huecos.py PAG_INI PAG_FIN [PREFIJOS]` lista frases de las Reglas que ninguna pregunta cubre.
- `sync.py` lleva `banco.json` a `index.html` (sube `APP_VERSION`, que es lo que avisa a los usuarios de que hay versión nueva, y las épocas de los ID borrados o reutilizados) y regenera el Excel de `banco/`. Se ejecuta con `revision/.venv/bin/python revision/sync.py` (ese entorno tiene openpyxl). `situaciones.js` cuenta las situaciones de juego por regla con el criterio de la app. `art.py RC|BC NUM…` muestra artículos con sus preguntas.
- Después de `sync.py`: commit y `git push` (GitHub Pages publica solo).
- Lo aplicado se registra en `ed/` (lotes de correcciones y de preguntas nuevas, `hechas.json`, `borradas.json`, `duplicadas.json`…); `duplicadas_y_dudosas.md` es la propuesta original de duplicadas y dudosas (ya resuelta) y `salidas_antiguas/` guarda salidas de trabajo de esa primera revisión.

## Material de partida (`material/`)

- Carpeta local, en `.gitignore`, con lo rescatado de la antigua carpeta `~/Escritorio/Arbitraje` (borrada el 2026-10-29; su app era una versión vieja que ya está en el historial de git).
- Originales editables de los resúmenes (`.odt`, `.docx`), `Reglamento_Articulos_Seleccionados.docx` y `ReglamentoGeneralVigente.pdf`. Este último **no** es un documento vigente para el banco (ver la regla de arriba sobre el «Reglamento General»).
