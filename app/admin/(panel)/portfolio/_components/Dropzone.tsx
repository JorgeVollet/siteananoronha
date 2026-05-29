"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  accept?: string;
  maxSizeMB?: number;
  onFileSelected: (file: File) => void;
  previewUrl?: string | null;
  previewType?: "image" | "video";
  label?: string;
  hint?: string;
  uploading?: boolean;
  disabled?: boolean;
};

export function Dropzone({
  accept = "image/*",
  maxSizeMB = 10,
  onFileSelected,
  previewUrl,
  previewType = "image",
  label = "Arraste uma imagem aqui",
  hint,
  uploading = false,
  disabled = false,
}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      setError(null);
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`Arquivo muito grande. Máximo: ${maxSizeMB}MB.`);
        return;
      }
      onFileSelected(file);
    },
    [maxSizeMB, onFileSelected]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [disabled, handleFile]
  );

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  return (
    <div className="w-full">
      <button
        type="button"
        disabled={disabled || uploading}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={cn(
          "relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[12px] border-2 border-dashed bg-[#f8f2ea] px-6 py-8 text-center transition-all duration-300",
          isDragging ? "border-[#9a744d] bg-[#f1ebe3]" : "border-[#d1c4b7]",
          disabled || uploading
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer hover:border-[#9a744d] hover:bg-[#f1ebe3]"
        )}
      >
        {previewUrl ? (
          <>
            {previewType === "video" ? (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video
                src={previewUrl}
                muted
                playsInline
                controls
                className="max-h-[200px] w-auto rounded-[8px] object-contain"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-[200px] w-auto rounded-[8px] object-contain"
              />
            )}
            {!uploading && (
              <span className="mt-3 text-[0.78rem] font-bold tracking-[0.08em] uppercase text-[#9a744d]">
                Clique para trocar
              </span>
            )}
          </>
        ) : uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-[#9a744d]" />
            <span className="text-[0.88rem] text-[#756b60]">Enviando...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d1c4b7] bg-[#f1ebe3]">
              <Upload className="h-5 w-5 text-[#9a744d]" />
            </div>
            <span className="text-[0.92rem] font-semibold text-[#171411]">
              {label}
            </span>
            <span className="text-[0.80rem] text-[#756b60]">
              {hint ?? `ou clique para escolher (máx ${maxSizeMB}MB)`}
            </span>
          </div>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={onFileChange}
        className="hidden"
      />
      {error && <p className="mt-2 text-[0.80rem] text-red-500">{error}</p>}
    </div>
  );
}
