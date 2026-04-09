import type { ReactNode } from "react";

// The Shell Wrapper Idea was taken from https://blocks.tremor.so/blocks/page-shells

const PageShellWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative grid min-h-screen w-full grid-cols-[minmax(0,1fr)_2rem_minmax(0,auto)_2rem_minmax(0,1fr)] grid-rows-[1fr_1px_auto_1px_1fr] overflow-x-hidden  [--pattern-fg:var(--muted)] ">
      <div className="col-start-3 row-start-3 flex w-full flex-col items-stretch space-y-8">
        {children}
      </div>
      <div className="relative -right-px col-start-2 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed" />
      <div className="relative -left-px col-start-4 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed" />
      <div className="pointer-events-none relative -bottom-px col-span-full col-start-1 row-start-2 h-px bg-(--pattern-fg)" />
      <div className="pointer-events-none relative -top-px col-span-full col-start-1 row-start-4 h-px bg-(--pattern-fg)" />
    </div>
  );
};

export default PageShellWrapper;
