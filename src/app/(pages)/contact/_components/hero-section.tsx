'use client';
import React from 'react';

const ContactHero = () => {
  return (
    <section className="relative px-6 py-24 border-b  border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-50 dark:bg-zinc-900">
      {/* Minimal geometric pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-0 left-0 w-px h-full bg-current"></div>
        <div className="absolute top-0 left-20 w-px h-full bg-current"></div>
        <div className="absolute top-0 left-40 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-40 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-20 w-px h-full bg-current"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-current"></div>
      </div>

      {/* Subtle horizontal lines */}
      <div className="absolute inset-0 opacity-3 dark:opacity-5">
        <div className="absolute top-16 left-0 w-full h-px bg-current"></div>
        <div className="absolute bottom-16 left-0 w-full h-px bg-current"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center animate-in fade-in duration-1000 slide-in-from-bottom-4">
        {/* Section Label */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-in fade-in duration-700 delay-200">
          <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
          <span className="text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
            Let&apos;s Connect
          </span>
          <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-zinc-900 dark:text-zinc-100 mb-8 tracking-tight leading-tight animate-in fade-in duration-700 delay-300">
          Get in
          <br />
          <span className="font-serif italic">Touch</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto animate-in fade-in duration-700 delay-400">
          Have a project in mind or just want to chat? I&apos;d love to hear
          from you. Let&apos;s discuss how we can bring your ideas to life.
        </p>
      </div>

      {/* Minimalist visual elements */}
      <div className="absolute bottom-8 left-8 opacity-20 dark:opacity-30">
        <div className="w-4 h-4 border border-zinc-400 dark:border-zinc-600 rotate-45"></div>
      </div>
      <div className="absolute top-8 right-8 opacity-20 dark:opacity-30">
        <div className="w-6 h-6 border border-zinc-400 dark:border-zinc-600"></div>
      </div>
    </section>
  );
};

export default ContactHero;
