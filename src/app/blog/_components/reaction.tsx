'use client';

import { useState, useEffect, useCallback } from 'react';
import { updateBlogReaction, getBlogMetrics } from '@/lib/blog-metrics';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ReactionProps {
  slug: string;
}

interface Reactions {
  [key: string]: number;
}

const EMOJI_LIST = [
  { emoji: '👍', label: 'Like' },
  { emoji: '❤️', label: 'Love' },
  { emoji: '🎉', label: 'Celebrate' },
  { emoji: '🤔', label: 'Thinking' },
  { emoji: '👏', label: 'Clap' },
  { emoji: '🔥', label: 'Fire' },
];

const STORAGE_KEY = 'blog-reactions';

const emojiButtonVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

export default function ReactionButton({ slug }: ReactionProps) {
  const [reactions, setReactions] = useState<Reactions>({});
  const [loading, setLoading] = useState(false);
  const [activeEmoji, setActiveEmoji] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userReaction, setUserReaction] = useState<string | null>(null);

  const loadReactions = useCallback(async () => {
    try {
      // Load user's previous reaction first (this is fast as it's local)
      const savedReactions = localStorage.getItem(STORAGE_KEY);
      if (savedReactions) {
        const reactions = JSON.parse(savedReactions);
        setUserReaction(reactions[slug] || null);
      }

      // Then load reaction metrics
      const metrics = await getBlogMetrics(slug);
      if (metrics?.reactions) {
        setReactions(metrics.reactions);
      }
    } catch (err) {
      console.error('Error initializing reactions:', err);
      setError('Failed to load reactions');
    }
  }, [slug]);

  useEffect(() => {
    loadReactions();
  }, [loadReactions]);

  const saveUserReaction = (emoji: string | null) => {
    const savedReactions = localStorage.getItem(STORAGE_KEY);
    const reactions = savedReactions ? JSON.parse(savedReactions) : {};
    if (emoji) {
      reactions[slug] = emoji;
    } else {
      delete reactions[slug];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reactions));
    setUserReaction(emoji);
  };

  const handleReaction = async (emoji: string) => {
    if (loading) return;

    setLoading(true);
    setActiveEmoji(emoji);
    setError(null);

    const previousReactions = { ...reactions };
    const previousUserReaction = userReaction;

    try {
      // Optimistic update
      const isRemoving = userReaction === emoji;
      const newReactions = { ...reactions };
      
      if (isRemoving) {
        newReactions[emoji] = Math.max(0, (newReactions[emoji] || 0) - 1);
        setUserReaction(null);
      } else {
        if (userReaction) {
          newReactions[userReaction] = Math.max(0, (newReactions[userReaction] || 0) - 1);
        }
        newReactions[emoji] = (newReactions[emoji] || 0) + 1;
        setUserReaction(emoji);
      }
      setReactions(newReactions);

      // Server update
      if (isRemoving) {
        const updatedMetrics = await updateBlogReaction(slug, emoji, 'remove');
        if (updatedMetrics?.reactions) {
          setReactions(updatedMetrics.reactions);
          saveUserReaction(null);
        }
      } else {
        if (userReaction) {
          await updateBlogReaction(slug, userReaction, 'remove');
        }
        const updatedMetrics = await updateBlogReaction(slug, emoji, 'add');
        if (updatedMetrics?.reactions) {
          setReactions(updatedMetrics.reactions);
          saveUserReaction(emoji);
        }
      }
    } catch (err) {
      // Revert on error
      setReactions(previousReactions);
      setUserReaction(previousUserReaction);
      setError('Failed to update reaction');
      console.error('Failed to update reaction:', err);
    }

    setLoading(false);
    setActiveEmoji(null);
  };

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto py-2">
        <div className="text-sm text-destructive text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-6">
      <div className="flex flex-col items-center space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">
          How did you find this article?
        </h4>
        
        <div className="flex flex-wrap gap-3 justify-center">
          {EMOJI_LIST.map(({ emoji, label }) => {
            const count = reactions[emoji] || 0;
            const isActive = userReaction === emoji;
            
            return (
              <motion.div
                key={emoji}
                variants={emojiButtonVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover="hover"
                whileTap="tap"
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleReaction(emoji)}
                  disabled={loading && activeEmoji !== emoji}
                  className={cn(
                    "relative group transition-colors duration-200",
                    loading && activeEmoji === emoji && "animate-pulse",
                    isActive && "shadow-md"
                  )}
                >
                  <span className="text-xl mr-2">{emoji}</span>
                  <span className={cn(
                    "text-sm font-medium min-w-[1rem] text-center",
                    isActive ? "text-primary-foreground" : "text-muted-foreground"
                  )}>
                    {count}
                  </span>
                  <span className="sr-only">{label}</span>
                  
                  {/* Enhanced Tooltip */}
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-popover/95 text-popover-foreground rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm border whitespace-nowrap z-10">
                    {label}
                  </span>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
