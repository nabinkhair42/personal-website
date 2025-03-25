"use client"
import React from 'react'
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/ui/animated-background";

const ContactHero = () => {
    return (
        <section className="relative text-center px-4 py-20 border-b border-dashed overflow-hidden">
            {/* Replace static background with animated background */}
            <AnimatedBackground />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 space-y-4"
            >
                <h1 className="text-4xl font-bold">Get in Touch</h1>
                <div className="h-1 w-20 bg-gradient-to-r from-primary to-emerald-500 rounded-full mx-auto"></div>
                <p className="text-muted-foreground">
                    Have a project in mind or just want to chat? Feel free to reach out!
                </p>
            </motion.div>
        </section>
    )
}

export default ContactHero