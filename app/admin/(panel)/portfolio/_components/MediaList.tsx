"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronUp,
  ChevronDown,
  Trash2,
  Image as ImageIcon,
  GitCompare,
  Video,
} from "lucide-react";
import { deleteMedia, reorderMedia } from "../_actions/media";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { ProjectMedia } from "@/lib/types/database";

function getMediaDescription(m: ProjectMedia): string {
  if (m.type === "video") {
    if (m.video_source === "upload") return "Vídeo MP4";
    if (m.video_source === "youtube") return "Vídeo do YouTube";
    if (m.video_source === "vimeo") return "Vídeo do Vimeo";
    return "Vídeo";
  }
  if (m.type === "before_after") return "Comparação Antes e Depois";
  return "Sem descrição";
}

type Props = {
  media: ProjectMedia[];
  projectId: string;
};

export function MediaList({ media, projectId }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  if (media.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-[12px] border-2 border-dashed border-[#d1c4b7] py-12">
        <p className="text-[0.88rem] text-[#9a744d]">
          Nenhuma mídia ainda. Clique em + Adicionar mídia acima.
        </p>
      </div>
    );
  }

  const ordered = [...media].sort((a, b) => a.ordem - b.ordem);

  async function handleDelete(id: string) {
    if (!confirm("Excluir esta mídia? Esta ação não pode ser desfeita."))
      return;
    setBusy(id);
    const r = await deleteMedia(id, projectId);
    setBusy(null);
    if ("error" in r) {
      toast.error(r.error);
      return;
    }
    toast.success("Mídia excluída");
    router.refresh();
  }

  async function handleMove(currentIndex: number, direction: "up" | "down") {
    const target = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (target < 0 || target >= ordered.length) return;

    const a = ordered[currentIndex];
    const b = ordered[target];
    setBusy(a.id);

    await Promise.all([
      reorderMedia(a.id, b.ordem, projectId),
      reorderMedia(b.id, a.ordem, projectId),
    ]);

    setBusy(null);
    router.refresh();
  }

  return (
    <ul className="flex flex-col gap-2">
      {ordered.map((m, i) => {
        const Icon =
          m.type === "photo"
            ? ImageIcon
            : m.type === "before_after"
            ? GitCompare
            : Video;
        const thumbUrl = m.type === "video" ? m.video_thumbnail : m.url;
        const label =
          m.type === "photo"
            ? "Foto"
            : m.type === "before_after"
            ? "Antes/Depois"
            : "Vídeo";

        return (
          <li
            key={m.id}
            className={cn(
              "flex items-center gap-4 rounded-[12px] border border-[#d8c9b8] bg-[#eee5da] p-3 transition-opacity",
              busy === m.id && "opacity-50"
            )}
          >
            {/* Thumbnail */}
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-[8px] border border-[#d1c4b7] bg-[#f1ebe3]">
              {thumbUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={thumbUrl}
                  alt={m.alt ?? label}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Icon className="h-6 w-6 text-[#9a744d]" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 shrink-0 text-[#9a744d]" />
                <span className="text-[0.80rem] font-bold text-[#171411]">
                  {label}
                </span>
              </div>
              <p className="mt-0.5 truncate text-[0.75rem] text-[#756b60]">
                {m.alt || m.before_alt || getMediaDescription(m)}
              </p>
            </div>

            {/* Reorder buttons */}
            <div className="flex flex-col gap-1">
              <button
                onClick={() => handleMove(i, "up")}
                disabled={i === 0 || busy !== null}
                className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[#d1c4b7] bg-[#f1ebe3] text-[#9a744d] transition-all hover:bg-[#f8f2ea] disabled:opacity-30"
                aria-label="Subir"
              >
                <ChevronUp className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => handleMove(i, "down")}
                disabled={i === ordered.length - 1 || busy !== null}
                className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[#d1c4b7] bg-[#f1ebe3] text-[#9a744d] transition-all hover:bg-[#f8f2ea] disabled:opacity-30"
                aria-label="Descer"
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Delete */}
            <button
              onClick={() => handleDelete(m.id)}
              disabled={busy !== null}
              className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#d1c4b7] bg-[#f1ebe3] text-[#9a744d] transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:opacity-30"
              aria-label="Excluir mídia"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
