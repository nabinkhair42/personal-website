"use client";

import { SquareMousePointer } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { SectionHeader } from "@/components/layouts/section-header";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { itemVariants } from "@/components/motion";
import {
  ExpandableSection,
  ExpandableSectionContent,
  ExpandableSectionItem,
  ExpandableSectionList,
  ExpandableSectionTrigger,
} from "@/components/ui/extended/expandable-section";
import StackBadge from "@/components/ui/extended/stack-badge";
import { TimelineLogo } from "@/components/ui/extended/timeline-logo";
import { ProjectsData } from "@/dev-constants/projects";
import { GithubIcon } from "@/icons/tech";

const DeveloperProjects = () => {
  return (
    <ShellWrapper>
      <motion.div initial="hidden" whileInView="visible" variants={itemVariants}>
        <ExpandableSection>
          <SectionHeader
            label="My Work"
            title="Projects I'm proud of"
            description="A snapshot of product-focused experiments and client work where I handled everything from UX flow to production deployment."
          />

          <ExpandableSectionList className="space-y-6">
            {ProjectsData.map((project) => (
              <motion.div key={project.title} variants={itemVariants}>
                <ExpandableSectionItem>
                  <ExpandableSectionTrigger className="flex w-full items-start gap-3 text-left">
                    <TimelineLogo
                      src={project.icon}
                      alt={`${project.title} project icon`}
                      objectFit="cover"
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      <h3 className="typography-item-title">{project.title}</h3>
                      <p className="typography-muted">{project.tagline}</p>
                    </div>
                  </ExpandableSectionTrigger>

                  <ExpandableSectionContent>
                    <p className="typography-muted">{project.description}</p>
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
                            <SquareMousePointer className="fill-current/20 h-auto w-6 text-muted-foreground" />
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
                            <GithubIcon className="fill-current/20 h-auto w-6 text-muted-foreground" />
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
