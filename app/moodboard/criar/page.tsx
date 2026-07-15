'use client';

import { MoodboardUploader } from '@/components/moodboard/MoodboardUploader';

export default function CriarMoodboardPage() {
  return (
    <main className="min-h-screen bg-[#f5f0e9] pt-[120px] pb-24 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[900px]">
        {/* Eyebrow */}
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-10 bg-[#9a744d]" />
          <span className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#9a744d]">
            Sua ferramenta exclusiva
          </span>
        </div>

        {/* Título */}
        <h1
          className="font-serif"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            lineHeight: 1.02,
            letterSpacing: '-0.045em',
            color: '#171411',
          }}
        >
          Crie seu moodboard editorial
          <br />
          <em className="italic text-[#9a744d]">com as suas referências.</em>
        </h1>

        <p className="mt-6 max-w-[560px] font-serif italic text-[1.15rem] leading-[1.5] text-[#3a332d]">
          Nossa IA transforma suas fotos de referência em uma composição
          editorial no estilo Casa Vogue. Grátis e sem cadastro.
        </p>

        {/* Uploader */}
        <div className="mt-14">
          <MoodboardUploader />
        </div>
      </div>
    </main>
  );
}
