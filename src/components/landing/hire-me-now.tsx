'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Mail } from 'lucide-react';
import { ContactForm } from '../../app/(pages)/contact/_components/contact-form';
import { Button } from '../ui/button';

interface HireMeNowProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: 'sm' | 'default' | 'lg';
}

export const HireMeNow = ({
  isOpen,
  onOpenChange,
  size = 'default',
}: HireMeNowProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="font-mono text-sm uppercase tracking-wider"
          size={size}
        >
          <Mail className="mr-2 h-4 w-4" />
          Hire Me Now
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <ContactForm />
      </DialogContent>
    </Dialog>
  );
};

interface HireMeNowSectionProps {
  isHireMeOpen?: boolean;
  onHireMeOpenChange?: (open: boolean) => void;
}

export const HireMeNowSection = ({
  isHireMeOpen,
  onHireMeOpenChange,
}: HireMeNowSectionProps) => {
  return (
    <section className="relative px-6 py-24 border-b border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-50 dark:bg-zinc-900">
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

      <div className="relative z-10 max-w-4xl mx-auto text-center animate-in fade-in duration-1000 slide-in-from-bottom-4">
        {/* Section Label */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-in fade-in duration-700 delay-200">
          <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
          <span className="text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
            Available for Work
          </span>
          <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-zinc-900 dark:text-zinc-100 mb-8 tracking-tight leading-tight animate-in fade-in duration-700 delay-300">
          Let&apos;s Build
          <br />
          <span className="font-serif italic">Something Amazing</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto mb-12 animate-in fade-in duration-700 delay-400">
          Currently available for freelance projects and collaborations. Ready
          to transform your ideas into exceptional digital experiences.
        </p>

        {/* CTA Button */}
        <div className="animate-in fade-in duration-700 delay-500">
          <HireMeNow isOpen={isHireMeOpen} onOpenChange={onHireMeOpenChange} />
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
