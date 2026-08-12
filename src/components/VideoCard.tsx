import { tiktokVideoUrl } from "@/lib/config";
import { cn, cardSurfaceClasses } from "@/lib/utils";
import { type Video } from "@/data/videos";

type VideoCardProps = {
  video: Video;
};

export function VideoCard({ video }: VideoCardProps) {
  const videoUrl = tiktokVideoUrl(video.id);

  return (
    <div className="w-full">
      <div className={cn("aspect-video", cardSurfaceClasses)}>
        <video
          src={video.src}
          controls
          controlsList="nodownload"
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        >
          Seu navegador não suporta vídeo em HTML5.
        </video>
      </div>
      <a
        href={videoUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-3 block text-center text-base font-medium text-purple-300 transition-colors hover:text-purple-100"
      >
        {video.title}
      </a>
    </div>
  );
}
