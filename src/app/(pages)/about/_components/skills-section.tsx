'use client';

import { myTechnologies } from '@/constants/technologies';
import { BG, SECTION, TYPO, ANIM } from '@/constants/ui';

export const SkillsSection = () => {
  return (
    <section className={`${SECTION.base} ${BG.surface}`}>
      {/* Minimal geometric pattern */}
      <div className="absolute inset-0 opacity-3 dark:opacity-5">
        <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
        <div className="absolute top-0 left-40 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-40 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
            <span className={TYPO.sectionKicker}>Technical Skills</span>
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
          </div>
          <h2 className={TYPO.sectionTitle}>
            Technologies I
            <br />
            <span className="font-serif italic">Work With</span>
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="space-y-12">
          {myTechnologies.map(
            (
              category: (typeof myTechnologies)[number],
              categoryIndex: number
            ) => (
              <div
                key={category.category}
                className="animate-in fade-in duration-700 slide-in-from-bottom-4"
                style={{ animationDelay: `${categoryIndex * 200}ms` }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-xl font-light text-zinc-900 dark:text-zinc-100 tracking-tight">
                    {category.category}
                  </h3>
                  <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800"></div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono uppercase tracking-wide">
                    {category.technologies.length} Skills
                  </span>
                </div>

                {/* Technologies Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {category.technologies.map(
                    (
                      tech: (typeof category.technologies)[number],
                      techIndex: number
                    ) => (
                      <div
                        key={tech.name}
                        className={`group relative overflow-hidden ${BG.card} ${BG.border} transition-all duration-700 hover:border-zinc-300 dark:hover:border-zinc-700 ${ANIM.in}`}
                        style={{
                          animationDelay: `${categoryIndex * 200 + techIndex * 50}ms`,
                        }}
                      >
                        {/* Minimal geometric pattern */}
                        <div className="absolute inset-0 opacity-5 dark:opacity-10">
                          <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
                          <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
                        </div>

                        <div className="relative p-4 text-center">
                          {/* Tech Icon */}
                          <div className="flex items-center justify-center mb-3">
                            <tech.icon
                              className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
                              style={{ color: tech.color }}
                            />
                          </div>

                          {/* Tech Name */}
                          <h4 className="text-xs text-zinc-700 dark:text-zinc-300 font-light group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors duration-300">
                            {tech.name}
                          </h4>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};
