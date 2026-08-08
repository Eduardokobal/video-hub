import { videos } from "@/data/videos";
import { sortVideosByDateDesc } from "@/lib/videos";
import { VideoCard } from "@/components/VideoCard";

export function GalleryGrid() {
  const sorted = sortVideosByDateDesc(videos);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {sorted.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
