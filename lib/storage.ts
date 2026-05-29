import { createClient } from "@/lib/supabase/client";

export type UploadResult = { url: string } | { error: string };

export async function uploadToBucket(
  bucket: "portfolio-media" | "videos" | "site-images",
  file: File,
  pathPrefix: string = ""
): Promise<UploadResult> {
  const supabase = createClient();

  const maxSize = bucket === "videos" ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return { error: `Arquivo muito grande. Máximo: ${maxSize / 1024 / 1024}MB.` };
  }

  if (bucket === "videos" && !file.type.startsWith("video/")) {
    return { error: "Apenas arquivos de vídeo são permitidos neste campo." };
  }
  if (
    (bucket === "portfolio-media" || bucket === "site-images") &&
    !file.type.startsWith("image/")
  ) {
    return { error: "Apenas imagens são permitidas neste campo." };
  }

  const ext = file.name.split(".").pop() ?? "bin";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
  const path = pathPrefix ? `${pathPrefix}/${fileName}` : fileName;

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    return { error: `Falha no upload: ${error.message}` };
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return { url: data.publicUrl };
}
