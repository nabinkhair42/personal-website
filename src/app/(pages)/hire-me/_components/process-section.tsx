'use client';

import { process } from '@/constants/hire';
import { Search, Lightbulb, Code2, Rocket } from 'lucide-react';

const processIcons = [Search, Lightbulb, Code2, Rocket];

export const ProcessSection = () => {
  return (
    <section className="relative px-6 py-20 border-b  border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
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
            <span className="text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
              How I Work
            </span>
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-zinc-900 dark:text-zinc-100 mb-6 tracking-tight">
            My Process
            <br />
            <span className="font-serif italic">From Idea to Launch</span>
          </h2>
        </div>

        {/* Process Steps */}
        <div className="space-y-12">
          {process.map((step, index) => {
            const Icon = processIcons[index];
            const isEven = index % 2 === 0;

            return (
              <div
                key={step.title}
                className={`group flex items-center gap-8 animate-in fade-in duration-700 slide-in-from-bottom-4 ${
                  isEven ? 'flex-row' : 'flex-row-reverse'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Step Number & Icon */}
                <div className="relative">
                  <div className="flex items-center justify-center w-20 h-20 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 group-hover:border-zinc-300 dark:group-hover:border-zinc-600 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-xs font-mono flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`flex-1 ${isEven ? 'text-left' : 'text-right'}`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    {!isEven && (
                      <div className="flex-1 h-px bg-zinc-300 dark:bg-zinc-700"></div>
                    )}
                    <span className="text-xs tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                      Step {index + 1}
                    </span>
                    {isEven && (
                      <div className="flex-1 h-px bg-zinc-300 dark:bg-zinc-700"></div>
                    )}
                  </div>
                  <h3 className="text-2xl font-light text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
