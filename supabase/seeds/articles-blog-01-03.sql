-- ============================================================
-- SEED DE ARTIGOS — BLOCO 1/6
-- Blog: artigos 1, 2 e 3
-- Padrão editorial inspirado no site da Ângela Vollet
-- Autor: Ana Laura Noronha
--
-- IMPORTANTE: usa dollar-quoted strings ($doc$...$doc$) pro JSON
-- para evitar erros de escape.
-- ============================================================

-- ------------------------------------------------------------
-- ARTIGO 1 — Blog · DESTAQUE
-- "Quanto custa reformar uma casa?"
-- ------------------------------------------------------------
insert into public.articles (
  slug, category, title, subtitle, excerpt, content,
  cover_image, cover_alt, tags, author, reading_time_minutes,
  seo_meta_description, seo_keywords,
  is_published, published_at, is_featured
) values (
  'quanto-custa-reformar-uma-casa',
  'blog',
  'Quanto custa reformar uma casa? O que ninguém te conta sobre orçamento de obra',
  'Do metro quadrado à surpresa no final: entenda como um orçamento de reforma se forma de verdade — e por que 8 em cada 10 estouram o previsto.',
  'Se você está pensando em reformar e ouviu números diferentes para o mesmo projeto, saiba que isso é normal. O problema não é a variação — é o que ninguém te explicou antes de assinar.',
  $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Se você está pesquisando quanto custa reformar uma casa, provavelmente já ouviu respostas muito diferentes para o mesmo projeto. Um marceneiro te disse um valor, o pedreiro outro, o cunhado da vizinha te falou que o dele saiu por metade. E agora você está confuso — talvez até com medo de começar."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Eu entendo. Uma reforma é uma das decisões financeiras mais complexas que a maioria das pessoas toma. E o problema quase nunca é o valor — é a falta de clareza sobre o que compõe esse valor. Neste texto, quero te mostrar como um orçamento honesto se forma, quais são os itens invisíveis que engolem 20-30% do previsto, e o que você pode fazer para chegar no fim da obra sem susto."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Por que existe tanta variação nos orçamentos"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Cada profissional monta um orçamento a partir do que ele consegue enxergar do projeto. E aqui está o pulo do gato: quanto mais detalhado o projeto, mais preciso o orçamento. Quando você recebe três propostas com valores muito diferentes, o que está acontecendo é que cada um está orçando um projeto ligeiramente diferente na cabeça dele."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Um profissional pode considerar troca completa de piso, outro só nivelamento. Um pode incluir instalação elétrica nova, outro só ampliação de tomadas. Isso não é má-fé — é interpretação. E é exatamente por isso que a fase de projeto executivo existe: para todo mundo estar orçando a mesma coisa."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Os 5 blocos de custo que existem em toda reforma"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Independente do porte, todo orçamento de reforma se divide em cinco grandes blocos. Se algum deles estiver ausente da sua proposta, desconfie:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Demolição e preparação:"},{"type":"text","text":" remoção do que existe, limpeza, descarte de entulho. Costuma ser 5-8% do total, mas em reformas de imóveis antigos pode chegar a 15%."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Infraestrutura oculta:"},{"type":"text","text":" hidráulica, elétrica, forro, alvenaria. É o que ninguém vê depois da obra pronta, mas responde por 25-40% do custo total."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Acabamentos:"},{"type":"text","text":" pisos, revestimentos, tintas, louças, metais. A parte que você vê. Onde 90% das pessoas focam — e onde é mais fácil errar para mais ou para menos."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Marcenaria e mobiliário sob medida:"},{"type":"text","text":" armários, painéis, portas. Costuma pesar 15-25% em residências. Quando bem projetado, evita o retrabalho mais caro que existe: derrubar uma marcenaria feita errada."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Gestão e imprevistos:"},{"type":"text","text":" honorários do responsável técnico, ART, taxas, e o mais importante — a reserva para o inevitável. Sempre orçar 10-15% além do previsto. Sempre."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Faixas de investimento por metro quadrado (2026)"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Números são referências, não regras. Cada obra é única. Mas para você ter um chão sob os pés, essas são as faixas que uso como ponto de partida com meus clientes:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Reforma padrão médio:"},{"type":"text","text":" R$ 1.800 a R$ 2.800 por m². Acabamentos comerciais bons, marcenaria estruturada, projeto adequado."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Reforma padrão alto:"},{"type":"text","text":" R$ 2.800 a R$ 4.500 por m². Acabamentos importados ou premium nacionais, marcenaria em escala industrial, projetos executivos detalhados."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Reforma alto luxo:"},{"type":"text","text":" de R$ 4.500 por m² para cima. Peças importadas, marcenaria autoral, curadoria completa, gestão dedicada."}]}]}
      ]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"O metro quadrado sozinho não diz nada. Uma cozinha de 8 m² custa mais que um quarto de 15 m², porque cada ambiente tem sua própria complexidade."}]}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Os cinco itens invisíveis que engolem o orçamento"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Depois de acompanhar dezenas de obras, aprendi que os estouros de orçamento quase nunca vêm de onde as pessoas esperam. Não é o mármore que estraga a conta — é a soma dos pequenos:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Frete e taxa de instalação"},{"type":"text","text":" de louças, metais e mobiliário sob medida. Ninguém soma na hora da escolha."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Adaptações elétricas de eletrodomésticos."},{"type":"text","text":" Aquela cooktop nova precisa de 220V; a máquina de lavar louça de saída específica. Cada uma custa."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Impermeabilização de áreas úmidas."},{"type":"text","text":" Muitas propostas cortam esse item pra parecerem competitivas. Se cair, você paga o dobro depois."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Descarte de entulho e limpeza final."},{"type":"text","text":" Uma obra média gera duas caçambas de entulho. Custam entre R$ 400 e R$ 800 cada uma."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Iluminação especial e automação."},{"type":"text","text":" Trilhos, spots dimerizáveis, cortinas motorizadas — coisas que a gente decide no meio do caminho e vira aditivo."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Como pedir um orçamento que faça sentido"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você quer receber propostas realmente comparáveis, precisa dar aos profissionais o mesmo ponto de partida. Aqui está o que eu recomendo:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Contrate um projeto executivo antes de pedir orçamento de execução. Sem isso, você está pedindo achismo."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Especifique os materiais e as marcas — nem que seja de referência. \"Piso porcelanato retificado 60x60\" custa metade de \"porcelanato importado premium\"."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Peça o orçamento discriminado por ambiente, não em bloco único. É a única forma de comparar propostas linha a linha."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Estabeleça cronograma físico-financeiro. Quem começa a obra sem cronograma, começa sem freio."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"A pergunta que você deveria fazer"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Não é \"quanto custa reformar minha casa\". É \"quanto custa reformar do jeito que eu preciso, com o padrão que eu quero, no prazo que faz sentido pra minha vida\". Essas três variáveis mudam tudo. E é aí que um projeto integrado — com engenheira, projetista e gestão de obra na mesma mão — economiza o que orçamento nenhum consegue prever: retrabalho."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você está começando a planejar sua reforma e quer clareza antes de contratar, converse comigo. Faço uma proposta transparente, com escopo detalhado, e você sabe exatamente onde cada centavo vai."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto tem caráter informativo. Os valores mencionados são referências médias de mercado em 2026 e podem variar conforme região, complexidade e época. Sempre solicite orçamento formal com escopo específico."}]}]}
    ]
  }$doc$::jsonb,
  '/img/artigos/quanto-custa-reformar-casa.jpg',
  'Planta arquitetônica sobre mesa de madeira ao lado de calculadora e amostras de acabamento',
  ARRAY['reforma','orçamento','planejamento','engenharia'],
  'Ana Laura Noronha',
  8,
  'Descubra como um orçamento honesto de reforma é montado, os 5 blocos de custo essenciais e os 5 itens invisíveis que engolem 20-30% do previsto.',
  ARRAY['quanto custa reformar','orçamento reforma','preço reforma casa','custo obra residencial'],
  true,
  now() - interval '3 days',
  true
) on conflict (slug) do nothing;


-- ------------------------------------------------------------
-- ARTIGO 2 — Blog
-- "Como escolher um projetista sem se arrepender"
-- ------------------------------------------------------------
insert into public.articles (
  slug, category, title, subtitle, excerpt, content,
  cover_image, cover_alt, tags, author, reading_time_minutes,
  seo_meta_description, seo_keywords,
  is_published, published_at, is_featured
) values (
  'como-escolher-projetista-sem-se-arrepender',
  'blog',
  'Como escolher um projetista sem se arrepender depois — 7 sinais de alerta',
  'Antes de assinar o primeiro contrato, entenda o que separa um bom profissional de um custo caro.',
  'Escolher a pessoa que vai desenhar o seu projeto é uma das decisões mais importantes de qualquer obra. E também uma das mais difíceis. Aqui vão os sinais que uso para reconhecer quem faz bem — e quem só parece.',
  $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"A pessoa que vai desenhar sua casa vai passar meses convivendo com você — ouvindo o que você sonha, o que te incomoda, o que você não sabe nem como descrever. Se essa relação começar torta, tudo depois fica mais difícil. Se começar certa, o projeto flui e a obra também."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Depois de anos entregando projetos e resgatando obras que foram mal iniciadas, aprendi a reconhecer alguns sinais logo nas primeiras conversas. Não são regras rígidas — são intuições que costumam acertar. Quero dividir com você."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Sinal 1: quem pergunta pouco, entrega pouco"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Na primeira reunião, quem faz mais perguntas é você ou o profissional? Se ele começa mostrando portfólio antes de entender como você vive, é um alerta. Um bom projetista quer saber a que horas você acorda, se você cozinha muito ou pouco, quantas pessoas moram na casa, se você recebe visitas, se dorme com a porta aberta. Tudo isso influencia o projeto."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se a primeira reunião durou 30 minutos e você já saiu contratada, provavelmente vai ter um projeto de manual — bonito, mas não seu."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Sinal 2: preço redondo demais"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Um orçamento de projeto que vem em número redondo (R$ 5.000, R$ 10.000), sem escopo detalhado, é sinal de precificação por chute. E chute costuma virar aditivo. Um profissional que trabalha certo te entrega proposta com o que está incluso: quantas plantas, quantas revisões, quantas visitas técnicas, o que é executivo e o que não é."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Sinal 3: promessa de prazo muito curto"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Um projeto executivo residencial completo leva, em média, de 60 a 90 dias. Quem promete entregar em duas semanas está fazendo layout, não projeto. E layout você derruba na primeira revisão — porque não tem detalhamento, não tem compatibilização, não tem executivo."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Sinal 4: não pergunta seu orçamento"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Parece óbvio, mas acontece muito: o profissional entrega um projeto lindo, você se apaixona, e na hora do orçamento de execução descobre que é o dobro do que você tem. Um bom projetista pergunta seu orçamento no início e projeta dentro dele. Não subir a régua sem você saber é ética profissional."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Sinal 5: portfólio genérico ou repetitivo"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se todos os projetos do portfólio parecem do mesmo cliente — mesma paleta, mesmo estilo, mesmos móveis — o profissional projeta a estética dele, não a sua. Bom projeto tem cara do cliente, não do escritório. Peça para ver 3 projetos diferentes e observe: cada um deveria contar uma história distinta."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Sinal 6: não fala sobre execução"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Projeto que não pensa em como será construído gera projeto lindo no papel e caro na obra. Um profissional experiente conhece as limitações práticas: qual altura de forro é possível, qual estrutura suporta o quê, como um encanamento se resolve. Se na conversa não aparecem essas preocupações, provavelmente vai aparecer no dia da obra."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Sinal 7: comunicação difícil desde o começo"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se demora dois dias para responder uma pergunta simples no WhatsApp, cancela reuniões, chega atrasado — durante a fase de proposta, quando está tentando te conquistar — imagina depois de assinado. Comunicação difícil no começo é comunicação impossível no meio da obra. Confie no que você está sentindo."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que perguntar antes de fechar"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você quer levar uma checklist para a primeira reunião, essas cinco perguntas costumam separar quem trabalha bem de quem vende bem:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"O que está incluso no seu escopo? (revisões, visitas, executivo, ART)"}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Como funciona a etapa de revisão? Quantas rodadas incluem?"}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Você acompanha a execução ou só entrega o projeto?"}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Como você lida com mudanças de escopo no meio?"}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Posso conversar com clientes anteriores?"}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O sinal mais importante é o que você sente"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Todo o resto pode estar impecável no papel. Mas se depois da primeira conversa você saiu com uma sensação estranha, ouça isso. Uma reforma dura meses. Uma casa dura décadas. A pessoa que vai desenhar precisa ser alguém em quem você confia — não só tecnicamente, mas humanamente."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você está começando essa busca agora e quer conversar comigo sem compromisso, é só chamar. Explico como trabalho, escuto seu projeto, e você decide com calma."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto é orientação geral. Cada relação profissional é única — use os sinais como referência, não como veredicto."}]}]}
    ]
  }$doc$::jsonb,
  '/img/artigos/como-escolher-projetista.jpg',
  'Duas pessoas conversando à mesa com plantas arquitetônicas e caderno de anotações',
  ARRAY['contratação','projetista','engenharia civil','planejamento'],
  'Ana Laura Noronha',
  7,
  'Antes de contratar um projetista, saiba os 7 sinais que separam profissionais éticos de vendedores. Guia prático de Ana Laura Noronha.',
  ARRAY['como escolher projetista','contratar arquiteto','contratar engenheiro','projeto arquitetônico'],
  true,
  now() - interval '10 days',
  false
) on conflict (slug) do nothing;


-- ------------------------------------------------------------
-- ARTIGO 3 — Blog
-- "Marcenaria sob medida vs móveis prontos"
-- ------------------------------------------------------------
insert into public.articles (
  slug, category, title, subtitle, excerpt, content,
  cover_image, cover_alt, tags, author, reading_time_minutes,
  seo_meta_description, seo_keywords,
  is_published, published_at, is_featured
) values (
  'marcenaria-sob-medida-vale-a-pena',
  'blog',
  'Marcenaria sob medida vale a pena? Comparativo honesto com móveis prontos',
  'Um estudo real de custo, prazo e durabilidade — para você decidir com informação, não com achismo.',
  'Se você está entre gastar em marcenaria sob medida ou comprar móveis prontos, provavelmente já ouviu opiniões extremas dos dois lados. Aqui vai o comparativo que faltava — com números, não com marketing.',
  $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"A pergunta chega quase toda semana no meu WhatsApp: \"Ana, vale mesmo a pena investir em marcenaria sob medida ou compenso com móveis prontos?\" A resposta honesta é: depende. Mas o \"depende\" precisa vir com números concretos, senão vira desculpa."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Neste texto, quero te mostrar as três variáveis que decidem essa conta — custo real por metro linear, prazo de vida útil, e o que raramente entra no cálculo: o custo do desperdício de espaço."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O custo real, não o preço de vitrine"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Vou dar um exemplo real. Cliente minha queria uma cozinha de 4 metros lineares. Fez dois orçamentos:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Modular de grande marca:"},{"type":"text","text":" R$ 18.000. Prazo 30 dias. Padrão de acabamento MDF branco."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Sob medida com marceneiro local:"},{"type":"text","text":" R$ 26.000. Prazo 45 dias. MDF nogal amêndoa, ferragens Blum, puxador embutido, ilha com bancada em quartzo."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Diferença de R$ 8.000 — 44% a mais. Parece muito. Mas ela fez a conta que ninguém faz: o modular ocupava só 78% do espaço disponível (porque vinha em módulos padrão de 30, 40, 60cm). Sobrou uma faixa de 24 cm de cada lado que virou \"cantinho perdido\". O sob medida ocupou 100% do espaço, ganhou 3 gavetas extras, e a bancada é 40cm mais longa. Aquele espaço \"perdido\" custaria mais R$ 4.000 se ela tentasse resolver com módulos avulsos depois."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Custo real do modular ajustado: R$ 22.000. Diferença real: R$ 4.000. Ou seja, 18% a mais — não 44%."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"A vida útil que ninguém compara"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Móveis modulares bons duram 8 a 12 anos com uso doméstico. Marcenaria sob medida bem feita dura 20 a 30 anos. Não porque o material é muito diferente — quase todos usam MDF do mesmo fornecedor — mas por três motivos práticos:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Ferragens."},{"type":"text","text":" Módulos usam ferragens de custo controlado (60-80 mil ciclos). Sob medida bem contratada usa Blum ou Hettich (200 mil ciclos). É a diferença entre gavetas que travam em 5 anos e gavetas que continuam macias em 20."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Encaixes e reforços."},{"type":"text","text":" Módulos precisam ser desmontáveis para envio, então sacrificam rigidez. Sob medida é instalado inteiro, com reforços onde precisa."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Acabamento de borda."},{"type":"text","text":" Modulares usam fita de borda mais fina (0,45mm). Marcenarias premium usam PVC 2mm com colagem laser. Diferença invisível no dia da entrega, gigante em 3 anos."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Quando modular é a decisão certa"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Sob medida não é sempre a resposta certa. Existem casos em que modular faz mais sentido:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Você mora de aluguel ou pretende mudar em 3-5 anos. Investimento não se paga."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Ambientes com paredes retas e sem elementos estruturais irregulares. Modular encaixa bem em geometrias simples."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Móveis de curta permanência — quarto de bebê que vai virar quarto de criança em 5 anos, por exemplo."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Quando sob medida é sem dúvida a escolha"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se seu ambiente tem qualquer uma dessas características, sob medida vai se pagar sozinho:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Paredes tortas, colunas embutidas, vigas rebaixadas, janelas irregulares."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Necessidade de aproveitar altura (ex.: armários até o teto de 2,80m — modular padrão para em 2,10m)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Design integrado com o projeto — puxadores embutidos, marcenaria alinhada com forro e revestimentos."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Cozinha ou área de serviço, onde durabilidade importa mais que qualquer outro ambiente da casa."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O terceiro caminho que quase ninguém considera"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Existe uma opção intermediária que raramente é discutida: modular estruturado com peças sob medida pontuais. Você pega um sistema modular bom e complementa com peças de encerramento (nichos, revestimentos de coluna, prateleiras específicas) feitas pelo marceneiro. Fica 15-20% acima do modular puro, mas resolve o desperdício de espaço."}]},
      {"type":"paragraph","content":[{"type":"text","text":"É uma solução ótima para quem quer investir bem sem pagar o preço integral do full sob medida. Mas exige um projetista fazendo a compatibilização — porque montar modular com peça avulsa sem projeto vira Frankstein."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"A pergunta que decide"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você pretende morar ou usar esse ambiente por 10 anos ou mais, faça sob medida. O custo por ano de uso é menor que qualquer alternativa. Se você tem prazo mais curto, faça modular bem escolhido e economize."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se está em dúvida sobre qual caminho faz sentido pra sua obra, vamos conversar. Faço uma análise honesta do seu caso e mostro os números da sua situação específica."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Valores citados são referências de mercado em 2026, com variação regional. Sempre confirme com orçamento formal para sua obra específica."}]}]}
    ]
  }$doc$::jsonb,
  '/img/artigos/marcenaria-sob-medida-vs-pronto.jpg',
  'Detalhe de marcenaria sob medida em cozinha moderna com puxadores embutidos e acabamento nogal',
  ARRAY['marcenaria','móveis planejados','comparativo','custo-benefício'],
  'Ana Laura Noronha',
  8,
  'Vale a pena investir em marcenaria sob medida ou móveis prontos? Comparativo honesto com números reais de custo, durabilidade e aproveitamento de espaço.',
  ARRAY['marcenaria sob medida','móveis planejados','marcenaria vs modular','custo marcenaria'],
  true,
  now() - interval '18 days',
  false
) on conflict (slug) do nothing;
