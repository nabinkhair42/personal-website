"use client";

import { motion } from "motion/react";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { itemVariants } from "@/components/_motion";
import { DeveloperDetails } from "@/dev-constants/details";

export function BlogIntroduction() {
  const { name, designation } = DeveloperDetails;

  return (
    <ShellWrapper>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        className="space-y-2 p-2 py-6"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Blog</p>
        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          Something worth reading.
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          Notes I&apos;ve written by hand — not generated. Web development, design, the messy
          middle of building things, and what I&apos;m learning as a {designation}. Written by{" "}
          {name}.
        </p>
      </motion.section>
    </ShellWrapper>
  );
}

export default BlogIntroduction;
