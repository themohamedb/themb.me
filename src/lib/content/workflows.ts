import type { Workflow } from "@/types/content";

export const workflows: Workflow[] = [
  {
    slug: "idea-to-product",
    title: "Idea to Product",
    description:
      "Capture rough ideas, clarify the problem, design the interface, build the first version, test, and improve.",
    tools: ["Notion", "Figma", "Claude", "Cursor", "Codex"],
  },
  {
    slug: "design-to-code",
    title: "Design to Code",
    description:
      "Start with a mobile-first Figma design, turn it into responsive components, then build clean frontend code.",
    tools: ["Figma", "Cursor", "Codex", "Tailwind", "Next.js"],
  },
  {
    slug: "research-to-decision",
    title: "Research to Decision",
    description:
      "Use research to compare tools, stacks, products, markets, and user needs before building.",
    tools: ["Perplexity", "Claude", "Notion"],
  },
  {
    slug: "notes-to-content",
    title: "Notes to Content",
    description:
      "Turn what I learn and build into notes, posts, carousels, and public documentation.",
    tools: ["Notion", "Claude", "Canva", "Figma"],
  },
  {
    slug: "system-building",
    title: "System Building",
    description:
      "Create repeatable workflows for projects, content, product decisions, and team operations.",
    tools: ["Notion", "Claude", "Figma", "Cursor"],
  },
  {
    slug: "build-and-test",
    title: "Build and Test",
    description:
      "Ship small versions, test the result, review what worked, and improve the next version.",
    tools: ["Cursor", "Codex", "Vercel", "InstantDB later"],
  },
];
