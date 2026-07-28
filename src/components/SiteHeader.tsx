"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";

const links = [
  { href: "/fleet", label: "Fleet" },
  { href: "/faq", label: "FAQ" },
  { href: "/reviews", label: "Reviews" },
  { href: "/#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-5">
        <BrandLogo
          markClassName="h-10 w-auto sm:h-16"
          showText={false}
        />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 text-sm text-fog/90 md:flex">
          {links.map((link) =>
            link.href.startsWith("/#") ? (
              <a
                key={link.href}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href="/fleet"
            className="bg-copper px-4 py-2 font-semibold text-ink transition hover:bg-copper-bright"
          >
            Book now
          </Link>
        </nav>

        {/* Mobile: Book + menu */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/fleet"
            className="bg-copper px-3 py-2 text-xs font-semibold text-ink transition hover:bg-copper-bright"
          >
            Book
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center border border-white/20 text-white"
          >
            {open ? (
              <span className="text-xl leading-none">×</span>
            ) : (
              <span className="flex flex-col gap-1.5" aria-hidden>
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
              </span>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-b border-white/10 bg-ink/95 px-4 py-3 backdrop-blur-md md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1">
            {links.map((link) =>
              link.href.startsWith("/#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-3 text-sm text-fog transition hover:bg-white/5 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-3 text-sm text-fog transition hover:bg-white/5 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
