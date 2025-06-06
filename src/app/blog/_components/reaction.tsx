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
    return EMOJI_LIST.find(item => item.emoji === emoji) || { emoji, label: emoji, color: 'bg-zinc-50 dark:bg-zinc-900' };
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, emoji: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleReaction(emoji);
    }
  };

  return (
    <Card className={cn("w-full max-w-2xl mx-auto border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900", className)}>
      <div ref={confettiRef} className="absolute inset-0 pointer-events-none" />
      
      <CardHeader className="pb-4 pt-6">
        <CardTitle className="text-center text-lg font-light text-zinc-900 dark:text-zinc-100 tracking-tight">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-center text-zinc-600 dark:text-zinc-400 font-light">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="pb-6">
        {error && (
          <Alert variant="destructive" className="mb-4 border-red-200 dark:border-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {loading ? (
          <div className="flex flex-wrap gap-3 justify-center">
            {EMOJI_LIST.map((_, index) => (
              <Skeleton key={index} className="h-12 w-20 bg-zinc-200 dark:bg-zinc-800" />
            ))}
          </div>
        ) : (
          <TooltipProvider delayDuration={200}>
            <div className="flex flex-wrap gap-3 justify-center">
              {EMOJI_LIST.map(({ emoji, label }) => {
                const count = reactions[emoji] || 0;
                const isActive = userReaction === emoji;
                const isProcessing = activeEmoji === emoji;
                const isRecentlyChanged = recentlyChanged === emoji;
                
                return (
                  <div
                    key={emoji}
                    className={cn(
                      "animate-in fade-in duration-500 slide-in-from-bottom-2",
                      isRecentlyChanged && "animate-bounce"
                    )}
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
                            "min-w-[5rem] h-12 transition-all duration-300 relative overflow-hidden",
                            "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700",
                            "hover:border-zinc-300 dark:hover:border-zinc-600",
                            isActive && "bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100",
                            isProcessing && "animate-pulse"
                          )}
                        >
                          <span className="text-xl mr-2">
                            {emoji}
                          </span>
                          <span className="text-sm font-mono">
                            {count > 0 ? count : ''}
                          </span>
                          <span className="sr-only">{label}</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="font-mono text-xs uppercase tracking-wide">
                        {label}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                );
              })}
            </div>
          </TooltipProvider>
        )}
      </CardContent>
      
      {showStats && !loading && totalReactions > 0 && (
        <CardFooter className="pt-0 pb-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center gap-2 cursor-help">
                <Users className="h-4 w-4" />
                <span className="font-mono">
                  {totalReactions} {totalReactions === 1 ? 'reaction' : 'reactions'}
                </span>
                <Info className="h-3 w-3" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="space-y-3">
                <h4 className="text-sm font-light text-zinc-900 dark:text-zinc-100">Reaction Summary</h4>
                <div className="space-y-2">
                  {EMOJI_LIST.map(({ emoji, label }) => {
                    const count = reactions[emoji] || 0;
                    if (count === 0) return null;
                    
                    return (
                      <div key={emoji} className="flex items-center gap-3">
                        <span className="text-base">{emoji}</span>
                        <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 min-w-[60px]">{label}</span>
                        <div className="flex-1 h-2 bg-zinc-200 dark:bg-zinc-800">
                          <div 
                            className="h-2 bg-zinc-900 dark:bg-zinc-100" 
                            style={{ width: `${Math.max(10, (count / totalReactions) * 100)}%` }} 
                          />
                        </div>
                        <span className="text-xs font-mono min-w-[20px]">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          
          {topReaction && (
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="font-mono text-xs">Most popular:</span>
              <Badge variant="outline" className="border-zinc-300 dark:border-zinc-700 font-mono text-xs">
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