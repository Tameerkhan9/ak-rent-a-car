import Link from "next/link";
import {
  BUSINESS_LOCATION,
  BUSINESS_TAGLINE,
} from "@/lib/format";
import { BrandLogo } from "@/components/BrandLogo";
import { ContactDetails } from "@/components/ContactDetails";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export { SiteHeader } from "@/components/SiteHeader";

export function SiteFooter() {
  return (
    <>
      <footer className="border-t border-white/10 bg-ink-soft">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_auto]">
          <div className="max-w-md">
            <BrandLogo markClassName="h-12 w-auto sm:h-14" showText={false} />
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
            <Link href="/reviews" className="hover:text-fog">
              Reviews
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
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-1 px-4 py-5 text-center text-xs text-steel/80 sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-1 sm:px-6">
            <p>
              Developed by{" "}
              <span className="text-fog/90">Tameer Khan</span>
              {" — "}
              websites &amp; apps
            </p>
            <p>
              <a
                href="https://wa.me/923478226649"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-copper"
              >
                WhatsApp +923478226649
              </a>
            </p>
            <p className="break-all">
              <a
                href="mailto:tameerkhan0009@gmail.com"
                className="hover:text-copper"
              >
                tameerkhan0009@gmail.com
              </a>
            </p>
          </div>
        </div>
      </footer>
      <WhatsAppFloat />
    </>
  );
}
