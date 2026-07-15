import { notFound } from 'next/navigation';
import { createMoodboardAdminClient } from '@/lib/moodboard/supabase-admin';
import { MoodboardResult } from '@/components/moodboard/MoodboardResult';

export const revalidate = 0;

export default async function MoodboardResultPage({
  params,
}: {
  params: { sessionSlug: string };
}) {
  const supabase = createMoodboardAdminClient();
  const { data: session } = await supabase
    .from('moodboard_sessions')
    .select('*')
    .eq('slug', params.sessionSlug)
    .single();

  if (
    !session ||
    (session.status !== 'generated' && session.status !== 'delivered')
  ) {
    notFound();
  }

  return <MoodboardResult session={session} />;
}
