const fs = require('fs');
const files = [
  'index.html',
  'LunarV/index.html',
  'PadCodeAI/index.html',
  'LunarBlock/index.html',
  'PadNotesAI/index.html'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Create the social links string
  const socialLinks = `
        <a href="https://github.com/PhamHungTien" target="_blank" rel="noopener">GitHub</a>
        <a href="https://www.linkedin.com/in/ph%E1%BA%A1m-h%C3%B9ng-ti%E1%BA%BFn-a1b405327/" target="_blank" rel="noopener">LinkedIn</a>
        <a href="https://discord.gg/hm2C4tbaDz" target="_blank" rel="noopener">Discord</a>`;
        
  // If we already added them, skip
  if (content.includes('github.com/PhamHungTien')) {
    continue;
  }

  // Insert before mailto link
  content = content.replace(/(<a href="mailto:phamhungtien\.contact@gmail\.com)/g, socialLinks.trim() + '\n        $1');
  
  fs.writeFileSync(file, content);
}
