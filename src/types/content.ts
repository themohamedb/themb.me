export type ContentTag = "Product" | "Lab" | "Community" | "Portfolio";

export interface Note {
  slug: string;
  title: string;
  description: string;
  date?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  tag: ContentTag;
}

export interface Workflow {
  slug: string;
  title: string;
  description: string;
  tools: string[];
}

export interface Tool {
  name: string;
  description: string;
}

export interface HowIWorkItem {
  title: string;
  description: string;
}

export interface ResourceItem {
  title: string;
  description: string;
  href?: string;
}

export interface ResourceSection {
  title: string;
  items: ResourceItem[];
}
