"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Clock, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ContactForm } from "../../contact/_components/contact-form";
import { DialogTitle } from "@radix-ui/react-dialog";

export const HeroSection = () => {
  return (
    <section className="relative text-center px-4 py-20 border-b border-dashed overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle gradients */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-primary/5 to-emerald-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-gradient-to-l from-blue-500/5 to-emerald-500/5 rounded-full filter blur-3xl"></div>

        {/* Grid pattern with improved mask */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,120,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,120,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_center,black_50%,transparent_90%)]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 space-y-4"
      >
        <h1 className="text-4xl font-bold">
          Let&apos;s Build Something Amazing Together
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-primary to-emerald-500 rounded-full mx-auto"></div>
        <p className="text-muted-foreground">
          Currently available for freelance projects and collaborations
        </p>
        <div className="flex items-center justify-center gap-4">
          <HireMeNow />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Available from March 2024</span>
          </div>
          <div className="flex items-center gap-2"></div>
          <Clock className="h-4 w-4" />
          <span>GMT+5:45 (Nepal Time)</span>
        </div>
      </motion.div>
    </section>
  );
};

export const HireMeNow = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Mail className="h-4 w-4" />
          Hire Me Now
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Me</DialogTitle>
          <DialogDescription>Let&apos;s have a chat!</DialogDescription>
        </DialogHeader>
        <ContactForm />
      </DialogContent>
    </Dialog>
  );
};
