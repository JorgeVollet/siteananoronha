'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { CATEGORY_META } from '@/lib/seo/site-config';

type Props = {
  scrolled: boolean;
};

const CLOSE_DELAY_MS = 150;

/**
 * Item "Conteúdo" no HeroHeader desktop. Abre painel com as 4 categorias.
 * Segue o mesmo esquema de cor do HeroHeader (muda com o scroll).
 */
export function ContentDropdown({ scrolled }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const categories = Object.values(CATEGORY_META);

  // Cancela qualquer fechamento agendado
  function cancelClose() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  // Agenda o fechamento com um pequeno grace-period
  function scheduleClose() {
    cancelClose();
    closeTimerRef.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }

  // Limpa o timer se o componente for desmontado
  useEffect(() => {
    return () => cancelClose();
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  const baseColor = scrolled ? '#3a332d' : 'rgba(255,255,255,0.90)';

  return (
    <div
      ref={ref}
      style={{ position: 'relative' }}
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      {/* Hover bridge invisível — cobre o gap de 14px entre botão e painel */}
      {open && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            height: '14px',
            zIndex: 59,
          }}
          onMouseEnter={cancelClose}
        />
      )}
      <Link
        href="/conteudo"
        aria-haspopup="menu"
        aria-expanded={open}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '0.88rem',
          letterSpacing: '-0.01em',
          color: baseColor,
          transition: 'color 0.3s',
          textDecoration: 'none',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.color = '#a67b4f';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.color = baseColor;
        }}
      >
        Conteúdo
        <ChevronDown
          size={14}
          style={{
            transition: 'transform 0.25s',
            transform: open ? 'rotate(180deg)' : 'rotate(0)',
          }}
        />
      </Link>

      {/* Painel */}
      <div
        role="menu"
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '14px',
          width: '340px',
          background: '#f5f0e9',
          border: '1px solid #d8c9b8',
          borderRadius: '14px',
          boxShadow: '0 24px 64px rgba(42,31,22,0.18)',
          overflow: 'hidden',
          zIndex: 60,
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transition: 'opacity 0.22s ease, transform 0.22s ease',
          transformOrigin: 'top center',
        }}
      >
        <div style={{ padding: '8px' }}>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              role="menuitem"
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                padding: '12px 14px',
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#eee5da';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem',
                  color: '#171411',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}
              >
                {cat.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: '#756b60',
                  marginTop: '2px',
                  lineHeight: 1.4,
                }}
              >
                {cat.description}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Versão mobile: acordeão dentro do drawer do HeroHeader.
 */
export function MobileContentAccordion({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const categories = Object.values(CATEGORY_META);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: 0,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '1rem',
          color: '#171411',
          letterSpacing: '-0.01em',
        }}
      >
        Conteúdo
        <ChevronDown
          size={16}
          style={{
            transition: 'transform 0.25s',
            transform: open ? 'rotate(180deg)' : 'rotate(0)',
            color: '#9a744d',
          }}
        />
      </button>
      <div
        style={{
          overflow: 'hidden',
          maxHeight: open ? '400px' : '0',
          opacity: open ? 1 : 0,
          transition:
            'max-height 0.32s cubic-bezier(0.22,1,0.36,1), opacity 0.22s ease',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            paddingTop: '12px',
            paddingLeft: '12px',
            borderLeft: '2px solid #d8c9b8',
            marginLeft: '4px',
          }}
        >
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              onClick={onNavigate}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.92rem',
                color: '#3a332d',
                textDecoration: 'none',
              }}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
