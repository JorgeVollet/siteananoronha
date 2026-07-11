-- ============================================================
-- SEED DE ARTIGOS — BLOCO 2/6
-- Blog: artigos 4, 5, 6, 7 e 8
-- ============================================================

-- ------------------------------------------------------------
-- ARTIGO 4 — Reforma vs. Construir do zero
-- ------------------------------------------------------------
insert into public.articles (
  slug, category, title, subtitle, excerpt, content,
  cover_image, cover_alt, tags, author, reading_time_minutes,
  seo_meta_description, seo_keywords,
  is_published, published_at, is_featured
) values (
  'reforma-ou-construir-do-zero',
  'blog',
  'Reforma ou construir do zero: qual a decisão certa pro seu momento',
  'Nem sempre reformar é mais barato. Nem sempre construir é a resposta. Aqui vão os critérios reais para decidir.',
  'A pergunta parece simples, mas envolve variáveis que raramente aparecem no primeiro cálculo. Prazo, valor de mercado, potencial de valorização — cada um pesa diferente na sua realidade.',
  $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Você tem um terreno ou uma casa que precisa ser mexida. A pergunta chega quase sempre no mesmo formato: \"Ana, vale mais a pena reformar essa casa ou derrubar tudo e construir do zero?\" A resposta honesta é que depende — mas o que decide não é o gosto pessoal. É uma conta específica que quero te ajudar a fazer."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Neste texto, quero te mostrar os quatro critérios que uso quando um cliente chega com essa dúvida. Nenhum deles é sobre estilo. Todos são sobre viabilidade — técnica, financeira e emocional."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Critério 1: o que a estrutura ainda aguenta"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Antes de qualquer decisão estética, tem uma pergunta técnica que precisa de resposta: como está a estrutura? Fundação, alvenaria portante, cobertura, laje. Se algum desses elementos tem comprometimento sério, reforma pode custar mais do que construção nova."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Já vi casos em que o cliente queria \"só uma reforma\" e, ao abrir uma parede, descobriu-se rachadura estrutural que exigia reforço de fundação. O que era pra ser R$ 80 mil virou R$ 220 mil. Se ele tivesse feito laudo estrutural antes, teria escolhido construir do zero — mais barato E mais previsível."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Critério 2: quanto do que existe você quer manter"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você quer mudar layout, aumentar pé-direito, mover paredes, refazer instalações — a reforma vira, na prática, uma construção com paredes velhas. E paredes velhas custam pra manter."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Uma regra prática que uso: se você vai preservar menos de 40% da estrutura original, construir do zero costuma sair mais barato e mais rápido. Se vai preservar mais de 60%, reformar quase sempre vence. Entre esses dois, é análise caso a caso."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Critério 3: valor de mercado do imóvel"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Esse é o critério que ninguém quer ouvir mas todo profissional honesto vai te perguntar: quanto vale seu imóvel hoje, e quanto vai valer depois de reformado?"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você tem uma casa avaliada em R$ 400 mil e vai gastar R$ 300 mil de reforma, o imóvel dificilmente valerá R$ 700 mil no mercado. Vai valer talvez R$ 550 mil — porque o teto de valorização é o do bairro, não o do seu investimento."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Isso não significa que não valha a pena reformar. Significa que você precisa entrar sabendo. Se é sua casa dos sonhos e você vai morar 20 anos nela, o valor de mercado importa menos. Se é investimento, ele decide tudo."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Critério 4: prazo e paciência"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Construção do zero tem prazo mais previsível — começa e termina em cronograma definido. Reforma tem surpresa. Sempre. Um pedreiro descobre encanamento diferente do que esperava, uma laje precisa ser reforçada, um projeto elétrico não bate com o que existia."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você tem prazo apertado (mudar em 4 meses, casamento marcado, contrato de aluguel vencendo), construção geralmente entrega antes. Reforma bem gerenciada dura 3-6 meses; mal gerenciada, um ano."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"A conta rápida que ajuda"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se quiser fazer uma estimativa preliminar antes de contratar um profissional, use esses valores de referência (2026):"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Reforma:"},{"type":"text","text":" R$ 1.800 a R$ 3.500 por m². Depende do que vai ser mexido."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Construção do zero:"},{"type":"text","text":" R$ 2.400 a R$ 4.200 por m². Terreno não incluso."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Demolição + construção:"},{"type":"text","text":" adicione R$ 200 a R$ 400 por m² se tiver que derrubar."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Multiplique pela área que você tem. Compare com o valor de venda do imóvel e do bairro. A resposta costuma aparecer."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que eu recomendo antes de decidir"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você está entre reformar e construir, faça esses três passos antes de fechar qualquer coisa:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Contrate um laudo estrutural básico. Custa entre R$ 800 e R$ 2.500 e evita surpresa de dezenas de milhares."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Faça duas simulações de custo — uma de reforma completa, outra de demolição + construção nova. Se possível com o mesmo profissional, pra comparar critérios iguais."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Consulte um corretor de confiança sobre o teto de valorização do bairro. Se você vai gastar mais do que o mercado paga, saiba disso antes."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Se está nesse momento e quer conversar sem compromisso, faço essa análise inicial com meus clientes. Levo em conta seu imóvel, seu prazo, seu objetivo — e mostro qual caminho tem mais chance de dar certo pra você."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto é orientação geral. Valores citados são referências de mercado em 2026 e variam por região. Sempre consulte laudo técnico específico para seu imóvel."}]}]}
    ]
  }$doc$::jsonb,
  'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1600&q=80',
  'Casa em processo de reforma com andaimes e materiais de construção',
  ARRAY['reforma','construção','planejamento','decisão'],
  'Ana Laura Noronha',
  9,
  'Reformar ou construir do zero? Os 4 critérios técnicos que decidem, valores por m² atualizados e o passo a passo antes de contratar.',
  ARRAY['reforma ou construir','reforma vs construção','construir do zero','custo reforma casa'],
  true,
  now() - interval '25 days',
  false
) on conflict (slug) do nothing;


-- ------------------------------------------------------------
-- ARTIGO 5 — Cronograma de obra
-- ------------------------------------------------------------
insert into public.articles (
  slug, category, title, subtitle, excerpt, content,
  cover_image, cover_alt, tags, author, reading_time_minutes,
  seo_meta_description, seo_keywords,
  is_published, published_at, is_featured
) values (
  'cronograma-de-obra-por-que-atrasam',
  'blog',
  'Cronograma de obra: por que 90% atrasam (e como evitar isso)',
  'Atraso não é destino — é sintoma. Entenda o que realmente causa e o que você pode controlar antes da primeira picareta.',
  'Se você acha que atraso de obra é só má sorte, saiba que 90% dos atrasos têm causa previsível — e a maioria delas acontece antes da obra começar.',
  $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Se você já reformou ou conhece alguém que reformou, provavelmente ouviu a mesma história: \"o cronograma era de 90 dias, terminou em 180\". A frase virou piada, mas por trás dela existe uma verdade dura: atraso de obra não é bug, é feature. Do jeito que a maioria das obras são planejadas, atrasar é o desfecho lógico."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Quero te mostrar as três causas reais de atraso, quando cada uma acontece, e o que você pode fazer para diminuir muito o risco na sua obra."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Causa 1: projeto incompleto"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A primeira causa é quase sempre a mesma: começar sem projeto executivo. Layout bonito, moodboard lindo, plantas iniciais — mas sem detalhamento técnico. Aí no meio da obra a decisão é tomada in loco, com pedreiro no pé, e cada decisão custa dias."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Projeto executivo bom tem detalhamento de pontos elétricos, hidráulicos, alturas de forro, especificações de marcenaria, layouts de porcelanato. Quando o pedreiro chega, ele executa. Quando não tem, ele espera. E cada espera custa dinheiro."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Causa 2: mudança de escopo no meio"}]},
      {"type":"paragraph","content":[{"type":"text","text":"O segundo motivo mais comum é a mudança durante a execução. \"Ah, gostei mais desse revestimento\". \"Vamos mudar a posição da pia\". \"Achei um piso melhor\". Cada uma dessas parece pequena, mas dispara efeito dominó: recomprar material, redimensionar, refazer, esperar chegar, esperar secar."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Mudanças no papel custam borracha. Mudanças na obra custam tempo real. Uma revisão pequena antes da compra do material custa duas semanas de aprovação. A mesma mudança depois da chegada do material custa dois meses."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Causa 3: falta de gestão do canteiro"}]},
      {"type":"paragraph","content":[{"type":"text","text":"O terceiro motivo é operacional: ninguém gerenciando. Você contrata o pedreiro, o marceneiro, o eletricista, o pintor — todos separados. E aí ninguém coordena. O eletricista quer fazer a fiação, mas o pedreiro ainda não terminou a alvenaria. O pintor chega, mas o gesseiro atrasou. Todo mundo esperando, e ninguém responsável."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Um bom gestor de obra faz o quê? Basicamente três coisas: prevê a sequência certa, cobra os prazos, e resolve conflito antes de virar problema. Sem isso, a obra vira quebra-cabeça sem instruções."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O cronograma que funciona de verdade"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Um cronograma sério tem essas quatro características. Se falta alguma, ele vai atrasar:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"É físico-financeiro."},{"type":"text","text":" Não é só \"quando termina\". É quanto custa em cada etapa, pra você não pagar de menos ou de mais no meio."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Tem marcos claros."},{"type":"text","text":" Fim da demolição, fim da estrutura, chegada dos móveis. Marcos são pontos de conferência — não deu certo? Ajusta antes de seguir."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Considera folga."},{"type":"text","text":" Bom cronograma tem 15-20% de folga entre etapas. Sem folga, o atraso de uma etapa contamina tudo."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"É revisado semanalmente."},{"type":"text","text":" Cronograma que fica no papel é história. Bom cronograma é atualizado toda semana com o status real."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Prazo real vs. prazo prometido"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Uma última reflexão. Muitos profissionais prometem prazo curto pra fechar contrato. Sabem que vão atrasar, mas prometem porque o cliente quer ouvir. Depois vem a desculpa (\"choveu\", \"faltou material\", \"trabalhador não veio\") e a obra rola."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Prefira quem te dá prazo realista com folga. Vai parecer que demora mais, mas vai terminar quando prometeu. E o preço final vai ser o combinado — não o combinado + aditivos + estresse."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você quer entender como faço o cronograma de obras que assumo, faço uma proposta inicial explicando cada etapa. Podemos conversar quando quiser."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto é orientação geral sobre cronograma. Cada obra tem particularidades — o cronograma real é feito depois do projeto executivo concluído."}]}]}
    ]
  }$doc$::jsonb,
  'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1600&q=80',
  'Prancheta com cronograma de obra e capacete de segurança sobre planta baixa',
  ARRAY['cronograma','gestão de obra','planejamento','prazo'],
  'Ana Laura Noronha',
  8,
  'Por que 90% das obras atrasam? As 3 causas reais, as 4 características de um cronograma que funciona e como escolher o profissional certo.',
  ARRAY['cronograma de obra','atraso obra','gestão de obra','prazo reforma'],
  true,
  now() - interval '35 days',
  false
) on conflict (slug) do nothing;


-- ------------------------------------------------------------
-- ARTIGO 6 — Contratei uma engenheira
-- ------------------------------------------------------------
insert into public.articles (
  slug, category, title, subtitle, excerpt, content,
  cover_image, cover_alt, tags, author, reading_time_minutes,
  seo_meta_description, seo_keywords,
  is_published, published_at, is_featured
) values (
  'contratei-uma-engenheira-o-que-muda',
  'blog',
  'Contratei uma engenheira: o que muda no meu projeto de interiores?',
  'A diferença entre projeto bonito e projeto que se sustenta na obra. Entenda o que a engenharia acrescenta.',
  'Muita gente contrata só o designer de interiores e depois descobre que a obra precisa de responsável técnico. Aqui vai o que muda quando engenharia e interiores estão na mesma mão.',
  $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Uma pergunta que ouço bastante: \"Ana, preciso mesmo de uma engenheira ou só um designer de interiores basta?\" Depende do escopo — mas quero te mostrar o que muda quando você tem engenharia no projeto, principalmente porque as respostas nem sempre são as óbvias."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Não vou tentar te vender engenharia. Vou te mostrar o que muda tecnicamente e o que muda no dia a dia da sua obra."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que designer de interiores faz (e faz bem)"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Antes de qualquer coisa: designer de interiores bom faz coisa maravilhosa. Curadoria de mobiliário, paleta de cores, iluminação, texturas, mistura de estilos. É a alma do projeto. Não é substituível por engenharia."}]},
      {"type":"paragraph","content":[{"type":"text","text":"O que designer não faz — e não é a função dele — é responder por questões estruturais, elétricas, hidráulicas, ART, projeto executivo aprovado em prefeitura. Isso é engenharia."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que muda com engenharia no time"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Vou listar o que MUDA na prática. Alguns são invisíveis pra quem tá começando, mas fazem toda a diferença no meio da obra:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Viabilidade estrutural das ideias."},{"type":"text","text":" Quer derrubar essa parede? Engenharia verifica se é portante. Quer aumentar o vão? Sabe se precisa de viga de reforço. Quer ilha na cozinha? Verifica se a laje aguenta o peso de granito + carga viva."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Projeto elétrico responsável."},{"type":"text","text":" Não é só definir onde vai a tomada. É calcular o quadro geral, dimensionar disjuntores, prever aumento futuro. E emitir ART — que é o que a seguradora exige se algo der errado."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Projeto hidráulico integrado."},{"type":"text","text":" Nova bancada de cozinha com ilha exige nova prumada. Chuveiro extra exige aquecedor maior. Engenharia calcula, dimensiona, valida."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Aprovação em condomínio ou prefeitura."},{"type":"text","text":" Alteração de fachada, ampliação, muro, laje. Tudo isso precisa de projeto assinado por engenheiro civil. Sem isso, você não legaliza e vai ter problema em venda/inventário depois."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Compatibilização de projetos."},{"type":"text","text":" Elétrico não bate com hidráulico? Marcenaria colide com viga? Engenharia costura tudo antes da obra começar. Sem isso, cada colisão vira retrabalho na obra."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Quando dá pra ir só de designer"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Nem toda reforma exige engenheiro. Se você vai fazer só:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Pintura, papel de parede, mobiliário novo."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Troca de piso sem mexer em contrapiso."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Marcenaria em ambientes existentes (sem mudar estrutura)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Iluminação simples aproveitando os pontos que já existem."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Para isso, designer de interiores basta. E vai fazer melhor do que engenheiro faria, porque é a especialidade dele."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Quando engenharia é imprescindível"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se sua reforma tem qualquer um destes elementos, você PRECISA de engenheiro no time:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Alteração de layout com movimentação de parede."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Novo ponto hidráulico ou aumento de carga elétrica."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Ampliação, edícula, laje adicional."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Alteração de fachada (mudança de janelas, muros, telhado)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Qualquer obra que precise de aprovação de prefeitura ou condomínio."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O modelo integrado — engenharia e interiores na mesma mão"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Meu jeito de trabalhar é engenharia + interiores integrados. Não é aleatório. É porque, quando cada um faz seu pedaço separado, a compatibilização vira problema seu — e cliente não é obrigado a ser compatibilizador de projeto."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Quando é um profissional só cuidando do técnico E do estético, cada decisão já nasce integrada. Você pediu ilha na cozinha? Já verifico laje, elétrica, hidráulica, e desenho a estética junto. Uma reunião só resolve o que reunião separada não resolveria em três."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você está começando um projeto e não sabe se precisa desse modelo integrado, converse comigo sem compromisso. Escuto seu escopo, te digo honestamente se precisa ou não, e você decide."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto orienta sobre quando cada especialidade é necessária. Cada projeto tem suas particularidades — sempre consulte um profissional para avaliação específica."}]}]}
    ]
  }$doc$::jsonb,
  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80',
  'Engenheira analisando plantas técnicas com capacete e caderno de anotações em canteiro de obra',
  ARRAY['engenharia civil','interiores','projeto integrado','contratação'],
  'Ana Laura Noronha',
  8,
  'O que muda quando você tem engenheira no projeto de interiores? Estrutura, elétrica, hidráulica e responsabilidade técnica — o que designer não faz.',
  ARRAY['engenheira interiores','engenheira arquiteto','engenharia projeto','ART obra'],
  true,
  now() - interval '45 days',
  false
) on conflict (slug) do nothing;


-- ------------------------------------------------------------
-- ARTIGO 7 — Reforma em apartamento
-- ------------------------------------------------------------
insert into public.articles (
  slug, category, title, subtitle, excerpt, content,
  cover_image, cover_alt, tags, author, reading_time_minutes,
  seo_meta_description, seo_keywords,
  is_published, published_at, is_featured
) values (
  'reforma-em-apartamento-o-que-saber',
  'blog',
  'Reforma em apartamento: 5 coisas que você precisa saber antes de começar',
  'Vizinhança, síndico, laje, entulho — o que separa uma reforma leve de uma dor de cabeça de meses.',
  'Reformar apartamento tem regras que casa não tem. E ignorar essas regras custa tempo, dinheiro e — em casos ruins — obra embargada. Aqui vai o que ninguém te avisa antes.',
  $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Se você mora em apartamento e está pensando em reformar, saiba que existem regras específicas que casa não tem. Não são detalhes — são pontos que, se ignorados, viram multa, embargo ou briga judicial com condomínio."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Depois de fazer várias reformas em prédios diferentes, vou compartilhar os cinco pontos que mais aparecem — e como resolver cada um antes de começar."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"1. A NBR 16280 é obrigatória"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A norma técnica brasileira NBR 16280 exige que qualquer reforma em condomínio residencial tenha responsável técnico (engenheiro ou arquiteto), projeto e ART/RRT. Isso não é opinião — é lei."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Na prática, o síndico é obrigado a exigir o documento antes de liberar a obra. Se ele não exigir e algo der errado (rachadura em vizinho, vazamento, incêndio), ele responde solidariamente. Por isso muitos síndicos são rigorosos — e com razão."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"2. Horário e ruído variam por convenção"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A maioria dos condomínios permite obra apenas em dias úteis, geralmente das 8h às 17h. Sábados são flexíveis (alguns permitem até 12h; outros não permitem). Domingos e feriados, quase nunca."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Isso muda seu cronograma. Se você contou com trabalho aos sábados e a convenção proíbe, sua obra pode alongar 20-30%. Peça a convenção antes de fechar cronograma com o pedreiro."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"3. Elevador de serviço tem limite"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Todo condomínio tem regras sobre uso de elevador de serviço para transportar material. Alguns exigem uso de proteção nas paredes, outros limitam volume, alguns cobram taxa por dia de obra."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Aqui vai um detalhe prático: se seu apartamento é em andar alto e o condomínio não tem elevador de serviço próprio (só o social + carga limitada), o custo de transporte de material sobe 30-40%. Isso raramente aparece no orçamento inicial."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"4. Nem toda parede pode cair"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Em apartamento, algumas paredes são estruturais (suportam carga). Derrubar sem laudo pode comprometer o edifício inteiro — literalmente."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Como saber? Só engenheiro pode confirmar, mas normalmente:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Paredes de fachada (as que fazem contorno externo) — quase sempre estruturais."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Paredes que dividem apartamentos vizinhos — sempre estruturais e não podem ser modificadas."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Paredes internas em bloco cerâmico ou drywall — geralmente podem sair, mas verifique."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Nunca confie no bom senso do pedreiro. Sempre no laudo do engenheiro. É a diferença entre reforma e tragédia."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"5. Descarte de entulho é sua responsabilidade"}]},
      {"type":"paragraph","content":[{"type":"text","text":"O condomínio não é obrigado a receber caçamba de entulho. Você precisa combinar com o síndico, agendar caminhão de retirada, e — em muitos casos — pagar diária de estacionamento pra caçamba na rua."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Uma obra média de apartamento gera 2 a 4 caçambas. Cada uma custa entre R$ 400 e R$ 800. E o descarte inadequado (deixar em terreno baldio, jogar na rua) é crime ambiental. Não é ameaça — é multa alta e boletim."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que fazer antes de começar"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você vai reformar apartamento, essa é a sequência que evita dor de cabeça:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Peça a convenção do condomínio ao síndico. Leia as regras de reforma."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Contrate engenheiro para projeto executivo e emissão de ART/RRT."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Apresente o projeto ao síndico com antecedência. Peça autorização por escrito."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Comunique os vizinhos diretos — cordialidade evita 90% das brigas."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Agende caçambas de entulho na sequência da obra, não no fim."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você tem um apartamento em vista e quer entender o que a legislação e a convenção exigem antes de começar, converse comigo. Faço essa análise inicial e evito surpresa depois."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto é informativo sobre reforma em apartamento. Regras específicas variam por condomínio e cidade. Sempre consulte a convenção e as leis municipais aplicáveis."}]}]}
    ]
  }$doc$::jsonb,
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
  'Vista de sala em apartamento moderno com iluminação natural e mobiliário integrado',
  ARRAY['apartamento','reforma','NBR 16280','condomínio'],
  'Ana Laura Noronha',
  7,
  'Reformar apartamento tem regras que casa não tem. NBR 16280, ART, convenção do condomínio e o que você precisa resolver antes de começar.',
  ARRAY['reforma apartamento','NBR 16280','ART reforma','regras reforma condomínio'],
  true,
  now() - interval '55 days',
  false
) on conflict (slug) do nothing;


-- ------------------------------------------------------------
-- ARTIGO 8 — Cozinha sem estourar orçamento
-- ------------------------------------------------------------
insert into public.articles (
  slug, category, title, subtitle, excerpt, content,
  cover_image, cover_alt, tags, author, reading_time_minutes,
  seo_meta_description, seo_keywords,
  is_published, published_at, is_featured
) values (
  'como-reformar-cozinha-sem-estourar-orcamento',
  'blog',
  'Como reformar a cozinha sem estourar o orçamento nem perder o estilo',
  'Cozinha é o ambiente mais caro por metro quadrado da casa. Aqui vão os cortes inteligentes e os investimentos que valem cada centavo.',
  'A cozinha concentra as decisões mais caras da reforma. Mas boa parte do custo pode ser reduzido sem sacrificar estética — desde que você saiba onde economizar e onde nunca cortar.',
  $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Cozinha é o ambiente mais caro da casa por metro quadrado. E também o mais fácil de estourar orçamento — porque cada escolha (bancada, marcenaria, torneiras, revestimento) tem faixa de preço enorme. Você pode gastar R$ 15 mil ou R$ 150 mil no mesmo layout."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Depois de projetar dezenas de cozinhas em faixas de investimento diferentes, aprendi que existe uma lógica clara sobre onde cortar e onde não cortar. Quero dividir com você."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que NUNCA cortar"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Alguns itens definem a experiência do dia a dia por 15-20 anos. Cortar aqui gera arrependimento diário:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Ferragens da marcenaria."},{"type":"text","text":" Blum ou Hettich fazem toda a diferença. A diferença entre uma ferragem básica e uma premium é de R$ 30 a R$ 60 por gaveta — mas dobra a vida útil do móvel."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Torneira e válvula da cuba."},{"type":"text","text":" Escolher torneira barata na cozinha é comprar duas em 5 anos. Deca ou Docol de linha média já resolve; abaixo disso, arrependimento certo."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Iluminação de bancada."},{"type":"text","text":" Cozinha bem iluminada dobra a sensação de tamanho e resolve problemas de sombra no fogão. Cortar aqui é escurecer a cozinha inteira."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Ventilação."},{"type":"text","text":" Coifa boa, exaustor bem dimensionado. Sem isso, a cozinha vira sauna e a marcenaria absorve gordura."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Onde dá pra economizar sem parecer que economizou"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Agora a parte boa. Existem itens onde a versão média ou até básica entrega quase o mesmo resultado da versão premium:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Revestimento de parede."},{"type":"text","text":" Porcelanato nacional bom (Portobello, Elizabeth) tem estética indistinguível de importados de R$ 400 por m². Economia de 40-60%."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Marcenaria em MDF vs. MDF revestido."},{"type":"text","text":" Se você vai usar melamínico (MDF com revestimento fenólico impresso), o padrão nacional atual está impressionante. Nogal, freijó, carvalho — indistinguível de folha natural, custa metade."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Eletrodomésticos que não aparecem."},{"type":"text","text":" Micro-ondas, forno elétrico, cooktop — se ficam embutidos e não ficam à mostra, marca não faz diferença. Escolha por especificação técnica, não por logo."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Piso."},{"type":"text","text":" Porcelanato retificado 60x60 nacional bom entrega excelente resultado. Piso importado só faz sentido se for peça central do projeto (mármore, pedra natural)."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O item que muda tudo: a bancada"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Bancada é o item que mais gera dúvida. Vou ser direta: se seu orçamento permite, quartzito ou porcelanato de espessura alta são os melhores em performance. Se não permite, silestone ou quartzo composto entregam resultado ótimo por 30-40% menos."}]},
      {"type":"paragraph","content":[{"type":"text","text":"O que NÃO recomendo: mármore branco (mancha), granito com veios (data o projeto), fórmica (custo-benefício ruim). Quartzito Statuario ou porcelanato Estatuário Neve são a versão \"cara linda que dura\"; silestone Calacatta é a versão \"parece cara e dura\"."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Faixas de investimento realistas"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Pra cozinha de 8-12 m², faixas honestas de investimento total (2026):"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Padrão econômico:"},{"type":"text","text":" R$ 25 mil a R$ 40 mil. Marcenaria melamínica boa, bancada silestone, eletrodomésticos linha branca boa."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Padrão médio:"},{"type":"text","text":" R$ 40 mil a R$ 70 mil. Marcenaria com detalhes autorais, bancada quartzo composto premium, coifa boa."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Padrão alto:"},{"type":"text","text":" R$ 70 mil a R$ 130 mil. Marcenaria autoral, ilha central, quartzito, eletrodomésticos premium embutidos."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O erro mais caro que vejo"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Comprar tudo separado. Cliente compra marcenaria com um fornecedor, bancada com outro, eletrodomésticos por conta, torneiras online. Cada compra parece uma economia. No final, cada peça tá 5-10% mais barata, mas ninguém compatibilizou nada."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Aí a bancada não bate com a marcenaria, a coifa não encaixa na altura do armário, a torneira é de acabamento diferente do puxador. Solução? Refazer. E aí a \"economia\" some no retrabalho."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Cozinha é o ambiente que mais se beneficia de projeto integrado. Se você quer investir bem sem gastar demais, converse comigo. Faço uma análise inicial e mostro onde tem espaço pra economizar sem sacrificar o resultado."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Valores mencionados são referências de mercado em 2026 e variam por região, complexidade e marcas escolhidas. Sempre confirme com orçamento formal para sua obra específica."}]}]}
    ]
  }$doc$::jsonb,
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
  'Cozinha moderna com marcenaria em tons de madeira e bancada em pedra clara',
  ARRAY['cozinha','reforma','marcenaria','orçamento'],
  'Ana Laura Noronha',
  9,
  'Onde economizar e onde nunca cortar na reforma de cozinha. Guia prático com valores 2026, comparativos e o erro mais caro que vejo repetir.',
  ARRAY['reforma cozinha','custo cozinha planejada','marcenaria cozinha','como economizar reforma'],
  true,
  now() - interval '65 days',
  false
) on conflict (slug) do nothing;
