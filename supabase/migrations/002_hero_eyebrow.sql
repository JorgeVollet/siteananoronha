-- Adiciona campo "eyebrow" na seção hero (mini-título de abertura)
-- Idempotente: on conflict do nothing garante que não duplica nem sobrescreve valor editado
insert into public.site_content (section, key, value_text)
values ('hero', 'eyebrow', '01 / Manifesto')
on conflict (section, key) do nothing;
