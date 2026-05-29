'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/site-config';
import { fadeUp, scaleIn, stagger, viewportConfig } from '@/lib/animations';
import Watermark from './Watermark';
import { Triangle, Palette, FileText, LayoutGrid } from 'lucide-react';

const iconMap = {
  triangle: Triangle,
  palette: Palette,
  document: FileText,
  grid: LayoutGrid
} as const;

/**
 * PARTE 2 da Filosofia — Pilares de atuação.
 * 4 cards com hover sofisticado, foto da Ana à esquerda, fundo de croqui.
 */
export default function FilosofiaPilares() {
  return (
    <section id="pilares" className="relative bg-bg-nude py-24 md:py-32 overflow-hidden" style={{ scrollMarginTop: '88px' }}>
      {/* Fundo: textura de papel + croqui sutil */}
      <div className="absolute inset-0 bg-paper-noise opacity-40 pointer-events-none" />
      <Watermark variant="blueprint" className="text-terracota top-[10%] right-[2%]" width={450} rotate={-12} opacity={0.06} />
      <Watermark variant="ruler" className="text-terracota bottom-[5%] left-[2%]" width={400} rotate={5} opacity={0.08} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <motion.span variants={fadeUp} className="tag mb-6">
            Pilares de atuação
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-bodoni text-text-dark text-[clamp(2rem,4vw,3rem)] font-bold leading-tight uppercase tracking-wide"
          >
            Quando tudo é integrado<br />
            <em className="text-terracota font-normal italic">desde o início</em>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 font-sans text-text-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Do layout aos acabamentos — porque engenharia e móveis sob medida não podem rodar no improviso.
          </motion.p>
        </motion.div>

        {/* Grid: Foto + 4 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Foto Ana */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 relative"
          >
            <div className="relative aspect-[3/4] max-w-[420px] mx-auto overflow-hidden rounded-sm shadow-xl">
              <Image
                src="/img/5.png"
                alt="Ana Laura Noronha"
                fill
                quality={88}
                sizes="(max-width: 1024px) 80vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 border-2 border-terracota/30" />
            </div>
            {/* Assinatura flutuante */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 lg:left-auto lg:right-[-30px] lg:translate-x-0 bg-hero-dark text-hero-gold px-5 py-3 font-bodoni italic text-sm shadow-xl whitespace-nowrap"
            >
              Ana Noronha.
            </motion.div>
          </motion.div>

          {/* 4 Cards de Pilares */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {siteConfig.pillars.map((pillar, i) => {
              const Icon = iconMap[pillar.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group relative bg-white border border-terracota/20 rounded-md p-6 md:p-7 shadow-card-soft hover:shadow-card-hover transition-all duration-500 overflow-hidden isolate"
                >
                  {/* Brilho dourado no hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-hero-gold/0 via-hero-gold/0 to-hero-gold/0 group-hover:from-hero-gold/10 group-hover:to-transparent transition-all duration-700 -z-10" />

                  {/* Ícone */}
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-terracota/10 text-terracota group-hover:bg-terracota group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>

                  {/* Título */}
                  <h3 className="font-bodoni text-text-dark text-lg md:text-xl font-bold uppercase tracking-wide leading-tight">
                    {pillar.title.map((line, j) => (
                      <span key={j} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>

                  {/* Descrição */}
                  <p className="mt-3 font-sans text-text-muted text-sm leading-relaxed">{pillar.desc}</p>

                  {/* Indicador de número discreto */}
                  <span className="absolute top-4 right-5 font-bodoni text-terracota/20 text-3xl font-bold">
                    0{i + 1}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
