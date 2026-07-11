import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ArticleForm } from "../_components/ArticleForm";

export default async function EditarArtigoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!article) notFound();

  return (
    <ArticleForm
      mode="edit"
      articleId={article.id}
      initialData={{
        slug: article.slug,
        category: article.category,
        title: article.title,
        subtitle: article.subtitle ?? "",
        excerpt: article.excerpt ?? "",
        content: article.content,
        cover_image: article.cover_image ?? "",
        cover_alt: article.cover_alt ?? "",
        tags: article.tags,
        seo_meta_description: article.seo_meta_description ?? "",
        seo_keywords: article.seo_keywords ?? [],
        is_published: article.is_published,
        is_featured: article.is_featured ?? false,
        published_at: article.published_at ?? undefined,
      }}
    />
  );
}
