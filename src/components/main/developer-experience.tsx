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
import { ExperienceData } from "@/dev-constants/experience";

const DeveloperExperience = () => {
  return (
    <ShellWrapper>
      <ExpandableSection>
        <SectionHeader
          label="My Journey"
          title="Professional Experience"
          description="A timeline of my career path, showcasing the roles and technologies I've worked with in various projects and companies."
        />

        <ExpandableSectionList className="space-y-6 sm:space-y-8">
          {ExperienceData.map((experience, index) => {
            const hasNext = index < ExperienceData.length - 1;
            return (
              <div key={experience.company} className="relative">
                {hasNext && (
                  <div className="absolute left-5 top-10 -bottom-10 w-px bg-muted-foreground/30 sm:-bottom-12" />
                )}
                <ExpandableSectionItem>
                  <ExpandableSectionTrigger className="flex w-full items-start gap-3 text-left">
                    <TimelineLogo src={experience.logo} alt={`${experience.company} logo`} />
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                        <h3 className="flex min-w-0 flex-wrap items-center gap-2 text-base font-medium sm:text-lg md:text-xl">
                          {experience.company}
                          {experience.isCurrent && <CurrentBadge />}
                        </h3>
                        <p className="shrink-0 text-sm text-muted-foreground tabular-nums">
                          {experience.startDate} – {experience.endDate}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground sm:text-base">
                        {experience.designation}
                        <span className="text-muted-foreground/60"> · </span>
                        {experience.type}
                      </p>
                    </div>
                  </ExpandableSectionTrigger>

                  <ExpandableSectionContent>
                    {experience.description.length > 0 && (
                      <ul className="flex flex-col gap-2 text-sm text-muted-foreground sm:text-base">
                        {experience.description.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    )}
                    {experience.skills && (
                      <div className="flex flex-wrap gap-2">
                        {experience.skills.map((skill) => (
                          <StackBadge key={skill.name} name={skill.name} icon={skill.icon} />
                        ))}
                      </div>
                    )}
                  </ExpandableSectionContent>
                </ExpandableSectionItem>
              </div>
            );
          })}
        </ExpandableSectionList>
      </ExpandableSection>
    </ShellWrapper>
  );
};

function CurrentBadge() {
  return (
    <span
      className="relative inline-flex size-2.5 items-center justify-center"
      title="Current role"
    >
      <span className="sr-only">Current</span>
      <span className="size-2 rounded-full bg-lime-500" aria-hidden />
    </span>
  );
}

export default DeveloperExperience;
