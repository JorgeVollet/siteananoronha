'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Newspaper,
  Phone,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/portfolio', label: 'Portfólio', icon: Briefcase },
  { href: '/admin/artigos', label: 'Artigos', icon: Newspaper },
  { href: '/admin/conteudo', label: 'Conteúdo', icon: FileText },
  { href: '/admin/footer', label: 'Footer & Contato', icon: Phone },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success('Você saiu do painel');
    router.push('/admin/login');
    router.refresh();
  }

  const sidebar = (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex w-64 flex-col',
        'transition-transform duration-300 ease-in-out lg:translate-x-0',
        mobileOpen ? 'translate-x-0' : '-translate-x-full',
      )}
      style={{ background: '#171614' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-5"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#29231f]">
            <span
              className="text-[0.85rem] font-bold text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              AN
            </span>
          </div>
          <div>
            <p
              className="text-[0.9rem] font-bold leading-tight text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Ana Noronha
            </p>
            <p
              className="text-[0.7rem] font-bold tracking-[0.07em] uppercase"
              style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.40)' }}
            >
              Painel admin
            </p>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          className="text-white/50 transition-colors hover:text-white lg:hidden"
          aria-label="Fechar menu"
        >
          <X size={18} />
        </button>
      </div>

      <div className="mx-4 my-1" style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 px-3 py-3" aria-label="Menu administrativo">
        {menuItems.map((item) => {
          const isActive =
            item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <div key={item.href} className="relative">
              {isActive && (
                <span
                  className="absolute inset-y-0 left-0 w-[3px] rounded-r-full"
                  style={{ background: '#9a744d' }}
                />
              )}
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-[10px] px-4 py-2.5 text-[0.88rem] font-bold transition-all duration-200',
                  isActive
                    ? 'bg-[#29231f] text-white'
                    : 'text-white/55 hover:bg-[#1f1a16] hover:text-white/90',
                )}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <Icon size={17} />
                {item.label}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-[10px] px-4 py-2.5 text-[0.88rem] font-bold text-white/50 transition-all duration-200 hover:bg-[#1f1a16] hover:text-white/80"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <LogOut size={17} />
          Sair
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Botão hambúrguer — mobile */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#d8c9b8] bg-[#f5f0e9] text-[#171411] shadow-[0_4px_14px_rgba(42,31,22,0.10)] lg:hidden"
        aria-label="Abrir menu"
      >
        <Menu size={18} />
      </button>

      {/* Overlay mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
        />
      )}

      {sidebar}
    </>
  );
}
