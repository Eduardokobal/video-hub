import { videos } from "@/data/videos";
import { sortVideosByDateDesc } from "@/lib/videos";
import { VideoCard } from "@/components/VideoCard";
import { SectionHeading } from "@/components/SectionHeading";

export function GalleryGrid() {
  const sorted = sortVideosByDateDesc(videos);

  return (
    <div>
      <SectionHeading eyebrow="Vídeos" title="Portfólio" />
      {sorted.length === 0 ? (
        <p className="text-purple-300">Nenhum vídeo ainda.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {sorted.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
