import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface ShellWrapperProps extends ComponentPropsWithoutRef<"section"> {
  className?: string;
  children?: ReactNode;
}

const ShellWrapper = ({ className, children, ...props }: ShellWrapperProps) => {
  return (
    <section
      className={`relative isolate w-full overflow-visible ${className || ""}`}
      {...props}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-(--pattern-fg)" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-(--pattern-fg)" />
      <div className="relative mx-auto flex w-full max-w-200 flex-col gap-8">{children}</div>
    </section>
  );
};

export default ShellWrapper;
