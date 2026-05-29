"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Save, Plus } from "lucide-react";
import { createProject, updateProject } from "../_actions/project";
import { SERVICOS_DISPONIVEIS, CATEGORIAS } from "@/lib/portfolio-constants";
import { MediaList } from "./MediaList";
import { AddMediaModal } from "./AddMediaModal";
import { cn } from "@/lib/utils";
import type { ProjectMedia } from "@/lib/types/database";

type ProjectFormData = {
  category: "engenharia" | "marcenaria";
  nome: string;
  tipologia: string;
  servicos: string[];
  ordem: number;
  is_published: boolean;
};

type Props = {
  mode: "create" | "edit";
  projectId?: string;
  initialData?: ProjectFormData;
  initialMedia?: ProjectMedia[];
};

export function ProjectForm({
  mode,
  projectId,
  initialData,
  initialMedia = [],
}: Props) {
  const router = useRouter();

  const [data, setData] = useState<ProjectFormData>(
    initialData ?? {
      category: "engenharia",
      nome: "",
      tipologia: "",
      servicos: [],
      ordem: 0,
      is_published: true,
    }
  );

  const [saving, setSaving] = useState(false);
  const [showAddMedia, setShowAddMedia] = useState(false);

  function toggleServico(s: string) {
    setData((d) => ({
      ...d,
      servicos: d.servicos.includes(s)
        ? d.servicos.filter((x) => x !== s)
        : [...d.servicos, s],
    }));
  }

  async function handleSave() {
    if (!data.nome.trim()) {
      toast.error("Nome do projeto é obrigatório");
      return;
    }
    if (!data.tipologia.trim()) {
      toast.error("Tipologia é obrigatória");
      return;
    }
    setSaving(true);

    if (mode === "create") {
      const r = await createProject(data);
      if ("error" in r) {
        toast.error(r.error!);
        setSaving(false);
        return;
      }
      toast.success("Projeto criado! Agora adicione mídias.");
      router.replace(`/admin/portfolio/${r.id}`);
      router.refresh();
    } else if (projectId) {
      const r = await updateProject(projectId, data);
      if ("error" in r) {
        toast.error(r.error!);
        setSaving(false);
        return;
      }
      toast.success("Projeto atualizado");
      setSaving(false);
      router.refresh();
    }
  }

  const nextOrdem =
    initialMedia.length > 0
      ? Math.max(...initialMedia.map((m) => m.ordem)) + 1
      : 0;

  return (
    <div className="flex flex-col gap-6 pb-16">
      {/* ── Card: dados do projeto ── */}
      <div className="rounded-[16px] border border-[#d8c9b8] bg-[#eee5da] p-6">
        <div className="mb-6">
          <p className="text-[0.70rem] font-bold tracking-[0.09em] uppercase text-[#9a744d]">
            — Dados do projeto —
          </p>
          <h2
            className="mt-1 text-[1.35rem] font-medium leading-tight text-[#171411]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Informações principais
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          {/* Categoria */}
          <div className="flex flex-col gap-2">
            <label className="text-[0.80rem] font-bold tracking-[0.04em] uppercase text-[#756b60]">
              Categoria
            </label>
            <div className="flex items-center gap-1 rounded-full border border-[#d1c4b7] bg-[#f1ebe3] p-1">
              {CATEGORIAS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setData((d) => ({ ...d, category: c.value }))}
                  className={cn(
                    "flex-1 rounded-full px-6 py-2 text-[0.85rem] font-bold tracking-[-0.01em] transition-all duration-300",
                    data.category === c.value
                      ? "bg-[#171614] text-white"
                      : "text-[#756b60] hover:text-[#171411]"
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Nome */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.80rem] font-bold tracking-[0.04em] uppercase text-[#756b60]">
              Nome do projeto *
            </label>
            <input
              type="text"
              value={data.nome}
              onChange={(e) => setData((d) => ({ ...d, nome: e.target.value }))}
              placeholder="Ex: Residencial Schneider"
              className="w-full rounded-[10px] border border-[#d1c4b7] bg-[#f8f2ea] px-4 py-3 text-[0.95rem] outline-none transition-colors focus:border-[#9a744d] focus:bg-white"
            />
          </div>

          {/* Tipologia */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.80rem] font-bold tracking-[0.04em] uppercase text-[#756b60]">
              Tipologia *
            </label>
            <input
              type="text"
              value={data.tipologia}
              onChange={(e) =>
                setData((d) => ({ ...d, tipologia: e.target.value }))
              }
              placeholder="Ex: Residencial · Reforma completa"
              className="w-full rounded-[10px] border border-[#d1c4b7] bg-[#f8f2ea] px-4 py-3 text-[0.95rem] outline-none transition-colors focus:border-[#9a744d] focus:bg-white"
            />
            <p className="text-[0.77rem] text-[#9a744d]">
              Aparece como eyebrow no site. Use o caractere · (alt + 250) como separador.
            </p>
          </div>

          {/* Serviços */}
          <div className="flex flex-col gap-2">
            <label className="text-[0.80rem] font-bold tracking-[0.04em] uppercase text-[#756b60]">
              Serviços aplicados
            </label>
            <div className="flex flex-wrap gap-2">
              {SERVICOS_DISPONIVEIS.map((s) => {
                const active = data.servicos.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleServico(s)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-[0.82rem] font-bold tracking-[-0.01em] transition-all duration-300",
                      active
                        ? "border-[#9a744d] bg-[#9a744d] text-white"
                        : "border-[#d1c4b7] bg-[#f1ebe3] text-[#9a744d] hover:border-[#c6b49f] hover:bg-[#f8f2ea]"
                    )}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ordem + Publicado */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.80rem] font-bold tracking-[0.04em] uppercase text-[#756b60]">
                Ordem de exibição
              </label>
              <input
                type="number"
                value={data.ordem}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    ordem: parseInt(e.target.value) || 0,
                  }))
                }
                className="w-full rounded-[10px] border border-[#d1c4b7] bg-[#f8f2ea] px-4 py-3 text-[0.95rem] outline-none focus:border-[#9a744d] focus:bg-white"
              />
              <p className="text-[0.75rem] text-[#756b60]">
                Menor = aparece primeiro
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[0.80rem] font-bold tracking-[0.04em] uppercase text-[#756b60]">
                Publicação
              </label>
              <button
                type="button"
                onClick={() =>
                  setData((d) => ({ ...d, is_published: !d.is_published }))
                }
                className={cn(
                  "flex h-[50px] w-full items-center justify-between rounded-[10px] border px-4 transition-all",
                  data.is_published
                    ? "border-[#9a744d] bg-[#f8f2ea] text-[#171411]"
                    : "border-[#d1c4b7] bg-[#f1ebe3] text-[#756b60]"
                )}
              >
                <span className="text-[0.88rem] font-bold">
                  {data.is_published ? "Publicado" : "Despublicado"}
                </span>
                <span
                  className={cn(
                    "relative inline-block h-5 w-9 rounded-full transition-colors duration-300",
                    data.is_published ? "bg-[#9a744d]" : "bg-[#d1c4b7]"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-300",
                      data.is_published ? "translate-x-4" : "translate-x-0.5"
                    )}
                  />
                </span>
              </button>
            </div>
          </div>

          {/* Salvar */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex h-12 items-center gap-2 rounded-[10px] bg-[#171614] px-8 text-[0.95rem] font-bold tracking-[-0.01em] text-white transition-all hover:bg-[#29231f] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving
                ? "Salvando..."
                : mode === "create"
                ? "Criar projeto"
                : "Salvar alterações"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Card: mídias (só em edit) ── */}
      {mode === "edit" && projectId && (
        <div className="rounded-[16px] border border-[#d8c9b8] bg-[#eee5da] p-6">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.70rem] font-bold tracking-[0.09em] uppercase text-[#9a744d]">
                — Mídias do projeto —
              </p>
              <h2
                className="mt-1 text-[1.35rem] font-medium leading-tight text-[#171411]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {initialMedia.length === 0
                  ? "Adicione fotos, antes/depois ou vídeos"
                  : `${initialMedia.length} mídia${initialMedia.length > 1 ? "s" : ""} cadastrada${initialMedia.length > 1 ? "s" : ""}`}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setShowAddMedia(true)}
              className="flex h-11 shrink-0 items-center gap-2 rounded-[10px] border border-[#d1c4b7] bg-[#f1ebe3] px-5 text-[0.88rem] font-bold tracking-[-0.01em] text-[#171411] transition-all hover:-translate-y-0.5 hover:bg-[#f8f2ea]"
            >
              <Plus className="h-4 w-4" />
              Adicionar mídia
            </button>
          </div>

          <MediaList media={initialMedia} projectId={projectId} />
        </div>
      )}

      {/* ── Aviso (só em create) ── */}
      {mode === "create" && (
        <div className="rounded-[12px] border border-[#d1c4b7] bg-[#f8f2ea] px-5 py-4">
          <p className="text-[0.85rem] text-[#756b60]">
            Salve o projeto primeiro para poder adicionar fotos, antes/depois e vídeos.
          </p>
        </div>
      )}

      {/* Modal */}
      {showAddMedia && projectId && (
        <AddMediaModal
          projectId={projectId}
          currentOrdem={nextOrdem}
          onClose={() => setShowAddMedia(false)}
          onAdded={() => router.refresh()}
        />
      )}
    </div>
  );
}
