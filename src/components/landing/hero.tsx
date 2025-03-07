"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ChevronDown } from 'lucide-react';
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { BsFillFilePdfFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const clickToScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  }

  // Handle scroll effect for the scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with Gradient and Blur */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-background/80">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-6 grid-rows-6 h-full w-full"
        >
          {[...Array(36)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: i * 0.01,
                ease: "easeInOut"
              }}
              className="border border-primary/5 backdrop-blur-sm hover:bg-primary/10 transition-colors duration-300"
            />
          ))}
        </motion.div>
      </div>

      <div className="container px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center gap-8"
        >
          {/* Availability Badge with Animation */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative"
          >
            <Badge 
              variant="secondary" 
              className="px-4 py-2 shadow-sm"
            >
              <motion.span 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 2 
                }}
                className="flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                Available for Full-Time Projects
              </motion.span>
            </Badge>
          </motion.div>

          {/* Name Section with Enhanced Animation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-4 text-center"
          >
            <h1 className="text-4xl font-bold sm:text-6xl md:text-7xl tracking-tight">
              Hi{" "}
              <motion.span
                animate={{ rotate: [0, 20, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 1.5,
                  repeatDelay: 2
                }}
                className="inline-block"
              >
                👋
              </motion.span>
              , I&apos;m{" "}
              <motion.span 
                className="relative inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  Nabin Khair
                </span>
                <motion.div
                  initial={{ rotate: -5 }}
                  animate={{ rotate: 5 }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 2 
                  }}
                >
                  <Image 
                    src="/nabin.png" 
                    alt="Nabin Khair" 
                    width={100} 
                    height={100} 
                    quality={100}
                    className="rounded-full border-2 border-primary/20 shadow-lg"
                  />
                </motion.div>
                <motion.span
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 2 
                  }}
                  className="absolute -inset-2"
                />
              </motion.span>
            </h1>
          </motion.div>

          {/* Description with Animated Underline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="relative max-w-2xl text-center"
          >
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Crafting digital experiences that blend creativity with functionality. 
              Transforming ideas into elegant solutions.
            </p>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute -bottom-4 left-1/2 h-1 bg-gradient-to-r from-primary/50 to-primary rounded-full transform -translate-x-1/2"
            />
          </motion.div>

          {/* CTA Buttons with Hover Effects */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/hire-me">
                <Button 
                  size="lg" 
                  className="px-8 py-6 border-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-md"
                >
                  <span className="flex items-center gap-2 text-lg font-medium">
                    <FaUserFriends className="h-5 w-5" />
                    Let&apos;s Collaborate
                  </span>
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/nkhair.cv.pdf" target="_blank" download>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-6 border-2 backdrop-blur-sm hover:bg-primary/10 shadow-md"
                >
                  <span className="flex items-center gap-2 text-lg font-medium">
                    <BsFillFilePdfFill className="h-5 w-5" />
                    Download Resume
                  </span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
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
            duration: 1.5 
          }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-sm">Scroll Down</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </div>
  );
}
