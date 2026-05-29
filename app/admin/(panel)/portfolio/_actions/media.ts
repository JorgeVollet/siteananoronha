"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type AddPhotoInput = {
  project_id: string;
  url: string;
  alt?: string;
  ordem: number;
};

type AddBeforeAfterInput = {
  project_id: string;
  before_url: string;
  url: string;
  before_alt?: string;
  alt?: string;
  ordem: number;
};

type AddVideoInput = {
  project_id: string;
  video_url: string;
  video_source: "upload" | "youtube" | "vimeo";
  video_thumbnail?: string;
  alt?: string;
  ordem: number;
};

export async function addPhotoMedia(input: AddPhotoInput) {
  const supabase = await createClient();
  const { error, data } = await supabase
    .from("portfolio_media")
    .insert({
      project_id: input.project_id,
      type: "photo",
      url: input.url,
      alt: input.alt ?? null,
      ordem: input.ordem,
    })
    .select()
    .single();

  if (error) return { error: error.message };
  revalidatePath(`/admin/portfolio/${input.project_id}`);
  revalidatePath("/");
  return { media: data };
}

export async function addBeforeAfterMedia(input: AddBeforeAfterInput) {
  const supabase = await createClient();
  const { error, data } = await supabase
    .from("portfolio_media")
    .insert({
      project_id: input.project_id,
      type: "before_after",
      url: input.url,
      alt: input.alt ?? null,
      before_url: input.before_url,
      before_alt: input.before_alt ?? null,
      ordem: input.ordem,
    })
    .select()
    .single();

  if (error) return { error: error.message };
  revalidatePath(`/admin/portfolio/${input.project_id}`);
  revalidatePath("/");
  return { media: data };
}

export async function addVideoMedia(input: AddVideoInput) {
  const supabase = await createClient();
  const { error, data } = await supabase
    .from("portfolio_media")
    .insert({
      project_id: input.project_id,
      type: "video",
      video_url: input.video_url,
      video_source: input.video_source,
      video_thumbnail: input.video_thumbnail ?? null,
      alt: input.alt ?? null,
      ordem: input.ordem,
    })
    .select()
    .single();

  if (error) return { error: error.message };
  revalidatePath(`/admin/portfolio/${input.project_id}`);
  revalidatePath("/");
  return { media: data };
}

export async function deleteMedia(mediaId: string, projectId: string) {
  const supabase = await createClient();

  const { data: media } = await supabase
    .from("portfolio_media")
    .select("url, before_url, video_url, video_source")
    .eq("id", mediaId)
    .single();

  if (media) {
    const photoUrls = [media.url, media.before_url].filter(
      (u): u is string => !!u
    );
    const photoPaths = photoUrls
      .map((u) => extractStoragePath(u, "portfolio-media"))
      .filter((p): p is string => !!p);

    if (photoPaths.length > 0) {
      await supabase.storage.from("portfolio-media").remove(photoPaths);
    }

    if (media.video_source === "upload" && media.video_url) {
      const videoPath = extractStoragePath(media.video_url, "videos");
      if (videoPath) {
        await supabase.storage.from("videos").remove([videoPath]);
      }
    }
  }

  const { error } = await supabase
    .from("portfolio_media")
    .delete()
    .eq("id", mediaId);
  if (error) return { error: error.message };

  revalidatePath(`/admin/portfolio/${projectId}`);
  revalidatePath("/");
  return { success: true };
}

export async function reorderMedia(
  mediaId: string,
  newOrdem: number,
  projectId: string
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("portfolio_media")
    .update({ ordem: newOrdem })
    .eq("id", mediaId);

  if (error) return { error: error.message };
  revalidatePath(`/admin/portfolio/${projectId}`);
  revalidatePath("/");
  return { success: true };
}

function extractStoragePath(publicUrl: string, bucket: string): string | null {
  const idx = publicUrl.indexOf(`/${bucket}/`);
  if (idx === -1) return null;
  return publicUrl.slice(idx + bucket.length + 2);
}
