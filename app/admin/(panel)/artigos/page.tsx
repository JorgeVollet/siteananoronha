import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Plus } from "lucide-react";
import { ArticlesList } from "./ArticlesList";

export default async function AdminArtigosPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select(
      "id, slug, category, title, subtitle, cover_image, tags, is_published, published_at, updated_at"
    )
    .order("updated_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 text-[0.78rem] font-bold tracking-[0.12em] uppercase text-[#9a744d]">
            — Editorial —
          </div>
          <p className="max-w-[640px] text-[0.95rem] leading-[1.6] text-[#3a332d]">
            Crie e gerencie artigos do Blog, Normas Técnicas, Curiosidades e Brainstorming Sketch.
          </p>
        </div>

        <Link
          href="/admin/artigos/novo"
          className="flex h-12 items-center gap-2 rounded-[10px] bg-[#171614] px-5 text-[0.92rem] font-bold tracking-[-0.01em] text-white shadow-[0_12px_28px_rgba(28,22,17,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#29231f]"
        >
          <Plus className="h-4 w-4" />
          Novo artigo
        </Link>
      </div>

      <ArticlesList articles={articles ?? []} />
    </div>
  );
}
