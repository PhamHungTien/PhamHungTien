---
lang: zh
title: 用 Pad Code AI 在 iPad 上预览 HTML、CSS 和 JavaScript
description: 在 iPad 或 iPhone 上用三个文件制作阅读清单，打开本地网页预览，测试窄屏布局，并用控制台排查 JavaScript 错误。
published: 2026-11-22
app: padcodeai
topic: Pad Code AI
---

通过一个小网页，可以了解 HTML、CSS 和 JavaScript 如何配合。在 [Pad Code AI](/zh/PadCodeAI/) 中，你可以用 iPad 或 iPhone 编辑三个文件，再打开本地预览。下面的阅读清单会统计已完成的任务。示例只依赖项目内的文件，安装应用后可离线运行。

## 新建阅读清单项目

在 Pad Code AI 首页选择**新建项目 › 空文件夹**，将项目保存到「文件」中的本地位置。用**新建文件**在同一目录创建 `index.html`、`styles.css` 和 `app.js`。如果编辑器插入模板内容，将其替换为以下示例。

### 添加 HTML

将这段代码粘贴到 `index.html`。视口设置使页面适应窄屏。样式表和脚本的路径都相对于此文件。

```html
<!doctype html>
<html lang="zh">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>阅读清单</title>
    <link rel="stylesheet" href="./styles.css" />
    <script src="./app.js" defer></script>
  </head>
  <body>
    <main class="checklist">
      <h1>阅读清单</h1>
      <label><input type="checkbox" /> 选一篇文章</label>
      <label><input type="checkbox" /> 读十页</label>
      <label><input type="checkbox" /> 写一条简短的笔记</label>
      <p>已完成 <output data-progress aria-live="polite">0 / 3</output></p>
    </main>
  </body>
</html>
```

### 设置清单样式

将以下样式粘贴到 `styles.css`。清单设有最大宽度，每行留有足够的点击区域。

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

### 更新完成数量

将以下脚本粘贴到 `app.js`。HTML 中使用了 `defer`，因此脚本开始运行时已能读取复选框。

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

## 打开并测试预览

1. 保存文件并打开 `index.html`。在**命令面板**中搜索**实时 Web 预览**。若连接了外部键盘，也可从**运行**菜单选择**预览**。
2. 页面应显示一个标题、三个复选框及 `0 / 3`。选中两项，确认计数显示 `2 / 3`，再取消一项并检查计数。
3. 打开**预览选项**，在**视口宽度**中尝试 **390 pt**、**768 pt** 和适合窗口的选项。在窄屏上，预览不能宽于窗口。检查长标签是否正常换行，页面是否存在横向滚动。
4. 要调整布局，轻点**完成**，修改 `styles.css` 中的内边距，再次打开预览。预览能包含项目中已打开标签页里的编辑内容。分享文件或用其他应用打开前，记得保存。

## 排查样式或脚本问题

如果页面只显示无样式的文字，请检查文件名与 `href="./styles.css"` 是否完全匹配，包括大小写。如果页面外观正常，但计数不变，可打开预览的**控制台**。检查 `src="./app.js"` 和 JavaScript 中的选择器，确认匹配 HTML 的 `data-progress` 属性。还可在脚本末尾添加 `console.log("checklist ready")`，使用**重新加载**确认控制台收到日志，再移除临时语句。

预览只在 Pad Code AI 内打开项目文件。若希望通过公开网址访问，需要另外托管网页。分栏编辑可在编辑时同时保留 HTML 和 CSS，免费使用额度和升级选项可在应用和 [App Store 产品页面](https://apps.apple.com/app/id6774398897)查看。

清单运行正常后，可继续学习[如何审查 AI 给清单添加重置按钮的改动](/zh/guides/review-ai-code-changes-on-ipad/)。
