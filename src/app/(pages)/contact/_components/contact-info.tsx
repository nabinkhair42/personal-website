"use client";

import { contactInfo, socialLinks } from "@/constants/contact";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const ContactInfo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-12 px-4 py-16">
      <motion.div
        style={{
          transform: isInView ? "none" : "translateY(20px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)",
        }}
      >
        <div className="flex flex-col gap-8">
          {contactInfo.map((info, index) => (
            <motion.a
              href={info.link}
              key={index}
              className="group flex items-center gap-4"
              whileHover={{ x: 10 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 shadow-inner transition-colors group-hover:bg-primary/20">
                <info.icon className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  {info.title}
                </span>
                <span className="mt-1 font-medium tracking-wide text-foreground/90 transition-colors group-hover:text-primary">
                  {info.value}
                </span>
                <motion.div
                  className="h-px w-0 bg-primary"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      <motion.div
        style={{
          transform: isInView ? "none" : "translateY(20px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
        }}
      >
        <h3 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Social Links
        </h3>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-primary/50 via-primary/25 to-primary/50 opacity-0 blur transition duration-500 group-hover:opacity-100" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-background shadow-lg ring-1 ring-border/50">
                <social.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="sr-only">{social.name}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
