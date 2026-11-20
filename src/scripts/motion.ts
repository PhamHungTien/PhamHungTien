/**
 * Decorative scenes (the home orbit, the star field) run only while they are on screen
 * and the tab is visible: each gets data-running="true|false" for its CSS to follow.
 */
const scenes = document.querySelectorAll<HTMLElement>('[data-motion-scene]');
const visible = new Set<Element>();
const updateScenes = () =>
  scenes.forEach((scene) => {
    scene.dataset.running = String(visible.has(scene) && !document.hidden);
  });

if (scenes.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) =>
      entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target),
    );
    updateScenes();
  });
  scenes.forEach((scene) => observer.observe(scene));
  document.addEventListener('visibilitychange', updateScenes);
}
