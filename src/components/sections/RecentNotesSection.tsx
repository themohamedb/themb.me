import Link from "next/link";
import { NoteRow } from "@/components/content/NoteRow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllNotes } from "@/lib/markdown";

export function RecentNotesSection() {
  const notes = getAllNotes().slice(0, 3);

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <SectionHeading title="Recent Notes" />
        <Link
          href="/notes"
          className="hidden text-sm text-neutral-500 transition-colors hover:text-neutral-300 sm:inline-block"
        >
          view all
        </Link>
      </div>

      <div className="space-y-3">
        {notes.map((note) => (
          <NoteRow key={note.slug} note={note} />
        ))}
      </div>

      <Link
        href="/notes"
        className="inline-block text-sm text-neutral-500 transition-colors hover:text-neutral-300 sm:hidden"
      >
        view all notes
      </Link>
    </section>
  );
}
