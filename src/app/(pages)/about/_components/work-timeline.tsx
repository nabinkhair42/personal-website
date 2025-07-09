"use client";

import { Calendar, Palette } from "lucide-react";
import {
  SiAmazon,
  SiCloudflare,
  SiExpress,
  SiFigma,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import FinFoxLogo from "./FinfoxLogo";
import { FaBuildingUser } from "react-icons/fa6";

// Technology icons mapping
const technologyIcons: Record<string, { icon: React.ElementType; color?: string }> = {
  "React.js": { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs },
  "TypeScript": { icon: SiTypescript, color: "#3178C6" },
  "Figma": { icon: SiFigma, color: "#F24E1E" },
  "UI/UX Design": { icon: Palette, color: "#0284C7" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  "Express.js": { icon: SiExpress },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "AWS": { icon: SiAmazon, color: "#FF9900" },
  "Vercel": { icon: SiVercel },
  "Cloudflare": { icon: SiCloudflare, color: "#F38020" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
};

const experiences = [
  {
    title: "Frontend Developer & UI/UX Designer",
    company: "FinFox App, Inc.",
    period: "May 2025 - Present",
    description:
      "Developing responsive web applications using React.js and Next.js, implementing modern UI components and ensuring optimal performance across different devices and browsers. Creating user-centered design solutions, wireframes, and prototypes using Figma while building reusable React components with TypeScript.",
    technologies: ["React.js", "Next.js", "TypeScript", "Figma", "UI/UX Design"],
    icon: FinFoxLogo,
  },
  {
    title: "Frontend & Backend Developer",
    company: "Freelance MERN & Next.js Developer",
    period: "2022 - May 2025",
    description:
      "Developed multiple full-stack applications using React.js, Next.js, Node.js, Express.js, and MongoDB with deployment on AWS, Vercel, and Cloudflare platforms. Successfully delivered projects including Express News platform, UncleSams Tech website, Receipt Vault application, and various other client solutions with modern UI/UX design.",
    technologies: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "AWS", "Vercel", "Cloudflare", "Tailwind CSS"],
    icon: FaBuildingUser,
  },
];

export const WorkTimeline = () => {
  return (
    <section className="relative px-6 py-20 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      {/* Minimal geometric pattern */}
      <div className="absolute inset-0 opacity-3 dark:opacity-5">
        <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
        <div className="absolute top-0 left-40 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-40 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
            <span className="text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
              Professional Journey
            </span>
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-zinc-900 dark:text-zinc-100 mb-6 tracking-tight">
            Work
            <br />
            <span className="font-serif italic">Experience</span>
          </h2>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all hover:border-zinc-300 dark:hover:border-zinc-700 animate-in fade-in duration-700 slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Minimal geometric pattern */}
              <div className="absolute inset-0 opacity-5 dark:opacity-10">
                <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
                <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
              </div>

              <div className="relative p-8">
                {/* Company Icon */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 group-hover:border-zinc-300 dark:group-hover:border-zinc-600 transition-colors duration-300">
                    <experience.icon className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700 group-hover:w-12 transition-all duration-300"></div>
                </div>

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-light text-zinc-900 dark:text-zinc-100 tracking-tight group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors duration-300 mb-2">
                      {experience.title}
                    </h3>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 font-light mb-2">
                      {experience.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                      <Calendar className="w-3 h-3 text-zinc-500 dark:text-zinc-400" />
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono uppercase tracking-wide">
                        {experience.period}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-6">
                  {experience.description}
                </p>

                {/* Technologies */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <h4 className="text-sm font-light text-zinc-700 dark:text-zinc-300 tracking-tight">
                      Technologies
                    </h4>
                    <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800"></div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono uppercase tracking-wide">
                      {experience.technologies.length} Skills
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {experience.technologies.map((tech, techIndex) => {
                      const techInfo = technologyIcons[tech];
                      const IconComponent = techInfo?.icon;
                      
                      return (
                        <div
                          key={tech}
                          className="group/tech relative overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 transition-all hover:border-zinc-300 dark:hover:border-zinc-700 animate-in fade-in duration-500"
                          style={{ animationDelay: `${(index * 200) + (techIndex * 50)}ms` }}
                        >
                          {/* Minimal geometric pattern */}
                          <div className="absolute inset-0 opacity-5 dark:opacity-10">
                            <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
                            <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
                          </div>

                          <div className="relative p-3 text-center">
                            {/* Tech Icon */}
                            {IconComponent && (
                              <div className="flex items-center justify-center mb-2">
                                <IconComponent
                                  className="w-5 h-5 group-hover/tech:scale-110 transition-transform duration-300"
                                  style={{ color: techInfo?.color }}
                                />
                              </div>
                            )}
                            
                            {/* Tech Name */}
                            <span className="text-xs text-zinc-600 dark:text-zinc-400 font-light group-hover/tech:text-zinc-900 dark:group-hover/tech:text-zinc-100 transition-colors duration-300 leading-tight">
                              {tech}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
