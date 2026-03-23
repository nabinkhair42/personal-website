import type { MetadataRoute } from "next";
import { DeveloperDetails } from "@/dev-constants/details";

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
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "384x384",
        type: "image/png",
      },
    ],
  };
}
