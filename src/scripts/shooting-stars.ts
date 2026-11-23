/**
 * The home hero's sky reacts to the mouse and occasionally plays a shooting-star animation.
 * Background effects sleep once the hero leaves view, when the tab is hidden, or when
 * visitors turn off decorative motion.
 */
export function initShootingStars(): void {
  const sky = document.querySelector<HTMLElement>('[data-sky]');
  const space = sky?.closest<HTMLElement>('.space');
  const hero = document.querySelector<HTMLElement>('[data-home-hero]');
  if (!sky || !space || !hero) return;

  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  let timer = 0;
  let visible = false;
  let first = true;
  let frame = 0;
  let x = 0;
  let y = 0;
  const activeMeteors = new Set<Animation>();

  const enabled = () =>
    visible && !document.hidden && !reduced.matches && root.dataset.motion !== 'off';
  const random = (min: number, max: number) => min + Math.random() * (max - min);

  function launch() {
    const w = sky!.clientWidth;
    const h = sky!.clientHeight;
    if (!w || !h) return;

    const meteor = document.createElement('span');
    meteor.className = 'meteor';
    const length = random(110, 240) * (w < 600 ? 0.65 : 1);
    const angle = random(-42, -22); // Tail points up-right, travel goes down-left
    const distance = random(0.35, 0.6) * Math.max(w, h);
    const duration = random(850, 1500);
    const startX = random(0.25, 1.02) * w;
    const startY = random(-0.05, 0.45) * h;
    meteor.style.width = `${length}px`;
    meteor.style.left = `${startX}px`;
    meteor.style.top = `${startY}px`;
    sky!.append(meteor);

    const base = `rotate(${angle}deg)`;
    const animation = meteor.animate(
      [
        { transform: `${base} translateX(0) scaleX(0.2)`, opacity: 0 },
        {
          transform: `${base} translateX(${-distance * 0.15}px) scaleX(1)`,
          opacity: 1,
          offset: 0.18,
        },
        {
          transform: `${base} translateX(${-distance * 0.8}px) scaleX(0.85)`,
          opacity: 0.85,
          offset: 0.78,
        },
        { transform: `${base} translateX(${-distance}px) scaleX(0.3)`, opacity: 0 },
      ],
      { duration, easing: 'cubic-bezier(0.3, 0, 0.6, 1)', fill: 'both' },
    );
    activeMeteors.add(animation);
    animation.finished
      .catch(() => {})
      .finally(() => {
        activeMeteors.delete(animation);
        meteor.remove();
      });
  }

  function schedule() {
    clearTimeout(timer);
    if (!enabled()) {
      activeMeteors.forEach((animation) => animation.cancel());
      resetPointer();
      return;
    }
    if (typeof sky!.animate !== 'function') return;
    const wait = first ? 4200 : random(9000, 17000);
    first = false;
    timer = window.setTimeout(() => {
      if (enabled()) launch();
      schedule();
    }, wait);
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      space.dataset.heroVisible = String(visible);
      schedule();
    },
    { threshold: 0.25 },
  );
  observer.observe(hero);
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', schedule);
  new MutationObserver(schedule).observe(root, {
    attributes: true,
    attributeFilter: ['data-motion'],
  });

  function resetPointer() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    if (!space!.dataset.pointer) return;
    delete space!.dataset.pointer;
    space!.style.removeProperty('--px');
    space!.style.removeProperty('--py');
  }

  // Coalesce pointer movement into one transform update per frame.
  hero.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType !== 'mouse' || !finePointer.matches || !enabled()) return;
      x = Math.round(event.clientX);
      y = Math.round(event.clientY);
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        space.style.setProperty('--px', (x / innerWidth - 0.5).toFixed(3));
        space.style.setProperty('--py', (y / innerHeight - 0.5).toFixed(3));
        space.style.setProperty('--pointer-x', `${x}px`);
        space.style.setProperty('--pointer-y', `${y}px`);
        space.dataset.pointer = 'active';
      });
    },
    { passive: true },
  );
  hero.addEventListener('pointerleave', resetPointer);
  window.addEventListener('blur', resetPointer);
  finePointer.addEventListener('change', resetPointer);
}
