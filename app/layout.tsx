import type { Metadata } from "next";
import "./globals.css";
import { PreviewBanner } from "./preview-banner";

const isPreview = process.env.VERCEL_ENV === "preview";

export const metadata: Metadata = {
  title: "Mohamed B.",
  description: "Mohamed B.'s personal website.",
  // Keep preview deployments out of search results.
  ...(isPreview && { robots: { index: false, follow: false } }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PreviewBanner />
        {children}
      </body>
    </html>
  );
}
