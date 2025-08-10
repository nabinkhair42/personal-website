'use client';

import Link from 'next/link';
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiNodedotjs,
} from 'react-icons/si';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { BG, SECTION, TYPO, ANIM, GEOMETRY } from '@/constants/ui';

const skills = [
  {
    name: 'React',
    icon: SiReact,
    color: '#61DAFB',
  },
  {
    name: 'Next.js',
    icon: SiNextdotjs,
    color: '#000000',
  },
  {
    name: 'TypeScript',
    icon: SiTypescript,
    color: '#3178C6',
  },
  {
    name: 'MongoDB',
    icon: SiMongodb,
    color: '#47A248',
  },
  {
    name: 'Express',
    icon: SiExpress,
    color: '#000000',
  },
  {
    name: 'Node.js',
    icon: SiNodedotjs,
    color: '#3C873A',
  },
];

export function SkillsOverview() {
  return (
    <section className={`${SECTION.base} ${BG.surface}`}>
      {/* Minimal geometric pattern */}
      <div className={GEOMETRY.verticalLines}>
        {GEOMETRY.positions.map((pos) => (
          <div key={pos} className={`${GEOMETRY.vertLine} ${pos}`} />
        ))}
      </div>

      <div className={SECTION.container}>
        {/* Section Header */}
        <div className="flex items-start justify-between mb-16 flex-wrap gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
              <span className={TYPO.sectionKicker}>Skills & Technologies</span>
            </div>
            <h2 className={TYPO.sectionTitle}>
              My
              <br />
              <span className="font-serif italic">Expertise</span>
            </h2>
            <p className={TYPO.paragraph}>
              Technologies I work with daily to build scalable and efficient web
              applications.
            </p>
          </div>

          <div className={`${ANIM.in} ${ANIM.delay(300)}`}>
            <Link href="/about">
              <Button
                variant="outline"
                className="group px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-mono text-sm uppercase tracking-wider transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  View All Skills
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`group relative flex flex-col items-center gap-4 p-6 ${BG.card} ${BG.border} hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-700 ${ANIM.in} ${ANIM.slideUp}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Minimal geometric pattern */}
              <div className="absolute inset-0 opacity-5 dark:opacity-10">
                <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
                <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
              </div>

              <div className="relative flex h-16 w-16 items-center justify-center bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 group-hover:border-zinc-300 dark:group-hover:border-zinc-600 transition-all duration-300">
                <skill.icon
                  className="h-8 w-8 transition-all duration-300 group-hover:scale-110"
                  style={{ color: skill.color }}
                />
              </div>

              <div className="relative text-center">
                <span className="text-sm font-mono text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                  {skill.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
