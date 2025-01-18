"use client";

import { ContactForm } from "./_components/contact-form";
import { ContactInfo } from "./_components/contact-info";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <section className="container relative py-12 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl text-center"
      >
        <h1 className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-4 text-muted-foreground">
          Have a project in mind or just want to chat? Feel free to reach out!
        </p>
      </motion.div>

      <div className="relative mx-auto mt-12 max-w-7xl">
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

        {/* Grid layout that switches order on mobile */}
        <div className="relative grid gap-12 md:grid-cols-[1fr,1.5fr] md:gap-8 lg:gap-12">
          {/* Contact Info - First on mobile, left on desktop */}
          <div className="order-2 md:order-1 md:pt-8">
            <div className="sticky top-24">
              <ContactInfo />
            </div>
          </div>

          {/* Contact Form - First on desktop, second on mobile */}
          <div className="order-1 md:order-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}