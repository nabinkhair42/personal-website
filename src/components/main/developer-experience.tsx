"use client";

import { DotIcon } from "lucide-react";
import { motion } from "motion/react";
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

          <ExpandableSectionList>
            {ExperienceData.map((experience, index) => {
              const hasNext = index < ExperienceData.length - 1;
              return (
                <motion.div
                  key={experience.company}
                  variants={itemVariants}
                  className="relative"
                >
                  {hasNext && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={VIEWPORT}
                      transition={{ duration: 0.6, delay: 0.2, ease: APPLE_EASE }}
                      style={{ originY: 0 }}
                      className="absolute left-5 top-11 -bottom-4 w-px bg-muted-foreground/30"
                    />
                  )}
                  <ExpandableSectionItem>
                    <ExpandableSectionTrigger>
                      <div className="flex items-start gap-3">
                        <Image
                          src={experience.logo}
                          alt={`${experience.company} logo`}
                          width={40}
                          height={40}
                          className="size-10 shrink-0 rounded-md border bg-muted object-contain p-px"
                        />
                        <div className="space-y-1">
                          <h3 className="flex items-center gap-2 text-lg font-medium md:text-xl">
                            {experience.company}
                            {experience.isCurrent && <CurrentBadge />}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {experience.designation} • {experience.type}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {experience.startDate} - {experience.endDate}
                          </p>
                        </div>
                      </div>
                    </ExpandableSectionTrigger>

                    <ExpandableSectionContent>
                      {experience.description.length > 0 && (
                        <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                          {experience.description.map((line) => (
                            <li key={line} className="flex">
                              <DotIcon />
                              <span>{line}</span>
                            </li>
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
  return (
    <span className="relative inline-flex size-2.5 items-center justify-center">
      <motion.span
        className="absolute size-full rounded-full bg-lime-500"
        animate={{ scale: [1, 1.8, 1.8], opacity: [0.7, 0, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
      />
      <span className="relative size-2 rounded-full bg-lime-500" />
    </span>
  );
}

export default DeveloperExperience;
