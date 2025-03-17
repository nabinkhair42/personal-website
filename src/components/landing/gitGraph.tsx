"use client";
import { motion } from "framer-motion";
import { GithubGraph } from "@/components/ui/github";
import { FaGithubAlt } from "react-icons/fa";

export function GitGraphUI() {
  return (
    <section className="py-20 border-b border-dashed">
      <div className="flex justify-center">
        <div className="p-4 bg-[#39d353]/10 border border-[#39d353] rounded-full">
          <FaGithubAlt className="text-5xl text-[#39d353]" />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className=" p-8 text-center"
      >
        <h2 className="text-3xl font-bold">
            Building projects and working on projects
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
            Love to code and working on multiple projects.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <GithubGraph
            username="nabinkhair42"
            blockMargin={2}
            colorPallete={[
              "#0d1117",
              "#0e4429",
              "#006d32",
              "#26a641",
              "#39d353",
            ]}
          />
        </div>
      </motion.div>
    </section>
  );
}
