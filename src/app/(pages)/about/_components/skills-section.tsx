"use client";

import { skills } from "@/constants/about";
import { motion } from "framer-motion";

export const SkillsSection = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center text-3xl font-bold"
      >
        Skills & Expertise
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {skills.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={index}
              variants={item}
              className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-lg ring-1 ring-border/50 transition-all hover:shadow-xl hover:ring-primary/50"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">{category.category}</h3>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => {
                  const SkillIcon = skill.icon;
                  return (
                    <div
                      key={skillIndex}
                      className="flex items-center gap-2 rounded-lg bg-background px-3 py-1.5 ring-1 ring-border/50"
                    >
                      <SkillIcon className="h-4 w-4" />
                      <span className="text-sm">{skill.name}</span>
                    </div>
                  );
                })}
              </div>

              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0"
                animate={{
                  x: ["0%", "200%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
