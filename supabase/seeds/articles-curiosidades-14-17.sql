-- ============================================================
-- SEED DE ARTIGOS — BLOCO 4/6
-- Curiosidades: artigos 14, 15, 16, 17
-- Formato: mais leves, potencial viral, tom mais próximo
-- ============================================================

-- ------------------------------------------------------------
-- ARTIGO 14 — 7 truques de iluminação · DESTAQUE de Curiosidades
-- ------------------------------------------------------------
insert into public.articles (
  slug, category, title, subtitle, excerpt, content,
  cover_image, cover_alt, tags, author, reading_time_minutes,
  seo_meta_description, seo_keywords,
  is_published, published_at, is_featured
) values (
  '7-truques-iluminacao-arquitetos-usam',
  'curiosidades',
  '7 truques de iluminação que arquitetos usam (e você pode copiar hoje)',
  'Nenhum deles precisa de reforma. Só reorganização e um pouquinho de intenção.',
  'Iluminação boa não é sobre lâmpada cara — é sobre camadas. Aqui vão 7 truques que uso em quase todo projeto e que você pode aplicar em casa hoje mesmo.',
  $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Iluminação é a parte de um projeto de interiores que mais transforma a percepção de um ambiente — e uma das mais fáceis de aplicar sem obra. Nenhum dos truques que vou compartilhar exige quebrar parede ou trocar fiação. Alguns exigem só reorganizar o que você já tem."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Depois de mais de uma década projetando ambientes residenciais, esses são os sete truques de iluminação que uso em quase todo projeto. Alguns você vai reconhecer, outros vão te surpreender."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Truque 1: nunca use só a luz do teto"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A luz central de teto (aquele plafon único no meio do cômodo) achata o ambiente. Torna tudo chapado, sem sombra, sem profundidade. Bom pra hospital. Ruim pra casa."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Regra que uso sempre: mínimo três pontos de luz por ambiente. Um pode ser o do teto, mas os outros dois precisam estar em outras alturas — abajur, luminária de piso, arandela. É a diferença entre \"iluminado\" e \"aconchegante\"."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Truque 2: temperatura de cor importa mais que watts"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Lâmpada branco-quente (2700K a 3000K) transforma qualquer ambiente em aconchego. Lâmpada branco-frio (5000K a 6500K) transforma o mesmo ambiente em escritório. É o mesmo cômodo, com iluminação completamente diferente."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Regra: sala, quarto e ambientes de descanso — 2700K a 3000K. Cozinha e banheiros — 3000K a 4000K. Escritório — 4000K. Acima de 4500K, só em áreas técnicas."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Truque 3: ilumine paredes, não o chão"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Luz que vai pro chão desperdiça energia sem gerar sensação. Luz que bate na parede reflete difusa pelo ambiente inteiro. É como o ambiente ficasse maior."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Aplicação simples: um abajur ou luminária de piso encostado a 30-40 cm da parede, iluminando a parede em vez do teto. Sensação de amplitude imediata."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Truque 4: use dimmer sempre que puder"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Dimmer (controlador de intensidade) é uma das melhores invenções da eletricidade doméstica. Custa pouco (R$ 30 a R$ 80 pra substituir interruptor), instala em 30 minutos, e transforma o mesmo ambiente em cinco versões diferentes: reunião de trabalho, jantar romântico, filme no sofá."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você vai fazer qualquer alteração elétrica, coloque dimmer nos ambientes sociais e nos quartos. Custo mínimo, impacto enorme."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Truque 5: iluminação de leitura tem posição certa"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Luminária de leitura precisa vir por trás do ombro do lado oposto à mão que segura o livro. Se você é destro, a luz vem por trás do ombro esquerdo. Assim ela ilumina a página sem fazer sombra da sua própria mão."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Detalhe: altura ideal é 30-40 cm acima do topo da cabeça sentado. Alto demais espalha, baixo demais concentra."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Truque 6: cozinha precisa de luz de bancada"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Cozinha iluminada só pelo teto tem sombra em toda bancada — porque seu próprio corpo tampa a luz. Você prepara a comida no escuro."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Solução simples que não exige projeto: fita LED sob os armários superiores, apontada pra bancada. Custa R$ 60-150 por metro linear, instala com adesivo, plugada em tomada comum. Sua cozinha muda de patamar."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Truque 7: valorize um ponto por cômodo"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Em cada cômodo, escolha uma peça-personagem — quadro, planta, escultura, cabeceira, poltrona — e ilumine ELA especificamente. Não iguala o ambiente inteiro. Faz um ponto brilhar mais que o resto."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Assim o olho tem pra onde ir. O ambiente tem hierarquia. É o que separa \"casa comum\" de \"casa que parece de revista\"."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Combinando os sete"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Cada truque isolado já ajuda. Mas o efeito real vem quando você combina. Sala com:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Uma luz de teto suave com dimmer (truques 1 e 4)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Um abajur iluminando a parede atrás do sofá (truques 1 e 3)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Luminária de piso ao lado da poltrona de leitura, na posição correta (truques 1 e 5)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Spot iluminando o quadro principal ou a estante (truque 7)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Todas em temperatura 2700K (truque 2)."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Vira uma sala com camadas. Aconchegante em fim de tarde. Prática em reunião. Cinematográfica pra filme. Um só ambiente, várias experiências."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você quer aplicar iluminação de forma projetada no seu ambiente, converse comigo. Faço projeto luminotécnico específico e mostro onde cada ponto precisa estar."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto é orientação prática. Iluminação profissional exige projeto luminotécnico específico para cada ambiente e uso."}]}]}
    ]
  }$doc$::jsonb,
  'https://images.unsplash.com/photo-1524634126442-357e0eac3c14?auto=format&fit=crop&w=1600&q=80',
  'Sala aconchegante com iluminação em camadas: abajur, luminária de piso e luz indireta',
  ARRAY['iluminação','decoração','truques','dicas'],
  'Ana Laura Noronha',
  7,
  '7 truques de iluminação que arquitetos usam e você pode copiar sem obra. Temperatura de cor, camadas, dimmer e mais dicas práticas.',
  ARRAY['truques iluminação','iluminação casa','dicas iluminação','iluminação sala'],
  true,
  now() - interval '8 days',
  true
) on conflict (slug) do nothing;


-- ------------------------------------------------------------
-- ARTIGO 15 — Casas antigas
-- ------------------------------------------------------------
insert into public.articles (
  slug, category, title, subtitle, excerpt, content,
  cover_image, cover_alt, tags, author, reading_time_minutes,
  seo_meta_description, seo_keywords,
  is_published, published_at, is_featured
) values (
  'por-que-casas-antigas-parecem-mais-aconchegantes',
  'curiosidades',
  'Por que casas antigas parecem mais aconchegantes? A engenharia por trás',
  'Não é nostalgia. É pé-direito, proporção, textura e outras decisões técnicas que se perderam ao longo do século.',
  'Você já entrou em uma casa dos anos 1940 e sentiu que ela "abraça"? Existe explicação técnica pra isso — e a maioria das decisões que faziam sentir isso podem ser copiadas hoje.',
  $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Já entrou em uma casa dos anos 1940 e sentiu que ela era \"mais aconchegante\" do que qualquer construção nova? Não é nostalgia. Não é romantismo. É engenharia — decisões técnicas específicas que faziam essas casas serem confortáveis por padrão, e que se perderam com a industrialização da construção."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Neste texto, quero te mostrar quais são essas decisões, por que sumiram, e como algumas delas ainda podem ser aplicadas em construções novas."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Pé-direito alto"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Casas dos anos 1930-1950 tinham pé-direito de 3 a 3,5 metros. Construções contemporâneas trabalham com 2,60 a 2,80 metros. A diferença parece pouca, mas o efeito visual e térmico é enorme."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Ar quente sobe. Em ambiente com pé-direito alto, o ar aquecido pelas pessoas e pela cozinha vai pro alto e sai pelas aberturas superiores. O ar que você respira permanece mais fresco. Sem ventilador, sem ar-condicionado."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Visualmente, o ambiente parece \"mais casa\". Mais amplo, mais generoso, com hierarquia entre o corpo e a arquitetura."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Paredes espessas de tijolos maciços"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Casas antigas eram construídas com tijolos maciços — paredes de 25-30 cm de espessura. Construção moderna usa blocos cerâmicos vazados de 14 cm ou 19 cm."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Parede espessa é isolante térmico natural. Sol de tarde não aquece a casa toda — a parede segura calor durante o dia e libera devagar à noite (quando você quer aquecer). No inverno, o inverso: a parede segura calor interno."}]},
      {"type":"paragraph","content":[{"type":"text","text":"É também isolante acústico. Barulho da rua fica na rua. Barulho do vizinho fica no vizinho. Silêncio interno era padrão — hoje é luxo."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Janelas grandes com peitoril baixo"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Janelas grandes eram norma nas casas antigas — não por luxo, mas por necessidade de ventilação cruzada e iluminação natural. Peitoril baixo (60-80 cm do piso) permitia sentar próximo à janela e ver a rua."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Construção contemporânea reduziu janelas por economia de estrutura e vidro. Peitoril subiu pra 90-100 cm pra \"aproveitar\" a parede pra tomadas. Resultado: ambiente escuro, sem contato com o exterior, dependente de luz artificial."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Texturas naturais em vez de acabamentos lisos"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Piso de tacos, ladrilho hidráulico, azulejo esmaltado feito à mão, reboco áspero pintado. Cada superfície tinha textura. Cada textura absorvia luz, som e olhar de forma orgânica."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Contemporâneo é liso. Porcelanato acetinado, pintura acrílica polida, drywall perfeito. Bonito no papel — mas visualmente frio. O olho não tem onde descansar. O som ricocheteia."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Proporções à altura humana"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Casas antigas tinham corredor com 90-100 cm de largura. Portas de 90 cm. Ambientes com dimensão em relação ao corpo, não à economia estrutural."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Contemporâneo aperta. Corredor 80 cm (não passa cadeira de rodas). Portas 70-80 cm. Ambientes retangulares longos porque é o que cabe na modulação de laje."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Você não percebe conscientemente, mas seu corpo percebe. Casa antiga \"cabe\" você. Casa nova te empurra."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Por que essas decisões sumiram"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Três razões práticas:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Custo por m² construído."},{"type":"text","text":" Cada cm² a mais na parede é mais tijolo, mais argamassa, mais tempo. Pé-direito alto é mais laje pra sustentar, mais estrutura. Cada uma dessas decisões cresce o custo — e o mercado imobiliário optou pelo mais barato."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Aproveitamento de terreno."},{"type":"text","text":" Terreno urbano é caro. Densidade máxima por m² virou obsessão. Diminuir pé-direito, apertar cômodos, reduzir circulação — permitiu mais unidades por área."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Industrialização da construção."},{"type":"text","text":" Tijolo cerâmico moderno é mais rápido de assentar. Drywall é mais leve. Porcelanato é padronizado. Ganho de produtividade — em troca de sensorialidade."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que dá pra copiar em construções novas"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Não dá pra construir hoje como se construía em 1940. Custo seria proibitivo. Mas dá pra copiar alguns princípios sem estourar orçamento:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Pé-direito alto em pelo menos um ambiente (sala principal). Mesmo 3,00m vs 2,60m já muda a percepção."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Isolamento térmico e acústico com materiais modernos — lã de vidro, blocos cerâmicos duplos, vidros duplos. Reproduz o efeito de parede espessa por menos custo."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Janelas grandes com peitoril mais baixo. Custa menos que aparenta e transforma a experiência."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Textura no revestimento — madeira, cimento queimado, tijolo aparente. Um pouquinho de textura em um só ambiente já quebra a esterilidade."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Reforma boa é a que consegue trazer alguns desses elementos pra dentro da casa contemporânea. Se você tem uma casa e quer torná-la mais aconchegante sem construir do zero, converse comigo. Muitos desses princípios cabem em reforma."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto explora princípios arquitetônicos históricos aplicáveis hoje. Cada projeto tem particularidades — consulte profissional para aplicação específica."}]}]}
    ]
  }$doc$::jsonb,
  'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1600&q=80',
  'Interior de casa antiga com pé-direito alto, janelas grandes e piso de tacos de madeira',
  ARRAY['arquitetura','casa antiga','conforto térmico','história'],
  'Ana Laura Noronha',
  8,
  'Por que casas antigas são mais aconchegantes? Pé-direito alto, paredes espessas, texturas — o que a engenharia perdeu ao longo do século.',
  ARRAY['casa antiga aconchegante','pé direito alto','arquitetura tradicional','conforto casa'],
  true,
  now() - interval '18 days',
  false
) on conflict (slug) do nothing;


-- ------------------------------------------------------------
-- ARTIGO 16 — Regra 60-30-10
-- ------------------------------------------------------------
insert into public.articles (
  slug, category, title, subtitle, excerpt, content,
  cover_image, cover_alt, tags, author, reading_time_minutes,
  seo_meta_description, seo_keywords,
  is_published, published_at, is_featured
) values (
  'regra-60-30-10-design-de-interiores',
  'curiosidades',
  'A regra de ouro do design de interiores: proporção 60-30-10 explicada',
  'Uma regra simples que resolve 90% das dúvidas de paleta em qualquer ambiente. Você já a segue sem saber.',
  'Se você acha difícil combinar cores em decoração, a regra 60-30-10 é o atalho que designers usam há décadas. Simples, previsível, funciona.',
  $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Existe uma regra tão simples e tão eficaz no design de interiores que quase todo profissional a usa — mesmo sem citar em cliente. É a regra 60-30-10. E se você olhar pros ambientes que mais gosta em revistas ou Pinterest, provavelmente todos seguem essa proporção."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Neste texto, quero te explicar o que é, por que funciona, e como você pode aplicar hoje pra melhorar qualquer ambiente da sua casa sem obra nenhuma."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que é a regra 60-30-10"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A regra estabelece uma proporção de três cores num mesmo ambiente:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"60% — cor dominante."},{"type":"text","text":" A cor que ocupa a maior parte do ambiente. Geralmente vem de paredes, piso e principais superfícies."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"30% — cor secundária."},{"type":"text","text":" A cor que dá contraste. Geralmente vem de estofados, cortinas e mobiliário principal."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"10% — cor de acento."},{"type":"text","text":" A cor de destaque. Almofadas, quadros, plantas, objetos."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"É como o olho equilibra as informações visuais. Muito de uma cor sobrecarrega. Nada de contraste entedia. A proporção 60-30-10 dá hierarquia sem cansar."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Por que funciona"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Estudos de percepção visual mostram que o cérebro processa melhor informação com hierarquia clara. Três níveis é o número que a atenção humana consegue distinguir sem esforço. Dois é pouco (contraste raso); quatro é demais (parece bagunçado)."}]},
      {"type":"paragraph","content":[{"type":"text","text":"A proporção 60-30-10 também espelha a proporção que a natureza usa em paisagens — céu, terreno, elementos pontuais. Estamos calibrados evolutivamente pra achar essa proporção confortável."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Como aplicar em três passos"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você quer aplicar hoje em um cômodo específico:"}]},
      {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Passo 1: escolha a cor dominante (60%)"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Comece por essa. É a cor que vai definir o tom emocional do ambiente. Ambientes de descanso pedem cores neutras (bege, cinza claro, off-white). Ambientes sociais aceitam cores mais quentes (creme, terracota diluído). Ambientes de foco aceitam neutros frios (cinza-azulado)."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Essa cor vai aparecer nas paredes, no piso ou em superfícies grandes. Se você não vai pintar parede agora, considere a cor que já domina."}]},
      {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Passo 2: escolha a cor secundária (30%)"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Essa cor precisa contrastar com a dominante, mas não brigar. Se a dominante é neutra clara, a secundária pode ser um tom mais escuro ou mais quente. Se a dominante é neutra escura, a secundária pode ser um tom mais claro ou luminoso."}]},
      {"type":"paragraph","content":[{"type":"text","text":"A regra prática: se a dominante é do time \"quente\" (bege, terracota, creme), a secundária também é quente. Se é do time \"frio\" (cinza, azul-esverdeado, off-white puro), a secundária também é fria."}]},
      {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Passo 3: escolha a cor de acento (10%)"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Essa é a que pode ser \"forte\". Verde-oliva, mostarda, terracota queimada, azul-marinho, dourado. Um só tom, aplicado em três a cinco elementos pontuais: uma almofada, uma vela grande, um pequeno tapete, um vaso."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você espalhar a cor de acento por muitos objetos, ela vira secundária. Menos é mais aqui."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Exemplo prático: sala neutra com acento verde"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Sala com:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"60% — paredes off-white e piso de porcelanato bege claro."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"30% — sofá em linho grafite, poltrona em linho grafite, tapete em tons de cinza e bege."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"10% — três almofadas em verde-oliva, uma planta grande em vaso terracota, dois objetos em dourado escovado no aparador."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Essa sala funciona. Tem hierarquia clara, tem foco visual, é confortável, mas não é sem personalidade."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O erro que mais vejo"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Cliente vai comprando decoração sem pensar em proporção. Um sofá cinza, uma almofada azul, outra amarela, um tapete verde, uma cortina bege, um vaso rosa. Cada peça isolada é bonita. Junto, vira ruído visual."}]},
      {"type":"paragraph","content":[{"type":"text","text":"A solução é simples: reduza a paleta a três cores. Vá de todo o resto neutro. Menos vezes você vai olhar pra sala e sentir \"algo desafinado\"."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Quando romper a regra"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Toda regra tem exceção. Ambientes de arte, quartos infantis, espaços que celebram exuberância — podem ter mais de três cores. Mas mesmo aí, é bom começar com a proporção como base e desviar conscientemente, não por acaso."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você tem um ambiente que não flui e quer entender o que ajustar, converse comigo. Análise cromática rápida costuma resolver muito antes de comprar coisa nova."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto orienta princípios de composição cromática. Cada ambiente tem particularidades — consulte designer para análise específica."}]}]}
    ]
  }$doc$::jsonb,
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80',
  'Sala com paleta neutra bege dominante, sofá cinza e almofadas verde-oliva de destaque',
  ARRAY['paleta de cores','60-30-10','decoração','design'],
  'Ana Laura Noronha',
  6,
  'A regra 60-30-10 é o atalho que designers usam há décadas para combinar cores em interiores. Guia prático de aplicação em três passos.',
  ARRAY['regra 60 30 10','paleta cores decoração','como combinar cores','design interiores'],
  true,
  now() - interval '28 days',
  false
) on conflict (slug) do nothing;


-- ------------------------------------------------------------
-- ARTIGO 17 — 10 erros de decoração
-- ------------------------------------------------------------
insert into public.articles (
  slug, category, title, subtitle, excerpt, content,
  cover_image, cover_alt, tags, author, reading_time_minutes,
  seo_meta_description, seo_keywords,
  is_published, published_at, is_featured
) values (
  '10-erros-decoracao-engenheiros-identificam',
  'curiosidades',
  '10 erros clássicos de decoração que engenheiros identificam na primeira visita',
  'Nem sempre é sobre gosto. Alguns erros são técnicos — e explicam por que o ambiente "não flui".',
  'Se você tem um cômodo que "não funciona" e não sabe por quê, provavelmente está caindo em um destes dez erros. Todos são solúveis sem obra.',
  $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Quando um engenheiro ou arquiteto entra em um ambiente pela primeira vez, alguns erros saltam aos olhos. Não é sobre gosto — é sobre técnica. E o mais interessante é que a maioria desses erros tem solução simples, sem obra."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Vou compartilhar os dez erros que mais encontro em visita técnica. Se você reconhecer um deles no seu ambiente, corrigir vai transformar a experiência do dia a dia."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"1. Móveis grudados na parede"}]},
      {"type":"paragraph","content":[{"type":"text","text":"O sofá encostado na parede parece \"aproveitar espaço\", mas na verdade faz o ambiente parecer menor. O olho lê melhor quando há respiro entre superfícies grandes."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Solução: afaste sofás, aparadores e cabeceiras 10-20 cm da parede sempre que possível. O ambiente ganha volume visual."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"2. Tapete menor que o mobiliário"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Tapete que não pega os pés dianteiros do sofá + poltronas faz cada peça parecer isolada. Ambiente perde coesão."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Regra: o tapete precisa passar por baixo de todos os pés dianteiros do mobiliário principal. Se não pega, ele está pequeno demais."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"3. Quadros pendurados alto demais"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A maioria das pessoas pendura quadros na altura dos olhos em pé. Errado. Quando você senta no sofá, o quadro fica flutuando no alto da parede, sem relação com o mobiliário."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Regra: o centro do quadro deve ficar a 1,45m a 1,55m do piso — altura média dos olhos sentado + em pé. Sempre baixo do que o instinto pede."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"4. Cortina que não vai até o teto"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Cortina fixada no batente da janela recorta o ambiente e faz o pé-direito parecer mais baixo. Mesmo que o pé-direito seja baixo mesmo, o efeito visual piora."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Solução: fixar cortina a 5-10 cm abaixo do teto, com trilho longo o suficiente pra ir até quase o piso. Ambiente ganha altura e elegância."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"5. Iluminação de teto centralizada"}]},
      {"type":"paragraph","content":[{"type":"text","text":"O plafon único no centro do cômodo achata tudo. Já falei em outro artigo, mas repito: é o erro de iluminação mais comum e mais fácil de resolver."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Solução: pelo menos três pontos de luz em alturas diferentes. Abajur, luminária de piso, arandela — em qualquer combinação."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"6. Muitos pequenos objetos espalhados"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Superfícies (estante, aparador, mesa de centro) com muitos objetos pequenos criam ruído visual. O olho não descansa."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Regra prática: agrupe objetos em conjuntos ímpares (3, 5, 7), mantendo pelo menos 60% da superfície livre. Menos peças, mais impacto."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"7. Falta de contraste na paleta"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Ambiente todo em tons próximos (tudo bege, ou tudo cinza, ou tudo branco) vira monótono. Falta o \"acento\" pra dar hierarquia."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Solução: aplique a regra 60-30-10. Escolha uma cor de acento e aplique em 3-5 pontos pequenos."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"8. Escala errada do sofá"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Sofá grande demais em ambiente pequeno sufoca. Sofá pequeno demais em ambiente grande parece perdido. Escala matters."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Regra: o sofá não deve ocupar mais de 60% da parede em que fica encostado. E deve deixar circulação de pelo menos 60-80 cm entre ele e mesa de centro."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"9. Falta de textura"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Ambiente com todas superfícies lisas (porcelanato acetinado, pintura polida, mobiliário laqueado) vira frio. O olho não tem onde \"descansar\"."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Solução: adicione pelo menos duas texturas por ambiente. Tapete de fibra natural, manta de linho no sofá, planta grande, cesto trançado, quadro com moldura de madeira. Não precisa mudar acabamento — só adicionar."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"10. Nada em pé"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Ambiente com tudo baixo (sofá, poltrona, mesa) fica \"chapado\". Falta hierarquia vertical."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Solução: adicione pelo menos um elemento em pé. Estante alta, planta de porte grande, quadro grande vertical, cortina longa. Dá dimensão vertical ao ambiente."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Como fazer o diagnóstico"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você tem um cômodo que \"não funciona\" e não sabe o motivo, tire uma foto do ambiente e revisite essa lista. Provavelmente vão aparecer 3-4 desses erros ao mesmo tempo — e corrigi-los, mesmo sem investir em móvel novo, muda a experiência."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se quiser diagnóstico mais aprofundado e sugestões específicas pro seu ambiente, converse comigo. Consulta de curadoria rápida costuma revelar muito."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto é orientação prática sobre composição de interiores. Cada ambiente tem particularidades — para diagnóstico completo consulte profissional."}]}]}
    ]
  }$doc$::jsonb,
  'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80',
  'Sala minimalista com tapete grande, cortina até o teto e quadros bem posicionados',
  ARRAY['erros decoração','dicas','decoração','composição'],
  'Ana Laura Noronha',
  8,
  '10 erros clássicos de decoração que engenheiros identificam na primeira visita. Do tapete pequeno ao quadro alto demais — tudo com solução prática.',
  ARRAY['erros decoração','dicas decoração','como decorar','ambiente não funciona'],
  true,
  now() - interval '38 days',
  false
) on conflict (slug) do nothing;
