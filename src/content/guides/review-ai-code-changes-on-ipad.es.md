---
lang: es
title: 'Cómo revisar en iPad los cambios que hace la IA en tu código'
description: 'Planifica una mejora de JavaScript con Pad Code AI, comprueba las líneas modificadas, prueba el resultado y deshaz la operación si hace falta.'
published: 2026-11-22
app: padcodeai
topic: Pad Code AI
---

Si quieres probar un asistente de programación en el iPad, empieza con un cambio fácil de comprobar. En este ejercicio, [Pad Code AI](/PadCodeAI/) añade un botón para restablecer una lista de lectura. Vas a acotar la tarea, revisar qué líneas ha cambiado el agente y verificar el resultado en la vista previa.

## Prepara una copia y elige cómo se procesa la solicitud

Abre el proyecto de la [guía de HTML, CSS y JavaScript](/es/guides/preview-html-css-javascript-on-ipad/) o prepara una copia de una lista que ya tengas. Guarda los archivos y marca una casilla en la vista previa. Si el contador muestra `1 / 3`, ya tienes un punto de partida con el que comparar.

En los ajustes de **Asistente de IA**, elige el proveedor. Apple Intelligence requiere un dispositivo compatible con la función activada. Con modelos descargados, los modos disponibles dependen del modelo y de los recursos del dispositivo. Si eliges un proveedor en línea, tu clave de API se utiliza para enviar el mensaje y el contexto autorizado a ese proveedor. Durante la tarea, el agente puede solicitar más contexto del proyecto. Revisa el contenido que vas a compartir y practica con archivos que no contengan claves ni datos privados. Puedes consultar la [política de privacidad de Pad Code AI](/PadCodeAI/privacy.html).

## Pide primero un plan de trabajo

Abre el panel de IA dentro del proyecto. El modo **Preguntar** sirve para aclarar cómo funciona el código que ya tienes. Elige **Planificar** si quieres que el asistente consulte los archivos y proponga unos pasos. Si el modo está desactivado, comprueba que tengas un proyecto abierto y que el proveedor o el modelo admitan las acciones del agente.

Describe el resultado que esperas y dónde puede intervenir.

> Planifica un botón Restablecer para esta lista. Añade el botón en index.html y su evento de clic en app.js. Cuando se pulse, desmarca las tres casillas y deja el contador en 0 / 3. Conserva el estilo y la posibilidad de marcar cada casilla por separado. Usa JavaScript disponible en el navegador de la vista previa.

El plan debería reutilizar la lista de casillas y la función `updateProgress()`. Si te encaja, selecciona **Editar** y pide que lo aplique. Este modo permite escribir en los archivos del proyecto. Con **Auto**, el agente también puede ejecutar código compatible.

## Lee las diferencias y prueba el botón

1. Abre **Cambios del agente** en el panel de IA y elige la operación más reciente. Si la pantalla es estrecha, busca esa opción en el menú del panel. **Revisar cambios** muestra las líneas añadidas y eliminadas en cada archivo.
2. Busca el botón en `index.html` y el controlador de clic en `app.js`. El controlador debe desmarcar las casillas de la lista y llamar a `updateProgress()`. Si encuentras cambios ajenos a la tarea, usa **Deshacer operación** y repite con una petición más acotada.
3. Abre `index.html` en **Vista previa web en vivo**. Marca dos casillas, comprueba `2 / 3` y pulsa **Restablecer**. Las dos deben quedar desmarcadas y el valor volver a `0 / 3`. Marca una casilla de nuevo para comprobar que sigue respondiendo. Con un teclado, usa Tab para enfocar el botón y pulsa Intro para activarlo.

El agente modifica los archivos antes de que abras el historial. Por eso conviene empezar con una copia o un proyecto de ejemplo. Si usas Git, comprueba también las diferencias desde el control de código fuente antes de confirmar el cambio. Repite este método con una tarea algo mayor cuando puedas explicar qué se modificó y cómo lo has probado.
