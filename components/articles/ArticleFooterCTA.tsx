'use client';

import { ArrowRight } from 'lucide-react';
import { trackCtaClick } from '@/lib/track-cta';

type Props = { whatsapp: string };

export function ArticleFooterCTA({ whatsapp }: Props) {
  const message = encodeURIComponent(
    'Olá Ana, li um artigo do site e gostaria de conversar sobre um projeto.',
  );
  const url = `https://wa.me/${whatsapp}?text=${message}`;

  return (
    <div className="my-16 rounded-[1.35rem] border border-[#d8c9b8] bg-[#eee5da] p-8 text-center lg:p-12">
      <div className="mb-4 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[#9a744d]">
        Vamos aplicar no seu projeto?
      </div>
      <h3 className="mb-4 font-serif text-[clamp(1.5rem,2.5vw,2.15rem)] leading-[1.1] tracking-[-0.04em] text-[#171411]">
        Ótimo — agora que você tem essa clareza,{' '}
        <em className="italic text-[#9a744d]">
          vamos conversar sobre a sua obra.
        </em>
      </h3>
      <p className="mx-auto mb-8 max-w-[520px] text-[1rem] leading-[1.6] text-[#3a332d]">
        Entre em contato pelo WhatsApp. Respondo pessoalmente e faço uma
        proposta em até 5 dias úteis.
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackCtaClick('contato')}
        className="group inline-flex h-[58px] items-center gap-3 rounded-[12px] bg-[#171614] px-8 text-[0.95rem] font-bold text-white shadow-[0_18px_44px_rgba(28,22,17,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#29231f]"
      >
        Solicitar orçamento
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}
