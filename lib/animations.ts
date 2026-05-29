import type { Variants } from 'framer-motion';

/**
 * Curva mestra "silky" — Apple/Stripe vibe.
 * Use sempre que possível para consistência.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_SPRING = [0.175, 0.885, 0.32, 1.275] as const;

/** Fade up genérico — entra subindo */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE }
  }
};

/** Fade right — entra da esquerda */
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: EASE }
  }
};

/** Fade left — entra da direita */
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: EASE }
  }
};

/** Fade simples */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: 'easeOut' }
  }
};

/** Container que dispara stagger nos filhos */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

/** Stagger mais lento para sessões hero */
export const staggerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2
    }
  }
};

/** Scale-in elegante (cards, ícones) */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE }
  }
};

/** Reveal letra por letra (split text) */
export const letterReveal: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: EASE,
      delay: i * 0.04
    }
  })
};

/** Defaults para useInView — anima toda vez que entra/sai */
export const viewportConfig = {
  once: false,
  amount: 0.2 as const,
  margin: '-80px' as const
};
