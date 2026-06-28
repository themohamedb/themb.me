import { Button } from "@/components/ui/Button";
import { NoteRow } from "@/components/content/NoteRow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllNotes } from "@/lib/markdown";

export function RecentNotesSection() {
  const notes = getAllNotes().slice(0, 3);

  return (
    <section className="space-y-1">
      <div className="mb-4 flex items-center justify-between gap-4">
        <SectionHeading title="Recent Notes" />
        <Button href="/notes" variant="text">
          view all
        </Button>
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
