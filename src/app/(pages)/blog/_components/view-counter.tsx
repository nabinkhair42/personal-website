'use client';

import { Eye, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ViewCounterProps {
  slug: string;
  className?: string;
}

interface BlogMetrics {
  views: number;
}

export default function ViewCounter({ slug, className }: ViewCounterProps) {
  const [metrics, setMetrics] = useState<BlogMetrics>({ views: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndTrackView = async () => {
      try {
        const response = await fetch('/api/blog/metrics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug }),
        });

        if (response.ok) {
          const data = await response.json();
          setMetrics(data.metrics);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndTrackView();
  }, [slug]);

  return (
    <div
      className={cn(
        'flex items-center gap-2 text-zinc-600 dark:text-zinc-400 animate-in fade-in duration-500',
        className
      )}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="font-mono text-sm">Loading...</span>
        </>
      ) : (
        <>
          <Eye className="h-4 w-4" />
          <span className="font-mono text-sm">
            {metrics.views.toLocaleString()} view
            {metrics.views !== 1 ? 's' : ''}
          </span>
        </>
      )}
    </div>
  );
}
