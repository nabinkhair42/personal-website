"use client";

import { Check, Copy } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { APPLE_EASE } from "../../components/motion";

interface CopyButtonProps {
  value: string;
  className?: string;
}

export function CopyButton({ value, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, 2000);
    } catch (error) {
      console.error("Failed to copy code", error);
    }
  }, [value]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Code copied" : "Copy code"}
      title={copied ? "Copied" : "Copy code"}
      className={cn(
        "relative inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground/80",
        "outline-none transition-[color,background-color,transform] duration-150 ease-out",
        "hover:bg-muted/70 hover:text-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        "active:scale-[0.94]",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.6, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: 20 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.22, ease: APPLE_EASE }
            }
            className="absolute inset-0 flex items-center justify-center text-foreground"
          >
            <Check className="size-3.5" aria-hidden strokeWidth={2.5} />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.6, rotate: 20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: -20 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.22, ease: APPLE_EASE }
            }
            className="absolute inset-0 flex items-center justify-center"
          >
            <Copy className="size-3.5" aria-hidden />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
