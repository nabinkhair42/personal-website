"use client";

import { aboutMe } from "@/constants/about";
import { motion } from "framer-motion";

export const AboutHero = () => {
  return (
    <section className="text-center px-4 py-20 border-b border-dashed">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <h1 className="text-4xl font-bold">
          About Me
        </h1>
        <p className="text-muted-foreground">
          {aboutMe.intro}
        </p>
        <p className="text-muted-foreground">
          {aboutMe.description}
        </p>
      </motion.div>
    </section>
  );
};
