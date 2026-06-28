import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Note } from "@/types/content";

const notesDirectory = path.join(process.cwd(), "content/notes");

export function getAllNotes(): Note[] {
  if (!fs.existsSync(notesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(notesDirectory).filter((name) => name.endsWith(".md"));

  const notes = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(notesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: (data.title as string) ?? slug,
      description: (data.description as string) ?? content.slice(0, 120),
      date: data.date as string | undefined,
    };
  });

  return notes.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getNoteBySlug(slug: string) {
  const fullPath = path.join(notesDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: (data.title as string) ?? slug,
    description: (data.description as string) ?? "",
    date: data.date as string | undefined,
    content,
  };
}

export function getAllNoteSlugs(): string[] {
  if (!fs.existsSync(notesDirectory)) {
    return [];
  }

  return fs
    .readdirSync(notesDirectory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}
