"use client";

import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { AlertTriangle, Check, Info, LoaderCircle, X } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

const toastManager = ToastPrimitive.createToastManager();

// Match Sonner: keep every toast alive until its own timeout dismisses it.
// Base UI's default `limit` is 3 and marks older toasts as `data-limited`.
const DEFAULT_LIMIT = Number.POSITIVE_INFINITY;

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type ToastSwipeDirection = "up" | "down" | "left" | "right";

const positionClassNames: Record<ToastPosition, string> = {
  "top-left": "top-(--toast-offset) left-(--toast-offset) items-start",
  "top-center": "top-(--toast-offset) left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-(--toast-offset) right-(--toast-offset) items-end",
  "bottom-left": "bottom-(--toast-offset) left-(--toast-offset) items-start",
  "bottom-center":
    "bottom-(--toast-offset) left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-(--toast-offset) right-(--toast-offset) items-end",
};

const swipeDirectionByPosition: Record<ToastPosition, ToastSwipeDirection> = {
  "top-left": "left",
  "top-center": "up",
  "top-right": "right",
  "bottom-left": "left",
  "bottom-center": "down",
  "bottom-right": "right",
};

const toastTypeStyles = {
  success: {
    icon: Check,
    iconClassName: "bg-primary-foreground text-primary",
  },
  error: {
    icon: X,
    iconClassName: "bg-destructive text-primary-foreground",
  },
  info: {
    icon: Info,
    iconClassName: "bg-primary-foreground/20 text-primary-foreground",
  },
  warning: {
    icon: AlertTriangle,
    iconClassName: "bg-primary-foreground/20 text-primary-foreground",
  },
  loading: {
    icon: LoaderCircle,
    iconClassName:
      "bg-primary-foreground/20 text-primary-foreground [&_svg]:animate-spin",
  },
} as const;

type ToastType = keyof typeof toastTypeStyles;

type ToasterProps = ToastPrimitive.Provider.Props & {
  position?: ToastPosition;
  offset?: number | string;
  className?: string;
};

function ToastViewport({
  position = "top-center",
  offset = 16,
  className,
  ...props
}: ToastPrimitive.Viewport.Props & {
  position?: ToastPosition;
  offset?: number | string;
}) {
  const offsetValue = typeof offset === "number" ? `${offset}px` : offset;
  const isBottom = position.startsWith("bottom");

  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      data-position={position}
      className={cn(
        "pointer-events-none fixed z-99 flex w-max max-w-[min(100vw-2rem,20rem)] outline-none",
        isBottom ? "flex-col-reverse" : "flex-col",
        positionClassNames[position],
        className,
      )}
      style={{ ["--toast-offset" as string]: offsetValue } as CSSProperties}
      {...props}
    />
  );
}

function ToastList({ position = "top-center" }: { position?: ToastPosition }) {
  const { toasts } = ToastPrimitive.useToastManager();
  const swipeDirection = swipeDirectionByPosition[position];

  return toasts.map((toastItem) => (
    <ToastRoot
      key={toastItem.id}
      toast={toastItem}
      position={position}
      swipeDirection={swipeDirection}
    />
  ));
}

function ToastRoot({
  toast: toastItem,
  position = "top-center",
  className,
  swipeDirection = "up",
  ...props
}: ToastPrimitive.Root.Props & {
  position?: ToastPosition;
}) {
  const type = (toastItem.type as ToastType | undefined) ?? "success";
  const style = toastTypeStyles[type] ?? toastTypeStyles.success;
  const Icon = style.icon;
  const isTop = position.startsWith("top");

  return (
    <ToastPrimitive.Root
      data-slot="toast"
      toast={toastItem}
      swipeDirection={swipeDirection}
      className={cn(
        "pointer-events-auto relative w-max max-w-[min(100%,20rem)] select-none will-change-[transform,opacity]",
        isTop
          ? "origin-top mb-1.5 last:mb-0"
          : "origin-bottom mt-1.5 last:mt-0",
        "rounded-full bg-primary text-primary-foreground",
        "shadow-sm shadow-foreground/10",
        // Track finger via Base UI swipe CSS vars
        "translate-x-(--toast-swipe-movement-x,0px) translate-y-(--toast-swipe-movement-y,0px)",
        // Enter: springy ease-out · exit: snappier ease-in
        "transition-[transform,opacity,filter,margin,padding,height] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "data-ending-style:duration-200 data-ending-style:ease-in",
        "data-swiping:transition-none",
        // Enter from the edge
        isTop
          ? "data-starting-style:-translate-y-5"
          : "data-starting-style:translate-y-5",
        "data-starting-style:scale-95 data-starting-style:opacity-0 data-starting-style:blur-[3px]",
        // Soft auto-dismiss exit
        isTop
          ? "data-ending-style:-translate-y-2"
          : "data-ending-style:translate-y-2",
        "data-ending-style:scale-[0.97] data-ending-style:opacity-0 data-ending-style:blur-[2px]",
        // Swipe fling — continue past the finger release point
        "data-ending-style:data-[swipe-direction=up]:translate-y-[calc(var(--toast-swipe-movement-y,0px)-130%)] data-ending-style:data-[swipe-direction=up]:scale-95 data-ending-style:data-[swipe-direction=up]:opacity-0 data-ending-style:data-[swipe-direction=up]:blur-none",
        "data-ending-style:data-[swipe-direction=down]:translate-y-[calc(var(--toast-swipe-movement-y,0px)+130%)] data-ending-style:data-[swipe-direction=down]:scale-95 data-ending-style:data-[swipe-direction=down]:opacity-0 data-ending-style:data-[swipe-direction=down]:blur-none",
        "data-ending-style:data-[swipe-direction=left]:translate-x-[calc(var(--toast-swipe-movement-x,0px)-130%)] data-ending-style:data-[swipe-direction=left]:scale-95 data-ending-style:data-[swipe-direction=left]:opacity-0 data-ending-style:data-[swipe-direction=left]:blur-none",
        "data-ending-style:data-[swipe-direction=right]:translate-x-[calc(var(--toast-swipe-movement-x,0px)+130%)] data-ending-style:data-[swipe-direction=right]:scale-95 data-ending-style:data-[swipe-direction=right]:opacity-0 data-ending-style:data-[swipe-direction=right]:blur-none",
        // Over limit: collapse so the stack reflows
        "data-limited:pointer-events-none data-limited:h-0 data-limited:overflow-hidden data-limited:opacity-0 data-limited:scale-95 data-limited:blur-xs data-limited:border-0 data-limited:p-0 data-limited:m-0 data-limited:shadow-none",
        // Reduced motion
        "motion-reduce:transition-none motion-reduce:will-change-auto",
        "motion-reduce:data-starting-style:translate-y-0 motion-reduce:data-starting-style:scale-100 motion-reduce:data-starting-style:opacity-100 motion-reduce:data-starting-style:blur-none",
        "motion-reduce:data-ending-style:translate-y-0 motion-reduce:data-ending-style:scale-100",
        className,
      )}
      {...props}
    >
      <ToastPrimitive.Content className="flex items-center gap-2 px-2.5 py-2">
        <span
          className={cn(
            "flex size-4 shrink-0 items-center justify-center rounded-full",
            "animate-in zoom-in-50 fade-in duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] fill-mode-both",
            "motion-reduce:animate-none",
            style.iconClassName,
          )}
          aria-hidden
        >
          <Icon className="size-2.5" strokeWidth={3} />
        </span>
        <div className="flex min-w-0 items-baseline gap-1.5">
          {toastItem.title != null && (
            <ToastPrimitive.Title className="m-0 truncate text-xs font-medium leading-none tracking-tight text-primary-foreground" />
          )}
          {toastItem.description != null && (
            <ToastPrimitive.Description className="m-0 truncate text-xs leading-none tabular-nums text-primary-foreground/75" />
          )}
        </div>
        {toastItem.actionProps ? (
          <ToastPrimitive.Action className="ml-1 shrink-0 rounded-full bg-primary-foreground/15 px-2 py-0.5 text-xs font-medium text-primary-foreground transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-primary-foreground/25 active:scale-[0.96] motion-reduce:transition-none" />
        ) : null}
      </ToastPrimitive.Content>
    </ToastPrimitive.Root>
  );
}

function Toaster({
  position = "top-center",
  offset = 16,
  limit = DEFAULT_LIMIT,
  toastManager: manager = toastManager,
  className,
  children,
  ...props
}: ToasterProps) {
  return (
    <ToastPrimitive.Provider toastManager={manager} limit={limit} {...props}>
      {children}
      <ToastPrimitive.Portal>
        <ToastViewport
          position={position}
          offset={offset}
          className={className}
        >
          <ToastList position={position} />
        </ToastViewport>
      </ToastPrimitive.Portal>
    </ToastPrimitive.Provider>
  );
}

type ToastOptions = Parameters<typeof toastManager.add>[0];

function toast(options: ToastOptions | string) {
  if (typeof options === "string") {
    return toastManager.add({ title: options, type: "success" });
  }
  return toastManager.add({ type: "success", ...options });
}

toast.add = toastManager.add.bind(toastManager);
toast.update = toastManager.update.bind(toastManager);
toast.promise = toastManager.promise.bind(toastManager);
toast.close = toastManager.close.bind(toastManager);

toast.success = (
  title: ReactNode,
  options?: Omit<ToastOptions, "title" | "type">,
) => toastManager.add({ ...options, title, type: "success" });

toast.error = (
  title: ReactNode,
  options?: Omit<ToastOptions, "title" | "type">,
) => toastManager.add({ ...options, title, type: "error" });

toast.info = (
  title: ReactNode,
  options?: Omit<ToastOptions, "title" | "type">,
) => toastManager.add({ ...options, title, type: "info" });

toast.warning = (
  title: ReactNode,
  options?: Omit<ToastOptions, "title" | "type">,
) => toastManager.add({ ...options, title, type: "warning" });

toast.loading = (
  title: ReactNode,
  options?: Omit<ToastOptions, "title" | "type">,
) => toastManager.add({ ...options, title, type: "loading", timeout: 0 });

const createToastManager = ToastPrimitive.createToastManager;

export {
  Toaster,
  createToastManager,
  toast,
  toastManager,
  type ToastPosition,
  type ToasterProps,
};
