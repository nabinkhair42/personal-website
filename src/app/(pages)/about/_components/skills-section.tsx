import { cn } from "@/lib/utils";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiPrisma,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiAws,
} from "react-icons/si";
import { motion } from "framer-motion";

const SKILLS = [
  {
    name: "Frontend",
    skills: [
      { name: "React", icon: SiReact, color: "hover:text-[#61DAFB]" },
      { name: "Next.js", icon: SiNextdotjs, color: "hover:text-foreground dark:hover:text-white" },
      { name: "TypeScript", icon: SiTypescript, color: "hover:text-[#3178C6]" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "hover:text-[#06B6D4]" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "hover:text-[#339933]" },
      { name: "Express", icon: SiExpress, color: "hover:text-foreground dark:hover:text-white" },
      { name: "MongoDB", icon: SiMongodb, color: "hover:text-[#47A248]" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "hover:text-[#336791]" },
    ],
  },
  {
    name: "DevOps & Tools",
    skills: [
      { name: "Docker", icon: SiDocker, color: "hover:text-[#2496ED]" },
      { name: "Git", icon: SiGit, color: "hover:text-[#F05032]" },
      { name: "AWS", icon: SiAws, color: "hover:text-[#FF9900]" },
      { name: "Prisma", icon: SiPrisma, color: "hover:text-foreground dark:hover:text-white" },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Technical Skills</h2>
          <p className="text-muted-foreground">
            I specialize in full-stack development with a focus on modern web technologies.
            Here are the key technologies I work with:
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {SKILLS.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/30 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-6 text-center">{category.name}</h3>
                <div className="grid grid-cols-2 gap-6">
                  {category.skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center gap-2"
                      >
                        <div className={cn(
                          "p-3 rounded-lg bg-muted/50 transition-colors duration-300",
                          skill.color
                        )}>
                          <Icon className="w-8 h-8" />
                        </div>
                        <span className="text-sm font-medium">{skill.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
