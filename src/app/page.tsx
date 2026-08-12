import { Header } from "@/components/Header";
import { AboutSection } from "@/components/AboutSection";
import { GalleryGrid } from "@/components/GalleryGrid";
import { EditComparisonSection } from "@/components/EditComparisonSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl space-y-12 px-6 py-10">
        <AboutSection />
        <GalleryGrid />
        <EditComparisonSection />
      </main>
      <div className="border-t-4 border-purple-800" />
    </>
  );
}
