---
title: Política de privacidad
description: Cómo gestiona PHTV las pulsaciones, el historial del portapapeles, los permisos, Game Center y la búsqueda opcional de GIF y stickers.
updated: '2026-11-22'
lang: es
---

## Resumen

PHTV procesa las pulsaciones en tu dispositivo y no conserva un historial de lo que escribes. No usa SDK de publicidad, análisis ni seguimiento. Esta política describe las funciones locales y los datos que tratan los servicios de red cuando los usas.

Esta política abarca todas las ediciones:

- **PHTV** es la edición de código abierto para Mac y se descarga desde este sitio, GitHub o Homebrew.
- **PHTV Keyboard para Mac** es la edición del Mac App Store.
- **PHTV Keyboard para iPhone y iPad** incluye el teclado y su aplicación complementaria en el App Store.

## Datos tratados en el dispositivo

- **Pulsaciones.** Solo se usan para componer el texto vietnamita al escribir. No se guarda ni se envía un historial de escritura.
- **Ajustes y abreviaturas.** El método de entrada, los atajos, las abreviaturas y otras preferencias solo se guardan en tu dispositivo.
- **Historial del portapapeles**, cuando lo activas. Lo que copias se guarda en el dispositivo para que puedas volver a pegarlo. El contenido permanece allí y puedes borrarlo en cualquier momento. En Mac, la app omite lo que copias desde gestores de contraseñas.
- **Emojis recientes.** Se guardan en el dispositivo para mostrarlos primero en el selector.
- **En iPhone y iPad.** Las palabras que el teclado aprende para mejorar las sugerencias y la foto que eliges como fondo permanecen en el dispositivo. Puedes borrar las palabras aprendidas en los ajustes del teclado.
- **Carrera de escritura.** Los récords y los resultados recientes se guardan en el dispositivo.

## Permisos

- **PHTV** necesita **Accesibilidad** para recibir pulsaciones y funcionar en todas las apps. En macOS 27.3 y posteriores aparece en **System & App Protection Override**. Solo usa el permiso para procesar las teclas mientras escribes.
- **PHTV Keyboard para Mac** necesita un único permiso para componer letras vietnamitas en todas las apps. En macOS 27.3 o posterior es **System & App Protection Override**. En versiones anteriores figura como Device Control and Data Access o Accesibilidad. La app se ejecuta en el entorno aislado App Sandbox de Apple y no lee el contenido de otras apps.
- **PHTV Keyboard para iPhone y iPad** funciona sin **Permitir acceso total**. Esa opción solo se usa para la respuesta háptica, pegar desde el panel del portapapeles, usar una foto de fondo propia y sincronizar los ajustes y las abreviaturas con la app de PHTV. El teclado no envía datos fuera del dispositivo.

La entrada segura de macOS impide que PHTV reciba pulsaciones mientras está activa. En iPhone y iPad, iOS y iPadOS pasan al teclado del sistema en los campos de texto seguros.

## Acceso a la red

- **La escritura funciona sin internet** en todas las ediciones.
- **PHTV Keyboard** para Mac, iPhone y iPad se conecta únicamente a **Game Center** de Apple, cuando inicias sesión en ese servicio para publicar resultados de la carrera y consultar clasificaciones. Apple trata los resultados y tu nombre de Game Center conforme a su política. Sin iniciar sesión también puedes correr y guardar los récords en tu dispositivo. [Política de privacidad de Apple](https://www.apple.com/legal/privacy/)
- **PHTV** solo se conecta para buscar actualizaciones y cuando abres la pestaña de GIF o stickers de PHTV Picker. Las imágenes proceden de Klipy, que recibe los términos de búsqueda, un identificador aleatorio de instalación y datos de red como la dirección IP. El texto que escribes en otras apps permanece en el dispositivo. Las búsquedas en el selector se envían a Klipy para obtener resultados.

## Soporte y privacidad de menores

Si decides escribirnos o informar de un error, usamos los datos que compartas para investigar y responder. Puedes adjuntar datos de diagnóstico a un informe. Los informes publicados en GitHub pueden ser públicos. El mismo tratamiento local y las mismas condiciones de los servicios opcionales se aplican a todos los usuarios. Los servicios de terceros pueden establecer requisitos de edad propios.

## Cambios

Si revisamos esta política, actualizamos la fecha que aparece en la parte superior de la página.

## Contacto

Si tienes preguntas sobre privacidad, escribe a [contact@phamhungtien.com](mailto:contact@phamhungtien.com).
