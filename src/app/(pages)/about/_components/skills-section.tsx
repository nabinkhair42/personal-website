"use client";

import { skills } from "@/constants/about";
import { motion } from "framer-motion";

export const SkillsSection = () => {
  return (
    <section className="py-20 border-b px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        <div className="flex items-start justify-between mb-12 flex-wrap gap-4">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
            >
              Skills & Technologies
            </motion.h2>
            <p className="text-muted-foreground text-lg">
              Technologies I work with on a daily basis
            </p>
          </div>
        </div>

        <div className="space-y-16">
          {skills.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-8">
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="text-2xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
              >
                {category.category}
              </motion.h3>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
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
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
