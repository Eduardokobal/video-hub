import { videos } from "@/data/videos";
import { sortVideosByDateDesc } from "@/lib/videos";
import { VideoCard } from "@/components/VideoCard";

export function GalleryGrid() {
  const sorted = sortVideosByDateDesc(videos);

  if (sorted.length === 0) {
    return <p className="text-neutral-500 dark:text-neutral-400">Nenhum vídeo ainda.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
      {sorted.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
