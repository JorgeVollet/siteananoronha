'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';

/**
 * Smooth scroll global com Lenis.
 * Envolve toda a árvore para que o scroll fique cinematográfico
 * — base para todas as animações on-scroll do Framer Motion / GSAP.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2
    });

    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
