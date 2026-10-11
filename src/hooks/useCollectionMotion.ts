import { useEffect, useLayoutEffect, useRef } from 'react';

const useBrowserLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** Animate surviving cards into their new positions without delaying filtering. */
export function useCollectionMotion(identity: string) {
  const ref = useRef<HTMLDivElement>(null);
  const previous = useRef(new Map<string, DOMRect>());
  useBrowserLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-product]'));
    const next = new Map<string, DOMRect>();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Finish layout reads before starting animations that write presentation state.
    for (const card of cards) next.set(card.dataset.product!, card.getBoundingClientRect());
    cards.forEach((card, index) => {
      const key = card.dataset.product!;
      const bounds = next.get(key)!;
      const old = previous.current.get(key);
      if (reduce || !previous.current.size) return;
      card.getAnimations().filter(animation => animation.id === 'collection-layout').forEach(animation => animation.cancel());
      const animation = card.animate(old
        ? [{ translate: `${old.left - bounds.left}px ${old.top - bounds.top}px` }, { translate: '0px 0px' }]
        : [{ opacity: 0, translate: '0px 12px' }, { opacity: 1, translate: '0px 0px' }],
      { duration: 380, delay: old ? 0 : Math.min(index * 35, 140), easing: 'cubic-bezier(.22,1,.36,1)' });
      animation.id = 'collection-layout';
    });
    previous.current = next;
    return () => cards.forEach(card => card.getAnimations().filter(animation => animation.id === 'collection-layout').forEach(animation => animation.cancel()));
  }, [identity]);
  return ref;
}
