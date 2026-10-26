/**
 * Product pages: the app's planet orbits its screenshot in 3D, passing behind the image
 * (smaller, dimmer) and in front of it (larger), the same way it circles the sun on the
 * home page. One requestAnimationFrame loop that sleeps off screen and when motion is off.
 */
export function initAppMoon(): void {
  const stage = document.querySelector<HTMLElement>('[data-moon-stage]');
  const moon = stage?.querySelector<HTMLElement>('[data-moon]');
  if (!stage || !moon) return;

  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const PERIOD = 26;
  const CAMERA = 2.4;
  let angle = 0.35; // Starts in front, lower right
  let frame = 0;
  let previous = 0;
  let visible = false;
  let speed = 1;

  const enabled = () => !reduced.matches && root.dataset.motion !== 'off';

  function draw() {
    const w = stage!.clientWidth;
    const h = stage!.clientHeight;
    const rx = w * 0.62;
    const ry = h * 0.3;
    const tilt = -0.28;
    const z = Math.sin(angle); // +1 in front of the screenshot, -1 behind it
    const scale = CAMERA / (CAMERA - z * 0.55);
    const x0 = Math.cos(angle) * rx;
    const y0 = Math.sin(angle) * ry;
    const x = x0 * Math.cos(tilt) - y0 * Math.sin(tilt);
    const y = x0 * Math.sin(tilt) + y0 * Math.cos(tilt);
    moon!.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
    moon!.style.zIndex = z >= 0 ? '3' : '0';
    moon!.style.setProperty('--depth', z.toFixed(3));
    // Lit from the upper left, like the page's light source.
    moon!.style.setProperty('--light', `${(-40 - (x0 / rx) * 20).toFixed(1)}deg`);
  }

  function tick(now: number) {
    frame = 0;
    if (!enabled() || !visible || document.hidden) return;
    const dt = previous ? Math.min((now - previous) / 1000, 0.05) : 1 / 60;
    previous = now;
    // Slightly faster in front, like a body near the camera.
    angle += ((dt * Math.PI * 2) / PERIOD) * speed * (1 + 0.25 * Math.sin(angle));
    draw();
    frame = requestAnimationFrame(tick);
  }

  function sync() {
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    stage!.dataset.moon = enabled() ? 'live' : 'still';
    if (!enabled()) {
      angle = -0.5; // Parked in front, upper right
      draw();
      return;
    }
    draw();
    if (visible && !document.hidden) frame = requestAnimationFrame(tick);
  }

  stage.addEventListener('pointerenter', () => (speed = 0.35));
  stage.addEventListener('pointerleave', () => (speed = 1));
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  }).observe(stage);
  new ResizeObserver(draw).observe(stage);
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['data-motion'] });
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  sync();
}
