import { cn } from "@/lib/utils";
import clsx from "clsx";
import { Children, PropsWithChildren } from "react";

export function Stepper({ children }: PropsWithChildren) {
  const length = Children.count(children);

  return (
    <div className="relative flex flex-col bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6">
      {/* Minimal geometric pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        <div className="absolute top-0 left-0 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
      </div>

      <div className="relative">
        {Children.map(children, (child, index) => {
          return (
            <div
              className={cn(
                "border-l-2 border-zinc-200 dark:border-zinc-800 pl-8 ml-6 relative",
                clsx({
                  "pb-8": index < length - 1,
                })
              )}
            >
              {/* Enhanced step indicator */}
              <div className="absolute -left-6 top-0 flex items-center justify-center">
                <div className="w-12 h-8 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-xs font-mono font-medium flex items-center justify-center border border-zinc-900 dark:border-zinc-100">
                  {index + 1}
                </div>
              </div>

              {/* Connection line */}
              {index < length - 1 && (
                <div className="absolute -left-5 top-8 w-2 h-8 border-l-2 border-zinc-200 dark:border-zinc-800"></div>
              )}
              
              <div className="pt-1">
                {child}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function StepperItem({
  children,
  title,
}: PropsWithChildren & { title?: string }) {
  return (
    <div className="space-y-3">
      {title && (
        <div className="flex items-center gap-3">
          <h4 className="text-lg font-light text-zinc-900 dark:text-zinc-100 tracking-tight">
            {title}
          </h4>
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800"></div>
        </div>
      )}
      <div className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
        {children}
      </div>
    </div>
  );
}