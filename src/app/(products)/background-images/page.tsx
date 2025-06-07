import React from 'react'
import type { Metadata } from 'next'
import BackgroundCollection from './collection'

// Metadata for SEO and social sharing
export const metadata: Metadata = {
  title: 'Background Gradients Collection | Brutalist Minimalism',
  description: 'A curated collection of minimal gradient backgrounds crafted with architectural precision. Free 2K wallpapers following brutalist-minimalism design principles.',
  keywords: [
    'background gradients',
    'minimal wallpapers',
    'brutalist design',
    'free backgrounds',
    '2K wallpapers',
    'architectural design',
    'gradient collection',
    'minimalist backgrounds'
  ],
  authors: [{ name: 'Nabin Khair' }],
  creator: 'Nabin Khair',
  category: 'Design Resources',
  
  // Open Graph metadata for social sharing
  openGraph: {
    title: 'Background Gradients Collection | Brutalist Minimalism',
    description: 'Free minimal gradient backgrounds designed with architectural precision. 7 unique 2K wallpapers following brutalist design principles.',
    url: '/products/background-collection',
    siteName: 'Nabin Khair',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/background-images/Mint Eclipse.webp', // Using first wallpaper as preview
        width: 2560,
        height: 1440,
        alt: 'Mint Eclipse - Minimal gradient background with cool greens and cyans',
        type: 'image/webp',
      },
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Background Gradients Collection | Brutalist Minimalism',
    description: 'Free minimal gradient backgrounds designed with architectural precision. 7 unique 2K wallpapers.',
    creator: '@nabinkhair', // Replace with your actual Twitter handle
    images: ['/background-images/Mint Eclipse.webp'],
  },
  
  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
}

const page = () => {
  return (
    <BackgroundCollection />
  )
}

export default page