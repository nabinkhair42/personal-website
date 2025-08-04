'use client'; // Error components must be Client Components

import Link from 'next/link';
import { useEffect } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative min-h-[87vh] flex items-center justify-center bg-white dark:bg-zinc-950">
      {/* Architectural background pattern */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02] pointer-events-none">
        <div className="max-w-7xl mx-auto h-full">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="border-r border-zinc-300 dark:border-zinc-700 last:border-r-0"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main content container */}
      <div className="relative max-w-2xl mx-auto px-6 text-center">
        {/* Geometric pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
        </div>

        {/* Error icon */}
        <div className="relative z-10 mb-8 flex justify-center">
          <div className="p-6 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50">
            <AlertTriangle className="h-16 w-16 text-red-600 dark:text-red-400" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
            <span className="text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
              System Error
            </span>
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
          </div>

          {/* Error message */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-light text-zinc-900 dark:text-zinc-100 tracking-tight">
              Oops!
            </h1>

            <div className="w-16 h-px bg-red-500 dark:bg-red-400 mx-auto"></div>

            <p className="text-xl font-light text-zinc-600 dark:text-zinc-400 mb-4">
              Something went wrong
            </p>

            <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-md mx-auto">
              We&apos;re sorry, but an error occurred while processing your
              request. Please try again or return to the homepage.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              onClick={() => reset()}
              className="group px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-mono text-sm uppercase tracking-wider transition-all duration-300"
            >
              <RotateCcw className="h-4 w-4 mr-2 group-hover:rotate-180 transition-transform duration-300" />
              Reload Page
            </Button>

            <Link
              href="/"
              className={buttonVariants({
                variant: 'outline',
                className:
                  'px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-mono text-sm uppercase tracking-wider transition-all duration-300',
              })}
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Homepage
            </Link>
          </div>
        </div>

        {/* Error details (development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="relative z-10 mt-12 p-4 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-left">
            <div className="mb-2">
              <span className="text-xs font-mono uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Error Details
              </span>
            </div>
            <code className="text-xs font-mono text-zinc-700 dark:text-zinc-300 break-all">
              {error.message}
            </code>
          </div>
        )}
      </div>

      {/* Corner decorative elements */}
      <div className="absolute top-8 left-8 opacity-10 dark:opacity-20 pointer-events-none">
        <div className="w-4 h-4 border border-zinc-400 dark:border-zinc-600 rotate-45"></div>
      </div>
      <div className="absolute bottom-8 right-8 opacity-10 dark:opacity-20 pointer-events-none">
        <div className="w-6 h-6 border border-zinc-400 dark:border-zinc-600"></div>
      </div>
    </div>
  );
}
