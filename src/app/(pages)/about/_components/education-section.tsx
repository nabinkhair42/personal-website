'use client';

import { education } from '@/constants/education';
import { BG, SECTION, TYPO, ANIM } from '@/constants/ui';

export const EducationSection = () => {
  return (
    <section
      className={`${SECTION.base} border-t border-zinc-200 dark:border-zinc-800 ${BG.gradient}`}
    >
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
            <span className={TYPO.sectionKicker}>Academic Background</span>
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
          </div>
          <h2 className={TYPO.sectionTitle}>
            Education &
            <br />
            <span className="font-serif italic">Learning</span>
          </h2>
        </div>

        {/* Education Timeline */}
        <div className="space-y-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden ${BG.card} ${BG.border} transition-all duration-700 hover:border-zinc-300 dark:hover:border-zinc-700 ${ANIM.in} ${ANIM.slideUp}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Minimal geometric pattern */}
              <div className="absolute inset-0 opacity-5 dark:opacity-10">
                <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
                <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
              </div>

              <div className="relative p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-light text-zinc-900 dark:text-zinc-100 tracking-tight group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors duration-300">
                      {edu.degree}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 font-light mt-1">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono uppercase tracking-wide">
                        {edu.period}
                      </span>
                    </div>
                  </div>
                </div>

                {edu.description && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                    {edu.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
