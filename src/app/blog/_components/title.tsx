"use client";

import { BlogMdxFrontmatter } from "@/lib/markdown";
import { Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import ViewCounter from "./view-counter";
import { formatDate } from "@/lib/utils";
import { ShareButton } from "./share";
import ReactionButton from "./reaction";

interface TitleProps {
  formatter: BlogMdxFrontmatter;
  slug: string;
  currentURL: string;
}

export const Title = ({ formatter, slug, currentURL }: TitleProps) => {
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
            Article
          </span>
          <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-700"></div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-zinc-900 dark:text-zinc-100 mb-8 tracking-tight leading-tight animate-in fade-in duration-700 delay-300">
          {formatter.title}
        </h1>

        {/* Accent Line */}
        <div className="w-20 h-1 bg-zinc-900 dark:bg-zinc-100 mx-auto mb-8 animate-in fade-in duration-700 delay-400"></div>
        
        {/* Meta Information */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm text-zinc-600 dark:text-zinc-400 animate-in fade-in duration-700 delay-500">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="font-mono">{formatDate(formatter.date)}</span>
          </div>
          <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700"></div>
          <ViewCounter slug={slug} />
        </div>

        {/* Authors */}
        <div className="flex items-center justify-center gap-6 mb-8 animate-in fade-in duration-700 delay-600">
          {formatter.authors.map((author, index) => (
            <Link
              href={author.handleUrl}
              key={index}
              className="group flex items-center gap-3 transition-all duration-300 hover:scale-105"
            >
              <Avatar className="w-12 h-12 border-2 border-zinc-200 dark:border-zinc-800 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-colors duration-300">
                <AvatarImage src={author.avatar} />
                <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {author.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <div className="font-light text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors duration-300">
                  {author.username}
                </div>
                <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                  @{author.handle}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4 mb-12 animate-in fade-in duration-700 delay-700">
          <ShareButton currentURL={currentURL} formatter={formatter} />
        </div>

        {/* Reactions */}
        <div className="animate-in fade-in duration-700 delay-800">
          <ReactionButton
            slug={slug}
            title="How did you find this article?"
            description="Your feedback helps us improve our content"
          />
        </div>
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