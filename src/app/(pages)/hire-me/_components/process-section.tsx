"use client";

import { process } from "@/constants/hire";
import { motion } from "framer-motion";
import { Search, Lightbulb, Code2, Rocket } from "lucide-react";

const processIcons = [Search, Lightbulb, Code2, Rocket];

export const ProcessSection = () => {
  return (
    <section className="px-4 py-20 border-b">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-center text-3xl font-bold">How I Work</h2>
        <div className="mt-16 flex flex-col gap-8">
          {process.map((step, index) => {
            const Icon = processIcons[index];
            const isLast = index === process.length - 1;
            const isEven = index % 2 === 0;

            return (
              <div key={step.title} className="relative">
                {!isLast && (
                  <div
                    className={`absolute left-[2.4rem] top-16 h-24 w-0.5 bg-gradient-to-b from-primary/50 to-transparent`}
                  />
                )}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-start gap-8 ${
                    isEven ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className="absolute -inset-2 animate-pulse rounded-full bg-primary/20" />
                    <div className="relative rounded-full bg-card p-4 shadow-lg ring-1 ring-border/50">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div
                    className={`flex-1 rounded-2xl bg-card p-6 shadow-lg ring-1 ring-border/50 ${
                      isEven ? "text-left" : "text-right"
                    }`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-primary">
                      <span className="text-sm font-medium">Step {index + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
