# Capa 18 — Textura como projeto (parede cimento queimado) · v4

**Fluxo:** Midjourney → Magnific AI (fidelidade balanceada) → salvar .jpg 2000x1375px

---

## 🎯 PROMPT PRINCIPAL — Midjourney (recomendado)

```
Editorial interior architectural photograph of a sophisticated high-end Brazilian residential living room (Studio MK27 Marcio Kogan aesthetic, Guilherme Torres reference): the wall in the background is finished in Brazilian burnished cement (cimento queimado — premium polished trowel technique creating a silky smooth interior architectural surface with natural warm patina), warm grey-beige base color with subtle ochre and terracotta undertones from the burnishing technique, soft organic tonal variations catching the late afternoon golden window light from the left. In the foreground, softly framing the composition: a corner of a sculptural travertine side table with a single ceramic vessel in warm bone tone, and the silhouette of a modernist lounge chair partially visible (frame in smooth matte taupe MDF, not wood). The scene is intimate, warm, refined — NOT an exterior wall, NOT a street scene, NOT a ruin. Kinfolk magazine editorial aesthetic. 50mm lens, medium composition showing wall texture within a refined residential interior context, subtle film grain, shallow depth of field. Warm neutral palette: warm grey-beige wall, travertine cream, bone ceramic, taupe furniture accent. Sophisticated moody artistic composition emphasizing refined material sensibility. Absolutely NO exterior scene, NO street, NO electrical poles, NO utility poles, NO rust, NO orange oxidation, NO dirt, NO weathered ruin, NO cracks, NO vegetation growing on wall, NO urban clutter, NO wood grain on furniture, NO lens flare, NO HDR --ar 16:11 --style raw --v 6.1 --stylize 300 --chaos 8 --no exterior wall, street scene, electrical pole, utility pole, rust, orange oxidation, dirt, ruins, cracks, wild vegetation, urban, wood grain, timber
```

---

## 🎯 PROMPT DALL-E 3 (se preferir esse)

```
Editorial interior architectural photograph of a sophisticated high-end Brazilian residential living room in the style of Studio MK27 (Marcio Kogan) or Guilherme Torres. The BACKGROUND WALL of the interior room is finished in Brazilian burnished cement (cimento queimado — a premium polished trowel technique creating a silky-smooth architectural interior surface with warm natural patina). Warm grey-beige base color with subtle ochre and terracotta undertones, soft organic tonal variations catching late afternoon golden window light from the left. In the foreground, softly framing the composition: a corner of a sculptural travertine side table with a single ceramic vessel in warm bone tone; the silhouette of a modernist lounge chair partially visible (frame in smooth matte taupe MDF, uniform solid color, no wood grain). The scene is intimate, warm, refined — an INTERIOR high-end residence, NOT an exterior wall, NOT a street, NOT a ruin. Warm neutral palette. Kinfolk editorial aesthetic. 50mm medium composition emphasizing wall texture within refined residential context. Landscape 16:11 editorial cover quality. Explicitly: no exterior scene, no street, no electrical poles, no utility poles, no rust, no orange oxidation, no dirt, no weathered ruin, no cracks, no vegetation on wall, no wood grain furniture.
```

---

## 🆘 PROMPT DE EMERGÊNCIA (se o principal ainda vier urbano)

Studio pack — impossível vir com poste ou muro degradado porque não tem cenário:

```
Product photograph of an architectural material sample: a polished burnished cement panel (cimento queimado premium interior finish) laid flat against a soft warm bone-tone paper backdrop in a photography studio. Warm grey-beige surface with subtle ochre undertones, delicate natural patina from the trowel finishing technique. Soft directional studio light from the left revealing surface texture. Warm neutral palette. Kinfolk editorial aesthetic. Landscape 16:11. Clean sophisticated material sample photography. No exterior scene, no ruins, no cracks, no rust, no dirt
```

---

## 📌 O que mudou vs. a versão que deu errado

| Antes | Agora |
|---|---|
| "burnished concrete wall" (solto) | "background wall of an interior residential living room" |
| Sem mobiliário no cenário | Travertino + cerâmica + poltrona ancoram como interior |
| Sem referência de estilo | Studio MK27 + Guilherme Torres (residencial de luxo BR) |
| Negativas curtas | 15+ negativas específicas contra "urbano" |
| chaos alto | `--chaos 8` (baixa variação selvagem) |

---

**Depois de gerar:** passa no Magnific AI (fidelidade balanceada) → salva 2000x1375px como `18-textura-como-projeto.jpg` na pasta `/public/img/artigos/`.
