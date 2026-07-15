'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PaletteChips } from './PaletteChips';
import { LeadCaptureModal } from './LeadCaptureModal';

type SessionRow = {
  id: string;
  slug: string;
  status: string;
  cover_url: string | null;
  palette: string[] | null;
};

const WHATSAPP = '5555999942637';

export function MoodboardResult({ session }: { session: SessionRow }) {
  const [modalOpen, setModalOpen] = useState(false);
  // Se já entregue, o visitante já virou lead → download direto liberado.
  const [delivered, setDelivered] = useState(session.status === 'delivered');
  const [copied, setCopied] = useState(false);

  const palette = Array.isArray(session.palette) ? session.palette : [];

  function forceDownload(url: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = `moodboard-${session.slug}.png`;
    a.target = '_blank';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function handleDownloadClick() {
    if (delivered && session.cover_url) {
      forceDownload(session.cover_url);
      return;
    }
    setModalOpen(true);
  }

  function handleShare() {
    const url =
      typeof window !== 'undefined'
        ? window.location.href
        : `https://www.ananoronha.eng/moodboard/${session.slug}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    'Olá Ana, acabei de criar um moodboard e gostaria de conversar sobre o meu projeto.',
  )}`;

  return (
    <main className="min-h-screen bg-[#f5f0e9] pt-[120px] pb-24 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        {/* Eyebrow */}
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-10 bg-[#9a744d]" />
          <span className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#9a744d]">
            Seu moodboard editorial
          </span>
        </div>

        {/* Cover — aspect-ratio 16:9 explícito + object-contain garante que
            a imagem apareça INTEIRA (sem crop) e centralizada dentro do
            container mesmo se algum CSS global tentar interferir. */}
        {session.cover_url && (
          <div className="relative aspect-video overflow-hidden rounded-[16px] border border-[#d8c9b8] bg-[#eee5da] shadow-[0_20px_60px_rgba(23,20,17,0.12)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={session.cover_url}
              alt="Seu moodboard editorial"
              className="absolute inset-0 h-full w-full object-contain"
            />
          </div>
        )}

        {/* Paleta */}
        {palette.length > 0 && (
          <div className="mt-8 flex items-center gap-4">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#756b60]">
              Paleta detectada
            </span>
            <PaletteChips palette={palette} />
          </div>
        )}

        {/* Ações */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={handleDownloadClick}
            className="inline-flex h-14 items-center gap-3 rounded-[12px] bg-[#171614] px-7 font-bold text-white hover:bg-[#29231f] transition-all"
          >
            Baixar meu moodboard PNG
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex h-14 items-center gap-3 rounded-[12px] border border-[#d8c9b8] bg-transparent px-7 font-bold text-[#3a332d] hover:border-[#9a744d] transition-all"
          >
            {copied ? 'Link copiado ✓' : 'Compartilhar link'}
          </button>
        </div>

        {/* CTA WhatsApp */}
        <div className="mt-14 rounded-[16px] border border-[#d8c9b8] bg-[#eee5da] p-8 lg:p-10">
          <p className="font-serif italic text-[1.25rem] leading-[1.4] text-[#3a332d]">
            Gostou? Vamos transformar essas ideias em projeto real?
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-14 items-center gap-3 rounded-[12px] bg-[#171614] px-7 font-bold text-white hover:bg-[#29231f] transition-all"
          >
            Conversar com a Ana no WhatsApp →
          </a>
        </div>

        {/* Fazer outro */}
        <div className="mt-10">
          <Link
            href="/moodboard/criar"
            className="text-[0.9rem] font-bold text-[#9a744d] hover:underline"
          >
            ↺ Fazer outro moodboard
          </Link>
        </div>
      </div>

      {modalOpen && (
        <LeadCaptureModal
          sessionId={session.id}
          onClose={() => setModalOpen(false)}
          onDelivered={(url) => {
            setDelivered(true);
            setModalOpen(false);
            forceDownload(url);
          }}
        />
      )}
    </main>
  );
}
