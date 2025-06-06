import { aboutMetadata } from "@/config/metadata";
import { AboutHero } from "./_components/about-hero";
import { AchievementsSection } from "./_components/achievements-section";
import { EducationSection } from "./_components/education-section";
import { PlatformsSection } from "./_components/platforms-section";
import { SkillsSection } from "./_components/skills-section";
import { siteConfig } from "@/config/site";

// Combine metadata with JSON-LD
export const metadata = {
  ...aboutMetadata,
  other: {
    jsonLd: {
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
    }
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <div className="relative">
        {/* Main Container with Architectural Grid */}
        <main className="max-w-5xl mx-auto border-l border-r border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <AboutHero />
          <SkillsSection />
          <PlatformsSection />
          <EducationSection />
          <AchievementsSection />
        </main>

        {/* Subtle Side Elements */}
        <div className="absolute top-0 left-0 w-px h-full bg-zinc-200 dark:bg-zinc-800 opacity-50"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-zinc-200 dark:bg-zinc-800 opacity-50"></div>
      </div>
    </div>
  );
}