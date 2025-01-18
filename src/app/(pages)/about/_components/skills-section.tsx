"use client";

import { skills } from "@/constants/about";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";

export const SkillsSection = () => {
  return (
    <section className="py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center text-3xl font-bold"
      >
        Skills
      </motion.h2>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-lg ring-1 ring-border/50 transition-all hover:shadow-xl hover:ring-primary/50"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">{category.category}</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill, skillIndex) => {
                  const SkillIcon = skill.icon as IconType | LucideIcon;
                  return (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1 + skillIndex * 0.1,
                      }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <div 
                        className="rounded-lg p-2 transition-colors"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${skill.color} 10%, transparent)`,
                        }}
                      >
                        <SkillIcon 
                          className="h-5 w-5 transition-transform group-hover:scale-110 [&>path]:fill-current [&>path]:stroke-current dark:text-white"
                          style={{ 
                            color: skill.color,
                          }}
                        />
                      </div>
                      <span className="text-muted-foreground">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
