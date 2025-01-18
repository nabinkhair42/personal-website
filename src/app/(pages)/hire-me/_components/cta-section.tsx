"use client";

import { motion } from "framer-motion";
import { ScrollToContact } from "./scroll-to-contact";

export const CTASection = () => {
  return (
    <section className="mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="rounded-2xl bg-card p-8 text-center shadow-lg ring-1 ring-border/50"
      >
        <h2 className="text-3xl font-bold">Ready to Start Your Project?</h2>
        <p className="mt-4 text-muted-foreground">
          Let&apos;s discuss your project requirements and create something amazing together.
        </p>
        <ScrollToContact />
      </motion.div>
    </section>
  );
};
