-- ============================================================
-- SEED DE ARTIGOS — BLOCO 3/6
-- Normas Técnicas: artigos 9, 10, 11, 12, 13
-- Formato: mais longos, com muitos H2s (aparecem no sumário lateral)
-- ============================================================

-- ------------------------------------------------------------
-- ARTIGO 9 — NBR 15575 · DESTAQUE de Normas
-- ------------------------------------------------------------
insert into public.articles (
  slug, category, title, subtitle, excerpt, content,
  cover_image, cover_alt, tags, author, reading_time_minutes,
  seo_meta_description, seo_keywords,
  is_published, published_at, is_featured
) values (
  'nbr-15575-norma-de-desempenho-explicada',
  'normas',
  'NBR 15575 explicada: o que é a norma de desempenho e por que ela protege você',
  'A norma que redefine o mínimo aceitável em edificações residenciais brasileiras — e que a maioria dos clientes desconhece.',
  'A NBR 15575 é uma das normas mais importantes da construção civil brasileira e a maioria dos clientes nunca ouviu falar dela. Aqui vai o guia completo em linguagem clara.',
  $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Se você vai construir, comprar ou reformar uma casa ou apartamento, existe uma norma técnica que define o mínimo que a construção deve entregar em qualidade — e a maioria dos brasileiros nunca ouviu falar dela. É a NBR 15575, conhecida como Norma de Desempenho."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Neste guia, quero explicar em linguagem acessível o que é essa norma, o que ela exige, como ela te protege, e por que ela deveria ser exigida por todo cliente antes de aceitar uma entrega."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que é a NBR 15575"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A NBR 15575 é uma norma técnica brasileira publicada pela ABNT (Associação Brasileira de Normas Técnicas) em 2013 e revisada em 2021. Ela estabelece requisitos mínimos de desempenho que edificações habitacionais devem cumprir — em segurança, habitabilidade, sustentabilidade e durabilidade."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Em português claro: ela diz qual é o mínimo aceitável de qualidade de uma casa ou apartamento. Não é sugestão. É norma técnica com força legal, referenciada pelo Código de Defesa do Consumidor e pelo Programa Minha Casa Minha Vida."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Por que ela existe"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Antes de 2013, o Brasil não tinha padrão nacional de desempenho residencial. Cada construtora entregava o que achava aceitável, e o cliente descobria depois — geralmente com goteira, mofo, isolamento acústico ruim ou piso trincado."}]},
      {"type":"paragraph","content":[{"type":"text","text":"A NBR 15575 nasceu justamente pra dar critério objetivo. Se sua parede não isola o ruído do vizinho no nível X, ela não cumpre a norma. Se a laje não suporta carga Y, não cumpre a norma. Se a impermeabilização não dura Z anos, não cumpre a norma."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Os seis eixos de desempenho"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A norma se divide em seis grandes eixos. Cada um estabelece critérios específicos e mensuráveis:"}]},
      {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Desempenho estrutural"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A construção precisa resistir aos esforços que vai receber (peso próprio, pessoas, móveis, vento, sismos regionais) sem colapsar nem deformar excessivamente. Define vida útil estrutural mínima de 50 anos."}]},
      {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Segurança contra incêndio"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Estabelece resistência ao fogo dos elementos construtivos, saídas de emergência, sinalização, sistemas de detecção quando aplicáveis. Cada tipo de edificação tem exigência proporcional."}]},
      {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Segurança no uso e operação"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Escadas com dimensões seguras, guarda-corpos com altura mínima, superfícies antiderrapantes em áreas molhadas, portas com fechaduras que não travam com criança dentro."}]},
      {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Estanqueidade"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Impermeabilização de coberturas, banheiros, áreas frias, fachadas. A norma define testes objetivos — não é só \"parece impermeável\", tem que passar em ensaio."}]},
      {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Desempenho térmico e acústico"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Talvez o mais sensível para o morador. A norma exige nível mínimo de isolamento acústico entre unidades vizinhas, entre pavimentos, e da rua para dentro. E define transmitância térmica mínima das paredes de fachada, dependendo da zona bioclimática."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você mora em apartamento e escuta o barulho do vizinho como se estivesse no mesmo cômodo, provavelmente sua construção não atende essa parte da norma."}]},
      {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Durabilidade e manutenibilidade"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Vida útil de cada componente. Impermeabilização deve durar mínimo X anos, revestimento cerâmico Y anos, esquadria Z anos. E deve ser possível fazer manutenção sem destruir o conjunto."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Os três níveis de desempenho"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A norma prevê três níveis de cumprimento — mínimo (M), intermediário (I) e superior (S):"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Nível M (Mínimo):"},{"type":"text","text":" obrigatório. Todas as edificações devem cumprir. Abaixo disso, a construtora não entrega."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Nível I (Intermediário):"},{"type":"text","text":" opcional, mas destaca a construção como acima da média."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Nível S (Superior):"},{"type":"text","text":" premium. Poucas construtoras atendem consistentemente."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Ao comprar imóvel novo, você pode e deve pedir o memorial de desempenho — documento que mostra em qual nível cada critério foi atendido. É seu direito ver."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Como a NBR 15575 te protege"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Você tem cinco direitos concretos como consumidor por causa dessa norma:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Exigir memorial de desempenho antes de assinar contrato."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Recusar entrega de imóvel que não cumpre nível mínimo (M)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Acionar construtora judicialmente por vícios ocultos referenciados na norma."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Garantia estendida — a vida útil declarada pela construtora tem que corresponder ao que a norma exige."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Reparação sem custo em problemas de desempenho durante o período de garantia legal."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que a norma não cobre"}]},
      {"type":"paragraph","content":[{"type":"text","text":"É importante ser honesto: a NBR 15575 é uma norma de desempenho, não de estética. Ela não protege você de layout ruim, marcenaria mal projetada, iluminação inadequada. Ela cobre o \"esqueleto\" da construção — não o \"vestido\"."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Para reformas de imóveis existentes, a norma não é retroativa. Se seu prédio é de 1990, você não pode exigir do prédio o que a norma passou a exigir em 2013. Mas você pode exigir de reformas atuais que respeitem a norma vigente."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que fazer se você suspeita que não foi cumprida"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você comprou imóvel novo e desconfia que a norma não foi cumprida (barulho excessivo, mofo persistente, trincas, infiltração), a sequência é:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Documente com fotos e vídeos datados."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Notifique formalmente a construtora por escrito (email, carta registrada)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Contrate perícia técnica independente — laudo com fundamentação na NBR 15575."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Procure Procon ou ação judicial se a construtora não resolver."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Por que Ana Laura acha isso importante"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Trabalho com engenharia há mais de uma década e vejo cliente após cliente descobrindo essa norma tarde demais — geralmente depois de anos morando com problema que poderia ter sido reclamado no primeiro ano."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você vai comprar ou construir, peça memorial de desempenho. Se você vai reformar, exija que o projeto respeite a norma vigente. E se você tem um problema atual, pode ser que a norma esteja a seu favor."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se ficou dúvida sobre como a NBR 15575 se aplica ao seu caso específico, converse comigo. Faço análise inicial e te oriento nos próximos passos."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto é orientação geral sobre a NBR 15575. Não substitui laudo técnico profissional. Para casos concretos, sempre consulte engenheiro civil ou arquiteto."}]}]}
    ]
  }$doc$::jsonb,
  'https://images.unsplash.com/photo-1541976076758-347942db1970?auto=format&fit=crop&w=1600&q=80',
  'Livros de normas técnicas ABNT sobre mesa de trabalho com caneta e calculadora',
  ARRAY['NBR 15575','norma de desempenho','construção','ABNT'],
  'Ana Laura Noronha',
  12,
  'A NBR 15575 é a norma técnica que define o mínimo de qualidade em construções residenciais no Brasil. Guia completo em linguagem clara.',
  ARRAY['NBR 15575','norma desempenho','norma construção civil','ABNT residencial'],
  true,
  now() - interval '5 days',
  true
) on conflict (slug) do nothing;


-- ------------------------------------------------------------
-- ARTIGO 10 — ART e RRT
-- ------------------------------------------------------------
insert into public.articles (
  slug, category, title, subtitle, excerpt, content,
  cover_image, cover_alt, tags, author, reading_time_minutes,
  seo_meta_description, seo_keywords,
  is_published, published_at, is_featured
) values (
  'art-e-rrt-o-que-e-quando-e-obrigatorio',
  'normas',
  'ART e RRT: o que é, quando é obrigatório e por que exigir do seu profissional',
  'Dois documentos técnicos que separam profissional responsável de faz-tudo. Entenda como eles te protegem.',
  'Se você vai contratar qualquer profissional de engenharia ou arquitetura, precisa entender ART e RRT. São documentos que te protegem juridicamente — e a maioria dos clientes nem sabe pedir.',
  $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Se você vai contratar profissional de engenharia ou arquitetura pra qualquer serviço técnico, precisa entender dois documentos: ART e RRT. Não é burocracia inútil — são as suas garantias jurídicas se algo der errado."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Neste guia, quero explicar o que cada um é, quando são obrigatórios, quanto custam, e como usar essa informação pra escolher profissionais que trabalham com responsabilidade."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que é ART"}]},
      {"type":"paragraph","content":[{"type":"text","text":"ART significa Anotação de Responsabilidade Técnica. É o documento emitido pelo CREA (Conselho Regional de Engenharia e Agronomia) que registra oficialmente que determinado profissional habilitado assumiu responsabilidade técnica por um serviço específico."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Em termos práticos: se seu engenheiro emitiu ART pra sua obra, existe registro público de que ele é o responsável técnico. Se algo der errado — colapso estrutural, incêndio elétrico, vazamento por falha de projeto — ele responde civil e criminalmente."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que é RRT"}]},
      {"type":"paragraph","content":[{"type":"text","text":"RRT significa Registro de Responsabilidade Técnica. É equivalente à ART, mas emitido pelo CAU (Conselho de Arquitetura e Urbanismo) — que é o órgão que regulamenta arquitetos."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você contratou arquiteto, o documento correto é RRT. Se contratou engenheiro civil, é ART. Se contratou os dois, cada um emite seu próprio. Se contratou profissional que atua como engenheiro E arquiteto (raro), pode emitir os dois separadamente."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Quando são obrigatórios"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A obrigatoriedade é ampla. Basicamente qualquer atividade técnica que envolva risco à saúde, segurança ou meio ambiente exige ART/RRT. Na prática residencial:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Projeto arquitetônico — RRT do arquiteto responsável."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Projeto estrutural — ART do engenheiro calculista."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Projetos complementares (elétrico, hidráulico, gás, prevenção incêndio) — ART do engenheiro respectivo."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Execução da obra — ART do engenheiro executor (se diferente do projetista)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Reforma em condomínio residencial — obrigatório por força da NBR 16280."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Laudos técnicos, perícias, avaliações."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você contratou profissional e ele não emitiu ART/RRT, ele está agindo à margem da lei — e você está sem proteção jurídica."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Quanto custa"}]},
      {"type":"paragraph","content":[{"type":"text","text":"O custo da ART é definido pelo CREA de cada estado e varia por faixa de valor do contrato. Em média:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Contrato até R$ 8 mil: ART custa cerca de R$ 89."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Contrato entre R$ 8 mil e R$ 15 mil: cerca de R$ 178."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Contrato acima de R$ 15 mil: valores proporcionais definidos por tabela."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"O custo é normalmente incluso no honorário do profissional. Se ele cobra à parte, é ok — desde que esteja no orçamento. Se ele diz que \"não precisa emitir\", desconfie."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Como conferir se foi emitida"}]},
      {"type":"paragraph","content":[{"type":"text","text":"O CREA disponibiliza consulta pública de ART. No site do seu CREA regional (creaXX.org.br, XX = seu estado), procure a seção \"Consulta de ART\". Você pode consultar por CPF do profissional, pelo número da ART ou pelo endereço da obra."}]},
      {"type":"paragraph","content":[{"type":"text","text":"O mesmo vale para RRT no CAU. O site é caubr.gov.br, e a consulta é aberta ao público."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Ao contratar profissional, peça o número da ART/RRT como parte da entrega do projeto. Um profissional sério tem esse hábito. Se te enrolam, alerta."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que a ART/RRT te protege"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Cinco proteções concretas quando você tem ART/RRT no seu projeto:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Responsabilidade civil clara em caso de sinistro (rachadura, colapso, incêndio elétrico)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Acionamento de seguro se o profissional tiver seguro de responsabilidade civil profissional."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Ação disciplinar no CREA/CAU se o profissional cometer negligência ou erro grave."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Aprovação em prefeitura (a maioria dos alvarás exige ART/RRT para dar entrada)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Comprovação em processo judicial se necessário."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que fazer se o profissional se recusar a emitir"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você contrata engenheiro ou arquiteto e ele se recusa a emitir ART/RRT, ou diz que \"não é preciso\", é sinal claro de que:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Ele não quer responsabilidade formal (perigoso)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Ele não é registrado no CREA/CAU (grave — pode não ser habilitado)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Ele está com registro suspenso ou irregular (você fica sem proteção)."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Em qualquer desses cenários, mude de profissional. Não vale o desconto — vale sua segurança jurídica."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Fechando com pé no chão"}]},
      {"type":"paragraph","content":[{"type":"text","text":"ART e RRT não são detalhes burocráticos. São a garantia de que você contratou alguém habilitado, responsável e formalmente comprometido com o trabalho. Custa entre R$ 90 e R$ 300 por documento — investimento ínfimo comparado ao risco de contratar sem eles."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você tem dúvida sobre qual documento é necessário pro seu caso, converse comigo. Explico o que se aplica e você contrata com clareza."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto é orientação geral. Regras específicas variam por estado e tipo de obra. Consulte o CREA/CAU da sua região para casos concretos."}]}]}
    ]
  }$doc$::jsonb,
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80',
  'Documento técnico com carimbo e assinatura sobre plantas de arquitetura',
  ARRAY['ART','RRT','CREA','responsabilidade técnica'],
  'Ana Laura Noronha',
  10,
  'ART e RRT são documentos técnicos obrigatórios em obras. Guia completo do que são, quando exigir e como conferir se o profissional emitiu.',
  ARRAY['ART','RRT','CREA','responsabilidade técnica engenheiro'],
  true,
  now() - interval '15 days',
  false
) on conflict (slug) do nothing;


-- ------------------------------------------------------------
-- ARTIGO 11 — NBR 9050 · Acessibilidade
-- ------------------------------------------------------------
insert into public.articles (
  slug, category, title, subtitle, excerpt, content,
  cover_image, cover_alt, tags, author, reading_time_minutes,
  seo_meta_description, seo_keywords,
  is_published, published_at, is_featured
) values (
  'nbr-9050-acessibilidade-em-projetos-residenciais',
  'normas',
  'NBR 9050: acessibilidade em projetos residenciais — o que a lei exige',
  'A norma que garante autonomia de quem usa cadeira de rodas, tem mobilidade reduzida ou envelhece com dignidade.',
  'Acessibilidade não é opcional — é direito garantido por lei. Entenda o que a NBR 9050 exige em construções residenciais e por que aplicar a norma valoriza o imóvel.',
  $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Quando falamos de acessibilidade, muita gente pensa em rampa de shopping ou banheiro adaptado. Mas a NBR 9050 vai muito além: ela orienta como projetar espaços em que qualquer pessoa consiga viver com autonomia — cadeira de rodas, mobilidade reduzida por idade, gestante, criança pequena."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Neste guia, quero explicar o que a norma exige em construções residenciais, o que é opcional mas valoriza muito, e como ela se conecta ao envelhecimento que todos vamos viver."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que é a NBR 9050"}]},
      {"type":"paragraph","content":[{"type":"text","text":"NBR 9050 é a norma técnica brasileira que trata da acessibilidade a edificações, mobiliário, espaços e equipamentos urbanos. Publicada pela ABNT, sua versão atual é de 2020 (com revisão em 2021)."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Ela define dimensões mínimas de circulação, características de rampas, barras de apoio, sinalização tátil, alturas de bancadas, e dezenas de outros critérios que garantem autonomia a pessoas com deficiência ou mobilidade reduzida."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Quando é obrigatória em residências"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A obrigatoriedade em residências privadas é menor do que em espaços públicos, mas existe:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Áreas comuns de condomínios — corredores, halls, elevadores, piscinas, salão de festas. Obrigatório atender NBR 9050."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Unidades habitacionais em programa habitacional (Minha Casa Minha Vida) — cota mínima obrigatória de unidades adaptadas."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Reforma solicitada por morador com deficiência — o condomínio não pode se opor."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Em residências particulares que você constrói pra sua família, não existe obrigatoriedade legal — mas seguir a norma é decisão inteligente por outros motivos que vou explicar."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Por que aplicar mesmo sem obrigatoriedade"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Aplicar princípios da NBR 9050 na sua casa faz sentido por três razões práticas — mesmo que ninguém na família tenha deficiência hoje:"}]},
      {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Envelhecimento é certo"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A idade traz mobilidade reduzida gradual. Escadas viram obstáculo, portas estreitas viram problema, banheiros sem barra de apoio viram risco de queda. Casa projetada com princípios de acessibilidade envelhece com você — não te obriga a mudar depois."}]},
      {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Acidentes acontecem"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Uma perna quebrada, uma cirurgia, uma gestação difícil. Cada um desses momentos vira uma casa que \"não te serve\" por semanas ou meses. Casa acessível te serve em qualquer momento."}]},
      {"type":"heading","antrs":{"level":3},"content":[{"type":"text","text":"Valor de revenda"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Casas com acessibilidade universal têm público comprador maior — famílias com criança, idosos, pessoas com deficiência. Aumenta a base de potenciais compradores em 20-30%."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Os princípios que mais importam em residências"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você vai aplicar só alguns pontos da norma, esses são os que mais impactam qualidade de vida:"}]},
      {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Portas de largura mínima 90 cm"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Portas de 80 cm (comuns em Brasil) não passam cadeira de rodas. 90 cm passa, e não muda em nada a arquitetura. Custo praticamente igual — economia zero em fazer estreito."}]},
      {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Circulações mínimas de 90 cm"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Corredor com 80 cm sufoca. Com 90 cm respira. Com 120 cm passa duas pessoas. Um simples aumento de 10 cm no projeto muda a experiência do dia a dia por décadas."}]},
      {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Banheiros com área de manobra"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Banheiro com círculo de 1,50m de rotação livre é acessível. Não precisa ser todos os banheiros — só um. Mas o valor é enorme quando alguém precisa."}]},
      {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Barras de apoio no chuveiro"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Instalar reforço estrutural na parede do chuveiro na obra custa R$ 100. Instalar depois vira quebra-quebra de R$ 3.000. Deixe o reforço, mesmo que não coloque a barra hoje."}]},
      {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Interruptores e tomadas em altura acessível"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Interruptor entre 90 e 100 cm do piso, tomadas entre 40 e 60 cm. Bom pra cadeira de rodas, bom pra criança, bom pra idoso sentado."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Detalhes que quase ninguém aplica mas fazem diferença"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Alguns pontos que raramente aparecem em projetos residenciais mas custam pouco e agregam muito:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Piso antiderrapante em áreas molhadas (banheiro, área de serviço, entrada externa)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Iluminação de degraus, mesmo em escadas internas — reduz risco de queda em idosos e crianças."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Puxadores em U em vez de maçanetas redondas — mais fácil para mãos com artrite ou dolorida."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Torneiras monocomando ou com alavanca — mais fácil de operar sem força fina."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"E se você tem alguém com necessidade específica hoje"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você ou alguém da sua família tem deficiência ou mobilidade reduzida hoje, a norma passa a ser guia técnico obrigatório. Cada projeto vira caso a caso — não existe solução genérica."}]},
      {"type":"paragraph","content":[{"type":"text","text":"É importante contratar profissional que conhece a norma em profundidade e que projeta caso a caso. Adaptação de residência é uma das áreas onde erro amador custa mais caro — literal e humanamente."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você está nesse cenário e quer conversar sobre como aplicar acessibilidade ao seu caso específico, converse comigo. Faço projeto com atenção especial a esses detalhes."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto é orientação geral sobre a NBR 9050. Cada projeto tem particularidades — sempre consulte profissional habilitado para aplicação específica."}]}]}
    ]
  }$doc$::jsonb,
  'https://images.unsplash.com/photo-1631048499123-3fdcf94c40ec?auto=format&fit=crop&w=1600&q=80',
  'Detalhe de rampa arquitetônica acessível com corrimão e piso tátil',
  ARRAY['NBR 9050','acessibilidade','mobilidade','universal design'],
  'Ana Laura Noronha',
  11,
  'A NBR 9050 orienta acessibilidade em edificações. Guia sobre quando é obrigatória em residências e por que aplicar mesmo sem obrigatoriedade.',
  ARRAY['NBR 9050','acessibilidade residencial','universal design','mobilidade reduzida'],
  true,
  now() - interval '25 days',
  false
) on conflict (slug) do nothing;


-- ------------------------------------------------------------
-- ARTIGO 12 — NR-18 · Canteiro de obras
-- ------------------------------------------------------------
insert into public.articles (
  slug, category, title, subtitle, excerpt, content,
  cover_image, cover_alt, tags, author, reading_time_minutes,
  seo_meta_description, seo_keywords,
  is_published, published_at, is_featured
) values (
  'nr-18-normas-de-seguranca-canteiro-de-obra',
  'normas',
  'NR-18: normas de segurança em canteiro de obra — o guia completo',
  'A norma que separa canteiro profissional de canteiro perigoso. Entenda o que exigir do seu construtor.',
  'A NR-18 estabelece o mínimo em segurança do trabalho em canteiros de obra. Cliente que conhece essa norma não contrata construtor descuidado — e evita processo trabalhista no futuro.',
  $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Se você vai reformar ou construir e vai ter canteiro de obra com trabalhadores contratados por você ou por sua construtora, existe uma norma federal que estabelece o mínimo em segurança do trabalho: a NR-18."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Não conhecer essa norma pode te custar caro — não só em risco de acidente, mas em processo trabalhista se um funcionário se machucar por falta de proteção. Neste guia, quero traduzir o essencial em linguagem clara."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que é a NR-18"}]},
      {"type":"paragraph","content":[{"type":"text","text":"NR-18 é uma Norma Regulamentadora do Ministério do Trabalho que trata das Condições e Meio Ambiente de Trabalho na Indústria da Construção. Publicada em 1978 e revisada várias vezes (última grande revisão em 2020), ela é aplicada em todo canteiro de obra brasileiro."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Ela tem força de lei trabalhista. Descumprir pode gerar multa administrativa, embargos de obra pelo Ministério do Trabalho e responsabilidade civil se acidente ocorrer."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Quem é responsável"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A responsabilidade primária é do empregador dos trabalhadores. Isso significa:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Se você contratou construtora, a construtora é responsável."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Se você contratou pedreiro autônomo (sem carteira assinada), você é considerado empregador de fato pela Justiça do Trabalho — e a responsabilidade é sua."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Se você contratou empreiteiro que subcontrata terceiros, ainda pode ser responsabilizado solidariamente."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"O jeito de se proteger é contratar sempre empresa estabelecida com funcionários registrados. Reforma feita com \"o pedreiro do bairro\" sem contrato é território de risco."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Equipamentos de Proteção Individual (EPI)"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A norma exige EPI adequado para cada função. Fornecimento e cobrança de uso são obrigação do empregador:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Capacete:"},{"type":"text","text":" obrigatório em toda área de obra."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Óculos de proteção:"},{"type":"text","text":" quando há risco de projeção de partículas (corte, esmerilhamento)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Luvas:"},{"type":"text","text":" apropriadas por tipo de risco (mecânico, químico, térmico)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Botas com biqueira de aço:"},{"type":"text","text":" quando há risco de perfuração ou queda de material."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Cinto de segurança:"},{"type":"text","text":" obrigatório para trabalho em altura acima de 2 metros sem proteção coletiva."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Protetor auricular:"},{"type":"text","text":" em áreas com ruído acima de 85 dB (praticamente qualquer operação com máquina)."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Você como cliente pode e deve exigir que todos os trabalhadores no seu canteiro usem EPI. Se algum se recusa (\"é rápido\", \"não vou machucar\"), é sinal de canteiro mal gerido."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Proteções coletivas obrigatórias"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Além do EPI (proteção individual), a norma exige proteções coletivas em várias situações. As mais comuns em canteiro residencial:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Guarda-corpo em aberturas:"},{"type":"text","text":" janelas sem esquadria, vãos de escada, sacadas em construção. Altura mínima 1,20 m com rodapé."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Andaimes com plataforma completa:"},{"type":"text","text":" bordas fechadas, corrimão, escada de acesso segura."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Barreiras e sinalização:"},{"type":"text","text":" em áreas com movimentação de material pesado."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Instalações elétricas protegidas:"},{"type":"text","text":" fiação encapada, quadros com disjuntor, aterramento adequado."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Documentação obrigatória"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Para obras acima de determinado porte ou complexidade, a norma exige documentação técnica formal:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"PGR:"},{"type":"text","text":" Programa de Gerenciamento de Riscos — identifica riscos e define medidas preventivas."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"PCMSO:"},{"type":"text","text":" Programa de Controle Médico de Saúde Ocupacional — atestados admissionais, periódicos e demissionais."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Ordem de Serviço:"},{"type":"text","text":" cada funcionário recebe orientação por escrito sobre riscos da função."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"CIPA:"},{"type":"text","text":" Comissão Interna de Prevenção de Acidentes — obrigatória em canteiros de determinada faixa de trabalhadores."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Em reforma residencial pequena, muitos desses itens não se aplicam. Mas em obra maior (construção de casa, prédio pequeno), são obrigatórios."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Como você pode se proteger"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Cinco atitudes práticas que reduzem seu risco jurídico e humano em obra:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Contrate sempre empresa registrada, não profissional autônomo sem estrutura."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Peça comprovação de recolhimento de INSS e FGTS dos funcionários que trabalham em sua obra."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Verifique se a empresa tem seguro de responsabilidade civil."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Documente com fotos que seu canteiro tem EPI, guarda-corpos, sinalização."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Se ver alguém trabalhando em situação de risco, comunique ao responsável pela obra imediatamente."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Consequências de descumprimento"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Descumprir a NR-18 pode gerar:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Autuação pelo Ministério do Trabalho — multa varia por faixa e reincidência."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Embargo da obra — trabalho suspenso até regularização."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Se acidente ocorrer: ação trabalhista com danos morais, materiais e estéticos, além de responsabilidade criminal em casos de negligência grave."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Segurança do trabalho não é custo — é investimento. Canteiro bem gerido reduz absentismo, acidente, rotatividade e produz melhor. Se você quer construtor sério, um dos indicadores é como ele trata segurança."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você tem dúvida sobre como a NR-18 se aplica à sua obra específica, converse comigo. Faço a análise inicial e te oriento nos pontos a exigir do seu construtor."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto é orientação geral. A NR-18 tem regulamentações extensas. Para casos específicos, sempre consulte engenheiro de segurança do trabalho."}]}]}
    ]
  }$doc$::jsonb,
  'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=1600&q=80',
  'Trabalhador da construção civil usando EPI completo com capacete amarelo e colete refletivo',
  ARRAY['NR-18','segurança do trabalho','canteiro de obra','construção civil'],
  'Ana Laura Noronha',
  10,
  'A NR-18 estabelece o mínimo em segurança do trabalho na construção civil. Guia sobre EPI, proteções coletivas, documentação e como proteger sua obra.',
  ARRAY['NR-18','segurança canteiro obra','EPI construção','segurança trabalho'],
  true,
  now() - interval '35 days',
  false
) on conflict (slug) do nothing;


-- ------------------------------------------------------------
-- ARTIGO 13 — NBR 14039 · Instalações elétricas
-- ------------------------------------------------------------
insert into public.articles (
  slug, category, title, subtitle, excerpt, content,
  cover_image, cover_alt, tags, author, reading_time_minutes,
  seo_meta_description, seo_keywords,
  is_published, published_at, is_featured
) values (
  'nbr-14039-instalacoes-eletricas-o-que-cliente-precisa-saber',
  'normas',
  'NBR 5410 e 14039: instalações elétricas — o que todo cliente precisa entender',
  'Duas normas técnicas que decidem se sua casa é segura ou risco de incêndio. Guia sem termos técnicos.',
  'Instalação elétrica é a área da construção que causa mais incêndios residenciais. E é onde mais se economiza errado. Aqui vai o que a norma exige em linguagem que qualquer cliente entende.',
  $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"A instalação elétrica é a área da construção civil que causa mais incêndios residenciais no Brasil. Segundo dados dos Corpos de Bombeiros de vários estados, 30-40% dos incêndios em residências têm origem elétrica — geralmente por instalação irregular, sobrecarga ou falta de aterramento."}]},
      {"type":"paragraph","content":[{"type":"text","text":"E é também a área onde mais se economiza errado. Cliente aceita orçamento mais barato de eletricista sem conhecer as normas, e descobre depois que fio subdimensionado esquenta, disjuntor errado não protege, aterramento ausente vira risco de vida."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Neste guia, quero explicar o que as duas principais normas (NBR 5410 pra baixa tensão residencial e NBR 14039 pra média tensão) exigem — em linguagem clara — e o que você deveria conferir na sua instalação."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que é a NBR 5410"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A NBR 5410 é a norma brasileira que trata das instalações elétricas de baixa tensão — que é a tensão utilizada em quase todas as residências (127V ou 220V). Publicada pela ABNT em 2004 e atualizada em 2008, ela é a referência técnica principal para engenheiros e eletricistas residenciais."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Ela define dimensionamento de fios, tipos de disjuntores, exigências de aterramento, distâncias de segurança, quantidade mínima de circuitos por tipo de ambiente e dezenas de outros critérios."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que é a NBR 14039"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A NBR 14039 trata da instalação em média tensão — que é usada em edifícios residenciais grandes, indústrias, condomínios com transformador próprio. Em residência individual, quase nunca se aplica."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Mas em condomínio, é o que rege a subestação de energia. E se você mora ou vai morar em edifício, é uma das normas que a construtora precisou seguir na entrega."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Os quatro pontos que mais importam pro cliente"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A NBR 5410 tem centenas de páginas de detalhamento técnico. Mas os pontos que mais impactam o cliente residencial e onde mais se economiza errado são quatro:"}]},
      {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Dimensionamento de fios"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Cada fio tem capacidade máxima de corrente. Se você passar corrente maior que a suportada, o fio esquenta e pode queimar (ou pior, incendiar). A norma define bitolas mínimas por uso:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Iluminação: fio 1,5 mm² mínimo."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Tomadas de uso geral: fio 2,5 mm² mínimo."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Circuitos específicos (chuveiro, ar-condicionado, cozinha): 4 mm² a 10 mm² dependendo da potência."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Eletricista que usa fio 1,5 mm² pra tomada de tomada de cozinha (pra economizar) tá fazendo instalação irregular e perigosa."}]},
      {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Aterramento"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Aterramento é a proteção que evita choque quando um aparelho tem fuga de corrente. A norma exige aterramento em todas as instalações residenciais desde 2004. Se sua casa é mais antiga e nunca teve reforma elétrica, provavelmente não tem — e isso é risco real."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Aterrado funciona assim: se seu chuveiro (ou qualquer aparelho) tiver defeito e vazar corrente, o aterramento leva a corrente pra terra em vez de pra você. Sem aterramento, o corpo humano vira o caminho."}]},
      {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Disjuntores DR (Diferencial Residual)"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Diferente do disjuntor comum, o DR desliga a energia quando detecta corrente de fuga — mesmo antes de curto-circuito ou incêndio. É a proteção mais eficaz contra choque elétrico."}]},
      {"type":"paragraph","content":[{"type":"text","text":"A norma exige DR em circuitos de áreas molhadas (banheiros, cozinha, área de serviço, área externa). Custa 3-4x mais que disjuntor comum, mas salva vida."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se seu quadro não tem DR nesses circuitos, sua instalação está fora da norma. Adaptar é urgente."}]},
      {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Divisão em circuitos"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A norma exige separação clara de circuitos por tipo de uso. Em residência, o mínimo é:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Circuito exclusivo pra iluminação (não misturar com tomada)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Circuito exclusivo pra tomadas de uso geral (por ambiente)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Circuito exclusivo pra cada aparelho de alta potência (chuveiro, cooktop, ar-condicionado)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Circuito exclusivo pra cozinha (por causa dos eletrodomésticos)."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Instalação que junta tudo num circuito só sobrecarrega — e o disjuntor desarma direto ou (pior) não desarma e o fio esquenta."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que exigir do seu eletricista/engenheiro"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você contrata pra instalação nova ou reforma elétrica, essas são as documentações obrigatórias:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Projeto elétrico com dimensionamento de todos os circuitos."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Diagrama unifilar do quadro de distribuição."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"ART do engenheiro eletricista responsável."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Certificado de conformidade dos materiais utilizados (fios, disjuntores, quadros)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Ensaio de aterramento com laudo (obrigatório em instalação nova)."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Se o profissional não te entrega esses documentos, você tá recebendo instalação irregular. E se algo der errado, sem documentação, o problema é seu."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Como saber se sua instalação atual é segura"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Sinais de que sua instalação elétrica pode estar irregular ou desatualizada:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Disjuntor cai frequentemente sem motivo aparente."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Você sente choque leve ao tocar em torneira metálica ou geladeira."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Interruptores ou tomadas esquentam durante uso normal."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Luzes piscam ou variam de intensidade quando outro aparelho liga."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Casa é anterior a 2004 e nunca teve reforma elétrica completa."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Qualquer um desses sinais merece diagnóstico técnico. Não é urgente sair correndo, mas não deveria ficar ignorado por anos."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Investimento em segurança elétrica"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Reforma elétrica completa de residência de 100-150 m² custa entre R$ 12 mil e R$ 25 mil (2026), incluindo projeto, materiais e mão de obra. Parece caro comparado ao \"eletricista do bairro\" que faria por R$ 5 mil, mas você tá pagando por conformidade com norma, ART e garantia técnica."}]},
      {"type":"paragraph","content":[{"type":"text","text":"O custo de não fazer certo é imprevisível — pode ser incêndio, choque, ou simplesmente instalação que envelhece mal e vai gerando problema."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você tem dúvida sobre a instalação elétrica da sua casa e quer diagnóstico técnico, converse comigo. Faço análise inicial e te oriento nas próximas ações."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto é orientação geral. Instalação elétrica é área técnica complexa — para casos concretos, sempre consulte engenheiro eletricista habilitado."}]}]}
    ]
  }$doc$::jsonb,
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80',
  'Quadro elétrico residencial com disjuntores organizados e etiquetados',
  ARRAY['NBR 5410','NBR 14039','instalação elétrica','segurança elétrica'],
  'Ana Laura Noronha',
  11,
  'NBR 5410 e 14039 regem instalações elétricas no Brasil. Guia sobre dimensionamento de fios, aterramento, disjuntor DR e como avaliar sua instalação.',
  ARRAY['NBR 5410','instalação elétrica residencial','disjuntor DR','norma elétrica'],
  true,
  now() - interval '45 days',
  false
) on conflict (slug) do nothing;
