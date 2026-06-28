import Link from "next/link";
import { ProjectCard } from "@/components/content/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/lib/content/projects";

export function BuildingPreviewSection() {
  const preview = projects.slice(0, 3);

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <SectionHeading title="What I'm Building" />
        <Link
          href="/building"
          className="text-xs text-muted transition-colors hover:text-neutral-300"
        >
          view all
        </Link>
      </div>

      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-6">
        {preview.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
