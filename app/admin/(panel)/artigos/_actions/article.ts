"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ArticleCategory } from "@/lib/types/database";

export type ArticleInput = {
  slug: string;
  category: ArticleCategory;
  title: string;
  subtitle?: string;
  excerpt?: string;
  content?: any;
  cover_image?: string;
  cover_alt?: string;
  tags?: string[];
  reading_time_minutes?: number;
  seo_meta_description?: string;
  seo_keywords?: string[];
  is_published: boolean;
  is_featured?: boolean;
  published_at?: string;
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

export async function createArticle(input: ArticleInput) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado" };

  const slug = input.slug || slugify(input.title);

  const { data, error } = await supabase
    .from("articles")
    .insert({
      slug,
      category: input.category,
      title: input.title.trim(),
      subtitle: input.subtitle?.trim() || null,
      excerpt: input.excerpt?.trim() || null,
      content: input.content ?? null,
      cover_image: input.cover_image || null,
      cover_alt: input.cover_alt || null,
      tags: input.tags ?? [],
      reading_time_minutes: input.reading_time_minutes ?? null,
      seo_meta_description: input.seo_meta_description || null,
      seo_keywords: input.seo_keywords ?? null,
      is_published: input.is_published,
      is_featured: input.is_featured ?? false,
      published_at: input.published_at || (input.is_published ? new Date().toISOString() : null),
      updated_by: user.id,
    })
    .select("id")
    .single();

  if (error) return { error: error.message };

  revalidatePath("/admin/artigos");
  return { id: data.id };
}

export async function updateArticle(id: string, input: ArticleInput) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado" };

  const { error } = await supabase
    .from("articles")
    .update({
      slug: input.slug,
      category: input.category,
      title: input.title.trim(),
      subtitle: input.subtitle?.trim() || null,
      excerpt: input.excerpt?.trim() || null,
      content: input.content ?? null,
      cover_image: input.cover_image || null,
      cover_alt: input.cover_alt || null,
      tags: input.tags ?? [],
      reading_time_minutes: input.reading_time_minutes ?? null,
      seo_meta_description: input.seo_meta_description || null,
      seo_keywords: input.seo_keywords ?? null,
      is_published: input.is_published,
      is_featured: input.is_featured ?? false,
      published_at: input.published_at || (input.is_published ? new Date().toISOString() : null),
      updated_by: user.id,
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/artigos");
  revalidatePath(`/admin/artigos/${id}`);
  return { success: true };
}

export async function deleteArticle(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado" };

  const { data: article } = await supabase
    .from("articles")
    .select("cover_image")
    .eq("id", id)
    .single();

  if (article?.cover_image) {
    const idx = article.cover_image.indexOf("/site-images/");
    if (idx !== -1) {
      const path = article.cover_image.slice(idx + "/site-images/".length);
      await supabase.storage.from("site-images").remove([path]);
    }
  }

  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/artigos");
  return { success: true };
}

export async function togglePublish(id: string, currentValue: boolean) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado" };

  const newValue = !currentValue;
  const { error } = await supabase
    .from("articles")
    .update({
      is_published: newValue,
      published_at: newValue ? new Date().toISOString() : null,
      updated_by: user.id,
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/artigos");
  return { success: true };
}
