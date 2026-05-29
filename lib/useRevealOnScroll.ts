import { useEffect, useRef } from 'react';

export function useRevealOnScroll(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const items = section.querySelectorAll<HTMLElement>('.reveal-on-scroll');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
