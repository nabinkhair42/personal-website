import type { ReactNode } from "react";

interface ShellWrapperProps {
  className?: string;
  children: ReactNode;
}

const ShellWrapper = ({ className, children }: ShellWrapperProps) => {
  return (
    <section className={`relative isolate w-full overflow-visible ${className || ""}`}>
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-screen -translate-x-1/2 bg-(--pattern-fg)" />
      <div className="pointer-events-none absolute left-1/2 bottom-0 h-px w-screen -translate-x-1/2 bg-(--pattern-fg)" />
      <div className="relative mx-auto flex w-full max-w-2xl flex-col gap-8">{children}</div>
    </section>
  );
};

export default ShellWrapper;
