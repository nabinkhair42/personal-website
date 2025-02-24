"use client";

import { Button } from "@/components/ui/button";
import { motion, useAnimate } from "framer-motion";
import { Download, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useRef, useState } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scope, animate] = useAnimate();
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 25;
    const y = (clientY - top - height / 2) / 25;
    setMousePosition({ x, y });
  };

  const handleNameClick = async () => {
    await animate(scope.current, { scale: 0.95 }, { duration: 0.1 });
    await animate(scope.current, { scale: 1 }, { duration: 0.1 });
    
    // Create sparkle effect
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sparkles = Array.from({ length: 5 }).map((_, i) => {
      const sparkle = document.createElement("div");
      sparkle.className = "absolute w-2 h-2 bg-primary rounded-full";
      sparkle.style.left = `${50 + Math.random() * 20 - 10}%`;
      sparkle.style.top = `${50 + Math.random() * 20 - 10}%`;
      return sparkle;
    });

    sparkles.forEach((sparkle, i) => {
      scope.current?.appendChild(sparkle);
      animate(
        sparkle,
        {
          opacity: [1, 0],
          y: [-20 - i * 10, -40 - i * 10],
          x: [0, (i - 2) * 20],
        },
        {
          duration: 0.6,
          ease: "easeOut",
          onComplete: () => sparkle.remove(),
        }
      );
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden perspective-1000"
      onMouseMove={handleMouseMove}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10">
        <div className="grid grid-cols-6 grid-rows-6 h-full w-full">
          {[...Array(36)].map((_, i) => (
            <motion.div
              key={i}
              className="border border-primary/5 backdrop-blur-sm"
              animate={{
                backgroundColor: `rgba(var(--primary), ${0.01 + Math.abs(Math.sin(i * 0.1 + mousePosition.x * 0.1)) * 0.05})`,
                scale: 1 + Math.abs(Math.cos(i * 0.1 + mousePosition.y * 0.1)) * 0.05,
              }}
              whileHover={{
                backgroundColor: "rgba(var(--primary), 0.1)",
              }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          ))}
        </div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="relative z-10 flex flex-col items-center gap-8">
          {/* Availability Badge */}
          <motion.div
            className="relative cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <Badge 
              variant="secondary" 
              className="group relative overflow-hidden px-4 py-2"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Available for Freelance Projects
              </span>
            </Badge>
          </motion.div>

          {/* Name Section */}
          <motion.div
            ref={scope}
            style={{
              rotateX: mousePosition.y,
              rotateY: mousePosition.x,
            }}
            className="space-y-4 text-center cursor-pointer"
            onClick={handleNameClick}
          >
            <h1 className="text-4xl font-bold sm:text-6xl md:text-7xl tracking-tight">
              Hi 👋, I&apos;m{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Nabin Khair</span>
                <motion.span
                  className="absolute -inset-2 bg-primary/10 rounded-lg -z-10"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.98, 1.02, 0.98],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <div className="relative max-w-2xl text-center">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Crafting digital experiences that blend creativity with functionality. 
              Transforming ideas into elegant solutions.
            </p>
            
            <motion.div
              className="absolute -bottom-4 left-1/2 h-px w-24 bg-primary"
              initial={{ width: 0, left: "50%", x: "-50%" }}
              animate={{ width: 96 }}
              whileHover={{ width: 120 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/hire-me">
              <Button 
                size="lg" 
                className="group relative px-8 py-6 overflow-hidden border-2 border-primary hover:border-primary/80 transition-colors"
              >
                <motion.div
                  className="absolute inset-0 bg-primary/10"
                  initial={{ y: "100%" }}
                  whileHover={{ y: "0%" }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
                <span className="relative z-10 flex items-center gap-2 text-lg font-medium group-hover:translate-x-1 transition-transform">
                  Let&apos;s Collaborate
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Button>
            </Link>
            <Link href="/nkhair.cv.pdf" target="_blank" download>
              <Button 
                variant="outline" 
                size="lg"
                className="group relative px-8 py-6 overflow-hidden border-2 hover:text-primary transition-all hover:shadow-[inset_0_0_0_2px_hsl(var(--primary))]"
              >
                <span className="relative z-10 flex items-center gap-2 text-lg font-medium group-hover:translate-y-[-2px] transition-transform">
                  Download Resume
                  <Download className="h-5 w-5" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
