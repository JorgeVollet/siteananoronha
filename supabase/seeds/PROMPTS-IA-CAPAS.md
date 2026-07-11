# Prompts para IA — Capas dos 20 artigos (v3 — MDF blindado)

**Fluxo recomendado:** gere no Midjourney/DALL-E/Ideogram → passe no **Magnific AI** em modo automático (fidelidade balanceada) → salve como .jpg 2000x1375px (~250KB).

---

## ⚠️ Por que a v2 falhava e como a v3 resolve

**O erro:** dizer "walnut-tone laminate" fazia os modelos gerarem **madeira maciça com cauda de andorinha** e veios naturais — porque "walnut" é âncora visual forte demais.

**A correção:** descrever **MDF como MDF de verdade** — superfície lisa, cor sólida, sem grão visível, cantos precisos, integração perfeita (a estética real da Ana Laura) — + adicionar **cláusulas negativas explícitas** em todos os prompts com marcenaria.

### O que MDF de alta qualidade parece visualmente

- ✅ Superfície **completamente lisa e uniforme**, sem textura de grão
- ✅ Cor **sólida** (taupe, greige, warm bone, off-white, matte black) OU padrão impresso levemente texturizado mas **repetitivo e uniforme** (não orgânico como madeira)
- ✅ **Cantos vivos precisos**, sem chanfros naturais
- ✅ **Peça única** — sem juntas visíveis, sem cauda de andorinha, sem finger joints
- ✅ Puxadores **integrados/embutidos** (push-open) ou perfis finos alumínio/latão escovado
- ✅ Painéis frontais **lisos ou fresados em ranhuras geométricas** (não entalhes orgânicos)

### Cláusulas negativas que sempre incluímos

`no visible wood grain, no natural wood veining, no dovetail joints, no finger joints, no solid timber construction, no rustic cabinetmaker joinery, no wood knots, no organic grain patterns, no antique brass round knobs (except where explicitly asked), no country-style furniture`

---

## 🎨 DNA visual consistente em todos os 20

- **Paleta:** `warm neutral palette: bone, taupe, warm ochre, off-white, matte black accents`
- **Estilo:** `editorial magazine photography, cinematic composition, Kinfolk / Cereal magazine aesthetic`
- **Luz:** `soft directional natural window light, golden hour warmth`
- **Câmera:** `50mm or 85mm lens, shallow depth of field, subtle film grain`
- **Formato:** `landscape 16:11, editorial cover quality`
- **Anti-slop:** `no lens flare, no HDR, no oversaturated colors, no fake bokeh, no plastic textures`

## Sufixos técnicos por plataforma

- **Midjourney:** adicionar `--ar 16:11 --style raw --v 6.1 --stylize 250 --chaos 15 --no wood grain, dovetail, solid timber, rustic`
- **DALL-E 3:** usar como está — o DALL-E respeita cláusulas negativas dentro do prompt
- **Ideogram:** adicionar `Style: Photorealistic, Model: v3` + negative prompt: `wood grain, dovetail, solid timber, rustic`

---

## 📝 BLOG (8 artigos)

### 1. Quanto custa reformar uma casa? (DESTAQUE)

**Midjourney:**
```
Editorial architectural workspace scene: an unrolled residential floor plan sitting on a smooth matte taupe MDF desk surface (uniform solid color, no wood grain, no texture), a matte black precision calculator, three small square sample tiles in taupe, bone and warm ochre tones arranged in a row, a linen-colored ceramic coffee mug with steam rising, an open notebook with handwritten cost columns, mechanical pencil resting on the plan. Soft directional afternoon window light from the left casting warm shadows. Kinfolk magazine aesthetic. 50mm lens, shallow depth of field, subtle film grain. Warm neutral palette: bone, taupe, warm ochre, off-white. Editorial cover composition. No wood grain, no visible timber, no rustic textures, no lens flare, no HDR --ar 16:11 --style raw --v 6.1 --stylize 250 --chaos 15
```

**DALL-E 3:**
```
Cinematic editorial photograph of a residential renovation cost planning scene: unrolled architectural floor plan on a smooth matte taupe desk surface (uniform solid color, no wood grain), matte black calculator, three ceramic sample tiles in taupe/bone/ochre, linen ceramic coffee mug with gentle steam, open notebook showing handwritten cost columns, mechanical pencil. Soft warm afternoon light from window on the left. Warm neutral palette. Kinfolk magazine aesthetic. Shallow depth of field, subtle film grain. Landscape 16:11 editorial cover quality. Explicitly no visible wood grain, no timber texture, no rustic materials.
```

**Ideogram:**
```
Floor plan on smooth matte taupe desk (solid color, no wood grain), matte calculator, sample tiles in taupe and ochre, ceramic coffee mug, handwritten notebook, soft afternoon window light, editorial architectural photography, Kinfolk aesthetic. Style: Photorealistic. Negative: wood grain, timber, rustic
```

---

### 2. Como escolher um projetista — 7 sinais de alerta

**Midjourney:**
```
Editorial cinematic scene of a design consultation: two people (only hands and forearms visible, no faces) at a smooth matte taupe surface meeting table (solid uniform color, no wood grain), one hand pointing at a specific detail on an architectural drawing, a second hand holding a mechanical pencil making a note, a small stack of material samples in neutral tones, two matte ceramic espresso cups, a soft leather notebook in warm bone tone. Soft directional morning light from a large window. Kinfolk magazine aesthetic. 50mm lens, shallow depth of field, subtle film grain. Warm neutral palette: bone, taupe, warm ochre. Editorial cover composition. No wood grain, no visible timber, no rustic textures, no lens flare --ar 16:11 --style raw --v 6.1 --stylize 250 --chaos 15
```

**DALL-E 3:**
```
Editorial cinematic photograph of a design consultation: only hands and forearms visible of two people seated at a smooth matte taupe meeting table (solid uniform color, no wood grain), one hand pointing at architectural drawing detail, another hand with mechanical pencil making notes, small stack of material samples in neutral tones, two matte ceramic espresso cups, soft leather notebook in warm bone. Soft directional morning window light. Warm neutral palette. Kinfolk magazine aesthetic. Landscape 16:11 editorial cover quality. No wood grain, no timber texture, no rustic elements.
```

**Ideogram:**
```
Two hands over architectural drawings on smooth matte taupe table (no wood grain, solid color), pointing gesture, mechanical pencil, material samples, matte ceramic espresso cups, soft morning light, editorial photography, warm neutral palette. Style: Photorealistic. Negative: wood grain, timber, rustic
```

---

### 3. Marcenaria sob medida vs móveis prontos (⚠️ crítico — refeito totalmente)

**Midjourney:**
```
Editorial architectural detail photograph: close-up of contemporary Brazilian kitchen cabinetry made from high-quality MDF panels finished in a smooth uniform matte taupe-grey color (like a fine microcement finish, absolutely no wood grain visible, no timber texture, no dovetail joints, no finger joints, no visible joinery of any kind), a seamless integrated push-open drawer with precision-cut edges and no visible handles or knobs, sitting below a light bone quartz countertop with delicate subtle veining. Soft warm morning window light from the right casting soft shadows on the smooth matte surface. Kinfolk magazine aesthetic. 85mm macro lens, shallow depth of field, subtle film grain. Warm neutral palette: taupe-grey matte cabinet, bone stone, ochre ambient light. Contemporary minimalist Brazilian cabinet design. Editorial cover composition. Absolutely no visible wood grain, no walnut wood, no oak, no timber, no dovetail joints, no antique brass round knobs, no rustic cabinetmaker joinery --ar 16:11 --style raw --v 6.1 --stylize 250 --chaos 10 --no wood, timber, dovetail, walnut wood
```

**DALL-E 3:**
```
Editorial cinematic close-up detail photograph of contemporary Brazilian kitchen cabinetry made from high-quality MDF panels finished in a smooth uniform matte taupe-grey color (like a fine microcement finish — absolutely no wood grain visible, no timber texture whatsoever, no dovetail joints, no finger joints, no visible joinery), a seamless integrated push-open drawer with precision-cut edges and no visible handles or knobs, sitting below a light bone quartz countertop with delicate subtle veining. Soft warm morning window light from the right. Warm neutral palette (matte taupe-grey cabinet, bone stone, ochre light). Kinfolk aesthetic. Macro shot 85mm, shallow depth of field, film grain. Landscape 16:11 editorial cover. Explicitly no visible wood grain, no walnut, no oak, no timber, no dovetail joints, no antique brass round knobs, no rustic cabinetmaker joinery.
```

**Ideogram:**
```
Contemporary Brazilian kitchen cabinet in matte taupe-grey MDF (smooth uniform finish, absolutely no wood grain), integrated push-open drawer with precision-cut edges, light bone quartz countertop with subtle veining, morning window light from right, editorial architectural photography, Kinfolk aesthetic. Style: Photorealistic. Negative: wood grain, timber, dovetail, walnut, oak, rustic, antique knobs
```

**Prompt alternativo (versão OFF-WHITE — se preferir mais clean):**
```
Editorial architectural detail photograph of contemporary Brazilian kitchen cabinetry made from high-quality MDF panels finished in a smooth uniform matte off-white color (absolutely no wood grain, no timber texture, no visible joinery), seamless integrated push-open drawer with precision-cut edges and no handles, sitting below a light bone quartz countertop with subtle veining. Soft warm morning window light from the right. Warm neutral palette: off-white matte cabinet, bone stone, ochre light. Kinfolk aesthetic. Macro shot 85mm. Landscape 16:11. No wood grain, no timber, no dovetail, no antique knobs, no rustic elements
```

---

### 4. Reforma ou construir do zero

**Midjourney:**
```
Editorial documentary photograph of a residential space in mid-renovation: partially exposed brick wall with old plaster removed in one section revealing warm terracotta tones, temporary wooden scaffolding neatly assembled (structural pine construction lumber, not decorative), construction materials organized on the floor (stack of cement bags, bundle of galvanized pipes, plain matte white MDF sheets leaning against the wall showing no wood grain), a measuring tape on a folded blueprint, soft natural daylight from an unfinished window opening. Kinfolk magazine documentary aesthetic. 35mm lens, subtle film grain, warm neutral palette: terracotta, bone, ochre. Sense of positive transformation. No lens flare, no HDR --ar 16:11 --style raw --v 6.1 --stylize 250 --chaos 15
```

**DALL-E 3:**
```
Editorial documentary cinematic photograph of a Brazilian residential renovation in progress: partially exposed brick wall revealing warm terracotta tones, temporary structural pine wood scaffolding neatly assembled, organized construction materials (cement bags, galvanized pipes, plain matte white MDF sheets leaning against wall showing no wood grain), measuring tape on folded blueprint, soft natural daylight from unfinished window opening. Warm neutral palette. Kinfolk aesthetic. Sense of positive transformation. Landscape 16:11 editorial quality.
```

**Ideogram:**
```
Renovation in progress with exposed brick wall, structural pine scaffolding, plain matte MDF sheets, cement bags, galvanized pipes, measuring tape on blueprint, soft natural light, editorial documentary photography, warm neutral palette. Style: Photorealistic
```

---

### 5. Cronograma de obra: por que 90% atrasam

**Midjourney:**
```
Editorial workspace scene: an unrolled architectural blueprint on a smooth matte taupe surface (uniform solid color, no wood grain), handwritten timeline notes in the margins using warm ochre marker, a matte terracotta construction hard hat at the edge, a metal compass and mechanical pencil crossed on top of the plan, a leather notebook slightly open showing a hand-sketched Gantt chart, soft warm morning window light from behind. Kinfolk magazine aesthetic. 50mm lens, shallow depth of field, subtle film grain. Warm neutral palette: matte taupe, ochre marker, terracotta helmet, bone paper. Editorial cover composition. No wood grain, no lens flare --ar 16:11 --style raw --v 6.1 --stylize 250 --chaos 15
```

**DALL-E 3:**
```
Editorial cinematic photograph of construction planning workspace: unrolled architectural blueprint on smooth matte taupe surface (uniform solid color, no wood grain), handwritten timeline notes in warm ochre marker, matte terracotta construction hard hat at the edge, metal compass and mechanical pencil crossed on plan, open leather notebook showing hand-sketched Gantt chart. Soft warm morning window light from behind. Warm neutral palette. Kinfolk aesthetic. Shallow depth of field, subtle film grain. Landscape 16:11 editorial cover. No wood grain, no timber texture.
```

**Ideogram:**
```
Architectural blueprint on smooth matte taupe surface (no wood grain), handwritten timeline notes in ochre marker, terracotta hard hat, metal compass, mechanical pencil, notebook with Gantt chart, soft morning light, editorial photography, warm neutral palette. Style: Photorealistic
```

---

### 6. Contratei uma engenheira: o que muda

**Midjourney:**
```
Editorial documentary photograph of a female civil engineer on-site (only hands visible, no face): her hands analyzing detailed structural drawings spread on a temporary matte grey MDF work table (uniform solid color, no wood grain), a bone-colored construction hard hat resting nearby, a leather notebook with handwritten technical annotations, a metal measuring tape, calculator, soft warm afternoon light from a large opening. Kinfolk magazine aesthetic. 50mm lens, shallow depth of field, subtle film grain. Warm neutral palette: bone, taupe, ochre. Editorial cover composition, professional yet human atmosphere. No wood grain, no timber texture, no lens flare --ar 16:11 --style raw --v 6.1 --stylize 250 --chaos 15
```

**DALL-E 3:**
```
Editorial cinematic documentary photograph of civil engineer's hands on-site (no face visible): hands analyzing detailed structural drawings on temporary matte grey work table (uniform solid color, no wood grain), bone-colored construction hard hat nearby, leather notebook with technical annotations, metal measuring tape, calculator. Soft warm afternoon light from large opening. Warm neutral palette. Professional yet human. Kinfolk aesthetic. Landscape 16:11 editorial quality. No wood grain, no timber.
```

**Ideogram:**
```
Engineer hands on structural drawings on matte grey work table (no wood grain), bone hard hat, leather notebook with annotations, metal measuring tape, calculator, warm afternoon light, editorial documentary photography, warm neutral palette. Style: Photorealistic
```

---

### 7. Reforma em apartamento: NBR 16280

**Midjourney:**
```
Editorial architectural photograph of a sophisticated modern Brazilian apartment interior: floor-to-ceiling windows on the right revealing a soft out-of-focus city skyline at golden hour, a low-profile linen sofa in taupe, one warm ochre throw pillow, a bone-colored area rug, a piece of contemporary MDF cabinetry in smooth matte off-white finish on the left wall (uniform solid color, absolutely no wood grain, no timber texture, no visible joinery), a single ceramic vase with dried pampas grass on top, soft ambient interior lighting from a matte brass floor lamp. Kinfolk magazine aesthetic. 35mm lens, wide composition, subtle film grain. Warm neutral palette: bone, taupe, off-white cabinet, warm ochre. Editorial cover composition. No wood grain, no timber, no dovetail, no lens flare --ar 16:11 --style raw --v 6.1 --stylize 250 --chaos 15
```

**DALL-E 3:**
```
Editorial cinematic photograph of sophisticated Brazilian modern apartment interior: floor-to-ceiling windows on right showing soft out-of-focus city skyline at golden hour, low-profile linen taupe sofa, one warm ochre throw pillow, bone area rug, contemporary MDF cabinetry in smooth matte off-white finish on left wall (uniform solid color, no wood grain, no timber texture), ceramic vase with pampas grass, ambient matte brass floor lamp. Warm neutral palette. Kinfolk aesthetic. Wide 35mm composition. Landscape 16:11 editorial quality. No wood grain, no timber, no joinery visible.
```

**Ideogram:**
```
Modern apartment interior with floor-to-ceiling windows, golden hour city view, linen taupe sofa, ochre pillow, contemporary MDF cabinetry in matte off-white (no wood grain), pampas grass in ceramic vase, brass floor lamp, editorial architectural photography, warm neutral palette. Style: Photorealistic
```

---

### 8. Como reformar cozinha sem estourar orçamento (⚠️ crítico — refeito totalmente)

**Midjourney:**
```
Editorial architectural photograph of a sophisticated modern Brazilian kitchen: full-wall contemporary MDF cabinetry in a smooth uniform matte greige color (soft warm grey-beige, absolutely no wood grain, no timber texture, no dovetail joints, no visible joinery, uniform solid color like microcement or fine paint finish), seamless integrated push-open doors and drawers with precise cut lines (no visible handles or knobs), a light bone quartz countertop with subtle veining, a ceramic bowl of citrus fruits providing an ochre accent, brushed antique brass sink faucet (single modern lever design, not ornate), an integrated cooktop, three warm-white pendant lights hanging over the counter, soft directional morning window light from the left. Kinfolk magazine aesthetic. 35mm lens, medium shot showing the whole composition, subtle film grain. Warm neutral palette: matte greige cabinet, bone stone, ochre citrus, warm brass. Editorial cover composition, contemporary Brazilian minimalist design. Absolutely no visible wood grain, no walnut wood, no oak, no rustic cabinetmaker joinery, no antique brass round knobs, no country-style furniture --ar 16:11 --style raw --v 6.1 --stylize 250 --chaos 10 --no wood, timber, walnut, oak, dovetail, rustic
```

**DALL-E 3:**
```
Editorial cinematic photograph of sophisticated modern Brazilian kitchen: full-wall contemporary MDF cabinetry in smooth uniform matte greige color (soft warm grey-beige, absolutely no wood grain, no timber texture, no dovetail joints, uniform solid color like microcement or fine paint), seamless integrated push-open doors and drawers with precise cut lines (no visible handles), light bone quartz countertop with subtle veining, ceramic bowl of citrus fruits, brushed brass single-lever sink faucet, integrated cooktop, three warm-white pendant lights over counter, soft morning window light from left. Warm neutral palette. Kinfolk aesthetic. Medium shot 35mm. Landscape 16:11. Explicitly no wood grain, no walnut, no oak, no rustic joinery, no antique brass round knobs.
```

**Ideogram:**
```
Modern Brazilian kitchen with MDF cabinetry in matte greige (smooth uniform finish, no wood grain), integrated push-open doors, bone quartz countertop, ceramic bowl of citrus, single-lever brass faucet, warm pendant lights, morning window light, editorial architectural photography, warm neutral palette. Style: Photorealistic. Negative: wood grain, timber, walnut, oak, rustic, antique knobs
```

**Prompt alternativo (versão OFF-WHITE mais limpa):**
```
Editorial architectural photograph of sophisticated modern Brazilian kitchen: full-wall contemporary MDF cabinetry in smooth uniform matte off-white finish (absolutely no wood grain, no timber texture, no visible joinery), seamless integrated push-open doors with precise cut lines, light bone quartz countertop with subtle veining, ceramic bowl of citrus, brushed brass single-lever faucet, integrated cooktop, warm-white pendant lights, soft morning light. Kinfolk aesthetic. Landscape 16:11
```

---

## 📐 NORMAS TÉCNICAS (5 artigos)

### 9. NBR 15575 explicada (DESTAQUE de Normas)

**Midjourney:**
```
Editorial photograph of a technical library scene: three ABNT (Brazilian Association of Technical Standards) thick technical books stacked on a smooth matte taupe desk surface (uniform solid color, no wood grain, no timber texture), an engineering brass compass and matte black precision calculator arranged nearby, a leather-bound notebook with a fountain pen, a matte ceramic cup of black coffee, soft warm afternoon window light streaming from the left casting long shadows. Kinfolk magazine aesthetic. 50mm lens, shallow depth of field, subtle film grain. Warm neutral palette: bone, taupe, warm brass, ochre. Editorial cover composition. No wood grain, no lens flare, no HDR --ar 16:11 --style raw --v 6.1 --stylize 250 --chaos 15
```

**DALL-E 3:**
```
Editorial cinematic photograph of sophisticated technical library scene: three thick Brazilian ABNT technical standards books stacked on smooth matte taupe desk (uniform solid color, no wood grain), brass engineering compass, matte black precision calculator, leather-bound notebook with fountain pen, matte ceramic cup of black coffee. Soft warm afternoon window light from left casting long shadows. Warm neutral palette. Kinfolk aesthetic. Shallow depth of field, film grain. Landscape 16:11 editorial cover. No wood grain, no timber.
```

**Ideogram:**
```
Technical standards books stacked on smooth matte taupe desk (no wood grain), brass compass, matte calculator, leather notebook, fountain pen, ceramic coffee cup, warm afternoon light with long shadows, editorial photography, warm neutral palette. Style: Photorealistic
```

---

### 10. ART e RRT: responsabilidade técnica

**Midjourney:**
```
Editorial detail photograph of a technical document review moment: an architectural drawing sheet with official CREA stamps visible in one corner (blurred), a professional signature in dark ink, a matte black fountain pen resting perpendicularly across the paper, a rectangular certificate document folder in warm taupe leather, soft directional afternoon light from the right revealing paper texture. Kinfolk magazine aesthetic. 85mm macro lens, extremely shallow depth of field, subtle film grain. Warm neutral palette: bone paper, warm taupe leather, dark ink. Editorial cover composition, sense of professional responsibility. No lens flare, no HDR --ar 16:11 --style raw --v 6.1 --stylize 250 --chaos 15
```

**DALL-E 3:**
```
Editorial cinematic close-up detail photograph of technical document review: architectural drawing sheet with official Brazilian CREA stamps (blurred) in one corner, dark ink professional signature, matte black fountain pen resting across the paper, warm taupe leather certificate folder. Soft directional afternoon light from right revealing paper texture. Warm neutral palette. Kinfolk aesthetic. Macro shot 85mm, extremely shallow depth of field. Landscape 16:11 editorial cover.
```

**Ideogram:**
```
Architectural document with official stamps, signature in dark ink, matte black fountain pen, taupe leather folder, afternoon directional light, editorial macro photography, warm neutral palette. Style: Photorealistic
```

---

### 11. NBR 9050: acessibilidade em projetos residenciais

**Midjourney:**
```
Editorial architectural photograph of a residential accessible ramp detail: elegant tubular brass handrail with polished finish, tactile paving strip in warm ochre travertine stone, precisely-cut natural bone-colored travertine steps below the ramp, seamlessly integrated into a sophisticated modern residence entrance with a warm taupe painted wall behind, soft warm afternoon light casting elegant shadows. Kinfolk magazine aesthetic. 50mm lens, medium composition, subtle film grain. Warm neutral palette: bone travertine, warm ochre, taupe wall, brass handrail. Editorial cover composition, sophisticated inclusive design. No wood grain, no lens flare --ar 16:11 --style raw --v 6.1 --stylize 250 --chaos 15
```

**DALL-E 3:**
```
Editorial architectural cinematic photograph of residential accessible ramp detail: elegant tubular brass handrail with polished finish, tactile paving strip in warm ochre travertine, precisely-cut bone travertine steps, integrated into sophisticated modern residence entrance with warm taupe painted wall behind. Soft warm afternoon light with elegant shadows. Warm neutral palette. Kinfolk aesthetic. Medium composition 50mm. Landscape 16:11 editorial cover.
```

**Ideogram:**
```
Accessible ramp with brass handrail, ochre tactile paving, bone travertine steps, warm taupe painted wall, soft afternoon light with shadows, editorial architectural photography, sophisticated inclusive design. Style: Photorealistic
```

---

### 12. NR-18: normas de segurança em canteiro de obra

**Midjourney:**
```
Editorial documentary photograph of a Brazilian construction worker in complete safety gear (only torso and hands visible, no face): a bone-colored construction hard hat, matte terracotta reflective safety vest, clear protective glasses hanging from a lanyard, well-worn but clean work gloves, a leather tool belt with organized tools, a matte black tablet showing a safety checklist in his hands. Soft warm afternoon construction site light with a soft-focus scaffolding background. Kinfolk magazine documentary aesthetic. 50mm lens, subtle film grain. Warm neutral palette: bone, terracotta, taupe. Editorial cover composition, professional documentary atmosphere. No lens flare --ar 16:11 --style raw --v 6.1 --stylize 250 --chaos 15
```

**DALL-E 3:**
```
Editorial documentary cinematic photograph of Brazilian construction worker in complete safety gear (torso and hands only, no face): bone construction hard hat, matte terracotta reflective safety vest, clear protective glasses on lanyard, clean work gloves, leather tool belt with organized tools, matte black tablet showing safety checklist. Soft warm afternoon site light, soft-focus scaffolding background. Warm neutral palette. Kinfolk documentary aesthetic. Landscape 16:11 editorial quality.
```

**Ideogram:**
```
Construction worker torso in safety gear, bone hard hat, terracotta reflective vest, protective glasses, tool belt, tablet with checklist, soft afternoon site light, editorial documentary photography, warm neutral palette. Style: Photorealistic
```

---

### 13. NBR 5410: instalações elétricas explicadas

**Midjourney:**
```
Editorial technical photograph of a professionally organized residential electrical panel: neatly arranged circuit breakers of different muted colors (warm ochre, muted terracotta, taupe, bone) in tidy rows, each with a hand-lettered label in ink on cream tape, precision-installed copper wiring visible at the edges, a bone-colored panel door open to the side, a soft directional light from the left. Kinfolk magazine aesthetic. 50mm lens, medium composition, subtle film grain. Warm neutral palette with technical accents: bone, taupe, ochre, terracotta, copper. Editorial cover composition, showing craftsmanship. No lens flare, no HDR --ar 16:11 --style raw --v 6.1 --stylize 250 --chaos 15
```

**DALL-E 3:**
```
Editorial cinematic photograph of professionally organized residential electrical panel: neatly arranged circuit breakers in warm ochre/terracotta/taupe/bone colors, hand-lettered ink labels on cream tape, precision copper wiring visible at edges, bone panel door open to side. Soft directional light from left. Warm neutral palette with technical accents. Kinfolk aesthetic. Medium shot 50mm. Landscape 16:11 editorial cover quality showing craftsmanship.
```

**Ideogram:**
```
Organized residential electrical panel with warm-colored circuit breakers, hand-lettered labels, copper wiring, panel door open, soft directional light, editorial technical photography, warm neutral palette. Style: Photorealistic
```

---

## ✨ CURIOSIDADES (4 artigos)

### 14. 7 truques de iluminação que arquitetos usam (DESTAQUE)

**Midjourney:**
```
Editorial architectural photograph of a sophisticated living room at golden hour with layered lighting: a warm-white ceramic table lamp casting a soft pool of light on a side table, a matte brass floor lamp illuminating a taupe linen armchair, a warm wall sconce washing light down a bone-colored painted wall, a low ambient ceiling glow, a plush textured linen sofa in warm taupe with one ochre throw pillow, a small side table with smooth matte taupe finish (uniform solid color, no wood grain), a single dried floral arrangement in a ceramic vase. Kinfolk magazine aesthetic. 35mm lens, wide editorial composition, subtle film grain. Warm neutral palette: bone, taupe, warm ochre, brass accents. Sophisticated relaxed atmosphere. Editorial cover composition. No wood grain, no lens flare, no HDR --ar 16:11 --style raw --v 6.1 --stylize 250 --chaos 15
```

**DALL-E 3:**
```
Editorial cinematic architectural photograph of sophisticated living room at golden hour with layered lighting: warm-white ceramic table lamp casting soft pool of light, matte brass floor lamp illuminating taupe linen armchair, warm sconce washing bone painted wall, low ambient ceiling glow, plush textured linen taupe sofa with one ochre pillow, small side table with smooth matte taupe finish (no wood grain), dried floral arrangement in ceramic vase. Warm neutral palette with brass accents. Kinfolk aesthetic. Wide 35mm composition. Landscape 16:11 editorial cover.
```

**Ideogram:**
```
Living room at golden hour with layered lighting: ceramic table lamp, brass floor lamp, wall sconce, ceiling glow, taupe linen sofa, side table in matte taupe (no wood grain), editorial architectural photography, warm neutral palette. Style: Photorealistic
```

---

### 15. Por que casas antigas parecem mais aconchegantes (⚠️ exceção — pode usar madeira antiga como contexto histórico)

**Midjourney:**
```
Editorial architectural photograph of a classic 1940s Brazilian home interior: tall pé-direito ceiling with visible original moldings, a tall arched window with soft golden afternoon light streaming in, original geometric hydraulic tile flooring in warm bone and ochre pattern, a textured lime-washed wall in soft off-white with subtle patina, minimal vintage-inspired seating in worn cream linen, a single potted palm plant, dust particles catching in the sunbeam. Kinfolk magazine nostalgic aesthetic. 35mm lens, wide editorial composition, subtle film grain. Warm neutral palette: bone, ochre, cream, soft terracotta accents. Editorial cover composition, sense of timelessness. No lens flare, no HDR --ar 16:11 --style raw --v 6.1 --stylize 250 --chaos 15
```

**DALL-E 3:**
```
Editorial cinematic photograph of classic 1940s Brazilian home interior: tall ceiling with original moldings, tall arched window with soft golden afternoon light, original geometric hydraulic tile flooring in bone and ochre pattern, textured lime-washed off-white wall with subtle patina, minimal vintage-inspired seating in worn cream linen, potted palm, dust particles catching sunbeam. Warm neutral palette. Kinfolk nostalgic aesthetic. Wide 35mm. Landscape 16:11 editorial cover.
```

**Ideogram:**
```
1940s Brazilian home interior, tall ceiling with moldings, arched window with golden light, hydraulic tile floor in bone and ochre, lime-washed wall, vintage linen seating, potted palm, editorial nostalgic photography, warm palette. Style: Photorealistic
```

---

### 16. Regra 60-30-10 em design de interiores

**Midjourney:**
```
Editorial architectural photograph of a beautifully composed sophisticated living room demonstrating perfect color hierarchy: dominant off-white lime-washed walls and bone-colored polished concrete floor (60%), a taupe linen sofa with matching taupe linen armchair and gray linen area rug (30%), three warm ochre throw pillows and one terracotta ceramic pot with olive branches on a small side table in smooth matte taupe finish (10%, uniform solid color, no wood grain). Soft warm afternoon window light. Kinfolk magazine aesthetic. 35mm lens, wide editorial composition, subtle film grain. Warm neutral palette hierarchy. Editorial cover composition, sophisticated palette demonstration. No wood grain, no lens flare, no HDR --ar 16:11 --style raw --v 6.1 --stylize 250 --chaos 15
```

**DALL-E 3:**
```
Editorial cinematic architectural photograph of sophisticated living room demonstrating color hierarchy: dominant off-white lime-washed walls and bone polished concrete floor (60%), taupe linen sofa and armchair with gray linen rug (30%), three warm ochre throw pillows and terracotta ceramic pot with olive branches on small side table in smooth matte taupe (10%, uniform solid color, no wood grain). Soft warm afternoon window light. Warm neutral palette. Kinfolk aesthetic. Wide 35mm. Landscape 16:11 editorial cover.
```

**Ideogram:**
```
Living room with off-white walls, taupe linen sofa and armchair, gray rug, ochre pillows, terracotta ceramic pot with olive branches on side table in matte taupe (no wood grain), afternoon window light, editorial photography, warm palette. Style: Photorealistic
```

---

### 17. 10 erros clássicos de decoração

**Midjourney:**
```
Editorial architectural photograph of a perfectly composed sophisticated minimalist living room demonstrating expert composition: a large bone-colored area rug fully anchoring a taupe linen sofa and matching armchair (rug pattern beneath both pieces), floor-to-ceiling linen curtains in warm off-white cascading from the ceiling to the floor, a quiet gallery wall of three framed prints at proper eye level (1.5m height), a tall floor plant in warm ochre pot providing vertical element, layered ambient lighting from a matte brass floor lamp and a ceramic table lamp, minimal styled side table with smooth matte taupe finish (uniform solid color, no wood grain). Kinfolk magazine aesthetic. 35mm lens, wide editorial cover composition, subtle film grain. Warm neutral palette: bone, taupe, warm ochre. Magazine cover quality. No wood grain, no lens flare, no HDR --ar 16:11 --style raw --v 6.1 --stylize 250 --chaos 15
```

**DALL-E 3:**
```
Editorial cinematic architectural photograph of perfectly composed sophisticated minimalist living room: large bone area rug anchoring taupe linen sofa and armchair (rug beneath both), floor-to-ceiling linen off-white curtains from ceiling to floor, quiet gallery wall of three prints at eye level (1.5m), tall floor plant in ochre pot as vertical element, layered ambient lighting from brass floor lamp and ceramic table lamp, minimal side table in matte taupe (no wood grain). Warm neutral palette. Kinfolk aesthetic. Wide 35mm. Landscape 16:11 magazine cover quality.
```

**Ideogram:**
```
Minimalist living room with large bone rug under sofa, floor-to-ceiling curtains, gallery wall at eye level, tall floor plant in ochre pot, brass floor lamp, ceramic table lamp, side table in matte taupe (no wood grain), editorial photography, warm palette. Style: Photorealistic
```

---

## 💭 BRAINSTORMING SKETCH (3 posts)

### 18. Textura como projeto (DESTAQUE) — v4 (INTERIOR RESIDENCIAL PREMIUM)

**Por que a v3 falhava:** os modelos interpretavam "burnished concrete wall" como muro externo urbano — e vinham com poste elétrico, oxidação laranja, muro degradado, vegetação selvagem. A palavra "queimado" puxa "burned/scorched" mesmo com contexto.

**A correção v4:**
1. **Nunca sozinho como "wall"** — sempre "interior wall of a high-end residential dining room" (interior arquitetônico premium travado)
2. **Adicionar mobiliário residencial de referência** que ancora o modelo em ambiente interno (poltrona escultural, mesa lateral em travertino, vaso em cerâmica)
3. **Referenciar estúdios brasileiros de referência** — Studio MK27, Guilherme Torres — para o modelo puxar da estética residencial de luxo
4. **Negativas quintuplicadas** contra qualquer sinal de rua/exterior/degradação

**Midjourney (RECOMENDADO):**
```
Editorial interior architectural photograph of a sophisticated high-end Brazilian residential living room (Studio MK27 Marcio Kogan aesthetic, Guilherme Torres reference): the wall in the background is finished in Brazilian burnished cement (cimento queimado — premium polished trowel technique creating a silky smooth interior architectural surface with natural warm patina), warm grey-beige base color with subtle ochre and terracotta undertones from the burnishing technique, soft organic tonal variations catching the late afternoon golden window light from the left. In the foreground, softly framing the composition: a corner of a sculptural travertine side table with a single ceramic vessel in warm bone tone, and the silhouette of a modernist lounge chair partially visible (frame in smooth matte taupe MDF, not wood). The scene is intimate, warm, refined — NOT an exterior wall, NOT a street scene, NOT a ruin. Kinfolk magazine editorial aesthetic. 50mm lens, medium composition showing wall texture within a refined residential interior context, subtle film grain, shallow depth of field. Warm neutral palette: warm grey-beige wall, travertine cream, bone ceramic, taupe furniture accent. Sophisticated moody artistic composition emphasizing refined material sensibility. Absolutely NO exterior scene, NO street, NO electrical poles, NO utility poles, NO rust, NO orange oxidation, NO dirt, NO weathered ruin, NO cracks, NO vegetation growing on wall, NO urban clutter, NO wood grain on furniture, NO lens flare, NO HDR --ar 16:11 --style raw --v 6.1 --stylize 300 --chaos 8 --no exterior wall, street scene, electrical pole, utility pole, rust, orange oxidation, dirt, ruins, cracks, wild vegetation, urban, wood grain, timber
```

**DALL-E 3:**
```
Editorial interior architectural photograph of a sophisticated high-end Brazilian residential living room in the style of Studio MK27 (Marcio Kogan) or Guilherme Torres. The BACKGROUND WALL of the interior room is finished in Brazilian burnished cement (cimento queimado — a premium polished trowel technique creating a silky-smooth architectural interior surface with warm natural patina). Warm grey-beige base color with subtle ochre and terracotta undertones, soft organic tonal variations catching late afternoon golden window light from the left. In the foreground, softly framing the composition: a corner of a sculptural travertine side table with a single ceramic vessel in warm bone tone; the silhouette of a modernist lounge chair partially visible (frame in smooth matte taupe MDF, uniform solid color, no wood grain). The scene is intimate, warm, refined — an INTERIOR high-end residence, NOT an exterior wall, NOT a street, NOT a ruin. Warm neutral palette. Kinfolk editorial aesthetic. 50mm medium composition emphasizing wall texture within refined residential context. Landscape 16:11 editorial cover quality. Explicitly: no exterior scene, no street, no electrical poles, no utility poles, no rust, no orange oxidation, no dirt, no weathered ruin, no cracks, no vegetation on wall, no wood grain furniture.
```

**Ideogram:**
```
Interior of high-end Brazilian residential living room (Studio MK27 aesthetic), background wall in burnished cement (cimento queimado polished interior finish) with warm grey-beige base and subtle ochre undertones, foreground has a corner of travertine side table with bone ceramic vessel and silhouette of modernist lounge chair in taupe MDF (no wood grain), late afternoon golden window light from left, Kinfolk editorial architectural photography, warm neutral palette. Style: Photorealistic. Negative: exterior wall, street, electrical pole, utility pole, rust, orange oxidation, dirt, weathered ruin, cracks, vegetation on wall, wood grain, urban clutter
```

**Prompt B — DETALHE MACRO (se quiser variação mais texture-focused):**
```
Editorial macro architectural detail of a burnished cement interior wall in a sophisticated Brazilian residence (Studio MK27 aesthetic): silky smooth surface with warm grey-beige base color, subtle ochre and terracotta undertones, delicate organic tonal variations from the trowel technique, a soft warm late afternoon golden light grazing from the left revealing subtle texture depth, a single hint of context in the foreground softly out of focus (edge of a travertine console, a corner of a linen curtain in bone tone). Kinfolk editorial aesthetic. 85mm macro lens, extreme shallow depth of field. Warm neutral palette. Landscape 16:11. Interior residential context only — no exterior, no street, no ruins, no rust, no cracks, no vegetation
```

**Prompt C — EMERGÊNCIA (studio pack, se ainda der urbano):**
```
Product photograph of an architectural material sample: a polished burnished cement panel (cimento queimado premium interior finish) laid flat against a soft warm bone-tone paper backdrop in a photography studio. Warm grey-beige surface with subtle ochre undertones, delicate natural patina from the trowel finishing technique. Soft directional studio light from the left revealing surface texture. Warm neutral palette. Kinfolk editorial aesthetic. Landscape 16:11. Clean sophisticated material sample photography. No exterior scene, no ruins, no cracks, no rust, no dirt
```

**Fluxo recomendado para essa capa específica:**
1. Rodar o **Prompt principal Midjourney** com `--stylize 300 --chaos 8` (baixo chaos = menos variação urbana)
2. Se sair 1 de 4 que preste, upscalar essa
3. Se todas 4 vierem urbanas mesmo assim, ir direto pro **Prompt B (macro)** — é o mais controlado
4. Prompt C é rede de segurança absoluta — sempre funciona porque tira o "wall" da equação

---

### 19. A cadeira que muda tudo — design escandinavo (⚠️ crítico — refeito totalmente)

**Midjourney:**
```
Editorial architectural photograph of a contemporary sculptural chair inspired by Scandinavian design: frame made from precision-cut MDF in smooth matte taupe-grey finish (uniform solid color, absolutely no wood grain, no timber texture, no wood joinery visible — the chair frame looks like painted metal or fine plaster, not wood), a woven natural jute cord seat and backrest providing organic contrast to the smooth matte frame, positioned elegantly in the corner of a minimalist room with a soft warm off-white lime-washed wall behind, a soft directional morning window light from the right emphasizing the sculptural form, a single small side detail: a leather-bound book on the floor beside the chair. Kinfolk magazine aesthetic. 50mm lens, medium composition emphasizing form and materiality, subtle film grain. Warm neutral palette: matte taupe-grey chair frame, natural jute, bone wall. Artistic editorial composition, sophisticated design object. Absolutely no visible wood grain, no timber, no walnut, no oak, no dovetail joints, no traditional wood joinery --ar 16:11 --style raw --v 6.1 --stylize 250 --chaos 10 --no wood, timber, walnut, oak, dovetail
```

**DALL-E 3:**
```
Editorial architectural cinematic photograph of contemporary sculptural chair inspired by Scandinavian design: frame made from precision-cut MDF in smooth matte taupe-grey finish (uniform solid color, absolutely no wood grain, no timber texture — the chair frame looks like painted metal or fine plaster, not wood), woven natural jute cord seat and backrest for organic contrast, positioned elegantly in corner of minimalist room, soft warm off-white lime-washed wall behind, soft directional morning window light from right emphasizing sculptural form, leather-bound book on floor beside chair. Warm neutral palette. Kinfolk aesthetic. Medium 50mm composition. Landscape 16:11 editorial quality. Explicitly no wood grain, no timber, no walnut, no oak, no traditional wood joinery.
```

**Ideogram:**
```
Contemporary sculptural chair with matte taupe-grey MDF frame (smooth uniform finish, no wood grain, no timber texture), woven jute seat and backrest, minimalist room corner, lime-washed wall, morning light from right, leather book on floor, editorial architectural photography, warm palette. Style: Photorealistic. Negative: wood grain, timber, walnut, oak, dovetail
```

**Prompt alternativo (versão CINZA-CLARO mais moderna):**
```
Editorial photograph of contemporary sculptural chair: frame in precision-cut MDF finished in smooth matte light warm grey (absolutely no wood grain, uniform painted finish), woven natural jute seat and backrest, minimalist room corner, off-white wall behind, morning window light from right. Kinfolk aesthetic. Landscape 16:11. No wood grain, no timber
```

---

### 20. Detalhe invisível — rodapé embutido

**Midjourney:**
```
Editorial close-up architectural detail photograph of a flush recessed baseboard: seamless precision transition between a soft warm off-white lime-washed wall and a bone-colored polished concrete floor, a subtle 5mm shadow reveal line catching light delicately, extremely precise craftsmanship visible, a soft directional morning light from the right creating a gradient across the floor, a single small element in the background very softly out of focus (perhaps the base of a side table in smooth matte taupe finish, uniform solid color, no wood grain). Kinfolk magazine aesthetic. 85mm macro lens, extremely shallow depth of field, subtle film grain. Warm neutral palette: bone, off-white, taupe. Minimalist architectural detail composition. No wood grain, no lens flare, no HDR --ar 16:11 --style raw --v 6.1 --stylize 300 --chaos 15
```

**DALL-E 3:**
```
Editorial architectural close-up macro detail photograph of flush recessed baseboard: seamless precision transition between soft warm off-white lime-washed wall and bone polished concrete floor, subtle 5mm shadow reveal line catching light delicately, precise craftsmanship, soft directional morning light from right creating gradient across floor, small element softly out of focus in background (base of side table in matte taupe finish, no wood grain). Warm neutral palette. Kinfolk aesthetic. Macro 85mm extremely shallow depth of field. Landscape 16:11 minimalist architectural detail.
```

**Ideogram:**
```
Flush recessed baseboard architectural detail, seamless wall-to-floor transition, off-white lime-washed wall, bone polished concrete, subtle shadow reveal line, morning light from right, editorial macro architectural photography, warm palette. Style: Photorealistic
```

---

## 🛠️ Fluxo com Magnific

1. **Gera 1 imagem** por prompt no Midjourney (`U1-U4`) ou DALL-E 3 direto
2. **Salva original** em `.png` (para preservar qualidade)
3. **Abre no Magnific** modo automático:
   - Upscale: **2x**
   - Fidelidade: **média (Balanced)**
   - Creativity: **baixa (5-10)**
   - HDR: **desligado**
   - Detail: **médio**
4. **Exporta** como `.jpg` qualidade 85% (~250KB)
5. **Nomeia** com o slug do artigo (ex: `quanto-custa-reformar-uma-casa.jpg`)

## 🚨 Se o modelo AINDA gerar madeira

Recorra ao **prompt de refinamento** — copia isso e cola depois do prompt principal:

```
CRITICAL: the cabinetry must NOT have any wood grain, no dovetail joints, no finger joints, no antique brass round knobs, no visible timber texture. Instead, the surface must be a completely uniform smooth matte finish like painted MDF, microcement, or fine plaster. All joinery must be invisible (integrated push-open mechanism, no visible handles or knobs). Any visible wood grain or dovetail joints ruins the entire image.
```

## 📤 Upload em lote no Supabase

Nome exato de cada arquivo (usa como referência):

```
quanto-custa-reformar-uma-casa.jpg
como-escolher-projetista-sem-se-arrepender.jpg
marcenaria-sob-medida-vale-a-pena.jpg
reforma-ou-construir-do-zero.jpg
cronograma-de-obra-por-que-atrasam.jpg
contratei-uma-engenheira-o-que-muda.jpg
reforma-em-apartamento-o-que-saber.jpg
como-reformar-cozinha-sem-estourar-orcamento.jpg
nbr-15575-norma-de-desempenho-explicada.jpg
art-e-rrt-o-que-e-quando-e-obrigatorio.jpg
nbr-9050-acessibilidade-em-projetos-residenciais.jpg
nr-18-normas-de-seguranca-canteiro-de-obra.jpg
nbr-14039-instalacoes-eletricas-o-que-cliente-precisa-saber.jpg
7-truques-iluminacao-arquitetos-usam.jpg
por-que-casas-antigas-parecem-mais-aconchegantes.jpg
regra-60-30-10-design-de-interiores.jpg
10-erros-decoracao-engenheiros-identificam.jpg
textura-que-virou-projeto-parede-concreto.jpg
cadeira-que-muda-tudo-design-escandinavo.jpg
detalhe-invisivel-rodape-embutido.jpg
```

## 🗃️ Update em lote das URLs

Depois do upload, roda no Supabase substituindo `SEU-PROJETO-ID`:

```sql
update public.articles set cover_image = 'https://SEU-PROJETO-ID.supabase.co/storage/v1/object/public/site-images/artigos/covers/' || slug || '.jpg';
```

Pronto — todas as 20 capas atualizadas de uma vez.
