"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Download,
    Eye,
    Grid3X3,
    Palette,
    Info,
    ExternalLink
} from "lucide-react";
import { useState } from "react";

// Quality Notice Modal Component
const QualityNotice = ({ isVisible, onClose, onContinue }: { 
  isVisible: boolean; 
  onClose: () => void;
  onContinue: () => void;
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-zinc-900/80 flex items-center justify-center p-4">
      <div className="relative max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
        {/* Geometric pattern for notice */}
        <div className="absolute inset-0 opacity-[0.008] dark:opacity-[0.012] pointer-events-none">
          <div className="absolute top-0 left-1/3 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute top-1/3 left-0 w-full h-px bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-zinc-400 dark:bg-zinc-600"></div>
        </div>

        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-1 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
              <Info className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
            </div>
            <span className="text-sm font-mono uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Quality Notice
            </span>
          </div>

          {/* Content */}
          <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-3 font-mono uppercase tracking-wide">
            Compressed Version
          </h3>
          
          <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-4">
            These downloads are web-optimized versions. For full-resolution, 
            uncompressed originals, visit my Figma profile.
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <a 
              href="https://figma.com/@nabinkhair" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 p-2 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
            >
              <ExternalLink className="h-3 w-3" />
              <span className="text-xs font-mono uppercase tracking-wide">
                High Quality on Figma
              </span>
            </a>
            
            <button 
              onClick={onContinue}
              className="p-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors duration-200"
            >
              <span className="text-xs font-mono uppercase tracking-wide">
                Continue Download
              </span>
            </button>

            <button 
              onClick={onClose}
              className="p-2 border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200"
            >
              <span className="text-xs font-mono uppercase tracking-wide">
                Cancel
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Background collection data
const backgroundCollection = [
  {
    id: 1,
    name: "Mint Eclipse",
    filename: "Mint Eclipse.webp",
    description: "Cool greens and cyans fading into black",
    category: "Cool",
    resolution: "2560×1440",
    size: "847 KB",
  },
  {
    id: 2,
    name: "Sunset Cream",
    filename: "Sunset Cream.webp",
    description: "Warm oranges and soft beige tones",
    category: "Warm",
    resolution: "2560×1440",
    size: "923 KB",
  },
  {
    id: 3,
    name: "Aurora Chill",
    filename: "Aurora Chill.webp",
    description: "Arctic blues and greens glowing like a polar sky",
    category: "Cool",
    resolution: "2560×1440",
    size: "756 KB",
  },
  {
    id: 4,
    name: "Neon Sorbet",
    filename: "Neon Sorbet.webp",
    description:
      "Vibrant mix of purples, pinks, and orange with soft white glow",
    category: "Vibrant",
    resolution: "2560×1440",
    size: "892 KB",
  },
  {
    id: 5,
    name: "Electric Twilight",
    filename: "Electric Twilight.webp",
    description: "Deep blues fading into frosty lavender",
    category: "Cool",
    resolution: "2560×1440",
    size: "689 KB",
  },
  {
    id: 6,
    name: "Midnight Lagoon",
    filename: "Midnight Lagoon.webp",
    description: "Dark blues with hints of cyan and violet",
    category: "Dark",
    resolution: "2560×1440",
    size: "634 KB",
  },
  {
    id: 7,
    name: "Velvet Ember",
    filename: "Velvet Ember.webp",
    description: "Warm golds blending into deep pinks and purples",
    category: "Warm",
    resolution: "2560×1440",
    size: "798 KB",
  },
];

const categories = ["All", "Cool", "Warm", "Vibrant", "Dark"];

const BackgroundCollection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showQualityNotice, setShowQualityNotice] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<string | null>(null);

  const filteredBackgrounds =
    selectedCategory === "All"
      ? backgroundCollection
      : backgroundCollection.filter((bg) => bg.category === selectedCategory);

  const handleDownload = (filename: string) => {
    // Show quality notice first
    setPendingDownload(filename);
    setShowQualityNotice(true);
  };

  const handleContinueDownload = () => {
    if (pendingDownload) {
      const link = document.createElement("a");
      link.href = `/background-images/${pendingDownload}`;
      link.download = pendingDownload;
      link.click();
    }
    setShowQualityNotice(false);
    setPendingDownload(null);
  };

  const handleCancelDownload = () => {
    setShowQualityNotice(false);
    setPendingDownload(null);
  };

  const handlePreview = (filename: string) => {
    setPreviewImage(`/background-images/${filename}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="relative px-6 py-24 border-b border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-50 dark:bg-zinc-900">
        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
          <div className="absolute top-0 left-0 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute top-0 left-20 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute top-0 left-40 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute top-0 right-40 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute top-0 right-20 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute top-0 right-0 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute top-0 left-1/4 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
        </div>

        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]">
          <div className="absolute top-1/4 left-0 w-full h-px bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-zinc-400 dark:bg-zinc-600"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Section Label */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-zinc-300 dark:bg-zinc-700"></div>
            <div className="w-2 h-2 bg-zinc-400 dark:bg-zinc-600 rotate-45"></div>
            <span className="text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
              Digital Collections
            </span>
            <div className="w-2 h-2 bg-zinc-400 dark:bg-zinc-600 rotate-45"></div>
            <div className="w-12 h-px bg-zinc-300 dark:bg-zinc-700"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-zinc-900 dark:text-zinc-100 mb-8 tracking-tight leading-tight">
            Background
            <br />
            <span className="font-serif italic">Gradients</span>
          </h1>

          {/* Accent Line */}
          <div className="w-24 h-px bg-zinc-900 dark:bg-zinc-100 mx-auto mb-8"></div>

          {/* Description */}
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto mb-8">
            A curated collection of minimal gradient backgrounds designed with
            architectural precision. Each wallpaper follows our
            brutalist-minimalism philosophy of structured beauty.
          </p>

          {/* Quality Notice - Inline */}
          <div className="relative mb-8 p-3 border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 max-w-2xl mx-auto">
            <div className="absolute inset-0 opacity-[0.005] dark:opacity-[0.008] pointer-events-none">
              <div className="absolute top-0 left-4 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
              <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-400 dark:bg-zinc-600"></div>
            </div>
            
            <div className="relative z-10 flex items-center justify-center gap-2">
              <Info className="h-3 w-3 text-zinc-600 dark:text-zinc-400" />
              <span className="text-xs text-zinc-600 dark:text-zinc-400 font-mono text-center">
                Web-optimized versions • Full quality on 
                <a 
                  href="https://figma.com/@nabinkhair" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:text-zinc-900 dark:hover:text-zinc-100 mx-1"
                >
                  Figma
                </a>
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-12 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-light text-zinc-900 dark:text-zinc-100 font-mono">
                {backgroundCollection.length}
              </div>
              <div className="text-sm tracking-wide uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                Wallpapers
              </div>
            </div>
            <div className="w-px h-8 bg-zinc-300 dark:bg-zinc-700"></div>
            <div className="space-y-1">
              <div className="text-2xl font-light text-zinc-900 dark:text-zinc-100 font-mono">
                2K
              </div>
              <div className="text-sm tracking-wide uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                Resolution
              </div>
            </div>
            <div className="w-px h-8 bg-zinc-300 dark:bg-zinc-700"></div>
            <div className="space-y-1">
              <div className="text-2xl font-light text-zinc-900 dark:text-zinc-100 font-mono">
                Free
              </div>
              <div className="text-sm tracking-wide uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                Download
              </div>
            </div>
          </div>
        </div>

        {/* Corner elements */}
        <div className="absolute bottom-8 left-8 opacity-20 dark:opacity-30">
          <div className="w-4 h-4 border border-zinc-400 dark:border-zinc-600 rotate-45"></div>
        </div>
        <div className="absolute top-8 right-8 opacity-20 dark:opacity-30">
          <div className="w-6 h-6 border border-zinc-400 dark:border-zinc-600"></div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="relative py-12 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        {/* Geometric pattern */}
        <div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.015] pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-zinc-300 dark:bg-zinc-700"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-zinc-300 dark:bg-zinc-700"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-zinc-300 dark:bg-zinc-700"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-300 dark:bg-zinc-700"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950">
                <Palette className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
              </div>
              <h2 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 font-mono uppercase tracking-wide">
                Browse Categories
              </h2>
            </div>

            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 font-mono">
              <Grid3X3 className="h-4 w-4" />
              <span>{filteredBackgrounds.length} wallpapers</span>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="relative"
              >
                <span className="relative z-10">{category}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative py-16 bg-zinc-50 dark:bg-zinc-900">
        {/* Geometric pattern */}
        <div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.015] pointer-events-none">
          <div className="max-w-7xl mx-auto h-full relative">
            <div className="absolute top-0 left-0 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
            <div className="absolute top-0 left-1/6 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
            <div className="absolute top-0 left-2/6 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
            <div className="absolute top-0 left-3/6 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
            <div className="absolute top-0 left-4/6 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
            <div className="absolute top-0 left-5/6 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
            <div className="absolute top-0 right-0 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
            <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-400 dark:bg-zinc-600 opacity-60"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBackgrounds.map((background, index) => (
              <Card key={index} className="group relative overflow-hidden">
                <CardContent className="p-0">
                  {/* Image Container */}
                  <div className="relative aspect-video bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <img
                      src={`/background-images/${background.filename}`}
                      alt={background.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handlePreview(background.filename)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDownload(background.filename)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Geometric overlay pattern */}
                    <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none">
                      <div className="absolute top-2 left-2 w-2 h-2 border border-white"></div>
                      <div className="absolute top-2 right-2 w-2 h-2 border border-white"></div>
                      <div className="absolute bottom-2 left-2 w-2 h-2 border border-white"></div>
                      <div className="absolute bottom-2 right-2 w-2 h-2 border border-white"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-4 bg-white dark:bg-zinc-950">
                    {/* Grid pattern with vertical lines */}
                    <div className="absolute inset-0 opacity-[0.008] dark:opacity-[0.012] pointer-events-none">
                      <div className="absolute top-0 left-1/3 w-px h-full bg-zinc-300 dark:bg-zinc-700"></div>
                      <div className="absolute top-0 right-1/3 w-px h-full bg-zinc-300 dark:bg-zinc-700"></div>
                      <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-300 dark:bg-zinc-700"></div>
                    </div>

                    <div className="relative z-10 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-zinc-900 dark:text-zinc-100 font-mono uppercase tracking-wide text-sm">
                            {background.name}
                          </h3>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light mt-1">
                            {background.description}
                          </p>
                        </div>
                        {/* Square badge */}
                        <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-1">
                          <span className="text-xs font-mono uppercase tracking-wide text-zinc-700 dark:text-zinc-300">
                            {background.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-900">
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                          {background.resolution} • {background.size}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDownload(background.filename)}
                          className="h-8 px-2"
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Notice Modal */}
      <QualityNotice 
        isVisible={showQualityNotice} 
        onClose={handleCancelDownload}
        onContinue={handleContinueDownload}
      />

      {/* Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-zinc-900/80 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl max-h-[80vh] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-full object-contain"
              onError={(e) => {
                console.error("Image failed to load:", previewImage);
                e.currentTarget.src = `/assets/background-images/${previewImage
                  .split("/")
                  .pop()}`;
              }}
            />
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4"
              onClick={(e) => {
                e.stopPropagation();
                setPreviewImage(null);
              }}
            >
              ✕
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundCollection;