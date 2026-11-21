---
lang: en
title: 'Vietnamese Telex typing chart and accent placement'
description: Learn Vietnamese Telex letter and tone keys, how to correct an accent, and how to type words such as người, được and Nguyễn with PHTV on Mac.
published: 2026-11-22
app: phtv
topic: Vietnamese typing
---

Telex uses letter keys to type Vietnamese accents. Start with the base letter, then press a key to change its shape or add a tone. The examples below use [PHTV on Mac](/en/PHTV/). The basic mappings also work in many other Telex input methods.

## Letter keys for â, ă, ê, ô, ơ, ư and đ

| Type  | Result | Example  | Output |
| ----- | ------ | -------- | ------ |
| `aa`  | â      | `caan`   | cân    |
| `aw`  | ă      | `awn`    | ăn     |
| `ee`  | ê      | `ddeem`  | đêm    |
| `oo`  | ô      | `coo`    | cô     |
| `ow`  | ơ      | `mow`    | mơ     |
| `uw`  | ư      | `tuw`    | tư     |
| `uow` | ươ     | `nuowcs` | nước   |
| `dd`  | đ      | `ddi`    | đi     |

In PHTV's standard Telex mode, `w` can also produce `ư` on its own, as in `nhwng` → **nhưng**. The `[` and `]` keys can insert `ơ` and `ư` respectively. PHTV's Simple Telex layouts change how those shortcuts work.

## Tone keys

| Key | Vietnamese tone | Type   | Result |
| --- | --------------- | ------ | ------ |
| `s` | sắc             | `bas`  | bá     |
| `f` | huyền           | `baf`  | bà     |
| `r` | hỏi             | `bar`  | bả     |
| `x` | ngã             | `bax`  | bã     |
| `j` | nặng            | `baj`  | bạ     |
| `z` | remove tone     | `basz` | ba     |

You can type the tone before the final consonant or at the end of the syllable. Both `vieejt` and `vieetj` produce **việt**. The input method places the tone on the correct vowel.

## Common words to practice

| Word   | Type       | What changes                              |
| ------ | ---------- | ----------------------------------------- |
| người  | `nguowif`  | `uow` produces ươ and `f` adds huyền      |
| được   | `dduwowcj` | `dd` produces đ and `j` adds nặng to ươ   |
| trường | `truowngf` | `f` places huyền on ơ                     |
| khuyến | `khuyeens` | `ee` produces ê and `s` adds sắc          |
| Nguyễn | `Nguyeexn` | `ee` produces ê and `x` adds ngã          |
| thuở   | `thuowr`   | `w` transforms the vowel and `r` adds hỏi |
| quốc   | `quoocs`   | `oo` produces ô and `s` adds sắc          |

## Correct an accent or recover the original text

- To change the tone, press another tone key. Type `bas` followed by `f` to get **bà**.
- To remove the tone, type `z`. For example, `basz` produces **ba**.
- To recover a literal key, repeat it. For example, `ass` gives **as**, and `aaa` gives **aa**.
- To restore the original keystrokes for the current word, press <kbd>Esc</kbd> in PHTV. If you use Esc for another app, change the restore shortcut in **Settings › Shortcuts**.

## Choose an accent-placement convention

Two conventions place tones differently in vowel clusters such as **oa**, **oe** and **uy**. You may see **hòa, khỏe, thúy** or **hoà, khoẻ, thuý**. The keystrokes are identical. PHTV's **Modern Orthography** option in **Settings › Input** changes the displayed placement. Pick the convention your document uses.

## Optional shortcuts for consonants

Enable **Quick Telex** in **Settings › Input** to type a consonant twice for a cluster:

| Type | Result | Type | Result |
| ---- | ------ | ---- | ------ |
| `cc` | ch     | `nn` | ng     |
| `gg` | gi     | `pp` | ph     |
| `kk` | kh     | `qq` | qu     |
| `tt` | th     |      |        |

PHTV also offers fast initial and final consonants. At the start of a syllable, `f`, `j` and `w` can become `ph`, `gi` and `qu`. At the end, `g`, `h` and `k` can become `ng`, `nh` and `ch`. These options are off by default. Try them separately so you can tell which shortcut changed your typing.

## Type Vietnamese and English in the same app

| PHTV layout    | `w` alone produces ư | `[` and `]` produce ơ and ư |
| -------------- | -------------------- | --------------------------- |
| Telex          | Yes                  | Yes                         |
| Simple Telex 1 | No                   | No                          |
| Simple Telex 2 | Yes                  | No                          |

All three layouts still use `aw`, `ow` and `uw`. Try Simple Telex 1 if you use standalone `w` and brackets frequently, for example when you write code.

Some English words contain the same letters Telex uses for accents. PHTV can restore recognized English words when you press Space. For a longer English passage, switch to English mode with <kbd>Control</kbd> + <kbd>Shift</kbd> if you use the default shortcut. For an editor or terminal you use regularly, set its behavior in **Settings › Apps**.

## Try two sentences

```text
Dduwowngf ddi khoong khos vif ngawn sooong caasch nuis
Truowngf Vieejt Nam ddepj nhaast nawm nay
```

The result is “Đường đi không khó vì ngăn sông cách núi” and “Trường Việt Nam đẹp nhất năm nay”. If you prefer number keys, try the [VNI typing chart](/en/guides/cach-go-vni-telex-hay-vni/).
