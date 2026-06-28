import Link from "next/link";
import { NoteRow } from "@/components/content/NoteRow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllNotes } from "@/lib/markdown";

export function RecentNotesSection() {
  const notes = getAllNotes().slice(0, 3);

  return (
    <section className="space-y-1">
      <div className="mb-4 flex items-center justify-between gap-4">
        <SectionHeading title="Recent Notes" />
        <Link
          href="/notes"
          className="text-xs text-muted transition-colors hover:text-neutral-300"
        >
          view all
        </Link>
      </div>

      <div>
        {notes.map((note, index) => (
          <NoteRow
            key={note.slug}
            note={note}
            showDivider={index < notes.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
