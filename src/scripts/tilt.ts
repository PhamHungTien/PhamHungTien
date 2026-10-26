/** Pointer work is coalesced into one frame; no idle rendering loop or touch listeners. */
export function initTilt(): () => void {
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const controller = new AbortController();
  const elements = document.querySelectorAll<HTMLElement>('[data-tilt], [data-spotlight]');
  const resets: (() => void)[] = [];
  elements.forEach((el) => {
    let frame = 0;
    let box: DOMRect | undefined;
    const reset = () => {
      cancelAnimationFrame(frame);
      box = undefined;
      for (const property of ['--tilt-x', '--tilt-y', '--pointer-x', '--pointer-y'])
        el.style.removeProperty(property);
      el.removeAttribute('data-pointer-active');
    };
    resets.push(reset);
    el.addEventListener(
      'pointerenter',
      () => {
        box = el.getBoundingClientRect();
      },
      { signal: controller.signal },
    );
    el.addEventListener(
      'pointermove',
      (event) => {
        if (!fine.matches || event.pointerType === 'touch') return;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          box ??= el.getBoundingClientRect();
          if (!box.width || !box.height) return;
          const x = Math.max(0, Math.min(1, (event.clientX - box.left) / box.width));
          const y = Math.max(0, Math.min(1, (event.clientY - box.top) / box.height));
          const strength = Number(el.dataset.tiltStrength ?? 7);
          el.style.setProperty('--tilt-y', `${((x - 0.5) * strength).toFixed(2)}deg`);
          el.style.setProperty('--tilt-x', `${((0.5 - y) * strength).toFixed(2)}deg`);
          el.style.setProperty('--pointer-x', `${(x * 100).toFixed(1)}%`);
          el.style.setProperty('--pointer-y', `${(y * 100).toFixed(1)}%`);
          el.dataset.pointerActive = '';
        });
      },
      { signal: controller.signal },
    );
    el.addEventListener('pointerleave', reset, { signal: controller.signal });
    el.addEventListener('pointercancel', reset, { signal: controller.signal });
  });
  const resetAll = () => resets.forEach((reset) => reset());
  window.addEventListener('scroll', resetAll, { passive: true, signal: controller.signal });
  window.addEventListener('resize', resetAll, { passive: true, signal: controller.signal });
  return () => {
    controller.abort();
    resetAll();
  };
}
