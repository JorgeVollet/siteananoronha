'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Variant = 'monogram' | 'compass' | 'blueprint' | 'ruler';

interface Props {
  variant?: Variant;
  className?: string;
  rotate?: number;
  opacity?: number;
  width?: number | string;
  animated?: boolean;
}

/**
 * Marca d'água SVG decorativa — usada em fundos de seções para reforçar
 * a identidade "atelier de arquitetura/engenharia" da Ana Laura.
 */
export default function Watermark({
  variant = 'monogram',
  className,
  rotate = 0,
  opacity = 0.08,
  width = 220,
  animated = true
}: Props) {
  const baseStyle = {
    transform: `rotate(${rotate}deg)`,
    opacity
  };

  const wrapperProps = animated
    ? {
        initial: { opacity: 0 },
        whileInView: { opacity },
        viewport: { once: false, amount: 0.1 },
        transition: { duration: 2, ease: 'easeOut' as const }
      }
    : { style: { opacity } };

  return (
    <motion.div
      {...wrapperProps}
      style={{ ...baseStyle, width }}
      className={cn('pointer-events-none select-none absolute z-0', className)}
      aria-hidden
    >
      {variant === 'monogram' && <MonogramSVG />}
      {variant === 'compass' && <CompassSVG />}
      {variant === 'blueprint' && <BlueprintSVG />}
      {variant === 'ruler' && <RulerSVG />}
    </motion.div>
  );
}

/* ============== MONOGRAMA AN ============== */
function MonogramSVG() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* Letra A estilizada */}
        <path d="M40 170 L80 30 L120 170" />
        <line x1="55" y1="120" x2="105" y2="120" />
        {/* Letra N */}
        <path d="M120 170 L120 30 L170 170 L170 30" />
        {/* Pé serifa A */}
        <line x1="30" y1="170" x2="50" y2="170" strokeWidth="0.8" />
        <line x1="110" y1="170" x2="130" y2="170" strokeWidth="0.8" />
        {/* Pés serifa N */}
        <line x1="110" y1="170" x2="130" y2="170" strokeWidth="0.8" />
        <line x1="160" y1="170" x2="180" y2="170" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

/* ============== COMPASSO TÉCNICO ============== */
function CompassSVG() {
  return (
    <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <circle cx="120" cy="40" r="6" />
        <line x1="120" y1="46" x2="60" y2="200" />
        <line x1="120" y1="46" x2="180" y2="200" />
        <path d="M60 200 q60 30 120 0" strokeDasharray="3 5" />
        <line x1="120" y1="40" x2="120" y2="20" />
        {/* régua marcações */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={i}
            x1={60 + i * 13}
            y1={205}
            x2={60 + i * 13}
            y2={210 + (i % 2 === 0 ? 4 : 0)}
            strokeWidth="0.8"
          />
        ))}
      </g>
    </svg>
  );
}

/* ============== PLANTA BAIXA / BLUEPRINT ============== */
function BlueprintSVG() {
  return (
    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        {/* Contorno externo */}
        <rect x="30" y="30" width="240" height="240" />
        {/* Paredes internas */}
        <line x1="150" y1="30" x2="150" y2="170" />
        <line x1="30" y1="170" x2="270" y2="170" />
        <line x1="200" y1="170" x2="200" y2="270" />
        {/* Porta arco */}
        <path d="M150 100 a30 30 0 0 1 30 30" />
        <line x1="150" y1="100" x2="150" y2="70" strokeDasharray="2 3" />
        {/* Janelas (dois traços paralelos) */}
        <line x1="60" y1="30" x2="120" y2="30" strokeWidth="2.5" />
        <line x1="60" y1="33" x2="120" y2="33" strokeWidth="0.8" />
        <line x1="220" y1="30" x2="260" y2="30" strokeWidth="2.5" />
        <line x1="220" y1="33" x2="260" y2="33" strokeWidth="0.8" />
        {/* Cotas */}
        <line x1="30" y1="285" x2="150" y2="285" strokeDasharray="1 2" />
        <text x="80" y="298" fontSize="8" fill="currentColor" stroke="none" fontFamily="monospace">
          3.40
        </text>
        <line x1="150" y1="285" x2="270" y2="285" strokeDasharray="1 2" />
        <text x="200" y="298" fontSize="8" fill="currentColor" stroke="none" fontFamily="monospace">
          3.40
        </text>
      </g>
    </svg>
  );
}

/* ============== RÉGUA ARQUITETÔNICA ============== */
function RulerSVG() {
  return (
    <svg viewBox="0 0 400 40" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <line x1="0" y1="20" x2="400" y2="20" />
        {Array.from({ length: 40 }).map((_, i) => {
          const isMajor = i % 5 === 0;
          return (
            <line
              key={i}
              x1={i * 10}
              y1={20}
              x2={i * 10}
              y2={isMajor ? 5 : 12}
              strokeWidth={isMajor ? 1.2 : 0.8}
            />
          );
        })}
      </g>
    </svg>
  );
}
