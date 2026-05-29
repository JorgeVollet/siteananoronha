import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { AdminSidebar } from '../_components/AdminSidebar';
import { AdminTopbar } from '../_components/AdminTopbar';

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#f5f0e9' }}>
      <AdminSidebar />

      {/* Conteúdo principal — deslocado pela sidebar no desktop */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <AdminTopbar userEmail={user.email ?? ''} />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
