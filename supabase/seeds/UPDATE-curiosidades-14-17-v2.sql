-- ============================================================
-- UPDATE v2 — Bloco D: Curiosidades 14-17
-- Ajustes:
-- - Art 14: "Depois de mais de uma década projetando..." removido
-- - Art 17: "vou compartilhar os dez erros que mais encontro em visita" ajustado
-- ============================================================

-- ------------------------------------------------------------
-- ARTIGO 14 — 7 truques de iluminação
-- ------------------------------------------------------------
update public.articles
set
  content = $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Iluminação é a parte de um projeto de interiores que mais transforma a percepção de um ambiente — e uma das mais fáceis de aplicar sem obra. Nenhum dos truques que vou compartilhar exige quebrar parede ou trocar fiação. Alguns exigem só reorganizar o que você já tem."}]},
      {"type":"paragraph","content":[{"type":"text","text":"São sete princípios que aplico como referência em quase todo projeto residencial. Alguns você vai reconhecer, outros vão surpreender."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Truque 1: nunca use só a luz do teto"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A luz central de teto (aquele plafon único no meio do cômodo) achata o ambiente. Torna tudo chapado, sem sombra, sem profundidade. Bom para hospital. Ruim para casa."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Regra que costumo aplicar: mínimo três pontos de luz por ambiente. Um pode ser o do teto, mas os outros dois precisam estar em outras alturas — abajur, luminária de piso, arandela. É a diferença entre \"iluminado\" e \"aconchegante\"."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Truque 2: temperatura de cor importa mais que watts"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Lâmpada branco-quente (2700K a 3000K) transforma qualquer ambiente em aconchego. Lâmpada branco-frio (5000K a 6500K) transforma o mesmo ambiente em escritório. É o mesmo cômodo, com iluminação completamente diferente."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Referência: sala, quarto e ambientes de descanso — 2700K a 3000K. Cozinha e banheiros — 3000K a 4000K. Escritório — 4000K. Acima de 4500K, só em áreas técnicas."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Truque 3: ilumine paredes, não o chão"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Luz que vai para o chão desperdiça energia sem gerar sensação. Luz que bate na parede reflete difusa pelo ambiente inteiro. É como se o ambiente ficasse maior."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Aplicação simples: um abajur ou luminária de piso encostado a 30-40 cm da parede, iluminando a parede em vez do teto. Sensação de amplitude imediata."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Truque 4: use dimmer sempre que puder"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Dimmer (controlador de intensidade) é uma das melhores invenções da eletricidade doméstica. Custa pouco (R$ 30 a R$ 80 para substituir interruptor), instala em 30 minutos, e transforma o mesmo ambiente em cinco versões diferentes: reunião de trabalho, jantar romântico, filme no sofá."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você vai fazer qualquer alteração elétrica, considere colocar dimmer nos ambientes sociais e nos quartos. Custo mínimo, impacto grande."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Truque 5: iluminação de leitura tem posição certa"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Luminária de leitura precisa vir por trás do ombro do lado oposto à mão que segura o livro. Se você é destro, a luz vem por trás do ombro esquerdo. Assim ela ilumina a página sem fazer sombra da própria mão."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Detalhe: altura ideal é 30-40 cm acima do topo da cabeça sentado. Alto demais espalha, baixo demais concentra."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Truque 6: cozinha precisa de luz de bancada"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Cozinha iluminada só pelo teto tem sombra em toda bancada — porque o próprio corpo tampa a luz. Você prepara a comida no escuro."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Solução simples que não exige projeto: fita LED sob os armários superiores, apontada para a bancada. Custa R$ 60-150 por metro linear, instala com adesivo, plugada em tomada comum. A cozinha muda de patamar."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Truque 7: valorize um ponto por cômodo"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Em cada cômodo, escolha uma peça-personagem — quadro, planta, escultura, cabeceira, poltrona — e ilumine ELA especificamente. Não iguale o ambiente inteiro. Faça um ponto brilhar mais que o resto."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Assim o olho tem para onde ir. O ambiente tem hierarquia. É o que separa \"casa comum\" de \"casa que parece de revista\"."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Combinando os sete"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Cada truque isolado já ajuda. Mas o efeito real vem quando você combina. Sala com:"}]},
      {"type":"bulletList","content":[
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Uma luz de teto suave com dimmer (truques 1 e 4)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Um abajur iluminando a parede atrás do sofá (truques 1 e 3)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Luminária de piso ao lado da poltrona de leitura, na posição correta (truques 1 e 5)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Spot iluminando o quadro principal ou a estante (truque 7)."}]}]},
        {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Todas em temperatura 2700K (truque 2)."}]}]}
      ]},
      {"type":"paragraph","content":[{"type":"text","text":"Vira uma sala com camadas. Aconchegante em fim de tarde. Prática em reunião. Cinematográfica para filme. Um só ambiente, várias experiências."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você quer aplicar iluminação de forma projetada no seu ambiente, converse comigo. Faço projeto luminotécnico específico e mostro onde cada ponto precisa estar."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto é orientação prática. Iluminação profissional exige projeto luminotécnico específico para cada ambiente e uso."}]}]}
    ]
  }$doc$::jsonb
where slug = '7-truques-iluminacao-arquitetos-usam';

-- Artigos 15 (casas antigas) e 16 (regra 60-30-10) já eram
-- majoritariamente técnicos, sem fabricações de vivência.

-- ------------------------------------------------------------
-- ARTIGO 17 — 10 erros clássicos
-- ------------------------------------------------------------
update public.articles
set
  content = $doc${
    "type": "doc",
    "content": [
      {"type":"paragraph","content":[{"type":"text","text":"Quando um engenheiro ou arquiteto entra em um ambiente, alguns erros saltam aos olhos. Não é sobre gosto — é sobre técnica. E o mais interessante é que a maioria desses erros tem solução simples, sem obra."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Estes são os dez erros mais recorrentes em ambientes residenciais. Se você reconhecer algum no seu, corrigir vai transformar a experiência do dia a dia."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"1. Móveis grudados na parede"}]},
      {"type":"paragraph","content":[{"type":"text","text":"O sofá encostado na parede parece \"aproveitar espaço\", mas na verdade faz o ambiente parecer menor. O olho lê melhor quando há respiro entre superfícies grandes."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Solução: afaste sofás, aparadores e cabeceiras 10-20 cm da parede sempre que possível. O ambiente ganha volume visual."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"2. Tapete menor que o mobiliário"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Tapete que não pega os pés dianteiros do sofá + poltronas faz cada peça parecer isolada. Ambiente perde coesão."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Regra: o tapete precisa passar por baixo de todos os pés dianteiros do mobiliário principal. Se não pega, ele está pequeno demais."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"3. Quadros pendurados alto demais"}]},
      {"type":"paragraph","content":[{"type":"text","text":"A maioria das pessoas pendura quadros na altura dos olhos em pé. Errado. Quando você senta no sofá, o quadro fica flutuando no alto da parede, sem relação com o mobiliário."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Regra: o centro do quadro deve ficar a 1,45m a 1,55m do piso — altura média dos olhos sentado + em pé. Sempre mais baixo do que o instinto pede."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"4. Cortina que não vai até o teto"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Cortina fixada no batente da janela recorta o ambiente e faz o pé-direito parecer mais baixo. Mesmo que o pé-direito seja baixo mesmo, o efeito visual piora."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Solução: fixar cortina a 5-10 cm abaixo do teto, com trilho longo o suficiente para ir até quase o piso. Ambiente ganha altura e elegância."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"5. Iluminação de teto centralizada"}]},
      {"type":"paragraph","content":[{"type":"text","text":"O plafon único no centro do cômodo achata tudo. É o erro de iluminação mais comum e mais fácil de resolver."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Solução: pelo menos três pontos de luz em alturas diferentes. Abajur, luminária de piso, arandela — em qualquer combinação."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"6. Muitos pequenos objetos espalhados"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Superfícies (estante, aparador, mesa de centro) com muitos objetos pequenos criam ruído visual. O olho não descansa."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Regra prática: agrupe objetos em conjuntos ímpares (3, 5, 7), mantendo pelo menos 60% da superfície livre. Menos peças, mais impacto."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"7. Falta de contraste na paleta"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Ambiente todo em tons próximos (tudo bege, ou tudo cinza, ou tudo branco) vira monótono. Falta o \"acento\" para dar hierarquia."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Solução: aplique a regra 60-30-10. Escolha uma cor de acento e aplique em 3-5 pontos pequenos."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"8. Escala errada do sofá"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Sofá grande demais em ambiente pequeno sufoca. Sofá pequeno demais em ambiente grande parece perdido. Escala importa."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Regra: o sofá não deve ocupar mais de 60% da parede em que fica encostado. E deve deixar circulação de pelo menos 60-80 cm entre ele e a mesa de centro."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"9. Falta de textura"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Ambiente com todas superfícies lisas (porcelanato acetinado, pintura polida, mobiliário laqueado) vira frio. O olho não tem onde \"descansar\"."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Solução: adicione pelo menos duas texturas por ambiente. Tapete de fibra natural, manta de linho no sofá, planta grande, cesto trançado, quadro com moldura de madeira. Não precisa mudar acabamento — só adicionar."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"10. Nada em pé"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Ambiente com tudo baixo (sofá, poltrona, mesa) fica \"chapado\". Falta hierarquia vertical."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Solução: adicione pelo menos um elemento em pé. Estante alta, planta de porte grande, quadro grande vertical, cortina longa. Dá dimensão vertical ao ambiente."}]},
      {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Como fazer o diagnóstico"}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se você tem um cômodo que \"não funciona\" e não sabe o motivo, tire uma foto do ambiente e revisite essa lista. Provavelmente vão aparecer 3-4 desses erros ao mesmo tempo — e corrigi-los, mesmo sem investir em móvel novo, muda a experiência."}]},
      {"type":"paragraph","content":[{"type":"text","text":"Se quiser diagnóstico mais aprofundado e sugestões específicas para o seu ambiente, converse comigo. Consulta de curadoria rápida costuma revelar muito."}]},
      {"type":"blockquote","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"Este texto é orientação prática sobre composição de interiores. Cada ambiente tem particularidades — para diagnóstico completo consulte profissional."}]}]}
    ]
  }$doc$::jsonb
where slug = '10-erros-decoracao-engenheiros-identificam';
