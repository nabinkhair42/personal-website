import React from 'react';
import { Palette, Download } from 'lucide-react';
import { BG, TYPO } from '@/constants/ui';

const BackgroundPreview = () => (
  <div className="relative w-32 h-32 overflow-hidden">
    {/* Multiple gradient layers for visual effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 via-cyan-300 to-zinc-900 group-hover:rotate-12 transition-transform duration-700 ease-out opacity-80"></div>
    <div className="absolute inset-2 bg-gradient-to-tr from-orange-200 via-amber-300 to-zinc-800 group-hover:-rotate-6 transition-transform duration-500 ease-out opacity-70"></div>
    <div className="absolute inset-4 bg-gradient-to-bl from-purple-300 via-pink-400 to-zinc-700 group-hover:rotate-45 transition-transform duration-700 ease-out opacity-60"></div>

    {/* Grid overlay pattern */}
    <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.15] pointer-events-none">
      <div className="absolute top-0 left-1/3 w-px h-full bg-white"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-white"></div>
      <div className="absolute top-1/3 left-0 w-full h-px bg-white"></div>
      <div className="absolute bottom-1/3 left-0 w-full h-px bg-white"></div>
    </div>
  </div>
);

const BackgroundCollection: React.FC = () => {
  return (
    <div className="w-full">
      <a href="/background-images" className="group block">
        <div
          className={`relative overflow-hidden ${BG.gradient} transition-all duration-700`}
        >
          {/* Architectural geometric pattern - matching figma-work */}
          <div className="absolute inset-0 opacity-[0.008] dark:opacity-[0.012] pointer-events-none">
            <div className="absolute top-0 left-0 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
            <div className="absolute top-0 left-20 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
            <div className="absolute top-0 left-40 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
            <div className="absolute top-0 right-40 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
            <div className="absolute top-0 right-20 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
            <div className="absolute top-0 right-0 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>

            {/* Horizontal structural lines */}
            <div className="absolute top-1/4 left-0 w-full h-px bg-zinc-400 dark:bg-zinc-600 opacity-50"></div>
            <div className="absolute bottom-1/4 left-0 w-full h-px bg-zinc-400 dark:bg-zinc-600 opacity-50"></div>
          </div>

          <div className="relative p-12 md:p-16">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Header section */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950">
                    <Palette className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
                  <span className={TYPO.sectionKicker}>Digital Collection</span>
                </div>

                {/* Main content */}
                <h2 className="text-4xl md:text-5xl font-light text-zinc-900 dark:text-zinc-100 mb-6 tracking-tight">
                  Background
                  <br />
                  <span className="font-serif italic">Gradients</span>
                </h2>

                <p className="text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-2xl mb-8">
                  Minimal gradient wallpapers crafted with architectural
                  precision. Seven unique 2K backgrounds following
                  brutalist-minimalism principles.
                </p>

                {/* Stats section */}
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-light text-zinc-900 dark:text-zinc-100 font-mono">
                      7
                    </div>
                    <div className="text-xs tracking-wide uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                      Wallpapers
                    </div>
                  </div>
                  <div className="w-px h-8 bg-zinc-300 dark:bg-zinc-700"></div>
                  <div className="text-center">
                    <div className="text-2xl font-light text-zinc-900 dark:text-zinc-100 font-mono">
                      2K
                    </div>
                    <div className="text-xs tracking-wide uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                      Resolution
                    </div>
                  </div>
                  <div className="w-px h-8 bg-zinc-300 dark:bg-zinc-700"></div>
                  <div className="text-center">
                    <div className="text-2xl font-light text-zinc-900 dark:text-zinc-100 font-mono">
                      Free
                    </div>
                    <div className="text-xs tracking-wide uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                      Download
                    </div>
                  </div>
                </div>

                {/* CTA section */}
                <div className="inline-flex items-center gap-3 text-zinc-900 dark:text-zinc-100 group-hover:gap-5 transition-all duration-300">
                  <Download className="h-4 w-4" />
                  <span className="text-sm tracking-wide font-mono uppercase">
                    Browse Collection
                  </span>
                  <div className="w-12 h-px bg-zinc-900 dark:bg-zinc-100 group-hover:w-16 transition-all duration-300"></div>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>

              {/* Visual preview element */}
              <div className="hidden md:block ml-12">
                <BackgroundPreview />
              </div>
            </div>
          </div>

          {/* Hover enhancement overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.01] dark:group-hover:opacity-[0.015] pointer-events-none transition-opacity duration-700">
            <div className="absolute top-0 left-1/3 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
            <div className="absolute top-0 right-1/3 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
            <div className="absolute top-1/3 left-0 w-full h-px bg-zinc-400 dark:bg-zinc-600"></div>
            <div className="absolute bottom-1/3 left-0 w-full h-px bg-zinc-400 dark:bg-zinc-600"></div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default BackgroundCollection;
