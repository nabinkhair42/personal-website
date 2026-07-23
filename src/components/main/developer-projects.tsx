"use client";

import { ChevronDown, SquareMousePointer } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SectionHeader } from "@/components/layouts/section-header";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { Button } from "@/components/ui/button";
import {
  ExpandableSection,
  ExpandableSectionContent,
  ExpandableSectionItem,
  ExpandableSectionList,
  ExpandableSectionTrigger,
} from "@/components/ui/extended/expandable-section";
import StackBadge from "@/components/ui/extended/stack-badge";
import { TimelineLogo } from "@/components/ui/extended/timeline-logo";
import { Separator } from "@/components/ui/separator";
import { ProjectsData } from "@/dev-constants/projects";
import { GithubIcon } from "@/icons/tech";

const INITIAL_VISIBLE = 6;

const DeveloperProjects = () => {
  const [expanded, setExpanded] = useState(false);
  const hasMore = ProjectsData.length > INITIAL_VISIBLE;
  const visibleProjects =
    expanded || !hasMore ? ProjectsData : ProjectsData.slice(0, INITIAL_VISIBLE);
  const hiddenCount = ProjectsData.length - INITIAL_VISIBLE;

  return (
    <ShellWrapper>
      <ExpandableSection>
        <SectionHeader
          label="My Work"
          title="Projects I'm proud of"
          description="A snapshot of product-focused experiments and client work where I handled everything from UX flow to production deployment."
        />

        <ExpandableSectionList className="gap-6">
          {visibleProjects.map((project) => (
            <ExpandableSectionItem key={project.title}>
              <ExpandableSectionTrigger className="flex w-full items-start gap-3 text-left">
                <TimelineLogo
                  src={project.icon}
                  alt={`${project.title} project icon`}
                  objectFit="cover"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <h3 className="text-base font-medium sm:text-lg md:text-xl">{project.title}</h3>
                  <p className="text-sm text-muted-foreground sm:text-base">{project.tagline}</p>
                </div>
              </ExpandableSectionTrigger>

              <ExpandableSectionContent>
                <p className="text-sm text-muted-foreground sm:text-base">{project.description}</p>
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
          ))}
        </ExpandableSectionList>
      </ExpandableSection>
      {hasMore ? (
        <div>
          <Separator className="flex-1" />
          <div className="flex items-center justify-center">
            <Button
              type="button"
              variant="secondary"
              aria-expanded={expanded}
              onClick={() => setExpanded((value) => !value)}
            >
              {expanded ? "Show less" : `Show ${hiddenCount} more`}
              <ChevronDown data-icon="inline-end" className={expanded ? "rotate-180" : undefined} />
            </Button>
          </div>
        </div>
      ) : null}
    </ShellWrapper>
  );
};

export default DeveloperProjects;
