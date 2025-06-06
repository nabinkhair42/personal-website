"use client";

import { platforms } from "@/constants/platforms";

export const PlatformsSection = () => {
  return (
    <section className="relative px-6 py-20 border-t  border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
      {/* Minimal geometric pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
        <div className="absolute top-0 left-20 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-20 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
            <span className="text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
              Online Presence
            </span>
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-zinc-900 dark:text-zinc-100 mb-6 tracking-tight">
            Find Me
            <br />
            <span className="font-serif italic">Online</span>
          </h2>
        </div>

        {/* Platforms Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {platforms.map((platform, index) => (
            <div
              key={platform.name}
              className="animate-in fade-in duration-700 slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 transition-all duration-700 hover:border-zinc-300 dark:hover:border-zinc-700"
              >
                {/* Minimal geometric pattern */}
                <div className="absolute inset-0 opacity-5 dark:opacity-10">
                  <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
                  <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
                </div>

                <div className="relative p-6">
                  {/* Platform Icon */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 group-hover:border-zinc-300 dark:group-hover:border-zinc-600 transition-colors duration-300">
                      <platform.icon className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
                    </div>
                    <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700 group-hover:w-12 transition-all duration-300"></div>
                  </div>

                  {/* Platform Name */}
                  <h3 className="text-xl font-light text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors duration-300">
                    {platform.name}
                  </h3>

                  {/* Platform Description */}
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-4">
                    {platform.description}
                  </p>

                  {/* Visit Link */}
                  <div className="inline-flex items-center gap-2 text-zinc-700 dark:text-zinc-300 group-hover:gap-3 transition-all duration-300">
                    <span className="text-xs tracking-wide font-mono uppercase">
                      Visit Profile
                    </span>
                    <div className="w-4 h-px bg-zinc-700 dark:bg-zinc-300 group-hover:w-6 transition-all duration-300"></div>
                    <svg 
                      className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};