import { GraduationCap } from "lucide-react";
import { SectionHeader } from "@/components/layouts/section-header";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { TimelineLogo } from "@/components/ui/extended/timeline-logo";
import { DeveloperDetails } from "@/dev-constants/details";

const DeveloperEducation = () => {
  const educationData = DeveloperDetails.education;

  return (
    <ShellWrapper>
      <section className="space-y-3 p-2">
        <SectionHeader
          label="Education"
          title="Academic Background"
          description="My educational journey that shaped my foundation in technology and problem-solving."
        />

        <div className="flex flex-col gap-6 sm:gap-8">
          {educationData.map((education, index) => {
            const hasNext = index < educationData.length - 1;
            return (
              <div key={education.institution} className="relative flex items-start gap-3">
                {hasNext && (
                  <span className="absolute left-5 top-10 -bottom-10 w-px bg-muted-foreground/30 sm:-bottom-12" />
                )}
                <TimelineLogo
                  src={education.logo}
                  alt={`${education.institution} logo`}
                  fallback={<GraduationCap className="size-5 text-muted-foreground" />}
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                    <h3 className="text-base font-medium sm:text-lg md:text-xl">
                      {education.institution}
                    </h3>
                    <p className="shrink-0 text-sm text-muted-foreground tabular-nums">
                      {education.startDate} – {education.endDate}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground sm:text-base">
                    {education.degree}
                    <span className="text-muted-foreground/60"> · </span>
                    {education.location}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </ShellWrapper>
  );
};

export default DeveloperEducation;
