-- ============================================================
-- ATUALIZAÇÃO DE CAPAS — Blog artigos 1-3
-- Substituindo paths locais inexistentes por Unsplash placeholders
-- de alta qualidade. Ana Laura substitui depois pelas fotos IA autorais.
-- ============================================================

update public.articles
set cover_image = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
    cover_alt = 'Planta arquitetônica detalhada sobre mesa de trabalho com lápis e régua'
where slug = 'quanto-custa-reformar-uma-casa';

update public.articles
set cover_image = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    cover_alt = 'Interior de sala com iluminação natural, sofá bege e obras enquadradas'
where slug = 'como-escolher-projetista-sem-se-arrepender';

update public.articles
set cover_image = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80',
    cover_alt = 'Cozinha moderna com marcenaria sob medida em tons de madeira nogal'
where slug = 'marcenaria-sob-medida-vale-a-pena';
