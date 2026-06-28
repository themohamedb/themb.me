import { ProjectCard } from "@/components/content/ProjectCard";
import { PageIntro } from "@/components/ui/PageIntro";
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
      <PageIntro
        title="What I'm Building"
        description="Products, experiments, and systems I'm actively working on — from personal tools to community projects."
      />

      <section className="flex flex-col gap-5 lg:gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </div>
  );
}
