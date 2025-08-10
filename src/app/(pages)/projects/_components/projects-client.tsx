'use client';

import { projects } from '@/constants/projects';
import { useState } from 'react';
import FigmaWork from './figma-work';
import ProjectHero from './hero-section';
import { ProjectsFilter } from './projects-filter';
import { ProjectsGrid } from './projects-grid';

export function ProjectsClient() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = projects.filter((project) =>
    activeCategory === 'all' ? true : project.category === activeCategory
  );

  return (
    <div className="relative">
      {/* Main Container with Architectural Grid */}
      <main className="max-w-5xl mx-auto border-l border-r  border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <ProjectHero />

        <ProjectsFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <ProjectsGrid projects={filteredProjects} />

        <FigmaWork />
      </main>

      {/* Subtle Side Elements */}
      <div className="absolute top-0 left-0 w-px h-full bg-zinc-200 dark:bg-zinc-800 opacity-50"></div>
      <div className="absolute top-0 right-0 w-px h-full bg-zinc-200 dark:bg-zinc-800 opacity-50"></div>
    </div>
  );
}
