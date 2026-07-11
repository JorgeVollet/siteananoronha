"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Save, ChevronLeft, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ARTICLE_CATEGORIES } from "@/lib/articles-constants";
import { createArticle, updateArticle, type ArticleInput } from "../_actions/article";
import { TipTapEditor } from "./TipTapEditor";
import { ImageFieldEditor } from "@/app/admin/_components/ImageFieldEditor";

type Props = {
  mode: "create" | "edit";
  articleId?: string;
  initialData?: Partial<ArticleInput>;
};

const DIACRITICS_RE = /[̀-ͯ]/g;

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(DIACRITICS_RE, "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function calcReadingTime(content: any): number {
  if (!content) return 1;
  const text = JSON.stringify(content).replace(/[^\w\s]/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

/**
 * Extrai texto puro do JSON do TipTap (percorre nós recursivamente).
 * Retorna string contínua sem HTML/markdown, sem headings (que são o título).
 */
function extractTextFromTipTap(node: any, skipHeadings = true): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map((n) => extractTextFromTipTap(n, skipHeadings)).join(" ");
  // Pula headings porque são geralmente redundantes com o título
  if (skipHeadings && node.type === "heading") return "";
  if (node.type === "text" && node.text) return node.text;
  if (node.content) return extractTextFromTipTap(node.content, skipHeadings);
  return "";
}

/**
 * Primeira letra maiúscula sem quebrar acentos.
 */
function capitalize(text: string): string {
  const t = text.trim();
  if (!t) return "";
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/**
 * Corta texto respeitando palavras. Adiciona "..." se cortou.
 */
function trimSmart(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 3);
  const lastSpace = cut.lastIndexOf(" ");
  const safe = lastSpace > max * 0.7 ? cut.slice(0, lastSpace) : cut;
  return safe.replace(/[,;:]$/, "").trimEnd() + "...";
}

/**
 * Gera meta description automática INTELIGENTE.
 *
 * Regra de ouro: só gera se tiver material REAL. Se só tem título,
 * retorna vazio (melhor vazio + aviso pra escrever do que texto fraco).
 *
 * Prioridade:
 *   1. Excerpt (resumo curado pela autora) — melhor SEO
 *   2. Corpo real do artigo (primeiros parágrafos, sem headings)
 *   3. Subtítulo + CTA contextual por categoria (fraco mas usável)
 *   4. Nada — deixa vazio, avisa autora a escrever mais
 */
function generateMetaDescription(args: {
  title: string;
  subtitle?: string;
  excerpt?: string;
  content?: any;
  category?: string;
}): string {
  // 1. EXCERPT — melhor caso possível
  const excerpt = (args.excerpt ?? "").trim();
  if (excerpt.length >= 50) {
    return trimSmart(capitalize(excerpt), 158);
  }

  // 2. CORPO REAL — extrai texto natural do artigo (pula headings)
  const contentText = extractTextFromTipTap(args.content)
    .replace(/\s+/g, " ")
    .trim();

  if (contentText.length >= 60) {
    // Se tem excerpt curto, usa como abertura + complementa com corpo
    if (excerpt.length > 10 && excerpt.length < 50) {
      const combined = `${excerpt}. ${contentText}`;
      return trimSmart(capitalize(combined), 158);
    }
    return trimSmart(capitalize(contentText), 158);
  }

  // 3. SUBTÍTULO + CTA CONTEXTUAL (fallback fraco, mas melhor que só título)
  const subtitle = (args.subtitle ?? "").trim();
  if (subtitle.length >= 20) {
    const cta = getCategoryCTA(args.category);
    const combined = `${capitalize(subtitle)} ${cta}`;
    return trimSmart(combined, 158);
  }

  // 4. NADA suficiente — retorna vazio (UI mostra aviso pra escrever mais)
  return "";
}

/**
 * CTA contextual por categoria — usado só quando não tem corpo/excerpt.
 */
function getCategoryCTA(category?: string): string {
  switch (category) {
    case "normas":
      return "Guia técnico da engenheira Ana Laura Noronha.";
    case "curiosidades":
      return "Descubra no estúdio de Ana Laura Noronha.";
    case "sketch":
      return "Do caderno criativo de Ana Laura Noronha.";
    case "blog":
    default:
      return "Leia no blog de Ana Laura Noronha — engenharia e interiores.";
  }
}

/**
 * Avalia qualidade do texto: se é "forte", "fraco" ou "vazio".
 */
function evaluateMetaQuality(text: string): {
  status: "empty" | "weak" | "ok" | "great";
  message: string;
} {
  const t = text.trim();
  if (t.length === 0) return { status: "empty", message: "Escreva o artigo — a description será gerada automaticamente" };
  if (t.length < 100) return { status: "weak", message: "Curto demais — Google prefere 140-160 caracteres" };
  if (t.length < 140) return { status: "ok", message: "OK, mas dava pra explorar mais espaço" };
  if (t.length <= 160) return { status: "great", message: "Tamanho ideal para SERP" };
  return { status: "weak", message: "Vai ser cortado pelo Google (máximo 160)" };
}

export function ArticleForm({ mode, articleId, initialData }: Props) {
  const router = useRouter();
  const [data, setData] = useState<ArticleInput>({
    slug: initialData?.slug ?? "",
    category: initialData?.category ?? "blog",
    title: initialData?.title ?? "",
    subtitle: initialData?.subtitle ?? "",
    excerpt: initialData?.excerpt ?? "",
    content: initialData?.content ?? null,
    cover_image: initialData?.cover_image ?? "",
    cover_alt: initialData?.cover_alt ?? "",
    tags: initialData?.tags ?? [],
    seo_meta_description: initialData?.seo_meta_description ?? "",
    seo_keywords: initialData?.seo_keywords ?? [],
    is_published: initialData?.is_published ?? false,
    is_featured: initialData?.is_featured ?? false,
    published_at: initialData?.published_at,
  });
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  // Se em edição já tem meta description, considera "editado manualmente" pra não sobrescrever
  const [seoTouched, setSeoTouched] = useState(
    mode === "edit" && !!(initialData?.seo_meta_description ?? "").trim()
  );

  // Auto-preencher meta description quando não foi editada manualmente
  useEffect(() => {
    if (seoTouched) return;
    const auto = generateMetaDescription({
      title: data.title,
      subtitle: data.subtitle ?? undefined,
      excerpt: data.excerpt ?? undefined,
      content: data.content,
      category: data.category,
    });
    // Só atualiza se mudou (evita loop)
    if (auto !== (data.seo_meta_description ?? "")) {
      setData((d) => ({ ...d, seo_meta_description: auto }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.title, data.subtitle, data.excerpt, data.content, data.category, seoTouched]);

  function handleRegenerateSEO() {
    const auto = generateMetaDescription({
      title: data.title,
      subtitle: data.subtitle ?? undefined,
      excerpt: data.excerpt ?? undefined,
      content: data.content,
      category: data.category,
    });
    if (!auto) {
      toast.error("Escreva mais conteúdo pra gerar automaticamente");
      return;
    }
    setData((d) => ({ ...d, seo_meta_description: auto }));
    setSeoTouched(false);
    toast.success("Meta description regenerada");
  }

  function updateField<K extends keyof ArticleInput>(key: K, value: ArticleInput[K]) {
    setData((d) => ({ ...d, [key]: value }));
    if (key === "title" && !slugTouched) {
      setData((d) => ({ ...d, slug: slugify(value as string) }));
    }
  }

  function addTag() {
    const t = tagInput.trim();
    if (!t) return;
    if ((data.tags ?? []).includes(t)) {
      setTagInput("");
      return;
    }
    setData((d) => ({ ...d, tags: [...(d.tags ?? []), t] }));
    setTagInput("");
  }

  function removeTag(t: string) {
    setData((d) => ({ ...d, tags: (d.tags ?? []).filter((x) => x !== t) }));
  }

  async function handleSave(publishNow?: boolean) {
    if (!data.title.trim()) {
      toast.error("Título obrigatório");
      return;
    }
    if (!data.slug.trim()) {
      toast.error("Slug obrigatório");
      return;
    }

    setSaving(true);

    const payload: ArticleInput = {
      ...data,
      is_published: publishNow ?? data.is_published,
      reading_time_minutes: calcReadingTime(data.content),
    };

    if (mode === "create") {
      const r = await createArticle(payload);
      if ("error" in r) {
        toast.error(r.error!);
        setSaving(false);
        return;
      }
      toast.success(publishNow ? "Artigo publicado!" : "Rascunho salvo");
      router.replace(`/admin/artigos/${r.id}`);
      router.refresh();
    } else if (articleId) {
      const r = await updateArticle(articleId, payload);
      if ("error" in r) {
        toast.error(r.error!);
        setSaving(false);
        return;
      }
      toast.success(publishNow ? "Artigo publicado!" : "Alterações salvas");
      setSaving(false);
      router.refresh();
    }
  }

  return (
    <div className="space-y-6">
      <Link
        href="/admin/artigos"
        className="inline-flex items-center gap-1.5 text-[0.82rem] font-bold tracking-[0.08em] uppercase text-[#9a744d] transition-colors hover:text-[#171411]"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar à lista
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        {/* Coluna principal — Conteúdo */}
        <div className="space-y-6">
          {/* Metadados básicos */}
          <section className="rounded-[16px] border border-[#d8c9b8] bg-[#eee5da] p-6 lg:p-8">
            <div className="mb-6">
              <div className="mb-2 text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[#9a744d]">
                — Metadados —
              </div>
              <h2 className="font-serif text-[1.4rem] leading-tight tracking-[-0.03em] text-[#171411]">
                Título e resumo
              </h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-[0.78rem] font-bold tracking-[0.08em] uppercase text-[#756b60]">
                  Título *
                </label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="Ex: Como escolher a marcenaria certa"
                  className="w-full rounded-[10px] border border-[#d1c4b7] bg-[#f8f2ea] px-4 py-3 text-[1.05rem] outline-none focus:border-[#9a744d] focus:bg-white"
                  style={{ fontFamily: "var(--font-display)" }}
                />
              </div>

              <div>
                <label className="mb-2 block text-[0.78rem] font-bold tracking-[0.08em] uppercase text-[#756b60]">
                  Subtítulo
                </label>
                <input
                  type="text"
                  value={data.subtitle ?? ""}
                  onChange={(e) => updateField("subtitle", e.target.value)}
                  placeholder="Uma linha complementar ao título"
                  className="w-full rounded-[10px] border border-[#d1c4b7] bg-[#f8f2ea] px-4 py-3 text-[0.95rem] outline-none focus:border-[#9a744d] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-[0.78rem] font-bold tracking-[0.08em] uppercase text-[#756b60]">
                  Resumo (excerpt)
                </label>
                <textarea
                  value={data.excerpt ?? ""}
                  onChange={(e) => updateField("excerpt", e.target.value)}
                  placeholder="Resumo que aparece na lista de artigos (2-3 linhas)"
                  rows={3}
                  className="w-full resize-y rounded-[10px] border border-[#d1c4b7] bg-[#f8f2ea] px-4 py-3 text-[0.95rem] leading-[1.55] outline-none focus:border-[#9a744d] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-[0.78rem] font-bold tracking-[0.08em] uppercase text-[#756b60]">
                  Slug (URL) *
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-[0.88rem] text-[#756b60]">
                    /
                    {ARTICLE_CATEGORIES.find((c) => c.value === data.category)?.urlPath.replace(
                      "/",
                      ""
                    )}
                    /
                  </span>
                  <input
                    type="text"
                    value={data.slug}
                    onChange={(e) => {
                      setSlugTouched(true);
                      updateField("slug", slugify(e.target.value));
                    }}
                    placeholder="url-do-artigo"
                    className="flex-1 rounded-[10px] border border-[#d1c4b7] bg-[#f8f2ea] px-4 py-3 text-[0.95rem] font-mono outline-none focus:border-[#9a744d] focus:bg-white"
                  />
                </div>
                <p className="mt-1.5 text-[0.78rem] text-[#756b60]">
                  Gerado automaticamente pelo título. Pode editar.
                </p>
              </div>
            </div>
          </section>

          {/* Conteúdo — Editor TipTap */}
          <section className="rounded-[16px] border border-[#d8c9b8] bg-[#eee5da] p-6 lg:p-8">
            <div className="mb-6">
              <div className="mb-2 text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[#9a744d]">
                — Conteúdo —
              </div>
              <h2 className="font-serif text-[1.4rem] leading-tight tracking-[-0.03em] text-[#171411]">
                Corpo do artigo
              </h2>
            </div>

            <TipTapEditor
              content={data.content}
              onChange={(json) => updateField("content", json)}
              placeholder="Comece a escrever seu artigo..."
            />
          </section>

          {/* SEO */}
          <section className="rounded-[16px] border border-[#d8c9b8] bg-[#eee5da] p-6 lg:p-8">
            <div className="mb-6">
              <div className="mb-2 text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[#9a744d]">
                — SEO —
              </div>
              <h2 className="font-serif text-[1.4rem] leading-tight tracking-[-0.03em] text-[#171411]">
                Otimização para busca
              </h2>
              <p className="mt-2 text-[0.85rem] leading-[1.5] text-[#756b60]">
                A meta description é o resumo que aparece nos resultados do Google. É preenchida{" "}
                <strong className="font-bold text-[#9a744d]">automaticamente</strong> conforme você escreve o artigo — priorizando primeiro o resumo (excerpt) e depois o corpo do texto.
              </p>
            </div>

            <div className="space-y-5">
              {/* Preview do Google SERP */}
              <div>
                <label className="mb-2 block text-[0.72rem] font-bold tracking-[0.08em] uppercase text-[#756b60]">
                  Como vai aparecer no Google
                </label>
                <div className="rounded-[12px] border border-[#d1c4b7] bg-white p-5">
                  {/* URL breadcrumb (mimetiza SERP) */}
                  <div className="mb-1 flex items-center gap-2 text-[0.78rem] text-[#4d5156]">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#eee5da] text-[0.6rem] font-bold text-[#9a744d]">
                      AN
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#202124]">Ana Laura Noronha</span>
                      <span className="text-[0.7rem] text-[#5f6368]">
                        siteananoronha.vercel.app
                        {ARTICLE_CATEGORIES.find((c) => c.value === data.category)?.urlPath ?? ""}
                        {data.slug ? `/${data.slug}` : ""}
                      </span>
                    </div>
                  </div>
                  {/* Title */}
                  <div className="mt-2">
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-[1.15rem] leading-tight text-[#1a0dab] hover:underline"
                      style={{ fontFamily: "arial, sans-serif" }}
                    >
                      {data.title || "Título do artigo aparece aqui"}
                    </a>
                  </div>
                  {/* Description */}
                  <p
                    className="mt-1 text-[0.88rem] leading-[1.5] text-[#4d5156]"
                    style={{ fontFamily: "arial, sans-serif" }}
                  >
                    {(data.seo_meta_description ?? "").trim() || (
                      <span className="italic text-[#80868b]">
                        Escreva o corpo do artigo para gerar a descrição automaticamente...
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Campo editável */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label className="block text-[0.78rem] font-bold tracking-[0.08em] uppercase text-[#756b60]">
                    Meta Description
                  </label>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[0.65rem] font-bold tracking-[0.05em] uppercase",
                        seoTouched
                          ? "border-[#d1c4b7] bg-[#f1ebe3] text-[#756b60]"
                          : "border-[#9a744d]/40 bg-[#9a744d]/10 text-[#9a744d]"
                      )}
                    >
                      {seoTouched ? (
                        "Editado manualmente"
                      ) : (
                        <>
                          <Sparkles className="h-3 w-3" />
                          Automático
                        </>
                      )}
                    </span>
                    {seoTouched && (
                      <button
                        type="button"
                        onClick={handleRegenerateSEO}
                        title="Voltar a preencher automaticamente"
                        className="inline-flex items-center gap-1 rounded-[8px] border border-[#d1c4b7] bg-white px-2.5 py-1 text-[0.72rem] font-bold text-[#9a744d] transition-all hover:border-[#9a744d] hover:bg-[#f8f2ea]"
                      >
                        <Sparkles className="h-3 w-3" />
                        Gerar auto
                      </button>
                    )}
                  </div>
                </div>
                <textarea
                  value={data.seo_meta_description ?? ""}
                  onChange={(e) => {
                    setSeoTouched(true);
                    updateField("seo_meta_description", e.target.value);
                  }}
                  maxLength={200}
                  rows={3}
                  placeholder="Escreva o corpo do artigo — a descrição será gerada automaticamente. Ou edite manualmente aqui."
                  className="w-full resize-y rounded-[10px] border border-[#d1c4b7] bg-[#f8f2ea] px-4 py-3 text-[0.95rem] leading-[1.55] outline-none focus:border-[#9a744d] focus:bg-white"
                />

                {/* Avaliação de qualidade + contador */}
                {(() => {
                  const quality = evaluateMetaQuality(data.seo_meta_description ?? "");
                  const len = (data.seo_meta_description ?? "").length;
                  const statusColor = {
                    empty: "text-[#756b60]",
                    weak: "text-amber-600",
                    ok: "text-blue-600",
                    great: "text-green-600",
                  }[quality.status];
                  const counterColor = (() => {
                    if (len === 0) return "text-[#756b60]";
                    if (len < 120) return "text-amber-600";
                    if (len <= 160) return "text-green-600";
                    return "text-red-600";
                  })();
                  return (
                    <div className="mt-1.5 flex items-center justify-between text-[0.78rem]">
                      <span className={cn("font-medium", statusColor)}>
                        {quality.message}
                      </span>
                      <span className={cn("font-bold tabular-nums", counterColor)}>
                        {len}/160
                      </span>
                    </div>
                  );
                })()}
              </div>

              {/* Dicas rápidas de SEO */}
              <details className="rounded-[10px] border border-[#d1c4b7] bg-[#f8f2ea]/60 p-4 text-[0.85rem] leading-[1.55] text-[#3a332d]">
                <summary className="cursor-pointer font-bold text-[#9a744d]">
                  Dicas para uma boa meta description
                </summary>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.85rem]">
                  <li>Use a <strong>palavra-chave principal</strong> nos primeiros 60 caracteres.</li>
                  <li>Prometa um <strong>benefício claro</strong> ("Descubra 7 critérios...", "Aprenda a evitar retrabalho...").</li>
                  <li>Mencione o <strong>diferencial</strong> ("método integrado", "sem improviso").</li>
                  <li>Mantenha entre <strong>140-160 caracteres</strong> — Google corta o excedente.</li>
                  <li>Evite <strong>repetir literalmente o título</strong> — Google penaliza duplicação.</li>
                </ul>
              </details>
            </div>
          </section>
        </div>

        {/* Sidebar direita */}
        <aside className="space-y-6">
          {/* Categoria + publicação */}
          <section className="rounded-[16px] border border-[#d8c9b8] bg-[#eee5da] p-5">
            <div className="mb-4 text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[#9a744d]">
              — Configuração —
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-[0.78rem] font-bold tracking-[0.08em] uppercase text-[#756b60]">
                  Categoria *
                </label>
                <select
                  value={data.category}
                  onChange={(e) => updateField("category", e.target.value as any)}
                  className="w-full rounded-[10px] border border-[#d1c4b7] bg-[#f8f2ea] px-4 py-3 text-[0.92rem] outline-none focus:border-[#9a744d] focus:bg-white"
                >
                  {ARTICLE_CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-[0.78rem] font-bold tracking-[0.08em] uppercase text-[#756b60]">
                  Status
                </label>
                <div
                  className={cn(
                    "flex items-center justify-between rounded-[10px] border px-4 py-3",
                    data.is_published ? "border-[#9a744d] bg-[#f8f2ea]" : "border-[#d1c4b7] bg-[#f1ebe3]"
                  )}
                >
                  <span className="text-[0.88rem] font-bold text-[#171411]">
                    {data.is_published ? "Publicado" : "Rascunho"}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateField("is_published", !data.is_published)}
                    className={cn(
                      "relative h-6 w-11 rounded-full transition-colors",
                      data.is_published ? "bg-[#9a744d]" : "bg-[#d1c4b7]"
                    )}
                    aria-label="Alternar status"
                  >
                    <div
                      className={cn(
                        "absolute top-0 h-6 w-6 rounded-full bg-white shadow-md transition-transform",
                        data.is_published ? "translate-x-5" : "translate-x-0"
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Destaque */}
          <section className="rounded-[16px] border border-[#d8c9b8] bg-[#eee5da] p-5">
            <div className="mb-4 text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[#9a744d]">
              — Destaque —
            </div>
            <div className="flex items-center justify-between rounded-[10px] border border-[#d1c4b7] bg-[#f1ebe3] px-4 py-3">
              <div className="flex flex-col">
                <span className="text-[0.88rem] font-bold text-[#171411]">Marcar como destaque</span>
                <span className="mt-0.5 text-[0.72rem] text-[#756b60]">Aparece maior no topo da listagem</span>
              </div>
              <button
                type="button"
                onClick={() => updateField("is_featured", !data.is_featured)}
                className={cn(
                  "relative h-6 w-11 rounded-full transition-colors",
                  data.is_featured ? "bg-[#9a744d]" : "bg-[#d1c4b7]"
                )}
                aria-label="Alternar destaque"
              >
                <div
                  className={cn(
                    "absolute top-0 h-6 w-6 rounded-full bg-white shadow-md transition-transform",
                    data.is_featured ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>
          </section>

          {/* Cover */}
          <section className="rounded-[16px] border border-[#d8c9b8] bg-[#eee5da] p-5">
            <div className="mb-4 text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[#9a744d]">
              — Imagem de capa —
            </div>

            <ImageFieldEditor
              label="Imagem de capa"
              value={data.cover_image ?? ""}
              pathPrefix="artigos/covers"
              hint="Recomendado: 1200x630. Aparece em compartilhamentos sociais."
              onChange={(url) => updateField("cover_image", url)}
            />

            <div className="mt-3">
              <label className="mb-2 block text-[0.72rem] font-bold tracking-[0.08em] uppercase text-[#756b60]">
                Alt da imagem (SEO/acessibilidade)
              </label>
              <input
                type="text"
                value={data.cover_alt ?? ""}
                onChange={(e) => updateField("cover_alt", e.target.value)}
                placeholder="Descrição da imagem"
                className="w-full rounded-[10px] border border-[#d1c4b7] bg-[#f8f2ea] px-3 py-2 text-[0.85rem] outline-none focus:border-[#9a744d] focus:bg-white"
              />
            </div>
          </section>

          {/* Tags */}
          <section className="rounded-[16px] border border-[#d8c9b8] bg-[#eee5da] p-5">
            <div className="mb-4 text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[#9a744d]">
              — Tags —
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Adicionar tag"
                className="flex-1 rounded-[10px] border border-[#d1c4b7] bg-[#f8f2ea] px-3 py-2 text-[0.85rem] outline-none focus:border-[#9a744d] focus:bg-white"
              />
              <button
                type="button"
                onClick={addTag}
                className="rounded-[10px] bg-[#171614] px-3 text-[0.78rem] font-bold text-white hover:bg-[#29231f]"
              >
                +
              </button>
            </div>

            {(data.tags ?? []).length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {(data.tags ?? []).map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#d1c4b7] bg-[#f1ebe3] px-3 py-1 text-[0.75rem] font-bold text-[#9a744d]"
                  >
                    {t}
                    <button
                      type="button"
                      onClick={() => removeTag(t)}
                      className="hover:text-red-600"
                      aria-label={`Remover tag ${t}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* Botões de ação */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleSave(false)}
              disabled={saving}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[10px] border border-[#d1c4b7] bg-[#f1ebe3] px-6 text-[0.95rem] font-bold tracking-[-0.01em] text-[#171411] transition-all hover:-translate-y-0.5 hover:bg-[#f8f2ea] disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? "Salvando..." : "Salvar rascunho"}
            </button>

            <button
              type="button"
              onClick={() => handleSave(true)}
              disabled={saving}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-[#171614] px-6 text-[0.95rem] font-bold tracking-[-0.01em] text-white shadow-[0_12px_28px_rgba(28,22,17,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#29231f] disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? "Publicando..." : data.is_published ? "Atualizar publicação" : "Publicar agora"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
