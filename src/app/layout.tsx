import type { Metadata } from "next";
import NextTopLoader from 'nextjs-toploader';
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { RightClick } from "@/components/ui/ui-extend/RightClick";
import { navigationMenuItems } from "@/constants/menu-items";
import { Inter } from 'next/font/google'
import { cn } from "@/lib/utils";
const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  metadataBase: new URL("https://nabinkhair.com.np/"),
  title: {
    default: "Nabin Khair - Full Stack Developer",
    template: "%s | Nabin Khair"
  },
  description: "I am a Full Stack Developer with a passion for building web applications. I have experience in building web applications using React, Next.js, and Node.js. I am also familiar with TypeScript, GraphQL, and MongoDB.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Node.js", "Web Development", "Frontend Developer", "Backend Developer"],
  authors: [{ name: "Nabin Khair" }],
  creator: "Nabin Khair",
  publisher: "Nabin Khair",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nabinkhair.com.np",
    title: "Nabin Khair - Full Stack Developer",
    description: "Full Stack Developer specializing in modern web technologies",
    siteName: "Nabin Khair Portfolio",
    images: [{
      url: "/og/home.png",
      width: 1200,
      height: 630,
      alt: "Nabin Khair - Full Stack Developer"
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nabin Khair - Full Stack Developer",
    description: "Full Stack Developer specializing in modern web technologies",
    creator: "@khairnabin",
    images: ["/og/home.png"],
  },
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
  icons: {
    icon: '/nabin.png',
    shortcut: '/nabin.png',
    apple: '/nabin.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/nabin.png',
    },
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning
      className={cn(inter.className, "bg-background antialiased font-mono")}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader
            showSpinner={false}
            color="gray"
          />
          <RightClick
            customMenuItems={navigationMenuItems}
          >
            <Navbar />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </main>
            <Toaster richColors />
            <Footer />
          </RightClick>
        </ThemeProvider>
      </body>
    </html>
  );
}
