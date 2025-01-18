"use client";

import { Project } from "@/constants/projects";
import { motion } from "framer-motion";
import Image from "next/image";
import { IconType } from "react-icons";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Globe, Github } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group relative cursor-pointer overflow-hidden rounded-2xl bg-card shadow-lg ring-1 ring-border/50 transition-all hover:shadow-xl hover:ring-primary/50"
        >
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="mt-2 line-clamp-2 text-muted-foreground">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => {
                const Icon = tech.icon as IconType;
                return (
                  <div
                    key={techIndex}
                    className="flex items-center gap-1.5 rounded-lg p-1.5 transition-colors"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${tech.color} 10%, transparent)`,
                    }}
                  >
                    <Icon
                      className="h-4 w-4 [&>path]:fill-current [&>path]:stroke-current dark:text-white"
                      style={{ color: tech.color }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <div className="flex gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/20"
                >
                  <Globe className="h-5 w-5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/20"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <p className="mt-4 text-muted-foreground">{project.description}</p>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Technologies Used</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => {
                const Icon = tech.icon as IconType;
                return (
                  <div
                    key={techIndex}
                    className="flex items-center gap-2 rounded-lg px-3 py-1.5"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${tech.color} 10%, transparent)`,
                    }}
                  >
                    <Icon
                      className="h-4 w-4 [&>path]:fill-current [&>path]:stroke-current dark:text-white"
                      style={{ color: tech.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Key Features</h3>
            <ul className="mt-2 grid gap-2">
              {project.features.map((feature, featureIndex) => (
                <li
                  key={featureIndex}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
