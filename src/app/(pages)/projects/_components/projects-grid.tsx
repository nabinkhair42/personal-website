"use client";

import { Project } from "@/constants/projects";
import { ProjectCard } from "./project-card";
import { motion } from "framer-motion";

interface ProjectsGridProps {
  projects: Project[];
}

export const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
  return (
    <motion.div
      layout
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project, index) => (
        <ProjectCard key={project.title} project={project} index={index} />
      ))}
    </motion.div>
  );
};
