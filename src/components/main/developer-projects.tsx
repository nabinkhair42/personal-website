"use client";

import { ChevronDown, SquareMousePointer } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SectionHeader } from "@/components/layouts/section-header";
import ShellWrapper from "@/components/layouts/shell-wrapper";
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
import { cn } from "@/lib/utils";

const INITIAL_VISIBLE = 5;

const DeveloperProjects = () => {
  const [expanded, setExpanded] = useState(false);
  const hasMore = ProjectsData.length > INITIAL_VISIBLE;
  const visibleProjects =
    expanded || !hasMore ? ProjectsData : ProjectsData.slice(0, INITIAL_VISIBLE);

  return (
    <ShellWrapper>
      <ExpandableSection>
        <SectionHeader title="Work" description="Product-focused experiments and client work." />

        <ExpandableSectionList className="gap-0 divide-y divide-border/60">
          {visibleProjects.map((project) => (
            <ExpandableSectionItem key={project.title} className="py-4 first:pt-1 last:pb-1">
              <ExpandableSectionTrigger className="flex w-full items-start gap-3 text-left">
                <TimelineLogo
                  src={project.icon}
                  alt={`${project.title} project icon`}
                  objectFit="cover"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <h3 className="text-balance text-base font-medium leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                    {project.tagline}
                  </p>
                </div>
              </ExpandableSectionTrigger>

              <ExpandableSectionContent>
                <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <StackBadge key={tech.name} name={tech.name} icon={tech.icon} />
                  ))}
                </div>
                {(project.liveLink || project.repo) && (
                  <div className="flex flex-wrap gap-2 py-1">
                    {project.liveLink && (
                      <Link
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`Open live site for ${project.title}`}
                        className="inline-flex size-10 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <SquareMousePointer className="size-5 fill-current/20" />
                      </Link>
                    )}
                    {project.repo && (
                      <Link
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`View repository for ${project.title}`}
                        className="inline-flex size-10 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <GithubIcon className="size-5 fill-current/20" />
                      </Link>
                    )}
                  </div>
                )}
              </ExpandableSectionContent>
            </ExpandableSectionItem>
          ))}
        </ExpandableSectionList>

        {hasMore ? (
          <div className="flex justify-center pt-2">
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded((value) => !value)}
              className="inline-flex min-h-9 items-center gap-1 text-sm tabular-nums text-muted-foreground transition-colors hover:text-foreground"
            >
              {expanded ? "Show less" : "View all"}
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform duration-200",
                  expanded && "rotate-180"
                )}
                aria-hidden
              />
            </button>
          </div>
        ) : null}
      </ExpandableSection>
    </ShellWrapper>
  );
};

export default DeveloperProjects;
