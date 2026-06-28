import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";
import { getAllNoteSlugs } from "@/lib/markdown";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/building", "/notes", "/workflows", "/resources"];

  const noteRoutes = getAllNoteSlugs().map((slug) => `/notes/${slug}`);

  return [...staticRoutes, ...noteRoutes].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));
}
