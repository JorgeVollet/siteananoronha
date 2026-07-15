import type { CategorizedImage } from './types';

/**
 * Compositor de moodboard estilo "painel mental".
 *
 * Ao invés de encaixar imagens em slots fixos (que faz parecer grid do Insta),
 * espalha os items pelo canvas com rotação, sobreposição controlada e variação
 * de tamanho — cara de painel de cortiça da arquiteta.
 *
 * Determinístico: mesmo input + mesmo seed → mesmo layout.
 */

export type CollageItemKind =
  | 'polaroid'      // foto de ambiente inteira com borda branca
  | 'cutout'        // objeto com fundo removido, sombra forte
  | 'texture-torn'  // textura com bordas irregulares (border-radius assimétrico)
  | 'color-splash'; // blob orgânico só de cor

export type CollageItem = {
  image: CategorizedImage;
  kind: CollageItemKind;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number; // graus
  zIndex: number;
  tape: boolean;
};

export type Composition = {
  items: CollageItem[];
  palette: string[];
  moodWords: string[];
  seed: number;
};

const CANVAS_W = 1600;
const CANVAS_H = 1100;
const MARGIN = 70;

// LCG determinístico (linear congruential generator) — evita dep externa
function makeRng(seed: number) {
  let s = seed || 1;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

// Hash string → int (djb2)
function hashString(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) + str.charCodeAt(i);
    h = h >>> 0; // uint32
  }
  return h;
}

function pickKind(img: CategorizedImage): CollageItemKind {
  if (img.category === 'ambient' || img.category === 'architecture') {
    return 'polaroid';
  }
  if (img.category === 'color') {
    return 'color-splash';
  }
  if (img.category === 'texture') {
    return 'texture-torn';
  }
  // furniture / art / other → decide por should_isolate
  if (img.should_isolate) return 'cutout';
  return 'polaroid';
}

// Dimensões-alvo por tipo (variam levemente com rng pra dar naturalidade)
function pickSize(kind: CollageItemKind, img: CategorizedImage, rng: () => number) {
  const jitter = 0.9 + rng() * 0.2; // ±10%

  switch (kind) {
    case 'polaroid': {
      // ambient maior, furniture menor
      if (img.category === 'ambient' || img.category === 'architecture') {
        const w = 460 * jitter;
        return { width: Math.round(w), height: Math.round(w * 0.72) };
      }
      const w = 280 * jitter;
      return { width: Math.round(w), height: Math.round(w * 1.28) };
    }
    case 'cutout': {
      const w = 260 * jitter;
      return { width: Math.round(w), height: Math.round(w * 1.05) };
    }
    case 'texture-torn': {
      const w = 310 * jitter;
      return { width: Math.round(w), height: Math.round(w * 0.5) };
    }
    case 'color-splash': {
      const w = 170 * jitter;
      return { width: Math.round(w), height: Math.round(w * 0.9) };
    }
  }
}

// Zonas soft do canvas (evita amontoar no centro)
type Zone = { xMin: number; xMax: number; yMin: number; yMax: number };
const ZONES: Zone[] = [
  { xMin: MARGIN, xMax: 550, yMin: MARGIN + 60, yMax: 700 },       // esquerda alta
  { xMin: MARGIN, xMax: 550, yMin: 600,          yMax: CANVAS_H - MARGIN - 40 }, // esquerda baixa
  { xMin: 480,    xMax: 1050, yMin: MARGIN + 40, yMax: 550 },      // centro alto
  { xMin: 480,    xMax: 1050, yMin: 500,          yMax: CANVAS_H - MARGIN - 80 }, // centro baixo
  { xMin: 980,    xMax: CANVAS_W - MARGIN - 40, yMin: MARGIN + 60, yMax: 620 }, // direita alta
  { xMin: 980,    xMax: CANVAS_W - MARGIN - 40, yMin: 550,          yMax: CANVAS_H - MARGIN - 40 }, // direita baixa
];

// Verifica se um retângulo AABB se sobrepõe com >maxOverlap com outro
function overlap(a: CollageItem, x: number, y: number, w: number, h: number): number {
  const xOverlap = Math.max(0, Math.min(a.x + a.width, x + w) - Math.max(a.x, x));
  const yOverlap = Math.max(0, Math.min(a.y + a.height, y + h) - Math.max(a.y, y));
  const inter = xOverlap * yOverlap;
  const areaB = w * h;
  return areaB > 0 ? inter / areaB : 0;
}

function placeInZone(
  zone: Zone,
  w: number,
  h: number,
  rng: () => number,
  existing: CollageItem[],
  maxOverlap: number,
  attempts = 30,
): { x: number; y: number } {
  let best = { x: 0, y: 0, score: 999 };
  for (let i = 0; i < attempts; i++) {
    const xMax = Math.max(zone.xMin, zone.xMax - w);
    const yMax = Math.max(zone.yMin, zone.yMax - h);
    const x = zone.xMin + rng() * (xMax - zone.xMin);
    const y = zone.yMin + rng() * (yMax - zone.yMin);

    let worst = 0;
    for (const item of existing) {
      const o = overlap(item, x, y, w, h);
      if (o > worst) worst = o;
    }
    if (worst < best.score) {
      best = { x, y, score: worst };
    }
    if (worst < maxOverlap) break;
  }
  return { x: Math.round(best.x), y: Math.round(best.y) };
}

// Deduplica cores próximas por distância euclidiana em RGB
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function colorDistance(a: string, b: string): number {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function aggregatePalette(images: CategorizedImage[]): string[] {
  const all: string[] = [];
  for (const img of images) {
    for (const c of img.dominant_colors || []) {
      all.push(c.toLowerCase());
    }
  }

  // Deduplica cores muito próximas (distância < 40)
  const unique: string[] = [];
  for (const c of all) {
    if (!unique.some((u) => colorDistance(u, c) < 40)) {
      unique.push(c);
    }
  }

  // Ordena por luminosidade (clara → escura)
  unique.sort((a, b) => luminance(b) - luminance(a));

  // Fallback neutro se paleta ficou pobre
  const fallback = ['#f5f0e9', '#eee5da', '#c19366', '#9a744d', '#171411'];
  const merged = [...unique];
  for (const f of fallback) {
    if (merged.length >= 5) break;
    if (!merged.some((m) => colorDistance(m, f) < 40)) {
      merged.push(f);
    }
  }

  return merged.slice(0, 5);
}

function pickMoodWords(images: CategorizedImage[], rng: () => number): string[] {
  const words = Array.from(
    new Set(images.map((i) => (i.mood_keyword || '').trim()).filter(Boolean)),
  );

  // Embaralha (Fisher-Yates com seed)
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }

  // Fallback se não tem palavras suficientes
  const defaults = ['aconchego', 'materialidade', 'luz suave'];
  const merged = [...words];
  for (const d of defaults) {
    if (merged.length >= 3) break;
    if (!merged.includes(d)) merged.push(d);
  }

  return merged.slice(0, 3);
}

export function composeCollage(
  images: CategorizedImage[],
  sessionId?: string,
): Composition {
  const seed = sessionId ? hashString(sessionId) : Math.floor(Math.random() * 1e9);
  const rng = makeRng(seed);

  // Prioriza: primeiro ambient/architecture (hero), depois texturas, depois cutouts, depois cores
  const priorityOrder: Record<string, number> = {
    ambient: 0,
    architecture: 1,
    texture: 2,
    furniture: 3,
    art: 3,
    other: 4,
    color: 5,
  };
  const sorted = [...images].sort(
    (a, b) => (priorityOrder[a.category] ?? 9) - (priorityOrder[b.category] ?? 9),
  );

  const items: CollageItem[] = [];
  let zoneIdx = 0;
  const shuffledZones = [...ZONES].sort(() => rng() - 0.5);

  for (const img of sorted) {
    const kind = pickKind(img);
    const { width, height } = pickSize(kind, img, rng);
    const zone = shuffledZones[zoneIdx % shuffledZones.length];
    zoneIdx++;

    const maxOverlap = kind === 'cutout' ? 0.35 : 0.15; // cutouts podem sobrepor mais
    const { x, y } = placeInZone(zone, width, height, rng, items, maxOverlap);

    const rotationRange =
      kind === 'polaroid' ? 6 :
      kind === 'cutout' ? 10 :
      kind === 'texture-torn' ? 8 : 0;
    const rotation = (rng() * 2 - 1) * rotationRange;

    // Cutouts z-index acima (flutuam sobre polaroids)
    const zIndex =
      kind === 'color-splash' ? 1 :
      kind === 'texture-torn' ? 2 :
      kind === 'polaroid' ? 3 :
      kind === 'cutout' ? 5 : 4;

    // Fita crepe em ~40% das polaroids
    const tape = kind === 'polaroid' && rng() < 0.4;

    items.push({
      image: img,
      kind,
      x,
      y,
      width,
      height,
      rotation,
      zIndex,
      tape,
    });
  }

  return {
    items,
    palette: aggregatePalette(images),
    moodWords: pickMoodWords(images, rng),
    seed,
  };
}
