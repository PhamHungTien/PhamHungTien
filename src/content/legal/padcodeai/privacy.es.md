---
title: Política de privacidad
description: Cómo trata Pad Code AI los proyectos locales, la IA, las descargas de paquetes, Git y GitHub, SSH y SFTP y las compras del App Store.
updated: '2026-11-22'
lang: es
---

## Información general

Pad Code AI es un editor de código y entorno de desarrollo para iPad y iPhone que da prioridad al procesamiento local. Esta política explica qué datos permanecen en el dispositivo y cuándo las funciones que usas se comunican con terceros.

## Recopilación de datos por el desarrollador

- La app no requiere una cuenta administrada por el desarrollador.
- No incluye herramientas de análisis, publicidad ni seguimiento de terceros, y no envía telemetría de uso a un servidor del desarrollador.
- No operamos un servidor que reciba tus proyectos ni tus conversaciones con IA. Si escribes a soporte, recibimos los datos que decidas incluir.
- Apple puede tratar información del App Store y de diagnóstico según los ajustes del dispositivo y sus políticas. Los servicios de red descritos a continuación pueden recibir los datos necesarios para proporcionar las funciones que usas.

## Código, archivos y ejecución local

Los proyectos y archivos de código permanecen en el almacenamiento de la app o en las carpetas que abras desde Archivos, salvo que elijas una función de red o de uso compartido. Los proveedores de almacenamiento que selecciones en Archivos pueden sincronizar las carpetas según sus políticas.

Los programas compatibles se compilan o interpretan y se ejecutan en el dispositivo dentro de un entorno aislado. La app no carga código fuente en servidores de compilación ni de ejecución. El entorno tiene acceso limitado al dispositivo y al sistema.

### Paquetes de Python

Al ejecutar código Python que importa un paquete adicional, la app puede descargarlo junto a sus dependencias desde la CDN de paquetes de Pyodide o Python Package Index (PyPI). Los programas que solo usan la biblioteca estándar no necesitan esas descargas. Los servicios de paquetes reciben los nombres de los paquetes y versiones solicitados y la información habitual de conexión, como tu dirección IP. La app analiza las importaciones localmente y no carga archivos de código en esos servicios para localizar paquetes. Las descargas necesitan conexión a internet y se rigen por las políticas de los servicios de paquetes.

### Vista previa web

La vista previa web usa WebKit para mostrar el HTML, CSS y JavaScript de navegador que elijas. El contenido puede solicitar imágenes, scripts u otros recursos remotos o comunicarse con servicios a los que haga referencia tu código. Esos servicios reciben los datos que tu contenido envíe. La compilación y ejecución locales son independientes de las conexiones que puedan hacer las vistas previas o las operaciones con paquetes.

## Asistente de IA opcional

En Ajustes decides si quieres usar IA y con qué modo:

- **Modelo compatible en el dispositivo.** Las instrucciones y el código se procesan en tu dispositivo. Puedes descargar modelos compatibles del sitio que los aloja o importar un archivo de modelo que elijas. El alojamiento recibe la solicitud del modelo y la información habitual de conexión. Los mensajes y el contenido del proyecto se procesan localmente en este modo.
- **Proveedor externo opcional.** Cuando envías un mensaje, la instrucción va directamente desde tu dispositivo al proveedor o punto de conexión compatible que hayas configurado, donde esté disponible en tu región del App Store. Se incluyen el contenido del archivo activo y los nombres de los archivos del proyecto según las opciones de uso compartido que actives. Si autorizas el acceso al proyecto para una tarea del agente, el contenido pertinente de los archivos y los resultados de herramientas también pueden incorporarse a la conversación de la tarea.

La app pide permiso antes de compartir datos con un proveedor remoto. Puedes cambiar las opciones o retirar el permiso en Ajustes. Los datos de IA en línea se envían al proveedor seleccionado y quedan sujetos a su política de privacidad, conservación y condiciones. El desarrollador no opera un servidor de IA para recibirlos. Si usas el acceso opcional a OpenRouter, ese servicio gestiona la autenticación y entrega una clave de API a la app.

## Git, GitHub y credenciales

Las funciones de Git se comunican directamente con el alojamiento compatible de repositorios HTTPS que elijas, incluido un alojamiento distinto de GitHub. Clonar, fetch y pull solicitan datos del repositorio. Con push subes los cambios registrados y los archivos que decidas publicar. La autenticación envía las credenciales que exige el alojamiento. Este recibe la información habitual de conexión y aplica sus políticas. Si accedes a GitHub desde Ajustes, GitHub gestiona la autorización y la app usa tu token para listar y abrir los repositorios a los que tu cuenta tiene acceso.

Las claves de API y los tokens de Git guardados se conservan en el llavero de iOS del dispositivo. La app los usa para los servicios configurados que los requieren. Mantén en privado las URL de repositorios y las credenciales. Conéctate solo a servicios en los que confíes.

## Servidores remotos mediante SSH y SFTP

Al conectarte a un servidor que configures, tu dispositivo envía directamente a ese servidor los mensajes de autenticación, la entrada de terminal y los archivos que decidas leer o escribir. Las direcciones, los nombres de usuario y las huellas de los servidores guardados permanecen en el dispositivo. Las contraseñas, claves privadas y frases de acceso guardadas se conservan en el llavero. La clave privada se usa en el dispositivo para autenticarte. La app puede conservar localmente cambios guardados en archivos remotos mientras no hay conexión y subirlos cuando el servidor vuelva a estar disponible. Los sistemas remotos pueden registrar accesos, comandos y archivos según sus políticas.

## Compras en el App Store

Las compras opcionales de Premium usan StoreKit de Apple. Apple procesa el pago y la restauración de compras. La app comprueba los derechos de acceso verificados para desbloquear herramientas avanzadas y consulta la tienda del App Store para conocer la disponibilidad regional. StoreKit puede contactar con Apple para cargar precios y actualizar compras o datos de la tienda, incluso fuera de una compra iniciada por ti. El desarrollador no recibe los datos de tu tarjeta de pago.

## Otras funciones de red

Al abrir enlaces de soporte, de la comunidad, a vídeos o al App Store, el navegador o la app correspondiente contacta con el servicio de destino. Si compartes o exportas un proyecto, solo se envía al destino que elijas. Esos servicios y destinos tienen sus propias políticas de privacidad.

## Privacidad de menores

La app no requiere un perfil personal ni incluye herramientas de publicidad o seguimiento para menores. Las mismas prácticas de almacenamiento local y servicios opcionales se aplican a todos los usuarios. Los servicios de terceros pueden tener políticas y requisitos propios de edad.

## Cambios en la política

Podemos actualizar esta política. Publicaremos los cambios en esta página con una fecha nueva.

## Contacto

Para consultas sobre esta política de privacidad, escribe a **contact@phamhungtien.com**.
