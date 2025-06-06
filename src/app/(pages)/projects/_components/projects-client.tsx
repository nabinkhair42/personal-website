"use client";

import { useState } from "react";
import { projects } from "@/constants/projects";
import { ProjectsFilter } from "./projects-filter";
import { ProjectsGrid } from "./projects-grid";
import ProjectHero from "./hero-section";
import FigmaWork from "./figma-work";

export function ProjectsClient() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = projects.filter((project) =>
    activeCategory === "all" ? true : project.category === activeCategory
  );

  return (
    <main className="max-w-5xl flex flex-col justify-center mx-auto border-l border-r border-dashed">
      <ProjectHero />
      <FigmaWork />
      <ProjectsFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <ProjectsGrid projects={filteredProjects} />
    </main>
  );
}