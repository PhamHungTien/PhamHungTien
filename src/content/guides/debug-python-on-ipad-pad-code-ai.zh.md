---
lang: zh
title: 用 Pad Code AI 在 iPad 上设置断点并调试 Python
description: 在 iPad 上使用 Pad Code AI 暂停 Python 程序、查看局部变量并单步执行，通过一个折扣计算示例定位错误并验证修正结果。
published: 2026-11-23
app: padcodeai
topic: Pad Code AI
---

Python 程序正常运行到结束，计算结果也有可能出错。在这个示例中，原价 `80` 打七五折后应为 `60.00`，程序却输出 `79.75`。接下来用 Pad Code AI 的 Python 调试器暂停程序，找出是哪一步算错了。示例使用应用内置的 Python 运行环境，可直接在 iPad 上运行，无需安装额外的包。

## 复现错误结果

打开一个保存在设备上的项目，新建 `checkout.py`，把下面的代码粘贴进去并保存。如果还没有项目，可以先看[如何在 iPad 上运行第一个 Python 项目](/zh/guides/run-python-on-ipad-pad-code-ai/)。

```python
def checkout(subtotal, percent):
    discount = percent / 100
    total = subtotal - discount
    return total

print(f"{checkout(80, 25):.2f}")
```

打开 `checkout.py`，选择**运行 › 运行当前文件**，确认终端输出 `79.75`。

## 在断点处暂停并查看局部变量

1. 点按 `total = subtotal - discount` 左侧的行号。编辑器左侧会显示断点标记。
2. 再次运行当前文件。编辑器会高亮断点所在的行，终端会显示已暂停。Python 此时刚到达高亮行，即将执行这一行。
3. 在**局部**中查看 `subtotal = 80`、`percent = 25` 和 `discount = 0.25`。`0.25` 是折扣比例，下一行却把它当作了要减去的金额。
4. 点按**单步跳过**，执行减法并在 `return total` 处暂停。这时会显示 `total = 79.75`。窗口较窄时，可以通过向右转弯的箭头找到该按钮。如果变量列表已折叠，点按调试面板顶部的小箭头即可展开。

## 检查公式并验证修正结果

在 Pad Code AI 3.0 中，程序暂停在 `checkout` 函数内时，可以在**监视**区的**添加表达式**框中输入 `subtotal * percent / 100` 并提交。调试器会用当前的局部变量求值，显示 `20.0`。

点按**继续**让程序运行结束。再次点按行号移除断点，并将计算折扣金额的那行改为 `discount = subtotal * percent / 100`。保存并重新运行后，输出应为 `60.00`。还可以将调用改为 `checkout(120, 10)`，再运行一次，确认结果为 `108.00`。

如果程序经过断点却没有暂停，请确认 `checkout.py` 是当前运行的文件，且断点设在可执行的代码行上。在较大的项目中，如果调试器显示多个栈帧，可以用调用栈找到函数从哪里被调用。更多本地开发功能请见 [Pad Code AI 产品页](/zh/PadCodeAI/)。
