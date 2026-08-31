(function () {
  'use strict';

  var root = document.documentElement;
  var script = document.currentScript;
  var shouldRenderToggle = !script || script.getAttribute('data-theme-toggle') !== 'false';
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function getStoredTheme() {
    try {
      var stored = localStorage.getItem('theme');
      return stored === 'light' || stored === 'dark' ? stored : null;
    } catch (_) {
      return null;
    }
  }

  function getPreferredTheme() {
    return getStoredTheme() || (media.matches ? 'dark' : 'light');
  }

  function updateThemeColor(theme) {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', theme === 'dark' ? '#0b0c0f' : '#f5f5f7');
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    updateThemeColor(theme);

    var toggle = document.querySelector('[data-shared-theme-toggle]');
    if (!toggle) return;

    var isDark = theme === 'dark';
    toggle.setAttribute('aria-label', isDark ? 'Bật giao diện sáng' : 'Bật giao diện tối');
    toggle.setAttribute('title', isDark ? 'Light mode' : 'Dark mode');
    toggle.innerHTML = isDark
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"></path></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"></path></svg>';
  }

  function storeAndApply(theme) {
    try {
      localStorage.setItem('theme', theme);
    } catch (_) {
      // The selected theme still applies for this page when storage is unavailable.
    }
    applyTheme(theme);
  }

  function mountLegalContactLinks() {
    var footer = document.querySelector('.container > .footer');
    if (!footer || document.querySelector('[data-legal-contacts]')) return;

    var contacts = document.createElement('section');
    contacts.className = 'legal-contact-panel';
    contacts.setAttribute('data-legal-contacts', '');
    contacts.setAttribute('aria-label', 'Liên hệ / Contact');
    contacts.innerHTML = [
      '<h2 class="legal-contact-panel__title">Liên hệ · Contact</h2>',
      '<div class="legal-contact-grid">',
      '<a class="legal-contact-item" href="https://www.facebook.com/phamhungtien1404" target="_blank" rel="noopener noreferrer"><span class="legal-contact-mark">f</span><span><strong>Facebook</strong><small>@phamhungtien1404</small></span></a>',
      '<a class="legal-contact-item" href="https://www.instagram.com/phamhungtien1404/" target="_blank" rel="noopener noreferrer"><span class="legal-contact-mark">ig</span><span><strong>Instagram</strong><small>@phamhungtien1404</small></span></a>',
      '<a class="legal-contact-item" href="https://www.threads.net/@phamhungtien1404" target="_blank" rel="noopener noreferrer"><span class="legal-contact-mark">@</span><span><strong>Threads</strong><small>@phamhungtien1404</small></span></a>',
      '<span class="legal-contact-item legal-contact-item--static"><span class="legal-contact-mark">◉</span><span><strong>Locket</strong><small>@phamhungtien</small></span></span>',
      '<a class="legal-contact-item" href="https://www.tiktok.com/@phamhungtien14" target="_blank" rel="noopener noreferrer"><span class="legal-contact-mark">♪</span><span><strong>TikTok</strong><small>@phamhungtien14</small></span></a>',
      '<a class="legal-contact-item" href="https://www.linkedin.com/in/ph%E1%BA%A1m-h%C3%B9ng-ti%E1%BA%BFn-a1b405327/" target="_blank" rel="noopener noreferrer"><span class="legal-contact-mark">in</span><span><strong>LinkedIn</strong><small>Phạm Hùng Tiến</small></span></a>',
      '<a class="legal-contact-item" href="https://github.com/PhamHungTien" target="_blank" rel="noopener noreferrer"><span class="legal-contact-mark">gh</span><span><strong>GitHub</strong><small>@PhamHungTien</small></span></a>',
      '<a class="legal-contact-item" href="mailto:contact@phamhungtien.com"><span class="legal-contact-mark">@</span><span><strong>Email</strong><small>contact@phamhungtien.com</small></span></a>',
      '</div>'
    ].join('');
    footer.parentNode.insertBefore(contacts, footer);
  }

  applyTheme(getPreferredTheme());

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountLegalContactLinks, { once: true });
  } else {
    mountLegalContactLinks();
  }

  if (shouldRenderToggle) {
    var mountToggle = function () {
      if (document.querySelector('[data-shared-theme-toggle]')) return;
      var toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'shared-theme-toggle';
      toggle.setAttribute('data-shared-theme-toggle', '');
      toggle.addEventListener('click', function () {
        storeAndApply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
      });
      document.body.appendChild(toggle);
      applyTheme(root.getAttribute('data-theme') || getPreferredTheme());
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', mountToggle, { once: true });
    } else {
      mountToggle();
    }
  }

  window.addEventListener('storage', function (event) {
    if (event.key === 'theme' && (event.newValue === 'light' || event.newValue === 'dark')) {
      applyTheme(event.newValue);
    }
  });

  var handleSystemTheme = function (event) {
    if (!getStoredTheme()) applyTheme(event.matches ? 'dark' : 'light');
  };

  if (media.addEventListener) {
    media.addEventListener('change', handleSystemTheme);
  } else {
    media.addListener(handleSystemTheme);
  }
})();
