import { contactMetadata } from "@/config/metadata";
import { ContactForm } from "./_components/contact-form";
import { ContactInfo } from "./_components/contact-info";
import ContactHero from "./_components/hero-section";

export const metadata = contactMetadata;

export default function ContactPage() {
  return (
    <main className="max-w-5xl flex flex-col justify-center mx-auto border-l border-r">
      <ContactHero />
      <div className="grid gap-12 md:grid-cols-[1fr,1.5fr] md:gap-8 lg:gap-12">
        <div className="order-last md:order-first">
        <ContactInfo />
        </div>
        <ContactForm />
      </div>
    </main>
  );
}