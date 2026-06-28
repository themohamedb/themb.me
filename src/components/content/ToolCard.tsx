import type { Tool } from "@/types/content";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <article className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-white">{tool.name}</h3>
        <p className="text-sm leading-relaxed text-neutral-400">
          {tool.description}
        </p>
      </div>
    </article>
  );
}
