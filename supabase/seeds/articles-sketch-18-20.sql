-- ============================================================
-- SEED DE ARTIGOS — BLOCO 5/6
-- Brainstorming Sketch: posts 18, 19, 20
-- Formato: mais curtos, visuais, tom pessoal e reflexivo
-- (formato "caderno criativo" — não instrutivo)
-- ============================================================

-- ------------------------------------------------------------
-- POST 18 — Textura que virou projeto · DESTAQUE do Sketch
-- ------------------------------------------------------------
insert into public.articles (
  slug, category, title, subtitle, excerpt, content,
  cover_image, cover_alt, tags, author, reading_time_minutes,
  seo_meta_description, seo_keywords,
  is_published, published_at, is_featured
) values (
  'textura-que-virou-projeto-parede-concreto',
  'sketch',
  'A textura que virou projeto',
  'Uma parede de concreto queimado inspirou uma cozinha inteira. Registro do momento.',
  'Às vezes uma referência resolve tudo. Anotei essa aqui pra não esquecer.',
  $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Estava passando por uma rua no bairro Bom Fim quando parei diante de um muro. Concreto queimado antigo, riscado pelo tempo, com o mineral aparecendo em pontos irregulares. A cor foi ficando mais quente conforme o sol da tarde batia. E eu pensei: essa é a cozinha do projeto que estou desenvolvendo."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Não era muro de projeto. Era muro qualquer, feito por qualquer um, envelhecido com o tempo. Mas o efeito era exatamente o que a cliente vinha me pedindo em palavras que não conseguia formular: \"quero algo que pareça vivido, mas moderno\"."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"O que envelhece com dignidade custa mais barato do que o que se sustenta a ferro e fogo."}]}]},
      {"type":"paragraph","content":[{"type":"text","text":"Tirei três fotos, uma close, uma média, uma da parede inteira. Anotei a paleta: base cinza-quente com sub-tons ocre. Marquei as manchas naturais como referência de \"onde o marceneiro deve deixar textura visível\"."}]},
      {"type":"paragraph","content":[{"type":"text","text":"A cozinha ficou assim: bancada em porcelanato imitando concreto queimado, marcenaria em MDF cor nogal amêndoa, iluminação em spot direcionado nas pequenas imperfeições que o marceneiro deliberadamente deixou. Não é replica do muro. É espírito do muro."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Quando a cliente viu o resultado, ela disse: \"É isso. Não sei explicar, mas é isso\". E eu sorri, porque também não sabia explicar quando vi o muro. Só sabia que era."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Do caderno de referências que carrego sempre. Cada projeto tem uma inspiração fora do briefing — só é preciso estar aberta pra vê-la."}]}]}
    ]
  }$doc$::jsonb,
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
  'Textura de parede de concreto queimado com manchas naturais e tons quentes',
  ARRAY['referência','concreto queimado','processo','inspiração'],
  'Ana Laura Noronha',
  3,
  'Uma parede de concreto queimado no bairro inspirou toda a cozinha de um projeto. Registro visual do processo criativo.',
  ARRAY['inspiração projeto','concreto queimado','referência visual','processo criativo'],
  true,
  now() - interval '12 days',
  true
) on conflict (slug) do nothing;


-- ------------------------------------------------------------
-- POST 19 — Cadeira escandinava
-- ------------------------------------------------------------
insert into public.articles (
  slug, category, title, subtitle, excerpt, content,
  cover_image, cover_alt, tags, author, reading_time_minutes,
  seo_meta_description, seo_keywords,
  is_published, published_at, is_featured
) values (
  'cadeira-que-muda-tudo-design-escandinavo',
  'sketch',
  'A cadeira que muda tudo',
  'Por que sempre volto para o design escandinavo — mesmo em projetos que pediam outra estética.',
  'Toda vez que fico bloqueada em um projeto, começo pelo desenho da cadeira. Algo nesse design resolve.',
  $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Tenho um hábito estranho: quando fico bloqueada em um projeto de interiores, começo pelo desenho da cadeira. Uma cadeira específica, geralmente com influência escandinava — pés de madeira clara, encosto orgânico, sem detalhe demais. Alva Aalto, Hans Wegner, Finn Juhl. Ou releituras nacionais deles."}]},
      {"type":"paragraph","content":[{"type":"text","text":"E toda vez a cadeira resolve. Não porque a cliente vai comprar essa cadeira específica — geralmente não vai. Mas porque a cadeira estabelece a régua. Se a cadeira coube, o resto tem que caber com ela."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"Design escandinavo não envelhece. Foi essa a única lição que precisava aprender no primeiro ano de estudo."}]}]},
      {"type":"paragraph","content":[{"type":"text","text":"O escandinavo tem essa coisa: parece que nunca vai sair de moda porque nunca foi moda no sentido pop. É essencial. É funcional. É belo por consequência, não por tentativa. Cada linha tem função — sustentar peso, receber costas, distribuir tensão. E é justamente aí que ele fica bonito."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Uso esses móveis como \"tônica\" do projeto. Coloco um representante em cada ambiente e organizo o resto ao redor. Uma poltrona no canto de leitura. Uma mesa lateral. Uma luminária de piso. Cada uma dessas peças puxa toda a paleta pra um lugar mais atemporal."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Mesmo em projeto que pedia estética diferente — um cliente queria \"boho\", outro queria \"industrial\" — sempre encaixo um item escandinavo. E funciona porque escandinavo dialoga com quase tudo. É a estética que se relaciona sem impor."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você quer testar em casa: adicione um item escandinavo ao seu ambiente atual. Só um. Uma luminária de piso, uma cadeira decorativa, uma mesa lateral. Observe como ele reorganiza a leitura do resto."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Uma observação do processo, sem receita. Ficou registrado aqui pra não esquecer."}]}]}
    ]
  }$doc$::jsonb,
  'https://images.unsplash.com/photo-1550226891-ef816aed4a98?auto=format&fit=crop&w=1600&q=80',
  'Cadeira de design escandinavo com estrutura de madeira clara e assento em couro',
  ARRAY['design escandinavo','mobiliário','processo','estética'],
  'Ana Laura Noronha',
  3,
  'Por que sempre volto para o design escandinavo em projetos, mesmo os que pediam outra estética. Observação do processo criativo.',
  ARRAY['design escandinavo','móveis atemporais','cadeira design','estética escandinava'],
  true,
  now() - interval '22 days',
  false
) on conflict (slug) do nothing;


-- ------------------------------------------------------------
-- POST 20 — Rodapé embutido
-- ------------------------------------------------------------
insert into public.articles (
  slug, category, title, subtitle, excerpt, content,
  cover_image, cover_alt, tags, author, reading_time_minutes,
  seo_meta_description, seo_keywords,
  is_published, published_at, is_featured
) values (
  'detalhe-invisivel-rodape-embutido',
  'sketch',
  'Detalhe invisível',
  'Por que o rodapé embutido é minha assinatura em quase todo projeto.',
  'Ninguém percebe conscientemente que existe. Mas todos sentem quando não tem.',
  $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Existe um detalhe construtivo que uso em quase todo projeto residencial e que quase ninguém percebe conscientemente: o rodapé embutido. Aquele rodapé que fica alinhado com a parede, sem sobressair, formando um único plano contínuo."}]},
      {"type":"paragraph","content":[{"type":"text","text":"O olho não vê o detalhe. Vê o resultado. E o resultado é que a parede parece mais alta, o piso parece mais amplo, o ambiente parece mais organizado."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"O que faz um projeto parecer feito por profissional não é o que se vê — é o que não se vê."}]}]},
      {"type":"paragraph","content":[{"type":"text","text":"O rodapé tradicional (aquele de 7-10 cm que fica saltando da parede) foi criado por razão prática: proteger a base da parede de mancha e batida de móvel. Ele funciona. Mas ele também recorta o ambiente visualmente — cria uma linha horizontal contínua que desce o pé-direito e endurece a leitura."}]},
      {"type":"paragraph","content":[{"type":"text","text":"O rodapé embutido resolve as duas coisas. Protege a parede (é o mesmo material do rodapé tradicional, só recuado pra dentro da parede em vez de sobresaindo dela) e mantém a leitura contínua do plano."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Custa 10-15% a mais que rodapé tradicional. Exige gesseiro que sabe fazer o recorte, ou obra que preveja o detalhe desde a alvenaria. Não pode ser adicionado depois — precisa estar no projeto."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Mas quando fica pronto, é o detalhe que separa \"casa comum\" de \"casa que parece de projeto\". Sem gritar. Sem chamar atenção. Só existindo bem."}]},
      {"type":"paragraph","content":[{"type":"text","text":"E é isso que eu procuro em quase toda decisão de projeto: coisa que ninguém percebe, mas que todos sentem. É o que faz um projeto sustentável no tempo, sem envelhecer."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Observação registrada aqui porque é o tipo de detalhe que dificilmente aparece em briefing — mas define muito."}]}]}
    ]
  }$doc$::jsonb,
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80',
  'Detalhe de acabamento arquitetônico mostrando rodapé embutido em parede clara',
  ARRAY['detalhe construtivo','rodapé embutido','acabamento','projeto'],
  'Ana Laura Noronha',
  3,
  'Por que o rodapé embutido é a minha assinatura em quase todo projeto. Observação sobre o detalhe invisível que faz toda a diferença.',
  ARRAY['rodapé embutido','detalhe construtivo','projeto interior','acabamento premium'],
  true,
  now() - interval '32 days',
  false
) on conflict (slug) do nothing;
