// import { ProcessSection } from "@/app/(pages)/hire-me/_components/process-section";
import { ServicesSection } from "@/app/(pages)/hire-me/_components/services-section";
// import { BenefitsSection } from "@/app/(pages)/hire-me/_components/benefits-section";
import { HeroSection } from "@/app/(pages)/hire-me/_components/hero-section";
// import { TestimonialsSection } from "@/app/(pages)/hire-me/_components/testimonials-section";
import { hireMeMetadata } from "@/config/metadata";
import { siteConfig } from "@/config/site";

export const metadata = {
  ...hireMeMetadata,
  other: {
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Full Stack Development Services",
      provider: {
        "@type": "Person",
        name: siteConfig.name,
        jobTitle: siteConfig.title
      },
      description: "Professional web development services including frontend, backend, and full-stack development",
      url: `${siteConfig.baseUrl}/hire-me`
    }
  }
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