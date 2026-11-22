---
title: Política de privacidad
description: Cómo gestiona vTTS los libros, el texto a voz local, las voces personales, la sincronización opcional, las compras, Game Center y el servidor LAN.
updated: '2026-11-22'
lang: es
---

Esta política se aplica a vTTS de Pham Hung Tien en Android (paquete `com.phamhungtien.vtts`), iPhone, iPad y Mac. vTTS genera voz en tu dispositivo con los recursos incluidos en la instalación. Puedes escuchar sin una cuenta de vTTS y sin enviar tus libros o textos a un servidor del desarrollador.

## 1\. Procesamiento en el dispositivo

El texto, la generación de voz y el reconocimiento de texto en documentos compatibles (OCR) se procesan en el dispositivo. Para generar voz, no hace falta conectarse a internet ni descargar modelos durante el uso. En Android, Google Play entrega los recursos de voz y OCR como parte de la instalación. Las descargas opcionales de idiomas de traducción se gestionan por separado.

La app no incluye SDK publicitarios ni usa tus lecturas para publicidad. Android incluye Google ML Kit para identificar idiomas y traducir. La sección 5 describe los datos operativos de ese SDK. No operamos un servidor que reciba tus libros, borradores, texto reconocido, traducciones o audio generado para estas funciones.

## 2\. Almacenamiento local

La app guarda en tu dispositivo los libros importados, posiciones de lectura, marcadores, notas, entradas de pronunciación, ajustes, historial de lectura y actividad de escucha. Guarda los borradores cuando activas la opción de recordarlos. Crea audio temporal para reproducir o exportar. Los widgets de la pantalla de inicio pueden mostrar datos locales de escucha y el libro seleccionado.

Puedes eliminar libros de la biblioteca, borrar el historial o desactivar que se guarden los borradores. Los datos locales se conservan hasta que los elimines con los controles disponibles o quites la app y sus datos. En Android, las copias automáticas del sistema están desactivadas para vTTS. Puedes crear manualmente un archivo de copia de la biblioteca. Las copias del sistema de Apple dependen de los ajustes de tu dispositivo.

En versiones compatibles de Apple, la sincronización opcional por iCloud transfiere las categorías que actives, como libros, posiciones, borradores, historial, pronunciaciones y actividad de escucha, mediante tu cuenta de iCloud. Apple trata esos datos según su propia política. Android no usa esta función de iCloud. Las copias en archivos exportados, copias de seguridad, otras apps o almacenamiento en la nube permanecen en sus destinos hasta que las elimines allí.

## 3\. Importación, exportación y uso compartido

Tú eliges qué archivos importar, dónde guardar el audio y qué apps reciben el contenido que compartas. Si eliges almacenamiento en la nube u otra app, ese servicio aplica su propia política. vTTS no carga automáticamente el contenido en un servicio de voz en la nube.

## 4\. Voces personales

En versiones compatibles puedes crear una voz personal con una grabación o un archivo que elijas. vTTS pide acceso al micrófono solo para grabar desde la app. La creación del perfil y la generación de voz tienen lugar en el dispositivo. vTTS elimina o descarta su copia temporal de la grabación al terminar de crear el perfil o al salir del proceso. Un perfil guardado contiene un nombre, un identificador local, la fecha de creación, datos sobre la calidad de la grabación y características numéricas derivadas de la voz. El perfil no incluye la grabación original.

Los perfiles de voz permanecen en el dispositivo y se excluyen de la sincronización de la app, las copias automáticas, las copias de la biblioteca y el servidor LAN. Puedes eliminar un perfil guardado en el Estudio de voz o exportarlo expresamente como archivo. Cualquier persona que reciba un perfil exportado compatible podría generar voz con él. Tú decides dónde lo compartes. Al borrar el perfil en vTTS, las copias exportadas por ti o por otras personas permanecen en sus destinos.

## 5\. Traducción y datos operativos del SDK en Android

La traducción es opcional. En dispositivos Apple compatibles utiliza el sistema de traducción local de Apple, que puede requerir descargar recursos de idiomas. En Android usa Google ML Kit. Para instalar un idioma de traducción, debes iniciar la descarga y disponer de Wi-Fi. Una vez instalados los recursos, la traducción compatible se hace en el dispositivo. El texto de entrada y la traducción resultante no se envían a los servidores de traducción de Google. El libro traducido se guarda como un libro local separado.

Según Google, ML Kit le envía datos operativos para diagnóstico, análisis de uso, mantenimiento, mejora y prevención de abusos. Incluyen información del dispositivo y de la app, identificadores de instalación, datos de rendimiento y errores, eventos y configuración de API, tamaños de entrada y salida, y preferencias o identificaciones de idiomas. Estas métricas son distintas del texto del libro o la traducción. ML Kit también puede contactar con Google para mantener modelos y compatibilidad. La traducción utiliza servicios de configuración e instalación de Firebase. Google documenta que protege las métricas de ML Kit mediante HTTPS y que no transfiere las métricas indicadas a terceros. El SDK puede comunicarse cuando hay conexión, aunque no uses el servidor LAN opcional.

Consulta cómo trata y conserva Google estos datos en las [condiciones de privacidad de ML Kit](https://developers.google.com/ml-kit/terms), la [información sobre datos en Android](https://developers.google.com/ml-kit/android-data-disclosure), la [información de Firebase para Android](https://firebase.google.com/docs/android/play-data-disclosure) y la [política de privacidad de Google](https://policies.google.com/privacy). No recibimos esas métricas del SDK en un panel de análisis para desarrolladores.

## 6\. Compras

Las compras opcionales de Premium y su restauración usan Google Play en Android y el App Store en dispositivos Apple. La tienda trata el pago y los datos de la cuenta conforme a sus políticas. vTTS recibe el estado de compra y los datos de transacción necesarios para verificar y restaurar el acceso. Android guarda localmente un registro de compra firmado para mantener sin conexión un acceso ya verificado. No recopilamos datos de tarjetas de pago ni enviamos registros de compra a un servidor de verificación del desarrollador. Borrar los datos de la app elimina el registro local. La tienda conserva sus datos de transacción conforme a sus reglas.

Consulta la [política de privacidad de Google](https://policies.google.com/privacy) y la [de Apple](https://www.apple.com/legal/privacy/).

## 7\. Clasificaciones opcionales de Game Center

En las versiones compatibles para dispositivos Apple, puedes conectarte a Game Center desde la pantalla de actividad. Si activas la opción e inicias sesión, vTTS envía a las clasificaciones de Apple el tiempo total de escucha, los minutos de la semana en curso, la racha más larga y el número de libros terminados. Game Center asocia esas puntuaciones con tu perfil y puede mostrar tu nombre de jugador y tus marcas a otros jugadores. Las clasificaciones no reciben títulos ni contenido de lectura. Puedes desactivar la opción en la app para detener los envíos. Apple gestiona las puntuaciones ya enviadas y tu cuenta de Game Center. [Política de privacidad de Apple](https://www.apple.com/legal/privacy/)

## 8\. Servidor opcional en la red local

El servidor HTTP está desactivado de forma predeterminada. Si lo activas, otros dispositivos con la dirección del servidor y un token válido pueden enviar texto y recibir audio por la red. La voz se genera en el dispositivo donde se ejecuta vTTS.

- Al iniciar el servidor se genera un token. Mantenlo en privado y usa el servidor solo en una red de confianza.
- HTTP no cifra el tráfico mediante TLS. Evita exponer el puerto del servidor a internet. El acceso también depende de tu red y del cortafuegos.
- En iPhone y iPad, el servidor solo funciona mientras la app está en primer plano. Se detiene si cambias de app o bloqueas la pantalla.
- También en Android la app debe seguir en primer plano. Las solicitudes y las respuestas generadas se procesan localmente. Cada dispositivo que recibe audio controla su propia copia.

## 9\. Permisos y servicios externos

La app accede a los archivos que elijas importar o exportar y usa el permiso de red local para el servidor LAN. Android usa un servicio multimedia en primer plano durante la reproducción y puede pedir permiso de notificaciones para los controles y los recordatorios de escucha. La generación de voz y el OCR no necesitan acceso al micrófono, contactos o ubicación. El acceso al micrófono es opcional para crear voces personales. En Android, internet también permite las compras de Google Play y las comunicaciones del SDK antes descritas.

Abrir enlaces de Facebook o de sitios web, elegir un proveedor externo de almacenamiento o escribir a soporte implica usar servicios externos sujetos a sus propias políticas. Esta política de la app no sustituye la [política de privacidad del sitio web](/es/privacy/).

## 10\. Soporte, eliminación y actualizaciones

El desarrollador responsable de vTTS es Pham Hung Tien. Usamos la información que envíes voluntariamente al contactar con nosotros, incluida tu dirección de correo y cualquier adjunto, para responder y resolver problemas. Evita enviar libros privados, datos de pago u otra información personal innecesaria. Conservamos la correspondencia de soporte según sea necesario para gestionar la solicitud y cumplir las obligaciones aplicables. Puedes pedir que eliminemos la correspondencia que conservamos. No podemos acceder a tu biblioteca local ni borrarla a distancia, y no hay una cuenta de vTTS que eliminar. Los datos de la tienda, iCloud y los SDK de Google se gestionan con los controles de cada proveedor.

Actualizamos la página cuando cambian las prácticas de la app en relación con los datos. La fecha de arriba indica la última revisión.

Puedes contactar con vTTS por [correo electrónico](mailto:contact@phamhungtien.com) o en [Facebook](https://www.facebook.com/vTTSOffline).
