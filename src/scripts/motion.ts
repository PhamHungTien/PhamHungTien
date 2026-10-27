import { initTilt } from './tilt';

/** One motion preference for CSS, pointer interactions and viewport effects. */
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const root = document.documentElement;
let dispose = () => {};

function startReveals(): () => void {
  if (!('IntersectionObserver' in window)) return () => {};
  const pending = new Set<HTMLElement>();
  const animations = new Set<Animation>();
  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry, index) => {
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          pending.delete(el);
          el.classList.remove('motion-pending');
          const animation = el.animate(
            [
              { opacity: 0, translate: '0 12px' },
              { opacity: 1, translate: '0 0' },
            ],
            {
              duration: 520,
              delay: Math.min(index, 3) * 45,
              easing: 'cubic-bezier(.22,1,.36,1)',
              fill: 'backwards',
            },
          );
          animations.add(animation);
          animation.finished.then(() => animations.delete(animation)).catch(() => {});
        });
    },
    { threshold: 0, rootMargin: '0px 0px -24px 0px' },
  );
  document
    .querySelectorAll<HTMLElement>('.section-head, [data-reveal], [data-reveal-stagger] > *')
    .forEach((el) => {
      // Above-fold content and hash targets must be readable immediately.
      if (el.getBoundingClientRect().top < innerHeight || el.matches(':target')) return;
      pending.add(el);
      el.classList.add('motion-pending');
      observer.observe(el);
    });
  const revealFocused = (event: FocusEvent) => {
    for (const el of pending) {
      if (event.target instanceof Node && el.contains(event.target)) {
        el.classList.remove('motion-pending');
        pending.delete(el);
        observer.unobserve(el);
      }
    }
  };
  document.addEventListener('focusin', revealFocused);
  return () => {
    observer.disconnect();
    pending.forEach((el) => el.classList.remove('motion-pending'));
    animations.forEach((animation) => animation.cancel());
    document.removeEventListener('focusin', revealFocused);
  };
}

function updateMotion() {
  dispose();
  const enabled = !reduced.matches && root.dataset.motion !== 'off';
  root.dataset.motionActive = String(enabled);
  if (!enabled) return;
  const stopReveals = startReveals();
  const stopTilt = initTilt();
  dispose = () => {
    stopReveals();
    stopTilt();
  };
}

reduced.addEventListener('change', updateMotion);
updateMotion();

// Decorative loops sleep outside the viewport and when the tab is hidden.
const scenes = document.querySelectorAll<HTMLElement>('[data-motion-scene]');
const visible = new Set<Element>();
const updateScenes = () =>
  scenes.forEach((scene) => {
    scene.dataset.running = String(visible.has(scene) && !document.hidden);
  });
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) =>
      entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target),
    );
    updateScenes();
  });
  scenes.forEach((scene) => observer.observe(scene));
  document.addEventListener('visibilitychange', updateScenes);
}
