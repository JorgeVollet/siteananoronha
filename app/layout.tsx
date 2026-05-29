import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans, Cormorant_Garamond, Newsreader, Manrope } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'sonner';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap'
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap'
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal'],
  variable: '--font-logo',
  display: 'swap'
});

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap'
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://analauraarquitetura.com.br'),
  title: 'Ana Laura Noronha — Engenharia e Interiores',
  description:
    'Projetos de engenharia e interiores completos, pensados para que cada detalhe faça sentido. Arquitetura e engenharia sob uma nova luz — atendimento na Barra da Tijuca e projetos 100% online.',
  keywords: [
    'projeto arquitetônico',
    'design de interiores',
    'engenharia civil',
    'móveis sob medida',
    'Barra da Tijuca',
    'Rio de Janeiro',
    'Ana Laura Noronha'
  ],
  authors: [{ name: 'Ana Laura Noronha' }],
  openGraph: {
    title: 'Ana Laura Noronha — Engenharia e Interiores',
    description: 'Arquitetura e engenharia sob uma nova luz.',
    url: 'https://analauraarquitetura.com.br',
    siteName: 'Ana Laura Noronha',
    locale: 'pt_BR',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${jakarta.variable} ${cormorant.variable} ${newsreader.variable} ${manrope.variable}`}
    >
      <body className="bg-bg-nude text-text-dark font-sans antialiased">
        <SmoothScroll>{children}</SmoothScroll>
        <Toaster position="bottom-right" richColors />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
