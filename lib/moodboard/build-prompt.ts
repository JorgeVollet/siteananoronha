import type { CategorizedImage } from './types';
import type { RoomType } from './build-brief';

/**
 * Instruções específicas por cômodo — enriquece a LAYER_A com detalhes
 * do que TEM que aparecer em cada tipo de ambiente.
 */
const ROOM_INSTRUCTIONS: Record<RoomType, string> = {
  'living-room':
    'A LIVING ROOM interior — must clearly show a sofa or seating arrangement, a coffee table or side tables, soft rug, and living room ambient elements. NOT a bedroom, NOT a kitchen.',
  'kitchen':
    'A KITCHEN interior — must clearly show kitchen elements: a countertop, cabinetry, kitchen island or workspace, backsplash, sink or cooking area. Refined and minimalist, quiet luxury style. Warm wood cabinets, stone countertops, subtle brass fixtures. NOT a living room, NOT a bathroom.',
  'bedroom':
    'A BEDROOM interior — must clearly show a bed with linen bedding, nightstands, soft ambient lighting, and bedroom atmosphere. NOT a living room, NOT an office.',
  'bathroom':
    'A BATHROOM interior — must clearly show bathroom elements: a bathtub or shower, sink vanity, mirror, elegant fixtures. Sophisticated, spa-like, with natural stone and warm wood. NOT a kitchen, NOT a bedroom.',
  'home-office':
    'A HOME OFFICE / STUDY interior — must clearly show a desk, chair, bookshelves or storage, and workspace atmosphere. Refined, quiet, contemplative. NOT corporate/cubicle style.',
  'dining-room':
    'A DINING ROOM interior — must clearly show a dining table with chairs, pendant lighting above, and dining atmosphere. Elegant, warm, inviting.',
  'entryway':
    'An ENTRYWAY or HALL interior — must clearly show entry elements: console table, mirror or art, floor rug, coat storage or bench. Welcoming, refined.',
  'closet':
    'A WALK-IN CLOSET interior — must clearly show organized wardrobe elements: hanging storage, shelving, drawers, dressing bench or mirror. Luxurious, calm, well-organized.',
  'outdoor-area':
    'An OUTDOOR/BALCONY/TERRACE space — must clearly show outdoor lounge area: outdoor seating, plants, natural stone or wood floor, ambient warm lighting. NOT indoor.',
  'spa-wellness':
    'A SPA / WELLNESS AREA interior — must clearly show relaxation elements: bathtub or plunge pool, natural stone, soft towels, candles, plants. Serene, sensory.',
  'generic-interior':
    'A refined residential interior space — any of: living room, reading corner, or intimate lounge area. Casa Vogue Brasil style.',
};

/**
 * Prompt v4 — VISION BOARD IMERSIVO, ULTRA-DENSO, 16:9 WIDESCREEN
 *
 * Estratégia:
 * - Fundo = foto real de ambiente Casa Vogue Brasil (LAYER A)
 * - Overlay = SUPER DENSO com 6-8 polaroids grandes + 3-4 swatches + 5-8
 *   micro-elementos + palette + assinatura, TODOS COM SOBREPOSIÇÃO (LAYER B)
 * - Gemini deve extrapolar criativamente das refs (adicionar variações)
 * - Blindagens fortes contra: palavras erradas, elementos omitidos, formato
 *
 * Escrito em INGLÊS. Palavras à mão em PT-BR via lista literal.
 */

const OPENING = `Generate a REALISTIC PHOTOGRAPHIC EDITORIAL IMAGE — a Casa Vogue Brasil magazine spread. A senior Brazilian architect has taped, glued and pinned a RICH, DENSE, HEAVILY LAYERED moodboard on top of a photograph of the actual space.

The final image has TWO integrated layers:

LAYER A — BASE PHOTOGRAPH: A photorealistic wide widescreen photograph of a real, sophisticated Brazilian interior space.

LAYER B — SUPER-DENSE CURATORIAL OVERLAY: A rich, heavily populated collection of polaroids, torn material swatches, small objects, tape strips, paint chips, sketches, palette dots and handwritten annotations — organized organically ON TOP of Layer A, with SIGNIFICANT VISUAL DENSITY. Elements MUST OVERLAP each other in some areas, creating tactile depth. Think of a designer's presentation wall that is FULL, not sparse. Papers touch. Polaroids partially cover other polaroids. Tape crosses over edges of things. This should feel abundant.

The two layers must feel PHYSICALLY INTEGRATED — identical light temperature, consistent shadows falling in the same direction, tactile realism. This must look like a photograph of a real designer's wall, NOT a flat digital collage.`;

function buildLayerA(roomType: RoomType): string {
  return `LAYER A — BASE PHOTOGRAPH SPECIFICATIONS:

- Content: ${ROOM_INSTRUCTIONS[roomType]}
- Style: Casa Vogue Brasil editorial photography — quiet luxury, warm minimalism, Brazilian sensibility
- Lighting: soft golden natural daylight from a window at golden hour, diagonal warm shadows, no harsh highlights, no fluorescent
- Materials visible: light wood grain (freijó, tauari, ipê or oak), travertine or Brazilian stone, natural linen, matte terracotta, brass details, natural cotton, thick woven rugs, discreet indoor plants
- Composition: architectural, spacious, lived-in. Foreground + middle + background depth. Reserve some negative wall/floor area — that's where the dense overlay will land.
- Color palette in the photo: warm earth tones, muted terracottas, warm off-whites, soft browns, taupes, deep espresso. ZERO neon, ZERO saturated primaries, ZERO synthetic pastels.`;
}

const LAYER_B = `LAYER B — SUPER-DENSE CURATORIAL OVERLAY:

This layer must be VISUALLY ABUNDANT and RICHLY LAYERED. Include ALL categories below, in the quantities specified. THE OVERLAY MUST COVER A LARGE AREA OF THE FRAME — not just a small corner.

1. POLAROID PRINTS — INCLUDE 6 TO 8 OF THEM (SIX MINIMUM, EIGHT MAXIMUM):
   - Each shows a DIFFERENT close-up subject: various objects, furniture pieces, lighting fixtures, textiles, art details, architectural moments
   - Wide white borders (about 12% of print size, thicker at bottom)
   - VARIED sizes — some LARGE (up to 20% of frame width), some medium, some smaller. Avoid uniform sizes.
   - Varied rotations between -12° and +12°
   - Realistic soft drop shadows
   - Attached with small pieces of pale beige masking tape at top edge
   - SEVERAL POLAROIDS MUST PARTIALLY OVERLAP each other — layered on top of each other like a real board

2. MATERIAL/TEXTURE SWATCHES — INCLUDE 3 TO 4 OF THEM:
   - Rectangles with HAND-TORN paper edges (rough, irregular)
   - Show extreme close-ups of natural materials: wood grain, linen weave, raw stone, travertine, terracotta, jute, cotton, marble, boucle, velvet
   - Substantial size (about 8-12% of frame width each)
   - Some tucked BEHIND polaroids, others in front

3. MICRO CURATORIAL OBJECTS — INCLUDE 5 TO 8 SMALL ELEMENTS scattered organically:
   - Paint chip cards (like Farrow & Ball or Suvinil) — small rectangles with solid color + a tiny label bar (unreadable text-like marks)
   - Loose pieces of masking tape not attached to anything (visual noise)
   - Small pressed leaf or dried botanical (muted colors only, no bright flowers)
   - A small architectural sketch on a torn notebook page (abstract lines, NO readable text)
   - A brass paperclip or pushpin
   - A tiny bundle of natural jute twine or fabric ribbon
   - A small folded fabric corner

4. COLOR PALETTE — MANDATORY, DO NOT OMIT:
   - EXACTLY 5 solid circles arranged in a horizontal row in the BOTTOM-LEFT corner
   - Each dot about 4% of image width
   - Warm earth tones from the palette provided in the session brief
   - Subtle white ring outline around each dot
   - This element MUST APPEAR — check the image before finishing

5. HANDWRITTEN PORTUGUESE WORDS — READ THESE RULES CAREFULLY:
   - Include exactly 2 handwritten short words on the image (2 words total, not more)
   - The words MUST be copied VERBATIM, character by character, from this exact list:
     {{MOOD_WORDS_QUOTED}}
   - CRITICAL LITERAL COPY: Do NOT invent words. Do NOT combine or morph. Do NOT translate. Do NOT add or remove letters. If source word is "acolhedor", write exactly "acolhedor" — NOT "acolubor", NOT "acolhador". If source is "serenidade", write exactly "serenidade" — NOT "sereniiade", NOT "serenidrade".
   - Style: relaxed cursive handwriting, ink pen on paper
   - Color: warm dark brown (#3a332d)
   - Size: small (~2.5% of image height per word)
   - Slight rotation (-4° to +4°)

6. SIGNATURE — MANDATORY, DO NOT OMIT, READ CAREFULLY:
   - Small handwritten text in the BOTTOM-RIGHT corner
   - Text must read EXACTLY: AN engenharia
   - "AN" uppercase, no space between A and N (write "AN", NOT "A N")
   - "engenharia" all lowercase, no accent marks
   - Written as a single fluid handwritten phrase in muted terracotta color
   - This element MUST APPEAR — check the image before finishing`;

const CREATIVE_EXTRAPOLATION = `CREATIVE EXTRAPOLATION FROM REFERENCES:

You have reference photographs but must NOT limit overlay content to only those exact objects. Instead:
- STUDY the references to understand mood, palette, materials, stylistic direction
- GENERATE additional coherent objects that expand the mood: if refs show one pendant lamp, ADD polaroids of OTHER lamps in same aesthetic. If refs show one chair, imagine complementary chairs. If one texture, add related complementary textures.
- The board should feel like the architect BUILT UPON client's inspiration, adding curatorial expertise. Not a literal reproduction.
- Every generated element must respect the mood: quiet luxury, warm earth tones, natural materials, Brazilian sensibility.`;

const DENSITY_CHECKLIST = `FINAL CHECKLIST BEFORE COMPLETING — verify the image contains:
[ ] 6-8 polaroids of varied sizes and subjects (not 3, not 4)
[ ] 3-4 torn material swatches
[ ] 5-8 micro objects (paint chips, tape, leaves, sketches, clips, ribbon)
[ ] Elements overlapping in some areas (tactile density)
[ ] Color palette: 5 dots in bottom-left (do not omit)
[ ] Signature: "AN engenharia" in bottom-right (do not omit)
[ ] Handwritten words spelled EXACTLY as provided (verify letter by letter)
[ ] Base photograph shows a real interior space, not a wall
[ ] 16:9 widescreen aspect ratio`;

const STRICT_PROHIBITIONS = `STRICT PROHIBITIONS — the image MUST NOT include:
- Neon, fluorescent or saturated primary colors
- Food, meals, dishes with food, edible items
- Religious symbols, crosses, altars, iconography
- Urban exterior scenes: streets, buildings, cars, traffic, city skylines
- Animals of any kind
- Human faces, human bodies, human silhouettes
- Any readable body text (only the 2 mood words + "AN engenharia" signature)
- Invented Portuguese words not in the provided list
- English words or any language other than Portuguese
- Fake logos, watermarks, QR codes, barcodes
- Corporate/office furniture, ergonomic chairs
- Digital screens, phones, computers, TVs
- Cartoon or illustration styles — photographic realism throughout`;

const FORMAT = `FORMAT: LANDSCAPE 16:9 aspect ratio, approximately 1600×900 pixels. Widescreen editorial. Full color, photorealistic, no borders around the final image.`;

export function buildGeminiPrompt(params: {
  brief: string;
  roomType: RoomType;
  moodWords: string[];
  palette: string[];
  categorized: CategorizedImage[];
  referenceCount: number;
}): string {
  const { brief, roomType, moodWords, palette, categorized, referenceCount } = params;
  const LAYER_A = buildLayerA(roomType);

  const moodWordsQuoted = moodWords
    .slice(0, 2) // Só 2 palavras no v4 (menos chance de erro de spelling)
    .map((w) => `"${w.trim()}"`)
    .join(', ');

  const layerB = LAYER_B.replace('{{MOOD_WORDS_QUOTED}}', moodWordsQuoted);

  const descriptorList = categorized
    .map(
      (img) =>
        `- ${img.descriptor} (${img.category}, mood: ${img.mood_keyword})`,
    )
    .join('\n');

  const sessionLayer = `SESSION-SPECIFIC BRIEF:

${brief}

Attached reference photographs: You have received ${referenceCount} photograph(s) from the client. USE THEM AS INSPIRATION for:
- Style and atmosphere of LAYER A
- Materials, objects and textures in LAYER B polaroids and swatches
- Overall palette

DO NOT copy any reference literally. EXTRAPOLATE — add complementary pieces that ENRICH the mood beyond what refs literally show.

Reference descriptors:
${descriptorList}

Color palette dots to feature (5 dots, bottom-left):
${palette.map((c) => `- ${c}`).join('\n')}

Handwritten mood words (copy these EXACT Portuguese words, no morphing, no invention):
${moodWords.slice(0, 2).map((w) => `- "${w}"`).join('\n')}`;

  return [
    OPENING,
    LAYER_A,
    layerB,
    CREATIVE_EXTRAPOLATION,
    STRICT_PROHIBITIONS,
    FORMAT,
    sessionLayer,
    DENSITY_CHECKLIST,
    'Generate the final vision board image now — photorealistic, editorially DENSE (6-8 polaroids + swatches + micro-elements overlapping), 16:9 widescreen. Respect every text constraint literally. Do NOT omit the palette dots or the signature.',
  ].join('\n\n---\n\n');
}
