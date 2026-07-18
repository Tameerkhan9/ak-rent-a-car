import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { FaqAccordion } from "@/components/FaqAccordion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — AK Rent A Car & Tourism Company",
  description:
    "Frequently asked questions about car rental and tourism with AK Rent A Car in Batkhela.",
};

export default function FaqPage() {
  return (
    <div className="site-noise min-h-screen">
      <div className="relative border-b border-white/10">
        <SiteHeader />
        <div className="mx-auto max-w-3xl px-6 pb-14 pt-32">
          <p className="text-xs uppercase tracking-[0.25em] text-copper">Help</p>
          <h1 className="mt-3 font-[family-name:var(--font-syne)] text-4xl font-extrabold text-white sm:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mt-4 text-steel">
            Quick answers about booking, documents, fuel, and travel around
            Pakistan.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <FaqAccordion />
        <p className="mt-10 text-sm text-steel">
          Still need help?{" "}
          <a href="/#contact" className="text-copper hover:text-copper-bright">
            Contact us on WhatsApp
          </a>
          .
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
