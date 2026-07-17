'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useMenu } from '@/contexts/MenuContext';

/**
 * Menu offcanvas com animação GSAP (baseado em asset premium comprado).
 *
 * Comportamento:
 * - Fechado: apenas o site é visível (via #site-scale-wrapper)
 * - Aberto: o site encolhe pra 50% + clip-path fecha em losango no centro,
 *   revelando 5 linhas do menu que deslizam de fora pra dentro
 *
 * Adaptado do vanilla HTML/CSS/JS pro Next.js com paleta Ana Laura
 * (bege papel + taupe + Newsreader italic).
 */

const MENU_ITEMS = [
  // Linha 1 — grande, à direita
  { row: 1, align: 'right', items: [{ label: 'Manifesto', href: '#manifesto' }] },
  // Linha 2 — médio, à direita
  { row: 2, align: 'right', items: [{ label: 'Sobre', href: '#sobre' }] },
  // Linha 3 — médio, à esquerda
  { row: 3, align: 'left', items: [{ label: 'Pilares', href: '#pilares' }] },
  // Linha 4 — grande, split
  {
    row: 4,
    align: 'split',
    items: [
      { label: 'Serviços', href: '#servicos' },
      { label: 'Passo a Passo', href: '#passos' },
    ],
  },
  // Linha 5 — médio, split
  {
    row: 5,
    align: 'split',
    items: [
      { label: 'Portfólio', href: '#portfolio' },
      { label: 'Contato', href: '#contato' },
    ],
  },
] as const;

// Tamanhos por linha (em rem) — desktop / mobile
const ROW_STYLES: Record<
  number,
  {
    fontSizeDesktop: string;
    fontSizeMobile: string;
    justifyContent: string;
    paddingLeft?: string;
    paddingRight?: string;
    initialLeft: string;
  }
> = {
  1: {
    fontSizeDesktop: '7.8rem',
    fontSizeMobile: '3rem',
    justifyContent: 'flex-end',
    paddingRight: '2rem',
    initialLeft: '-110%',
  },
  2: {
    fontSizeDesktop: '6.25rem',
    fontSizeMobile: '2.4rem',
    justifyContent: 'flex-end',
    paddingRight: '2rem',
    initialLeft: '110%',
  },
  3: {
    fontSizeDesktop: '6.25rem',
    fontSizeMobile: '2.4rem',
    justifyContent: 'flex-start',
    paddingLeft: '2rem',
    initialLeft: '-110%',
  },
  4: {
    fontSizeDesktop: '8rem',
    fontSizeMobile: '2.6rem',
    justifyContent: 'space-between',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    initialLeft: '110%',
  },
  5: {
    fontSizeDesktop: '6.5rem',
    fontSizeMobile: '2.4rem',
    justifyContent: 'space-between',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    initialLeft: '-110%',
  },
};

export function OffCanvasMenu() {
  const { isOpen, close } = useMenu();
  const pathname = usePathname();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao trocar de rota
  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Cria timeline uma única vez
  useEffect(() => {
    // Aguarda o wrapper existir (client-side)
    const wrapper = document.getElementById('site-scale-wrapper');
    if (!wrapper) return;

    const rows = rowsRef.current?.querySelectorAll('.off-canvas-row');
    if (!rows || rows.length === 0) return;

    const tl = gsap.timeline({ paused: true });

    // Site encolhe + clip-path fecha no centro
    tl.to(wrapper, {
      duration: 1.4,
      ease: 'power4.inOut',
      clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
      scale: 0.85,
    });

    // Rows deslizam (stagger)
    tl.to(
      rows,
      {
        duration: 1.6,
        left: '0%',
        ease: 'power4.inOut',
        stagger: 0.08,
      },
      '-=1.2',
    );

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  // Toca timeline conforme o state
  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    if (isOpen) {
      tl.play();
      document.body.style.overflow = 'hidden';
    } else {
      tl.reverse();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ESC fecha
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  return (
    <div
      ref={rowsRef}
      aria-hidden={!isOpen}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        // CRÍTICO: menu fica POR BAIXO do site (z:0). Quando site encolhe
        // com clip-path, ele revela o menu que estava embaixo. Igual ao
        // asset original.
        zIndex: 0,
        // overflow hidden garante que as linhas com left: -110%/+110% fiquem
        // realmente escondidas fora da viewport
        overflow: 'hidden',
        pointerEvents: isOpen ? 'auto' : 'none',
        background: '#f5f0e9',
      }}
    >
      {/* Container das linhas — vertical center */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '1400px',
          padding: '0 1rem',
        }}
      >
        {MENU_ITEMS.map((rowConfig) => {
          const style = ROW_STYLES[rowConfig.row];
          return (
            <div
              key={rowConfig.row}
              className="off-canvas-row"
              data-row={rowConfig.row}
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: style.justifyContent,
                left: style.initialLeft, // ponto inicial off-screen
                paddingLeft: style.paddingLeft,
                paddingRight: style.paddingRight,
                marginTop: rowConfig.row === 1 ? 0 : '-0.15em',
              }}
            >
              {rowConfig.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="off-canvas-link"
                  style={{
                    color: '#171411',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    letterSpacing: '-0.045em',
                    lineHeight: 1,
                    transition: 'color 0.3s',
                    // Tamanho responsivo via CSS var (setado abaixo pelo <style>)
                    fontSize: `var(--row-${rowConfig.row}-size, ${style.fontSizeDesktop})`,
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = '#9a744d';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = '#171411';
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          );
        })}
      </div>

      {/* Responsive font sizes via CSS */}
      <style jsx>{`
        :global(.off-canvas-row) {
          --row-1-size: ${ROW_STYLES[1].fontSizeDesktop};
          --row-2-size: ${ROW_STYLES[2].fontSizeDesktop};
          --row-3-size: ${ROW_STYLES[3].fontSizeDesktop};
          --row-4-size: ${ROW_STYLES[4].fontSizeDesktop};
          --row-5-size: ${ROW_STYLES[5].fontSizeDesktop};
        }
        @media (max-width: 900px) {
          :global(.off-canvas-row) {
            --row-1-size: ${ROW_STYLES[1].fontSizeMobile};
            --row-2-size: ${ROW_STYLES[2].fontSizeMobile};
            --row-3-size: ${ROW_STYLES[3].fontSizeMobile};
            --row-4-size: ${ROW_STYLES[4].fontSizeMobile};
            --row-5-size: ${ROW_STYLES[5].fontSizeMobile};
          }
        }
      `}</style>
    </div>
  );
}
