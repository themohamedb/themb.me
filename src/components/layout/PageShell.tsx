import { DesktopNav } from "@/components/layout/DesktopNav";
import { FloatingMenu } from "@/components/layout/FloatingMenu";

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <>
      <DesktopNav />
      <main className="flex-1 pb-8 lg:pb-16">{children}</main>
      <FloatingMenu />
    </>
  );
}
