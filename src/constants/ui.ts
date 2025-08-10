export const BG = {
  gradient:
    'bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900',
  surface: 'bg-white dark:bg-zinc-950',
  card: 'bg-zinc-50 dark:bg-zinc-900',
  border: 'border border-zinc-200 dark:border-zinc-800',
};

export const SECTION = {
  base: 'relative px-6 py-20',
  container: 'relative z-10 max-w-6xl mx-auto',
  containerNarrow: 'relative z-10 max-w-4xl mx-auto',
};

export const ANIM = {
  in: 'animate-in fade-in duration-700',
  inSlow: 'animate-in fade-in duration-1000',
  slideUp: 'slide-in-from-bottom-4',
  delay: (ms: number) => `delay-${ms}`,
};

export const TYPO = {
  sectionTitle:
    'text-4xl md:text-5xl font-light text-zinc-900 dark:text-zinc-100 mb-6 tracking-tight',
  sectionKicker:
    'text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono',
  paragraph:
    'text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed',
  labelMono:
    'text-xs font-mono uppercase tracking-wide text-zinc-500 dark:text-zinc-400',
};

export const GEOMETRY = {
  verticalLines: 'absolute inset-0 opacity-3 dark:opacity-5',
  vertLine: 'absolute top-0 w-px h-full bg-current',
  positions: ['left-0', 'left-40', 'right-40', 'right-0'] as const,
};
