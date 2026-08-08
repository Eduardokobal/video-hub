import { type Video } from "@/data/videos";

export function sortVideosByDateDesc(videos: Video[]): Video[] {
  return [...videos].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
