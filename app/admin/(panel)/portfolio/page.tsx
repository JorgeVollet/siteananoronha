import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Plus } from 'lucide-react';
import { PortfolioList } from './PortfolioList';

export default async function AdminPortfolioPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from('portfolio_projects')
    .select('*, media:portfolio_media(id, type, url, video_thumbnail)')
    .order('ordem', { ascending: true })
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-[1200px] space-y-7">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <span className="h-px w-6 block bg-[#9a744d]" />
            <span
              className="text-[0.72rem] font-bold tracking-[0.09em] uppercase"
              style={{ fontFamily: 'var(--font-body)', color: '#9a744d' }}
            >
              Gerenciamento
            </span>
          </div>
          <p
            className="max-w-md"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: '0.95rem',
              color: '#756b60',
              lineHeight: 1.5,
            }}
          >
            Cadastre obras de engenharia e projetos de marcenaria. Cada projeto pode ter múltiplas
            mídias: fotos, antes/depois ou vídeos.
          </p>
        </div>

        <Link
          href="/admin/portfolio/novo"
          className="flex shrink-0 items-center gap-2 rounded-[10px] bg-[#171614] px-5 py-2.5 text-[0.85rem] font-bold text-white shadow-[0_6px_20px_rgba(28,22,17,0.18)] transition-all hover:bg-[#29231f] hover:shadow-[0_6px_24px_rgba(166,123,79,0.22)]"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <Plus size={16} />
          Novo projeto
        </Link>
      </div>

      <PortfolioList projects={projects ?? []} />
    </div>
  );
}
