'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/site-config';
import { fadeUp, staggerSlow } from '@/lib/animations';
import { trackCtaClick } from '@/lib/track-cta';

type Props = {
  titulos?: string[];
  subtitulos?: string[];
  ctaTexto?: string;
  imagemUrl?: string;
};

export default function Hero({ titulos, subtitulos, ctaTexto, imagemUrl }: Props) {
  const mainLines = (titulos && titulos.length > 0) ? titulos : siteConfig.hero.main;
  const subLines = (subtitulos && subtitulos.length > 0) ? subtitulos : siteConfig.hero.sub;
  const ctaText = ctaTexto ?? siteConfig.hero.cta;
  const bgSrc = imagemUrl ?? '/img/1.png';

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-hero-dark overflow-hidden"
    >
      {/* Background — foto principal da Ana */}
      <div className="absolute inset-0">
        <Image
          src={bgSrc}
          alt="Ana Laura Noronha — Engenheira e Projetista de Interiores"
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover object-[center_top]"
        />
        {/* Gradiente lateral para dar contraste no texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-hero-dark/85 via-hero-dark/30 to-transparent" />
        {/* Vinheta inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-hero-dark via-transparent to-transparent opacity-70" />
      </div>

      {/* Marca d'água sutil em pulso */}
      <div className="absolute top-32 right-12 hidden lg:block z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.18, scale: 1 }}
          transition={{ duration: 2.5, delay: 1 }}
          className="text-hero-gold"
        >
          <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
            <text x="40" y="60" textAnchor="middle" fontFamily="serif" fontSize="56" fontWeight="700" fill="currentColor">
              A
            </text>
            <text x="40" y="92" textAnchor="middle" fontFamily="serif" fontSize="28" fontWeight="500" fill="currentColor">
              N
            </text>
            <line x1="20" y1="10" x2="60" y2="10" stroke="currentColor" strokeWidth="0.8" />
            <line x1="20" y1="95" x2="60" y2="95" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </motion.div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-16 lg:pl-20 pt-24">
        <motion.div
          variants={staggerSlow}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Linha decorativa + label */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
            <span className="block w-12 h-px bg-hero-gold" />
            <span className="font-bodoni text-hero-gold text-xs uppercase tracking-widest-2 font-semibold">
              Atelier de Arquitetura
            </span>
          </motion.div>

          {/* Headline principal */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-hero-gold uppercase font-bold leading-[1.25] tracking-wide text-[clamp(1.6rem,3.8vw,3rem)] mb-8"
          >
            {mainLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          {/* Sub headline */}
          <motion.div
            variants={fadeUp}
            className="font-display text-white uppercase font-normal leading-[1.4] tracking-wide text-[clamp(1.2rem,2.6vw,2.1rem)] mb-12"
          >
            {subLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp}>
            <a
              href="#contato"
              className="btn-hero"
              onClick={() => trackCtaClick('hero')}
            >
              {ctaText}
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Blur fade inferior — transição suave para próxima seção */}
      <div className="absolute bottom-0 left-0 right-0 h-[250px] z-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0.8) 70%, rgba(10,10,10,1) 100%)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)'
          }}
        />
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 2, duration: 1 },
          y: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-hero-gold/80"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-widest-2 uppercase font-bodoni">Role para descobrir</span>
          <svg width="20" height="32" viewBox="0 0 20 32" fill="none">
            <rect x="1" y="1" width="18" height="30" rx="9" stroke="currentColor" strokeWidth="1" />
            <circle cx="10" cy="8" r="2" fill="currentColor" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
