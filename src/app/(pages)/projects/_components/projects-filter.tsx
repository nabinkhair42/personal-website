"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ProjectsFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { value: "all", label: "All Projects" },
  { value: "client", label: "Client Work" },
  { value: "collaborative", label: "Collaborative" },
  { value: "personal", label: "Personal" },
];

export const ProjectsFilter = ({
  activeCategory,
  onCategoryChange,
}: ProjectsFilterProps) => {
  return (
    <div className="px-4 border-b py-8">
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <motion.div
            key={category.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant={activeCategory === category.value ? "default" : "outline"}
              onClick={() => onCategoryChange(category.value)}
              className="transition-all"
            >
              {category.label}
            </Button>
          </motion.div>
        ))}
      </div></div>
  );
};
