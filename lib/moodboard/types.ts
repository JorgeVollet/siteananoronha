export type ImageCategory =
  | 'furniture'
  | 'texture'
  | 'color'
  | 'art'
  | 'architecture'
  | 'ambient'
  | 'other';

/**
 * @deprecated Removido no v2 (painel mental). Mantido só pra retro-compat de tipos.
 */
export type SlotPosition = 'A' | 'B' | 'C' | 'D';

export type TemplateVariant = 'sereno' | 'vibrante' | 'contraste' | 'painel-mental';

export type MoodboardSession = {
  id: string;
  slug: string;
  status:
    | 'created'
    | 'uploading'
    | 'processing'
    | 'generated'
    | 'delivered'
    | 'failed';
  cover_url: string | null;
  palette: string[] | null;
  template_variant: TemplateVariant;
  created_at: string;
  generated_at: string | null;
};

export type MoodboardImage = {
  id: string;
  session_id: string;
  original_url: string;
  processed_url: string | null;
  category: ImageCategory | null;
  descriptor: string | null;
  confidence: number | null;
  slot_position: SlotPosition | null;
  // v2 (painel mental)
  mood_keyword: string | null;
  dominant_colors: string[] | null;
  should_isolate: boolean | null;
};

export type CategorizedImage = MoodboardImage & {
  category: ImageCategory;
  confidence: number;
  mood_keyword: string;
  dominant_colors: string[];
  should_isolate: boolean;
};
