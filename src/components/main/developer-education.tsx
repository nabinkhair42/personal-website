import { GraduationCap } from "lucide-react";
import { SectionHeader } from "@/components/layouts/section-header";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { TimelineLogo } from "@/components/ui/extended/timeline-logo";
import { DeveloperDetails } from "@/dev-constants/details";

const DeveloperEducation = () => {
  return (
    <ShellWrapper>
      <SectionHeader title="Education" description="Where the foundation was built." />

      <div className="divide-y divide-border/60">
        {DeveloperDetails.education.map((education) => (
          <div
            key={education.institution}
            className="flex items-start gap-3 py-4 first:pt-1 last:pb-1"
          >
            <TimelineLogo
              src={education.logo}
              alt={`${education.institution} logo`}
              fallback={<GraduationCap className="size-5 text-muted-foreground" />}
            />
            <div className="min-w-0 flex-1 space-y-0.5">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-balance text-base font-medium leading-snug">
                  {education.institution}
                </h3>
                <p className="shrink-0 text-xs tracking-wide text-muted-foreground tabular-nums sm:text-sm">
                  {education.startDate} – {education.endDate}
                </p>
              </div>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                {education.degree}
                <span className="text-muted-foreground/60"> · </span>
                {education.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ShellWrapper>
  );
};

export default DeveloperEducation;
