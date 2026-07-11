'use client';

import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { trackCtaClick } from '@/lib/track-cta';

type Props = { whatsapp: string };

export function ArticleStickyBanner({ whatsapp }: Props) {
  const [closed, setClosed] = useState(false);
  if (closed) return null;

  const message = encodeURIComponent(
    'Olá Ana, li um artigo do site e gostaria de conversar sobre um projeto.',
  );
  const url = `https://wa.me/${whatsapp}?text=${message}`;

  return (
    <div className="pointer-events-none fixed bottom-8 right-8 z-30 hidden lg:block">
      <div className="animate-slide-in-right pointer-events-auto relative flex max-w-[280px] flex-col gap-3 rounded-[16px] border border-[#d8c9b8] bg-[#eee5da] p-5 shadow-[0_24px_64px_rgba(42,31,22,0.20)]">
        <button
          onClick={() => setClosed(true)}
          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-[#756b60] transition-colors hover:bg-[#f1ebe3] hover:text-[#171411]"
          aria-label="Fechar"
        >
          <X className="h-3 w-3" />
        </button>
        <div className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#9a744d]">
          Fale com a Ana
        </div>
        <p className="pr-4 font-serif text-[1rem] leading-[1.25] tracking-[-0.02em] text-[#171411]">
          Quer aplicar isso{' '}
          <em className="italic text-[#9a744d]">no seu projeto?</em>
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCtaClick('sticky')}
          className="flex items-center justify-center gap-2 rounded-[10px] bg-[#171614] px-4 py-2.5 text-[0.82rem] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#29231f]"
        >
          <MessageCircle className="h-4 w-4" />
          Solicitar orçamento
        </a>
      </div>
    </div>
  );
}
