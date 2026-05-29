"use client";

import { useState } from "react";
import { X, Image as ImageIcon, GitCompare, Video, ArrowLeft } from "lucide-react";
import { Dropzone } from "./Dropzone";
import { uploadToBucket } from "@/lib/storage";
import { addPhotoMedia, addBeforeAfterMedia, addVideoMedia } from "../_actions/media";
import { MIDIA_TYPES } from "@/lib/portfolio-constants";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Props = {
  projectId: string;
  currentOrdem: number;
  onClose: () => void;
  onAdded: () => void;
};

type Step = "choose" | "photo" | "before_after" | "video";

export function AddMediaModal({
  projectId,
  currentOrdem,
  onClose,
  onAdded,
}: Props) {
  const [step, setStep] = useState<Step>("choose");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-[640px] overflow-y-auto rounded-[16px] border border-[#d8c9b8] bg-[#f5f0e9] shadow-[0_48px_120px_rgba(0,0,0,0.30)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#d8c9b8] px-6 py-5">
          <div className="flex items-center gap-3">
            {step !== "choose" && (
              <button
                onClick={() => setStep("choose")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d1c4b7] bg-[#f1ebe3] text-[#9a744d] transition-all hover:bg-[#f8f2ea]"
                aria-label="Voltar"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <div>
              <p className="text-[0.70rem] font-bold tracking-[0.09em] uppercase text-[#9a744d]">
                Nova mídia
              </p>
              <h2
                className="text-[1.05rem] font-semibold leading-tight text-[#171411]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {step === "choose" && "Escolha o tipo"}
                {step === "photo" && "Foto estática"}
                {step === "before_after" && "Antes e Depois"}
                {step === "video" && "Vídeo"}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d1c4b7] bg-[#f1ebe3] text-[#756b60] transition-all hover:bg-[#f8f2ea] hover:text-[#171411]"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === "choose" && (
            <div className="flex flex-col gap-3">
              {MIDIA_TYPES.map((t) => {
                const Icon =
                  t.value === "photo"
                    ? ImageIcon
                    : t.value === "before_after"
                    ? GitCompare
                    : Video;
                return (
                  <button
                    key={t.value}
                    onClick={() => setStep(t.value as Step)}
                    className="group flex w-full items-center gap-4 rounded-[12px] border border-[#d8c9b8] bg-[#eee5da] p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9a744d] hover:shadow-[0_18px_44px_rgba(166,123,79,0.18)]"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-[#d1c4b7] bg-[#f1ebe3] text-[#9a744d] transition-colors group-hover:border-[#9a744d] group-hover:bg-[#f8f2ea]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[0.92rem] font-bold leading-tight text-[#171411]">
                        {t.label}
                      </p>
                      <p className="mt-0.5 text-[0.80rem] text-[#756b60]">
                        {t.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {step === "photo" && (
            <PhotoForm
              projectId={projectId}
              ordem={currentOrdem}
              onAdded={() => {
                onAdded();
                onClose();
              }}
            />
          )}

          {step === "before_after" && (
            <BeforeAfterForm
              projectId={projectId}
              ordem={currentOrdem}
              onAdded={() => {
                onAdded();
                onClose();
              }}
            />
          )}

          {step === "video" && (
            <VideoForm
              projectId={projectId}
              ordem={currentOrdem}
              onAdded={() => {
                onAdded();
                onClose();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PHOTO FORM ───────────────────────────────────────────────────────────────

function PhotoForm({
  projectId,
  ordem,
  onAdded,
}: {
  projectId: string;
  ordem: number;
  onAdded: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [alt, setAlt] = useState("");
  const [uploading, setUploading] = useState(false);

  const onSelect = (f: File) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  async function handleSubmit() {
    if (!file) {
      toast.error("Selecione uma imagem");
      return;
    }
    setUploading(true);

    const upload = await uploadToBucket("portfolio-media", file, projectId);
    if ("error" in upload) {
      toast.error(upload.error);
      setUploading(false);
      return;
    }

    const result = await addPhotoMedia({
      project_id: projectId,
      url: upload.url,
      alt: alt.trim() || undefined,
      ordem,
    });

    if ("error" in result) {
      toast.error(result.error);
      setUploading(false);
      return;
    }

    toast.success("Foto adicionada");
    onAdded();
  }

  return (
    <div className="flex flex-col gap-5">
      <Dropzone
        onFileSelected={onSelect}
        previewUrl={preview}
        uploading={uploading}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-[0.80rem] font-bold tracking-[0.04em] uppercase text-[#756b60]">
          Descrição da imagem (alt) — opcional
        </label>
        <input
          type="text"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          disabled={uploading}
          placeholder="Ex: Cozinha após reforma"
          className="w-full rounded-[10px] border border-[#d1c4b7] bg-[#f8f2ea] px-4 py-3 text-[0.92rem] outline-none transition-colors focus:border-[#9a744d] focus:bg-white"
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={uploading || !file}
        className="flex h-12 w-full items-center justify-center rounded-[10px] bg-[#171614] text-[0.95rem] font-bold tracking-[-0.01em] text-white transition-all hover:bg-[#29231f] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {uploading ? "Enviando..." : "Adicionar foto"}
      </button>
    </div>
  );
}

// ─── BEFORE / AFTER FORM ─────────────────────────────────────────────────────

function BeforeAfterForm({
  projectId,
  ordem,
  onAdded,
}: {
  projectId: string;
  ordem: number;
  onAdded: () => void;
}) {
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [beforePreview, setBeforePreview] = useState<string | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [afterPreview, setAfterPreview] = useState<string | null>(null);
  const [beforeAlt, setBeforeAlt] = useState("");
  const [afterAlt, setAfterAlt] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleSubmit() {
    if (!beforeFile || !afterFile) {
      toast.error("Selecione as duas imagens (Antes e Depois)");
      return;
    }
    setUploading(true);

    const [beforeUp, afterUp] = await Promise.all([
      uploadToBucket("portfolio-media", beforeFile, `${projectId}/before`),
      uploadToBucket("portfolio-media", afterFile, `${projectId}/after`),
    ]);

    if ("error" in beforeUp) {
      toast.error(`Antes: ${beforeUp.error}`);
      setUploading(false);
      return;
    }
    if ("error" in afterUp) {
      toast.error(`Depois: ${afterUp.error}`);
      setUploading(false);
      return;
    }

    const result = await addBeforeAfterMedia({
      project_id: projectId,
      before_url: beforeUp.url,
      url: afterUp.url,
      before_alt: beforeAlt.trim() || undefined,
      alt: afterAlt.trim() || undefined,
      ordem,
    });

    if ("error" in result) {
      toast.error(result.error);
      setUploading(false);
      return;
    }

    toast.success("Antes e Depois adicionado");
    onAdded();
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="mb-2 text-[0.72rem] font-bold tracking-[0.09em] uppercase text-[#9a744d]">
            ANTES
          </p>
          <Dropzone
            onFileSelected={(f) => {
              setBeforeFile(f);
              setBeforePreview(URL.createObjectURL(f));
            }}
            previewUrl={beforePreview}
            uploading={uploading}
            label="Arraste o ANTES"
          />
          <input
            type="text"
            value={beforeAlt}
            onChange={(e) => setBeforeAlt(e.target.value)}
            disabled={uploading}
            placeholder="Descrição (alt) — opcional"
            className="mt-2 w-full rounded-[10px] border border-[#d1c4b7] bg-[#f8f2ea] px-3 py-2 text-[0.85rem] outline-none focus:border-[#9a744d]"
          />
        </div>

        <div>
          <p className="mb-2 text-[0.72rem] font-bold tracking-[0.09em] uppercase text-[#9a744d]">
            DEPOIS
          </p>
          <Dropzone
            onFileSelected={(f) => {
              setAfterFile(f);
              setAfterPreview(URL.createObjectURL(f));
            }}
            previewUrl={afterPreview}
            uploading={uploading}
            label="Arraste o DEPOIS"
          />
          <input
            type="text"
            value={afterAlt}
            onChange={(e) => setAfterAlt(e.target.value)}
            disabled={uploading}
            placeholder="Descrição (alt) — opcional"
            className="mt-2 w-full rounded-[10px] border border-[#d1c4b7] bg-[#f8f2ea] px-3 py-2 text-[0.85rem] outline-none focus:border-[#9a744d]"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={uploading || !beforeFile || !afterFile}
        className="flex h-12 w-full items-center justify-center rounded-[10px] bg-[#171614] text-[0.95rem] font-bold tracking-[-0.01em] text-white transition-all hover:bg-[#29231f] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {uploading ? "Enviando duas imagens..." : "Adicionar Antes e Depois"}
      </button>
    </div>
  );
}

// ─── VIDEO FORM ───────────────────────────────────────────────────────────────

function VideoForm({
  projectId,
  ordem,
  onAdded,
}: {
  projectId: string;
  ordem: number;
  onAdded: () => void;
}) {
  const [mode, setMode] = useState<"external" | "upload">("external");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [externalUrl, setExternalUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  function detectSource(url: string): "youtube" | "vimeo" | null {
    if (/youtube\.com|youtu\.be/.test(url)) return "youtube";
    if (/vimeo\.com/.test(url)) return "vimeo";
    return null;
  }

  function handleFileSelected(f: File) {
    setFile(f);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(f));
  }

  async function handleSubmit() {
    setUploading(true);
    setStatusMsg("");

    if (mode === "upload") {
      if (!file) {
        toast.error("Selecione um arquivo de vídeo");
        setUploading(false);
        return;
      }

      // 1) Upload do vídeo
      setStatusMsg("Enviando vídeo...");
      const videoUp = await uploadToBucket("videos", file, projectId);
      if ("error" in videoUp) {
        toast.error(videoUp.error);
        setUploading(false);
        setStatusMsg("");
        return;
      }

      // 2) Captura thumbnail do primeiro frame
      setStatusMsg("Gerando preview do vídeo...");
      let thumbnailUrl: string | undefined;
      try {
        const { captureVideoThumbnail } = await import("@/lib/video-thumbnail");
        const blob = await captureVideoThumbnail(file);
        if (blob) {
          const thumbFile = new File([blob], `thumb-${Date.now()}.jpg`, {
            type: "image/jpeg",
          });
          const thumbUp = await uploadToBucket(
            "portfolio-media",
            thumbFile,
            `${projectId}/videos-thumbs`
          );
          if (!("error" in thumbUp)) thumbnailUrl = thumbUp.url;
        }
      } catch (err) {
        console.warn("Falha ao capturar thumbnail:", err);
        // Não bloqueia — segue sem thumbnail
      }

      // 3) Insert no banco
      setStatusMsg("Salvando...");
      const result = await addVideoMedia({
        project_id: projectId,
        video_url: videoUp.url,
        video_source: "upload",
        video_thumbnail: thumbnailUrl,
        ordem,
      });

      if ("error" in result) {
        toast.error(result.error!);
        setUploading(false);
        setStatusMsg("");
        return;
      }

      if (previewUrl) URL.revokeObjectURL(previewUrl);
      toast.success("Vídeo adicionado");
      onAdded();
      return;
    }

    // ── Modo URL externa ──
    const source = detectSource(externalUrl.trim());
    if (!source) {
      toast.error("URL inválida. Use YouTube ou Vimeo.");
      setUploading(false);
      return;
    }

    // YouTube: extrai thumbnail oficial automaticamente
    let externalThumb: string | undefined;
    if (source === "youtube") {
      const m = externalUrl.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
      );
      if (m) {
        externalThumb = `https://img.youtube.com/vi/${m[1]}/maxresdefault.jpg`;
      }
    }

    setStatusMsg("Salvando...");
    const result = await addVideoMedia({
      project_id: projectId,
      video_url: externalUrl.trim(),
      video_source: source,
      video_thumbnail: externalThumb,
      ordem,
    });

    if ("error" in result) {
      toast.error(result.error!);
      setUploading(false);
      setStatusMsg("");
      return;
    }

    toast.success("Vídeo adicionado");
    onAdded();
  }

  const canSubmit = mode === "upload" ? !!file : externalUrl.trim().length > 0;

  return (
    <div className="flex flex-col gap-5">
      {/* Toggle */}
      <div className="inline-flex items-center gap-1 rounded-full border border-[#d8c9b8] bg-[#f1ebe3] p-1">
        <button
          type="button"
          onClick={() => setMode("external")}
          className={cn(
            "flex-1 rounded-full px-5 py-2 text-[0.82rem] font-bold tracking-[-0.01em] transition-all duration-300",
            mode === "external"
              ? "bg-[#171614] text-white"
              : "text-[#756b60] hover:text-[#171411]"
          )}
        >
          URL externa
        </button>
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={cn(
            "flex-1 rounded-full px-5 py-2 text-[0.82rem] font-bold tracking-[-0.01em] transition-all duration-300",
            mode === "upload"
              ? "bg-[#171614] text-white"
              : "text-[#756b60] hover:text-[#171411]"
          )}
        >
          Upload MP4
        </button>
      </div>

      {mode === "external" ? (
        <div className="flex flex-col gap-1.5">
          <label className="text-[0.80rem] font-bold tracking-[0.04em] uppercase text-[#756b60]">
            URL do YouTube ou Vimeo
          </label>
          <input
            type="url"
            value={externalUrl}
            onChange={(e) => setExternalUrl(e.target.value)}
            disabled={uploading}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full rounded-[10px] border border-[#d1c4b7] bg-[#f8f2ea] px-4 py-3 text-[0.92rem] outline-none focus:border-[#9a744d] focus:bg-white"
          />
          <p className="text-[0.77rem] text-[#9a744d]">
            Aceita youtube.com, youtu.be e vimeo.com. Thumbnail do YouTube é
            capturada automaticamente.
          </p>
        </div>
      ) : (
        <>
          <Dropzone
            accept="video/mp4,video/webm,video/quicktime"
            maxSizeMB={100}
            onFileSelected={handleFileSelected}
            previewUrl={previewUrl}
            previewType="video"
            uploading={uploading}
            label="Arraste o vídeo MP4"
            hint="MP4, WebM ou MOV até 100MB"
          />
          {file && !uploading && (
            <p className="text-[0.82rem] text-[#756b60]">
              Selecionado:{" "}
              <strong className="text-[#171411]">{file.name}</strong> (
              {(file.size / 1024 / 1024).toFixed(1)} MB)
            </p>
          )}
        </>
      )}

      {uploading && statusMsg && (
        <div className="rounded-[10px] border border-[#d1c4b7] bg-[#f8f2ea] px-4 py-3 text-[0.85rem] font-bold text-[#9a744d]">
          {statusMsg}
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={uploading || !canSubmit}
        className="flex h-12 w-full items-center justify-center rounded-[10px] bg-[#171614] text-[0.95rem] font-bold tracking-[-0.01em] text-white transition-all hover:bg-[#29231f] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {uploading ? "Enviando..." : "Adicionar vídeo"}
      </button>
    </div>
  );
}
