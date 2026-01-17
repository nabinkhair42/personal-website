import { DeveloperDetails } from "@/dev-constants/details";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: DeveloperDetails.name,
    short_name: DeveloperDetails.initials,
    description: DeveloperDetails.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
