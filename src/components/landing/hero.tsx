'use client';

import { Button } from '@/components/ui/button';
import { ANIM, BG } from '@/constants/ui';
import { PenTool, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PiReadCvLogoFill } from 'react-icons/pi';

export function Hero() {
  return (
    <section
      className={`relative min-h-[100vh] flex items-center overflow-hidden ${BG.gradient}`}
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
        <div className="absolute top-1/4 left-0 w-full h-px bg-current"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-current"></div>
      </div>

      <div className="container relative z-10 px-4 md:px-6 max-w-5xl mx-auto py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div
            className={`flex flex-col gap-8 ${ANIM.inSlow} slide-in-from-bottom-4`}
          >
            {/* Status indicator */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 w-fit animate-in fade-in duration-700 delay-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-mono tracking-wider uppercase text-zinc-700 dark:text-zinc-300">
                Open to Work & Collaborations
              </span>
            </div>

            {/* Main heading */}
            <div className={`space-y-6 ${ANIM.in} delay-300`}>
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
                  Nabin
                  <br />
                  <span className="font-serif italic">Khair</span>
                </h1>
                <div className="w-20 h-px bg-zinc-900 dark:bg-zinc-100 mt-6"></div>
              </div>
            </div>

            {/* Professional introduction */}
            <p
              className={`text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-xl ${ANIM.in} delay-400`}
            >
              I build fast, accessible web apps with Next.js and TypeScript and
              I&apos;m growing my backend skills to ship features from UI to
              API.
            </p>

            {/* Experience cards */}
            <div className={`flex flex-col gap-4 ${ANIM.in} delay-500`}>
              <div className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <PenTool className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                </div>
                <div className="flex-1">
                  <div className="text-xs tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                    Focus
                  </div>
                  <div className="font-light text-zinc-900 dark:text-zinc-100">
                    Frontend development & modern web apps
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <Star className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                </div>
                <div className="flex-1">
                  <div className="text-xs tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                    Learning
                  </div>
                  <div className="font-light text-zinc-900 dark:text-zinc-100">
                    Backend technologies & cloud platforms
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 ${ANIM.in} delay-600`}
            >
              <Link
                href="/nabin_khair.pdf"
                target="_blank"
                download
                className="cursor-pointer"
              >
                <Button
                  variant="outline"
                  className="group px-6 w-full py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-mono text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer"
                >
                  <PiReadCvLogoFill className="h-4 w-4 mr-2" />
                  My Resume
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Image */}
          <div
            className={`relative hidden lg:flex items-center justify-center ${ANIM.inSlow} delay-400 slide-in-from-bottom-4`}
          >
            <div className="relative">
              {/* Geometric background elements */}
              <div className="absolute -inset-8 opacity-20 dark:opacity-30">
                <div className="absolute top-0 left-0 w-4 h-4 border border-zinc-400 dark:border-zinc-600 rotate-45"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border border-zinc-400 dark:border-zinc-600"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border border-zinc-400 dark:border-zinc-600"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border border-zinc-400 dark:border-zinc-600 rotate-45"></div>
              </div>

              {/* Main image */}
              <div className="relative overflow-hidden border border-zinc-200 dark:border-zinc-800">
                <Image
                  src="/nabin.png"
                  alt="Nabin Khair"
                  width={380}
                  height={380}
                  quality={100}
                  className="object-cover transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer transition-opacity duration-300 ${scrolled ? 'opacity-0' : 'opacity-100'}`}
        onClick={clickToScroll}
      >
        <div className="flex flex-col items-center gap-2 text-zinc-600 dark:text-zinc-400 animate-bounce">
          <span className="text-sm font-mono uppercase tracking-wide">View My Work</span>
          <ChevronDown className="h-5 w-5" />
        </div>
      </div> */}
    </section>
  );
}
