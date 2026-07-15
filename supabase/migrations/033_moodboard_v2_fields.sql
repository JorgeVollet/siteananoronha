-- Migration 033 — Moodboard v2 (Painel Mental)
-- Adiciona campos pra colagem editorial: mood keyword, cores dominantes,
-- flag should_isolate (renomeia should_remove_background se existir)

-- 1. Novos campos
alter table public.moodboard_images
  add column if not exists mood_keyword text,
  add column if not exists dominant_colors jsonb,
  add column if not exists should_isolate boolean;

-- 2. Se a coluna antiga existe, migra os dados e dropa
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'moodboard_images'
      and column_name = 'should_remove_background'
  ) then
    -- copia valores antigos para o novo campo (só onde ainda não tem valor)
    update public.moodboard_images
       set should_isolate = should_remove_background
     where should_isolate is null;
    -- dropa a coluna antiga
    alter table public.moodboard_images
      drop column should_remove_background;
  end if;
end $$;

-- 3. Index leve pra queries futuras por category+should_isolate
create index if not exists moodboard_images_category_isolate_idx
  on public.moodboard_images (session_id, category, should_isolate);
