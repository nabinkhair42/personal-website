import BackgroundCollection from '@/components/landing/background-collection';
import { FeaturedProjects } from '@/components/landing/featured-projects';
import { GitGraphUI } from '@/components/landing/gitGraph';
import { Hero } from '@/components/landing/hero';
import LatestBlogs from '@/components/landing/latest-blogs';
import { SkillsOverview } from '@/components/landing/skills-overview';
import { HireMeNowSection } from '@/components/landing/hire-me-now';

export default function Home() {
  return (
    <main className="relative flex flex-col">
      {/* Enhanced architectural grid system */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02] pointer-events-none">
        <div className="max-w-7xl mx-auto h-full">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="border-r border-zinc-300 dark:border-zinc-700 last:border-r-0"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Remove the constraining wrapper - let components handle their own containers */}
      <div className="relative w-full">
        {/* Landing sections with full-width potential */}
        <div className="relative z-10">
          <Hero />

          <FeaturedProjects />
          <SkillsOverview />
          <HireMeNowSection />
          <BackgroundCollection />

          <LatestBlogs />
          <GitGraphUI />
        </div>
      </div>

      {/* Architectural corner elements */}
      <div className="fixed top-4 left-4 opacity-10 dark:opacity-20 pointer-events-none z-0">
        <div className="w-4 h-4 border border-zinc-400 dark:border-zinc-600 rotate-45"></div>
      </div>
      <div className="fixed top-4 right-4 opacity-10 dark:opacity-20 pointer-events-none z-0">
        <div className="w-6 h-6 border border-zinc-400 dark:border-zinc-600"></div>
      </div>
      <div className="fixed bottom-4 left-4 opacity-10 dark:opacity-20 pointer-events-none z-0">
        <div className="w-6 h-6 border border-zinc-400 dark:border-zinc-600"></div>
      </div>
      <div className="fixed bottom-4 right-4 opacity-10 dark:opacity-20 pointer-events-none z-0">
        <div className="w-4 h-4 border border-zinc-400 dark:border-zinc-600 rotate-45"></div>
      </div>

      {/* Subtle background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-zinc-50/20 to-transparent dark:via-zinc-900/20 pointer-events-none z-0"></div>
    </main>
  );
}
