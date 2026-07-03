"use client";

import { GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { DeveloperDetails } from "@/dev-constants/details";
import { APPLE_EASE, itemVariants, sectionVariants, VIEWPORT } from "../motion";

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
        <motion.header variants={itemVariants} className="space-y-2">
          <p className="text-sm text-muted-foreground">Education</p>
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">Academic Background</h2>
          <p className="text-muted-foreground">
            My educational journey that shaped my foundation in technology and problem-solving.
          </p>
        </motion.header>

        <div className="flex flex-col gap-8">
          {educationData.map((education, index) => {
            const hasNext = index < educationData.length - 1;
            return (
              <motion.div
                key={education.institution}
                variants={itemVariants}
                className="relative flex items-start justify-between gap-3"
              >
                {hasNext && (
                  <motion.span
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.6, delay: 0.2, ease: APPLE_EASE }}
                    style={{ originY: 0 }}
                    className="absolute left-5 top-10 -bottom-12 w-px bg-muted-foreground/30"
                  />
                )}
                <div className="flex items-start gap-3">
                  {education.logo ? (
                    <Image
                      src={education.logo}
                      alt={`${education.institution} logo`}
                      width={40}
                      height={40}
                      className="size-10 shrink-0 rounded-md border bg-muted object-contain p-px"
                    />
                  ) : (
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-md border bg-muted">
                      <GraduationCap className="size-5 text-muted-foreground" />
                    </div>
                  )}
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium md:text-xl">{education.institution}</h3>
                    <div className="flex items-center text-muted-foreground">
                      {education.degree} - {education.location}
                    </div>
                  </div>
                </div>
                <p className="shrink-0 whitespace-nowrap text-muted-foreground">
                  {education.startDate} – {education.endDate}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </ShellWrapper>
  );
};

export default DeveloperEducation;
