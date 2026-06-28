import { DesktopNav } from "@/components/layout/DesktopNav";
import { FloatingMenu } from "@/components/layout/FloatingMenu";
import { Footer } from "@/components/layout/Footer";
import { MobileHeader } from "@/components/layout/MobileHeader";

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <>
      <DesktopNav />
      <MobileHeader />
      <main className="flex-1 pb-28 lg:pb-16">{children}</main>
      <Footer />
      <FloatingMenu />
    </>
  );
}
