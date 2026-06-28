import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

interface PageMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
}

export function createPageMetadata({
  title,
  description = siteConfig.description,
  path = "",
}: PageMetadataOptions = {}): Metadata {
  const pageTitle = title ? `${title} — ${siteConfig.name}` : siteConfig.title;
  const url = `${siteConfig.url}${path}`;

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: path || "/",
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
