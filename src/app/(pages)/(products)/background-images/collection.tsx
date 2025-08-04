'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Download,
  ExternalLink,
  Eye,
  Grid3X3,
  Info,
  Palette,
  X,
} from 'lucide-react';
import { useState } from 'react';

// Quality Notice Modal Component
const QualityNotice = ({
  isVisible,
  onClose,
  onContinue,
}: {
  isVisible: boolean;
  onClose: () => void;
  onContinue: () => void;
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-zinc-900/80 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm sm:max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
        {/* Geometric pattern for notice */}
        <div className="absolute inset-0 opacity-[0.008] dark:opacity-[0.012] pointer-events-none">
          <div className="absolute top-0 left-1/3 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute top-1/3 left-0 w-full h-px bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-zinc-400 dark:bg-zinc-600"></div>
        </div>

        <div className="relative z-10 p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-1 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
              <Info className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
            </div>
            <span className="text-xs sm:text-sm font-mono uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Quality Notice
            </span>
          </div>

          {/* Content */}
          <h3 className="text-base sm:text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-3 font-mono uppercase tracking-wide">
            Compressed Version
          </h3>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-4">
            These downloads are web-optimized versions. For full-resolution,
            uncompressed originals, visit my Figma profile.
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <a
              href="https://figma.com/@nabinkhair"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 p-2 sm:p-3 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200 text-center"
            >
              <ExternalLink className="h-3 w-3" />
              <span className="text-xs font-mono uppercase tracking-wide">
                High Quality on Figma
              </span>
            </a>

            <button
              onClick={onContinue}
              className="p-2 sm:p-3 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors duration-200"
            >
              <span className="text-xs font-mono uppercase tracking-wide">
                Continue Download
              </span>
            </button>

            <button
              onClick={onClose}
              className="p-2 sm:p-3 border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-200"
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
    name: 'Mint Eclipse',
    filename: 'Mint Eclipse.webp',
    description: 'Cool greens and cyans fading into black',
    category: 'Cool',
    resolution: '2560×1440',
    size: '847 KB',
  },
  {
    id: 2,
    name: 'Sunset Cream',
    filename: 'Sunset Cream.webp',
    description: 'Warm oranges and soft beige tones',
    category: 'Warm',
    resolution: '2560×1440',
    size: '923 KB',
  },
  {
    id: 3,
    name: 'Aurora Chill',
    filename: 'Aurora Chill.webp',
    description: 'Arctic blues and greens glowing like a polar sky',
    category: 'Cool',
    resolution: '2560×1440',
    size: '756 KB',
  },
  {
    id: 4,
    name: 'Neon Sorbet',
    filename: 'Neon Sorbet.webp',
    description:
      'Vibrant mix of purples, pinks, and orange with soft white glow',
    category: 'Vibrant',
    resolution: '2560×1440',
    size: '892 KB',
  },
  {
    id: 5,
    name: 'Electric Twilight',
    filename: 'Electric Twilight.webp',
    description: 'Deep blues fading into frosty lavender',
    category: 'Cool',
    resolution: '2560×1440',
    size: '689 KB',
  },
  {
    id: 6,
    name: 'Midnight Lagoon',
    filename: 'Midnight Lagoon.webp',
    description: 'Dark blues with hints of cyan and violet',
    category: 'Dark',
    resolution: '2560×1440',
    size: '634 KB',
  },
  {
    id: 7,
    name: 'Velvet Ember',
    filename: 'Velvet Ember.webp',
    description: 'Warm golds blending into deep pinks and purples',
    category: 'Warm',
    resolution: '2560×1440',
    size: '798 KB',
  },
];

const categories = ['All', 'Cool', 'Warm', 'Vibrant', 'Dark'];

const BackgroundCollection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showQualityNotice, setShowQualityNotice] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<string | null>(null);

  const filteredBackgrounds =
    selectedCategory === 'All'
      ? backgroundCollection
      : backgroundCollection.filter((bg) => bg.category === selectedCategory);

  const handleDownload = (filename: string) => {
    setPendingDownload(filename);
    setShowQualityNotice(true);
  };

  const handleContinueDownload = () => {
    if (pendingDownload) {
      const link = document.createElement('a');
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
      <section className="relative px-4 sm:px-6 py-16 sm:py-20 lg:py-24 border-b border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-50 dark:bg-zinc-900">
        {/* Geometric patterns - Responsive */}
        <div className="absolute inset-0 opacity-[0.015] sm:opacity-[0.02] dark:opacity-[0.025] sm:dark:opacity-[0.03]">
          <div className="absolute top-0 left-0 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute top-0 left-1/4 sm:left-20 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute top-0 left-1/2 sm:left-40 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute top-0 right-1/2 sm:right-40 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute top-0 right-1/4 sm:right-20 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute top-0 right-0 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
        </div>

        <div className="absolute inset-0 opacity-[0.01] sm:opacity-[0.015] dark:opacity-[0.015] sm:dark:opacity-[0.02]">
          <div className="absolute top-1/4 left-0 w-full h-px bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-zinc-400 dark:bg-zinc-600"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Section Label */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <div className="w-8 sm:w-12 h-px bg-zinc-300 dark:bg-zinc-700"></div>
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-zinc-400 dark:bg-zinc-600 rotate-45"></div>
            <span className="text-xs sm:text-sm tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-mono">
              Digital Collections
            </span>
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-zinc-400 dark:bg-zinc-600 rotate-45"></div>
            <div className="w-8 sm:w-12 h-px bg-zinc-300 dark:bg-zinc-700"></div>
          </div>

          {/* Main Heading - More responsive */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-zinc-900 dark:text-zinc-100 mb-6 sm:mb-8 tracking-tight leading-tight">
            Background
            <br />
            <span className="font-serif italic">Gradients</span>
          </h1>

          {/* Accent Line */}
          <div className="w-16 sm:w-24 h-px bg-zinc-900 dark:bg-zinc-100 mx-auto mb-6 sm:mb-8"></div>

          {/* Description - Better responsive text */}
          <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            A curated collection of minimal gradient backgrounds designed with
            architectural precision. Each wallpaper follows our
            brutalist-minimalism philosophy of structured beauty.
          </p>

          {/* Quality Notice - Mobile optimized */}
          <div className="relative mb-6 sm:mb-8 p-2 sm:p-3 border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 max-w-2xl mx-auto">
            <div className="absolute inset-0 opacity-[0.005] dark:opacity-[0.008] pointer-events-none">
              <div className="absolute top-0 left-4 w-px h-full bg-zinc-400 dark:bg-zinc-600"></div>
              <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-400 dark:bg-zinc-600"></div>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
              <div className="flex items-center gap-2">
                <Info className="h-3 w-3 text-zinc-600 dark:text-zinc-400" />
                <span className="text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                  Web-optimized versions
                </span>
              </div>
              <span className="hidden sm:inline text-zinc-600 dark:text-zinc-400">
                •
              </span>
              <span className="text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                Full quality on
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

          {/* Stats - Better mobile layout with flex-wrap */}
          <div className="flex flex-wrap gap-4 justify-center items-center text-center">
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-light text-zinc-900 dark:text-zinc-100 font-mono">
                {backgroundCollection.length}
              </div>
              <div className="text-xs sm:text-sm tracking-wide uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                Wallpapers
              </div>
            </div>

            <div className="w-px h-6 sm:h-8 bg-zinc-300 dark:bg-zinc-700"></div>

            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-light text-zinc-900 dark:text-zinc-100 font-mono">
                2K
              </div>
              <div className="text-xs sm:text-sm tracking-wide uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                Resolution
              </div>
            </div>

            <div className="w-px h-6 sm:h-8 bg-zinc-300 dark:bg-zinc-700"></div>

            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-light text-zinc-900 dark:text-zinc-100 font-mono">
                Free
              </div>
              <div className="text-xs sm:text-sm tracking-wide uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                Download
              </div>
            </div>
          </div>
        </div>

        {/* Corner elements - Hidden on mobile */}
        <div className="hidden sm:block absolute bottom-8 left-8 opacity-20 dark:opacity-30">
          <div className="w-4 h-4 border border-zinc-400 dark:border-zinc-600 rotate-45"></div>
        </div>
        <div className="hidden sm:block absolute top-8 right-8 opacity-20 dark:opacity-30">
          <div className="w-6 h-6 border border-zinc-400 dark:border-zinc-600"></div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="relative py-8 sm:py-12 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        {/* Geometric pattern */}
        <div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.015] pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-zinc-300 dark:bg-zinc-700"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-zinc-300 dark:bg-zinc-700"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-zinc-300 dark:bg-zinc-700"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-300 dark:bg-zinc-700"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-1.5 sm:p-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950">
                <Palette className="h-3 w-3 sm:h-4 sm:w-4 text-zinc-700 dark:text-zinc-300" />
              </div>
              <h2 className="text-lg sm:text-xl font-medium text-zinc-900 dark:text-zinc-100 font-mono uppercase tracking-wide">
                Browse Categories
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-mono">
              <Grid3X3 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{filteredBackgrounds.length} wallpapers</span>
            </div>
          </div>

          {/* Category Filter - Better mobile layout */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative py-12 sm:py-16 bg-zinc-50 dark:bg-zinc-900">
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

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          {/* Better responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredBackgrounds.map((background, index) => (
              <Card key={index} className="group relative overflow-hidden">
                <CardContent className="p-0">
                  {/* Image Container */}
                  <div className="relative aspect-video bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <img
                      src={`/background-images/${background.filename}`}
                      alt={background.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Overlay - Better mobile interaction */}
                    <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handlePreview(background.filename)}
                          className="h-8 w-8 sm:h-auto sm:w-auto sm:px-3"
                        >
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline ml-2">Preview</span>
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDownload(background.filename)}
                          className="h-8 w-8 sm:h-auto sm:w-auto sm:px-3"
                        >
                          <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline ml-2">
                            Download
                          </span>
                        </Button>
                      </div>
                    </div>

                    {/* Geometric overlay pattern */}
                    <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none">
                      <div className="absolute top-2 left-2 w-1.5 sm:w-2 h-1.5 sm:h-2 border border-white"></div>
                      <div className="absolute top-2 right-2 w-1.5 sm:w-2 h-1.5 sm:h-2 border border-white"></div>
                      <div className="absolute bottom-2 left-2 w-1.5 sm:w-2 h-1.5 sm:h-2 border border-white"></div>
                      <div className="absolute bottom-2 right-2 w-1.5 sm:w-2 h-1.5 sm:h-2 border border-white"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-3 sm:p-4 bg-white dark:bg-zinc-950">
                    {/* Grid pattern with vertical lines */}
                    <div className="absolute inset-0 opacity-[0.008] dark:opacity-[0.012] pointer-events-none">
                      <div className="absolute top-0 left-1/3 w-px h-full bg-zinc-300 dark:bg-zinc-700"></div>
                      <div className="absolute top-0 right-1/3 w-px h-full bg-zinc-300 dark:bg-zinc-700"></div>
                      <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-300 dark:bg-zinc-700"></div>
                    </div>

                    <div className="relative z-10 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-zinc-900 dark:text-zinc-100 font-mono uppercase tracking-wide text-xs sm:text-sm truncate">
                            {background.name}
                          </h3>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light mt-1 line-clamp-2">
                            {background.description}
                          </p>
                        </div>
                        {/* Square badge */}
                        <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-1.5 sm:px-2 py-1 shrink-0">
                          <span className="text-xs font-mono uppercase tracking-wide text-zinc-700 dark:text-zinc-300">
                            {background.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-900">
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono truncate">
                          <span className="hidden sm:inline">
                            {background.resolution} •{' '}
                          </span>
                          {background.size}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDownload(background.filename)}
                          className="h-6 w-6 sm:h-8 sm:w-8 p-0"
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

      {/* Preview Modal - Better mobile experience */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-zinc-900/80 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] sm:max-h-[80vh] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
            {/* Close button - Better positioning for mobile */}
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-2 right-2 sm:top-4 sm:right-4 h-8 w-8 p-0 z-10"
              onClick={(e) => {
                e.stopPropagation();
                setPreviewImage(null);
              }}
            >
              <X className="h-4 w-4" />
            </Button>

            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-full object-contain"
              onError={(e) => {
                console.error('Image failed to load:', previewImage);
                e.currentTarget.src = `/assets/background-images/${previewImage
                  .split('/')
                  .pop()}`;
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundCollection;
