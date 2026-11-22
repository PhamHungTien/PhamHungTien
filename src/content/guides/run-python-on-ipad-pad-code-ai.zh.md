---
lang: zh
title: 用 Pad Code AI 在 iPad 上运行第一个 Python 项目
description: 在 iPad 或 iPhone 的 Pad Code AI 中创建本地 Python 项目，运行标准库示例、修复语法错误，并预览和保存程序生成的文本文件。
published: 2026-11-22
app: padcodeai
topic: Pad Code AI
---

[Pad Code AI](/zh/PadCodeAI/) 内置 Python 运行环境，因此可以在 iPad 或 iPhone 上直接运行代码。先用 Python 标准库写一个小程序。它会计算阅读时长，并生成一个可在保存前检查的文本文件。

![Pad Code AI 在 iPad 上的代码编辑器](../../assets/apps/padcodeai/store/en/ipad-02.webp)

## 创建本地项目

1. 在应用首页选择**新建项目**，命名为 `Reading Log` 或其他你喜欢的名称。
2. 选择空项目，将其保存到可通过「文件」应用访问的文件夹。如果要离线使用，请选择设备上的本地文件夹。
3. 使用**新建文件**创建 `main.py`。如果选择的 Python 模板已包含该文件，直接打开它。

## 运行 Python 文件

将下面的代码输入 `main.py` 并保存。

```python
from pathlib import Path

minutes = [18, 25, 12]
total = sum(minutes)
report = f"阅读总时长：{total} 分钟\n"
print(report, end="")
Path("reading-log.txt").write_text(report, encoding="utf-8")
```

打开该文件，轻点**运行**，确认输出显示 `阅读总时长：55 分钟`。如果项目设置了其他运行入口，可打开 Pad Code AI 的本地终端，在项目目录运行 `python3 main.py`。

## 检查和保存生成的文件

运行环境使用项目的副本。程序执行后，打开**查看并存储**预览 `reading-log.txt`。选中文件即可将其保存到项目。修改列表中的数字并再次运行，在覆盖原文件前确认新结果。

## 定位和修复语法错误

删去 `minutes = [18, 25, 12]` 最后的方括号，保存后再次运行。轻点输出中的诊断信息，返回报错位置。补回方括号，保存并运行以确认代码恢复正常。如果需要排查运行时错误，可轻点 Python 文件的行号设置断点，执行暂停后查看变量的值。

这个标准库示例无需额外下载依赖包。某些 Python 扩展包在首次使用时需要联网。有关可选的联网操作，请参阅 [Pad Code AI 隐私政策](/zh/PadCodeAI/privacy.html)。也可查看 [Pad Code AI](/zh/PadCodeAI/) 支持的其他运行环境和工具。
