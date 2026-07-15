import React from 'react';
import type { Composition, CollageItem } from '@/lib/moodboard/compose-collage';

/**
 * Template "Painel Mental" — renderizado como PNG via satori + resvg.
 *
 * IMPORTANTE: satori tem limitações:
 * - Não suporta CSS grid → só flex
 * - Não suporta clip-path complexo → border-radius assimétrico simula rasgos
 * - Todo elemento com filhos precisa `display: flex` explícito
 * - position absolute funciona se o pai for `display: flex; position: relative`
 */

const CANVAS_W = 1600;
const CANVAS_H = 1100;

export function PainelMentalTemplate({ composition }: { composition: Composition }) {
  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        width: `${CANVAS_W}px`,
        height: `${CANVAS_H}px`,
        background: '#f5f0e9',
        backgroundImage:
          'radial-gradient(circle at 15% 20%, rgba(255,255,255,0.55), transparent 45%), ' +
          'radial-gradient(circle at 85% 80%, rgba(221,211,198,0.4), transparent 45%)',
        fontFamily: 'Inter',
        overflow: 'hidden',
      }}
    >
      {/* Header topo esquerdo */}
      <div
        style={{
          position: 'absolute',
          top: 44,
          left: 60,
          display: 'flex',
          fontSize: 13,
          letterSpacing: '0.28em',
          color: '#9a744d',
          textTransform: 'uppercase',
          fontWeight: 700,
        }}
      >
        moodboard · an engenharia
      </div>

      {/* Data topo direito */}
      <div
        style={{
          position: 'absolute',
          top: 44,
          right: 60,
          display: 'flex',
          fontSize: 13,
          letterSpacing: '0.28em',
          color: '#9a744d',
          textTransform: 'uppercase',
          fontWeight: 700,
        }}
      >
        {new Date().toLocaleDateString('pt-BR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </div>

      {/* Items espalhados — ordenados por zIndex (menor = fundo) porque satori
          não suporta z-index CSS, usa ordem de render. */}
      {[...composition.items]
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((item, i) => (
          <CollageElement key={i} item={item} />
        ))}

      {/* Palavras à mão (Caveat) — 3 espalhadas */}
      {composition.moodWords.slice(0, 3).map((word, i) => {
        const positions = [
          { left: 180, top: 870, rotation: -2, size: 46 },
          { left: 720, top: 130, rotation: 3, size: 40 },
          { left: 1180, top: 760, rotation: -4, size: 52 },
        ];
        const p = positions[i];
        return (
          <div
            key={`mood-${i}`}
            style={{
              position: 'absolute',
              left: p.left,
              top: p.top,
              display: 'flex',
              transform: `rotate(${p.rotation}deg)`,
              fontFamily: 'Caveat',
              fontSize: p.size,
              color: '#3a332d',
            }}
          >
            {word}
          </div>
        );
      })}

      {/* Paleta bottom-left */}
      <div
        style={{
          position: 'absolute',
          bottom: 54,
          left: 60,
          display: 'flex',
          gap: 14,
        }}
      >
        {composition.palette.map((c, i) => (
          <div
            key={`pal-${i}`}
            style={{
              display: 'flex',
              width: 46,
              height: 46,
              borderRadius: '50%',
              background: c,
              border: '2px solid rgba(255,255,255,0.7)',
              boxShadow: '0 2px 8px rgba(23,20,17,0.18)',
            }}
          />
        ))}
      </div>

      {/* Assinatura bottom-right (Caveat) */}
      <div
        style={{
          position: 'absolute',
          bottom: 64,
          right: 60,
          display: 'flex',
          fontFamily: 'Caveat',
          fontSize: 28,
          color: '#9a744d',
        }}
      >
        curadoria ana laura noronha
      </div>
    </div>
  );
}

function CollageElement({ item }: { item: CollageItem }) {
  const imgUrl = item.image.processed_url || item.image.original_url;
  const useProcessed =
    item.kind === 'cutout' && !!item.image.processed_url;
  const finalUrl = useProcessed ? item.image.processed_url! : item.image.original_url;

  const base = {
    position: 'absolute' as const,
    left: item.x,
    top: item.y,
    width: item.width,
    height: item.height,
    transform: `rotate(${item.rotation}deg)`,
    display: 'flex' as const,
  };

  if (item.kind === 'polaroid') {
    return (
      <div
        style={{
          ...base,
          flexDirection: 'column',
          background: '#fdfcfa',
          padding: 16,
          paddingBottom: 40,
          boxShadow:
            '0 14px 32px rgba(23,20,17,0.22), 0 3px 8px rgba(23,20,17,0.14)',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={finalUrl}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
        {item.tape && (
          <div
            style={{
              position: 'absolute',
              top: -14,
              left: '32%',
              display: 'flex',
              width: 100,
              height: 28,
              background: 'rgba(240, 220, 140, 0.55)',
              transform: 'rotate(-8deg)',
              borderLeft: '1px dashed rgba(180,160,90,0.4)',
              borderRight: '1px dashed rgba(180,160,90,0.4)',
            }}
          />
        )}
      </div>
    );
  }

  if (item.kind === 'cutout') {
    return (
      <div
        style={{
          ...base,
          filter: 'drop-shadow(0 12px 20px rgba(23,20,17,0.35))',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={finalUrl}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    );
  }

  if (item.kind === 'texture-torn') {
    return (
      <div
        style={{
          ...base,
          overflow: 'hidden',
          borderRadius: '18px 3px 22px 5px / 8px 20px 4px 24px',
          boxShadow: '0 8px 20px rgba(23,20,17,0.15)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={finalUrl}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    );
  }

  if (item.kind === 'color-splash') {
    const color = item.image.dominant_colors?.[0] || '#c19366';
    return (
      <div
        style={{
          ...base,
          background: color,
          borderRadius: '58% 42% 63% 37% / 41% 44% 56% 59%',
          boxShadow: '0 6px 16px rgba(23,20,17,0.14)',
        }}
      />
    );
  }

  // Fallback (não deve acontecer)
  return (
    <div style={{ ...base, background: '#eee5da' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imgUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
}
