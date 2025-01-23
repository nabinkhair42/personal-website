"use client";

import { achievements } from "@/constants/about";
import { motion } from "framer-motion";

export const AchievementsSection = () => {
  return (
    <section className="py-16 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center text-3xl font-bold"
      >
        Achievements
      </motion.h2>

      <div className="relative mt-16">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/50 via-primary/10 to-primary/50 md:left-1/2" />

        {/* Achievement Items */}
        <div className="space-y-16">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col gap-8 md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
              >
                {/* Achievement Content */}
                <div
                  className={`flex w-full items-center gap-8 md:w-1/2 ${index % 2 === 0 ? "md:justify-start md:mr-8" : "md:justify-end md:ml-8"
                    }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 z-10 h-4 w-4 rounded-full bg-gradient-to-br from-primary to-primary-foreground shadow-lg md:left-1/2 md:-translate-x-1/2">
                    <div className="absolute -inset-2 animate-ping rounded-full bg-primary/20" />
                  </div>

                  {/* Content Box */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-card to-card/80 p-6  ring-1 ring-border/50 transition-all hover:shadow-xl hover:ring-primary/50 md:max-w-md"
                  >
                    <div className="mb-4 flex items-start gap-4">
                      <div className="rounded-xl bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold">
                        {achievement.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-muted-foreground">
                      {achievement.description}
                    </p>

                    {/* Animated gradient overlay */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0"
                      animate={{
                        x: ["0%", "200%"],
                      }}

                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
