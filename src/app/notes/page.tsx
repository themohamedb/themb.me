import { NoteRow } from "@/components/content/NoteRow";
import { createPageMetadata } from "@/lib/config/metadata";
import { getAllNotes } from "@/lib/markdown";

export const metadata = createPageMetadata({
  title: "Notes & Ideas",
  description:
    "Notes on design, building, tools, workflows, and turning ideas into useful products.",
  path: "/notes",
});

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <div className="page-container page-stack">
      <section className="page-intro">
        <h1>Notes &amp; Ideas</h1>
        <p>
          Short notes on design, building, tools, and the work of turning rough
          ideas into clear, useful products.
        </p>
      </section>

      <section>
        {notes.map((note, index) => (
          <NoteRow
            key={note.slug}
            note={note}
            showDivider={index < notes.length - 1}
          />
        ))}
      </section>
    </div>
  );
}
