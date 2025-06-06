"use client";

import { testimonials } from "@/constants/testimonials";
import { TestimonialSkeleton } from "@/components/ui/ui-extend/testimonial-skeleton";
import { Quote } from "lucide-react";

export const TestimonialsSection = () => {
  return (
    <section className="relative px-6 py-20 border-b border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
      {/* Minimal geometric pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
        <div className="absolute top-0 left-20 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-20 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Quote className="w-5 h-5 text-zinc-400 dark:text-zinc-600" />
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
            <span className="text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
              Client Testimonials
            </span>
            <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
            <Quote className="w-5 h-5 text-zinc-400 dark:text-zinc-600 rotate-180" />
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-zinc-900 dark:text-zinc-100 mb-6 tracking-tight">
            What Clients
            <br />
            <span className="font-serif italic">Say About Me</span>
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
            Currently collecting testimonials from the clients I have worked with,
            so please hold on for their valuable feedback.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="animate-in fade-in duration-700 slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <TestimonialSkeleton />
            </div>
          ))}
        </div>

        {/* Coming Soon Note */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full">
            <div className="w-2 h-2 bg-zinc-400 dark:bg-zinc-600 rounded-full animate-pulse"></div>
            <span className="text-sm text-zinc-600 dark:text-zinc-400 font-mono uppercase tracking-wide">
              Real testimonials coming soon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};