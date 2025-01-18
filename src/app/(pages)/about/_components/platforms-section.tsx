"use client";

import { platforms } from "@/constants/about";
import { motion } from "framer-motion";
import { IconType } from "react-icons";

export const PlatformsSection = () => {
  return (
    <section className="py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center text-3xl font-bold"
      >
        Cloud Platforms
      </motion.h2>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {platforms.map((platform, index) => {
          const Icon = platform.icon as IconType;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-lg ring-1 ring-border/50 transition-all hover:shadow-xl hover:ring-primary/50"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{platform.name}</h3>
              </div>

              <ul className="mt-6 grid gap-3">
                {platform.services.map((service, serviceIndex) => (
                  <motion.li
                    key={serviceIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1 + serviceIndex * 0.1,
                    }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                    {service}
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0"
                animate={{
                  x: ["0%", "200%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
