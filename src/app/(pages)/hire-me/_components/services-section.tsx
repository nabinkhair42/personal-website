"use client";
import { packages } from "@/constants/hire";
import { motion } from "framer-motion";

export const ServicesSection = () => {
  return (
    <section className="mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-col items-center"
      >
        <h2 className="text-center text-3xl font-bold mb-8">Service Packages</h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 w-full max-w-3xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-card p-6 shadow-lg ring-1 ring-border/50"
            >
              <div className="mb-4 text-4xl">{pkg.icon}</div>
              <h3 className="mb-2 text-xl font-semibold">{pkg.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{pkg.description}</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
