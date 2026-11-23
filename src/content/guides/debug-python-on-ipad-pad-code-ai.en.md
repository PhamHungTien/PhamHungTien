---
lang: en
title: Debug Python on iPad with breakpoints in Pad Code AI
description: Use Pad Code AI to pause a Python script on iPad, inspect local variables, step through a calculation and verify a fix for an incorrect discount.
published: 2026-11-23
app: padcodeai
topic: Pad Code AI
---

A Python script can finish successfully and still give the wrong answer. In this exercise, a price calculator prints `79.75` when a 25% discount on `80` should leave `60.00`. Use the Python debugger in Pad Code AI to pause the program and see where the value first goes wrong. The exercise uses the bundled Python runtime on your iPad and needs no additional packages.

## Reproduce the incorrect result

Open a local project, create `checkout.py` and save the code below. If you need to set up a project, start with the [guide to running your first Python project on iPad](/guides/run-python-on-ipad-pad-code-ai/).

```python
def checkout(subtotal, percent):
    discount = percent / 100
    total = subtotal - discount
    return total

print(f"{checkout(80, 25):.2f}")
```

With `checkout.py` open, tap **Run › Run Active File** and confirm that the terminal shows `79.75`.

## Set a breakpoint and inspect local variables

1. Tap the line number next to `total = subtotal - discount`. A marker appears in the gutter.
2. Run the active file again. The editor highlights the breakpoint and the terminal shows the paused program. Python has reached the highlighted line and is about to execute it.
3. In **Locals**, look for `subtotal = 80`, `percent = 25` and `discount = 0.25`. The value `0.25` is the rate as a fraction. The next line subtracts it as an amount.
4. Tap **Step Over** to execute the subtraction and pause at `return total`. Now `total = 79.75` appears. On a narrow window, look for the bent arrow pointing right. If the variable list is collapsed, tap the chevron in the debugger header to expand it.

## Check the formula and verify the fix

In Pad Code AI 3.0, while the program is paused inside `checkout`, you can enter `subtotal * percent / 100` in the **Add Expression** field under **Watch** and submit it. The debugger evaluates the expression with the current local values and shows `20.0`.

Tap **Continue** to finish the run. Remove the breakpoint by tapping the same line number, then replace the discount line with `discount = subtotal * percent / 100`. Save and run the file again. The output should now be `60.00`. For a second check, change the call to `checkout(120, 10)` and run again. The output should be `108.00`.

If the program runs past a breakpoint, check that `checkout.py` is the active file and that the marker is on an executable line. To inspect the caller of a function in a larger project, use **Call Stack** when the debugger shows more than one frame. Explore other local coding tools on the [Pad Code AI page](/PadCodeAI/).
