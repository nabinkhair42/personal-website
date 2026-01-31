import type { MetadataRoute } from "next";
import { generateRobots } from "@/lib/seo-utils";

export default function robots(): MetadataRoute.Robots {
  return generateRobots();
}
