---
lang: en
title: 'VNI typing chart and how to choose between VNI and Telex'
description: Learn which number keys add Vietnamese letters and tones in VNI, practice common words, and compare VNI with Telex when typing on Mac.
published: 2026-11-22
app: phtv
topic: Vietnamese typing
---

VNI uses number keys to add Vietnamese accents. This lets you type ordinary English words without using letters such as `s` and `f` as accent controls. You can switch between VNI and Telex in [PHTV for Mac](/en/PHTV/) without changing the Unicode text you produce.

## VNI tone keys

| Key | Tone  | Type  | Result |
| --- | ----- | ----- | ------ |
| `1` | sắc   | `ba1` | bá     |
| `2` | huyền | `ba2` | bà     |
| `3` | hỏi   | `ba3` | bả     |
| `4` | ngã   | `ba4` | bã     |
| `5` | nặng  | `ba5` | bạ     |

## Numbers for changing letter shapes

| Key | Effect     | Type             | Result  |
| --- | ---------- | ---------------- | ------- |
| `6` | Circumflex | `a6`, `e6`, `o6` | â, ê, ô |
| `7` | Horn       | `o7`, `u7`       | ơ, ư    |
| `8` | Breve      | `a8`             | ă       |
| `9` | Stroke     | `d9`             | đ       |

The input method places the accent on the appropriate vowel. You can type `Vie65t` with the accents next to `e`, or `Viet65` with both number keys at the end. Both produce **Việt**.

## Practice these words

| Word   | Type        | What changes                                  |
| ------ | ----------- | --------------------------------------------- |
| người  | `ngu7o72i`  | `u7` and `o7` produce ươ, and `2` adds huyền  |
| được   | `d9u7o7c5`  | `d9` produces đ, and `5` adds nặng            |
| trường | `tru7o7ng2` | `2` places huyền after you finish the letters |
| khuyến | `khuye6n1`  | `6` produces ê, and `1` adds sắc              |
| Nguyễn | `Nguye64n`  | `6` produces ê, and `4` adds ngã              |
| năm    | `na8m`      | `8` produces ă                                |

PHTV also interprets `uo7` as **ươ**, so `nguo72i` gives **người** with fewer keystrokes.

## Fix a tone or type a literal number

- Press another tone number to replace a tone. Type `ba1` followed by `2` to get **bà**.
- Press a number twice to recover the literal digit after it was used as a tone. For example, `a11` gives **a1**, and `A44` gives **A4**.
- In PHTV, press <kbd>Esc</kbd> to restore the input for the whole word if you use the default restore shortcut.
- When typing several mixed letter-and-number codes, switch temporarily to English. The default PHTV shortcut is <kbd>Control</kbd> + <kbd>Shift</kbd>.

## Choose VNI or Telex

|                              | VNI                                      | Telex                                               |
| ---------------------------- | ---------------------------------------- | --------------------------------------------------- |
| Accent controls              | Number row `1` to `9`                    | Letter keys such as `s`, `f`, `r`, `x`, `j` and `w` |
| Long Vietnamese passages     | The number row requires a reach          | Your hands can stay on the letter rows              |
| Mixed English and Vietnamese | Most English words pass through normally | Some English words may need automatic restoration   |
| Codes like `A4`              | The number may be interpreted as a tone  | Number keys work as ordinary digits                 |

Try VNI if you prefer a dedicated key for each tone or often alternate between Vietnamese and English. Try Telex if you write longer Vietnamese passages and prefer to stay on the letter rows. To switch, open PHTV's **Settings › Input › Input Method** or use its menu bar item.

![Input-method settings in PHTV with the interface in Vietnamese](../../assets/guides/phtv-cai-dat-bo-go.webp)

## Type a full sentence

```text
Ho5c ta65p kho6ng bao gio72 la2 muo65n
```

You should see “Học tập không bao giờ là muộn”. To try the same method using letter keys, use the [Telex typing chart](/en/guides/bang-go-telex-day-du/).
