---
lang: en
title: 'Vietnamese encodings and how to convert TCVN3 or VNI to Unicode'
description: Recognize Vietnamese text in TCVN3, VNI Windows or CP1258, understand composed and decomposed Unicode, and convert legacy text with PHTV on Mac.
published: 2026-11-22
app: phtv
topic: Vietnamese typing
---

If a legacy document displays “TiÕng ViÖt” or “Tieáng Vieät”, its Vietnamese text may be stored for a different encoding or font. Identify the original encoding before converting a copy to Unicode. This guide uses the converter in [PHTV for Mac](/en/PHTV/).

## How Vietnamese encodings differ

An encoding maps numbers to characters. Older Vietnamese standards assigned accent marks or accented letters to numeric codes that meant something else in other systems. A newer editor may interpret those codes as unrelated characters if a document loses its original encoding or font information.

| Encoding                  | What to look for                                               | Common use                                          |
| ------------------------- | -------------------------------------------------------------- | --------------------------------------------------- |
| **Unicode, precomposed**  | Accented letters such as ệ can be stored as one code point     | Modern websites, apps and documents                 |
| **Unicode, decomposed**   | Base letters and combining marks are separate code points      | Text copied between systems and some file names     |
| **TCVN3 (ABC)**           | Fonts with names beginning `.Vn`, such as `.VnTime`            | Older Vietnamese government and education documents |
| **VNI Windows**           | Fonts such as `VNI-Times` and sequences such as “Tieáng Vieät” | Older documents and design files                    |
| **Windows-1258 (CP1258)** | A Vietnamese Windows code page using some combining marks      | Older Windows applications and data exports         |

Use Unicode for new documents. The **VNI Windows encoding** and the **VNI input method** are independent choices. You can type with VNI while producing modern Unicode text.

## Why accents disappear or turn into other characters

1. A document may rely on a legacy font such as `.VnTime`. Without it, the same text is drawn with a font that maps the codes differently.
2. The input method may be set to TCVN3 or VNI Windows while the editor expects Unicode.
3. Two Unicode strings can render identically with different code-point sequences. An app that does no normalization might miss a search match or treat two visually identical file names differently.

## Choose the encoding in PHTV

Open **Settings › Input › Encoding** and choose **Unicode** for everyday typing. Choose TCVN3 or VNI Windows when you need to continue editing a document using that encoding. If you frequently use an older application, enable PHTV's per-app encoding memory in **Settings › Apps**.

![Character-encoding options in PHTV with the interface in Vietnamese](../../assets/guides/phtv-cai-dat-bo-go.webp)

## Convert old text to Unicode

1. Make a copy of the document and copy a short affected passage with <kbd>⌘</kbd> + <kbd>C</kbd>.
2. Open PHTV's **Encoding Converter** from its tools menu or system settings pane.
3. Choose the source encoding and **Unicode** as the destination, then convert the clipboard content.
4. Paste with <kbd>⌘</kbd> + <kbd>V</kbd> and use a Unicode font such as Times New Roman, Arial or Helvetica.
5. Check several words with accents and lowercase and uppercase letters before converting the rest. “TiÕng ViÖt” commonly points to TCVN3, while “Tieáng Vieät” points to VNI Windows.

If converting copied text cannot recover the original letters, reopen the source document with its original encoding or font and try again.

## Precomposed and decomposed Unicode

The letter **ệ** can be represented by `U+1EC7`, or by `e` and a combining dot below and circumflex. Both forms can display the same glyph. They have different lengths and binary representations, so software comparing raw strings might consider them unequal. When code needs to compare Vietnamese text consistently, normalize both strings to a common Unicode form such as NFC before comparing them. See the [Unicode normalization specification](https://www.unicode.org/reports/tr15/).

If your text is already Unicode but accents still vanish as you type, see [how to fix Vietnamese input on Mac](/en/guides/sua-loi-go-tieng-viet-tren-mac/).
