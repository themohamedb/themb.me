import { WorkflowCard } from "@/components/content/WorkflowCard";
import { ToolCard } from "@/components/content/ToolCard";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createPageMetadata } from "@/lib/config/metadata";
import { tools } from "@/lib/content/tools";
import { workflows } from "@/lib/content/workflows";

export const metadata = createPageMetadata({
  title: "Workflows",
  description:
    "How I use Figma, Notion, Claude, Cursor, Codex, Perplexity, and Canva as a real production system.",
  path: "/workflows",
});

export default function WorkflowsPage() {
  return (
    <div className="page-container page-stack">
      <PageIntro
        title="Workflows"
        description="I use tools as a production system. Figma helps me think visually. Notion keeps ideas and projects structured. Claude helps me plan and reason. Perplexity helps me research. Cursor and Codex help me turn designs into working products. Canva helps me produce fast visual assets. The goal is not to use more tools. The goal is to move from idea to useful output with clarity and taste."
        className="lg:max-w-3xl"
      />

      <section className="space-y-6">
        <SectionHeading title="Production workflows" />
        <div className="grid gap-3 lg:grid-cols-2">
          {workflows.map((workflow) => (
            <WorkflowCard key={workflow.slug} workflow={workflow} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading title="Tools I use to think, design, and build" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}
