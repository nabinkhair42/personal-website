"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Grid3X3, Palette } from "lucide-react";

export function BrutalistMinimalismDemo() {
  return (
    <div className="relative w-full max-w-4xl mx-auto bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      {/* Architectural Grid Background */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02] pointer-events-none">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i} 
              className="border-r border-zinc-300 dark:border-zinc-700 last:border-r-0"
            />
          ))}
        </div>
      </div>

      {/* Inner Geometric Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-8 space-y-8">
        {/* Header Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
            <span className="text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
              Design Architecture
            </span>
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light text-zinc-900 dark:text-zinc-100 tracking-tight">
            Brutalist
            <br />
            <span className="font-serif italic">Minimalism</span>
          </h1>
          
          <div className="w-20 h-px bg-zinc-900 dark:bg-zinc-100"></div>
          
          <p className="text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-2xl">
            A sophisticated fusion of structural honesty and refined simplicity, 
            creating digital experiences through architectural principles.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Grid3X3,
              title: "Visible Grids",
              description: "Structural elements become part of the aesthetic experience"
            },
            {
              icon: Palette,
              title: "Zinc Palette",
              description: "Monochromatic color system for visual harmony"
            },
            {
              icon: Code,
              title: "Geometric Forms",
              description: "Mathematical precision in layout and spacing"
            }
          ].map((feature, index) => (
            <div 
              key={feature.title}
              className="relative group p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
            >
              {/* Mini geometric pattern */}
              <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
                <div className="absolute top-0 left-0 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
                <div className="absolute top-0 right-0 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
              </div>

              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                    <feature.icon className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <div className="text-xs font-mono text-zinc-400 dark:text-zinc-600">
                    0{index + 1}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100 font-mono uppercase tracking-wide text-sm mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Code Example Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-px bg-zinc-300 dark:bg-zinc-700"></div>
            <span className="text-xs tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
              Implementation
            </span>
          </div>
          
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                brutalist-grid.tsx
              </span>
            </div>
            <pre className="text-xs font-mono text-zinc-700 dark:text-zinc-300 overflow-x-auto">
{`<div className="grid grid-cols-12 h-full">
  {Array.from({ length: 12 }).map((_, i) => (
    <div 
      key={i} 
      className="border-r border-zinc-300 
                 dark:border-zinc-700"
    />
  ))}
</div>`}
            </pre>
          </div>
        </div>

        {/* Action Section */}
        <div className="flex items-center justify-between pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="space-y-1">
            <div className="text-sm font-mono uppercase tracking-wide text-zinc-700 dark:text-zinc-300">
              Architecture Meets Web
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Structural beauty in digital interfaces
            </div>
          </div>
          
          <Button 
            variant="outline"
            className="group px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-mono text-xs uppercase tracking-wider transition-all duration-300"
            onClick={() => window.open("/blog/brutalist-minimalism-architectural-web-design", "_blank")}
          >
            <span className="flex items-center gap-2">
              Read Article
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        </div>
      </div>

      {/* Corner Decorative Elements */}
      <div className="absolute top-4 left-4 opacity-20 dark:opacity-30">
        <div className="w-3 h-3 border border-zinc-400 dark:border-zinc-600 rotate-45"></div>
      </div>
      <div className="absolute top-4 right-4 opacity-20 dark:opacity-30">
        <div className="w-4 h-4 border border-zinc-400 dark:border-zinc-600"></div>
      </div>
      <div className="absolute bottom-4 left-4 opacity-20 dark:opacity-30">
        <div className="w-4 h-4 border border-zinc-400 dark:border-zinc-600"></div>
      </div>
      <div className="absolute bottom-4 right-4 opacity-20 dark:opacity-30">
        <div className="w-3 h-3 border border-zinc-400 dark:border-zinc-600 rotate-45"></div>
      </div>
    </div>
  );
}