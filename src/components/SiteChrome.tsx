import Link from "next/link";
import {
  BUSINESS_LOCATION,
  BUSINESS_TAGLINE,
} from "@/lib/format";
import { BrandLogo } from "@/components/BrandLogo";
import { ContactDetails } from "@/components/ContactDetails";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:py-5">
        <BrandLogo markClassName="h-14 w-auto sm:h-16" />
        <nav className="flex items-center gap-3 text-sm text-fog/90 sm:gap-5">
          <Link href="/fleet" className="transition hover:text-white">
            Fleet
          </Link>
          <Link href="/faq" className="hidden transition hover:text-white sm:inline">
            FAQ
          </Link>
          <a href="/#contact" className="transition hover:text-white">
            Contact
          </a>
          <Link
            href="/fleet"
            className="bg-copper px-4 py-2 font-semibold text-ink transition hover:bg-copper-bright"
          >
            Book now
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <>
      <footer className="border-t border-white/10 bg-ink-soft">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.2fr_1fr_auto]">
          <div className="max-w-md">
            <BrandLogo markClassName="h-14 w-auto" />
            <p className="mt-3 text-sm text-copper">{BUSINESS_TAGLINE}</p>
            <p className="mt-3 text-sm leading-relaxed text-fog/80">
              {BUSINESS_LOCATION}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-copper">
              Contact
            </p>
            <div className="mt-4">
              <ContactDetails compact />
            </div>
          </div>
          <div className="flex flex-col gap-3 text-sm text-steel">
            <Link href="/fleet" className="hover:text-fog">
              Fleet
            </Link>
            <Link href="/faq" className="hover:text-fog">
              FAQ
            </Link>
            <Link href="/terms" className="hover:text-fog">
              Terms
            </Link>
            <a href="/#contact" className="hover:text-fog">
              Contact
            </a>
            <Link href="/admin" className="hover:text-fog">
              Admin
            </Link>
          </div>
        </div>
      </footer>
      <WhatsAppFloat />
    </>
  );
}
