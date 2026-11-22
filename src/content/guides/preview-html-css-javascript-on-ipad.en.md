---
lang: en
title: 'Preview HTML, CSS and JavaScript on iPad with Pad Code AI'
description: 'Build a reading checklist in three files, preview it on iPad or iPhone, test narrow layouts and use the browser console to fix JavaScript errors.'
published: 2026-11-22
app: padcodeai
topic: Pad Code AI
---

A small static web page is enough to learn how HTML, CSS and JavaScript work together. In [Pad Code AI](/PadCodeAI/), you can edit the three files on your iPad or iPhone and open a local preview. This example builds a reading checklist that counts completed items. It uses only project files, so it works offline after the app is installed.

## Create the checklist project

From the Pad Code AI home screen, choose **New Project**, pick **Empty Folder** and save it in a local folder you can access in Files. Use **New File** to create `index.html`, `styles.css` and `app.js` in the same folder. If the editor inserts starter text, replace it with the examples below.

### Add the HTML

Paste this into `index.html`. The viewport setting lets the page adapt to a narrow screen. The stylesheet and script use paths relative to this file.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Reading checklist</title>
    <link rel="stylesheet" href="./styles.css" />
    <script src="./app.js" defer></script>
  </head>
  <body>
    <main class="checklist">
      <h1>Reading checklist</h1>
      <label><input type="checkbox" /> Choose an article</label>
      <label><input type="checkbox" /> Read ten pages</label>
      <label><input type="checkbox" /> Write a short note</label>
      <p>Completed <output data-progress aria-live="polite">0 / 3</output></p>
    </main>
  </body>
</html>
```

### Style the checklist

Paste this into `styles.css`. The checklist has a maximum width and enough space to tap each row.

```css
body {
  margin: 0;
  padding: 1.25rem;
  font:
    1rem/1.5 system-ui,
    sans-serif;
  background: #e9f2ed;
  color: #18312a;
}

.checklist {
  max-width: 30rem;
  margin-inline: auto;
  padding: 1.25rem;
  border-radius: 1rem;
  background: white;
}

label {
  display: flex;
  gap: 0.65rem;
  align-items: center;
  min-height: 44px;
}
```

### Update the progress count

Paste this into `app.js`. Because the HTML uses `defer`, the checkboxes are available when the script starts.

```javascript
const items = [...document.querySelectorAll('input[type="checkbox"]')];
const progress = document.querySelector('[data-progress]');

function updateProgress() {
  const count = items.filter((item) => item.checked).length;
  progress.textContent = count + ' / ' + items.length;
}

items.forEach((item) => item.addEventListener('change', updateProgress));
updateProgress();
```

## Open and test the preview

1. Save the files and open `index.html`. In the **Command Palette**, search for **Live Web Preview**. With an external keyboard, you can also use the **Run** menu and choose **Preview**.
2. The page should show a heading, three checkboxes and `0 / 3`. Check two boxes and verify that the count reads `2 / 3`. Uncheck one and check the count again.
3. In **Preview Options**, find **Viewport Width** and try **390 pt**, **768 pt** and **Fit Window**. On a narrow screen, the preview cannot grow wider than the window. Check that long labels wrap and nothing scrolls sideways.
4. To tweak the layout, tap **Done**, change the padding in `styles.css` and reopen the preview. Pad Code AI includes edits from open project tabs in the preview. Save before sharing the files or opening them elsewhere.

## Find a broken file or script

If the preview shows unstyled text, check that the filename and `href="./styles.css"` match, including capitalization. If the checklist looks right but the count stays still, open the preview’s **Console**. Confirm the script is linked as `src="./app.js"` and compare the HTML’s `data-progress` attribute with the selector in JavaScript. To verify that the console is working, put `console.log("checklist ready")` at the end of the script and use **Reload**. Remove the log once the behavior is confirmed.

This preview opens files inside Pad Code AI. Publishing a public URL takes a separate hosting step. The split editor has a daily free allowance for keeping HTML and CSS visible while editing. The [App Store listing](https://apps.apple.com/app/id6774398897) and the app show current Pro options.

Once the checklist works, try [reviewing an AI change to add a reset button](/guides/review-ai-code-changes-on-ipad/).
