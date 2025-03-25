"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine the colors based on theme
  const primaryColor = mounted ? (theme === "dark" ? "rgba(139, 92, 246, 0.03)" : "rgba(139, 92, 246, 0.03)") : "rgba(139, 92, 246, 0.03)";
  const secondaryColor = mounted ? (theme === "dark" ? "rgba(16, 185, 129, 0.03)" : "rgba(16, 185, 129, 0.03)") : "rgba(16, 185, 129, 0.03)";
  const tertiaryColor = mounted ? (theme === "dark" ? "rgba(59, 130, 246, 0.03)" : "rgba(59, 130, 246, 0.03)") : "rgba(59, 130, 246, 0.03)";

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Existing gradients and pattern */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-primary/5 to-emerald-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-gradient-to-l from-blue-500/5 to-emerald-500/5 rounded-full filter blur-3xl"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,120,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,120,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_center,black_50%,transparent_90%)]"></div>
      
      {/* Animated blobs */}
      <motion.div 
        className="absolute rounded-full opacity-70"
        style={{ 
          background: primaryColor,
          top: '20%', 
          left: '30%', 
          width: '40vw', 
          height: '40vw',
          maxWidth: '600px',
          maxHeight: '600px',
          filter: 'blur(80px)'
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.9, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute rounded-full opacity-70"
        style={{ 
          background: secondaryColor,
          bottom: '20%', 
          right: '25%', 
          width: '35vw', 
          height: '35vw',
          maxWidth: '500px',
          maxHeight: '500px',
          filter: 'blur(80px)'
        }}
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -40, 0],
          scale: [1, 0.9, 1.1, 1],
          rotate: [0, -10, 10, 0],
        }}
        transition={{
          duration: 23,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute rounded-full opacity-70"
        style={{ 
          background: tertiaryColor,
          top: '60%', 
          left: '15%', 
          width: '25vw', 
          height: '25vw',
          maxWidth: '400px',
          maxHeight: '400px',
          filter: 'blur(70px)'
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -20, 50, 0],
          scale: [1, 1.05, 0.95, 1],
          rotate: [0, 15, -15, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
