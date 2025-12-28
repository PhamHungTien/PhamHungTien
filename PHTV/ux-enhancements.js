// =================================================================
// UX/UI ENHANCEMENTS - Toast Notifications & Interactions
// =================================================================

// Toast Notification System
const Toast = {
  container: null,

  init() {
    this.container = document.getElementById('toastContainer');
  },

  show(message, type = 'info', duration = 3000, title = '') {
    if (!this.container) this.init();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    // Icon based on type
    const icons = {
      success: '✓',
      error: '✕',
      info: 'ⓘ'
    };

    toast.innerHTML = `
      <div class="toast-icon">${icons[type] || icons.info}</div>
      <div class="toast-content">
        ${title ? `<div class="toast-title">${title}</div>` : ''}
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" onclick="Toast.hide(this.parentElement)" aria-label="Close notification">✕</button>
    `;

    this.container.appendChild(toast);

    // Auto-hide after duration
    if (duration > 0) {
      setTimeout(() => this.hide(toast), duration);
    }

    return toast;
  },

  hide(toast) {
    if (!toast) return;

    toast.classList.add('hiding');
    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 300);
  },

  success(message, title = 'Success') {
    return this.show(message, 'success', 3000, title);
  },

  error(message, title = 'Error') {
    return this.show(message, 'error', 4000, title);
  },

  info(message, title = '') {
    return this.show(message, 'info', 3000, title);
  }
};

// Initialize Toast system
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Toast.init());
} else {
  Toast.init();
}

// Image lazy loading with fade-in effect
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLazyImages);
} else {
  initLazyImages();
}

function initLazyImages() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  lazyImages.forEach(img => {
    img.addEventListener('load', function() {
      this.classList.add('loaded');
    });

    // Check if already loaded (cached)
    if (img.complete) {
      img.classList.add('loaded');
    }
  });
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Parallax effect for hero icon (mouse movement) - OPTIMIZED
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initParallax);
} else {
  initParallax();
}

function initParallax() {
  const heroIcon = document.querySelector('.hero-app-icon');

  if (heroIcon) {
    // Use throttled handler with requestAnimationFrame for smooth performance
    let ticking = false;
    let lastX = 0, lastY = 0;

    const updateParallax = () => {
      heroIcon.style.transform = `translate3d(${lastX}px, ${lastY}px, 0)`;
      ticking = false;
    };

    const handleMouseMove = throttle((e) => {
      // Only on desktop
      if (window.innerWidth > 768) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        lastX = (clientX / innerWidth - 0.5) * 20;
        lastY = (clientY / innerHeight - 0.5) * 20;

        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      }
    }, 16); // ~60fps

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
  }
}

// Download button click feedback (visual only, toast handled in script.js)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDownloadButtons);
} else {
  initDownloadButtons();
}

function initDownloadButtons() {
  const downloadButtons = document.querySelectorAll('[id*="download"]');

  downloadButtons.forEach(btn => {
    if (btn.tagName === 'A' && !btn.dataset.visualEffectAdded) {
      btn.addEventListener('click', () => {
        btn.classList.add('success-pulse');
        setTimeout(() => btn.classList.remove('success-pulse'), 600);
      });
      btn.dataset.visualEffectAdded = 'true';
    }
  });
}

// Export Toast for global use
window.Toast = Toast;

console.log('[UX] Enhanced UI/UX features loaded');
