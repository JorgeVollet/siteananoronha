"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ProjectInput = {
  category: "engenharia" | "marcenaria";
  nome: string;
  tipologia: string;
  servicos: string[];
  ordem: number;
  is_published: boolean;
};

export async function createProject(input: ProjectInput) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado" };

  const { data, error } = await supabase
    .from("portfolio_projects")
    .insert({
      category: input.category,
      nome: input.nome.trim(),
      tipologia: input.tipologia.trim(),
      servicos: input.servicos,
      ordem: input.ordem,
      is_published: input.is_published,
    })
    .select("id")
    .single();

  if (error) return { error: error.message };

  revalidatePath("/admin/portfolio");
  revalidatePath("/");
  return { id: data.id };
}

export async function updateProject(id: string, input: ProjectInput) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado" };

  const { error } = await supabase
    .from("portfolio_projects")
    .update({
      category: input.category,
      nome: input.nome.trim(),
      tipologia: input.tipologia.trim(),
      servicos: input.servicos,
      ordem: input.ordem,
      is_published: input.is_published,
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/portfolio");
  revalidatePath(`/admin/portfolio/${id}`);
  revalidatePath("/");
  return { success: true };
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado" };

  const { data: media } = await supabase
    .from("portfolio_media")
    .select("url, before_url, video_url, video_source")
    .eq("project_id", id);

  if (media && media.length > 0) {
    const portfolioPaths = media
      .flatMap((m) => [m.url, m.before_url])
      .filter((u): u is string => !!u)
      .map((u) => extractStoragePath(u, "portfolio-media"))
      .filter((p): p is string => !!p);

    const videoPaths = media
      .filter((m) => m.video_source === "upload" && m.video_url)
      .map((m) => extractStoragePath(m.video_url!, "videos"))
      .filter((p): p is string => !!p);

    if (portfolioPaths.length > 0) {
      await supabase.storage.from("portfolio-media").remove(portfolioPaths);
    }
    if (videoPaths.length > 0) {
      await supabase.storage.from("videos").remove(videoPaths);
    }
  }

  const { error } = await supabase
    .from("portfolio_projects")
    .delete()
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/portfolio");
  revalidatePath("/");
  return { success: true };
}

function extractStoragePath(publicUrl: string, bucket: string): string | null {
  const idx = publicUrl.indexOf(`/${bucket}/`);
  if (idx === -1) return null;
  return publicUrl.slice(idx + bucket.length + 2);
}
