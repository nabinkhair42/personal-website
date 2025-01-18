"use client";

import { aboutMe } from "@/constants/about";
import { motion } from "framer-motion";

export const AboutHero = () => {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <h1 className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
          About Me
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {aboutMe.intro}
        </p>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {aboutMe.description}
        </p>
      </motion.div>

      <motion.div
        className="absolute -top-24 left-0 right-0 z-0 flex justify-center opacity-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="h-[350px] w-[350px] rounded-full bg-gradient-to-r from-primary to-primary-foreground blur-3xl" />
      </motion.div>
    </div>
  );
};
