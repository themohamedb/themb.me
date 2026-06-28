import { ProjectCard } from "@/components/content/ProjectCard";
import { createPageMetadata } from "@/lib/config/metadata";
import { projects } from "@/lib/content/projects";

export const metadata = createPageMetadata({
  title: "What I'm Building",
  description:
    "Current products, experiments, and systems — Knowledge Hub, AppliedLab, Cursor Somalia, and more.",
  path: "/building",
});

export default function BuildingPage() {
  return (
    <div className="page-container page-stack">
      <section className="page-intro">
        <h1>What I&apos;m Building</h1>
        <p>
          Products, experiments, and systems I&apos;m actively working on —
          from personal tools to community projects.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </div>
  );
}
