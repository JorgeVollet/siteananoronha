-- ============================================================
-- UPDATE v2 — Bloco C: Normas Técnicas 9-13
-- Ajuste leve: remove "vejo cliente após cliente..." e similares
-- (as normas já eram majoritariamente técnicas — poucos retoques)
-- ============================================================

-- ------------------------------------------------------------
-- ARTIGO 9 — NBR 15575 · ajuste na seção final
-- ------------------------------------------------------------
update public.articles
set
  content = $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Se você vai construir, comprar ou reformar uma casa ou apartamento, existe uma norma técnica que define o mínimo que a construção deve entregar em qualidade — e a maioria dos brasileiros nunca ouviu falar dela. É a NBR 15575, conhecida como Norma de Desempenho."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Neste guia, quero explicar em linguagem acessível o que é essa norma, o que ela exige, como ela protege o consumidor, e por que ela deveria ser exigida por todo cliente antes de aceitar uma entrega."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que é a NBR 15575"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A NBR 15575 é uma norma técnica brasileira publicada pela ABNT (Associação Brasileira de Normas Técnicas) em 2013 e revisada em 2021. Ela estabelece requisitos mínimos de desempenho que edificações habitacionais devem cumprir — em segurança, habitabilidade, sustentabilidade e durabilidade."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Em português claro: ela diz qual é o mínimo aceitável de qualidade de uma casa ou apartamento. Não é sugestão. É norma técnica com força legal, referenciada pelo Código de Defesa do Consumidor e pelo Programa Minha Casa Minha Vida."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Por que ela existe"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Antes de 2013, o Brasil não tinha padrão nacional de desempenho residencial. Cada construtora entregava o que achava aceitável, e o cliente descobria depois — geralmente com goteira, mofo, isolamento acústico ruim ou piso trincado."}]},
      {"type":"paragraph","content":[{"type":"text","text":"A NBR 15575 nasceu justamente para dar critério objetivo. Se sua parede não isola o ruído do vizinho no nível X, ela não cumpre a norma. Se a laje não suporta carga Y, não cumpre a norma. Se a impermeabilização não dura Z anos, não cumpre a norma."}]},
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
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Como a NBR 15575 protege o consumidor"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Cinco direitos concretos que existem por causa dessa norma:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Exigir memorial de desempenho antes de assinar contrato."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Recusar entrega de imóvel que não cumpre nível mínimo (M)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Acionar construtora judicialmente por vícios ocultos referenciados na norma."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Garantia estendida — a vida útil declarada pela construtora tem que corresponder ao que a norma exige."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Reparação sem custo em problemas de desempenho durante o período de garantia legal."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que a norma não cobre"}]},
      {"type":"paragraph","content":[{"type":"text","text":"É importante ser honesta: a NBR 15575 é uma norma de desempenho, não de estética. Ela não protege de layout ruim, marcenaria mal projetada, iluminação inadequada. Ela cobre o \"esqueleto\" da construção — não o \"vestido\"."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Para reformas de imóveis existentes, a norma não é retroativa. Se um prédio é de 1990, não se pode exigir dele o que a norma passou a exigir em 2013. Mas é possível exigir de reformas atuais que respeitem a norma vigente."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que fazer se você suspeita que não foi cumprida"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você comprou imóvel novo e desconfia que a norma não foi cumprida (barulho excessivo, mofo persistente, trincas, infiltração), a sequência é:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Documente com fotos e vídeos datados."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Notifique formalmente a construtora por escrito (email, carta registrada)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Contrate perícia técnica independente — laudo com fundamentação na NBR 15575."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Procure Procon ou ação judicial se a construtora não resolver."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Por que essa norma importa tanto"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Na minha visão, essa é uma das normas mais subutilizadas pelo consumidor brasileiro. Muita gente descobre a NBR 15575 tarde demais — depois de anos morando com problema que poderia ter sido reclamado no primeiro ano."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você vai comprar ou construir, peça memorial de desempenho. Se vai reformar, exija que o projeto respeite a norma vigente. E se tem um problema atual, pode ser que a norma esteja a seu favor."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se ficou dúvida sobre como a NBR 15575 se aplica ao seu caso específico, converse comigo. Faço análise inicial e oriento nos próximos passos."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto é orientação geral sobre a NBR 15575. Não substitui laudo técnico profissional. Para casos concretos, sempre consulte engenheiro civil ou arquiteto."}]}]}
    ]
  }$doc$::jsonb
where slug = 'nbr-15575-norma-de-desempenho-explicada';

-- Artigos 10, 11, 12 e 13 já são majoritariamente técnicos e não têm
-- fabricações de vivência — sem alterações de conteúdo necessárias.
-- Se quiser reforçar, uma leitura rápida vai mostrar que estão limpos.
