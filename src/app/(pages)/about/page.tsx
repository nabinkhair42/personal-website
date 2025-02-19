import { aboutMetadata } from "@/config/metadata";
import { AboutHero } from "./_components/about-hero";
import { AchievementsSection } from "./_components/achievements-section";
import { EducationSection } from "./_components/education-section";
import { PlatformsSection } from "./_components/platforms-section";
import { SkillsSection } from "./_components/skills-section";
import { siteConfig } from "@/config/site";

export const metadata = aboutMetadata;

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.title,
  description: "Full Stack Developer specializing in modern web technologies",
  url: siteConfig.baseUrl,
  sameAs: [
    siteConfig.social.github,
    siteConfig.social.linkedin,
    siteConfig.social.twitter
  ],
  image: `${siteConfig.baseUrl}/og/about.png`,
  email: `mailto:${siteConfig.social.email}`,
  alumniOf: {
    "@type": "EducationalOrganization",
    name: siteConfig.education.university
  }
};

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