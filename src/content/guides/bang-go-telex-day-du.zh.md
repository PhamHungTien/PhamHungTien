---
lang: zh
title: 越南语 Telex 键位表与声调位置
description: 查阅越南语 Telex 字母键与声调键，了解如何修正声调，并在 Mac 的 PHTV 中练习输入 người、được 和 Nguyễn 等词。
published: 2026-11-22
app: phtv
topic: 越南语输入
---

Telex 用字母键输入越南语的变音和声调符号。先输入基本字母，再按对应字母改变字形或标上声调。以下以 [Mac 上的 PHTV](/zh/PHTV/) 为例，基本键位也适用于许多其他 Telex 输入法。

## 输入 â、ă、ê、ô、ơ、ư 和 đ

| 输入  | 字母 | 示例输入 | 输出 |
| ----- | ---- | -------- | ---- |
| `aa`  | â    | `caan`   | cân  |
| `aw`  | ă    | `awn`    | ăn   |
| `ee`  | ê    | `ddeem`  | đêm  |
| `oo`  | ô    | `coo`    | cô   |
| `ow`  | ơ    | `mow`    | mơ   |
| `uw`  | ư    | `tuw`    | tư   |
| `uow` | ươ   | `nuowcs` | nước |
| `dd`  | đ    | `ddi`    | đi   |

在 PHTV 的标准 Telex 中，`w` 也可以单独生成 `ư`，如 `nhwng` → **nhưng**。`[` 和 `]` 分别可插入 `ơ` 和 `ư`。简易 Telex 布局的快捷键用法有所不同。

## 声调键

| 按键 | 越南语声调 | 输入   | 输出 |
| ---- | ---------- | ------ | ---- |
| `s`  | sắc        | `bas`  | bá   |
| `f`  | huyền      | `baf`  | bà   |
| `r`  | hỏi        | `bar`  | bả   |
| `x`  | ngã        | `bax`  | bã   |
| `j`  | nặng       | `baj`  | bạ   |
| `z`  | 去除声调   | `basz` | ba   |

声调键可以放在韵尾辅音前，也可在音节最后输入。比如 `vieejt` 和 `vieetj` 都得到 **việt**。输入法会自动选择应加声调的元音。

## 常见词练习

| 单词   | 输入       | 变化                           |
| ------ | ---------- | ------------------------------ |
| người  | `nguowif`  | `uow` 生成 ươ，`f` 加 huyền    |
| được   | `dduwowcj` | `dd` 生成 đ，`j` 为 ươ 加 nặng |
| trường | `truowngf` | `f` 在 ơ 上加 huyền            |
| khuyến | `khuyeens` | `ee` 生成 ê，`s` 加 sắc        |
| Nguyễn | `Nguyeexn` | `ee` 生成 ê，`x` 加 ngã        |
| thuở   | `thuowr`   | `w` 改变元音，`r` 加 hỏi       |
| quốc   | `quoocs`   | `oo` 生成 ô，`s` 加 sắc        |

## 修正声调或恢复最初输入

- 按另一个声调键替换现有声调。输入 `bas` 再按 `f` 得到 **bà**。
- 按 `z` 去除声调，如 `basz` 得到 **ba**。
- 重复按键可恢复字面字符，如 `ass` 得到 **as**、`aaa` 得到 **aa**。
- 在 PHTV 中，按 <kbd>Esc</kbd> 可恢复当前单词的原始按键。如果 Esc 已用于别的应用，可在**设置 › 快捷键**中更改恢复键。

## 选择声调标记位置

在 **oa**、**oe** 和 **uy** 等元音组合中，有两种标记声调的规范。比如 **hòa、khỏe、thúy** 和 **hoà、khoẻ、thuý**，按键输入完全相同。PHTV 的**设置 › 输入 › 现代正字法**可切换声调的显示位置。请按文档采用的规范选择。

## 可选的辅音快捷键

在**设置 › 输入**中开启**快速 Telex** 后，连续输入两个相同辅音可生成辅音组合。

| 输入 | 输出 | 输入 | 输出 |
| ---- | ---- | ---- | ---- |
| `cc` | ch   | `nn` | ng   |
| `gg` | gi   | `pp` | ph   |
| `kk` | kh   | `qq` | qu   |
| `tt` | th   |      |      |

PHTV 还可快速转换声母和韵尾。音节开头的 `f`、`j`、`w` 可分别变成 `ph`、`gi`、`qu`。末尾的 `g`、`h`、`k` 可变成 `ng`、`nh`、`ch`。这些选项默认关闭，建议分开试用，便于判断输入变化来自哪一项。

## 在同一应用输入越南语和英语

| PHTV 布局    | `w` 单独生成 ư | `[` 和 `]` 生成 ơ、ư |
| ------------ | -------------- | -------------------- |
| Telex        | 是             | 是                   |
| 简易 Telex 1 | 否             | 否                   |
| 简易 Telex 2 | 是             | 否                   |

三种布局均支持 `aw`、`ow` 和 `uw`。如果写代码时常单独输入 `w` 和方括号，可以试试简易 Telex 1。

有些英文单词含 Telex 用作声调的字母。PHTV 能在按空格时还原已识别的英文单词。输入较长的英文段落时，可用默认的 <kbd>Control</kbd> + <kbd>Shift</kbd> 切换到英语模式。对于常用的编辑器或终端，也可在**设置 › 应用**中设置单独行为。

## 输入两句话

```text
Dduwowngf ddi khoong khos vif ngawn soong cachs nuis
Truowngf Vieejt Nam ddepj nhaast nawm nay
```

结果分别是「Đường đi không khó vì ngăn sông cách núi」和「Trường Việt Nam đẹp nhất năm nay」。如果更习惯用数字键，可试试 [VNI 键位表](/zh/guides/cach-go-vni-telex-hay-vni/)。
