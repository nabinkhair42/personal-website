"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
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
import { ExperienceData } from "@/dev-constants/experience";
import { APPLE_EASE, itemVariants, sectionVariants, VIEWPORT } from "../motion";

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
            <ExpandableSectionHeader>
              <ExpandableSectionLabel>My Journey</ExpandableSectionLabel>
              <ExpandableSectionTitle>Professional Experience</ExpandableSectionTitle>
              <ExpandableSectionDescription>
                A timeline of my career path, showcasing the roles and technologies I&apos;ve worked
                with in various projects and companies.
              </ExpandableSectionDescription>
            </ExpandableSectionHeader>
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
                      <Image
                        src={experience.logo}
                        alt={`${experience.company} logo`}
                        width={40}
                        height={40}
                        className="size-10 shrink-0 rounded-md border bg-muted object-contain p-px"
                      />
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
                        <ul className="space-y-2 text-sm text-muted-foreground sm:text-base">
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
