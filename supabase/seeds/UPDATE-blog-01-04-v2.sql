-- ============================================================
-- UPDATE v2 — Refatoração editorial
-- Bloco A: Blog artigos 1-4
--
-- MUDANÇA: voz da Ana em primeira pessoa (opinião profissional legítima),
-- SEM casos inventados de clientes, SEM diálogos fabricados,
-- SEM afirmações de vivência ("vi", "aprendi com dezenas", "cliente meu").
--
-- Autoridade agora vem de: conhecimento técnico, normas ABNT, dados de
-- mercado, opinião profissional declarada.
-- ============================================================

-- ------------------------------------------------------------
-- ARTIGO 1 — Quanto custa reformar
-- ------------------------------------------------------------
update public.articles
set
  subtitle = 'Do metro quadrado à surpresa no final: entenda como um orçamento de reforma se forma de verdade — e por que a maioria estoura o previsto.',
  excerpt = 'Se você está pensando em reformar e recebeu números diferentes para o mesmo projeto, isso é normal. O problema não é a variação — é o que raramente é explicado antes de assinar.',
  content = $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Se você está pesquisando quanto custa reformar uma casa, provavelmente já recebeu respostas muito diferentes para o mesmo projeto. Um marceneiro sugere um valor, o pedreiro outro, o vizinho conta que o dele saiu por metade. E aí surge a confusão — às vezes até o medo de começar."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Uma reforma é uma das decisões financeiras mais complexas que a maioria das pessoas toma. E o problema quase nunca é o valor em si — é a falta de clareza sobre o que compõe esse valor. Neste texto, quero explicar como um orçamento honesto é montado, quais são os itens invisíveis que costumam engolir 20-30% do previsto, e o que fazer para chegar ao fim da obra sem sustos."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Por que existe tanta variação nos orçamentos"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Cada profissional monta um orçamento a partir do que consegue enxergar do projeto. E aqui está o ponto central: quanto mais detalhado o projeto, mais preciso o orçamento. Quando você recebe três propostas com valores muito diferentes, geralmente cada um está orçando um projeto ligeiramente diferente na cabeça dele."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Um profissional pode considerar troca completa de piso, outro apenas nivelamento. Um pode incluir instalação elétrica nova, outro só ampliação de tomadas. Isso não é necessariamente má-fé — é interpretação. E é exatamente por isso que a fase de projeto executivo existe: para que todos estejam orçando a mesma coisa."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Os 5 blocos de custo que existem em toda reforma"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Independente do porte, todo orçamento de reforma se divide em cinco grandes blocos. Se algum deles estiver ausente da sua proposta, é motivo para atenção:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Demolição e preparação:"},{"type":"text","text":" remoção do que existe, limpeza, descarte de entulho. Costuma representar 5-8% do total, podendo chegar a 15% em reformas de imóveis mais antigos."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Infraestrutura oculta:"},{"type":"text","text":" hidráulica, elétrica, forro, alvenaria. É o que não fica visível depois da obra pronta, mas responde por 25-40% do custo total."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Acabamentos:"},{"type":"text","text":" pisos, revestimentos, tintas, louças, metais. A parte visível. Onde a maioria das pessoas concentra a atenção — e onde é mais fácil errar para mais ou para menos."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Marcenaria e mobiliário sob medida:"},{"type":"text","text":" armários, painéis, portas. Costuma pesar 15-25% em residências. Quando bem projetada, evita o retrabalho mais caro que existe — refazer uma marcenaria feita errada."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Gestão e imprevistos:"},{"type":"text","text":" honorários do responsável técnico, ART, taxas, e o mais importante — a reserva para o inevitável. Eu sempre recomendo orçar 10-15% além do previsto."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Faixas de investimento por metro quadrado (2026)"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Números são referências, não regras. Cada obra tem particularidades. Mas para servir como ponto de partida, essas são as faixas praticadas hoje no mercado:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Reforma padrão médio:"},{"type":"text","text":" R$ 1.800 a R$ 2.800 por m². Acabamentos nacionais bons, marcenaria estruturada, projeto adequado."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Reforma padrão alto:"},{"type":"text","text":" R$ 2.800 a R$ 4.500 por m². Acabamentos importados ou premium nacionais, marcenaria com detalhamento autoral, projetos executivos completos."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Reforma alto luxo:"},{"type":"text","text":" a partir de R$ 4.500 por m². Peças importadas, marcenaria autoral, curadoria completa, gestão dedicada."}]}]}
      ]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","text":"O metro quadrado sozinho não diz tudo. Uma cozinha de 8 m² costuma custar mais que um quarto de 15 m², porque cada ambiente tem sua própria complexidade."}]}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Os cinco itens invisíveis que engolem o orçamento"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Na minha visão, os estouros de orçamento raramente vêm de onde as pessoas esperam. Não é o mármore da bancada que estraga a conta — é a soma dos pequenos:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Frete e taxa de instalação"},{"type":"text","text":" de louças, metais e mobiliário sob medida. Raramente somados na hora da escolha."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Adaptações elétricas de eletrodomésticos."},{"type":"text","text":" A cooktop nova exige 220V; a máquina de lavar louça exige saída específica. Cada uma tem custo."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Impermeabilização de áreas úmidas."},{"type":"text","text":" Algumas propostas cortam esse item para parecerem competitivas. Se falha, o custo do reparo posterior é bem maior."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Descarte de entulho e limpeza final."},{"type":"text","text":" Uma obra média gera cerca de duas caçambas de entulho. Cada uma custa entre R$ 400 e R$ 800."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Iluminação especial e automação."},{"type":"text","text":" Trilhos, spots dimerizáveis, cortinas motorizadas — decisões que costumam surgir no meio do caminho e viram aditivos."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Como pedir um orçamento que faça sentido"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Para receber propostas realmente comparáveis, é preciso dar aos profissionais o mesmo ponto de partida. Eu recomendo:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Contratar um projeto executivo antes de pedir orçamento de execução. Sem isso, você está pedindo achismo."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Especificar materiais e marcas — nem que seja de referência. \"Porcelanato retificado 60x60\" custa metade de \"porcelanato importado premium\"."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Pedir orçamento discriminado por ambiente, não em bloco único. É a única forma de comparar propostas linha a linha."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Estabelecer cronograma físico-financeiro. Obra que começa sem cronograma começa sem freio."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"A pergunta que faz diferença"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Na minha opinião, a pergunta não é \"quanto custa reformar\". É \"quanto custa reformar do jeito que eu preciso, com o padrão que quero, no prazo que faz sentido para a minha vida\". Essas três variáveis mudam tudo. E é aí que um projeto integrado — com engenharia, projetista e gestão de obra na mesma mão — pode fazer diferença: reduzindo retrabalho, que é o custo que orçamento nenhum consegue prever."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você está começando a planejar sua reforma e busca clareza antes de contratar, podemos conversar. Trabalho com propostas transparentes e escopo detalhado, para que cada etapa fique bem definida."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto tem caráter informativo. Os valores mencionados são referências médias de mercado em 2026 e podem variar conforme região, complexidade e época. Sempre solicite orçamento formal com escopo específico."}]}]}
    ]
  }$doc$::jsonb,
  reading_time_minutes = 8
where slug = 'quanto-custa-reformar-uma-casa';


-- ------------------------------------------------------------
-- ARTIGO 2 — Como escolher projetista
-- ------------------------------------------------------------
update public.articles
set
  subtitle = 'Antes de assinar o primeiro contrato, entenda o que separa um bom profissional de uma escolha cara.',
  excerpt = 'Escolher a pessoa que vai desenhar o seu projeto é uma das decisões mais importantes de qualquer obra. Aqui estão os sinais que valem observar antes de fechar contrato.',
  content = $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"A pessoa que vai desenhar sua casa passa meses convivendo com você — ouvindo o que você sonha, o que te incomoda, o que às vezes você nem sabe descrever. Se essa relação começa torta, tudo depois fica mais difícil. Se começa certa, o projeto flui e a obra também."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Existem alguns sinais que costumam aparecer logo nas primeiras conversas. Não são regras rígidas — são orientações práticas que ajudam a filtrar quem trabalha bem de quem apenas vende bem. Quero compartilhar com você."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Sinal 1: quem pergunta pouco, entrega pouco"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Na primeira reunião, quem faz mais perguntas — você ou o profissional? Se ele começa mostrando portfólio antes de entender como você vive, é um alerta. Um bom projetista quer saber a que horas você acorda, se você cozinha muito ou pouco, quantas pessoas moram na casa, se você recebe visitas, se dorme com a porta aberta. Tudo isso influencia o projeto."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se a primeira reunião durou 30 minutos e você já saiu com contrato assinado, é provável que o projeto siga um manual — bonito, mas não seu."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Sinal 2: preço redondo demais"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Um orçamento de projeto que vem em número redondo (R$ 5.000, R$ 10.000), sem escopo detalhado, costuma ser sinal de precificação por chute. E chute frequentemente vira aditivo. Um profissional que trabalha com método entrega proposta discriminada: quantas plantas, quantas revisões, quantas visitas técnicas, o que é executivo e o que não é."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Sinal 3: promessa de prazo muito curto"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Um projeto executivo residencial completo leva, em média, de 60 a 90 dias. Quem promete entregar em duas semanas geralmente está oferecendo layout, não projeto executivo. E layout costuma cair na primeira revisão — porque falta detalhamento, compatibilização e as pranchas técnicas necessárias para a obra."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Sinal 4: não pergunta seu orçamento"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Parece óbvio, mas acontece com frequência: o profissional entrega um projeto lindo, o cliente se apaixona, e na hora do orçamento de execução descobre que o valor é o dobro do que tem. Um bom projetista pergunta seu orçamento no início e projeta dentro dele. Não elevar a régua sem alinhamento é ética profissional básica."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Sinal 5: portfólio genérico ou repetitivo"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se todos os projetos do portfólio parecem do mesmo cliente — mesma paleta, mesmo estilo, mesmos móveis — o profissional projeta a estética dele, não a sua. Bom projeto costuma refletir a personalidade do cliente, não a do escritório. Peça para ver três projetos diferentes e observe: cada um deveria contar uma história distinta."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Sinal 6: não fala sobre execução"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Projeto que não considera como será construído gera projeto lindo no papel e caro na obra. Um profissional experiente conhece as limitações práticas: altura de forro possível, o que a estrutura suporta, como um encanamento se resolve. Se essas preocupações não aparecem na conversa, é provável que apareçam no dia da obra."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Sinal 7: comunicação difícil desde o começo"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se demora dois dias para responder uma pergunta simples no WhatsApp, cancela reuniões, chega atrasado — na fase de proposta, quando ainda está tentando fechar contrato — dificilmente vai melhorar depois. Comunicação difícil no começo costuma virar comunicação impossível no meio da obra. Confie no que você está percebendo."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que perguntar antes de fechar"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você quer levar uma checklist para a primeira reunião, essas cinco perguntas ajudam bastante a separar quem trabalha bem de quem vende bem:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"O que está incluso no escopo? (revisões, visitas, executivo, ART)"}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Como funciona a etapa de revisão? Quantas rodadas incluem?"}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Você acompanha a execução ou só entrega o projeto?"}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Como lida com mudanças de escopo no meio?"}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Posso conversar com clientes anteriores?"}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O sinal mais importante"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Todo o resto pode estar impecável no papel. Mas se depois da primeira conversa você saiu com uma sensação estranha, vale escutar isso. Uma reforma dura meses. Uma casa dura décadas. A pessoa que vai desenhar precisa ser alguém em quem você confia — não só tecnicamente, mas humanamente."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você está começando essa busca e quer conversar sem compromisso, é só chamar. Explico como trabalho, escuto seu projeto, e a decisão fica com você."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto é orientação geral. Cada relação profissional é única — use os sinais como referência, não como veredicto."}]}]}
    ]
  }$doc$::jsonb,
  reading_time_minutes = 7
where slug = 'como-escolher-projetista-sem-se-arrepender';


-- ------------------------------------------------------------
-- ARTIGO 3 — Marcenaria sob medida vs pronto (REFEITO INTEGRALMENTE)
-- Sem o "caso de cliente" fabricado
-- ------------------------------------------------------------
update public.articles
set
  subtitle = 'Custo, prazo, durabilidade e aproveitamento de espaço — os critérios reais para decidir com informação, não com achismo.',
  excerpt = 'Se você está entre investir em marcenaria sob medida ou comprar móveis prontos, provavelmente já ouviu opiniões extremas dos dois lados. Aqui vai o comparativo por variáveis técnicas — sem marketing.',
  content = $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Vale mais a pena investir em marcenaria sob medida ou compensar com móveis prontos? A resposta honesta é: depende. Mas o \"depende\" precisa vir com critérios objetivos, senão vira desculpa."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Neste texto, quero comparar as três variáveis que decidem essa conta — custo por metro linear, vida útil esperada e o que raramente entra no cálculo: o custo do desperdício de espaço."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O custo real, não o preço de vitrine"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Considere uma cozinha de quatro metros lineares em duas configurações possíveis:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Modular de grande marca:"},{"type":"text","text":" MDF branco padrão, ferragens de linha básica, módulos de 30/40/60 cm. Faixa de preço em 2026: R$ 15 mil a R$ 20 mil, com prazo médio de 30 dias."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Sob medida com marceneiro qualificado:"},{"type":"text","text":" MDF com acabamento premium (foil, laca ou padrão importado), ferragens Blum ou Hettich, puxador embutido, bancada em quartzo. Faixa: R$ 24 mil a R$ 30 mil, com prazo médio de 45 dias."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"A diferença bruta parece grande — cerca de 40% a mais. Mas existe uma variável quase sempre esquecida: o aproveitamento real de espaço. Módulos padrão trabalham em incrementos de 30, 40 e 60 cm. Em um vão de 4 metros, isso costuma resultar em faixas laterais \"sobrando\" de 10 a 30 cm — espaço perdido em cada extremidade."}]},
      {"type":"paragraph","content":[{"type":"text","text":"O sob medida, por definição, aproveita 100% do vão. Ganha gavetas extras, bancada mais longa, aproveitamento de altura completa. Se você somasse o custo de \"resolver\" o espaço perdido depois (com módulos avulsos, prateleiras extras ou marcenaria pontual), a diferença real cai bastante — algo em torno de 15-20% a mais, não os 40% aparentes."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"A vida útil que ninguém compara"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Móveis modulares bons costumam durar 8 a 12 anos em uso doméstico. Marcenaria sob medida bem feita costuma durar 20 a 30 anos. Não porque o material é muito diferente — quase todos usam MDF de fornecedores parecidos — mas por três motivos práticos:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Ferragens."},{"type":"text","text":" Módulos usam ferragens de custo controlado (60-80 mil ciclos). Sob medida qualificado usa Blum ou Hettich (200 mil ciclos ou mais). É a diferença entre gavetas que travam em 5 anos e gavetas que continuam macias em 20."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Encaixes e reforços."},{"type":"text","text":" Módulos precisam ser desmontáveis para envio, o que sacrifica rigidez. Sob medida é instalado inteiro, com reforços onde precisa."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Acabamento de borda."},{"type":"text","text":" Modulares costumam usar fita de borda mais fina (0,45mm). Marcenarias premium usam PVC 2mm com colagem laser. Diferença invisível no dia da entrega, evidente em 3 anos."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Quando o modular é a escolha certa"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Sob medida nem sempre é a resposta. Existem cenários em que o modular faz mais sentido:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Você mora de aluguel ou pretende mudar em 3-5 anos. O investimento adicional não se paga."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Ambientes com paredes retas e sem elementos estruturais irregulares. Modular encaixa bem em geometrias simples."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Móveis de curta permanência — quarto de bebê que vira quarto de criança em cinco anos, por exemplo."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Quando sob medida é a escolha clara"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se seu ambiente tem qualquer uma dessas características, o sob medida costuma se pagar sozinho:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Paredes tortas, colunas embutidas, vigas rebaixadas, janelas irregulares."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Necessidade de aproveitar altura (armários até o teto de 2,80m — modular padrão para em 2,10m)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Design integrado com o projeto — puxadores embutidos, marcenaria alinhada com forro e revestimentos."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Cozinha ou área de serviço, onde durabilidade importa mais que em qualquer outro ambiente da casa."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O terceiro caminho pouco discutido"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Existe uma opção intermediária que raramente aparece nas conversas: modular estruturado com peças sob medida pontuais. Você usa um sistema modular bom e complementa com peças de encerramento (nichos, revestimentos de coluna, prateleiras específicas) feitas por marceneiro. Fica 15-20% acima do modular puro, mas resolve o desperdício de espaço."}]},
      {"type":"paragraph","content":[{"type":"text","text":"É uma solução interessante para quem quer investir com equilíbrio, sem pagar o preço integral do sob medida completo. Mas exige um projetista fazendo a compatibilização — porque combinar modular com peça avulsa sem projeto vira mistura visualmente desconexa."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"A pergunta que decide"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você pretende usar esse ambiente por 10 anos ou mais, na minha opinião faz sentido investir em sob medida. O custo por ano de uso costuma ser menor. Se o prazo é mais curto, modular bem escolhido resolve com economia."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se está em dúvida sobre qual caminho faz sentido para a sua obra, podemos conversar. Faço uma análise honesta do seu caso e apresento os números aplicáveis à sua situação específica."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Valores citados são referências de mercado em 2026, com variação regional. Sempre confirme com orçamento formal para sua obra específica."}]}]}
    ]
  }$doc$::jsonb,
  reading_time_minutes = 8
where slug = 'marcenaria-sob-medida-vale-a-pena';


-- ------------------------------------------------------------
-- ARTIGO 4 — Reforma ou construir do zero
-- ------------------------------------------------------------
update public.articles
set
  subtitle = 'Nem sempre reformar é mais barato. Nem sempre construir é a resposta. Os critérios técnicos para decidir com base em fatos.',
  excerpt = 'A pergunta parece simples, mas envolve variáveis que raramente aparecem no primeiro cálculo. Prazo, valor de mercado, potencial de valorização — cada um pesa diferente na sua realidade.',
  content = $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Você tem um terreno ou uma casa que precisa ser mexida. A pergunta que surge com frequência é: vale mais reformar ou derrubar e construir do zero? A resposta depende de fatores objetivos — não do gosto pessoal. O que decide não é preferência estética. É uma conta específica que quero ajudar você a fazer."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Existem quatro critérios que uso quando alguém chega com essa dúvida. Nenhum deles é sobre estilo. Todos são sobre viabilidade — técnica, financeira e emocional."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Critério 1: o que a estrutura ainda aguenta"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Antes de qualquer decisão estética, existe uma pergunta técnica que precisa de resposta: como está a estrutura? Fundação, alvenaria portante, cobertura, laje. Se algum desses elementos tem comprometimento sério, a reforma pode custar mais que a construção nova."}]},
      {"type":"paragraph","content":[{"type":"text","text":"É comum encontrar situações em que o cliente queria \"só uma reforma\" e, ao abrir uma parede, descobre-se rachadura estrutural que exige reforço de fundação. O que seria uma reforma de R$ 80 mil pode virar uma obra de R$ 220 mil. Um laudo estrutural inicial, feito antes do projeto, evita essa surpresa."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Critério 2: quanto do existente você quer manter"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você quer mudar layout, aumentar pé-direito, mover paredes, refazer instalações — a reforma vira, na prática, uma construção com paredes velhas. E paredes velhas têm custo de manutenção."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Uma regra prática que costumo aplicar: se a intenção é preservar menos de 40% da estrutura original, construir do zero costuma sair mais barato e mais rápido. Se a intenção é preservar mais de 60%, reformar costuma vencer. Entre esses dois valores, é análise caso a caso."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Critério 3: valor de mercado do imóvel"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Esse é o critério que muitas vezes é evitado, mas todo profissional honesto vai apresentar: quanto vale seu imóvel hoje, e quanto vale depois de reformado?"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você tem uma casa avaliada em R$ 400 mil e planeja gastar R$ 300 mil de reforma, dificilmente ela vai valer R$ 700 mil no mercado. Vai valer talvez R$ 550 mil — porque o teto de valorização é o do bairro, não o do seu investimento."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Isso não significa que não valha a pena reformar. Significa que é importante entrar sabendo. Se é sua casa dos sonhos e você vai morar 20 anos nela, o valor de mercado importa menos. Se é investimento, ele decide tudo."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Critério 4: prazo e previsibilidade"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Construção do zero tem prazo mais previsível — começa e termina em cronograma definido. Reforma costuma trazer surpresas. Um pedreiro descobre encanamento diferente do esperado, uma laje precisa de reforço, um projeto elétrico não bate com o existente."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você tem prazo apertado (precisa mudar em 4 meses, casamento marcado, contrato de aluguel vencendo), construção geralmente entrega antes. Reforma bem gerenciada dura 3-6 meses; mal gerenciada, pode passar de um ano."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"A conta rápida que ajuda"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Para fazer uma estimativa preliminar antes de contratar um profissional, esses são valores de referência (2026):"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Reforma:"},{"type":"text","text":" R$ 1.800 a R$ 3.500 por m². Depende do escopo do que vai ser mexido."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Construção do zero:"},{"type":"text","text":" R$ 2.400 a R$ 4.200 por m². Terreno não incluso."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Demolição + construção:"},{"type":"text","text":" adicione R$ 200 a R$ 400 por m² se precisar derrubar."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Multiplique pela área que você tem. Compare com o valor de venda do imóvel e do bairro. A resposta costuma aparecer."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que eu recomendo antes de decidir"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você está entre reformar e construir, esses três passos ajudam a decidir com base em dados:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Contrate um laudo estrutural básico. Custa entre R$ 800 e R$ 2.500 e evita surpresa de dezenas de milhares."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Faça duas simulações de custo — uma de reforma completa, outra de demolição + construção nova. Se possível com o mesmo profissional, para comparar critérios iguais."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Consulte um corretor de confiança sobre o teto de valorização do bairro. Se você vai gastar mais do que o mercado paga, saber isso antes muda a decisão."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você está nesse momento e quer conversar sem compromisso, posso ajudar com essa análise inicial. Considero seu imóvel, seu prazo, seu objetivo — e apresento qual caminho tem mais chance de dar certo para você."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto é orientação geral. Valores citados são referências de mercado em 2026 e variam por região. Sempre consulte laudo técnico específico para seu imóvel."}]}]}
    ]
  }$doc$::jsonb,
  reading_time_minutes = 9
where slug = 'reforma-ou-construir-do-zero';
