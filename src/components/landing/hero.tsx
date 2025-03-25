"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, PenTool, Star } from "lucide-react";
import Link from "next/link";
import { BsFillFilePdfFill } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  const [scrolled, setScrolled] = useState(false);
  
  const clickToScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
      {/* Background elements - keeping these as requested */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle gradients */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-primary/5 to-emerald-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-gradient-to-l from-blue-500/5 to-emerald-500/5 rounded-full filter blur-3xl"></div>
        
        {/* Grid pattern with improved mask - preserved as requested */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,120,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,120,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_center,black_50%,transparent_90%)]"></div>
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            {/* Status indicator */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 border border-emerald-200 dark:border-emerald-800 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-emerald-800 dark:text-emerald-400">Open to Work & Collaborations</span>
            </div>
            
            {/* Enhanced developer profile section */}
            <div className="space-y-3">
              {/* <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-md">Junior</span>
                <h2 className="text-lg font-medium text-muted-foreground">Full Stack Developer</h2>
              </div> */}
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Nabin Khair
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-emerald-500 rounded-full"></div>
            </div>
            
            {/* Enhanced professional introduction */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            I&apos;m a Full-Stack Developer specializing in scalable web applications with Next.js, TypeScript, and cloud platforms. I blend technical expertise with UX-focused design to build high-performance, impactful solutions.
            </p>
            
            {/* Experience and specialization with Lucide icons */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 rounded-full p-1.5">
                  <PenTool className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Experience</span>
                  <span className="font-medium">2+ years in Web development</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 rounded-full p-1.5">
                  <Star className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Specialization</span>
                  <span className="font-medium">Modern web architecture & UI/UX</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/hire-me">
                <Button
                  size="lg"
                  className="group px-5 py-6 bg-primary hover:bg-primary/90 shadow-md font-medium text-lg w-full sm:w-auto"
                >
                  <span className="flex items-center gap-2">
                    Let&apos;s Collaborate
                    <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
              <Link href="/nkhair.cv.pdf" target="_blank" download>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-5 py-6 border-2 hover:bg-muted/20 shadow-md font-medium text-lg w-full sm:w-auto"
                >
                  <BsFillFilePdfFill className="h-5 w-5 mr-2" />
                  Download Resume
                </Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Right Column - Image with redesigned styling */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              {/* Soft glow behind image instead of a border */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 to-emerald-500/5 rounded-full filter blur-xl -z-10"></div>
              
              {/* Clean image without border */}
              <div className="relative overflow-hidden rounded-full shadow-xl">
                <Image
                  src="/nabin.png"
                  alt="Nabin Khair"
                  width={380}
                  height={380}
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Subtle gradient overlays for depth */}
              <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-emerald-500/10 filter blur-2xl"></div>
              <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-primary/10 filter blur-2xl"></div>
              
              {/* Professional badges - repositioned */}
              <div className="absolute top-5 -left-6 bg-card rounded-full py-1.5 px-3 shadow-lg border border-border flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-xs font-medium">Frontend Architect</span>
              </div>
              
              <div className="absolute bottom-5 -right-6 bg-card rounded-full py-1.5 px-3 shadow-lg border border-border flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-medium">Backend Developer</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={clickToScroll}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-sm font-medium">View My Work</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </div>
  );
}
