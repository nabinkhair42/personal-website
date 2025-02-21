"use client";

import { Button } from "@/components/ui/button";
import { skills } from "@/constants/about";
import { motion } from "framer-motion";
import { useState } from "react";

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState(skills[0].category);

  return (
    <section className="py-20 border-b border-dashed px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        <div className="flex items-start justify-center flex-wrap gap-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Skills & Technologies</h2>
            <p className="text-muted-foreground">
              Technologies I work with on a daily basis
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 w-full items-center justify-center">
          {skills.map((category) => (
            <div key={category.category}>
              <Button
                variant={activeCategory === category.category ? "default" : "outline"}
                onClick={() => setActiveCategory(category.category)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${activeCategory === category.category
                  ? "bg-foreground text-background shadow-lg"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
                  }`}
              >
                {category.category}
              </Button></div>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {skills
            .find((cat) => cat.category === activeCategory)
            ?.skills.map((skill, index) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group flex flex-col items-center gap-3"
              >
                <div
                  style={{
                    '--hover-color': skill.color || '#666'
                  } as React.CSSProperties}
                  className="flex h-20 w-20 items-center justify-center rounded-2xl bg-card hover:shadow-lg ring-1 ring-border/50 transition-all duration-300 hover:ring-2 hover:ring-[var(--hover-color)] group-hover:shadow-[var(--hover-color)]/20"
                >
                  <skill.icon
                    style={{ color: skill.color }}
                    className="h-10 w-10 transition-all duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="text-base font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {skill.name}
                </span>
              </motion.div>
            ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
