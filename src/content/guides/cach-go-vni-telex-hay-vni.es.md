---
lang: es
title: Tabla de escritura VNI y diferencias con Telex
description: Aprende a escribir los tonos y las letras vietnamitas con las teclas numéricas de VNI y elige entre VNI y Telex al usar PHTV en Mac.
published: 2026-11-22
app: phtv
topic: Escritura en vietnamita
---

VNI usa números para añadir los signos vietnamitas. Por eso puedes seguir escribiendo letras como `s` y `f` en palabras inglesas mientras el modo está activo. Cambia entre VNI y Telex en [PHTV para Mac](/es/PHTV/) sin cambiar el formato Unicode del texto resultante.

## Teclas para los tonos

| Tecla | Tono  | Teclea | Resultado |
| ----- | ----- | ------ | --------- |
| `1`   | sắc   | `ba1`  | bá        |
| `2`   | huyền | `ba2`  | bà        |
| `3`   | hỏi   | `ba3`  | bả        |
| `4`   | ngã   | `ba4`  | bã        |
| `5`   | nặng  | `ba5`  | bạ        |

## Teclas para cambiar las letras

| Tecla | Efecto      | Teclea           | Resultado |
| ----- | ----------- | ---------------- | --------- |
| `6`   | Circunflejo | `a6`, `e6`, `o6` | â, ê, ô   |
| `7`   | Cuerno      | `o7`, `u7`       | ơ, ư      |
| `8`   | Breve       | `a8`             | ă         |
| `9`   | Barra       | `d9`             | đ         |

El método de entrada coloca la marca en la vocal que corresponde. Puedes teclear `Vie65t` para introducirlas junto a `e` o `Viet65` para añadirlas al final. El resultado es **Việt**.

## Palabras de práctica

| Palabra | Teclea      | Qué cambia                             |
| ------- | ----------- | -------------------------------------- |
| người   | `ngu7o72i`  | `u7` y `o7` dan ươ y `2` añade huyền   |
| được    | `d9u7o7c5`  | `d9` da đ y `5` añade nặng             |
| trường  | `tru7o7ng2` | `2` añade huyền al terminar las letras |
| khuyến  | `khuye6n1`  | `6` da ê y `1` añade sắc               |
| Nguyễn  | `Nguye64n`  | `6` da ê y `4` añade ngã               |
| năm     | `na8m`      | `8` da ă                               |

PHTV también interpreta `uo7` como **ươ**. `nguo72i` produce **người** con menos pulsaciones.

## Corrige un tono o escribe un número literal

- Pulsa otra tecla de tono para sustituirlo. `ba1` seguido de `2` da **bà**.
- Repite el número para recuperarlo después de aplicar un tono. `a11` deja **a1** y `A44` deja **A4**.
- Pulsa <kbd>Esc</kbd> para recuperar las pulsaciones de toda la palabra si conservas el atajo predeterminado.
- Si vas a escribir varios códigos alfanuméricos, cambia a inglés temporalmente. El atajo predeterminado de PHTV es <kbd>Control</kbd> + <kbd>Mayús</kbd>.

## Cuándo elegir VNI o Telex

|                             | VNI                                               | Telex                                                  |
| --------------------------- | ------------------------------------------------- | ------------------------------------------------------ |
| Teclas para las marcas      | Números del `1` al `9`                            | Letras como `s`, `f`, `r`, `x`, `j` y `w`              |
| Textos largos en vietnamita | Las marcas se escriben en la fila numérica        | Puedes mantener las manos sobre las filas de letras    |
| Texto mixto                 | La mayoría de palabras inglesas pasan sin cambios | Algunas palabras inglesas pueden requerir restauración |
| Códigos como `A4`           | El dígito puede interpretarse como tono           | Los números se escriben normalmente                    |

Prueba VNI si prefieres una tecla numérica por tono o alternas a menudo entre vietnamita e inglés. Prueba Telex si escribes textos largos en vietnamita y prefieres usar las filas de letras. Puedes cambiar desde la barra de menús o desde **Ajustes › Entrada › Método de entrada**.

![Ajustes de entrada de PHTV con la interfaz en vietnamita](../../assets/guides/phtv-cai-dat-bo-go.webp)

## Escribe una frase completa

```text
Ho5c ta65p kho6ng bao gio72 la2 muo65n
```

Obtendrás «Học tập không bao giờ là muộn». Para probar con letras, consulta la [tabla de escritura Telex](/es/guides/bang-go-telex-day-du/).
