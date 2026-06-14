const fs = require('fs');
const file = 'assets/i18n.js';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('window.addEventListener("storage", function(e) { if (e.key === "theme")')) {
  content = content.replace('// Listen to external change events (for sync with PHTV react app)',
    `// Listen to external change events (for sync with PHTV react app)
  window.addEventListener("storage", function(e) {
    if (e.key === "theme" && e.newValue) {
      document.documentElement.setAttribute("data-theme", e.newValue);
      const isDark = e.newValue === "dark";
      const btn = document.getElementById("theme-toggle-btn");
      if (btn) {
        btn.innerHTML = isDark 
          ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
          : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      }
      const themeColorMeta = document.querySelector('meta[name="theme-color"]');
      if (themeColorMeta) {
        themeColorMeta.setAttribute("content", isDark ? "#000000" : "#f5f5f7");
      }
    }
  });

  // Listen to external lang change events`);
  fs.writeFileSync(file, content);
}
