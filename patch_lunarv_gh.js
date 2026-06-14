const fs = require('fs');

// Patch CV
let cvPath = '/Users/phamhungtien/Documents/CV/Pham_Hung_Tien_CV.tex';
let cvContent = fs.readFileSync(cvPath, 'utf8');
cvContent = cvContent.replace(
  '\\href{https://github.com/PhamHungTien/LunarV}{GitHub} \\textbar\\ ',
  ''
);
fs.writeFileSync(cvPath, cvContent);

// Patch README.md
let readmePath = '/Users/phamhungtien/Documents/PhamHungTien/README.md';
let readmeContent = fs.readFileSync(readmePath, 'utf8');
readmeContent = readmeContent.replace(
  '[LunarV](https://github.com/PhamHungTien/LunarV)',
  '[LunarV](https://phamhungtien.com/LunarV/)'
);
fs.writeFileSync(readmePath, readmeContent);

