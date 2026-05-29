import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Briefcase, MousePointerClick, FileImage, ArrowUpRight } from 'lucide-react';

export default async function DashboardPage() {
  const supabase = await createClient();

  const [projectsResult, ctaResult, mediaResult] = await Promise.all([
    supabase
      .from('portfolio_projects')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true),
    supabase.from('cta_clicks').select('*', { count: 'exact', head: true }),
    supabase.from('portfolio_media').select('*', { count: 'exact', head: true }),
  ]);

  const projectCount = projectsResult.count ?? 0;
  const ctaCount = ctaResult.count ?? 0;
  const mediaCount = mediaResult.count ?? 0;

  return (
    <div className="max-w-[1200px] space-y-8">
      {/* Header */}
      <div>
        <div className="mb-2 flex items-center gap-3">
          <span className="h-px w-6 block bg-[#9a744d]" />
          <span
            className="text-[0.72rem] font-bold tracking-[0.09em] uppercase"
            style={{ fontFamily: 'var(--font-body)', color: '#9a744d' }}
          >
            Visão geral
          </span>
          <span className="h-px w-6 block bg-[#9a744d]" />
        </div>
        <p
          className="max-w-lg"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: '1rem',
            color: '#756b60',
            lineHeight: 1.5,
          }}
        >
          Acompanhe os números do site e gerencie o conteúdo.
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard
          label="Projetos publicados"
          value={projectCount}
          icon={Briefcase}
          trend="No banco"
          isLink
          href="/admin/portfolio"
        />
        <KpiCard
          label="Mídias cadastradas"
          value={mediaCount}
          icon={FileImage}
          trend="Fotos, AB, vídeos"
        />
        <KpiCard
          label="Cliques em CTA"
          value={ctaCount}
          icon={MousePointerClick}
          trend="Total acumulado"
        />
        <KpiCard
          label="Visitantes"
          value="—"
          icon={ArrowUpRight}
          trend="Via Vercel Analytics"
        />
      </div>

      {/* Welcome / Onboarding card */}
      <div
        className="rounded-[16px] border border-[#d8c9b8] p-7"
        style={{ background: '#faf6f0' }}
      >
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-6 block bg-[#9a744d]" />
          <span
            className="text-[0.72rem] font-bold tracking-[0.09em] uppercase"
            style={{ fontFamily: 'var(--font-body)', color: '#9a744d' }}
          >
            Começar
          </span>
        </div>

        <h2
          className="mb-3"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(22px, 2vw, 30px)',
            letterSpacing: '-0.04em',
            color: '#171411',
            lineHeight: 1.1,
          }}
        >
          Bem-vinda ao{' '}
          <em style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>painel.</em>
        </h2>

        <ul
          className="space-y-2.5"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: '0.95rem',
            color: '#756b60',
            lineHeight: 1.6,
          }}
        >
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9a744d]" />
            Cadastre seu primeiro projeto na aba{' '}
            <Link href="/admin/portfolio" className="font-bold text-[#9a744d] hover:underline">
              Portfólio
            </Link>{' '}
            para ver as obras aparecendo no site público.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9a744d]" />
            Edite textos e imagens das seções em{' '}
            <Link href="/admin/conteudo" className="font-bold text-[#9a744d] hover:underline">
              Conteúdo
            </Link>
            .
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9a744d]" />
            Atualize WhatsApp, email e redes sociais em{' '}
            <Link href="/admin/footer" className="font-bold text-[#9a744d] hover:underline">
              Footer & Contato
            </Link>
            .
          </li>
        </ul>
      </div>
    </div>
  );
}

function KpiCard({
  label,
  value,
  icon: Icon,
  trend,
  isLink,
  href,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  trend: string;
  isLink?: boolean;
  href?: string;
}) {
  const inner = (
    <div
      className="group flex flex-col gap-3 rounded-[16px] border border-[#d8c9b8] p-5 transition-all duration-300 hover:shadow-[0_8px_28px_rgba(166,123,79,0.14)]"
      style={{ background: '#faf6f0' }}
    >
      <div className="flex items-start justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-[10px]"
          style={{ background: '#eee5da' }}
        >
          <Icon size={18} style={{ color: '#9a744d' }} />
        </div>
        {isLink && (
          <ArrowUpRight
            size={16}
            className="opacity-0 transition-opacity group-hover:opacity-100"
            style={{ color: '#9a744d' }}
          />
        )}
      </div>
      <div>
        <p
          className="text-[0.75rem] font-bold tracking-[0.06em] uppercase"
          style={{ fontFamily: 'var(--font-body)', color: '#9a8878' }}
        >
          {label}
        </p>
        <p
          className="mt-0.5 text-[1.8rem] font-bold leading-none"
          style={{ fontFamily: 'var(--font-display)', color: '#171411' }}
        >
          {value}
        </p>
        <p
          className="mt-1.5 text-[0.72rem]"
          style={{ fontFamily: 'var(--font-body)', color: '#b8a89a' }}
        >
          {trend}
        </p>
      </div>
    </div>
  );

  if (isLink && href) {
    return (
      <Link href={href} className="block">
        {inner}
      </Link>
    );
  }
  return inner;
}
