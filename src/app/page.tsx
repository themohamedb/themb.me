import { BuildingPreviewSection } from "@/components/sections/BuildingPreviewSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { RecentNotesSection } from "@/components/sections/RecentNotesSection";

export default function HomePage() {
  return (
    <div className="page-container page-stack">
      <HeroSection />
      <RecentNotesSection />
      <BuildingPreviewSection />
    </div>
  );
}
