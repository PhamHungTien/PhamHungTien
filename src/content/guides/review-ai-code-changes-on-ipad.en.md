---
lang: en
title: 'How to review AI code changes on iPad with Pad Code AI'
description: 'Use Pad Code AI to plan a small JavaScript change, read the agent diff, test the result in Web Preview and undo the operation if needed.'
published: 2026-11-22
app: padcodeai
topic: Pad Code AI
---

When you hand a coding assistant a whole project, start with a change you can verify yourself. This exercise uses [Pad Code AI](/PadCodeAI/) to add a reset button to a three-item reading checklist. You’ll set the scope, inspect the files the agent changed and test the result on your iPad or iPhone.

## Prepare a test project and choose a provider

Use the project from the [HTML, CSS and JavaScript preview guide](/guides/preview-html-css-javascript-on-ipad/), or try this on a copy of your own small checklist. Save your work and open the preview. Check one box and confirm that the counter shows `1 / 3`. That gives you a known starting point.

Open **Settings → AI Assistant** and select a provider. Apple Intelligence requires a compatible device with Apple Intelligence enabled. Downloaded models need enough space and memory, and agent modes depend on the model. With an online provider, Pad Code AI uses your API key and sends your message and the context you allow to that provider. The agent can request more workspace context during a turn. Use a practice project, review the request context and sharing choices, and keep keys and private material outside the exercise. For details, see the [Pad Code AI privacy policy](/PadCodeAI/privacy.html).

## Ask for a plan before changing files

Open the AI panel in the project. **Ask** is useful for identifying how an existing function works. For a task that requires reading several files, choose **Plan** to let the assistant inspect the project and suggest an approach. If the mode is unavailable, check whether the project is open and the selected provider or model supports agent actions.

Send a request with a visible result and a short list of files.

> Plan a Reset button for this checklist. Add the button to index.html and its click handler to app.js. On click, clear the three checkboxes and update the existing counter to 0 / 3. Keep the current styling and individual checkbox behavior. Use browser JavaScript already available in the preview.

Look for a plan that reuses the existing `updateProgress()` function and uses the same list of checkbox elements. When the plan matches the task, choose **Edit** and ask the agent to implement it. Edit allows the agent to change workspace files. **Auto** also allows it to run supported code.

## Review the diff and test the result

1. Open **Agent Changes** in the AI panel and choose the latest operation. On compact screens, look in the AI panel’s overflow menu. The **Review Changes** screen shows added and removed lines by file.
2. Look for a button in `index.html` and a click listener in `app.js`. The listener should clear the same checkbox list and call `updateProgress()`. Unexpected file changes merit a closer look. If the result goes outside the plan, choose **Undo Operation** for that entry and give the assistant a narrower request.
3. Open `index.html` in **Live Web Preview**. Look for `0 / 3` at the start. Select two boxes, confirm `2 / 3`, and tap **Reset**. Verify that both boxes clear and the counter returns to `0 / 3`. Select one box again to check that manual toggling still works. If you have a keyboard connected, also reach the button with Tab and activate it with Enter.

Agent changes apply to the workspace before you review their history, so a simple example or a project copy makes a good first test. If you already use Git, compare the final changes in Source Control before making a commit. Once you can explain the diff and reproduce the test yourself, the same workflow scales to a slightly larger change.
