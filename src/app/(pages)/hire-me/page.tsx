import { Metadata } from "next";
// import { ProcessSection } from "@/app/(pages)/hire-me/_components/process-section";
import { ServicesSection } from "@/app/(pages)/hire-me/_components/services-section";
// import { BenefitsSection } from "@/app/(pages)/hire-me/_components/benefits-section";
import { HeroSection } from "@/app/(pages)/hire-me/_components/hero-section";
// import { TestimonialsSection } from "@/app/(pages)/hire-me/_components/testimonials-section";
import { hireMeMetadata } from "@/config/metadata";

export const metadata = hireMeMetadata;

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Full Stack Development Services",
  provider: {
    "@type": "Person",
    name: "Nabin Khair",
    jobTitle: "Full Stack Developer"
  },
  description: "Professional web development services including frontend, backend, and full-stack development",
  url: "https://nabinkhair.com.np/hire-me"
};

export default function HireMePage() {
  return (
    <main className="max-w-5xl flex flex-col justify-center mx-auto border-l border-r gap-10">
      <HeroSection />
      <ServicesSection />
      {/* <TestimonialsSection />
      <ProcessSection />
      <BenefitsSection /> */}
    </main>
  );
}