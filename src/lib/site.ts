import { DeveloperDetails } from "@/dev-constants/details";

export const githubUrl =
  DeveloperDetails.socialLinks.find((l) => l.name === "GitHub")?.url ??
  "https://github.com/nabinkhair42";

export const DEFAULT_OG_IMAGE = "/og-image.png";
