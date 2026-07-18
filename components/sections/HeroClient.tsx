'use client';

import { ArrowRight, ArrowDown } from 'lucide-react';
import { trackCtaClick } from '@/lib/track-cta';
import { HeroContentDropdown } from './HeroContentDropdown';

type Props = {
  titulo: string;
  subtitulo: string;
  imagemPrincipal: string;
  ctaTexto: string;
  whatsapp: string;
};

function renderTitulo(t: string) {
  const lastComma = t.lastIndexOf(',');
  if (lastComma === -1) return <>{t}</>;
  const before = t.slice(0, lastComma + 1);
  const after = t.slice(lastComma + 1).trim();
  return (
    <>
      {before}{' '}
      <em
        style={{
          fontStyle: 'italic',
          color: '#caa57c',
          fontFamily: 'var(--font-display)',
        }}
      >
        {after}
      </em>
    </>
  );
}

export function HeroClient({
  titulo,
  subtitulo,
  imagemPrincipal,
  ctaTexto,
  whatsapp,
}: Props) {
  const message = encodeURIComponent(
    'Olá Ana, gostaria de solicitar um orçamento para meu projeto.',
  );
  const whatsappUrl = `https://wa.me/${whatsapp}?text=${message}`;

  return (
    <>
      <section
        id="home"
        style={{
          position: 'relative',
          height: '100dvh',
          minHeight: '700px',
          overflow: 'hidden',
        }}
      >
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imagemPrincipal}
            alt=""
            aria-hidden="true"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `
                linear-gradient(95deg, rgba(23,20,17,0.85) 0%, rgba(23,20,17,0.65) 25%, rgba(23,20,17,0.35) 50%, transparent 78%),
                linear-gradient(180deg, transparent 0%, transparent 55%, rgba(23,20,17,0.50) 100%),
                radial-gradient(circle at 18% 80%, rgba(166,123,79,0.20), transparent 52%)
              `,
            }}
          />
        </div>

        {/* Content — align-items controlado pelo CSS (globals.css) */}
        <div
          className="hero-content-wrapper"
          style={{
            position: 'relative',
            zIndex: 10,
            height: '100%',
            display: 'flex',
            // align-items definido no globals.css:
            // mobile → center | desktop >=768 → flex-end
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '1510px',
              margin: '0 auto',
              padding: '0 clamp(24px, 4vw, 56px)',
            }}
          >
            <div style={{ maxWidth: '600px' }}>

              {/* H1 — MUITO maior no mobile, ocupa mais espaço superior */}
              <h1
                className="reveal-once hero-title"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  lineHeight: 0.95,
                  letterSpacing: '-0.055em',
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                {renderTitulo(titulo)}
              </h1>

              {/* Subtítulo — maior no mobile */}
              <p
                className="reveal-once hero-subtitle"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  lineHeight: 1.35,
                  color: 'rgba(255,255,255,0.82)',
                  maxWidth: '560px',
                }}
              >
                {subtitulo}
              </p>

              {/* CTAs — centralizados no mobile, alinhados esquerda no desktop */}
              <div
                className="reveal-once hero-ctas"
                style={{
                  marginTop: '40px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                {/* CTA primário — dark */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCtaClick('hero')}
                  className="hero-cta-primary"
                  style={{
                    display: 'flex',
                    height: '58px',
                    alignItems: 'center',
                    gap: '12px',
                    borderRadius: '12px',
                    background: '#171614',
                    padding: '0 28px',
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    color: '#ffffff',
                    textDecoration: 'none',
                    boxShadow: '0 18px 44px rgba(28,22,17,0.30)',
                    transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), background 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    (e.currentTarget as HTMLElement).style.background = '#29231f';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.background = '#171614';
                  }}
                >
                  <span>{ctaTexto}</span>
                  <ArrowRight size={16} />
                </a>

                {/* CTA Conteúdo — dropdown com 4 categorias */}
                <HeroContentDropdown />

                {/* CTA secundário — glassmorphism */}
                <a
                  href="#portfolio"
                  className="hero-cta-secondary"
                  style={{
                    display: 'flex',
                    height: '58px',
                    alignItems: 'center',
                    gap: '12px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.10)',
                    border: '1px solid rgba(255,255,255,0.30)',
                    padding: '0 28px',
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    color: '#ffffff',
                    textDecoration: 'none',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), background 0.3s, border-color 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.18)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.50)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.10)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.30)';
                  }}
                >
                  <span>Ver Portfólio</span>
                  <ArrowDown size={16} />
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            Role para descobrir
          </span>
          <div
            style={{
              position: 'relative',
              height: '48px',
              width: '1px',
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.20)',
            }}
          >
            <span
              className="animate-scroll-line"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: '12px',
                background: '#caa57c',
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
