'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, ArrowRight } from 'lucide-react';
import {
  ContentDropdown,
  MobileContentAccordion,
} from '@/components/navigation/ContentDropdown';
import { siteConfig } from '@/lib/site-config';

const menuItems = [
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Pilares', href: '#pilares' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Passo a Passo', href: '#passos', hideAtLg: true },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Contato', href: '#contato' },
];

// Fonte única de contato: lib/site-config.ts (siteConfig.contact.phoneRaw).
// O header é global e renderiza em rotas estáticas (SSG), então não lê o valor
// dinâmico do /admin/footer (isso forçaria toda página a virar dinâmica).
// O número/CTA canônicos ficam no siteConfig — Hero e Footer usam o mesmo default.
const WHATSAPP_FALLBACK = siteConfig.contact.phoneRaw;
const CTA_TEXTO = siteConfig.hero.cta;

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(!isHome);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fechar drawer ao trocar de rota
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Scroll listener só na home; nas outras rotas fica scrolled=true fixo
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

  const buildLink = (anchor: string) => (isHome ? anchor : `/${anchor}`);

  const message = encodeURIComponent(
    'Olá Ana, gostaria de solicitar um orçamento para meu projeto.',
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_FALLBACK}?text=${message}`;

  const shouldHideAdmin = pathname?.startsWith('/admin');
  if (shouldHideAdmin) return null;

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
          borderBottom: scrolled
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo — sempre volta pra / */}
          <a
            href="/"
            aria-label="Ana Laura Noronha — Engenharia e Interiores"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              // No topo da home (não scrolled + fundo escuro), inverte pra branco
              filter: scrolled ? 'none' : 'brightness(0) invert(1)',
              transition: 'filter 0.3s',
            }}
          >
            <Image
              src="/logotipo-an.png"
              alt="Ana Laura Noronha — Engenharia e Interiores"
              width={200}
              height={66}
              priority
              style={{
                height: '66px',
                width: 'auto',
                objectFit: 'contain',
              }}
            />
          </a>

          {/* Desktop nav */}
          <nav
            style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
            className="hidden lg:flex"
          >
            {menuItems.map((item) => {
              if (item.label === 'Portfólio') {
                return (
                  <div
                    key={item.href}
                    style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
                  >
                    <a
                      href={buildLink(item.href)}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        letterSpacing: '-0.01em',
                        color: scrolled ? '#3a332d' : 'rgba(255,255,255,0.90)',
                        textDecoration: 'none',
                        transition: 'color 0.3s',
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.color = '#a67b4f';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.color = scrolled
                          ? '#3a332d'
                          : 'rgba(255,255,255,0.90)';
                      }}
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
                  href={buildLink(item.href)}
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
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = '#a67b4f';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = scrolled
                      ? '#3a332d'
                      : 'rgba(255,255,255,0.90)';
                  }}
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
              {CTA_TEXTO}
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
          maxHeight: isMenuOpen ? '460px' : '0',
          opacity: isMenuOpen ? 1 : 0,
          transition:
            'max-height 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease',
          background: '#f5f0e9',
          borderBottom: '1px solid #d8c9b8',
        }}
      >
        <div style={{ padding: '24px' }}>
          <nav
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            {menuItems.map((item) => (
              <div key={item.href}>
                <a
                  href={buildLink(item.href)}
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
                    <MobileContentAccordion
                      onNavigate={() => setIsMenuOpen(false)}
                    />
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
            <span>{CTA_TEXTO}</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </>
  );
}
