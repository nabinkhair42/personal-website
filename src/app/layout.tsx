import type { Metadata } from "next";
import NextTopLoader from 'nextjs-toploader';
import { ThemeProvider } from "@/components/contexts/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { RightClick } from "@/components/ui/ui-extend/RightClick";
import { navigationMenuItems } from "@/constants/menu-items";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Nabin Khair - Full Stack Developer",
  metadataBase: new URL("https://nabinkhair.com.np/"),
  description:
    "I am a Full Stack Developer with a passion for building web applications. I have experience in building web applications using React, Next.js, and Node.js. I am also familiar with TypeScript, GraphQL, and MongoDB. I am always eager to learn new technologies and improve my skills. I am currently looking for new opportunities to work on exciting projects and grow as a developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
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
