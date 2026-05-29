import { Toaster } from 'sonner';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: 'var(--font-body)',
            borderRadius: '12px',
            border: '1px solid #d8c9b8',
            background: '#f5f0e9',
            color: '#171411',
          },
          classNames: {
            success: '!border-[#9a744d]',
            error: '!border-red-300 !bg-red-50 !text-red-800',
          },
        }}
      />
      {children}
    </>
  );
}
