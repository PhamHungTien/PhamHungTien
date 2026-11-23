/**
 * Decorative scenes (the home orbit, the star field) run only while they are on screen
 * and the tab is visible: each gets data-running="true|false" for its CSS to follow.
 */
const scenes = document.querySelectorAll<HTMLElement>('[data-motion-scene]');
const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const visible = new Set<Element>();
const updateScenes = () => {
  const enabled = !reduced.matches && !document.hidden;
  const preference = reduced.matches ? 'off' : 'on';
  if (root.dataset.motion !== preference) root.dataset.motion = preference;
  scenes.forEach((scene) => {
    scene.dataset.running = String(visible.has(scene) && enabled);
  });
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
updateScenes();
