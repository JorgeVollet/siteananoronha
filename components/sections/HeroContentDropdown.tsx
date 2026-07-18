'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, ChevronDown } from 'lucide-react';

const CONTENT_LINKS = [
  { label: 'Blog', href: '/blog', desc: 'Artigos sobre reforma, projeto e decoração' },
  { label: 'Normas', href: '/normas', desc: 'ABNT, NBR e conformidade técnica' },
  { label: 'Curiosidades', href: '/curiosidades', desc: 'Truques e insights de arquitetura' },
  { label: 'Sketch de Ideias', href: '/sketch', desc: 'O caderno criativo do atelier' },
];

/**
 * Botão "Conteúdo" do Hero. Abre dropdown com 4 categorias (Blog, Normas,
 * Curiosidades, Sketch). Comportamento touch-friendly pro mobile.
 */
export function HeroContentDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  // Fecha com ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      {/* Botão trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        style={{
          display: 'flex',
          height: '58px',
          alignItems: 'center',
          gap: '12px',
          borderRadius: '12px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.22)',
          padding: '0 28px',
          fontSize: '0.95rem',
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          letterSpacing: '-0.01em',
          color: '#ffffff',
          cursor: 'pointer',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1), background 0.3s, border-color 0.3s',
        }}
        onMouseEnter={(e) => {
          if (!open) {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.14)';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.40)';
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.22)';
        }}
      >
        <BookOpen size={16} />
        <span>Conteúdo</span>
        <ChevronDown
          size={14}
          style={{
            transition: 'transform 0.3s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 12px)',
            left: 0,
            minWidth: '280px',
            maxWidth: '320px',
            background: 'rgba(23,20,17,0.92)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '14px',
            padding: '8px',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
            zIndex: 20,
            // Animação de entrada
            animation: 'heroDropdownIn 0.22s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {CONTENT_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              role="menuitem"
              style={{
                display: 'block',
                padding: '12px 14px',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  'rgba(255,255,255,0.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                }}
              >
                {link.label}
              </div>
              <div
                style={{
                  marginTop: '2px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.60)',
                  lineHeight: 1.35,
                }}
              >
                {link.desc}
              </div>
            </Link>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes heroDropdownIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
