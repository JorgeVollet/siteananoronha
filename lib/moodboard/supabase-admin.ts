import { createClient } from '@supabase/supabase-js';

/**
 * Cliente Supabase admin isolado para o Moodboard Generator.
 * Propositalmente NÃO tipado com Database — as tabelas moodboard_* não estão
 * no schema gerado ainda. USAR APENAS em Route Handlers server-side.
 */
export function createMoodboardAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
