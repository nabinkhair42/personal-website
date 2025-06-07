"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

export const ContactForm = () => {
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

  return (
    <section className="relative px-6 py-20  bg-white dark:bg-zinc-950">
      {/* Minimal geometric pattern */}
      <div className="absolute inset-0 opacity-3 dark:opacity-5">
        <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
      </div>

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
            <span className="text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
              Send Message
            </span>
          </div>
          <h2 className="text-3xl font-light text-zinc-900 dark:text-zinc-100 tracking-tight">
            Start a Conversation
          </h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { id: "name", placeholder: "Your Name", type: "text" },
              { id: "email", placeholder: "Your Email", type: "email" },
            ].map((field, index) => (
              <div 
                key={field.id} 
                className="animate-in fade-in duration-700 slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Input
                  id={field.id}
                  type={field.type}
                  value={formData[field.id as keyof typeof formData]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  required
                  className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors duration-300"
                />
              </div>
            ))}
          </div>

          <div className="animate-in fade-in duration-700 slide-in-from-bottom-4 delay-200">
            <Input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Subject"
              required
              className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors duration-300"
            />
          </div>

          <div className="animate-in fade-in duration-700 slide-in-from-bottom-4 delay-300">
            <Textarea
              id="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your message..."
              rows={6}
              required
              className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors duration-300 resize-none"
            />
          </div>

          <div className="animate-in fade-in duration-700 slide-in-from-bottom-4 delay-400">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 border-0 py-3 font-mono text-sm uppercase tracking-wider transition-all duration-300 group"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  Send Message
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};