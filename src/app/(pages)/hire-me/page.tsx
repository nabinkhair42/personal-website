"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Clock, Mail } from "lucide-react";
import { benefits, packages, process } from "@/constants/hire";

export default function HireMePage() {
  const openMail = () => {
    window.open("mailto:2yjI4@example.com", "_blank");
  }
  return (
    <main className="container py-16">
      {/* Hero Section with CTA */}
      <section className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold">Let&apos;s Build Something Amazing Together</h1>
          <p className="text-muted-foreground">
            Currently available for freelance projects and collaborations
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="gap-2"
              onClick={openMail}
            >
              <Mail className="h-4 w-4" />
              Hire Me Now
            </Button>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Available from March 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>GMT+5:45 (Nepal Time)</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Service Packages */}
      <section className="mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-center text-3xl font-bold">Service Packages</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
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
                <div className="mt-4 text-sm text-muted-foreground">
                  Timeline: {pkg.timeline}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Work Process */}
      <section className="mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-center text-3xl font-bold">How I Work</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {process.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-2xl bg-card p-6 shadow-lg ring-1 ring-border/50"
              >
                <div className="mb-4 text-4xl text-primary">{index + 1}</div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Why Choose Me */}
      <section className="mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-center text-3xl font-bold">Why Choose Me</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 rounded-2xl bg-card p-6 shadow-lg ring-1 ring-border/50"
              >
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <benefit.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* TODO: TESTIMONIALS */}
    </main>
  );
}