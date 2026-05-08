import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium tracking-tight outline-none",
    "transition-[color,background-color,border-color,box-shadow,transform,text-decoration-color] duration-150 ease-out",
    "active:scale-[0.97] active:duration-75",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:active:scale-100",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:transition-transform",
    "focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/40",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground border border-primary-foreground/[0.08]",
          "bg-linear-to-b from-white/[0.14] via-transparent to-black/[0.10]",
          "shadow-[0_1px_2px_-0.5px_rgb(0_0_0/0.18),0_3px_8px_-2px_rgb(0_0_0/0.10)]",
          "hover:bg-primary/92 hover:border-primary-foreground/[0.18]",
          "hover:shadow-[0_2px_4px_-0.5px_rgb(0_0_0/0.22),0_6px_18px_-3px_rgb(0_0_0/0.14)]",
        ].join(" "),
        destructive: [
          "bg-destructive bg-linear-to-b from-white/[0.14] to-transparent text-white",
          "shadow-[inset_0_1px_0_0_rgb(255_255_255/0.16),0_1px_2px_0_rgb(0_0_0/0.10)]",
          "hover:from-white/[0.20]",
          "hover:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.24),0_2px_4px_0_rgb(0_0_0/0.16),0_4px_12px_-2px_rgb(0_0_0/0.12)]",
          "focus-visible:ring-destructive/50",
          "dark:bg-destructive/75",
        ].join(" "),
        outline: [
          "border border-border bg-background text-foreground",
          "shadow-[0_1px_2px_0_rgb(0_0_0/0.04)]",
          "hover:border-foreground/25 hover:bg-accent hover:text-accent-foreground",
          "hover:shadow-[0_2px_6px_-1px_rgb(0_0_0/0.06),0_1px_2px_0_rgb(0_0_0/0.04)]",
          "dark:bg-transparent dark:hover:bg-accent/40",
        ].join(" "),
        secondary: [
          "bg-secondary bg-linear-to-b from-white/[0.4] to-transparent text-secondary-foreground dark:from-white/[0.04]",
          "shadow-[inset_0_1px_0_0_rgb(255_255_255/0.5),0_1px_2px_0_rgb(0_0_0/0.04)]",
          "dark:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.06),0_1px_2px_0_rgb(0_0_0/0.16)]",
          "hover:bg-secondary/85",
        ].join(" "),
        ghost: [
          "text-foreground",
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        ].join(" "),
        link: [
          "text-primary underline underline-offset-[5px] decoration-1 decoration-primary/0",
          "hover:decoration-primary",
          "active:scale-100",
        ].join(" "),
      },
      size: {
        xs: "h-7 gap-1 rounded-md px-2.5 text-xs has-[>svg]:px-2 [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        default: "h-9 rounded-md px-4 has-[>svg]:px-3.5",
        lg: "h-10 gap-2.5 rounded-md px-5 has-[>svg]:px-4 [&_svg:not([class*='size-'])]:size-[18px]",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
