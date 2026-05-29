'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateContentField(
  section: string,
  key: string,
  value: string,
): Promise<{ error?: string }> {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('site_content')
      .upsert({ section, key, value_text: value }, { onConflict: 'section,key' });

    if (error) return { error: error.message };
    revalidatePath('/');
    return {};
  } catch (err) {
    return { error: String(err) };
  }
}

export async function updateContentBatch(
  section: string,
  fields: Record<string, string>,
): Promise<{ error?: string }> {
  try {
    const supabase = await createClient();
    const rows = Object.entries(fields).map(([key, value_text]) => ({
      section,
      key,
      value_text,
    }));

    const { error } = await supabase
      .from('site_content')
      .upsert(rows, { onConflict: 'section,key' });

    if (error) return { error: error.message };
    revalidatePath('/');
    return {};
  } catch (err) {
    return { error: String(err) };
  }
}
