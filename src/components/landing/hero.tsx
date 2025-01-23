"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

export function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center space-y-8 text-center border-b"
    >
      <div className="space-y-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold sm:text-6xl">
          Hi, I&apos;m{" "}
          <span>
            Nabin Khair
          </span>
        </h1>
        <h2 className="text-xl font-medium bg-secondary w-fit px-4 py-2 min-w-[14rem]">
          <TypeAnimation
            sequence={[
              "Next.js Developer", 2000,
              "MERN Stack Developer",
              2000,
              "Cloud Enthusiast",
              2000,
              "UI/UX Specialist",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h2>
        <p className="mx-auto max-w-[42rem] text-muted-foreground">
          Building scalable and user-friendly applications using modern web technologies. Passionate about delivering high-quality solutions and exploring emerging tech trends.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link href="/hire-me">
          <Button size="lg" className="gap-2">
            <Mail className="h-4 w-4" />
            Let&apos;s Collaborate
          </Button>
        </Link>
        <Link href="/nkhair.cv.pdf" target="_blank" download>
          <Button variant="outline" size="lg" className="gap-2">
            <Download className="h-4 w-4" />
            Download Resume
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
