import Link from "next/link";
import { ProjectCard } from "@/components/content/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/lib/content/projects";

export function BuildingPreviewSection() {
  const preview = projects.slice(0, 4);

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <SectionHeading title="What I'm Building" />
        <Link
          href="/building"
          className="hidden text-sm text-neutral-500 transition-colors hover:text-neutral-300 sm:inline-block"
        >
          view all
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {preview.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <Link
        href="/building"
        className="inline-block text-sm text-neutral-500 transition-colors hover:text-neutral-300 sm:hidden"
      >
        view all projects
      </Link>
    </section>
  );
}
