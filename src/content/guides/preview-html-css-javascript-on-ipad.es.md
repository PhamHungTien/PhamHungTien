---
lang: es
title: 'Cómo previsualizar HTML, CSS y JavaScript en el iPad'
description: 'Crea una lista de lectura con HTML, CSS y JavaScript en Pad Code AI. Prueba la vista previa en iPad o iPhone y localiza errores con la consola.'
published: 2026-11-22
app: padcodeai
topic: Pad Code AI
---

Con [Pad Code AI](/es/PadCodeAI/) puedes editar una página web sencilla y probarla desde el iPad o el iPhone. Vamos a crear una lista de lectura que cuenta las tareas marcadas. Los tres archivos se guardan en el proyecto, así que puedes seguir el ejercicio sin conexión una vez instalada la aplicación.

## Prepara los tres archivos

En la pantalla de inicio, elige **Nuevo proyecto**, selecciona **Carpeta vacía** y guarda el proyecto en una carpeta del dispositivo que puedas abrir desde Archivos. Con **Nuevo archivo**, crea `index.html`, `styles.css` y `app.js` dentro de la misma carpeta. Si encuentras código de plantilla, sustitúyelo por el de este ejercicio.

### Estructura la lista con HTML

Copia el código en `index.html`. La etiqueta `viewport` adapta la página al ancho disponible y las rutas que comienzan por `./` apuntan a los archivos de la misma carpeta.

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Lista de lectura</title>
    <link rel="stylesheet" href="./styles.css" />
    <script src="./app.js" defer></script>
  </head>
  <body>
    <main class="checklist">
      <h1>Lista de lectura</h1>
      <label><input type="checkbox" /> Elegir un artículo</label>
      <label><input type="checkbox" /> Leer diez páginas</label>
      <label><input type="checkbox" /> Escribir una nota breve</label>
      <p>Tareas completadas <output data-progress aria-live="polite">0 / 3</output></p>
    </main>
  </body>
</html>
```

### Ajusta el diseño con CSS

Copia este bloque en `styles.css`. El espacio de cada fila facilita marcar las casillas en un teléfono.

```css
body {
  margin: 0;
  padding: 1.25rem;
  font:
    1rem/1.5 system-ui,
    sans-serif;
  background: #e9f2ed;
  color: #18312a;
}

.checklist {
  max-width: 30rem;
  margin-inline: auto;
  padding: 1.25rem;
  border-radius: 1rem;
  background: white;
}

label {
  display: flex;
  gap: 0.65rem;
  align-items: center;
  min-height: 44px;
}
```

### Actualiza el contador con JavaScript

Copia este bloque en `app.js`. El atributo `defer` de la etiqueta `script` hace que el código se ejecute cuando las casillas ya se han cargado.

```javascript
const items = [...document.querySelectorAll('input[type="checkbox"]')];
const progress = document.querySelector('[data-progress]');

function updateProgress() {
  const count = items.filter((item) => item.checked).length;
  progress.textContent = count + ' / ' + items.length;
}

items.forEach((item) => item.addEventListener('change', updateProgress));
updateProgress();
```

## Comprueba el resultado en la vista previa

1. Guarda los archivos y abre `index.html`. Busca **Vista previa web en vivo** en la **Paleta de comandos**. Si tienes un teclado externo, también puedes elegir **Vista previa** en el menú **Ejecutar**.
2. Comprueba que aparezcan el título, las tres casillas y el contador `0 / 3`. Marca dos tareas y comprueba que ahora indica `2 / 3`. Desmarca una para comprobar que el valor vuelve a bajar.
3. En **Opciones de vista previa**, busca **Ancho de la ventana de visualización** y compara 390 pt y 768 pt si la ventana tiene espacio. Fíjate en si las etiquetas largas se ajustan a dos líneas y en si aparece desplazamiento horizontal.
4. Toca **Listo** para volver al editor, modifica el relleno de `styles.css` y abre de nuevo la vista previa. Pad Code AI incorpora los cambios de las pestañas abiertas al previsualizar. Guarda los archivos antes de abrirlos en otra aplicación o compartirlos.

## Localiza un fallo de estilo o de JavaScript

Si ves el texto sin estilos, revisa `href="./styles.css"` y el nombre exacto del archivo. Si el diseño se ve bien pero el contador no cambia, abre la **Consola** de la vista previa. Comprueba que `src="./app.js"` apunte al archivo correcto y que `data-progress` coincida con el selector del script. Para saber si el código llega al final, añade `console.log("checklist ready")` como última línea y toca **Recargar**. Puedes retirar el mensaje después de probarlo.

La vista previa sirve para revisar una página local. Para compartir una URL pública, tendrás que subir los archivos a un alojamiento web. Si te resulta más cómodo editar HTML y CSS en paralelo, puedes probar el editor dividido con su cupo gratuito diario. Consulta las opciones actuales de Pro en la app o en la [ficha de App Store](https://apps.apple.com/app/id6774398897).

Cuando funcione la lista, prueba a [añadir un botón para desmarcar las tareas y revisar el cambio propuesto por la IA](/es/guides/review-ai-code-changes-on-ipad/).
