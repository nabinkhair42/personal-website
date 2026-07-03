import type { Variants } from "motion/react";

export const APPLE_EASE = [0.32, 0.72, 0, 1] as const;
export const VIEWPORT = { once: true, amount: 0.2 } as const;

const SPRING = {
  type: "spring" as const,
  stiffness: 300,
  damping: 38,
  mass: 0.9,
};

export const sectionVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(50px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      ...SPRING,
      staggerChildren: 0.08,
      delayChildren: 0.01,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: APPLE_EASE },
  },
};

export const tightStaggerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025, delayChildren: 0.05 } },
};
