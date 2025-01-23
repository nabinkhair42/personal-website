import { AboutHero } from "./_components/about-hero";
import { AchievementsSection } from "./_components/achievements-section";
import { EducationSection } from "./_components/education-section";
import { PlatformsSection } from "./_components/platforms-section";
import { SkillsSection } from "./_components/skills-section";

export default function AboutPage() {
  return (
    <main className="max-w-5xl flex flex-col justify-center mx-auto border-l border-r gap-10">
      <AboutHero />
      <SkillsSection />
      <PlatformsSection />
      <EducationSection />
      <AchievementsSection />
    </main>
  );
}