"use client";

import { SquareMousePointer } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import {
  ExpandableSection,
  ExpandableSectionContent,
  ExpandableSectionDescription,
  ExpandableSectionHeader,
  ExpandableSectionItem,
  ExpandableSectionLabel,
  ExpandableSectionList,
  ExpandableSectionTitle,
  ExpandableSectionTrigger,
} from "@/components/ui/extended/expandable-section";
import StackBadge from "@/components/ui/extended/stack-badge";
import { ProjectsData } from "@/dev-constants/projects";
import { GithubIcon } from "@/icons/tech";
import { itemVariants, sectionVariants, VIEWPORT } from "../motion";

const DeveloperProjects = () => {
  return (
    <ShellWrapper>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={sectionVariants}
      >
        <ExpandableSection>
          <motion.div variants={itemVariants}>
            <ExpandableSectionHeader>
              <ExpandableSectionLabel>My Work</ExpandableSectionLabel>
              <ExpandableSectionTitle>Projects I&apos;m proud of</ExpandableSectionTitle>
              <ExpandableSectionDescription>
                A snapshot of product-focused experiments and client work where I handled everything
                from UX flow to production deployment.
              </ExpandableSectionDescription>
            </ExpandableSectionHeader>
          </motion.div>

          <ExpandableSectionList className="space-y-6">
            {ProjectsData.map((project) => (
              <motion.div key={project.title} variants={itemVariants}>
                <ExpandableSectionItem>
                  <ExpandableSectionTrigger>
                    <div className="flex items-start gap-3">
                      <Image
                        src={project.icon}
                        alt={`${project.title} project icon`}
                        width={40}
                        height={40}
                        className="size-10 shrink-0 rounded-md border bg-muted object-cover p-px"
                      />
                      <div className="space-y-1">
                        <h3 className="text-lg font-medium md:text-xl">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">{project.tagline}</p>
                      </div>
                    </div>
                  </ExpandableSectionTrigger>

                  <ExpandableSectionContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    {project.techStack && (
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <StackBadge key={tech.name} name={tech.name} icon={tech.icon} />
                        ))}
                      </div>
                    )}
                    {(project.liveLink || project.repo) && (
                      <div className="flex flex-wrap gap-2 py-2">
                        {project.liveLink && (
                          <Link
                            href={project.liveLink}
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label={`Open live site for ${project.title}`}
                            className="rounded-md border p-1 text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <SquareMousePointer className="size-5 fill-muted-foreground/20 text-muted-foreground" />
                          </Link>
                        )}
                        {project.repo && (
                          <Link
                            href={project.repo}
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label={`View repository for ${project.title}`}
                            className="rounded-md border p-1 text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <GithubIcon className="size-5 fill-muted-foreground/20 text-muted-foregroundd" />
                          </Link>
                        )}
                      </div>
                    )}
                  </ExpandableSectionContent>
                </ExpandableSectionItem>
              </motion.div>
            ))}
          </ExpandableSectionList>
        </ExpandableSection>
      </motion.div>
    </ShellWrapper>
  );
};

export default DeveloperProjects;
