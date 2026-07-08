"use client";

import { motion } from "motion/react";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { SectionHeader } from "@/components/layouts/section-header";
import { itemVariants } from "@/components/motion";
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
        <SectionHeader
          label="Blog"
          title="Something worth reading."
          headingLevel="h1"
          description={`Notes I've written by hand — not generated. Web development, design, the messy middle of building things, and what I'm learning as a ${designation}. Written by ${name}.`}
        />
      </motion.section>
    </ShellWrapper>
  );
}

export default BlogIntroduction;
