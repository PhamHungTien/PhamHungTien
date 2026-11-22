---
lang: es
title: Cómo acceder a tu NAS Synology a distancia desde iPhone o iPad
description: Compara QuickConnect, DDNS y VPN para un NAS Synology, protege el acceso a DSM y conecta tu iPhone o iPad con My NAS Manager.
published: 2026-11-22
app: mynasmanager
topic: My NAS Manager
---

Un NAS Synology reúne fotos y documentos en un solo lugar. Si necesitas acceder desde fuera de casa, elige una conexión que proteja también esos archivos. Aquí puedes comparar QuickConnect, DDNS y VPN y configurar el acceso en [My NAS Manager](/es/MyNASManager/) para iPhone y iPad.

## Comprueba la dirección y los puertos de DSM

En casa, DSM suele estar en una dirección privada como `192.168.1.10`. Sus puertos habituales son **5000** para HTTP y **5001** para HTTPS. Una dirección `192.168.x.x` se alcanza desde la red local o mediante una ruta privada hacia esa red. [Documentación de los puertos de DSM](https://kb.synology.com/en-global/DSM/help/DSM/AdminCenter/system_login_portal_dsm)

## QuickConnect, DDNS o VPN

### QuickConnect

QuickConnect identifica el NAS con un ID, por ejemplo en `quickconnect.to/tu-nombre`. Las aplicaciones compatibles pueden localizarlo sin que tengas que abrir manualmente puertos en el router. Si la conexión directa falla, el tráfico puede pasar por un servidor de retransmisión de Synology, lo que a veces reduce la velocidad de las transferencias grandes. Algunas aplicaciones de terceros requieren una dirección de DSM alcanzable directamente.

### DDNS

El DNS dinámico asocia un nombre, como `tu-nas.synology.me`, con una dirección pública que puede cambiar. DSM permite configurar el servicio en **Panel de control › Acceso externo › DDNS**. El nombre por sí solo no crea una ruta al NAS; redirigir un puerto público al servicio de administración expone DSM a intentos de conexión desde internet. Con CGNAT, la redirección habitual puede no funcionar. Comprueba el tipo de conexión con tu proveedor si tienes dudas.

### VPN

Una VPN crea una ruta privada hacia tu NAS y evita publicar el puerto de administración de DSM. Con Tailscale puedes usar la dirección que el servicio asigna al NAS. Para usar su IP habitual de la red doméstica, hace falta configurar el enrutamiento de subred. Según el equipo, también puedes usar un servicio VPN de Synology o el de tu router. Restringe el acceso de la VPN a las cuentas y los dispositivos necesarios. [Guía de Tailscale para Synology](https://tailscale.com/docs/integrations/synology)

| Necesidad                                                              | Opción                                         |
| ---------------------------------------------------------------------- | ---------------------------------------------- |
| Consulta ocasional de fotos o archivos en aplicaciones compatibles     | QuickConnect                                   |
| Administración, archivos o aplicaciones que necesitan la dirección DSM | VPN o Tailscale                                |
| Nombre público para un servicio protegido                              | DDNS y la configuración de red que corresponda |

## Protege DSM antes de conectarte desde fuera

1. Crea y comprueba otra cuenta de administrador antes de desactivar la cuenta `admin` predeterminada.
2. Usa contraseñas largas y únicas, y activa la autenticación de dos factores en las cuentas administrativas.
3. Activa **Bloqueo automático** para limitar intentos repetidos de acceso.
4. Usa HTTPS y un certificado de confianza válido para el nombre con el que te conectas.
5. Revisa el cortafuegos, los puertos abiertos y el mapeo automático de puertos. Mantén DSM y SSH en una red privada siempre que sea posible.
6. Actualiza DSM y sus paquetes. Conserva una copia de seguridad separada. RAID protege ante determinados fallos de disco y la copia te permite recuperar archivos borrados o dañados.

[Recomendaciones de seguridad de Synology](https://kb.synology.com/en-us/DSM/tutorial/How_to_add_extra_security_to_your_Synology_NAS)

## Conecta My NAS Manager con tu NAS

La aplicación admite NAS Synology con **DSM 7 o posterior**. Cuando estés fuera de casa, activa la VPN antes de abrir la conexión. Indica la **IP o el nombre DNS del NAS** que sea alcanzable en esa red y el **puerto DSM** correspondiente. Activa **HTTPS** y utiliza `5001` si DSM conserva su puerto seguro predeterminado.

Introduce el usuario y la contraseña de una cuenta con los permisos justos para la tarea. Si DSM exige dos factores, completa el código de un solo uso cuando se solicite. Si activas la opción de recordar la sesión, la aplicación la conserva en el llavero de Apple.

## Comprueba por qué falla una conexión

| Problema                 | Qué revisar                                                      |
| ------------------------ | ---------------------------------------------------------------- |
| No se puede alcanzar DSM | Dirección, puerto, VPN, HTTPS y reglas del cortafuegos           |
| DSM rechaza el acceso    | Usuario, contraseña, código de dos factores y bloqueo automático |
| Certificado no fiable    | Nombre del servidor, caducidad y cadena del certificado          |
| Dirección no válida      | Espacios, errores de escritura y formato del puerto              |

Cuando puedas entrar, usa la vista general para revisar CPU, memoria, discos y almacenamiento. Con los permisos correspondientes puedes explorar carpetas, transferir archivos y gestionar paquetes instalados. Si usas las funciones de SSH, desactiva el servicio cuando hayas terminado. Consulta [las funciones de My NAS Manager](/es/MyNASManager/).
