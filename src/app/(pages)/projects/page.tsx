"use client";

import { projects } from "@/constants/projects";
import { ProjectsFilter } from "./_components/projects-filter";
import { ProjectsGrid } from "./_components/projects-grid";
import { useState } from "react";
import ProjectHero from "./_components/hero-section";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = projects.filter((project) =>
    activeCategory === "all" ? true : project.category === activeCategory
  );

  return (
    <main className="max-w-5xl flex flex-col justify-center mx-auto border-l border-r">
      <ProjectHero />
      <ProjectsFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <ProjectsGrid projects={filteredProjects} />
    </main>
  );
}
