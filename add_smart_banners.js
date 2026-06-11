const fs = require('fs');

function addBanner(file, appId) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('apple-itunes-app')) return;
  const metaTag = `<meta name="apple-itunes-app" content="app-id=${appId}">\n  <meta name="description"`;
  content = content.replace(/<meta name="description"/, metaTag);
  fs.writeFileSync(file, content);
}

addBanner('LunarBlock/index.html', '6773545437');
addBanner('PadCodeAI/index.html', '6774398897');
addBanner('PadNotesAI/index.html', '6779363432');
