---
lang: es
title: Cómo convertir texto vietnamita de TCVN3 o VNI a Unicode
description: Reconoce las codificaciones vietnamitas TCVN3, VNI Windows y CP1258, distingue las formas Unicode y convierte documentos antiguos con PHTV para Mac.
published: 2026-11-22
app: phtv
topic: Escritura en vietnamita
---

Si un documento antiguo muestra «TiÕng ViÖt» o «Tieáng Vieät», quizá dependa de otra codificación o fuente. Identifica la codificación original antes de convertir una copia a Unicode. Puedes usar el conversor de [PHTV para Mac](/es/PHTV/).

## Qué codificaciones puedes encontrar

Una codificación asigna números a caracteres. Algunos estándares vietnamitas antiguos asignaban a letras acentuadas números con otro significado en sistemas distintos. Si el documento pierde la información sobre la fuente o la codificación, un editor moderno puede mostrar signos inesperados.

| Codificación              | Cómo reconocerla                                                         | Uso habitual                                              |
| ------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------- |
| **Unicode precompuesto**  | Una letra acentuada como ệ puede ocupar un punto de código               | Web, aplicaciones y documentos modernos                   |
| **Unicode descompuesto**  | La letra base y los signos combinantes tienen puntos de código separados | Texto copiado entre sistemas y algunos nombres de archivo |
| **TCVN3 (ABC)**           | Fuentes que empiezan por `.Vn`, como `.VnTime`                           | Documentos administrativos y educativos antiguos          |
| **VNI Windows**           | Fuentes como `VNI-Times` y secuencias como «Tieáng Vieät»                | Documentación anterior y archivos de diseño               |
| **Windows-1258 (CP1258)** | Página de códigos vietnamita de Windows con signos combinantes           | Aplicaciones antiguas de Windows y exportaciones de datos |

Para documentos nuevos, elige Unicode. La **codificación VNI Windows** y el **método de entrada VNI** son opciones independientes. Puedes usar VNI con texto Unicode.

## Por qué cambian o desaparecen los signos

1. Si falta una fuente antigua como `.VnTime`, el editor puede sustituirla por otra, que interpreta esos códigos de manera distinta.
2. PHTV puede tener activado TCVN3 o VNI Windows mientras el editor espera Unicode.
3. Dos cadenas Unicode con apariencia idéntica pueden tener secuencias diferentes. El software que compara las secuencias directamente puede perder una coincidencia de búsqueda o ver dos nombres de archivo distintos.

## Selecciona la codificación en PHTV

En **Ajustes › Entrada › Codificación**, elige **Unicode** para escribir a diario. Si vas a seguir editando un documento que depende de TCVN3 o VNI Windows, selecciona la codificación original. Para una aplicación antigua que uses con frecuencia, puedes activar el ajuste de codificación por aplicación en **Ajustes › Apps**.

![Opciones de codificación de PHTV con la interfaz en vietnamita](../../assets/guides/phtv-cai-dat-bo-go.webp)

## Convierte una copia de prueba

1. Haz una copia del documento y copia un fragmento afectado con <kbd>⌘</kbd> + <kbd>C</kbd>.
2. Abre el **conversor de codificación** desde las herramientas o los ajustes de PHTV.
3. Elige la codificación de origen y **Unicode** como destino. Convierte el contenido del portapapeles.
4. Pega con <kbd>⌘</kbd> + <kbd>V</kbd> y usa una fuente Unicode, por ejemplo Times New Roman, Arial o Helvetica.
5. Revisa mayúsculas, minúsculas y tonos antes de convertir el resto. «TiÕng ViÖt» suele ser TCVN3 y «Tieáng Vieät», VNI Windows.

Si el texto copiado no se recupera, vuelve a abrir el documento con su fuente o codificación original y prueba de nuevo.

## Unicode precompuesto, descompuesto y NFC

La letra **ệ** se puede representar como `U+1EC7`, o con `e` y los signos combinantes de punto inferior y circunflejo. Tienen el mismo aspecto y secuencias distintas. Si programas y necesitas comparar texto vietnamita de forma fiable, normaliza ambas cadenas a la misma forma, como NFC. [Especificación de normalización Unicode](https://www.unicode.org/reports/tr15/)

Si ya usas Unicode y se pierden las tildes al escribir, consulta [cómo corregir problemas de escritura en Mac](/es/guides/sua-loi-go-tieng-viet-tren-mac/).
