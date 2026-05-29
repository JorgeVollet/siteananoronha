import { createClient } from '@/lib/supabase/server';
import type { ProjectWithMedia } from '@/lib/types/database';

export async function getPublishedProjects(): Promise<ProjectWithMedia[]> {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from('portfolio_projects')
    .select('*, media:portfolio_media(*)')
    .eq('is_published', true)
    .order('ordem', { ascending: true });

  if (error) {
    console.error('getPublishedProjects error:', error);
    return [];
  }

  return (projects ?? []).map((p) => ({
    ...p,
    media: ((p.media as { ordem: number }[]) ?? []).sort((a, b) => a.ordem - b.ordem),
  })) as ProjectWithMedia[];
}

export async function getProjectsByCategory(): Promise<{
  engenharia: ProjectWithMedia[];
  marcenaria: ProjectWithMedia[];
}> {
  const all = await getPublishedProjects();
  return {
    engenharia: all.filter((p) => p.category === 'engenharia'),
    marcenaria: all.filter((p) => p.category === 'marcenaria'),
  };
}
