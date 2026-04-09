import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
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
        alt: `Portfolio hero image for ${DeveloperDetails.name}, Full Stack Developer from Nepal`,
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
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Full Stack Development",
    "Web Development",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const font = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={font.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <HotKeyProvider>
              <SiteHeader />
              <main id="main-content">{children}</main>
              <SiteFooter />
            </HotKeyProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
