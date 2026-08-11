import { tiktokVideoUrl } from "@/lib/config";
import { type Video } from "@/data/videos";

type VideoCardProps = {
  video: Video;
};

export function VideoCard({ video }: VideoCardProps) {
  const videoUrl = tiktokVideoUrl(video.id);

  return (
    <div className="w-full">
      <div className="aspect-video overflow-hidden rounded-xl border border-purple-900 bg-purple-950 shadow-lg shadow-purple-950/50">
        <video
          src={video.src}
          controls
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
