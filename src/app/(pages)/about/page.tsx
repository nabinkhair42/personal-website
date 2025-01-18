"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FaGraduationCap,
  FaBriefcase,
  FaCode,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiAmazon,
} from "react-icons/si";
import { Download, ExternalLink } from "lucide-react";
const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const skills = [
    { icon: SiJavascript, name: "JavaScript", color: "text-yellow-500" },
    { icon: SiTypescript, name: "TypeScript", color: "text-blue-600" },
    { icon: SiReact, name: "React", color: "text-cyan-500" },
    { icon: SiNextdotjs, name: "Next.js", color: "text-gray-800" },
    { icon: SiNodedotjs, name: "Node.js", color: "text-green-600" },
    { icon: SiPython, name: "Python", color: "text-yellow-600" },
    { icon: SiDocker, name: "Docker", color: "text-blue-500" },
    { icon: SiAmazon, name: "AWS", color: "text-orange-500" },
  ];

  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      duration: "2021 - Present",
      description:
        "Leading development of enterprise-scale web applications using Next.js, Node.js, and AWS.",
      highlights: [
        "Architected and implemented microservices architecture",
        "Reduced deployment time by 60% through CI/CD optimization",
        "Mentored junior developers and led technical interviews",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      duration: "2019 - 2021",
      description:
        "Developed and maintained multiple client projects using React and Node.js.",
      highlights: [
        "Implemented responsive designs for 20+ client websites",
        "Integrated payment gateways and third-party APIs",
        "Improved site performance by 40% through optimization",
      ],
    },
  ];

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            About Me
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Full Stack Developer passionate about creating elegant solutions to
            complex problems
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Button className="group">
              <Download className="mr-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
              Download Resume
            </Button>

            <Button variant="outline" className="group">
              <ExternalLink className="mr-2 h-4 w-4 group-hover:rotate-45 transition-transform" />
              View Portfolio
            </Button>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            {[
              { icon: FaGithub, href: "https://github.com", label: "GitHub" },
              {
                icon: FaLinkedin,
                href: "https://linkedin.com",
                label: "LinkedIn",
              },
              {
                icon: FaTwitter,
                href: "https://twitter.com",
                label: "Twitter",
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:bg-gray-100 rounded-full transition-colors group"
                whileHover={{ scale: 1.1 }}
                variants={itemVariants}
              >
                <social.icon className="h-6 w-6 text-muted-foreground group-hover:text-blue-600 transition-colors" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.section className="mb-16" variants={itemVariants}>
          <Card className=" backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaCode className="h-5 w-5 text-blue-600" />
                Technical Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg transition-colors group"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <skill.icon
                      className={`h-8 w-8 ${skill.color} group-hover:scale-110 transition-transform`}
                    />
                    <span className="text-sm font-medium text-muted-foreground">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Experience Section */}
        <motion.section className="mb-16" variants={itemVariants}>
          <Card className=" backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaBriefcase className="h-5 w-5 text-blue-600" />
                Professional Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="relative pl-8 pb-8 border-l-2 border-gray-200 last:pb-0"
                    variants={itemVariants}
                  >
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-600" />
                    <div className="group">
                      <h3 className="text-xl font-semibold  group-hover:text-blue-600 transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        {exp.company} • {exp.duration}
                      </p>
                      <p className="text-muted-foreground mb-4">
                        {exp.description}
                      </p>
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, i) => (
                          <motion.li
                            key={i}
                            className="flex items-center gap-2 text-muted-foreground"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                            {highlight}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Education Section */}
        <motion.section variants={itemVariants}>
          <Card className=" backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaGraduationCap className="h-5 w-5 text-blue-600" />
                Education & Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="p-4 rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-lg font-semibold ">
                    BSc in Computer Science
                  </h3>
                  <p className="text-muted-foreground">
                    University of Technology
                  </p>
                  <p className="text-muted-foreground">2014 - 2018</p>
                </motion.div>
                <motion.div
                  className="p-4 rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-lg font-semibold ">
                    AWS Certified Developer
                  </h3>
                  <p className="text-muted-foreground">Amazon Web Services</p>
                  <p className="text-muted-foreground">2022</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default AboutPage;
