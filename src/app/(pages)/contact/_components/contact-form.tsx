"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { toast } from "sonner";

export const ContactForm = () => {
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true });
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={formRef}
      style={{
        transform: isInView ? "none" : "translateY(50px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
      }}
    >
      <motion.form
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-2xl space-y-8"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { id: "name", placeholder: "Your Name", type: "text" },
            { id: "email", placeholder: "Your Email", type: "email" },
          ].map((field) => (
            <motion.div key={field.id} variants={item} className="relative">
              <Input
                id={field.id}
                type={field.type}
                value={formData[field.id as keyof typeof formData]}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                className={`h-14 border-none bg-card px-6 shadow-lg transition-all duration-300 placeholder:text-muted-foreground/50 ${
                  focusedInput === field.id
                    ? "shadow-xl shadow-primary/20 ring-2 ring-primary"
                    : "ring-1 ring-border hover:ring-2 hover:ring-primary/50"
                }`}
                onFocus={() => setFocusedInput(field.id)}
                onBlur={() => setFocusedInput(null)}
                required
              />
              <motion.div
                className="absolute -bottom-1 left-2 right-2 h-px bg-gradient-to-r from-primary/50 via-primary to-primary/50"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: focusedInput === field.id ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div variants={item} className="relative">
          <Input
            id="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Subject"
            className={`h-14 border-none bg-card px-6 shadow-lg transition-all duration-300 placeholder:text-muted-foreground/50 ${
              focusedInput === "subject"
                ? "shadow-xl shadow-primary/20 ring-2 ring-primary"
                : "ring-1 ring-border hover:ring-2 hover:ring-primary/50"
            }`}
            onFocus={() => setFocusedInput("subject")}
            onBlur={() => setFocusedInput(null)}
            required
          />
          <motion.div
            className="absolute -bottom-1 left-2 right-2 h-px bg-gradient-to-r from-primary/50 via-primary to-primary/50"
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: focusedInput === "subject" ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>

        <motion.div variants={item} className="relative">
          <Textarea
            id="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your Message"
            className={`min-h-[200px] border-none bg-card p-6 shadow-lg transition-all duration-300 placeholder:text-muted-foreground/50 ${
              focusedInput === "message"
                ? "shadow-xl shadow-primary/20 ring-2 ring-primary"
                : "ring-1 ring-border hover:ring-2 hover:ring-primary/50"
            }`}
            onFocus={() => setFocusedInput("message")}
            onBlur={() => setFocusedInput(null)}
            required
          />
          <motion.div
            className="absolute -bottom-1 left-2 right-2 h-px bg-gradient-to-r from-primary/50 via-primary to-primary/50"
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: focusedInput === "message" ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>

        <motion.div variants={item}>
          <Button
            type="submit"
            disabled={isLoading}
            className="group relative h-14 w-full overflow-hidden bg-primary font-medium"
          >
            <motion.span
              className="absolute inset-0 z-0 bg-gradient-to-r from-primary-foreground/0 via-primary-foreground/10 to-primary-foreground/0"
              animate={{
                x: ["0%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? "Sending..." : "Send Message"}
              <FiSend className="transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};
