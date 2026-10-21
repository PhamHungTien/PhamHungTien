/** The app hero image leans gently toward the pointer, so it reads as something you can pick up. */
export function initTilt(): void {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (const el of document.querySelectorAll<HTMLElement>('[data-tilt]')) {
    let frame = 0;
    el.addEventListener('pointermove', (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = el.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width - 0.5;
        const y = (event.clientY - box.top) / box.height - 0.5;
        el.style.setProperty('--tilt-y', `${(x * 6).toFixed(2)}deg`);
        el.style.setProperty('--tilt-x', `${(-y * 5).toFixed(2)}deg`);
      });
    });
    el.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      el.style.removeProperty('--tilt-x');
      el.style.removeProperty('--tilt-y');
    });
  }
}
