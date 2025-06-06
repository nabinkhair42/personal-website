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
    <div className="relative">
      {/* Main Container with Architectural Grid */}
      <main className="max-w-5xl mx-auto border-l border-r border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        {/* Hero Section */}
        <ProjectHero />
        
        {/* Filter Section */}
        <ProjectsFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        {/* Projects Grid */}
        <ProjectsGrid projects={filteredProjects} />
        
        {/* Figma Work Section */}
        <FigmaWork />
      </main>

      {/* Subtle Side Elements */}
      <div className="absolute top-0 left-0 w-px h-full bg-zinc-200 dark:bg-zinc-800 opacity-50"></div>
      <div className="absolute top-0 right-0 w-px h-full bg-zinc-200 dark:bg-zinc-800 opacity-50"></div>
    </div>
  );
}