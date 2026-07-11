-- ────────────────────────────────────────────────────────────
-- 1) VER o que está hoje no banco para Hero e Sobre
-- ────────────────────────────────────────────────────────────
select
  section,
  content
from public.site_content
where section in ('hero', 'sobre_novo');
