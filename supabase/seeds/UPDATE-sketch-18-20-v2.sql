-- ============================================================
-- UPDATE v2 — Bloco E: Sketch 18-20 (REFORMULAÇÃO COMPLETA)
--
-- Formato NOVO: "conceitos de design" — reflexões sobre princípios
-- estéticos e técnicos que Ana defende, SEM vivências pessoais
-- fabricadas ("estava no bairro Bom Fim", "cliente disse", etc.)
--
-- Título e subtítulo também ajustados para o novo tom.
-- ============================================================

-- ------------------------------------------------------------
-- POST 18 — Textura → CONCEITO: concreto queimado
-- ------------------------------------------------------------
update public.articles
set
  title = 'Textura como projeto',
  subtitle = 'Por que o concreto queimado voltou a ser referência — e como aplicá-lo sem cair no clichê urbano.',
  excerpt = 'Uma reflexão sobre por que texturas naturais e imperfeitas ganharam espaço no design contemporâneo — e o que separa o uso maduro do uso decorativo.',
  content = $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Existe um material que reapareceu com força no design residencial contemporâneo: o concreto queimado. Não o industrial, cinza-frio, das galerias dos anos 90. Um outro concreto — queimado com técnica, aquecido no tom, envelhecido intencionalmente. Um concreto que parece ter sido esperado."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Quero registrar aqui por que esse retorno faz sentido, o que ele carrega como conceito, e como aplicá-lo em ambientes residenciais sem transformar a casa em galeria."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que o concreto queimado carrega"}]},
      {"type":"paragraph","content":[{"type":"text","text":"O concreto queimado é uma superfície que envelhece com dignidade. Diferente do porcelanato — que se protege contra o tempo — o concreto absorve o tempo. Ganha manchas, sub-tons, memória. É um material que aceita ser vivido."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"O que envelhece com dignidade custa menos, no longo prazo, do que o que precisa ser sustentado a ferro e fogo."}]}]},
      {"type":"paragraph","content":[{"type":"text","text":"Isso é conceito, não estética. Um cliente que aceita concreto queimado está aceitando uma filosofia — de que a marca do uso é parte do que faz a casa ficar bonita, não o que a estraga."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O erro comum: cinza-cimento cru"}]},
      {"type":"paragraph","content":[{"type":"text","text":"O uso amador do concreto queimado copia a paleta industrial — cinza chumbo puro, textura uniforme, aplicação em bloco. Fica frio. Fica urbano. Fica \"loft\" de década passada."}]},
      {"type":"paragraph","content":[{"type":"text","text":"O uso maduro trabalha em variação térmica. Base cinza-quente com sub-tons ocre, aplicação parcial (só em um plano, não em todos), combinação com madeira macia. O concreto vira textura entre outras texturas — não protagonista."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Aplicações que costumo defender"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se um projeto pede concreto queimado, defendo três aplicações principais:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Bancada de cozinha em porcelanato imitando concreto queimado."},{"type":"text","text":" Não é o material real — é reprodução técnica de alta qualidade. Traz a estética sem a manutenção."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Painel único de parede em concreto verdadeiro."},{"type":"text","text":" Trabalhado com queima intencional, aceitando manchas naturais. Um plano, não a sala inteira."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Piso em cimento queimado polido."},{"type":"text","text":" Aplicação clássica, ainda válida quando o ambiente permite. Combinação natural com madeira e tecidos macios."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que faz o material funcionar"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Concreto queimado precisa de três companhias para não parecer galpão. Iluminação em spot direcionado (para revelar textura), madeira em pelo menos um mobiliário próximo (para aquecer a paleta), e tecido macio em um elemento (para quebrar a dureza)."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Sem essas três companhias, o concreto vira frio. Com elas, vira convite."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Anotação sobre um material que carrega mais conceito do que se vê à primeira vista. Quando bem aplicado, envelhece com a casa em vez de precisar ser substituído."}]}]}
    ]
  }$doc$::jsonb,
  cover_alt = 'Textura de parede em concreto queimado com variação térmica e manchas naturais quentes'
where slug = 'textura-que-virou-projeto-parede-concreto';


-- ------------------------------------------------------------
-- POST 19 — Cadeira → CONCEITO: design escandinavo
-- ------------------------------------------------------------
update public.articles
set
  title = 'A régua da cadeira escandinava',
  subtitle = 'Por que o design escandinavo continua sendo referência atemporal — e como usá-lo como ponto de partida em qualquer projeto.',
  excerpt = 'Um princípio de projeto: começar pela peça mais atemporal do ambiente. Uma reflexão sobre por que o design escandinavo é essa peça em quase todo projeto residencial.',
  content = $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Existe um princípio de projeto que defendo em quase toda residência: começar pela peça mais atemporal do ambiente e organizar o resto ao redor dela. Em interiores, essa peça costuma ser uma cadeira ou poltrona de influência escandinava — Alvar Aalto, Hans Wegner, Finn Juhl, ou releituras nacionais desses mestres."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Quero registrar por que essa peça específica funciona como \"régua\" — mesmo em projetos que pediam estética completamente diferente."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que faz o escandinavo ser atemporal"}]},
      {"type":"paragraph","content":[{"type":"text","text":"O design escandinavo tem uma característica rara: parece que nunca vai sair de moda porque nunca foi moda no sentido pop. É essencial. É funcional. É belo por consequência, não por tentativa. Cada linha tem função — sustentar peso, receber costas, distribuir tensão. E é justamente aí que fica bonito."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"Design escandinavo não envelhece porque nunca tentou parecer novo."}]}]},
      {"type":"paragraph","content":[{"type":"text","text":"Uma cadeira de Wegner de 1949 continua sendo produzida em 2026 porque não há o que melhorar nela. E é essa qualidade — de não precisar ser atualizada — que a torna referência de projeto."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Como ela funciona como \"régua\" de projeto"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Quando se estabelece uma peça atemporal como ponto de partida, o resto do projeto tem que dialogar com ela. Isso força escolhas mais duradouras em tudo o mais: paleta, texturas, iluminação, mobiliário complementar."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se a cadeira coube, o resto tem que caber com ela. Isso é diferente de começar pela tendência do momento — porque a tendência vai envelhecer em três anos, e o resto do ambiente vai envelhecer junto."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que uma peça escandinava faz por um ambiente"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Três efeitos que observo quando uma peça de referência escandinava entra em um projeto residencial:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Ancoragem visual."},{"type":"text","text":" A peça vira o ponto focal atemporal do ambiente. Tudo mais orbita em torno dela."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Elevação de padrão."},{"type":"text","text":" Uma peça bem escolhida puxa o resto para cima. Automaticamente, mobiliário genérico ao redor parece deslocado — e o projeto acaba refinando por gravidade."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Compatibilidade estilística."},{"type":"text","text":" Escandinavo dialoga com quase tudo — boho, industrial, minimalista, orgânico moderno. É a estética que se relaciona sem impor."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Aplicações que faço sentido"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Não precisa ser a cadeira original — que custa entre R$ 8 mil e R$ 40 mil. Releituras nacionais bem executadas (marcenaria autoral, ferragens qualificadas) fazem o papel com dignidade por 20-30% do preço."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Aplicações típicas: uma poltrona no canto de leitura da sala, uma mesa lateral escandinava perto do sofá, uma luminária de piso em madeira clara. Uma peça por ambiente é suficiente para ancorar tudo o mais."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Teste em casa"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se quiser observar o princípio funcionando: adicione um item de referência escandinava ao seu ambiente atual. Só um. Uma luminária de piso, uma cadeira decorativa, uma mesa lateral. Observe como ele reorganiza a leitura visual do resto do ambiente."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Um princípio de projeto registrado. Não é a única forma de começar um ambiente — mas é uma das mais confiáveis."}]}]}
    ]
  }$doc$::jsonb,
  cover_alt = 'Cadeira de design escandinavo com estrutura de madeira clara e assento em tecido natural'
where slug = 'cadeira-que-muda-tudo-design-escandinavo';


-- ------------------------------------------------------------
-- POST 20 — Rodapé embutido → CONCEITO (já era mais técnico, ajuste leve)
-- ------------------------------------------------------------
update public.articles
set
  title = 'Detalhe que não se vê, mas se sente',
  subtitle = 'Por que o rodapé embutido é um dos detalhes construtivos que mais separam projeto amador de projeto refinado.',
  excerpt = 'Um dos princípios de projeto que mais defendo: o que separa uma casa comum de uma casa que parece de arquiteto raramente é o que se vê — é o que passou despercebido.',
  content = $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Existe um detalhe construtivo que defendo em quase todo projeto residencial e que quase ninguém percebe conscientemente: o rodapé embutido. Aquele rodapé que fica alinhado com a parede, sem sobressair, formando um único plano contínuo."}]},
      {"type":"paragraph","content":[{"type":"text","text":"O olho não vê o detalhe. Vê o resultado. E o resultado é que a parede parece mais alta, o piso parece mais amplo, o ambiente parece mais organizado."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"O que faz um projeto parecer feito por profissional não é o que se vê — é o que não se vê."}]}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Por que o rodapé tradicional existe"}]},
      {"type":"paragraph","content":[{"type":"text","text":"O rodapé tradicional (aquele de 7-10 cm que fica saltando da parede) foi criado por razão prática: proteger a base da parede de mancha e batida de móvel. Ele funciona. Mas ele também recorta o ambiente visualmente — cria uma linha horizontal contínua que desce o pé-direito e endurece a leitura."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que o rodapé embutido resolve"}]},
      {"type":"paragraph","content":[{"type":"text","text":"O rodapé embutido resolve as duas coisas. Protege a parede (é o mesmo material do rodapé tradicional, só recuado para dentro da parede em vez de sobressaindo dela) e mantém a leitura contínua do plano."}]},
      {"type":"paragraph","content":[{"type":"text","text":"O efeito é sutil e cumulativo. Em um ambiente, quase não se percebe. Em uma casa inteira executada com esse detalhe, a percepção de qualidade sobe várias camadas — sem ninguém conseguir apontar exatamente o motivo."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Custo e execução"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Custa 10-15% a mais que rodapé tradicional. Exige gesseiro que sabe fazer o recorte, ou obra que preveja o detalhe desde a alvenaria. Não pode ser adicionado depois — precisa estar no projeto executivo."}]},
      {"type":"paragraph","content":[{"type":"text","text":"É um investimento que só faz sentido se a obra vai ser bem executada em todo o resto. Em obra descuidada, o detalhe se perde. Em obra bem gerida, ele eleva tudo à volta."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O princípio maior"}]},
      {"type":"paragraph","content":[{"type":"text","text":"O rodapé embutido é só um exemplo de uma decisão maior que oriento em quase todo projeto: procurar coisas que ninguém percebe, mas que todos sentem."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Batentes alinhados com a parede. Interruptores centralizados na cerâmica. Reguas de piso paralelas à janela principal. Encontros de acabamentos limpos. São detalhes que não aparecem em foto, mas que fazem a casa \"funcionar\" visualmente."}]},
      {"type":"paragraph","content":[{"type":"text","text":"É o que faz um projeto sustentável no tempo, sem envelhecer."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Um princípio de projeto que raramente aparece em briefing — mas define muito do que separa projeto refinado de projeto genérico."}]}]}
    ]
  }$doc$::jsonb,
  cover_alt = 'Detalhe arquitetônico mostrando rodapé embutido em parede clara com continuidade visual'
where slug = 'detalhe-invisivel-rodape-embutido';
