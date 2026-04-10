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

const DeveloperExperience = () => {
  return (
    <ShellWrapper>
      <ExpandableSection>
        <ExpandableSectionHeader>
          <ExpandableSectionLabel>My Journey</ExpandableSectionLabel>
          <ExpandableSectionTitle>Professional Experience</ExpandableSectionTitle>
          <ExpandableSectionDescription>
            A timeline of my career path, showcasing the roles and technologies I&apos;ve worked
            with in various projects and companies.
          </ExpandableSectionDescription>
        </ExpandableSectionHeader>

        <ExpandableSectionList>
          {ExperienceData.map((experience, index) => (
            <ExpandableSectionItem key={experience.company} className="relative">
              {/* Connecting line - spans full item height */}
              {index < ExperienceData.length - 1 && (
                <div className="absolute left-5 top-11 -bottom-4 w-px bg-muted-foreground/30" />
              )}
              <ExpandableSectionTrigger>
                <div className="flex space-x-2">
                  <div className="h-11 aspect-square flex items-center justify-center rounded-lg border p-px">
                    <Image
                      src={experience.logo}
                      alt={`${experience.company} company logo`}
                      width={1000}
                      height={1000}
                      className="h-10 aspect-square object-contain border rounded-md bg-muted p-px"
                      title={experience.company}
                    />
                  </div>
                  <div className="space-y-1 pl-3">
                    <div className="flex space-x-1 items-center">
                      <h3 className="text-lg font-medium text-foreground md:text-xl">
                        {experience.company}
                      </h3>
                      {experience.isCurrent && (
                        <div className="relative flex h-3 w-3 items-center justify-center mt-1 ml-1">
                          <motion.span
                            className="absolute h-full w-full rounded-full bg-lime-500"
                            animate={{
                              scale: [1, 1.8, 1.8],
                              opacity: [0.7, 0, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeOut",
                            }}
                          />
                          <span className="relative h-2 w-2 rounded-full bg-lime-500" />
                        </div>
                      )}
                    </div>
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
          ))}
        </ExpandableSectionList>
      </ExpandableSection>
    </ShellWrapper>
  );
};

export default DeveloperExperience;
