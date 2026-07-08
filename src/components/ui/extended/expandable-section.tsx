"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { APPLE_EASE } from "../../motion";

// Root component
interface ExpandableSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ExpandableSection = React.forwardRef<HTMLDivElement, ExpandableSectionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-3 p-2", className)} {...props}>
        {children}
      </div>
    );
  }
);
ExpandableSection.displayName = "ExpandableSection";

// Header component
interface ExpandableSectionHeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const ExpandableSectionHeader = React.forwardRef<HTMLElement, ExpandableSectionHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <header ref={ref} className={cn("space-y-2", className)} {...props}>
        {children}
      </header>
    );
  }
);
ExpandableSectionHeader.displayName = "ExpandableSectionHeader";

// Label component
interface ExpandableSectionLabelProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const ExpandableSectionLabel = React.forwardRef<HTMLParagraphElement, ExpandableSectionLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props}>
        {children}
      </p>
    );
  }
);
ExpandableSectionLabel.displayName = "ExpandableSectionLabel";

// Title component
interface ExpandableSectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const ExpandableSectionTitle = React.forwardRef<HTMLHeadingElement, ExpandableSectionTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn("text-3xl font-medium tracking-tight text-foreground md:text-4xl", className)}
        {...props}
      >
        {children}
      </h2>
    );
  }
);
ExpandableSectionTitle.displayName = "ExpandableSectionTitle";

// Description component
interface ExpandableSectionDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const ExpandableSectionDescription = React.forwardRef<
  HTMLParagraphElement,
  ExpandableSectionDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p ref={ref} className={cn("text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
});
ExpandableSectionDescription.displayName = "ExpandableSectionDescription";

// List component
interface ExpandableSectionListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ExpandableSectionList = React.forwardRef<HTMLDivElement, ExpandableSectionListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col space-y-3", className)} {...props}>
        {children}
      </div>
    );
  }
);
ExpandableSectionList.displayName = "ExpandableSectionList";

// Item component - now controlled with React state
interface ExpandableSectionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  defaultOpen?: boolean;
}

interface ExpandableSectionItemContextValue {
  isOpen: boolean;
  toggle: () => void;
}

const ExpandableSectionItemContext = React.createContext<ExpandableSectionItemContextValue | null>(
  null
);

const useExpandableSectionItem = () => {
  const context = React.useContext(ExpandableSectionItemContext);
  if (!context) {
    throw new Error("useExpandableSectionItem must be used within an ExpandableSectionItem");
  }
  return context;
};

const ExpandableSectionItem = React.forwardRef<HTMLDivElement, ExpandableSectionItemProps>(
  ({ className, children, defaultOpen = false, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    const toggle = React.useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

    const contextValue = React.useMemo(() => ({ isOpen, toggle }), [isOpen, toggle]);

    return (
      <ExpandableSectionItemContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn("group/item", className)}
          data-state={isOpen ? "open" : "closed"}
          {...props}
        >
          {children}
        </div>
      </ExpandableSectionItemContext.Provider>
    );
  }
);
ExpandableSectionItem.displayName = "ExpandableSectionItem";

// Trigger component
interface ExpandableSectionTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ExpandableSectionTrigger = React.forwardRef<HTMLButtonElement, ExpandableSectionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { isOpen, toggle } = useExpandableSectionItem();

    return (
      <button
        ref={ref}
        type="button"
        onClick={toggle}
        className={cn(
          "group/trigger cursor-pointer",
          "transition-[opacity,transform] duration-150 ease-out",
          "active:scale-[0.995] active:opacity-80",
          className
        )}
        aria-expanded={isOpen}
        {...props}
      >
        {children}
      </button>
    );
  }
);
ExpandableSectionTrigger.displayName = "ExpandableSectionTrigger";

// Content component with Motion animations
interface ExpandableSectionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ExpandableSectionContent = React.forwardRef<HTMLDivElement, ExpandableSectionContentProps>(
  ({ className, children, ...props }, ref) => {
    const { isOpen } = useExpandableSectionItem();
    const shouldReduceMotion = useReducedMotion();

    return (
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? false : { height: 0 }}
            animate={{
              height: "auto",
              transition: shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.42, ease: APPLE_EASE },
            }}
            exit={
              shouldReduceMotion
                ? { height: 0, transition: { duration: 0 } }
                : { height: 0, transition: { duration: 0.32, ease: APPLE_EASE } }
            }
            className="overflow-hidden"
          >
            <motion.div
              initial={
                shouldReduceMotion ? false : { opacity: 0, y: -8, filter: "blur(4px)", scale: 0.97 }
              }
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                scale: 1,
                transition: shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.45, ease: APPLE_EASE, delay: 0.06 },
              }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0, transition: { duration: 0 } }
                  : {
                      opacity: 0,
                      y: -4,
                      filter: "blur(2px)",
                      scale: 0.98,
                      transition: { duration: 0.2, ease: "easeIn" },
                    }
              }
              style={{ transformOrigin: "top" }}
            >
              <div
                ref={ref}
                className={cn("mt-3 space-y-3 pl-0 sm:pl-[3.25rem]", className)}
                {...props}
              >
                {children}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
ExpandableSectionContent.displayName = "ExpandableSectionContent";

export {
  ExpandableSection,
  ExpandableSectionContent,
  ExpandableSectionDescription,
  ExpandableSectionHeader,
  ExpandableSectionItem,
  ExpandableSectionLabel,
  ExpandableSectionList,
  ExpandableSectionTitle,
  ExpandableSectionTrigger,
};
