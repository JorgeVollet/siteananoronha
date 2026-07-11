-- ============================================================
-- SWAP HERO ↔ SOBRE  (v2 — schema key-value)
--
-- Tabela site_content é key-value: cada campo em linha própria.
--   hero.imagem_principal  (section='hero', key='imagem_principal')
--   sobre_novo.imagem      (section='sobre_novo', key='imagem')
--
-- ORDEM IMPORTA: sobre primeiro pega a foto atual da hero;
-- só depois a hero é substituída pela nova.
-- ============================================================


-- ─── PASSO 1: SOBRE recebe a foto que estava na HERO ────────
update public.site_content sc
set value_text = (
  select value_text
  from public.site_content
  where section = 'hero' and key = 'imagem_principal'
)
where sc.section = 'sobre_novo' and sc.key = 'imagem';


-- ─── PASSO 2: HERO recebe a foto nova ───────────────────────
update public.site_content
set value_text = '/img/hero/hero-3-areas.jpg'
where section = 'hero' and key = 'imagem_principal';


-- ─── VERIFICAÇÃO ────────────────────────────────────────────
-- Deve retornar 2 linhas:
--   hero        | imagem_principal | /img/hero/hero-3-areas.jpg
--   sobre_novo  | imagem           | (a foto que ANTES estava na hero)
select section, key, value_text
from public.site_content
where (section = 'hero'       and key = 'imagem_principal')
   or (section = 'sobre_novo' and key = 'imagem');
