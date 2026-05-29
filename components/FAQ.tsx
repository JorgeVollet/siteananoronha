'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/site-config';

function FaqItem({ question, answer, open, onToggle }: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={cn(
      'group border-b transition-colors duration-300',
      open ? 'border-[#9a744d]/40' : 'border-[#d8c9b8]/60 hover:border-[#9a744d]/30'
    )}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-6 pl-0 pr-0 text-left transition-all duration-200"
        style={{ outline: 'none' }}
      >
        {/* Pergunta com linha lateral taupe */}
        <div className="relative flex-1 pl-5">
          <span
            aria-hidden="true"
            className={cn(
              'absolute left-0 top-1/2 w-[2px] -translate-y-1/2 rounded-full bg-[#9a744d] transition-all duration-300',
              open ? 'h-6 opacity-100' : 'h-0 opacity-0 group-hover:h-4 group-hover:opacity-50'
            )}
          />
          <h3
            className={cn(
              'transition-colors duration-200',
              open ? 'text-[#171411]' : 'text-[#3a332d] group-hover:text-[#171411]'
            )}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(1rem,1.4vw,1.15rem)',
              lineHeight: 1.3,
              letterSpacing: '-0.025em',
            }}
          >
            {question}
          </h3>
        </div>

        {/* Botão circular +/− */}
        <div
          className={cn(
            'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300',
            open
              ? 'border-[#9a744d] bg-[#9a744d] text-white'
              : 'border-[#d1c4b7] bg-[#f1ebe3] text-[#9a744d] group-hover:border-[#9a744d]/60'
          )}
        >
          {open
            ? <Minus className="h-4 w-4" aria-hidden="true" />
            : <Plus  className="h-4 w-4" aria-hidden="true" />
          }
        </div>
      </button>

      {/* Resposta — grid-rows para animação suave sem max-height */}
      <div
        className={cn(
          'grid transition-all duration-300 ease-out',
          open ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <p
            className="pl-5 pr-12"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '0.95rem',
              lineHeight: 1.72,
              letterSpacing: '-0.01em',
              color: '#5a5047',
            }}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-label="Dúvidas Frequentes — Ana Laura Noronha"
      className="relative py-20 px-6 sm:px-8 lg:py-28 lg:px-12 xl:px-14"
      style={{
        scrollMarginTop: '88px',
        background:
          'radial-gradient(circle at 20% 10%, rgba(255,255,255,0.72), transparent 32%), ' +
          'radial-gradient(circle at 82% 88%, rgba(221,211,198,0.28), transparent 36%), ' +
          'var(--color-background)',
      }}
    >
      <div className="mx-auto max-w-[920px]">

        {/* Header centralizado */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center rounded-full px-5 py-2"
            style={{ background: '#171614' }}
          >
            <span
              className="text-[0.72rem] font-bold tracking-[0.18em] uppercase"
              style={{ fontFamily: 'var(--font-body)', color: '#caa57c' }}
            >
              Atendimento
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(36px,5vw,68px)',
              lineHeight: 1.0,
              letterSpacing: '-0.055em',
              color: '#171411',
            }}
          >
            Dúvidas{' '}
            <em style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>
              frequentes
            </em>
            .
          </h2>

          <p
            className="mx-auto mt-6 max-w-[520px]"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '1rem',
              lineHeight: 1.6,
              letterSpacing: '-0.015em',
              color: '#5a5047',
            }}
          >
            Tudo o que clientes geralmente perguntam antes de iniciar um projeto.
          </p>
        </div>

        {/* Lista de FAQs */}
        <div>
          {siteConfig.faqs.map((faq, i) => (
            <FaqItem
              key={i}
              question={faq.q}
              answer={faq.a}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
