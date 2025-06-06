import { ComponentProps } from "react";
import Copy from "./copy";

export default function Pre({
  children,
  raw,
  ...rest
}: ComponentProps<"pre"> & { raw?: string }) {
  return (
    <div className="relative my-6 group">
      {/* Enhanced container */}
      <div className="relative border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
        {/* Minimal geometric pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
          <div className="absolute top-0 left-0 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute top-0 right-0 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
        </div>

        {/* Enhanced header */}
        <div className="relative flex items-center justify-between px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-zinc-400 dark:bg-zinc-600 rounded-full"></div>
            <div className="w-2 h-2 bg-zinc-300 dark:bg-zinc-700 rounded-full"></div>
            <div className="w-2 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Code
            </span>
            <div className="w-4 h-px bg-zinc-300 dark:bg-zinc-700"></div>
          </div>
        </div>

        {/* Copy button */}
        {raw && (
          <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Copy content={raw} />
          </div>
        )}

        {/* Code content */}
        <div className="relative overflow-auto">
          <pre 
            className="p-4 text-sm font-mono leading-relaxed text-zinc-800 dark:text-zinc-200 bg-transparent overflow-x-auto"
            {...rest}
          >
            {children}
          </pre>
        </div>
      </div>
    </div>
  );
}