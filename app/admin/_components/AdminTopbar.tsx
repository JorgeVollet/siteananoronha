'use client';

import { usePathname } from 'next/navigation';

const titles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/portfolio': 'Portfólio',
  '/admin/portfolio/novo': 'Novo projeto',
  '/admin/artigos': 'Artigos',
  '/admin/artigos/novo': 'Novo artigo',
  '/admin/conteudo': 'Conteúdo do site',
  '/admin/footer': 'Footer & Contato',
};

function getTitle(pathname: string): string {
  if (titles[pathname]) return titles[pathname];
  if (pathname.startsWith('/admin/portfolio/') && pathname !== '/admin/portfolio/novo') {
    return 'Editar projeto';
  }
  if (pathname.startsWith('/admin/artigos/') && pathname !== '/admin/artigos/novo') {
    return 'Editar artigo';
  }
  return 'Admin';
}

export function AdminTopbar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const title = getTitle(pathname);

  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center justify-between px-6 lg:px-8"
      style={{
        background: 'rgba(245,240,233,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e3d6c6',
      }}
    >
      {/* Breadcrumb + título */}
      <div className="flex items-center gap-2 pl-8 lg:pl-0">
        <span
          className="text-[0.72rem] font-bold tracking-[0.08em] uppercase"
          style={{ fontFamily: 'var(--font-body)', color: '#9a744d' }}
        >
          Painel
        </span>
        <span style={{ color: '#d1c4b7' }}>/</span>
        <span
          className="text-[0.82rem] font-bold"
          style={{ fontFamily: 'var(--font-body)', color: '#171411' }}
        >
          {title}
        </span>
      </div>

      {/* Avatar + email */}
      <div className="flex items-center gap-3">
        <div className="hidden flex-col items-end sm:flex">
          <span
            className="text-[0.82rem] font-bold leading-tight"
            style={{ fontFamily: 'var(--font-body)', color: '#171411' }}
          >
            Ana Laura
          </span>
          <span
            className="text-[0.72rem]"
            style={{ fontFamily: 'var(--font-body)', color: '#9a8878' }}
          >
            {userEmail}
          </span>
        </div>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full text-white text-[0.82rem] font-bold shadow-[0_4px_12px_rgba(42,31,22,0.15)]"
          style={{ background: '#9a744d', fontFamily: 'var(--font-body)' }}
          aria-hidden="true"
        >
          A
        </div>
      </div>
    </header>
  );
}
