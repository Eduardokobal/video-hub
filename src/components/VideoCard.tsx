import { TIKTOK_HANDLE } from "@/lib/config";
import { type Video } from "@/data/videos";

type VideoCardProps = {
  video: Video;
};

export function VideoCard({ video }: VideoCardProps) {
  const videoUrl = `https://www.tiktok.com/${TIKTOK_HANDLE}/video/${video.id}`;

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <blockquote
        className="tiktok-embed"
        cite={videoUrl}
        data-video-id={video.id}
        style={{ maxWidth: "605px", minWidth: "325px" }}
      >
        <section>
          <a target="_blank" title={video.title} href={videoUrl} rel="noreferrer">
            {video.title}
          </a>
        </section>
      </blockquote>
    </div>
  );
}
