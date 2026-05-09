"use client";

import { motion } from "motion/react";
import ShellWrapper from "@/components/layouts/shell-wrapper";
import { TechStacksList } from "@/dev-constants/stack";
import { itemVariants, sectionVariants, tightStaggerVariants, VIEWPORT } from "../motion";

const DeveloperStack = () => {
  return (
    <ShellWrapper>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={sectionVariants}
        className="space-y-3 p-2"
      >
        <motion.header variants={itemVariants} className="space-y-2">
          <p className="text-sm  tracking-[0.2em] text-muted-foreground">My Skills</p>
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
            The tools I reach for every day
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            A curated mix of frameworks, runtimes, and services that help me craft reliable,
            performant user experiences across the stack.
          </p>
        </motion.header>

        <motion.div
          variants={tightStaggerVariants}
          className="grid border-l border-t"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))" }}
        >
          {TechStacksList.map(({ name, icon: Icon }) => (
            <motion.div
              key={name}
              variants={itemVariants}
              className="group flex aspect-square flex-col items-center justify-center gap-2 border-r border-b p-2 text-foreground/60 transition-colors hover:text-foreground"
            >
              <Icon className="size-6" />
              <p className="text-sm font-medium">{name}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </ShellWrapper>
  );
};

export default DeveloperStack;
