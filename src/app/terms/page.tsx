import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import {
  BUSINESS_EMAIL,
  BUSINESS_LOCATION,
  BUSINESS_NAME,
} from "@/lib/format";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions — AK Rent A Car & Tourism Company",
  description:
    "Full rental terms and conditions for taking a car on contract from AK Rent A Car in Batkhela.",
};

const terms = [
  "ID card, driving licence, and a photo of the rented car are required. You must also provide either a guarantor or park your own car with the company as security. In that case, a cash security deposit is not required. The car will not be handed over without these.",
  "The renter must inspect the car thoroughly before taking it. The car must be returned in the same condition. No complaint or objection will be accepted afterward.",
  "In case of an accident or any loss, the contractor / guarantor will be held fully responsible.",
  "In case of theft or total loss, the full market value of the car (as written on the form) must be paid.",
  "In case of an accident, the renter is not allowed to repair the car on their own. The car must be taken to the authorised showroom / workshop.",
  "Responsibility for theft or accident during the rental period lies with the renter / contractor.",
  "The renter is responsible for any violation of the Customs Act or any other legal action related to the car’s use.",
  "The contractor / guarantor is responsible for any damage to the car while it is parked.",
  "Advance payment for the intended rental period is necessary.",
  "The renter should check the car at return. The company is not responsible for any personal items left inside the car.",
  "If the car is seized by authorities due to misuse or illegal activity, rent will continue to be charged until the vehicle is released and returned.",
  "In case of an accident, the company and the police must be informed immediately. Without a police report, the renter will be held responsible.",
  "The car is given as a trust (amanat) from the company and must not be misused.",
  "Rent is calculated on a 12-hour basis.",
  "Keeping illegal items in the car or using the car for any illegal work is strictly prohibited.",
  "The renter and guarantor are fully responsible for any illegal act. The company will have no liability.",
  "Rent will be charged for every day the car remains in the renter’s possession.",
  "Normal car timing is from 8:00 AM to 8:00 PM. Use outside these hours (at night) will have additional charges.",
  "Cars returned late at night will only be checked / cleared the next morning. They will not be cleared at night.",
  "Additional night charges: Rs 5,000 for new cars or Toyota Prado; Rs 3,000 for small cars or models older than 2013.",
  "If the car is rented for a specific destination / place, it must be used only there. Taking it to other places without permission is prohibited.",
  "It is mandatory to record a video of the car both when taking it and when returning it.",
  "Do not use 4-wheel drive (4WD) except in a genuine emergency.",
  "Fuel, toll taxes, parking fees, and traffic fines (challans) are the responsibility of the renter.",
  "Unauthorised persons are not allowed to drive the car. If this rule is broken, the renter holds full responsibility.",
  "Driving under the influence of intoxicants is strictly prohibited. The renter is liable for all damages in such a case.",
  "Taking the car outside Pakistan without written permission from the company is prohibited.",
  "Smoking or carrying harmful substances in the car is prohibited. Separate charges will apply for cleaning or any related damage.",
  "If the car keys, remote, or documents are lost, the renter must pay the replacement cost or any related fine.",
  "To extend the rental period, the company must be informed before the scheduled return time; otherwise additional rent will be charged.",
  "Remaining fuel (petrol / CNG) in the car will not be refunded. The car should be returned with the same fuel level as when it was received.",
  "Late return past the scheduled time may result in a charge for an extra day’s rent.",
  "The driver should carry copies of the car’s documents. Original documents will remain at the company’s office.",
  "The company reserves the right to repossess or seize the vehicle if any terms and conditions are violated.",
  "I have read all these terms with full understanding, agree to them, and accept them as binding.",
];

export default function TermsPage() {
  return (
    <div className="site-noise min-h-screen">
      <div className="relative border-b border-white/10">
        <SiteHeader />
        <div className="mx-auto max-w-3xl px-6 pb-14 pt-32">
          <p className="text-xs uppercase tracking-[0.25em] text-copper">
            Legal
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-syne)] text-4xl font-extrabold text-white sm:text-5xl">
            Terms &amp; conditions
          </h1>
          <p className="mt-4 text-steel">
            Compliance with these terms is mandatory for taking a car on
            contract from {BUSINESS_NAME}.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <ol className="space-y-5">
          {terms.map((item, index) => (
            <li key={index} className="flex gap-4 text-fog/90">
              <span className="mt-0.5 w-8 shrink-0 font-[family-name:var(--font-syne)] font-bold text-copper">
                {index + 1}.
              </span>
              <p className="leading-relaxed text-steel">{item}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 border border-copper/40 bg-ink-soft/60 px-5 py-4 text-sm text-fog/90">
          Original car documents remain at the company office.
        </div>

        <p className="mt-8 text-sm leading-relaxed text-steel">
          Office: {BUSINESS_LOCATION}
          <br />
          Email:{" "}
          <a
            href={`mailto:${BUSINESS_EMAIL}`}
            className="text-copper hover:text-copper-bright"
          >
            {BUSINESS_EMAIL}
          </a>
        </p>

        <p className="mt-8 border-t border-white/10 pt-8 text-sm text-steel">
          See also our{" "}
          <Link href="/faq" className="text-copper hover:text-copper-bright">
            FAQ
          </Link>{" "}
          or{" "}
          <a href="/#contact" className="text-copper hover:text-copper-bright">
            contact us
          </a>
          .
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
