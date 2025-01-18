"use client";

import { education } from "@/constants/about";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

export const EducationSection = () => {
  return (
    <section className="py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center text-3xl font-bold"
      >
        Education
      </motion.h2>

      <div className="relative mt-12">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/50 via-primary/10 to-primary/50 md:left-1/2" />

        <div className="space-y-12">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex flex-col gap-4 md:flex-row ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex w-full items-center gap-4 md:w-1/2 ${
                  index % 2 === 0 ? "md:justify-start md:mr-8" : "md:justify-end md:ml-8"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 z-10 h-4 w-4 rounded-full bg-gradient-to-br from-primary to-primary-foreground shadow-lg md:left-1/2 md:-translate-x-1/2">
                  <div className="absolute -inset-2 animate-ping rounded-full bg-primary/20" />
                </div>

                <div className="w-full rounded-2xl bg-card p-6 shadow-lg ring-1 ring-border/50 transition-all hover:shadow-xl hover:ring-primary/50 md:max-w-md">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                  </div>

                  <div className="mt-4 flex flex-col gap-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{edu.institution}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {edu.duration}
                        {edu.current && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            Current
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
