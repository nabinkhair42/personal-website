import "./globals.css";
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { HotKeyProvider } from "@/components/hot-key-provider";
import SiteFooter from "@/components/layouts/site-footer";
import SiteHeader from "@/components/layouts/site-header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DeveloperDetails } from "@/dev-constants/details";

const siteUrl = DeveloperDetails.portfolio.replace(/\/$/, "");
const ogImage = `${siteUrl}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: DeveloperDetails.seo.title,
    template: `%s | ${DeveloperDetails.name}`,
  },
  description: DeveloperDetails.seo.description,
  keywords: DeveloperDetails.seo.keywords,
  authors: [{ name: DeveloperDetails.name }],
  creator: DeveloperDetails.name,
  alternates: {
    canonical: siteUrl,
    types: {
      "application/rss+xml": `${siteUrl}/feed.xml`,
    },
  },
  openGraph: {
    title: DeveloperDetails.seo.title,
    description: DeveloperDetails.seo.description,
    url: siteUrl,
    siteName: DeveloperDetails.name,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `Portfolio hero image for ${DeveloperDetails.name}, ${DeveloperDetails.designation}`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DeveloperDetails.seo.title,
    description: DeveloperDetails.seo.description,
    images: [ogImage],
    creator: "@khairnabin",
  },
};

// JSON-LD structured data for SEO
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: DeveloperDetails.name,
  url: siteUrl,
  image: `${siteUrl}${DeveloperDetails.avatar}`,
  jobTitle: DeveloperDetails.designation,
  description: DeveloperDetails.bio,
  email: DeveloperDetails.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: DeveloperDetails.location.city,
    addressCountry: DeveloperDetails.location.country,
  },
  sameAs: DeveloperDetails.socialLinks.map((link) => link.url),
  knowsAbout: [
    "Artificial Intelligence",
    "Large Language Models",
    "LLM Orchestration",
    "Model Context Protocol",
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "Full Stack Development",
    "Cloud Infrastructure",
  ],
  alumniOf: DeveloperDetails.education.map((edu) => ({
    "@type": "EducationalOrganization",
    name: edu.institution,
    address: edu.location,
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: DeveloperDetails.name,
  url: siteUrl,
  description: DeveloperDetails.seo.description,
  inLanguage: "en",
  author: {
    "@type": "Person",
    name: DeveloperDetails.name,
    url: siteUrl,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const structuredDataJsonLd = {
  "@context": "https://schema.org",
  "@graph": [personJsonLd, websiteJsonLd],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className={sans.className} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <HotKeyProvider>
              <div className="relative grid min-h-screen w-full grid-cols-[1fr_min(50rem,calc(100%-3rem))_1fr]">
                <div className="col-start-2 flex min-h-screen w-full flex-col">
                  <SiteHeader />
                  <main id="main-content" className="flex flex-1 flex-col">
                    {children}
                  </main>
                  <SiteFooter />
                </div>
                <div className="col-start-1 row-span-full border-r border-dashed border-r-(--pattern-fg) pattern-hatch" />
                <div className="col-start-3 row-span-full border-l border-dashed border-l-(--pattern-fg) pattern-hatch" />
              </div>
            </HotKeyProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
