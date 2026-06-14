const fs = require('fs');
const files = [
  'index.html',
  'LunarV/index.html',
  'PadCodeAI/index.html',
  'LunarBlock/index.html'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/[ \t]*<a href="https:\/\/discord\.gg\/hm2C4tbaDz"[^>]*>Discord<\/a>\n?/g, '');
  fs.writeFileSync(file, content);
}
