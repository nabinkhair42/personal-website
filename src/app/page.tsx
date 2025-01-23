import { ContactCTA } from "@/components/landing/contact-cta";
import { FeaturedProjects } from "@/components/landing/featured-projects";
import { Hero } from "@/components/landing/hero";
import LatestBlogs from "@/components/landing/latest-blogs";
import { SkillsOverview } from "@/components/landing/skills-overview";

export default function Home() {
  return (
    <main className="max-w-5xl flex flex-col justify-center mx-auto">
      <Hero />
      <FeaturedProjects />
      <SkillsOverview />
      <LatestBlogs />
      <ContactCTA />
    </main>
  );
}
