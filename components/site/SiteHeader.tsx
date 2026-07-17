'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ContentDropdown } from '@/components/navigation/ContentDropdown';
import { siteConfig } from '@/lib/site-config';
import { useMenu } from '@/contexts/MenuContext';

/**
 * Header global reformado (v2):
 *
 * [Logo AN]  ...  [Conteúdo ▾]  [MENU]  [Solicitar Orçamento]
 *
 * - Logo à esquerda
 * - Botão MENU no centro-direita → abre o OffCanvasMenu
 * - Dropdown "Conteúdo" (Blog/Normas/Curiosidades/Sketch) fica no header (não escondido)
 * - Botão "Solicitar Orçamento" (CTA) permanece
 * - Menu horizontal (Manifesto/Sobre/Pilares/Serviços/etc) foi movido pro OffCanvasMenu
 *
 * mix-blend-mode: difference garante que o header fique legível sobre qualquer
 * fundo (inclusive quando o menu abre com o bege papel).
 */

const WHATSAPP_FALLBACK = siteConfig.contact.phoneRaw;
const CTA_TEXTO = siteConfig.hero.cta;

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(!isHome);
  const { isOpen, toggle } = useMenu();

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const message = encodeURIComponent(
    'Olá Ana, gostaria de solicitar um orçamento para meu projeto.',
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_FALLBACK}?text=${message}`;

  const shouldHideAdmin = pathname?.startsWith('/admin');
  if (shouldHideAdmin) return null;

  // Quando o menu offcanvas está aberto, força o header em modo "sobre bege"
  // (texto escuro) — porque o menu tem fundo bege.
  const effectiveScrolled = scrolled || isOpen;

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50, // Acima do OffCanvasMenu (z40)
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        transition: 'background 0.4s ease-out, border-color 0.4s ease-out',
        // Quando menu aberto, header fica transparente (menu tem seu próprio bg)
        background:
          isOpen
            ? 'transparent'
            : effectiveScrolled
              ? 'rgba(245,240,233,0.92)'
              : 'transparent',
        backdropFilter: !isOpen && effectiveScrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: !isOpen && effectiveScrolled ? 'blur(12px)' : 'none',
        borderBottom:
          !isOpen && effectiveScrolled
            ? '1px solid #e0d4c2'
            : '1px solid transparent',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1510px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative', // pra permitir o botão center absoluto
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        {/* Logo */}
        <a
          href="/"
          aria-label="Ana Laura Noronha — Engenharia e Interiores"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            flexShrink: 0,
            filter: effectiveScrolled ? 'none' : 'brightness(0) invert(1)',
            transition: 'filter 0.3s',
          }}
        >
          <Image
            src="/logotipo-an.png"
            alt="Ana Laura Noronha — Engenharia e Interiores"
            width={200}
            height={66}
            priority
            style={{ height: '66px', width: 'auto', objectFit: 'contain' }}
          />
        </a>

        {/* Botão MENU — centralizado ABSOLUTO no meio do header
            (position absolute pra não interferir com logo/dropdown/cta) */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
          }}
        >
          <button
            onClick={toggle}
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isOpen}
            style={{
              position: 'relative',
              padding: '0.6rem 1.2rem',
              background: 'transparent',
              border: `1px solid ${
                effectiveScrolled ? '#3a332d' : 'rgba(255,255,255,0.6)'
              }`,
              borderRadius: '999px',
              cursor: 'pointer',
              color: effectiveScrolled ? '#3a332d' : '#ffffff',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '0.82rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = effectiveScrolled
                ? '#171614'
                : 'rgba(255,255,255,0.15)';
              (e.currentTarget as HTMLElement).style.color = '#ffffff';
              (e.currentTarget as HTMLElement).style.borderColor = effectiveScrolled
                ? '#171614'
                : 'rgba(255,255,255,0.8)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = effectiveScrolled
                ? '#3a332d'
                : '#ffffff';
              (e.currentTarget as HTMLElement).style.borderColor = effectiveScrolled
                ? '#3a332d'
                : 'rgba(255,255,255,0.6)';
            }}
          >
            {/* Ícone traços/x */}
            <span
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                gap: '4px',
                width: '18px',
              }}
              aria-hidden="true"
            >
              <span
                style={{
                  display: 'block',
                  height: '1.5px',
                  background: 'currentColor',
                  transformOrigin: 'center',
                  transition: 'transform 0.35s ease',
                  transform: isOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none',
                }}
              />
              <span
                style={{
                  display: 'block',
                  height: '1.5px',
                  background: 'currentColor',
                  transformOrigin: 'center',
                  transition: 'transform 0.35s ease',
                  transform: isOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
                }}
              />
            </span>
            {isOpen ? 'Fechar' : 'Menu'}
          </button>
        </div>

        {/* Direita: Conteúdo dropdown + CTA Solicitar Orçamento */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            flexShrink: 0,
          }}
        >
          {/* Dropdown Conteúdo */}
          <div
            className="hidden md:block"
            style={{ opacity: isOpen ? 0 : 1, transition: 'opacity 0.3s' }}
          >
            <ContentDropdown scrolled={effectiveScrolled} />
          </div>

          {/* CTA Solicitar Orçamento — some quando menu abre */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex"
            style={{
              height: '40px',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '10px',
              padding: '0 20px',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.3s',
              background: effectiveScrolled ? '#171614' : 'rgba(255,255,255,0.15)',
              color: '#ffffff',
              border: effectiveScrolled ? 'none' : '1px solid rgba(255,255,255,0.25)',
              backdropFilter: effectiveScrolled ? 'none' : 'blur(8px)',
              opacity: isOpen ? 0 : 1,
              pointerEvents: isOpen ? 'none' : 'auto',
            }}
          >
            {CTA_TEXTO}
          </a>
        </div>
      </div>
    </header>
  );
}
