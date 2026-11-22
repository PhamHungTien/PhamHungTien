---
lang: es
title: Cómo escribir en vietnamita con Telex y colocar las tildes
description: Consulta las teclas de Telex para las letras y los tonos del vietnamita. Aprende a corregir signos y a escribir người, được o Nguyễn con PHTV en Mac.
published: 2026-11-22
app: phtv
topic: Escritura en vietnamita
---

Telex usa letras para escribir los signos del vietnamita. Escribe la letra base y usa una tecla adicional para cambiar su forma o añadir un tono. Los ejemplos de esta guía se pueden practicar con [PHTV para Mac](/es/PHTV/). Las combinaciones básicas también funcionan en muchos otros teclados Telex.

## Combinaciones para â, ă, ê, ô, ơ, ư y đ

| Teclea | Resultado | Ejemplo  | Salida |
| ------ | --------- | -------- | ------ |
| `aa`   | â         | `caan`   | cân    |
| `aw`   | ă         | `awn`    | ăn     |
| `ee`   | ê         | `ddeem`  | đêm    |
| `oo`   | ô         | `coo`    | cô     |
| `ow`   | ơ         | `mow`    | mơ     |
| `uw`   | ư         | `tuw`    | tư     |
| `uow`  | ươ        | `nuowcs` | nước   |
| `dd`   | đ         | `ddi`    | đi     |

En el modo Telex estándar de PHTV, `w` por sí sola también puede dar `ư`, como en `nhwng` → **nhưng**. `[` y `]` pueden insertar `ơ` y `ư`. Las variantes Simple Telex cambian estos atajos.

## Tonos

| Tecla | Tono vietnamita | Teclea | Resultado |
| ----- | --------------- | ------ | --------- |
| `s`   | sắc             | `bas`  | bá        |
| `f`   | huyền           | `baf`  | bà        |
| `r`   | hỏi             | `bar`  | bả        |
| `x`   | ngã             | `bax`  | bã        |
| `j`   | nặng            | `baj`  | bạ        |
| `z`   | quitar tono     | `basz` | ba        |

Puedes introducir el tono antes de la consonante final o al final de la sílaba. Tanto `vieejt` como `vieetj` dan **việt**. El método de entrada pone la marca en la vocal correspondiente.

## Palabras para practicar

| Palabra | Teclea     | Qué cambia                            |
| ------- | ---------- | ------------------------------------- |
| người   | `nguowif`  | `uow` da ươ y `f` añade huyền         |
| được    | `dduwowcj` | `dd` da đ y `j` añade nặng a ươ       |
| trường  | `truowngf` | `f` pone huyền en ơ                   |
| khuyến  | `khuyeens` | `ee` da ê y `s` añade sắc             |
| Nguyễn  | `Nguyeexn` | `ee` da ê y `x` añade ngã             |
| thuở    | `thuowr`   | `w` modifica la vocal y `r` añade hỏi |
| quốc    | `quoocs`   | `oo` da ô y `s` añade sắc             |

## Corrige un tono o recupera las letras originales

- Pulsa otra tecla de tono para sustituirlo. `bas` seguido de `f` da **bà**.
- Introduce `z` para quitar el tono. `basz` da **ba**.
- Repite una tecla de transformación para recuperarla como letra literal. `ass` da **as** y `aaa` da **aa**.
- Pulsa <kbd>Esc</kbd> para recuperar las pulsaciones originales de la palabra actual. Puedes cambiar ese atajo en **Ajustes › Atajos**.

Dos convenciones sitúan la marca tonal de manera distinta en grupos como **oa**, **oe** y **uy**. Por ejemplo, verás **hòa, khỏe, thúy** o **hoà, khoẻ, thuý**. En PHTV, la opción de ortografía moderna en **Ajustes › Entrada** cambia la colocación sin cambiar las teclas que pulsas. Elige la convención de tu documento.

## Atajos de consonantes

En **Ajustes › Entrada**, activa **Quick Telex** si quieres escribir determinados grupos consonánticos pulsando dos veces la misma tecla.

| Teclea | Resultado | Teclea | Resultado |
| ------ | --------- | ------ | --------- |
| `cc`   | ch        | `nn`   | ng        |
| `gg`   | gi        | `pp`   | ph        |
| `kk`   | kh        | `qq`   | qu        |
| `tt`   | th        |        |           |

PHTV también permite acortar consonantes iniciales y finales. Al principio de la sílaba, `f`, `j` y `w` pueden dar `ph`, `gi` y `qu`. Al final, `g`, `h` y `k` pueden dar `ng`, `nh` y `ch`. Estas opciones vienen desactivadas. Prueba una a una para saber cuál cambia lo que escribes.

## Alterna entre vietnamita e inglés

| Variante       | `w` sola da ư | `[` y `]` dan ơ y ư |
| -------------- | ------------- | ------------------- |
| Telex          | Sí            | Sí                  |
| Simple Telex 1 | No            | No                  |
| Simple Telex 2 | Sí            | No                  |

Las tres variantes conservan `aw`, `ow` y `uw`. Simple Telex 1 puede venir bien si escribes código y usas `w` o corchetes con frecuencia. PHTV puede recuperar palabras inglesas reconocidas al pulsar espacio. Para escribir un fragmento más largo en inglés, cambia de modo con <kbd>Control</kbd> + <kbd>Mayús</kbd> si usas el atajo predeterminado. También puedes configurar un editor concreto en **Ajustes › Apps**.

## Prueba con estas dos frases

```text
Dduwowngf ddi khoong khos vif ngawn soong cachs nuis
Truowngf Vieejt Nam ddepj nhaast nawm nay
```

Obtendrás «Đường đi không khó vì ngăn sông cách núi» y «Trường Việt Nam đẹp nhất năm nay». Si prefieres usar números, consulta la [tabla de escritura VNI](/es/guides/cach-go-vni-telex-hay-vni/).
