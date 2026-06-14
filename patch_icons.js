const fs = require('fs');
const file = 'PHTV/components/Icons.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('Sun,')) {
    content = content.replace("export const Icons = {", "export const Icons = {\n  Sun,\n  Moon,");
    fs.writeFileSync(file, content);
}
