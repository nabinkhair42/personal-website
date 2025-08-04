import { PropsWithChildren } from 'react';

export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <div className="relative">
        {/* Main Container with Architectural Grid */}
        <main className="max-w-5xl mx-auto border-l border-r  border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          {children}
        </main>

        {/* Subtle Side Elements */}
        <div className="absolute top-0 left-0 w-px h-full bg-zinc-200 dark:bg-zinc-800 opacity-50"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-zinc-200 dark:bg-zinc-800 opacity-50"></div>
      </div>
    </div>
  );
}
