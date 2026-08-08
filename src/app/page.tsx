import { Header } from "@/components/Header";
import { AboutSection } from "@/components/AboutSection";
import { GalleryGrid } from "@/components/GalleryGrid";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl space-y-8 p-6">
        <AboutSection />
        <GalleryGrid />
      </main>
    </>
  );
}
