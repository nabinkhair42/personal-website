"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Copy, ExternalLink, Grid3X3, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "structural-grid-toast-dismissed";
const INSTALL_CMD =
  "npx skills add https://github.com/nabinkhair42/structural-grid-skill --skill structural-grid";
const GITHUB_URL = "https://github.com/nabinkhair42/structural-grid-skill";
const SKILLS_URL = "https://skills.sh";

const TEMPLATES = [
  { name: "Aura", dark: "/templates/aura-dark.png", light: "/templates/aura-light.png" },
  { name: "Onyx", dark: "/templates/only-dark.png", light: "/templates/onyx-light.png" },
] as const;

// Hoisted motion variants to prevent re-creation on every render (rerender-memo-with-default-value)
const TOAST_INITIAL = { opacity: 0, y: 60, scale: 0.96 } as const;
const TOAST_ANIMATE = { opacity: 1, y: 0, scale: 1 } as const;
const TOAST_EXIT = { opacity: 0, y: 30, scale: 0.96 } as const;
const TOAST_INITIAL_REDUCED = { opacity: 0 } as const;
const TOAST_ANIMATE_REDUCED = { opacity: 1 } as const;
const TOAST_EXIT_REDUCED = { opacity: 0 } as const;
const TOAST_TRANSITION = { type: "spring", damping: 28, stiffness: 320 } as const;
const FADE_INITIAL = { opacity: 0 } as const;
const FADE_ANIMATE = { opacity: 1 } as const;
const FADE_EXIT = { opacity: 0 } as const;
const FADE_TRANSITION = { duration: 0.4 } as const;

const StructuralGridToast = () => {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  const [templateIndex, setTemplateIndex] = useState(0);
  const template = TEMPLATES[templateIndex];

  useEffect(() => {
    setMounted(true);
    const wasDismissed = localStorage.getItem(STORAGE_KEY);
    if (!wasDismissed) {
      const timer = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Auto-cycle through templates
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setTemplateIndex((prev) => (prev + 1) % TEMPLATES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [visible]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, "true");
  }, []);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  if (!mounted) return null;

  const imageSrc = resolvedTheme === "dark" ? template.dark : template.light;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={shouldReduceMotion ? TOAST_INITIAL_REDUCED : TOAST_INITIAL}
          animate={shouldReduceMotion ? TOAST_ANIMATE_REDUCED : TOAST_ANIMATE}
          exit={shouldReduceMotion ? TOAST_EXIT_REDUCED : TOAST_EXIT}
          transition={TOAST_TRANSITION}
          role="status"
          aria-label="Structural Grid skill promotion"
          className={cn(
            "fixed bottom-5 right-5 z-50 w-[340px]",
            "rounded-lg border border-border bg-card shadow-lg",
            "overflow-hidden",
            "max-sm:bottom-3 max-sm:right-3 max-sm:left-3 max-sm:w-auto"
          )}
        >
          {/* Template preview with crossfade */}
          <div className="relative h-[170px] w-full overflow-hidden border-b border-border bg-muted">
            <AnimatePresence mode="wait">
              <motion.div
                key={templateIndex}
                initial={FADE_INITIAL}
                animate={FADE_ANIMATE}
                exit={FADE_EXIT}
                transition={FADE_TRANSITION}
                className="absolute inset-0"
              >
                <Image
                  src={imageSrc}
                  alt={`${template.name} template built with Structural Grid`}
                  fill
                  className="object-cover object-top"
                  sizes="340px"
                />
              </motion.div>
            </AnimatePresence>
            {/* Template name badge */}
            <div className="absolute bottom-2 left-2 z-10 rounded bg-background/80 px-2 py-0.5 text-[10px] font-medium text-foreground backdrop-blur-sm">
              {template.name} Template
            </div>
            {/* Dot indicators */}
            <div className="absolute bottom-2 right-2 z-10 flex gap-1">
              {TEMPLATES.map((t, i) => (
                <div
                  key={t.name}
                  className={cn(
                    "size-1.5 rounded-full transition-colors duration-300",
                    i === templateIndex ? "bg-foreground" : "bg-foreground/30"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3 p-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded border border-border bg-muted/40">
                  <Grid3X3 className="size-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Agent Skill
                  </p>
                  <h3 className="text-sm font-semibold leading-tight text-foreground">
                    Structural Grid
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDismiss}
                className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Dismiss"
              >
                <X className="size-3.5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs leading-relaxed text-muted-foreground">
              The open-source design system for the exposed grid aesthetic used by Linear, Vercel,
              and Resend.
            </p>

            {/* Install command */}
            <div className="flex items-center gap-1.5 rounded border border-border bg-muted/40 py-1.5 pr-1.5 pl-3">
              <code className="flex-1 truncate text-[11px] text-muted-foreground">
                npx skills add ...structural-grid
              </code>
              <button
                type="button"
                onClick={handleCopy}
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded transition-colors",
                  copied
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                aria-label={copied ? "Copied" : "Copy install command"}
              >
                {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
              </button>
            </div>

            {/* Links */}
            <div className="flex items-center gap-3">
              <Link
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                GitHub
                <ExternalLink className="size-3" />
              </Link>
              <Link
                href={SKILLS_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                skills.sh
                <ExternalLink className="size-3" />
              </Link>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default StructuralGridToast;
