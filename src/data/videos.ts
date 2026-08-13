export type Video = {
  id: string; // TikTok video ID — kept for the "ver no TikTok" link
  title: string;
  publishedAt: string; // ISO date string, e.g. "2026-08-01"
  src: string; // video file URL — hosted on Vercel Blob (see scripts/upload-to-blob.mjs)
};

// Generic placeholder shown when VIDEOS_JSON isn't set — keeps this file (and
// the public repo) free of any specific person's real content by default.
// Replace by setting VIDEOS_JSON in .env.local / Vercel, not by editing this
// array directly, or every fork of this template ships your videos.
const placeholderVideos: Video[] = [
  {
    id: "0000000000000000000",
    title: "Vídeo de exemplo — configure VIDEOS_JSON com o seu conteúdo",
    publishedAt: "2026-01-01",
    src: "",
  },
];

function parseVideosFromEnv(): Video[] | null {
  const raw = process.env.VIDEOS_JSON;
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as Video[];
  } catch {
    console.warn("VIDEOS_JSON is set but isn't valid JSON — using placeholder videos.");
  }
  return null;
}

export const videos: Video[] = parseVideosFromEnv() ?? placeholderVideos;
