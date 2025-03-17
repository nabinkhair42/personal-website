import { ContactCTA } from "@/components/landing/contact-cta";
import { FeaturedProjects } from "@/components/landing/featured-projects";
import { GitGraphUI } from "@/components/landing/gitGraph";
import { Hero } from "@/components/landing/hero";
import LatestBlogs from "@/components/landing/latest-blogs";
import { SkillsOverview } from "@/components/landing/skills-overview";

export default function Home() {
  return (
    <main className="max-w-5xl flex flex-col justify-center mx-auto border-l border-r border-dashed">
      <Hero />
      <FeaturedProjects />
      <SkillsOverview />
      <GitGraphUI />
      <LatestBlogs />
      <ContactCTA />
    </main>
  );
}
