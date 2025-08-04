'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Project } from '@/constants/projects';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { IconType } from 'react-icons';
// import { SiGithub } from "react-icons/si";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group relative cursor-pointer overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-700 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl">
          {/* Minimal geometric pattern */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
            <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
          </div>

          {/* Project Image */}
          <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Project Content */}
          <div className="relative p-6">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-zinc-400 dark:bg-zinc-600"></div>
              <span className="text-xs tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-light text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors duration-300">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed line-clamp-2 mb-4">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 4).map((tech, techIndex) => {
                const Icon = tech.icon as IconType;
                return (
                  <div
                    key={techIndex}
                    className="flex items-center justify-center w-8 h-8 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 group-hover:border-zinc-300 dark:group-hover:border-zinc-600 transition-colors duration-300"
                    title={tech.name}
                  >
                    <Icon className="w-4 h-4" style={{ color: tech.color }} />
                  </div>
                );
              })}
              {project.technologies.length > 4 && (
                <div className="flex items-center justify-center w-8 h-8 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    +{project.technologies.length - 4}
                  </span>
                </div>
              )}
            </div>

            {/* View Project Link */}
            <div className="inline-flex items-center gap-2 text-zinc-700 dark:text-zinc-300 group-hover:gap-3 transition-all duration-300">
              <span className="text-xs tracking-wide font-mono uppercase">
                View Details
              </span>
              <div className="w-4 h-px bg-zinc-700 dark:bg-zinc-300 group-hover:w-6 transition-all duration-300"></div>
              <svg
                className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </DialogTrigger>

      {/* Enhanced Dialog */}
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <DialogTitle className="sr-only">
          {project.title} - Project Details
        </DialogTitle>
        <DialogHeader>
          <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 border  border-zinc-200 dark:border-zinc-700">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* Header with Actions */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-zinc-400 dark:bg-zinc-600"></div>
                <span className="text-xs tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                  {project.category}
                </span>
              </div>
              <h2 className="text-3xl font-light text-zinc-900 dark:text-zinc-100 tracking-tight">
                {project.title}
              </h2>
            </div>

            <div className="flex gap-2">
              {project.demoUrl && (
                <Link
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors duration-300"
                >
                  <ExternalLink className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                </Link>
              )}
              {/* {project.demoUrl && (
                <Link
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors duration-300"
                >
                  <SiGithub className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                </Link>
              )} */}
            </div>
          </div>

          {/* Description */}
          <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-lg font-light text-zinc-900 dark:text-zinc-100 tracking-tight">
                Technologies
              </h3>
              <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {project.technologies.map((tech, techIndex) => {
                const Icon = tech.icon as IconType;
                return (
                  <div
                    key={techIndex}
                    className="flex items-center gap-3 p-3 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                  >
                    <Icon
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: tech.color }}
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300 font-light">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Features */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-lg font-light text-zinc-900 dark:text-zinc-100 tracking-tight">
                Key Features
              </h3>
              <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800"></div>
            </div>
            <div className="space-y-3">
              {project.features.map((feature, featureIndex) => (
                <div
                  key={featureIndex}
                  className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400 font-light"
                >
                  <div className="w-1 h-1 bg-zinc-400 dark:bg-zinc-600 mt-2 flex-shrink-0"></div>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
