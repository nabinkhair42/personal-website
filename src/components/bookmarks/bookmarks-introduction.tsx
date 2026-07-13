"use client";

import { motion } from "motion/react";
import { SectionHeader } from "@/components/layouts/section-header";
import { itemVariants } from "@/components/motion";

export function BookmarksIntroduction() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={itemVariants}
      className="space-y-2 p-2 py-6"
    >
      <SectionHeader
        label="More adding soon"
        title="Links worth keeping."
        headingLevel="h1"
        description="A collection of interesting links, articles, tools, and resources I've saved and keep coming back to."
      />
    </motion.section>
  );
}
