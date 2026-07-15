'use client';

/**
 * Bolinhas da paleta detectada. Fase 1: paleta fixa vinda da session.
 */
export function PaletteChips({ palette }: { palette: string[] }) {
  if (!palette?.length) return null;
  return (
    <div className="flex items-center gap-2.5">
      {palette.map((color, i) => (
        <span
          key={`${color}-${i}`}
          title={color}
          className="h-7 w-7 rounded-full border border-[#d8c9b8]"
          style={{ background: color }}
        />
      ))}
    </div>
  );
}
