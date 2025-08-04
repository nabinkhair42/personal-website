import { Logo } from './navbar';

export function Footer() {
  return (
    <footer className="relative border-t  border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
      {/* Minimal geometric pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        <div className="absolute top-0 left-0 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
        <div className="absolute top-0 left-1/4 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
      </div>

      <div className="relative flex h-20 items-center justify-center px-6">
        <div className="flex items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Built with ❤️ by
            </span>
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
          </div>
          <Logo />
        </div>
      </div>

      {/* Minimalist visual elements */}
      <div className="absolute bottom-4 left-4 opacity-20 dark:opacity-30">
        <div className="w-2 h-2 bg-zinc-400 dark:bg-zinc-600 rotate-45"></div>
      </div>
      <div className="absolute top-4 right-4 opacity-20 dark:opacity-30">
        <div className="w-3 h-3 border border-zinc-400 dark:border-zinc-600"></div>
      </div>
    </footer>
  );
}
