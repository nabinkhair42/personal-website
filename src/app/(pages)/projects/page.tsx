import { projectsMetadata } from "@/config/metadata";
import { ProjectsClient } from "./_components/projects-client";
import { siteConfig } from "@/config/site";

export const metadata = {
  ...projectsMetadata,
  other: {
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Projects Portfolio | Nabin Khair",
      description: "Explore my portfolio of web applications, client projects, and personal works.",
      url: `${siteConfig.baseUrl}/projects`,
      author: {
        "@type": "Person",
        name: siteConfig.name
      }
    }
  }
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
