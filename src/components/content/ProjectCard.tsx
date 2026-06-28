import type { Project } from "@/types/content";
import { Tag } from "@/components/ui/Tag";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-colors hover:border-white/[0.14] hover:bg-white/[0.04]">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-medium text-white">{project.title}</h3>
          <Tag label={project.tag} />
        </div>
        <p className="text-sm leading-relaxed text-neutral-400">
          {project.description}
        </p>
      </div>
    </article>
  );
}
