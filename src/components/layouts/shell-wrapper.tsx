import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const ShellWrapper = ({ className, children, ...props }: ComponentPropsWithoutRef<"section">) => {
  return (
    <section className={cn("flex w-full flex-col gap-4", className)} {...props}>
      {children}
    </section>
  );
};

export default ShellWrapper;
