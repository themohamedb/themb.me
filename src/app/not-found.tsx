import { PageIntro } from "@/components/ui/PageIntro";

export default function NotFound() {
  return (
    <div className="page-container page-stack">
      <PageIntro
        title="Page not found"
        description="The page you're looking for doesn't exist or has moved."
      />
    </div>
  );
}
