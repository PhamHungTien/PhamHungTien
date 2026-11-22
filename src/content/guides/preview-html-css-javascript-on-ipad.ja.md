---
lang: ja
title: 'iPadでHTML・CSS・JavaScriptを作成してプレビューする方法'
description: 'Pad Code AIで読書用チェックリストを作ります。iPadやiPhoneでHTML、CSS、JavaScriptを編集し、画面幅を変えて表示を確認します。'
published: 2026-11-22
app: padcodeai
topic: Pad Code AI
---

[Pad Code AI](/ja/PadCodeAI/)なら、iPadやiPhone上でHTML、CSS、JavaScriptを編集し、その場で動作を確かめられます。ここでは、チェックを入れるたびに完了数が変わる読書リストを作ります。使うのはプロジェクト内の3ファイルだけなので、アプリのインストール後はオフラインで試せます。

## プロジェクトに3つのファイルを作る

ホーム画面で **新規プロジェクト** を選び、**空のフォルダ** で始めます。「ファイル」アプリからアクセスできる端末内のフォルダに保存してください。**新規ファイル** から `index.html`、`styles.css`、`app.js` を同じ階層に作ります。テンプレートの内容が入っている場合は、以下のコードに置き換えます。

### HTMLで項目を並べる

次のコードを `index.html` に貼り付けます。`viewport` の設定は、画面の幅に合わせるためのものです。先頭が `./` のパスは、HTMLと同じフォルダにあるファイルを指します。

```html
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>読書チェックリスト</title>
    <link rel="stylesheet" href="./styles.css" />
    <script src="./app.js" defer></script>
  </head>
  <body>
    <main class="checklist">
      <h1>読書チェックリスト</h1>
      <label><input type="checkbox" /> 読む記事を選ぶ</label>
      <label><input type="checkbox" /> 10ページ読む</label>
      <label><input type="checkbox" /> 短い感想を書く</label>
      <p>完了 <output data-progress aria-live="polite">0 / 3</output></p>
    </main>
  </body>
</html>
```

### CSSで見た目を整える

`styles.css` に貼り付けます。項目行の余白を取っているので、小さな画面でも指で選択しやすくなります。

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

### JavaScriptで完了数を数える

`app.js` に貼り付けます。HTMLの `defer` 属性により、チェックボックスが読み込まれてからスクリプトが動きます。

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

## プレビューで動作と画面幅を確認する

1. ファイルを保存して `index.html` を開きます。**コマンドパレット** で **ライブ Web プレビュー** を検索します。外付けキーボードを使っている場合は、**実行** メニューの **プレビュー** からも開けます。
2. 見出しと3つのチェックボックス、`0 / 3` が表示されます。2つ選ぶと `2 / 3` になり、1つ外すと数字が戻ることを確かめます。
3. **プレビューオプション** の **ビューポート幅** で390ptと768ptを選んでみます。幅は開いているウィンドウ内に収まります。長い行が自然に折り返すか、横スクロールが出ていないかを見比べてください。
4. **完了** でエディターに戻り、`styles.css` の余白を変更します。プレビューを開き直すと、編集タブに残っている内容も反映されます。別のアプリで開いたり、人に渡したりするときは、先にファイルを保存します。

## 表示や数字がおかしいとき

文字だけが表示される場合は、`href="./styles.css"` と実際のファイル名を照合します。大文字と小文字もそろえてください。完了数だけが変わらないときは、プレビューの **コンソール** を開き、`src="./app.js"` と `data-progress` の指定を確認します。スクリプトの最後に `console.log("checklist ready")` を一時的に入れ、**再読み込み** すると、最後まで実行されたかを調べられます。

プレビューは端末内での確認用です。誰でも開けるURLにするには、別途ホスティングにファイルを置きます。HTMLとCSSを同時に見るための分割エディターは、毎日の無料利用枠で試せます。現在のProの購入オプションは、アプリ内または [App Storeの掲載情報](https://apps.apple.com/app/id6774398897) で確認できます。

次は同じリストに [AIでリセットボタンを追加し、差分を確認する](/ja/guides/review-ai-code-changes-on-ipad/) 手順を試せます。
