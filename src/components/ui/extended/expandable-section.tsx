"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";

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
      <p
        ref={ref}
        className={cn("text-sm uppercase tracking-[0.2em] text-muted-foreground", className)}
        {...props}
      >
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
    <p
      ref={ref}
      className={cn("text-base leading-relaxed text-muted-foreground", className)}
      {...props}
    >
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
          className={cn("group", className)}
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
    const shouldReduceMotion = useReducedMotion();

    return (
      <button
        ref={ref}
        type="button"
        onClick={toggle}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between text-left",
          className
        )}
        aria-expanded={isOpen}
        {...props}
      >
        {children}
        <motion.span
          className="text-muted-foreground"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
          title={isOpen ? "Collapse section" : "Expand section"}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
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
            initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: shouldReduceMotion
                ? { duration: 0 }
                : {
                    height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                    opacity: { duration: 0.25, delay: 0.05 },
                  },
            }}
            exit={
              shouldReduceMotion
                ? { height: 0, opacity: 0, transition: { duration: 0 } }
                : {
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                      opacity: { duration: 0.15 },
                    },
                  }
            }
            className="overflow-hidden"
          >
            <div ref={ref} className={cn("space-y-3 mt-3 pl-11", className)} {...props}>
              {children}
            </div>
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
