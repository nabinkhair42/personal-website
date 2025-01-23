"use client";

import { Button } from "@/components/ui/button";
import { projects } from "@/constants/projects";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/app/(pages)/projects/_components/project-card";

const FEATURED_PROJECTS = ["Pira", "Receipt Vault", "AlgoDocs"];

export function FeaturedProjects() {
  const featuredProjects = projects.filter((project) =>
    FEATURED_PROJECTS.includes(project.title)
  );

  return (
    <section className="w-full py-16 sm:py-20 border-b px-4">
        <div className="flex items-start justify-between mb-12 flex-wrap gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground">
              Here are some of my favorite projects that showcase my skills and experience in building real-world applications.
            </p>
          </div>
          <Link href="/projects">
            <Button variant="outline" className="group">
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
    </section>
  );
}
