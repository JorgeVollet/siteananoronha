'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { deleteProject as deleteProjectAction } from './_actions/project';
import { toast } from 'sonner';
import { Edit, Eye, EyeOff, Trash2, Search, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

type MediaLite = {
  id: string;
  type: string;
  url: string | null;
  video_thumbnail: string | null;
};

type ProjectLite = {
  id: string;
  category: 'engenharia' | 'marcenaria';
  nome: string;
  tipologia: string;
  servicos: string[];
  ordem: number;
  is_published: boolean;
  media: MediaLite[];
};

type Filter = 'todos' | 'engenharia' | 'marcenaria';

export function PortfolioList({ projects: initial }: { projects: ProjectLite[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectLite[]>(initial);
  const [filter, setFilter] = useState<Filter>('todos');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = projects;
    if (filter !== 'todos') list = list.filter((p) => p.category === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.nome.toLowerCase().includes(q) ||
          p.tipologia.toLowerCase().includes(q) ||
          p.servicos.some((s) => s.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [projects, filter, search]);

  async function togglePublish(project: ProjectLite) {
    const supabase = createClient();
    const newValue = !project.is_published;
    const { error } = await supabase
      .from('portfolio_projects')
      .update({ is_published: newValue })
      .eq('id', project.id);

    if (error) {
      toast.error('Erro ao atualizar projeto');
      return;
    }
    setProjects((list) =>
      list.map((p) => (p.id === project.id ? { ...p, is_published: newValue } : p)),
    );
    toast.success(newValue ? 'Projeto publicado' : 'Projeto despublicado');
    router.refresh();
  }

  async function deleteProject(project: ProjectLite) {
    const confirmed = window.confirm(
      `Excluir o projeto "${project.nome}"?\n\nIsso também remove todas as mídias associadas. Esta ação não pode ser desfeita.`,
    );
    if (!confirmed) return;

    const result = await deleteProjectAction(project.id);
    if ('error' in result) {
      toast.error('Erro ao excluir projeto: ' + result.error);
      return;
    }

    setProjects((list) => list.filter((p) => p.id !== project.id));
    toast.success('Projeto excluído');
    router.refresh();
  }

  /* ── EMPTY STATE ── */
  if (projects.length === 0) {
    return (
      <div
        className="flex flex-col items-center rounded-[16px] border border-[#d8c9b8] px-8 py-16 text-center"
        style={{ background: '#faf6f0' }}
      >
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 block bg-[#9a744d]" />
          <span
            className="text-[0.72rem] font-bold tracking-[0.09em] uppercase"
            style={{ fontFamily: 'var(--font-body)', color: '#9a744d' }}
          >
            Vazio
          </span>
          <span className="h-px w-8 block bg-[#9a744d]" />
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
          Nenhum projeto{' '}
          <em style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>cadastrado ainda.</em>
        </h2>

        <p
          className="mb-8 max-w-sm"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: '0.95rem',
            color: '#756b60',
            lineHeight: 1.6,
          }}
        >
          Comece criando seu primeiro projeto. Você poderá adicionar fotos, antes/depois e vídeos
          depois.
        </p>

        <Link
          href="/admin/portfolio/novo"
          className="flex items-center gap-2 rounded-[10px] bg-[#171614] px-6 py-3 text-[0.88rem] font-bold text-white shadow-[0_8px_24px_rgba(28,22,17,0.18)] transition-all hover:bg-[#29231f] hover:shadow-[0_8px_28px_rgba(166,123,79,0.22)]"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <Plus size={16} />
          Cadastrar primeiro projeto
        </Link>
      </div>
    );
  }

  /* ── LISTA ── */
  return (
    <div className="space-y-5">
      {/* Filtros + Busca */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Pills de filtro */}
        <div
          className="flex gap-1 rounded-full p-1 self-start"
          style={{ background: '#e8ddd0', border: '1px solid #d1c4b7' }}
          role="tablist"
        >
          {(['todos', 'engenharia', 'marcenaria'] as Filter[]).map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-full px-5 py-2 text-[0.80rem] font-bold capitalize tracking-[-0.01em] transition-all duration-300',
                filter === f
                  ? 'bg-[#171614] text-white shadow-[0_8px_20px_rgba(28,22,17,0.18)]'
                  : 'text-[#756b60] hover:text-[#171411]',
              )}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Busca */}
        <div className="relative w-full max-w-[280px]">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2"
            style={{ color: '#9a8878' }}
          />
          <input
            type="text"
            placeholder="Buscar projeto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-[10px] border border-[#d1c4b7] bg-[#f8f2ea] py-2.5 pl-10 pr-3 text-[0.88rem] outline-none transition-colors placeholder:text-[#b8a89a] focus:border-[#9a744d] focus:bg-white"
            style={{ fontFamily: 'var(--font-body)', color: '#171411' }}
          />
        </div>
      </div>

      {/* Empty search result */}
      {filtered.length === 0 ? (
        <p
          className="py-8 text-center text-[0.92rem]"
          style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: '#9a8878' }}
        >
          Nenhum projeto encontrado com esses filtros.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => {
            const thumb =
              p.media[0]?.url ?? p.media[0]?.video_thumbnail ?? null;
            return (
              <div
                key={p.id}
                className="group overflow-hidden rounded-[16px] border border-[#d8c9b8] transition-all duration-300 hover:shadow-[0_8px_28px_rgba(42,31,22,0.10)]"
                style={{ background: '#faf6f0' }}
              >
                {/* Thumbnail */}
                <div className="relative h-44 overflow-hidden bg-[#eee5da]">
                  {thumb ? (
                    <Image
                      src={thumb}
                      alt={p.nome}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      quality={75}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span
                        className="text-[0.75rem] font-bold tracking-[0.07em] uppercase"
                        style={{ fontFamily: 'var(--font-body)', color: '#b8a89a' }}
                      >
                        Sem mídia
                      </span>
                    </div>
                  )}

                  {/* Badge status */}
                  {!p.is_published && (
                    <span
                      className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.07em]"
                      style={{
                        background: 'rgba(23,20,17,0.75)',
                        backdropFilter: 'blur(4px)',
                        color: 'rgba(255,255,255,0.70)',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      Despublicado
                    </span>
                  )}

                  {/* Badge categoria */}
                  <span
                    className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[0.68rem] font-bold capitalize tracking-[0.05em]"
                    style={{
                      background: '#9a744d',
                      color: '#f5f0e9',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {p.category}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p
                    className="mb-0.5 text-[0.70rem] font-bold uppercase tracking-[0.07em]"
                    style={{ fontFamily: 'var(--font-body)', color: '#9a744d' }}
                  >
                    {p.tipologia}
                  </p>
                  <p
                    className="truncate text-[1rem] font-bold"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: '#171411',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {p.nome}
                  </p>

                  {/* Tags serviços */}
                  {p.servicos.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {p.servicos.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-[0.06em]"
                          style={{
                            background: '#eee5da',
                            border: '1px solid #d8c9b8',
                            color: '#756b60',
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          {s}
                        </span>
                      ))}
                      {p.servicos.length > 3 && (
                        <span
                          className="rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold"
                          style={{
                            background: '#eee5da',
                            color: '#9a8878',
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          +{p.servicos.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Ações */}
                  <div className="mt-4 flex items-center gap-2">
                    <Link
                      href={`/admin/portfolio/${p.id}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-[8px] border border-[#d1c4b7] bg-[#f1ebe3] px-3 py-2 text-[0.80rem] font-bold transition-all hover:border-[#9a744d] hover:bg-[#f8f2ea]"
                      style={{ fontFamily: 'var(--font-body)', color: '#171411' }}
                    >
                      <Edit size={14} />
                      Editar
                    </Link>

                    <button
                      onClick={() => togglePublish(p)}
                      className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#d1c4b7] bg-[#f1ebe3] transition-all hover:border-[#9a744d] hover:bg-[#f8f2ea]"
                      aria-label={p.is_published ? 'Despublicar' : 'Publicar'}
                      title={p.is_published ? 'Despublicar' : 'Publicar'}
                      style={{ color: '#9a744d' }}
                    >
                      {p.is_published ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>

                    <button
                      onClick={() => deleteProject(p)}
                      className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#d1c4b7] bg-[#f1ebe3] transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                      aria-label="Excluir"
                      title="Excluir"
                      style={{ color: '#9a744d' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
