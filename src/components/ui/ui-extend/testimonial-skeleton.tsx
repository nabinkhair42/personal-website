import { Quote } from 'lucide-react';

export function TestimonialSkeleton() {
  return (
    <div className="group relative overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 transition-all duration-700 hover:border-zinc-300 dark:hover:border-zinc-700">
      {/* Minimal geometric pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
      </div>

      <div className="relative p-6">
        {/* Quote Icon */}
        <div className="flex items-center gap-4 mb-6">
          <div className="p-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <Quote className="w-4 h-4 text-zinc-400 dark:text-zinc-600" />
          </div>
          <div className="w-6 h-px bg-zinc-300 dark:bg-zinc-700"></div>
        </div>

        {/* Testimonial Content Skeleton */}
        <div className="space-y-4 mb-6">
          {/* Text lines */}
          <div className="space-y-2">
            <div className="h-3 bg-zinc-200 dark:bg-zinc-800 w-full animate-pulse"></div>
            <div className="h-3 bg-zinc-200 dark:bg-zinc-800 w-5/6 animate-pulse"></div>
            <div className="h-3 bg-zinc-200 dark:bg-zinc-800 w-4/5 animate-pulse"></div>
            <div className="h-3 bg-zinc-200 dark:bg-zinc-800 w-3/4 animate-pulse"></div>
          </div>
        </div>

        {/* Author Section */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 animate-pulse"></div>

          {/* Author Details */}
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-zinc-200 dark:bg-zinc-800 w-24 animate-pulse"></div>
            <div className="h-2 bg-zinc-200 dark:bg-zinc-800 w-32 animate-pulse"></div>
          </div>
        </div>

        {/* Rating Stars Skeleton */}
        <div className="flex items-center gap-1 mt-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 bg-zinc-200 dark:bg-zinc-800 animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            ></div>
          ))}
        </div>

        {/* Coming Soon Indicator */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <div className="w-2 h-2 bg-zinc-400 dark:bg-zinc-600 rounded-full animate-pulse"></div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono uppercase tracking-wide">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
