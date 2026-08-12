import { editComparisons } from "@/data/editComparisons";
import { youtubeThumbnailUrl, youtubeWatchUrl } from "@/lib/youtube";
import { SectionHeading } from "@/components/SectionHeading";
import { cn, cardSurfaceClasses } from "@/lib/utils";

export function EditComparisonSection() {
  return (
    <div>
      <SectionHeading eyebrow="Edição" title="Antes e depois de uma edição" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {editComparisons.map((item) => (
          <a
            key={item.youtubeId}
            href={youtubeWatchUrl(item.youtubeId)}
            target="_blank"
            rel="noreferrer"
            className={cn("group block", cardSurfaceClasses)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={youtubeThumbnailUrl(item.youtubeId)}
              alt={item.label}
              className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <p className="p-4 text-center text-base font-medium text-purple-200 transition-colors group-hover:text-purple-100">
              {item.label}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
