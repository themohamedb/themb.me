import Image from "next/image";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import type { Project } from "@/types/content";
import { Tag } from "@/components/ui/Tag";

const projectIcons: Record<string, string> = {
  "knowledge-hub": "/icons/knowledge-hub.svg",
  appliedlab: "/icons/appliedlab.svg",
  "cursor-somalia": "/icons/cursor-somalia.svg",
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const iconSrc = projectIcons[project.slug];

  return (
    <article className="flex items-center gap-4 sm:gap-6">
      <div className="flex h-[52px] w-[54px] shrink-0 items-center justify-center rounded-md border border-border-subtle px-4 py-[15px]">
        {iconSrc ? (
          <Image
            src={iconSrc}
            alt=""
            width={22}
            height={24}
            className="h-auto w-[22px]"
          />
        ) : (
          <span className="text-xs font-semibold text-muted-light">
            {project.title.charAt(0)}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        <h3 className="text-xs text-white">{project.title}</h3>
        <p className="text-[10px] leading-normal text-muted">
          {project.description}
        </p>
      </div>

      <Tag label={project.tag} />

      <ArrowIcon className="h-6 w-6 shrink-0 text-neutral-500" />
    </article>
  );
}
