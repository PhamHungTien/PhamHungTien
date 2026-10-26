/**
 * Occasional shooting stars across the shared space background (often on the home page,
 * rarely on reading pages so they never distract), plus a slight parallax of the star field
 * that follows the mouse. Nothing renders in a loop: each meteor is one Web Animation that
 * removes itself, and the scheduler sleeps while the tab is hidden or motion is turned off.
 */
export function initShootingStars(): void {
  const sky = document.querySelector<HTMLElement>('[data-sky]');
  if (!sky || typeof sky.animate !== 'function') return;

  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const space = document.querySelector<HTMLElement>('.space');

  // The home universe gets a lively sky; every other page a calm one.
  const universe = !!document.querySelector('[data-planet-system]');
  const lively = () => universe && scrollY < innerHeight * 0.8;
  let timer = 0;
  let visible = false;
  let first = true;

  const enabled = () => !reduced.matches && root.dataset.motion !== 'off';
  const random = (min: number, max: number) => min + Math.random() * (max - min);

  function launch(delay = 0) {
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
    const startY = random(-0.05, lively() ? 0.55 : 0.4) * h;
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
      { duration, delay, easing: 'cubic-bezier(0.3, 0, 0.6, 1)', fill: 'both' },
    );
    animation.finished.then(() => meteor.remove()).catch(() => meteor.remove());
  }

  function schedule() {
    clearTimeout(timer);
    if (!enabled() || !visible || document.hidden) return;
    // The first one comes soon after the intro so visitors notice it.
    const wait = first
      ? lively()
        ? 2600
        : 6000
      : lively()
        ? random(2400, 6400)
        : random(9000, 18000);
    first = false;
    timer = window.setTimeout(() => {
      launch();
      if (lively() && Math.random() < 0.22) launch(random(160, 420)); // Now and then, a pair
      schedule();
    }, wait);
  }

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    schedule();
  }).observe(sky);
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', schedule);
  new MutationObserver(schedule).observe(root, {
    attributes: true,
    attributeFilter: ['data-motion'],
  });

  // Depth parallax: near stars drift more than far ones as the mouse moves.
  if (space) {
    let queued = false;
    let nx = 0;
    let ny = 0;
    window.addEventListener(
      'pointermove',
      (event) => {
        if (event.pointerType !== 'mouse' || !finePointer.matches || !enabled()) return;
        nx = event.clientX / innerWidth - 0.5;
        ny = event.clientY / innerHeight - 0.5;
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
          queued = false;
          space.style.setProperty('--px', nx.toFixed(3));
          space.style.setProperty('--py', ny.toFixed(3));
        });
      },
      { passive: true },
    );
  }
}
