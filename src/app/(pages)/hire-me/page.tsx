import { ProcessSection } from "@/app/(pages)/hire-me/_components/process-section";
import { ServicesSection } from "@/app/(pages)/hire-me/_components/services-section";
import { BenefitsSection } from "@/app/(pages)/hire-me/_components/benefits-section";
import { HeroSection } from "@/app/(pages)/hire-me/_components/hero-section";
import { TestimonialsSection } from "@/app/(pages)/hire-me/_components/testimonials-section";

export default function HireMePage() {
  return (
    <main className="max-w-5xl mx-auto py-16">
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <ProcessSection />
      <BenefitsSection />
    </main>
  );
}