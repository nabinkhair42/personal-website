import type { MetadataRoute } from "next";
import { generateSitemap } from "@/lib/seo-utils";

export default function sitemap(): MetadataRoute.Sitemap {
  return generateSitemap();
}
