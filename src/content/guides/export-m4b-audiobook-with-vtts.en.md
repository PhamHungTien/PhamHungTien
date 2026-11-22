---
lang: en
title: Export an EPUB as a chaptered M4B audiobook with vTTS
description: Convert an EPUB to an M4B audiobook with chapters in vTTS. Check the book voice and speed, save the export, and test chapter navigation in your player.
published: 2026-11-22
app: vtts
topic: vTTS
---

If you want to listen to an EPUB in a separate audiobook player, export it from vTTS as **M4B**. The file contains the narration and a list of chapter markers, so a compatible player can jump directly to the chapter you want. For a short recording that needs to open in a general audio player, an MP3 or M4A export can be a better fit.

## Prepare a short test book

Start with an EPUB you made or have permission to convert. For example, collect your own study notes in a two-chapter EPUB with headings like “Key ideas” and “Practice questions.” Import it into the **Library** and open the book details. Check that the **Contents** lists both chapters and that tapping each opens the expected text. The chapter markers in your export follow the chapters that vTTS can read from the book.

Open one chapter and listen to the first paragraph. Choose the language, voice and speed for this book before exporting. If a name comes out wrong, check the spelling in the source and test an entry in the pronunciation dictionary. A short playback check helps catch problems before you render the whole book. If you need help importing your first book, see the [vTTS reading guide](/guides/nghe-sach-epub-giong-doc-tieng-viet-voi-vtts/).

## Export M4B on iPhone, iPad or Mac

These steps apply to the current Apple version on iOS or iPadOS 17 or later and macOS 14 or later.

1. Go back to the book's **Contents** in the Library. Choose **Export audiobook** in the book details toolbar.
2. Check the chapter count and the **M4B · AAC** format. The Apple export uses the whole book and its saved voice and speed.
3. Choose whether to turn on **High quality audio**. Try a narration-only export first. To add background music, turn it on in the export options and set a level that keeps the voice clear.
4. Tap or click **Export**. Keep vTTS open until it finishes, then choose a save location in Files or Finder.
5. Open the result in a chapter-aware player. In Books on Mac, use **File › Import**, select the `.m4b` and check that you can jump to the second chapter. [Importing audiobooks into Books on Mac](https://support.apple.com/guide/books/ibkseed72068/mac)

## Export a chapter range when available on Android

If the installed Android build offers book export, open the book's menu in the **Library** and choose **Export audio**. Select **All chapters** or set the **From** and **To** chapters, then choose **M4B** and export. For the study-notes example, exporting just “Practice questions” gives you a shorter file to check before exporting the complete book. Check the options in your installed build before planning a chapter-range export.

## Choose a format and check the result

| Goal                                      | Format to choose                                                         |
| ----------------------------------------- | ------------------------------------------------------------------------ |
| Keep a whole book with chapter navigation | M4B in a chapter-aware player                                            |
| Share a short passage or voice note       | MP3 or M4A from the audio export menu                                    |
| Edit or process the audio in another tool | WAV if your editing tool supports it and you have room for a larger file |

Listen around a chapter boundary and verify that the start of each chapter sounds right. If the chapter list is missing, check whether the source book had a readable table of contents and whether your player exposes M4B chapter markers. If the voice is too fast or background music is too loud, change the book speed or export mix in vTTS and export again.

Speech is generated on your device. You choose whether the finished file stays in local storage, goes to a cloud folder or is shared with another app. The free version limits exports. The export screen shows your remaining allowance where applicable. **vTTS Premium** is a one-time purchase on the supported store that removes the app's export quotas. Check the in-app purchase screen on your device for the price and availability.
