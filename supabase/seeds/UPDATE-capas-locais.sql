-- ============================================================
-- UPDATE das capas dos artigos: Unsplash → arquivos locais /capas/
-- Todos os arquivos estão em public/capas/ e são servidos como /capas/*.jpeg
-- ============================================================

-- BLOG
update public.articles set cover_image = '/capas/01-quanto-custa-reformar-uma-casa.jpeg'
  where slug = 'quanto-custa-reformar-uma-casa';

update public.articles set cover_image = '/capas/02-como-escolher-projetista-sem-se-arrepender.jpeg'
  where slug = 'como-escolher-projetista-sem-se-arrepender';

update public.articles set cover_image = '/capas/03-marcenaria-sob-medida-vale-a-pena.jpeg'
  where slug = 'marcenaria-sob-medida-vale-a-pena';

update public.articles set cover_image = '/capas/04-reforma-ou-construir-do-zero.jpeg'
  where slug = 'reforma-ou-construir-do-zero';

update public.articles set cover_image = '/capas/05-cronograma-de-obra-por-que-atrasam.jpeg'
  where slug = 'cronograma-de-obra-por-que-atrasam';

update public.articles set cover_image = '/capas/06-contratei-uma-engenheira.jpeg'
  where slug = 'contratei-uma-engenheira-o-que-muda';

update public.articles set cover_image = '/capas/07-reforma-em-apartamento.jpeg'
  where slug = 'reforma-em-apartamento-o-que-saber';

update public.articles set cover_image = '/capas/08-cozinha-sem-estourar-orcamento.jpeg'
  where slug = 'como-reformar-cozinha-sem-estourar-orcamento';

-- NORMAS
update public.articles set cover_image = '/capas/09-nbr-15575-desempenho.jpeg'
  where slug = 'nbr-15575-norma-de-desempenho-explicada';

update public.articles set cover_image = '/capas/10-art-rrt-responsabilidade.jpeg'
  where slug = 'art-e-rrt-o-que-e-quando-e-obrigatorio';

update public.articles set cover_image = '/capas/11-nbr-9050-acessibilidade.jpeg'
  where slug = 'nbr-9050-acessibilidade-em-projetos-residenciais';

update public.articles set cover_image = '/capas/12-nr-18-canteiro.jpeg'
  where slug = 'nr-18-normas-de-seguranca-canteiro-de-obra';

update public.articles set cover_image = '/capas/13-nbr-5410-eletrica.jpeg'
  where slug = 'nbr-14039-instalacoes-eletricas-o-que-cliente-precisa-saber';

-- CURIOSIDADES
update public.articles set cover_image = '/capas/14-7-truques-iluminacao.jpeg'
  where slug = '7-truques-iluminacao-arquitetos-usam';

update public.articles set cover_image = '/capas/15-casas-antigas-aconchego.jpeg'
  where slug = 'por-que-casas-antigas-parecem-mais-aconchegantes';

update public.articles set cover_image = '/capas/16-regra-60-30-10.jpeg'
  where slug = 'regra-60-30-10-design-de-interiores';

update public.articles set cover_image = '/capas/17-10-erros-decoracao.jpeg'
  where slug = '10-erros-decoracao-engenheiros-identificam';

-- SKETCH
update public.articles set cover_image = '/capas/18-textura-como-projeto.jpeg'
  where slug = 'textura-que-virou-projeto-parede-concreto';

update public.articles set cover_image = '/capas/19-cadeira-escandinava.jpeg'
  where slug = 'cadeira-que-muda-tudo-design-escandinavo';

update public.articles set cover_image = '/capas/20-detalhe-nao-se-ve.jpeg'
  where slug = 'detalhe-invisivel-rodape-embutido';

-- ============================================================
-- Verificação — deve retornar 20 linhas com o path /capas/
-- ============================================================
select slug, cover_image from public.articles where cover_image like '/capas/%' order by cover_image;
