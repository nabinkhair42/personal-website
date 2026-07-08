"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionHeader } from "@/components/layouts/section-header";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { APPLE_EASE, itemVariants, sectionVariants, VIEWPORT } from "@/components/motion";
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
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={sectionVariants}
      >
        <ExpandableSection>
          <motion.div variants={itemVariants}>
            <SectionHeader
              label="My Journey"
              title="Professional Experience"
              description="A timeline of my career path, showcasing the roles and technologies I've worked with in various projects and companies."
            />
          </motion.div>

          <ExpandableSectionList className="space-y-6 sm:space-y-8">
            {ExperienceData.map((experience, index) => {
              const hasNext = index < ExperienceData.length - 1;
              return (
                <motion.div key={experience.company} variants={itemVariants} className="relative">
                  {hasNext && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={VIEWPORT}
                      transition={{
                        duration: 0.6,
                        delay: 0.2,
                        ease: APPLE_EASE,
                      }}
                      style={{ originY: 0 }}
                      className="absolute left-5 top-10 -bottom-10 w-px bg-muted-foreground/30 sm:-bottom-12"
                    />
                  )}
                  <ExpandableSectionItem>
                    <ExpandableSectionTrigger className="flex w-full items-start gap-3 text-left">
                      <TimelineLogo src={experience.logo} alt={`${experience.company} logo`} />
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                          <h3 className="typography-item-title flex min-w-0 flex-wrap items-center gap-2">
                            {experience.company}
                            {experience.isCurrent && <CurrentBadge />}
                          </h3>
                          <p className="typography-label shrink-0 tabular-nums">
                            {experience.startDate} – {experience.endDate}
                          </p>
                        </div>
                        <p className="typography-muted">
                          {experience.designation}
                          <span className="text-muted-foreground/60"> · </span>
                          {experience.type}
                        </p>
                      </div>
                    </ExpandableSectionTrigger>

                    <ExpandableSectionContent>
                      {experience.description.length > 0 && (
                        <ul className="typography-muted space-y-2">
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
                </motion.div>
              );
            })}
          </ExpandableSectionList>
        </ExpandableSection>
      </motion.div>
    </ShellWrapper>
  );
};

function CurrentBadge() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <span
      className="relative inline-flex size-2.5 items-center justify-center"
      title="Current role"
    >
      <span className="sr-only">Current</span>
      {!shouldReduceMotion && (
        <motion.span
          className="absolute size-full rounded-full bg-lime-500"
          animate={{ scale: [1, 1.8, 1.8], opacity: [0.7, 0, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
          }}
        />
      )}
      <span className="relative size-2 rounded-full bg-lime-500" aria-hidden />
    </span>
  );
}

export default DeveloperExperience;
