---
lang: es
title: Cómo depurar Python en el iPad con Pad Code AI
description: Pon un punto de interrupción, revisa las variables locales y ejecuta Python paso a paso en Pad Code AI para corregir un cálculo en el iPad.
published: 2026-11-23
app: padcodeai
topic: Pad Code AI
---

Un programa de Python puede terminar sin errores y aun así dar un resultado incorrecto. En este ejemplo, un descuento del 25 % sobre `80` debería dejar un total de `60.00`, pero el programa imprime `79.75`. Con el depurador de Pad Code AI podrás pausar la ejecución y ver en qué línea aparece el primer valor incorrecto. El ejemplo se ejecuta en el iPad con el entorno de Python integrado y no necesita paquetes adicionales.

## Reproduce el resultado incorrecto

Abre un proyecto local, crea `checkout.py`, pega el código siguiente y guarda el archivo. Si todavía no tienes un proyecto, consulta la [guía para ejecutar tu primer proyecto de Python en el iPad](/es/guides/run-python-on-ipad-pad-code-ai/).

```python
def checkout(subtotal, percent):
    discount = percent / 100
    total = subtotal - discount
    return total

print(f"{checkout(80, 25):.2f}")
```

Con `checkout.py` abierto, elige **Ejecutar › Ejecutar archivo activo** y confirma que `79.75` aparece en la terminal.

## Detén el programa y revisa las variables locales

1. Toca el número de línea junto a `total = subtotal - discount`. En el margen aparecerá la marca del punto de interrupción.
2. Vuelve a ejecutar el archivo activo. El editor resalta la línea y la terminal muestra que el programa está en pausa. Python se ha detenido justo antes de ejecutar la instrucción resaltada.
3. En **Locales**, busca `subtotal = 80`, `percent = 25` y `discount = 0.25`. El valor `0.25` expresa la proporción del descuento. La línea siguiente resta ese valor como si fuera el importe que hay que descontar.
4. Toca **Paso a paso por encima** para ejecutar la resta y detenerte en `return total`. Ahora verás `total = 79.75`. En una ventana estrecha, el control se reconoce por la flecha acodada hacia la derecha. Si la lista de variables está plegada, toca la flecha de la cabecera del depurador para abrirla.

## Prueba la fórmula y comprueba la corrección

En Pad Code AI 3.0 puedes probar una expresión mientras la ejecución está detenida dentro de `checkout`. En la sección **Inspección**, escribe `subtotal * percent / 100` en **Añadir expresión** y confirma. El depurador usa los valores del punto de interrupción y muestra `20.0`.

Toca **Continuar** para terminar la ejecución. Retira el punto de interrupción tocando el mismo número de línea y cambia el cálculo del descuento a `discount = subtotal * percent / 100`. Guarda el archivo y ejecútalo de nuevo. Debería aparecer `60.00`. Para comprobar otro caso, modifica la llamada a `checkout(120, 10)` y verifica que el resultado sea `108.00`.

Si el programa pasa de largo, comprueba que `checkout.py` sea el archivo activo y que el punto de interrupción esté en una línea ejecutable. En un proyecto más grande, la pila de llamadas te permite localizar la llamada a una función cuando se muestran varios marcos. Puedes consultar otras herramientas de desarrollo local en la [página de Pad Code AI](/es/PadCodeAI/).
