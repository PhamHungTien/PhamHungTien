/* Shared language behavior for bilingual PHTV legal documents. */
(() => {
  function applyLanguage(lang) {
    if (lang !== 'vi' && lang !== 'en') return;
    document.documentElement.lang = lang;
    document.querySelectorAll('.section[id]').forEach(section => {
      section.classList.toggle('active', section.id === lang);
    });
    document.querySelectorAll('[data-language]').forEach(button => {
      const selected = button.dataset.language === lang;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    document.querySelectorAll('[data-vi][data-en]').forEach(element => {
      element.textContent = element.dataset[lang];
    });
    document.querySelector('[data-legal-contacts]')?.setAttribute('aria-label', lang === 'vi' ? 'Liên hệ' : 'Contact');
    const title = document.querySelector('.section.active h1');
    if (title) document.title = `PHTV — ${title.textContent}`;
    try { localStorage.setItem('preferred_lang', lang); } catch { /* Storage is optional. */ }
  }
  document.querySelectorAll('[data-language]').forEach(button => {
    button.addEventListener('click', () => applyLanguage(button.dataset.language));
  });
  let lang = 'vi';
  try { lang = localStorage.getItem('preferred_lang') || 'vi'; } catch { /* Default remains usable. */ }
  applyLanguage(lang);
})();
