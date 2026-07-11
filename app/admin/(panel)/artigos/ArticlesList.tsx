"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Edit, Eye, EyeOff, Trash2, Search, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { ARTICLE_CATEGORIES, getCategoryConfig } from "@/lib/articles-constants";
import { deleteArticle, togglePublish } from "./_actions/article";

type ArticleLite = {
  id: string;
  slug: string;
  category: string;
  title: string;
  subtitle: string | null;
  cover_image: string | null;
  tags: string[];
  is_published: boolean;
  published_at: string | null;
  updated_at: string;
};

type Filter = "todos" | "blog" | "normas" | "curiosidades" | "sketch";

export function ArticlesList({ articles: initial }: { articles: ArticleLite[] }) {
  const router = useRouter();
  const [articles, setArticles] = useState(initial);
  const [filter, setFilter] = useState<Filter>("todos");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = articles;
    if (filter !== "todos") list = list.filter((a) => a.category === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.slug.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [articles, filter, search]);

  async function handleTogglePublish(a: ArticleLite) {
    const r = await togglePublish(a.id, a.is_published);
    if ("error" in r) {
      toast.error(r.error);
      return;
    }
    setArticles((list) =>
      list.map((x) => (x.id === a.id ? { ...x, is_published: !x.is_published } : x))
    );
    toast.success(a.is_published ? "Artigo despublicado" : "Artigo publicado");
    router.refresh();
  }

  async function handleDelete(a: ArticleLite) {
    if (!confirm(`Excluir "${a.title}"? Esta ação não pode ser desfeita.`)) return;
    const r = await deleteArticle(a.id);
    if ("error" in r) {
      toast.error(r.error);
      return;
    }
    setArticles((list) => list.filter((x) => x.id !== a.id));
    toast.success("Artigo excluído");
    router.refresh();
  }

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[16px] border border-dashed border-[#d8c9b8] bg-[#eee5da]/40 px-6 py-20 text-center">
        <FileText className="mb-4 h-12 w-12 text-[#9a744d]/50" strokeWidth={1.5} />
        <h3 className="mb-3 font-serif text-[1.5rem] leading-tight tracking-[-0.03em] text-[#171411]">
          Nenhum artigo criado ainda.
        </h3>
        <p className="mb-6 max-w-[420px] text-[0.95rem] leading-[1.6] text-[#3a332d]">
          Comece criando seu primeiro artigo. Você poderá escolher a categoria e escrever com editor
          rich text.
        </p>
        <Link
          href="/admin/artigos/novo"
          className="rounded-[10px] bg-[#171614] px-6 py-3 text-[0.92rem] font-bold tracking-[-0.01em] text-white transition-all hover:bg-[#29231f]"
        >
          Escrever primeiro artigo
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex flex-wrap items-center gap-1 self-start rounded-full border border-[#d8c9b8] bg-[#f1ebe3] p-1.5">
          <FilterButton current={filter} value="todos" label="Todos" onClick={setFilter} />
          {ARTICLE_CATEGORIES.map((c) => (
            <FilterButton
              key={c.value}
              current={filter}
              value={c.value as Filter}
              label={c.label}
              onClick={setFilter}
            />
          ))}
        </div>

        <div className="relative max-w-[320px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#756b60]" />
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-[10px] border border-[#d1c4b7] bg-[#f8f2ea] py-2.5 pl-10 pr-3 text-[0.92rem] outline-none transition-colors focus:border-[#9a744d] focus:bg-white"
          />
        </div>
      </div>

      {/* Lista */}
      {filtered.length === 0 ? (
        <div className="rounded-[16px] border border-dashed border-[#d8c9b8] bg-[#eee5da]/40 px-6 py-12 text-center">
          <p className="text-[0.95rem] text-[#3a332d]">Nenhum artigo com esses filtros.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((a) => {
            const cfg = getCategoryConfig(a.category);
            return (
              <article
                key={a.id}
                className={cn(
                  "group flex items-start gap-4 rounded-[16px] border p-4 transition-all",
                  a.is_published
                    ? "border-[#d8c9b8] bg-[#eee5da]"
                    : "border-[#e3d6c6] bg-[#f4ede2] opacity-75"
                )}
              >
                {/* Thumbnail */}
                <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-[8px] border border-[#d1c4b7] bg-[#f1ebe3]">
                  {a.cover_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={a.cover_image} alt={a.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <FileText className="h-6 w-6 text-[#9a744d]/50" strokeWidth={1.5} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="mb-1 flex items-center gap-2">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold tracking-[0.08em] uppercase text-white"
                      style={{ background: cfg?.color ?? "#9a744d" }}
                    >
                      {cfg?.label ?? a.category}
                    </span>
                    {!a.is_published && (
                      <span className="rounded-full bg-[#e0d4c2] px-2.5 py-0.5 text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#756b60]">
                        Rascunho
                      </span>
                    )}
                  </div>
                  <h3 className="mb-1 font-serif text-[1.15rem] leading-tight tracking-[-0.025em] text-[#171411]">
                    {a.title}
                  </h3>
                  {a.subtitle && (
                    <p className="mb-2 text-[0.85rem] text-[#3a332d] line-clamp-1">{a.subtitle}</p>
                  )}
                  <div className="text-[0.72rem] text-[#756b60]">
                    /{a.slug}
                    {a.tags.length > 0 && ` · ${a.tags.slice(0, 3).join(", ")}`}
                  </div>
                </div>

                {/* Ações */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/artigos/${a.id}`}
                    className="flex h-9 items-center gap-1.5 rounded-[8px] bg-[#171614] px-3 text-[0.78rem] font-bold tracking-[-0.01em] text-white transition-all hover:bg-[#29231f]"
                  >
                    <Edit className="h-3.5 w-3.5" />
                    Editar
                  </Link>
                  <button
                    onClick={() => handleTogglePublish(a)}
                    className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#d1c4b7] bg-[#f1ebe3] text-[#9a744d] transition-all hover:bg-[#f8f2ea]"
                    title={a.is_published ? "Despublicar" : "Publicar"}
                    aria-label={a.is_published ? "Despublicar" : "Publicar"}
                  >
                    {a.is_published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => handleDelete(a)}
                    className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#d1c4b7] bg-[#f1ebe3] text-[#9a744d] transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                    title="Excluir"
                    aria-label="Excluir"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterButton({
  current,
  value,
  label,
  onClick,
}: {
  current: Filter;
  value: Filter;
  label: string;
  onClick: (v: Filter) => void;
}) {
  return (
    <button
      onClick={() => onClick(value)}
      className={cn(
        "rounded-full px-4 py-2 text-[0.82rem] font-bold tracking-[-0.01em] transition-all duration-300",
        current === value
          ? "bg-[#171614] text-white shadow-[0_8px_20px_rgba(28,22,17,0.18)]"
          : "text-[#756b60] hover:text-[#171411]"
      )}
    >
      {label}
    </button>
  );
}
