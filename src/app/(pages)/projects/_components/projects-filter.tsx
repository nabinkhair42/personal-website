"use client";

import { Button } from "@/components/ui/button";

interface ProjectsFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

// Simplified categories based on project types
const categories = [
  { value: "all", label: "All" },
  { value: "webapp", label: "Web App" },
  { value: "mobileapp", label: "Mobile App" },
  { value: "others", label: "Others" },
];

export const ProjectsFilter = ({
  activeCategory,
  onCategoryChange,
}: ProjectsFilterProps) => {
  return (
    <section className="relative px-6 py-16 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
      {/* Enhanced geometric pattern following your design principles */}
      <div className="absolute inset-0 opacity-[0.008] dark:opacity-[0.012] pointer-events-none">
        <div className="absolute top-0 left-0 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
        <div className="absolute top-0 left-20 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
        <div className="absolute top-0 left-40 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
        <div className="absolute top-0 right-40 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
        <div className="absolute top-0 right-20 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
        
        {/* Horizontal structural lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-zinc-400 dark:bg-zinc-600 opacity-50"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-zinc-400 dark:bg-zinc-600 opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-px bg-zinc-300 dark:bg-zinc-700"></div>
          <div className="w-2 h-2 bg-zinc-400 dark:bg-zinc-600 rotate-45"></div>
          <span className="text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
            Filter Projects
          </span>
          <div className="w-2 h-2 bg-zinc-400 dark:bg-zinc-600 rotate-45"></div>
          <div className="w-12 h-px bg-zinc-300 dark:bg-zinc-700"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category, index) => (
            <div
              key={category.value}
              className="animate-in fade-in duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Button
                variant={activeCategory === category.value ? "default" : "outline"}
                onClick={() => onCategoryChange(category.value)}
                className={`
                  relative overflow-hidden transition-all duration-300 
                  ${activeCategory === category.value 
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100' 
                    : 'bg-transparent border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600'
                  }
                  font-mono text-sm tracking-wide uppercase px-6 py-2
                `}
              >
                {category.label}
                {activeCategory === category.value && (
                  <div className="absolute bottom-0 left-0 w-full h-px bg-zinc-100 dark:bg-zinc-900"></div>
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};