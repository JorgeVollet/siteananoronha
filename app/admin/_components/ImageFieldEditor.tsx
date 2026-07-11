'use client';

import { useRef, useState } from 'react';
import { Upload, Loader2, X } from 'lucide-react';
import { uploadToBucket } from '@/lib/storage';

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  pathPrefix?: string;
  hint?: string;
};

export function ImageFieldEditor({
  label,
  value,
  onChange,
  disabled,
  pathPrefix = 'content',
  hint,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    const result = await uploadToBucket('site-images', file, pathPrefix);
    setUploading(false);
    if ('error' in result) {
      setError(result.error);
      return;
    }
    onChange(result.url);
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[0.80rem] font-bold uppercase tracking-[0.06em] text-[#756b60]">
        {label}
      </span>
      <div className="flex items-center gap-3">
        {value && (
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[8px] border border-[#d1c4b7] bg-[#f1ebe3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="preview" className="h-full w-full object-cover" />
            {!disabled && !uploading && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white/80 text-[#756b60] transition-colors hover:bg-white hover:text-red-500"
                aria-label="Remover imagem"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        )}
        <button
          type="button"
          disabled={disabled || uploading}
          onClick={() => inputRef.current?.click()}
          className="flex h-20 items-center justify-center gap-2 rounded-[8px] border-2 border-dashed border-[#d1c4b7] bg-[#f8f2ea] px-4 text-[0.80rem] text-[#9a744d] transition-colors hover:border-[#9a744d] hover:bg-[#f1ebe3] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Upload className="h-4 w-4" />
              {value ? 'Trocar imagem' : 'Enviar imagem'}
            </>
          )}
        </button>
      </div>
      {hint && !error && (
        <p className="text-[0.72rem] leading-[1.5] text-[#756b60]">{hint}</p>
      )}
      {error && <p className="text-[0.78rem] text-red-500">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        }}
      />
    </div>
  );
}
