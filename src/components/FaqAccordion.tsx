"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What documents do I need to rent a car?",
    a: "You need a valid CNIC (or passport for foreigners) and a valid driving licence. We may also ask for a security deposit depending on the car and trip.",
  },
  {
    q: "Is fuel included in the rent?",
    a: "No. Cars are usually given with fuel as agreed at handover. You return the car with the same fuel level, unless we agree otherwise.",
  },
  {
    q: "Can I take the car outside Batkhela / around Pakistan?",
    a: "Yes. Our cars are available for city trips and tourism around all Pakistan. Please tell us your route when booking so we can guide you on charges and timing.",
  },
  {
    q: "Do you provide a driver?",
    a: "Yes, driver option can be arranged on request. Tell us on WhatsApp or in the booking notes if you need a car with driver.",
  },
  {
    q: "How do I book?",
    a: "Choose a car from the fleet, fill the booking form, or message us on WhatsApp. We will confirm your booking as soon as possible.",
  },
  {
    q: "What is the payment method?",
    a: "Payment can be arranged in cash or as agreed with our team. Full payment details are shared when we confirm your booking.",
  },
  {
    q: "Is there a security deposit?",
    a: "If you provide a guarantor, or park your own car with us as security, a cash security deposit is not required. Otherwise, a refundable deposit may be asked depending on the car and trip — we will tell you before confirmation.",
  },
  {
    q: "What if I return the car late?",
    a: "Please inform us early if you need extra time. Late return may have extra charges based on the delay and car type.",
  },
  {
    q: "Where is your office?",
    a: "Near Waseem Medical Complex, opposite Shesho Masjid, Batkhela, Khyber Pakhtunkhwa, Pakistan.",
  },
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {faqs.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full items-start justify-between gap-4 py-5 text-left"
            >
              <span className="font-[family-name:var(--font-syne)] text-lg font-bold text-white sm:text-xl">
                {item.q}
              </span>
              <span className="mt-1 text-copper">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <p className="pb-5 pr-8 text-steel leading-relaxed">{item.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
