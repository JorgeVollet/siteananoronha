-- Seed da NOVA seção Sobre (biografia da Ana)
insert into public.site_content (section, key, value_text) values
  ('sobre_novo', 'eyebrow', 'Sobre'),
  ('sobre_novo', 'titulo', 'Olá, eu sou a Ana Laura.'),
  ('sobre_novo', 'subtitulo', 'Engenheira Civil & Curadora de Interiores'),
  ('sobre_novo', 'corpo', E'Formada pela Universidade do Vale do Itajaí — SC, sou Engenheira Civil apaixonada por transformar sonhos em realidade. Em 11 anos de trajetória pude conhecer várias áreas dessa linda profissão.\n\nPós-graduanda em Planejamento e Gerenciamento de Obra, hoje trabalho em várias frentes — projetos residenciais, comerciais, industriais — e também com curadoria de transformação de interiores e marcenaria especializada.\n\nCombinando criatividade, inovação e técnica, sinto-me à vontade para criar espaços completos e eficientes que inspiram e refletem a personalidade e os objetivos de meus clientes.'),
  ('sobre_novo', 'imagem', '/img/7.png')
on conflict (section, key) do nothing;
