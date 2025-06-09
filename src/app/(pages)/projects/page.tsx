import { projectsMetadata } from "@/config/metadata";
import { ProjectsClient } from "./_components/projects-client";

export const metadata = projectsMetadata;

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <ProjectsClient />
    </div>
  );
}