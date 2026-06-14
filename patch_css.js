const fs = require('fs');
const file = 'PHTV/index.css';
let content = fs.readFileSync(file, 'utf8');

// 1. Replace :root with dark mode variables, and add light mode override
const rootRegex = /:root\s*\{[\s\S]*?\}/;
const newRoot = `:root {
  color-scheme: dark;
  --phtv-background: #020617;
  --phtv-surface: #0f172a;
  --phtv-soft: #1e293b;
  --phtv-text: #f8fafc;
  --phtv-muted: #94a3b8;
  --phtv-line: rgba(255, 255, 255, 0.1);
  --phtv-blue: #3b82f6;
}

html[data-theme="light"] {
  color-scheme: light;
  --phtv-background: #f5f5f7;
  --phtv-surface: #ffffff;
  --phtv-soft: #eef3f8;
  --phtv-text: #1d1d1f;
  --phtv-muted: #62626a;
  --phtv-line: rgba(29, 29, 31, 0.1);
  --phtv-blue: #0071e3;
}`;
content = content.replace(rootRegex, newRoot);

// 2. Fix hardcoded #fff in download-choice
content = content.replace(/background: #fff;/g, 'background: var(--phtv-surface);');
content = content.replace(/background: #f8fafc;/g, 'background: var(--phtv-soft);');

fs.writeFileSync(file, content);
