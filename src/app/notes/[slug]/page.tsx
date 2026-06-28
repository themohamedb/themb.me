import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/content/MarkdownContent";
import { PageIntro } from "@/components/ui/PageIntro";
import { createPageMetadata } from "@/lib/config/metadata";
import { getAllNoteSlugs, getNoteBySlug } from "@/lib/markdown";

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllNoteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) {
    return createPageMetadata({ title: "Note not found" });
  }

  return createPageMetadata({
    title: note.title,
    description: note.description,
    path: `/notes/${slug}`,
  });
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  return (
    <div className="page-container page-stack">
      <article className="mx-auto max-w-2xl space-y-8">
        <PageIntro title={note.title} description={note.description} />

        <MarkdownContent content={note.content} />
      </article>
    </div>
  );
}
