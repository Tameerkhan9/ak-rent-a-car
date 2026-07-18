"use client";

import { useState } from "react";
import { CONTACTS, whatsappUrl } from "@/lib/format";

const defaultMessage =
  "Assalam o Alaikum, I want to book a car from AK Rent A Car & Tourism Company.";

export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const entries = CONTACTS.flatMap((person) =>
    person.phones.map((phone) => ({
      name: person.name,
      display: phone.display,
      href: whatsappUrl(phone.whatsapp, defaultMessage),
    }))
  );

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-72 border border-white/10 bg-ink-soft p-3 shadow-2xl animate-rise">
          <p className="mb-2 px-1 text-xs uppercase tracking-[0.2em] text-copper">
            Chat on WhatsApp
          </p>
          <ul className="space-y-1">
            {entries.map((entry) => (
              <li key={entry.href + entry.display}>
                <a
                  href={entry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-sm text-fog transition hover:bg-white/5 hover:text-copper"
                  onClick={() => setOpen(false)}
                >
                  <span className="font-semibold text-white">{entry.name}</span>
                  <span className="mt-0.5 block text-steel">{entry.display}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close WhatsApp contacts" : "Open WhatsApp"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#1ebe57]"
      >
        {open ? (
          <span className="text-2xl leading-none">×</span>
        ) : (
          <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden>
            <path d="M16.04 3C9.05 3 3.38 8.58 3.38 15.45c0 2.2.62 4.25 1.7 6.03L3 29l7.74-2.02a12.9 12.9 0 0 0 5.3 1.14h.01c6.99 0 12.66-5.58 12.66-12.45C28.71 8.58 23.03 3 16.04 3zm7.37 17.63c-.31.87-1.83 1.6-2.56 1.7-.66.1-1.5.14-2.42-.15-.56-.17-1.27-.41-2.18-.8-3.84-1.66-6.34-5.52-6.53-5.78-.19-.26-1.54-2.05-1.54-3.91 0-1.86.98-2.77 1.32-3.15.35-.38.76-.48 1.01-.48h.73c.23 0 .54-.05.84.64.31.72 1.05 2.5 1.14 2.68.1.19.16.4.03.65-.12.24-.19.4-.37.61-.19.22-.39.48-.55.65-.19.19-.38.4-.16.78.22.38.98 1.62 2.1 2.62 1.45 1.3 2.67 1.7 3.05 1.89.38.19.61.16.83-.1.23-.25.96-1.12 1.22-1.5.25-.38.51-.32.86-.19.35.12 2.22 1.05 2.6 1.24.38.19.64.29.73.45.1.16.1.93-.21 1.8z" />
          </svg>
        )}
      </button>
    </div>
  );
}
