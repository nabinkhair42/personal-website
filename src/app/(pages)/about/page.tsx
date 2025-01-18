"use client";

import { AboutHero } from "./_components/about-hero";
import { AchievementsSection } from "./_components/achievements-section";
import { EducationSection } from "./_components/education-section";
import { PlatformsSection } from "./_components/platforms-section";
import { SkillsSection } from "./_components/skills-section";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="container relative py-12 md:py-24">
      {/* Background Elements */}
      <motion.div
        className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      {/* Content */}
      <div className="relative">
        <AboutHero />

        <div className="mt-24 space-y-24">
          <SkillsSection />
          
          <div className="h-px w-full bg-gradient-to-r from-border/0 via-border to-border/0" />
          
          <PlatformsSection />
          
          <div className="h-px w-full bg-gradient-to-r from-border/0 via-border to-border/0" />
          
          <EducationSection />
          
          <div className="h-px w-full bg-gradient-to-r from-border/0 via-border to-border/0" />
          
          <AchievementsSection />
        </div>
      </div>
    </div>
  );
}