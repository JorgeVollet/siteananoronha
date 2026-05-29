import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ProjectForm } from "../_components/ProjectForm";

export default async function EditarProjetoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("portfolio_projects")
    .select("*, media:portfolio_media(*)")
    .eq("id", id)
    .maybeSingle();

  if (!project) notFound();

  const sortedMedia = (project.media ?? []).sort(
    (a: { ordem: number }, b: { ordem: number }) => a.ordem - b.ordem
  );

  return (
    <div className="mx-auto max-w-[860px] px-4 py-8">
      <Link
        href="/admin/portfolio"
        className="mb-6 inline-flex items-center gap-1.5 text-[0.80rem] font-bold tracking-[0.04em] uppercase text-[#9a744d] transition-colors hover:text-[#171411]"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar à lista
      </Link>

      <ProjectForm
        mode="edit"
        projectId={id}
        initialData={{
          category: project.category,
          nome: project.nome,
          tipologia: project.tipologia,
          servicos: project.servicos ?? [],
          ordem: project.ordem,
          is_published: project.is_published,
        }}
        initialMedia={sortedMedia}
      />
    </div>
  );
}
