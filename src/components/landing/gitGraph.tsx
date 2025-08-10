'use client';
import { GithubGraph } from '@/components/ui/github';
import { FaGithubAlt } from 'react-icons/fa';
import { BG, SECTION, TYPO, ANIM, GEOMETRY } from '@/constants/ui';

export function GitGraphUI() {
  return (
    <section className={`${SECTION.base} ${BG.gradient}`}>
      {/* Minimal geometric pattern */}
      <div className={GEOMETRY.verticalLines}>
        {GEOMETRY.positions.map((pos) => (
          <div key={pos} className={`${GEOMETRY.vertLine} ${pos}`} />
        ))}
      </div>

      <div className={`${SECTION.container} text-center`}>
        {/* Icon Section */}
        <div className={`flex justify-center mb-8 ${ANIM.in}`}>
          <div className="p-6 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <FaGithubAlt className="text-5xl text-zinc-700 dark:text-zinc-300" />
          </div>
        </div>

        {/* Section Header */}
        <div className={`mb-12 ${ANIM.in} ${ANIM.delay(200)}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
            <span className="text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
              GitHub Activity
            </span>
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
          </div>

          <h2 className={TYPO.sectionTitle}>
            Building &
            <br />
            <span className="font-serif italic">Contributing</span>
          </h2>

          <p className={`${TYPO.paragraph} max-w-xl mx-auto`}>
            Passionate about coding and continuously working on multiple
            projects, contributing to open source, and building innovative
            solutions.
          </p>
        </div>

        {/* GitHub Graph */}
        <div className={`flex justify-center ${ANIM.in} ${ANIM.delay(400)}`}>
          <div className="p-8 overflow-auto">
            <GithubGraph blockMargin={2} />
          </div>
        </div>
      </div>
    </section>
  );
}
