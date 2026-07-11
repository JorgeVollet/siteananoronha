'use client';

import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { ContentDropdown, MobileContentAccordion } from '@/components/navigation/ContentDropdown';

const menuItems = [
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Pilares', href: '#pilares' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Passo a Passo', href: '#passos', hideAtLg: true },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Contato', href: '#contato' },
];

type Props = {
  scrolled: boolean;
  whatsapp: string;
  ctaTexto: string;
};

export function HeroHeader({ scrolled, whatsapp, ctaTexto }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const message = encodeURIComponent('Olá Ana, gostaria de solicitar um orçamento para meu projeto.');
  const whatsappUrl = `https://wa.me/${whatsapp}?text=${message}`;

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          transition: 'background 0.4s ease-out, border-color 0.4s ease-out',
          background: scrolled ? 'rgba(245,240,233,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #e0d4c2' : '1px solid transparent',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1510px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <a
            href="#home"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '28px',
              lineHeight: 1,
              letterSpacing: '-0.05em',
              fontWeight: 400,
              color: scrolled ? '#171411' : '#ffffff',
              textDecoration: 'none',
              transition: 'color 0.3s',
            }}
          >
            AN
          </a>

          {/* Desktop nav */}
          <nav
            style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
            className="hidden lg:flex"
          >
            {menuItems.map((item) => {
              if (item.label === 'Portfólio') {
                return (
                  <div key={item.href} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <a
                      href={item.href}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        letterSpacing: '-0.01em',
                        color: scrolled ? '#3a332d' : 'rgba(255,255,255,0.90)',
                        textDecoration: 'none',
                        transition: 'color 0.3s',
                      }}
                      onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#a67b4f'; }}
                      onMouseLeave={(e) => { (e.target as HTMLElement).style.color = scrolled ? '#3a332d' : 'rgba(255,255,255,0.90)'; }}
                    >
                      {item.label}
                    </a>
                    <ContentDropdown scrolled={scrolled} />
                  </div>
                );
              }
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={item.hideAtLg ? 'hidden xl:inline' : undefined}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    letterSpacing: '-0.01em',
                    color: scrolled ? '#3a332d' : 'rgba(255,255,255,0.90)',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#a67b4f'; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = scrolled ? '#3a332d' : 'rgba(255,255,255,0.90)'; }}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right: CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex"
              style={{
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '10px',
                padding: '0 20px',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.3s',
                background: scrolled ? '#171614' : 'rgba(255,255,255,0.15)',
                color: '#ffffff',
                border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.25)',
                backdropFilter: scrolled ? 'none' : 'blur(8px)',
              }}
            >
              {ctaTexto}
            </a>

            <button
              onClick={() => setIsMenuOpen((o) => !o)}
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              className="lg:hidden"
              style={{
                padding: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: scrolled ? '#171411' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.3s',
              }}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className="lg:hidden"
        style={{
          position: 'fixed',
          top: '72px',
          left: 0,
          right: 0,
          zIndex: 40,
          overflow: 'hidden',
          maxHeight: isMenuOpen ? '400px' : '0',
          opacity: isMenuOpen ? 1 : 0,
          transition: 'max-height 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease',
          background: '#f5f0e9',
          borderBottom: '1px solid #d8c9b8',
        }}
      >
        <div style={{ padding: '24px' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {menuItems.map((item) => (
              <div key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: '#171411',
                    letterSpacing: '-0.01em',
                    textDecoration: 'none',
                    display: 'block',
                  }}
                >
                  {item.label}
                </a>
                {item.label === 'Portfólio' && (
                  <div style={{ marginTop: '20px' }}>
                    <MobileContentAccordion onNavigate={() => setIsMenuOpen(false)} />
                  </div>
                )}
              </div>
            ))}
          </nav>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            style={{
              marginTop: '24px',
              display: 'flex',
              height: '48px',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              borderRadius: '10px',
              background: '#171614',
              color: '#ffffff',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '0.88rem',
              textDecoration: 'none',
            }}
          >
            <span>{ctaTexto}</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </>
  );
}
