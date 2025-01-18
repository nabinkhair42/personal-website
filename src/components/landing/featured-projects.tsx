"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { projects } from "@/constants/projects";
import { motion } from "framer-motion";
import { ArrowRight, Github, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

const FEATURED_PROJECTS = ["Pira", "Receipt Vault", "AlgoDocs"];

export function FeaturedProjects() {
  const featuredProjects = projects.filter((project) =>
    FEATURED_PROJECTS.includes(project.title)
  );

  return (
    <section className="py-20 ">
      <div className="container">
        <div className="flex items-center justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground">
              Here are some of my favorite projects that showcase my skills and experience in building real-world applications.
            </p>
          </div>
          <Link href="/projects">
            <Button variant="ghost" className="group">
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative bg-card rounded-xl overflow-hidden border shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-64"
                />
              </div>
              <div className="p-6 space-y-4 border-t">
                <h3 className="text-2xl font-semibold">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground opacity-90 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech.name} className="text-xs px-3 py-1">
                      {tech.name}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      className={buttonVariants({ variant: "link" })}
                    >
                      <Github className="w-5 h-5" />
                    </Link>
                  )}
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      className={buttonVariants({ variant: "link" })}
                    >
                      <LinkIcon className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
