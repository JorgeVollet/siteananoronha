-- ============================================================
-- UPDATE v2 — Bloco B: Blog artigos 5-8
-- Remove fabricações de experiência, mantém voz em 1ª pessoa
-- (opinião profissional, não vivência inventada)
-- ============================================================

-- ------------------------------------------------------------
-- ARTIGO 5 — Cronograma de obra
-- ------------------------------------------------------------
update public.articles
set
  content = $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Se você já reformou ou conhece alguém que reformou, provavelmente ouviu a mesma história: \"o cronograma era de 90 dias, terminou em 180\". A frase virou piada, mas por trás dela existe uma verdade dura: atraso de obra não é acaso — é resultado previsível de decisões que foram (ou deixaram de ser) tomadas antes da primeira picareta."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Quero explicar as três causas reais de atraso, quando cada uma acontece, e o que é possível fazer para diminuir muito o risco na sua obra."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Causa 1: projeto incompleto"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A primeira causa é quase sempre a mesma: começar sem projeto executivo. Layout bonito, moodboard lindo, plantas iniciais — mas sem detalhamento técnico. Aí no meio da obra a decisão é tomada in loco, com pedreiro no pé, e cada decisão custa dias."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Projeto executivo bom tem detalhamento de pontos elétricos, hidráulicos, alturas de forro, especificações de marcenaria, layouts de porcelanato. Quando o pedreiro chega, ele executa. Quando não tem, ele espera. E cada espera custa dinheiro."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Causa 2: mudança de escopo no meio"}]},
      {"type":"paragraph","content":[{"type":"text","text":"O segundo motivo mais comum é a mudança durante a execução. \"Ah, gostei mais desse revestimento.\" \"Vamos mudar a posição da pia.\" \"Achei um piso melhor.\" Cada uma dessas parece pequena, mas dispara efeito dominó: recomprar material, redimensionar, refazer, esperar chegar, esperar secar."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Mudanças no papel custam borracha. Mudanças na obra custam tempo real. Uma revisão pequena antes da compra do material costuma ser resolvida em duas semanas. A mesma mudança depois da chegada do material pode significar dois meses."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Causa 3: falta de gestão do canteiro"}]},
      {"type":"paragraph","content":[{"type":"text","text":"O terceiro motivo é operacional: ninguém gerenciando. Contrata-se o pedreiro, o marceneiro, o eletricista, o pintor — todos separados. E aí ninguém coordena. O eletricista quer fazer a fiação, mas o pedreiro ainda não terminou a alvenaria. O pintor chega, mas o gesseiro atrasou. Todo mundo esperando, e ninguém responsável."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Um bom gestor de obra faz basicamente três coisas: prevê a sequência certa, cobra os prazos, e resolve conflito antes de virar problema. Sem isso, a obra vira quebra-cabeça sem instruções."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O cronograma que funciona de verdade"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Um cronograma sério tem essas quatro características. Se falta alguma, ele tende a atrasar:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"É físico-financeiro."},{"type":"text","text":" Não é só \"quando termina\". É quanto custa em cada etapa, para que ninguém pague de menos ou de mais no meio."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Tem marcos claros."},{"type":"text","text":" Fim da demolição, fim da estrutura, chegada dos móveis. Marcos são pontos de conferência — não deu certo? Ajusta antes de seguir."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Considera folga."},{"type":"text","text":" Bom cronograma tem 15-20% de folga entre etapas. Sem folga, o atraso de uma etapa contamina tudo."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"É revisado semanalmente."},{"type":"text","text":" Cronograma que fica no papel é história. Bom cronograma é atualizado toda semana com o status real."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Prazo real vs. prazo prometido"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Uma última reflexão. É comum profissionais prometerem prazo curto para fechar contrato, mesmo sabendo que vão atrasar. Depois vem a desculpa (\"choveu\", \"faltou material\", \"trabalhador não veio\") e a obra rola."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Na minha opinião, é mais honesto — e melhor para todos — quem apresenta prazo realista com folga. Vai parecer que demora mais, mas costuma terminar quando prometeu. E o preço final costuma ser o combinado — não o combinado + aditivos + estresse."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você quer entender como estruturo o cronograma nas obras que assumo, posso apresentar uma proposta inicial explicando cada etapa. Podemos conversar quando quiser."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto é orientação geral sobre cronograma. Cada obra tem particularidades — o cronograma real é feito depois do projeto executivo concluído."}]}]}
    ]
  }$doc$::jsonb
where slug = 'cronograma-de-obra-por-que-atrasam';


-- ------------------------------------------------------------
-- ARTIGO 6 — Contratei uma engenheira
-- ------------------------------------------------------------
update public.articles
set
  content = $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Uma pergunta comum entre quem está começando um projeto: \"preciso mesmo de uma engenheira ou só um designer de interiores basta?\" Depende do escopo. Quero mostrar o que muda quando você tem engenharia no projeto — principalmente porque as respostas nem sempre são as óbvias."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Não vou tentar convencer ninguém a contratar engenharia. Vou mostrar o que muda tecnicamente e o que muda no dia a dia da obra."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que designer de interiores faz (e faz bem)"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Antes de qualquer coisa: designer de interiores bom faz coisa maravilhosa. Curadoria de mobiliário, paleta de cores, iluminação, texturas, mistura de estilos. É a alma do projeto. Não é substituível por engenharia."}]},
      {"type":"paragraph","content":[{"type":"text","text":"O que designer não faz — e não é a função dele — é responder por questões estruturais, elétricas, hidráulicas, ART, projeto executivo aprovado em prefeitura. Isso é engenharia."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que muda com engenharia no time"}]},
      {"type":"paragraph","content":[{"type":"text","text":"O que muda na prática. Alguns pontos são invisíveis para quem está começando, mas fazem toda a diferença no meio da obra:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Viabilidade estrutural das ideias."},{"type":"text","text":" Quer derrubar essa parede? Engenharia verifica se é portante. Quer aumentar o vão? Sabe se precisa de viga de reforço. Quer ilha na cozinha? Verifica se a laje aguenta o peso de granito + carga viva."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Projeto elétrico responsável."},{"type":"text","text":" Não é só definir onde vai a tomada. É calcular o quadro geral, dimensionar disjuntores, prever aumento futuro. E emitir ART — que é o que a seguradora exige se algo der errado."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Projeto hidráulico integrado."},{"type":"text","text":" Nova bancada de cozinha com ilha exige nova prumada. Chuveiro extra exige aquecedor maior. Engenharia calcula, dimensiona, valida."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Aprovação em condomínio ou prefeitura."},{"type":"text","text":" Alteração de fachada, ampliação, muro, laje. Tudo isso precisa de projeto assinado por engenheiro civil. Sem isso, não se legaliza — e vira problema em venda ou inventário depois."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Compatibilização de projetos."},{"type":"text","text":" Elétrico não bate com hidráulico? Marcenaria colide com viga? Engenharia costura tudo antes da obra começar. Sem isso, cada colisão vira retrabalho na obra."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Quando dá para ir só de designer"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Nem toda reforma exige engenheiro. Se você vai fazer só:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Pintura, papel de parede, mobiliário novo."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Troca de piso sem mexer em contrapiso."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Marcenaria em ambientes existentes (sem mudar estrutura)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Iluminação simples aproveitando os pontos que já existem."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Para isso, designer de interiores basta — e vai fazer melhor do que engenheiro faria, porque é a especialidade dele."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Quando engenharia é imprescindível"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se sua reforma tem qualquer um destes elementos, engenheiro precisa estar no time:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Alteração de layout com movimentação de parede."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Novo ponto hidráulico ou aumento de carga elétrica."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Ampliação, edícula, laje adicional."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Alteração de fachada (mudança de janelas, muros, telhado)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Qualquer obra que precise de aprovação de prefeitura ou condomínio."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O modelo integrado — engenharia e interiores na mesma mão"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Meu jeito de trabalhar é engenharia + interiores integrados. Não é aleatório. É porque, quando cada especialidade faz seu pedaço separado, a compatibilização vira problema do cliente — e cliente não é obrigado a ser compatibilizador de projeto."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Quando um profissional só cuida do técnico E do estético, cada decisão já nasce integrada. Uma ilha na cozinha? Verifico laje, elétrica, hidráulica, e desenho a estética junto. Uma reunião só resolve o que reunião separada não resolveria em três."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você está começando um projeto e não sabe se precisa desse modelo integrado, converse comigo sem compromisso. Escuto seu escopo, respondo honestamente se precisa ou não, e a decisão fica com você."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto orienta sobre quando cada especialidade é necessária. Cada projeto tem suas particularidades — sempre consulte um profissional para avaliação específica."}]}]}
    ]
  }$doc$::jsonb
where slug = 'contratei-uma-engenheira-o-que-muda';


-- ------------------------------------------------------------
-- ARTIGO 7 — Reforma em apartamento
-- ------------------------------------------------------------
update public.articles
set
  content = $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Se você mora em apartamento e está pensando em reformar, saiba que existem regras específicas que casa não tem. Não são detalhes — são pontos que, se ignorados, viram multa, embargo ou briga judicial com condomínio."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Quero compartilhar os cinco pontos que costumam aparecer com mais frequência em reformas em edifício — e como resolver cada um antes de começar."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"1. A NBR 16280 é obrigatória"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A norma técnica brasileira NBR 16280 exige que qualquer reforma em condomínio residencial tenha responsável técnico (engenheiro ou arquiteto), projeto e ART/RRT. Isso não é opinião — é norma com força legal."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Na prática, o síndico é obrigado a exigir o documento antes de liberar a obra. Se ele não exigir e algo der errado (rachadura em vizinho, vazamento, incêndio), ele responde solidariamente. Por isso muitos síndicos são rigorosos — e com razão."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"2. Horário e ruído variam por convenção"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A maioria dos condomínios permite obra apenas em dias úteis, geralmente das 8h às 17h. Sábados são flexíveis (alguns permitem até 12h; outros não permitem). Domingos e feriados, quase nunca."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Isso muda o cronograma. Se você contou com trabalho aos sábados e a convenção proíbe, a obra pode alongar 20-30%. Peça a convenção antes de fechar cronograma com o pedreiro."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"3. Elevador de serviço tem limite"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Todo condomínio tem regras sobre uso de elevador de serviço para transportar material. Alguns exigem uso de proteção nas paredes, outros limitam volume, alguns cobram taxa por dia de obra."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Detalhe prático: se o apartamento está em andar alto e o condomínio não tem elevador de serviço próprio (só o social + carga limitada), o custo de transporte de material pode subir 30-40%. Esse item raramente aparece no orçamento inicial."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"4. Nem toda parede pode cair"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Em apartamento, algumas paredes são estruturais (suportam carga). Derrubar sem laudo pode comprometer o edifício inteiro — literalmente."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Como saber? Só engenheiro pode confirmar, mas normalmente:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Paredes de fachada (as que fazem contorno externo) — quase sempre estruturais."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Paredes que dividem apartamentos vizinhos — sempre estruturais e não podem ser modificadas."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Paredes internas em bloco cerâmico ou drywall — geralmente podem sair, mas verifique."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Nunca confie no bom senso do pedreiro. Sempre no laudo do engenheiro. É a diferença entre reforma e tragédia."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"5. Descarte de entulho é responsabilidade do proprietário"}]},
      {"type":"paragraph","content":[{"type":"text","text":"O condomínio não é obrigado a receber caçamba de entulho. É preciso combinar com o síndico, agendar caminhão de retirada, e — em muitos casos — pagar diária de estacionamento para caçamba na rua."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Uma obra média de apartamento gera 2 a 4 caçambas. Cada uma custa entre R$ 400 e R$ 800. E o descarte inadequado (deixar em terreno baldio, jogar na rua) é crime ambiental. Não é ameaça — é multa alta e boletim."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que fazer antes de começar"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você vai reformar apartamento, essa é a sequência que evita dor de cabeça:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Peça a convenção do condomínio ao síndico. Leia as regras de reforma."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Contrate engenheiro para projeto executivo e emissão de ART/RRT."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Apresente o projeto ao síndico com antecedência. Peça autorização por escrito."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Comunique os vizinhos diretos — cordialidade evita a maior parte das brigas."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Agende caçambas de entulho na sequência da obra, não no fim."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você tem um apartamento em vista e quer entender o que a legislação e a convenção exigem antes de começar, converse comigo. Faço essa análise inicial e evito surpresa depois."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto é informativo sobre reforma em apartamento. Regras específicas variam por condomínio e cidade. Sempre consulte a convenção e as leis municipais aplicáveis."}]}]}
    ]
  }$doc$::jsonb
where slug = 'reforma-em-apartamento-o-que-saber';


-- ------------------------------------------------------------
-- ARTIGO 8 — Cozinha sem estourar orçamento
-- ------------------------------------------------------------
update public.articles
set
  content = $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Cozinha é o ambiente mais caro da casa por metro quadrado. E também o mais fácil de estourar orçamento — porque cada escolha (bancada, marcenaria, torneiras, revestimento) tem faixa de preço enorme. É possível gastar R$ 15 mil ou R$ 150 mil no mesmo layout."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Na minha visão, existe uma lógica clara sobre onde cortar e onde não cortar em uma reforma de cozinha. Quero dividir com você."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O que NUNCA cortar"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Alguns itens definem a experiência do dia a dia por 15-20 anos. Cortar aqui gera arrependimento diário:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Ferragens da marcenaria."},{"type":"text","text":" Blum ou Hettich fazem toda a diferença. A diferença entre uma ferragem básica e uma premium é de R$ 30 a R$ 60 por gaveta — mas dobra a vida útil do móvel."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Torneira e válvula da cuba."},{"type":"text","text":" Torneira barata na cozinha costuma ser trocada em cinco anos. Deca ou Docol de linha média já resolvem; abaixo disso, arrependimento provável."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Iluminação de bancada."},{"type":"text","text":" Cozinha bem iluminada dobra a sensação de tamanho e resolve problemas de sombra no fogão. Cortar aqui é escurecer a cozinha inteira."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Ventilação."},{"type":"text","text":" Coifa boa, exaustor bem dimensionado. Sem isso, a cozinha vira sauna e a marcenaria absorve gordura."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Onde dá para economizar sem parecer que economizou"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Agora a parte boa. Existem itens onde a versão média ou até básica entrega quase o mesmo resultado da versão premium:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Revestimento de parede."},{"type":"text","text":" Porcelanato nacional bom (Portobello, Elizabeth) tem estética indistinguível de importados de R$ 400 por m². Economia de 40-60%."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Marcenaria em MDF revestido."},{"type":"text","text":" Se você vai usar melamínico (MDF com revestimento fenólico impresso), o padrão nacional atual está impressionante. Nogal, freijó, carvalho — indistinguível de folha natural, custa metade."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Eletrodomésticos que não aparecem."},{"type":"text","text":" Micro-ondas, forno elétrico, cooktop — se ficam embutidos e não ficam à mostra, marca não faz diferença. Escolha por especificação técnica, não por logo."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Piso."},{"type":"text","text":" Porcelanato retificado 60x60 nacional bom entrega excelente resultado. Piso importado só faz sentido se for peça central do projeto (mármore, pedra natural)."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O item que muda tudo: a bancada"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Bancada é o item que mais gera dúvida. Vou ser direta: se o orçamento permite, quartzito ou porcelanato de espessura alta são os melhores em performance. Se não permite, silestone ou quartzo composto entregam resultado ótimo por 30-40% menos."}]},
      {"type":"paragraph","content":[{"type":"text","text":"O que NÃO recomendo: mármore branco (mancha), granito com veios (data o projeto), fórmica (custo-benefício ruim). Quartzito Statuario ou porcelanato Estatuário Neve são a versão \"cara linda que dura\"; silestone Calacatta é a versão \"parece cara e dura\"."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Faixas de investimento realistas"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Para cozinha de 8-12 m², faixas honestas de investimento total (2026):"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Padrão econômico:"},{"type":"text","text":" R$ 25 mil a R$ 40 mil. Marcenaria melamínica boa, bancada silestone, eletrodomésticos linha branca boa."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Padrão médio:"},{"type":"text","text":" R$ 40 mil a R$ 70 mil. Marcenaria com detalhes autorais, bancada quartzo composto premium, coifa boa."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Padrão alto:"},{"type":"text","text":" R$ 70 mil a R$ 130 mil. Marcenaria autoral, ilha central, quartzito, eletrodomésticos premium embutidos."}]}]}
      ]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"O erro mais caro que costuma acontecer"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Comprar tudo separado. Cliente compra marcenaria com um fornecedor, bancada com outro, eletrodomésticos por conta, torneiras online. Cada compra parece uma economia. No final, cada peça está 5-10% mais barata, mas ninguém compatibilizou nada."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Aí a bancada não bate com a marcenaria, a coifa não encaixa na altura do armário, a torneira é de acabamento diferente do puxador. Solução? Refazer. E aí a \"economia\" some no retrabalho."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Cozinha é o ambiente que mais se beneficia de projeto integrado. Se você quer investir bem sem gastar demais, converse comigo. Faço uma análise inicial e mostro onde tem espaço para economizar sem sacrificar o resultado."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Valores mencionados são referências de mercado em 2026 e variam por região, complexidade e marcas escolhidas. Sempre confirme com orçamento formal para sua obra específica."}]}]}
    ]
  }$doc$::jsonb
where slug = 'como-reformar-cozinha-sem-estourar-orcamento';
