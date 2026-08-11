import { Header } from "@/components/Header";
import { AboutSection } from "@/components/AboutSection";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SocialLinks } from "@/components/SocialLinks";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl space-y-8 p-6">
        <AboutSection />
        <GalleryGrid />
        <SocialLinks />
      </main>
    </>
  );
}
