import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const ShellWrapper = ({ className, children, ...props }: ComponentPropsWithoutRef<"section">) => {
  return (
    <section className={cn("relative w-full py-2", className)} {...props}>
      <div className="flex w-full flex-col gap-4">{children}</div>
    </section>
  );
};

export default ShellWrapper;
