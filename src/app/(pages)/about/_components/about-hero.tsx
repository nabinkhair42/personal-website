"use client";

import { aboutMe } from "@/constants/about";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/ui/animated-background";

export const AboutHero = () => {
  return (
    <section className="relative text-center px-4 py-20 border-b border-dashed overflow-hidden">
      {/* Replace static background with animated background */}
      <AnimatedBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto max-w-3xl text-center space-y-6"
      >
        <h1 className="text-4xl font-bold">About Me</h1>
        <div className="h-1 w-20 bg-gradient-to-r from-primary to-emerald-500 rounded-full mx-auto"></div>
        <p className="text-lg text-muted-foreground mt-4">{aboutMe.intro}</p>
        <p className="text-muted-foreground">{aboutMe.description}</p>
      </motion.div>
    </section>
  );
};
