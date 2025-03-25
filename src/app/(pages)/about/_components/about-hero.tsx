"use client";

import { aboutMe } from "@/constants/about";
import { motion } from "framer-motion";

export const AboutHero = () => {
  return (
    <section className="relative text-center px-4 py-20 border-b border-dashed overflow-hidden">
      {/* Background elements - adding the same gradient and pattern as in hero.tsx */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle gradients */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-primary/5 to-emerald-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-gradient-to-l from-blue-500/5 to-emerald-500/5 rounded-full filter blur-3xl"></div>
        
        {/* Grid pattern with improved mask */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,120,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,120,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_center,black_50%,transparent_90%)]"></div>
      </div>
      
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
