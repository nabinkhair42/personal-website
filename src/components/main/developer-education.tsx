"use client";

import { GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import { SectionHeader } from "@/components/layouts/section-header";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { APPLE_EASE, itemVariants, sectionVariants, VIEWPORT } from "@/components/motion";
import { TimelineLogo } from "@/components/ui/extended/timeline-logo";
import { DeveloperDetails } from "@/dev-constants/details";

const DeveloperEducation = () => {
  const educationData = DeveloperDetails.education;

  return (
    <ShellWrapper>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={sectionVariants}
        className="space-y-3 p-2"
      >
        <motion.div variants={itemVariants}>
          <SectionHeader
            label="Education"
            title="Academic Background"
            description="My educational journey that shaped my foundation in technology and problem-solving."
          />
        </motion.div>

        <div className="flex flex-col gap-6 sm:gap-8">
          {educationData.map((education, index) => {
            const hasNext = index < educationData.length - 1;
            return (
              <motion.div
                key={education.institution}
                variants={itemVariants}
                className="relative flex items-start gap-3"
              >
                {hasNext && (
                  <motion.span
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.6, delay: 0.2, ease: APPLE_EASE }}
                    style={{ originY: 0 }}
                    className="absolute left-5 top-10 -bottom-10 w-px bg-muted-foreground/30 sm:-bottom-12"
                  />
                )}
                <TimelineLogo
                  src={education.logo}
                  alt={`${education.institution} logo`}
                  fallback={<GraduationCap className="size-5 text-muted-foreground" />}
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                    <h3 className="typography-item-title">{education.institution}</h3>
                    <p className="typography-label shrink-0 tabular-nums">
                      {education.startDate} – {education.endDate}
                    </p>
                  </div>
                  <p className="typography-muted">
                    {education.degree}
                    <span className="text-muted-foreground/60"> · </span>
                    {education.location}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </ShellWrapper>
  );
};

export default DeveloperEducation;
