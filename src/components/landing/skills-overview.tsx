"use client";

import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiReact,

  SiTypescript,
  SiMongodb,
  SiExpress,
  // node
  SiNodedotjs,
} from "react-icons/si";

const skills = [
  {
    name: "React",
    icon: SiReact,
    color: "hover:text-[#61DAFB]",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "hover:text-foreground dark:hover:text-white",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "hover:text-[#3178C6]",
  },

  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "hover:text-[#47A248]",
  },
  {
    name: "Express",
    icon: SiExpress,
    color: "hover:text-foreground dark:hover:text-white",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "hover:text-[#3C873A]",
  }
];

export function SkillsOverview() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Skills & Technologies</h2>
          <p className="text-muted-foreground">
            Technologies I work with on a daily basis
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8 sm:grid-cols-4 md:grid-cols-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center gap-2"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-card shadow-lg ring-1 ring-border/50 transition-colors ${skill.color}`}
              >
                <skill.icon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
