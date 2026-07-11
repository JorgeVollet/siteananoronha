-- =============================================
-- ADICIONA: campo is_featured em articles
-- Usado no layout assimétrico da listagem
-- =============================================
alter table public.articles
  add column if not exists is_featured boolean not null default false;

-- Índice pra queries rápidas de destaque por categoria
create index if not exists idx_articles_featured
  on public.articles(category, published_at desc)
  where is_featured = true and is_published = true;
