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
        <SectionHeader title="Experience" description="Roles and teams I've shipped with." />

        <ExpandableSectionList className="gap-0 divide-y divide-border/60">
          {ExperienceData.map((experience, index) => (
            <ExpandableSectionItem
              key={experience.company}
              defaultOpen={index === 0}
              className="py-4 first:pt-1 last:pb-1"
            >
              <ExpandableSectionTrigger className="flex w-full items-start gap-3 text-left">
                <TimelineLogo src={experience.logo} alt={`${experience.company} logo`} />
                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <h3 className="flex min-w-0 flex-wrap items-center gap-2 text-balance text-base font-medium leading-snug">
                      {experience.company}
                      {experience.isCurrent && <CurrentBadge />}
                    </h3>
                    <p className="shrink-0 text-xs tracking-wide text-muted-foreground tabular-nums sm:text-sm">
                      {experience.startDate} – {experience.endDate}
                    </p>
                  </div>
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                    {experience.designation}
                    <span className="text-muted-foreground/60"> · </span>
                    {experience.type}
                  </p>
                </div>
              </ExpandableSectionTrigger>

              <ExpandableSectionContent>
                <ul className="flex flex-col gap-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {experience.description.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {experience.skills?.map((skill) => (
                    <StackBadge key={skill.name} name={skill.name} icon={skill.icon} />
                  ))}
                </div>
              </ExpandableSectionContent>
            </ExpandableSectionItem>
          ))}
        </ExpandableSectionList>
      </ExpandableSection>
    </ShellWrapper>
  );
};

function CurrentBadge() {
  return (
    <span className="inline-flex" title="Current role">
      <span className="sr-only">Current</span>
      <span className="size-2 rounded-full bg-primary" aria-hidden />
    </span>
  );
}

export default DeveloperExperience;
