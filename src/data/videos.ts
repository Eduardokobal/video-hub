export type Video = {
  id: string; // TikTok video ID — kept for the "ver no TikTok" link
  title: string;
  publishedAt: string; // ISO date string, e.g. "2026-08-01"
  src: string; // video file URL — hosted on Vercel Blob (see scripts/upload-to-blob.mjs)
};

export const videos: Video[] = [
  {
    id: "7436804153856249143",
    title: "O dono do bar sempre ganha",
    publishedAt: "2024-11-13",
    src: "https://geax0xyq9hp835xe.public.blob.vercel-storage.com/o-dono-do-bar-sempre-ganha.mp4",
  },
  {
    id: "7434272884882672951",
    title: "O tal do Êmbolo Kante",
    publishedAt: "2024-11-06",
    src: "https://geax0xyq9hp835xe.public.blob.vercel-storage.com/o-tal-do-embolo-kante.mp4",
  },
];
