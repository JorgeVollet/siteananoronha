import sharp from 'sharp';

/**
 * Baixa uma imagem remota, converte para formato compatível com satori
 * (JPEG ou PNG) e retorna como data URL com dimensões detectadas.
 *
 * satori NÃO suporta:
 * - WEBP, AVIF, HEIC
 * - Descobrir tamanho da imagem por URL (precisa vir explícito no <img>)
 *
 * Este helper resolve as duas coisas.
 */

export type PreparedImage = {
  dataUrl: string;
  width: number;
  height: number;
};

export async function prepareImageForSatori(
  url: string,
  opts: { preserveAlpha?: boolean; maxSize?: number } = {},
): Promise<PreparedImage> {
  const preserveAlpha = opts.preserveAlpha ?? false;
  const maxSize = opts.maxSize ?? 1200;

  // 1. Baixa
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch image ${url}: ${res.status}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());

  // 2. Redimensiona + converte
  const pipeline = sharp(buf).rotate().resize({
    width: maxSize,
    height: maxSize,
    fit: 'inside',
    withoutEnlargement: true,
  });

  let outBuf: Buffer;
  let mimeType: string;

  if (preserveAlpha) {
    // PNG mantém transparência (usado pra cutouts com bg removido)
    outBuf = await pipeline.png({ compressionLevel: 8, quality: 85 }).toBuffer();
    mimeType = 'image/png';
  } else {
    // JPEG é 5-10x mais leve, ideal pra ambientes/polaroids
    outBuf = await pipeline
      .flatten({ background: '#ffffff' }) // remove alpha se houver
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();
    mimeType = 'image/jpeg';
  }

  // 3. Detecta dimensões finais
  const meta = await sharp(outBuf).metadata();
  const width = meta.width ?? maxSize;
  const height = meta.height ?? maxSize;

  // 4. Data URL
  const dataUrl = `data:${mimeType};base64,${outBuf.toString('base64')}`;

  return { dataUrl, width, height };
}
