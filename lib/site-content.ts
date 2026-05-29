import { createClient } from '@/lib/supabase/server';

/**
 * Busca uma única chave de site_content com fallback.
 * Usar em Server Components.
 *
 * @example
 *   const titulo = await getContent('hero', 'titulo', 'Título padrão');
 */
export async function getContent(
  section: string,
  key: string,
  fallback: string,
): Promise<string> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('site_content')
      .select('value_text')
      .eq('section', section)
      .eq('key', key)
      .maybeSingle();

    return data?.value_text ?? fallback;
  } catch {
    return fallback;
  }
}

/**
 * Busca todas as chaves de uma seção numa única query.
 * Retorna Record<key, value_text>.
 * Valores ausentes: usar fallbacks no chamador.
 *
 * @example
 *   const footer = await getSectionContent('footer');
 *   const whatsapp = footer.whatsapp ?? '5521999999999';
 */
export async function getSectionContent(
  section: string,
): Promise<Record<string, string>> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('site_content')
      .select('key, value_text')
      .eq('section', section);

    const result: Record<string, string> = {};
    for (const row of data ?? []) {
      if (row.value_text != null) result[row.key] = row.value_text;
    }
    return result;
  } catch {
    return {};
  }
}
