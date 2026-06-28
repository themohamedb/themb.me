import { DesktopNav } from "@/components/layout/DesktopNav";
import { FloatingMenu } from "@/components/layout/FloatingMenu";
import { Footer } from "@/components/layout/Footer";

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <>
      <DesktopNav />
      <main className="flex-1 pb-28 lg:pb-16">{children}</main>
      <Footer />
      <FloatingMenu />
    </>
  );
}
