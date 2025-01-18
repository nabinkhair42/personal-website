"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Link from "next/link";

export function ContactCTA() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="rounded-2xl bg-card p-8 text-center shadow-lg ring-1 ring-border/50"
      >
        <h2 className="text-3xl font-bold">Let&apos;s Work Together</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          I&apos;m currently available for freelance projects and full-time
          opportunities. If you&apos;re interested in working together, let&apos;s
          have a chat!
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/contact">
            <Button size="lg" className="gap-2">
              <Mail className="h-4 w-4" />
              Get in Touch
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
