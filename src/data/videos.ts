export type Video = {
  id: string; // TikTok video ID — kept for the "ver no TikTok" link
  title: string;
  publishedAt: string; // ISO date string, e.g. "2026-08-01"
  src: string; // path to the local video file in /public/videos, e.g. "/videos/example.mp4"
};

export const videos: Video[] = [
  {
    id: "7436804153856249143",
    title: "O dono do bar sempre ganha",
    publishedAt: "2024-11-13",
    src: "/videos/o-dono-do-bar-sempre-ganha.mp4",
  },
  {
    id: "7434272884882672951",
    title: "O tal do Êmbolo Kante",
    publishedAt: "2024-11-06",
    src: "/videos/o-tal-do-embolo-kante.mp4",
  },
];
