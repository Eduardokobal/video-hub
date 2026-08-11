import { Header } from "@/components/Header";
import { AboutSection } from "@/components/AboutSection";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SocialLinks } from "@/components/SocialLinks";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl space-y-12 px-6 py-10">
        <AboutSection />
        <GalleryGrid />
        {/* Reserved space — decide later what goes here before the social links. */}
        <div className="pt-24">
          <SocialLinks />
        </div>
      </main>
    </>
  );
}
