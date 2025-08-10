'use client';
import React from 'react';
import { BG, SECTION, TYPO, ANIM } from '@/constants/ui';

const ProjectHero = () => {
  return (
    <section
      className={`${SECTION.base} border-b  border-zinc-200 dark:border-zinc-800 overflow-hidden ${BG.gradient}`}
    >
      {/* Minimal geometric pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
        <div className="absolute top-0 left-20 w-px h-full bg-current"></div>
        <div className="absolute top-0 left-40 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-40 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-20 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
      </div>

      {/* Subtle horizontal lines */}
      <div className="absolute inset-0 opacity-3 dark:opacity-5">
        <div className="absolute top-16 left-0 w-full h-px bg-current"></div>
        <div className="absolute bottom-16 left-0 w-full h-px bg-current"></div>
      </div>

      <div
        className={`relative z-10 max-w-4xl mx-auto text-center ${ANIM.in} duration-1000 slide-in-from-bottom-4`}
      >
        {/* Section Label */}
        <div
          className={`flex items-center justify-center gap-4 mb-8 ${ANIM.in} ${ANIM.delay(200)}`}
        >
          <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
          <span className={TYPO.sectionKicker}>Work Portfolio</span>
          <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
        </div>

        {/* Main Heading */}
        <h1
          className={`text-5xl md:text-6xl lg:text-7xl font-light text-zinc-900 dark:text-zinc-100 mb-8 tracking-tight leading-tight ${ANIM.in} ${ANIM.delay(300)}`}
        >
          My
          <br />
          <span className="font-serif italic">Projects</span>
        </h1>

        {/* Description */}
        <p
          className={`text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto mb-12 ${ANIM.in} ${ANIM.delay(500)}`}
        >
          A curated collection of digital experiences, ranging from web
          applications to browser extensions. Each project represents a unique
          challenge solved through thoughtful design and engineering.
        </p>

        {/* Stats */}
        <div className="flex items-center flex-wrap justify-center gap-12 text-center animate-in fade-in duration-700 delay-700">
          <div className="space-y-1">
            <div className="text-2xl font-light text-zinc-900 dark:text-zinc-100 font-mono">
              15+
            </div>
            <div className="text-sm tracking-wide uppercase text-zinc-500 dark:text-zinc-400 font-mono">
              Projects
            </div>
          </div>
          <div className="w-px h-8 bg-zinc-300 dark:bg-zinc-700"></div>
          <div className="space-y-1">
            <div className="text-2xl font-light text-zinc-900 dark:text-zinc-100 font-mono">
              3+
            </div>
            <div className="text-sm tracking-wide uppercase text-zinc-500 dark:text-zinc-400 font-mono">
              Years
            </div>
          </div>
          <div className="w-px h-8 bg-zinc-300 dark:bg-zinc-700"></div>
          <div className="space-y-1">
            <div className="text-2xl font-light text-zinc-900 dark:text-zinc-100 font-mono">
              ∞
            </div>
            <div className="text-sm tracking-wide uppercase text-zinc-500 dark:text-zinc-400 font-mono">
              Learning
            </div>
          </div>
        </div>
      </div>

      {/* Minimalist visual elements */}
      <div className="absolute bottom-8 left-8 opacity-20 dark:opacity-30">
        <div className="w-4 h-4 border border-zinc-400 dark:border-zinc-600 rotate-45"></div>
      </div>
      <div className="absolute top-8 right-8 opacity-20 dark:opacity-30">
        <div className="w-6 h-6 border border-zinc-400 dark:border-zinc-600"></div>
      </div>
    </section>
  );
};

export default ProjectHero;
