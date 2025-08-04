'use client';
import { GithubGraph } from '@/components/ui/github';
import { FaGithubAlt } from 'react-icons/fa';

export function GitGraphUI() {
  return (
    <section className="relative px-6 py-20 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      {/* Minimal geometric pattern */}
      <div className="absolute inset-0 opacity-3 dark:opacity-5">
        <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
        <div className="absolute top-0 left-40 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-40 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Icon Section */}
        <div className="flex justify-center mb-8 animate-in fade-in duration-700">
          <div className="p-6 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <FaGithubAlt className="text-5xl text-zinc-700 dark:text-zinc-300" />
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-12 animate-in fade-in duration-700 delay-200">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
            <span className="text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
              GitHub Activity
            </span>
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-light text-zinc-900 dark:text-zinc-100 mb-6 tracking-tight">
            Building &
            <br />
            <span className="font-serif italic">Contributing</span>
          </h2>

          <p className="text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
            Passionate about coding and continuously working on multiple
            projects, contributing to open source, and building innovative
            solutions.
          </p>
        </div>

        {/* GitHub Graph */}
        <div className="flex justify-center animate-in fade-in duration-700 delay-400">
          <div className="p-8 overflow-auto">
            <GithubGraph blockMargin={2} />
          </div>
        </div>

        {/* Stats or additional info could go here */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-in fade-in duration-700 delay-600">
          <div className="p-6 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <div className="text-2xl font-light text-zinc-900 dark:text-zinc-100 mb-2">
              500+
            </div>
            <div className="text-sm font-mono uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Commits
            </div>
          </div>
          <div className="p-6 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <div className="text-2xl font-light text-zinc-900 dark:text-zinc-100 mb-2">
              20+
            </div>
            <div className="text-sm font-mono uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Projects
            </div>
          </div>
          <div className="p-6 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <div className="text-2xl font-light text-zinc-900 dark:text-zinc-100 mb-2">
              2+
            </div>
            <div className="text-sm font-mono uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Years
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
