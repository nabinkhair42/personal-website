'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { updateBlogReaction, getBlogMetrics } from '@/lib/blog-metrics';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Info, TrendingUp, Users } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReactionProps {
  slug: string;
  title?: string;
  description?: string;
  showStats?: boolean;
  className?: string;
}

interface Reactions {
  [key: string]: number;
}

const EMOJI_LIST = [
  { emoji: '👍', label: 'Like', color: 'bg-blue-50 dark:bg-blue-950' },
  { emoji: '❤️', label: 'Love', color: 'bg-red-50 dark:bg-red-950' },
  { emoji: '🎉', label: 'Celebrate', color: 'bg-yellow-50 dark:bg-yellow-950' },
  { emoji: '🤔', label: 'Thinking', color: 'bg-purple-50 dark:bg-purple-950' },
  { emoji: '👏', label: 'Clap', color: 'bg-green-50 dark:bg-green-950' },
  { emoji: '🔥', label: 'Fire', color: 'bg-orange-50 dark:bg-orange-950' },
];

const STORAGE_KEY = 'blog-reactions';

const emojiButtonVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
  hover: { scale: 1.1 },
  tap: { scale: 0.95 }
};

const countVariants = {
  initial: { opacity: 0, y: -5 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 5 }
};

export default function ReactionButton({ 
  slug, 
  title = "How did you find this article?", 
  description,
  showStats = true,
  className
}: ReactionProps) {
  const [reactions, setReactions] = useState<Reactions>({});
  const [loading, setLoading] = useState(true);
  const [activeEmoji, setActiveEmoji] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [totalReactions, setTotalReactions] = useState(0);
  const [topReaction, setTopReaction] = useState<{emoji: string, count: number} | null>(null);
  const confettiRef = useRef<HTMLDivElement>(null);
  const [recentlyChanged, setRecentlyChanged] = useState<string | null>(null);

  // Add client-side cache for metrics
  const clientCache = useRef<{[key: string]: {data: { reactions?: { [key: string]: number } }, timestamp: number}}>({});
  const CACHE_TTL = 60 * 1000; // 60 seconds cache

  const loadReactions = useCallback(async () => {
    try {
      // Load user's previous reaction first (this is fast as it's local)
      const savedReactions = localStorage.getItem(STORAGE_KEY);
      if (savedReactions) {
        const reactions = JSON.parse(savedReactions);
        setUserReaction(reactions[slug] || null);
      }

      // Check client cache first
      const now = Date.now();
      const cachedData = clientCache.current[slug];
      
      if (cachedData && (now - cachedData.timestamp) < CACHE_TTL) {
        const metrics = cachedData.data;
        if (metrics?.reactions) {
          setReactions(metrics.reactions);
          
          // Calculate total reactions and top reaction
          let total = 0;
          let top = { emoji: '', count: 0 };
          
          Object.entries(metrics.reactions).forEach(([emoji, count]) => {
            total += count as number;
            if ((count as number) > top.count) {
              top = { emoji, count: count as number };
            }
          });
          
          setTotalReactions(total);
          if (top.count > 0) {
            setTopReaction(top);
          }
        }
        setLoading(false);
        return;
      }

      // Then load reaction metrics from server
      const metrics = await getBlogMetrics(slug);
      
      // Update client cache
      clientCache.current[slug] = {
        data: metrics,
        timestamp: now
      };
      
      if (metrics?.reactions) {
        setReactions(metrics.reactions);
        
        // Calculate total reactions and top reaction
        let total = 0;
        let top = { emoji: '', count: 0 };
        
        Object.entries(metrics.reactions).forEach(([emoji, count]) => {
          total += count as number;
          if ((count as number) > top.count) {
            top = { emoji, count: count as number };
          }
        });
        
        setTotalReactions(total);
        if (top.count > 0) {
          setTopReaction(top);
        }
      }
      setLoading(false);
    } catch (err) {
      console.error('Error initializing reactions:', err);
      setError('Failed to load reactions');
      setLoading(false);
    }
  }, [slug, CACHE_TTL]);

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

  const triggerConfetti = () => {
    if (!confettiRef.current) return;
    
    const rect = confettiRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    // Convert to percentage of window
    const xPercent = x / window.innerWidth;
    const yPercent = y / window.innerHeight;
    
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { x: xPercent, y: yPercent },
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
      disableForReducedMotion: true
    });
  };

  const handleReaction = async (emoji: string) => {
    if (loading && activeEmoji) return;

    setActiveEmoji(emoji);
    setError(null);

    const previousReactions = { ...reactions };
    const previousUserReaction = userReaction;
    const isRemoving = userReaction === emoji;

    // If not removing, trigger confetti
    if (!isRemoving) {
      triggerConfetti();
    }

    try {
      // Optimistic update
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
      
      // Update total and top reaction
      let total = 0;
      let top = { emoji: '', count: 0 };
      
      Object.entries(newReactions).forEach(([emojiKey, count]) => {
        total += count as number;
        if ((count as number) > top.count) {
          top = { emoji: emojiKey, count: count as number };
        }
      });
      
      setTotalReactions(total);
      if (top.count > 0) {
        setTopReaction(top);
      } else {
        setTopReaction(null);
      }

      // Show recently changed animation
      setRecentlyChanged(emoji);
      setTimeout(() => setRecentlyChanged(null), 1000);

      // Server update and invalidate client cache
      if (isRemoving) {
        const updatedMetrics = await updateBlogReaction(slug, emoji, 'remove');
        if (updatedMetrics?.reactions) {
          setReactions(updatedMetrics.reactions);
          saveUserReaction(null);
          // Update cache
          clientCache.current[slug] = {
            data: updatedMetrics,
            timestamp: Date.now()
          };
        }
      } else {
        if (userReaction) {
          await updateBlogReaction(slug, userReaction, 'remove');
        }
        const updatedMetrics = await updateBlogReaction(slug, emoji, 'add');
        if (updatedMetrics?.reactions) {
          setReactions(updatedMetrics.reactions);
          saveUserReaction(emoji);
          // Update cache with new data
          if (updatedMetrics) {
            clientCache.current[slug] = {
              data: updatedMetrics,
              timestamp: Date.now()
            };
          }
        }
      }
    } catch (err) {
      // Revert on error
      setReactions(previousReactions);
      setUserReaction(previousUserReaction);
      setError('Failed to update reaction. Please try again.');
      console.error('Failed to update reaction:', err);
    }

    setActiveEmoji(null);
  };

  // Get emoji info by emoji character
  const getEmojiInfo = (emoji: string) => {
    return EMOJI_LIST.find(item => item.emoji === emoji) || { emoji, label: emoji, color: 'bg-gray-50 dark:bg-gray-900' };
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, emoji: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleReaction(emoji);
    }
  };

  return (
    <Card className={cn("w-full max-w-2xl mx-auto !shadow-none !border-none overflow-visible", className)}>
      <div ref={confettiRef} className="absolute inset-0 pointer-events-none" />
      
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-center text-base font-medium">{title}</CardTitle>
        {description && <CardDescription className="text-center">{description}</CardDescription>}
      </CardHeader>
      
      <CardContent className="pb-4 pt-2">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {loading ? (
          <div className="flex flex-wrap gap-3 justify-center">
            {EMOJI_LIST.map((_, index) => (
              <Skeleton key={index} className="h-10 w-20 rounded-md" />
            ))}
          </div>
        ) : (
          <TooltipProvider delayDuration={200}>
            <div className="flex flex-wrap gap-3 justify-center">
              <AnimatePresence>
                {EMOJI_LIST.map(({ emoji, label, color }) => {
                  const count = reactions[emoji] || 0;
                  const isActive = userReaction === emoji;
                  const isProcessing = activeEmoji === emoji;
                  const isRecentlyChanged = recentlyChanged === emoji;
                  
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
                      className="relative"
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant={isActive ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleReaction(emoji)}
                            onKeyDown={(e) => handleKeyDown(e, emoji)}
                            disabled={!!activeEmoji}
                            className={cn(
                              "min-w-[5rem] h-10 transition-all duration-300 relative overflow-hidden",
                              isActive && "shadow-md",
                              isProcessing && "animate-pulse",
                              isActive && color
                            )}
                          >
                            <span className={cn(
                              "text-xl mr-2 transition-transform duration-300",
                              isRecentlyChanged && "animate-bounce"
                            )}>
                              {emoji}
                            </span>
                            <AnimatePresence mode="wait">
                              <motion.span
                                key={`${emoji}-${count}`}
                                variants={countVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className={cn(
                                  "text-sm font-medium text-muted-foreground",
                                  
                                )}
                              >
                                {count > 0 ? count : ''}
                              </motion.span>
                            </AnimatePresence>
                            <span className="sr-only">{label}</span>
                            
                            {isActive && (
                              <motion.div 
                                className="absolute inset-0 bg-primary/10 rounded-md"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              />
                            )}
                            
                            {/* Ripple effect on click */}
                            {isRecentlyChanged && (
                              <motion.div
                                className="absolute inset-0 bg-primary/20 rounded-full"
                                initial={{ scale: 0, opacity: 1 }}
                                animate={{ scale: 2, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                              />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="font-medium">
                          {label}
                        </TooltipContent>
                      </Tooltip>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </TooltipProvider>
        )}
      </CardContent>
      
      {showStats && !loading && totalReactions > 0 && (
        <CardFooter className="pt-0 pb-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-muted-foreground">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center gap-1 cursor-help">
                <Users className="h-3.5 w-3.5" />
                <span>{totalReactions} {totalReactions === 1 ? 'reaction' : 'reactions'}</span>
                <Info className="h-3 w-3 ml-0.5 text-muted-foreground/70" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-4">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Reaction Summary</h4>
                <div className="grid grid-cols-2 gap-2">
                  {EMOJI_LIST.map(({ emoji }) => {
                    const count = reactions[emoji] || 0;
                    if (count === 0) return null;
                    
                    return (
                      <div key={emoji} className="flex items-center gap-2">
                        <span className="text-base">{emoji}</span>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${Math.max(5, (count / totalReactions) * 100)}%` }} 
                          />
                        </div>
                        <span className="text-xs font-medium">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          
          {topReaction && (
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Most popular:</span>
              <Badge variant="outline" className="ml-1 font-normal">
                <span className="mr-1">{topReaction.emoji}</span>
                {getEmojiInfo(topReaction.emoji).label}
              </Badge>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
