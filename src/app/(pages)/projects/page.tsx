"use client";

import { projects } from "@/constants/projects";
import { ProjectsFilter } from "./_components/projects-filter";
import { ProjectsGrid } from "./_components/projects-grid";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = projects.filter((project) =>
    activeCategory === "all" ? true : project.category === activeCategory
  );

  return (
    <main className="px-4 md:px-0 py-24 max-w-5xl mx-auto">
       <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-4xl font-bold"
      >
        My Projects
      </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground"
        >
          A collection of my projects, ranging from web applications to browser
          extensions. Each project showcases different skills and technologies.
        </motion.p>

        <div className="mt-12 space-y-12">
          <ProjectsFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <ProjectsGrid projects={filteredProjects} />
        </div> 
    </main>
  );
}
