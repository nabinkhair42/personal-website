"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Code, Database, Server } from 'lucide-react';
import { skillsData, socialLinks } from '@/constants';

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const SkillBar = ({ name, level }: { name: string; level: number }) => (
    <div className="mb-4">
        <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">{name}</span>
            <span className="text-sm text-muted-foreground">{level}%</span>
        </div>
        <motion.div
            className="h-2  rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <motion.div
                className="h-full bg-blue-600 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />
        </motion.div>
    </div>
);

const HireMePage = () => {
    return (
        <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <motion.div
                    className="text-center mb-16"
                    initial="initial"
                    animate="animate"
                    variants={fadeIn}
                >
                    <motion.h1
                        className="text-6xl font-bold  mb-4"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        Full Stack Developer
                    </motion.h1>
                    <motion.p
                        className="text-xl text-muted-foreground mb-8"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        Crafting exceptional digital experiences with modern technologies
                    </motion.p>
                    <motion.div
                        className="flex justify-center gap-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <Button
                            className="flex items-center gap-2 hover:scale-105 transition-transform"
                            asChild
                        >
                            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                                <Github className="h-5 w-5" />
                                View GitHub
                            </a>
                        </Button>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2 hover:scale-105 transition-transform"
                            asChild
                        >
                            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                                <Linkedin className="h-5 w-5" />
                                LinkedIn Profile
                            </a>
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Skills Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {Object.entries(skillsData).map(([key, section], index) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Card className="hover:shadow-lg transition-shadow duration-300">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        {key === 'frontend' && <Code className="h-5 w-5" />}
                                        {key === 'backend' && <Server className="h-5 w-5" />}
                                        {key === 'database' && <Database className="h-5 w-5" />}
                                        {section.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {section.skills.map((skill) => (
                                        <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Card className="mb-16">
                        <CardHeader>
                            <CardTitle className="text-2xl">Ready to Start Your Next Project?</CardTitle>
                            <p className="text-muted-foreground mt-2">
                                Let&apos;s collaborate to bring your ideas to life with cutting-edge technology
                            </p>
                        </CardHeader>
                        <CardContent>
                            <Button
                                size="lg"
                                variant="secondary"
                                className="hover:scale-105 transition-transform"
                            >
                                Schedule a Free Consultation
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default HireMePage;