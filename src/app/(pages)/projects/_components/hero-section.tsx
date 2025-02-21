"use client"
import React from 'react'
import { motion } from "framer-motion";
const ProjectHero = () => {
    return (
        <section className="text-center px-4 py-20 border-b border-dashed">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
            >
                <h1 className="text-4xl font-bold">My Projects
                </h1>
                <p className="text-muted-foreground">
                    A collection of my projects, ranging from web applications to browser extensions. Each project showcases different skills and technologies.
                </p>
            </motion.div>
        </section>
    )
}

export default ProjectHero