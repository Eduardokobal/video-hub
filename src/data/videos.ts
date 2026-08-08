export type Video = {
  id: string;
  title: string;
  publishedAt: string; // ISO date string, e.g. "2026-08-01"
};

export const videos: Video[] = [
  {
    id: "7123456789012345678",
    title: "Vídeo mais recente — substitua pelos seus",
    publishedAt: "2026-08-01",
  },
  {
    id: "7123456789012345000",
    title: "Vídeo mais antigo — substitua pelos seus",
    publishedAt: "2026-07-01",
  },
];
