import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/content/MarkdownContent";
import { BackLink } from "@/components/ui/BackLink";
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
        <header className="space-y-4">
          <BackLink href="/notes" label="Back to notes" />
          <div className="space-y-3">
            <h1 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
              {note.title}
            </h1>
            {note.description ? (
              <p className="text-base leading-relaxed text-neutral-400">
                {note.description}
              </p>
            ) : null}
          </div>
        </header>

        <MarkdownContent content={note.content} />
      </article>
    </div>
  );
}
