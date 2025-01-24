"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

interface ViewCounterProps {
  slug: string;
  className?: string;
}

interface BlogMetrics {
  views: number;
}

export default function ViewCounter({ slug, className }: ViewCounterProps) {
  const [metrics, setMetrics] = useState<BlogMetrics>({ views: 0 });

  useEffect(() => {
    const trackView = async () => {
      try {
        // Track the view
        const response = await fetch('/api/blog/metrics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug }),
        });

        if (!response.ok) {
          throw new Error('Failed to track view');
        }

        const data = await response.json();
        setMetrics(data.metrics);
      } catch (error) {
        console.error('Error tracking view:', error);
      }
    };

    // Get initial metrics
    const getMetrics = async () => {
      try {
        const response = await fetch(`/api/blog/metrics?slug=${slug}`);
        if (!response.ok) {
          throw new Error('Failed to get metrics');
        }

        const data = await response.json();
        setMetrics(data.metrics);
      } catch (error) {
        console.error('Error getting metrics:', error);
      }
    };

    getMetrics();
    trackView();
  }, [slug]);

  return (
    <div className={`flex items-center gap-2 text-muted-foreground ${className}`}>
      <Eye className="h-4 w-4" />
      <span>{metrics.views.toLocaleString()} views</span>
    </div>
  );
}
