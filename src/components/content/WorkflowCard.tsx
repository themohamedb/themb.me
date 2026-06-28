import type { Workflow } from "@/types/content";
import { Tag } from "@/components/ui/Tag";

interface WorkflowCardProps {
  workflow: Workflow;
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  return (
    <article className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-base font-medium text-white">{workflow.title}</h3>
          <p className="text-sm leading-relaxed text-neutral-400">
            {workflow.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {workflow.tools.map((tool) => (
            <Tag key={tool} label={tool} className="min-w-0 px-2.5 text-[10px]" />
          ))}
        </div>
      </div>
    </article>
  );
}
