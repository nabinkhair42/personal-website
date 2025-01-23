"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Clock, Mail } from "lucide-react";

export const HeroSection = () => {
  const openMail = () => {
    window.open("mailto:nabinkhair12@gmail.com", "_blank");
  }
  return (
    <section className="text-center px-4 py-20 border-b">
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
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
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
  );
};
