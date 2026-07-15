'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { LoadingSteps } from './LoadingSteps';

type ImageState = {
  id: string;
  file: File;
  previewUrl: string;
  status: 'uploading' | 'ready' | 'error';
};

// Room types — precisa bater com o tipo RoomType do backend (build-brief.ts)
const ROOM_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'Deixar a IA decidir pelas fotos' },
  { value: 'living-room', label: 'Sala de estar' },
  { value: 'kitchen', label: 'Cozinha' },
  { value: 'bedroom', label: 'Quarto' },
  { value: 'bathroom', label: 'Banheiro' },
  { value: 'home-office', label: 'Home office' },
  { value: 'dining-room', label: 'Sala de jantar' },
  { value: 'entryway', label: 'Entrada / Hall' },
  { value: 'closet', label: 'Closet' },
  { value: 'outdoor-area', label: 'Área externa / Varanda' },
  { value: 'spa-wellness', label: 'Spa / Bem-estar' },
];

export function MoodboardUploader() {
  const router = useRouter();
  const [images, setImages] = useState<ImageState[]>([]);
  const [, setSessionId] = useState<string | null>(null);
  const [roomType, setRoomType] = useState<string>('');
  const [phase, setPhase] = useState<
    'idle' | 'processing' | 'generating' | 'done'
  >('idle');
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  // 1. Dropzone — upload direto, sem bg-remove client-side.
  // v1 usava @imgly/background-removal (WASM 40MB) mas era MUITO lento (2-5min
  // pra 5-8 fotos). Bg-removal foi removido; se voltar, será via API server-side
  // (Remove.bg / ClipDrop) só nas imagens que o Claude Vision marca com
  // should_isolate=true — muito mais rápido e cirúrgico.
  const onDrop = useCallback(
    async (accepted: File[]) => {
      if (images.length + accepted.length > 12) {
        setError('Máximo 12 imagens.');
        return;
      }
      setError(null);

      for (const file of accepted) {
        const id = crypto.randomUUID();
        const previewUrl = URL.createObjectURL(file);
        // Marca como ready imediatamente — sem processamento pesado
        setImages((prev) => [
          ...prev,
          { id, file, previewUrl, status: 'ready' },
        ]);
      }
    },
    [images.length],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxSize: 5 * 1024 * 1024,
  });

  // 2. Gerar
  async function handleGenerate() {
    if (images.length < 3) {
      setError('Envie pelo menos 3 imagens.');
      return;
    }
    setError(null);
    setPhase('processing');

    try {
      // 2.1 Cria session
      const sessionRes = await fetch('/api/moodboard/sessions', {
        method: 'POST',
      });
      if (!sessionRes.ok) throw new Error('session_failed');
      const { sessionId: sid } = await sessionRes.json();
      setSessionId(sid);

      // 2.2 Upload de cada imagem em paralelo (só o original — bg-remove
      // não roda mais no client; se voltar, será server-side).
      setLoadingStep(1);
      await Promise.all(
        images.map(async (img) => {
          const formData = new FormData();
          formData.append('original', img.file);
          await fetch(`/api/moodboard/${sid}/upload`, {
            method: 'POST',
            body: formData,
          });
        }),
      );

      // 2.3 Gerar (passa roomType se usuário escolheu; senão IA infere)
      setPhase('generating');
      setLoadingStep(2);
      const genRes = await fetch(`/api/moodboard/${sid}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roomType ? { roomType } : {}),
      });
      if (!genRes.ok) throw new Error('generate_failed');
      const { slug: finalSlug } = await genRes.json();

      setLoadingStep(3);
      setPhase('done');

      // 2.4 Redireciona
      router.push(`/moodboard/${finalSlug}`);
    } catch (err) {
      console.error('generate flow error:', err);
      setError('Algo deu errado. Tente novamente.');
      setPhase('idle');
    }
  }

  function removeImage(id: string) {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  if (phase !== 'idle') {
    return <LoadingSteps step={loadingStep} />;
  }

  return (
    <div>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`
          rounded-[20px] border-2 border-dashed p-16 text-center cursor-pointer
          transition-colors
          ${
            isDragActive
              ? 'border-[#9a744d] bg-[#eee5da]'
              : 'border-[#d8c9b8] bg-transparent hover:bg-[#eee5da]/50'
          }
        `}
      >
        <input {...getInputProps()} />
        <p className="font-serif text-[1.4rem] text-[#171411]">
          {isDragActive ? 'Solte aqui...' : 'Arraste suas fotos aqui'}
        </p>
        <p className="mt-2 text-[0.9rem] text-[#756b60]">
          ou clique pra selecionar · JPG, PNG, WEBP · 3 a 12 imagens
        </p>
      </div>

      {/* Grid de previews */}
      {images.length > 0 && (
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative aspect-square rounded-lg overflow-hidden border border-[#d8c9b8]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.previewUrl}
                alt=""
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(img.id)}
                className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 text-white text-sm hover:bg-black/80"
                aria-label="Remover"
              >
                ✕
              </button>
              {img.status === 'uploading' && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs">
                  Processando...
                </div>
              )}
              {img.status === 'error' && (
                <div className="absolute inset-0 bg-red-600/40 flex items-center justify-center text-white text-xs">
                  Erro
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Seleção de ambiente — opcional */}
      {images.length >= 3 && (
        <div className="mt-10">
          <label
            htmlFor="room-type"
            className="block text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#756b60] mb-3"
          >
            Para qual ambiente é o moodboard?
          </label>
          <div className="relative">
            <select
              id="room-type"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full h-14 rounded-[12px] border border-[#d8c9b8] bg-[#fdfcfa] px-5 pr-12 text-[0.95rem] text-[#3a332d] appearance-none cursor-pointer hover:border-[#9a744d] focus:border-[#9a744d] focus:outline-none transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {ROOM_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {/* Seta customizada */}
            <span
              className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#9a744d]"
              aria-hidden="true"
            >
              ▾
            </span>
          </div>
          <p className="mt-3 text-[0.85rem] text-[#756b60] italic">
            {roomType
              ? '✓ Vamos gerar um moodboard focado nesse ambiente.'
              : '💡 Se deixar padrão, a IA analisa suas fotos e escolhe o ambiente que melhor combina.'}
          </p>
        </div>
      )}

      {/* Error */}
      {error && <p className="mt-6 text-center text-[#c53030]">{error}</p>}

      {/* CTA */}
      <button
        type="button"
        disabled={
          images.length < 3 || images.some((i) => i.status !== 'ready')
        }
        onClick={handleGenerate}
        className="mt-10 w-full h-16 rounded-[12px] bg-[#171614] text-white font-bold text-[1rem] tracking-[-0.01em] hover:bg-[#29231f] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        {images.length < 3
          ? `Adicione ${3 - images.length} imagem(ns) pra gerar`
          : 'Gerar meu moodboard →'}
      </button>

      <p className="mt-4 text-center text-[0.85rem] text-[#756b60] italic">
        💡 Quanto mais variadas suas referências, mais rico será seu moodboard.
      </p>
    </div>
  );
}
