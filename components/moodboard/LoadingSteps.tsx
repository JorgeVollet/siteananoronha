'use client';

const STEPS = [
  { label: 'Preparando as suas fotos...', hint: '' },
  { label: 'Enviando suas referências...', hint: '' },
  { label: 'Identificando o que cada referência traz...', hint: '' },
  { label: 'Compondo seu moodboard editorial...', hint: '' },
];

export function LoadingSteps({ step }: { step: number }) {
  return (
    <div className="py-24 text-center">
      <p className="font-serif italic text-[1.6rem] text-[#171411]">
        {STEPS[step]?.label ?? STEPS[0].label}
      </p>
      <div className="mt-8 h-1 bg-[#d8c9b8] rounded-full overflow-hidden max-w-md mx-auto">
        <div
          className="h-full bg-[#9a744d] transition-all duration-1000"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>
      <p className="mt-6 text-[0.85rem] text-[#756b60] italic">
        Isso costuma levar entre 8 e 15 segundos.
      </p>
    </div>
  );
}
