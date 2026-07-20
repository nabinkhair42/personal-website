"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";

const APPLE_EASE = [0.32, 0.72, 0, 1] as const;

interface ExpandableSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ExpandableSection = React.forwardRef<HTMLDivElement, ExpandableSectionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col gap-3 p-2", className)} {...props}>
        {children}
      </div>
    );
  }
);
ExpandableSection.displayName = "ExpandableSection";

interface ExpandableSectionListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ExpandableSectionList = React.forwardRef<HTMLDivElement, ExpandableSectionListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col gap-3", className)} {...props}>
        {children}
      </div>
    );
  }
);
ExpandableSectionList.displayName = "ExpandableSectionList";

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
        className={cn("group/trigger cursor-pointer", className)}
        aria-expanded={isOpen}
        {...props}
      >
        {children}
      </button>
    );
  }
);
ExpandableSectionTrigger.displayName = "ExpandableSectionTrigger";

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
            initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: shouldReduceMotion
                ? { duration: 0 }
                : {
                    height: { duration: 0.38, ease: APPLE_EASE },
                    opacity: { duration: 0.28, ease: APPLE_EASE },
                  },
            }}
            exit={
              shouldReduceMotion
                ? { height: 0, opacity: 0, transition: { duration: 0 } }
                : {
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: 0.3, ease: APPLE_EASE },
                      opacity: { duration: 0.18, ease: "easeIn" },
                    },
                  }
            }
            className="overflow-hidden"
          >
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.32, ease: APPLE_EASE, delay: 0.04 },
              }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0, transition: { duration: 0 } }
                  : { opacity: 0, y: -4, transition: { duration: 0.16, ease: "easeIn" } }
              }
            >
              <div
                ref={ref}
                className={cn("mt-3 flex flex-col gap-3 pl-[3.25rem]", className)}
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
  ExpandableSectionItem,
  ExpandableSectionList,
  ExpandableSectionTrigger,
};
