"use client"
import React from 'react'
import { motion } from "framer-motion";
const ContactHero = () => {
    return (
        <section className="text-center px-4 py-20 border-b">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
            >
                <h1 className="text-4xl font-bold">Get in Touch
                </h1>
                <p className="text-muted-foreground">
                    Have a project in mind or just want to chat? Feel free to reach out!
                </p>
            </motion.div>
        </section>
    )
}

export default ContactHero