import Markdown from "react-markdown";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="space-y-4 text-base leading-relaxed text-neutral-300 [&_a]:text-neutral-200 [&_a]:underline [&_a]:underline-offset-4 [&_h2]:pt-2 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-white [&_p]:leading-relaxed [&_strong]:text-white">
      <Markdown>{content}</Markdown>
    </div>
  );
}
