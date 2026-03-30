import { DotIcon, SquareMousePointer } from "lucide-react";
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

const DeveloperProjects = () => {
  return (
    <ShellWrapper>
      <ExpandableSection>
        <ExpandableSectionHeader>
          <ExpandableSectionLabel>My Work</ExpandableSectionLabel>
          <ExpandableSectionTitle>Projects I&apos;m proud of</ExpandableSectionTitle>
          <ExpandableSectionDescription>
            A snapshot of product-focused experiments and client work where I handled everything
            from UX flow to production deployment.
          </ExpandableSectionDescription>
        </ExpandableSectionHeader>

        <ExpandableSectionList>
          {ProjectsData.map((project) => (
            <ExpandableSectionItem key={project.title} className="pb-4">
              <ExpandableSectionTrigger>
                <div className="flex space-x-2">
                  <div className="aspect-square bg-muted h-10 flex items-center justify-center border rounded mt-1">
                    <Image
                      src={project.icon}
                      alt={`${project.title} project icon`}
                      width={32}
                      height={32}
                      sizes="32px"
                      className="h-8 w-8 rounded object-cover"
                      title={project.title}
                    />
                  </div>
                  <div className="space-y-1 pl-3">
                    <h3 className="text-lg font-medium text-foreground md:text-xl">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{project.tagline}</p>
                  </div>
                </div>
              </ExpandableSectionTrigger>

              <ExpandableSectionContent>
                <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {project.description.map((line) => (
                    <li key={line} className="flex">
                      <DotIcon />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                {project.techStack && (
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <StackBadge key={tech.name} name={tech.name} icon={tech.icon} />
                    ))}
                  </div>
                )}
                {(project.liveLink || project.repo) && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.liveLink && (
                      <Link
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`Open live site for ${project.title}`}
                        title={`Open live site for ${project.title}`}
                      >
                        <SquareMousePointer className="size-4" />
                      </Link>
                    )}
                    {project.repo && (
                      <Link
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`View repository for ${project.title}`}
                      >
                        <GithubIcon aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                )}
              </ExpandableSectionContent>
            </ExpandableSectionItem>
          ))}
        </ExpandableSectionList>
      </ExpandableSection>
    </ShellWrapper>
  );
};

export default DeveloperProjects;
