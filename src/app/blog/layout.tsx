"use client";
import { PropsWithChildren } from "react";
import { motion } from "framer-motion";
export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <div className="max-w-5xl flex flex-col justify-center mx-auto px-6 items-start  pt-8 pb-10 w-full relative py-12 md:py-24">
      {/* Background Elements */}
      <motion.div
        className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      {children}
    </div>
  );
}
