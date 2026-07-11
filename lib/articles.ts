import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { ArticleCategory } from '@/lib/types/database';

export type ArticleListItem = {
  id: string;
  slug: string;
  category: ArticleCategory;
  title: string;
  subtitle: string | null;
  excerpt: string | null;
  cover_image: string | null;
  cover_alt: string | null;
  tags: string[];
  reading_time_minutes: number | null;
  published_at: string | null;
  is_featured: boolean;
};

const LIST_COLS =
  'id, slug, category, title, subtitle, excerpt, cover_image, cover_alt, tags, reading_time_minutes, published_at, is_featured';

export async function getPublishedArticles(
  category: ArticleCategory,
): Promise<ArticleListItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('articles')
    .select(LIST_COLS)
    .eq('category', category)
    .eq('is_published', true)
    .lte('published_at', new Date().toISOString())
    .order('is_featured', { ascending: false })
    .order('published_at', { ascending: false });

  if (error) {
    console.error('getPublishedArticles error:', error);
    return [];
  }
  return (data ?? []) as ArticleListItem[];
}

export async function getArticleBySlug(
  category: ArticleCategory,
  slug: string,
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('category', category)
    .eq('slug', slug)
    .eq('is_published', true)
    .lte('published_at', new Date().toISOString())
    .maybeSingle();

  if (error) {
    console.error('getArticleBySlug error:', error);
    return null;
  }
  return data;
}

export async function getRelatedArticles(
  category: ArticleCategory,
  excludeId: string,
  limit = 3,
): Promise<ArticleListItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('articles')
    .select(LIST_COLS)
    .eq('category', category)
    .eq('is_published', true)
    .neq('id', excludeId)
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('getRelatedArticles error:', error);
    return [];
  }
  return (data ?? []) as ArticleListItem[];
}

/**
 * Retorna slugs para generateStaticParams.
 *
 * Usa o admin client (service_role) em vez do SSR client porque
 * generateStaticParams roda em build-time, fora de contexto de request,
 * onde cookies() não está disponível.
 *
 * A leitura é segura pois só retorna slugs de artigos publicados.
 */
export async function getAllSlugsForCategory(
  category: ArticleCategory,
): Promise<string[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('articles')
    .select('slug')
    .eq('category', category)
    .eq('is_published', true);

  if (error) {
    console.error('getAllSlugsForCategory error:', error);
    return [];
  }
  return (data ?? []).map((a) => a.slug);
}

/**
 * Busca os N artigos mais recentes de qualquer categoria (para a mini seção da home).
 */
export async function getLatestArticles(
  limit = 3,
): Promise<ArticleListItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('articles')
    .select(LIST_COLS)
    .eq('is_published', true)
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('getLatestArticles error:', error);
    return [];
  }
  return (data ?? []) as ArticleListItem[];
}

/**
 * Busca os N artigos mais recentes de UMA categoria específica.
 * Usado pelo carrossel editorial da home (4 categorias × N artigos).
 */
export async function getLatestArticlesByCategory(
  category: ArticleCategory,
  limit = 3,
): Promise<ArticleListItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('articles')
    .select(LIST_COLS)
    .eq('category', category)
    .eq('is_published', true)
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error(`getLatestArticlesByCategory(${category}) error:`, error);
    return [];
  }
  return (data ?? []) as ArticleListItem[];
}
