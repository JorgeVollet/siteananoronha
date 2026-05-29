import { useEffect, useRef, useState } from 'react';

export function useRevealOnce(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Respeita prefers-reduced-motion: mostra imediatamente sem animação
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      return;
    }
    if (!ref.current || revealed) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [revealed, threshold]);

  return { ref, revealed };
}
