-- ============================================================
-- AUDITORIA DE ARTIGOS — v1 vs v2
--
-- Roda no SQL Editor do Supabase. Retorna 2 blocos:
--   1) Detalhado por artigo (20 linhas) — status_capa + status_voz
--   2) Resumo agregado — contadores gerais
--
-- Ideal: TUDO 🟢 verde na coluna status_capa e status_voz.
-- Se sobrar 🔴 vermelho em algum, rodar o UPDATE-*-v2.sql correspondente.
-- ============================================================


-- ─── 1) DETALHADO POR ARTIGO ────────────────────────────────
select
  category as categoria,
  substring(slug from 1 for 45) as slug,
  substring(title from 1 for 50) as titulo,

  -- CAPA: precisa estar apontando pra /capas/*.jpeg local
  case
    when cover_image like '/capas/%' then '🟢 local'
    when cover_image like '%unsplash%' then '🔴 Unsplash (rodar UPDATE-capas-locais.sql)'
    else '🟡 outro: ' || substring(cover_image from 1 for 30)
  end as status_capa,

  -- VOZ: procura marcadores da v1 (vivência fabricada)
  case
    when content::text ilike '%Cliente meu%'
      or content::text ilike '%Cliente minha%'
      or content::text ilike '%Vi cliente%'
      or content::text ilike '%Estava passando%'
      or content::text ilike '%Depois de dezenas de obras%'
      or content::text ilike '%Depois de projetar dezenas%'
      or content::text ilike '%Depois de fazer várias reformas%'
      or content::text ilike '%vejo cliente após cliente%'
      or content::text ilike '%vejo cliente ap%s cliente%'
      or content::text ilike '%Uma vez tive um caso%'
      or content::text ilike '%Ela chegou até mim dizendo%'
    then '🔴 tem vivência fabricada (rodar UPDATE-*-v2.sql)'
    else '🟢 voz v2 limpa'
  end as status_voz,

  -- SKETCH: título mudou no v2
  case
    when slug = 'textura-que-virou-projeto-parede-concreto' then
      case when title = 'Textura como projeto' then '🟢 título v2' else '🔴 título antigo (rodar UPDATE-sketch-18-20-v2.sql)' end
    when slug = 'cadeira-que-muda-tudo-design-escandinavo' then
      case when title = 'A régua da cadeira escandinava' then '🟢 título v2' else '🔴 título antigo' end
    when slug = 'detalhe-invisivel-rodape-embutido' then
      case when title in ('Detalhe que não se vê, mas se sente', 'Detalhe que nao se ve, mas se sente') then '🟢 título v2' else '🔴 título antigo' end
    else '—'
  end as status_titulo_sketch

from public.articles
where is_published = true
order by
  case category
    when 'blog' then 1
    when 'normas' then 2
    when 'curiosidades' then 3
    when 'sketch' then 4
    else 5
  end,
  published_at desc;


-- ─── 2) RESUMO AGREGADO ─────────────────────────────────────
select
  count(*) as total_artigos_publicados,

  count(*) filter (where cover_image like '/capas/%') as capas_locais_ok,
  count(*) filter (where cover_image like '%unsplash%') as capas_unsplash_pendentes,

  count(*) filter (
    where content::text ilike '%Cliente meu%'
       or content::text ilike '%Cliente minha%'
       or content::text ilike '%Vi cliente%'
       or content::text ilike '%Estava passando%'
       or content::text ilike '%Depois de dezenas de obras%'
       or content::text ilike '%Depois de projetar dezenas%'
       or content::text ilike '%Depois de fazer várias reformas%'
       or content::text ilike '%vejo cliente após cliente%'
  ) as artigos_com_voz_v1_pendente,

  count(*) filter (where is_featured = true) as destaques,
  count(*) filter (where category = 'blog') as blog,
  count(*) filter (where category = 'normas') as normas,
  count(*) filter (where category = 'curiosidades') as curiosidades,
  count(*) filter (where category = 'sketch') as sketch

from public.articles
where is_published = true;
