import { projectsMetadata } from "@/config/metadata";
import { ProjectsClient } from "./_components/projects-client";

export const metadata = projectsMetadata;

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Projects Portfolio | Nabin Khair",
  description: "Explore my portfolio of web applications, client projects, and personal works.",
  url: "https://nabinkhair.com.np/projects",
  author: {
    "@type": "Person",
    name: "Nabin Khair"
  }
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
