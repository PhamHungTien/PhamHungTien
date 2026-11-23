/**
 * Decorative scenes (the home orbit, the star field) run only while they are on screen
 * and the tab is visible: each gets data-running="true|false" for its CSS to follow.
 */
const scenes = document.querySelectorAll<HTMLElement>('[data-motion-scene]');
const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const toggle = document.querySelector<HTMLButtonElement>('[data-motion-toggle]');
const visible = new Set<Element>();
const updateScenes = () => {
  const paused = root.dataset.motion === 'off';
  const enabled = !paused && !reduced.matches && !document.hidden;
  scenes.forEach((scene) => {
    scene.dataset.running = String(visible.has(scene) && enabled);
  });
  if (toggle) {
    toggle.hidden = reduced.matches;
    toggle.dataset.paused = String(paused);
    const label = paused ? toggle.dataset.labelPlay : toggle.dataset.labelPause;
    if (label) {
      toggle.setAttribute('aria-label', label);
      toggle.title = label;
    }
  }
};

if (scenes.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) =>
      entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target),
    );
    updateScenes();
  });
  scenes.forEach((scene) => observer.observe(scene));
}
document.addEventListener('visibilitychange', updateScenes);
reduced.addEventListener('change', updateScenes);
toggle?.addEventListener('click', () => {
  root.dataset.motion = root.dataset.motion === 'off' ? 'on' : 'off';
  updateScenes();
});
updateScenes();
