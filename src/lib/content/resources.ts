import type { ResourceSection } from "@/types/content";

export const resourceSections: ResourceSection[] = [
  {
    title: "Useful tools",
    items: [
      {
        title: "Figma",
        description: "Interface design, systems, and visual thinking.",
        href: "https://figma.com",
      },
      {
        title: "Notion",
        description: "Notes, planning, and project systems.",
        href: "https://notion.so",
      },
      {
        title: "Cursor",
        description: "AI-assisted coding for websites and apps.",
        href: "https://cursor.com",
      },
    ],
  },
  {
    title: "Experiments",
    items: [
      {
        title: "AppliedLab.so",
        description: "Practical systems and local solutions in progress.",
      },
      {
        title: "Knowledge Hub",
        description: "A personal system for saving ideas before they disappear.",
      },
    ],
  },
  {
    title: "Reading list",
    items: [
      {
        title: "Design as thinking",
        description: "Notes on using design to understand problems clearly.",
      },
      {
        title: "Systems over shortcuts",
        description: "Why repeatable workflows matter more than one-off hacks.",
      },
    ],
  },
  {
    title: "Product references",
    items: [
      {
        title: "Clear onboarding patterns",
        description: "Products that explain themselves without noise.",
      },
      {
        title: "Useful defaults",
        description: "Interfaces that feel obvious without feeling generic.",
      },
    ],
  },
  {
    title: "Workflow references",
    items: [
      {
        title: "Idea to Product",
        description: "From rough thought to first working version.",
      },
      {
        title: "Design to Code",
        description: "Mobile-first Figma to responsive frontend.",
      },
    ],
  },
  {
    title: "Design references",
    items: [
      {
        title: "Calm dark interfaces",
        description: "Minimal layouts with strong typography and spacing.",
      },
      {
        title: "Mobile-first composition",
        description: "Layouts that scale with intention, not stretching.",
      },
    ],
  },
];
