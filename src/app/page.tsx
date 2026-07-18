import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getVehicles } from "@/lib/data";
import { VehicleCard } from "@/components/VehicleCard";
import { ContactDetails } from "@/components/ContactDetails";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const vehicles = (await getVehicles()).filter((v) => v.available);

  return (
    <div className="site-noise min-h-screen">
      <SiteHeader />

      <section className="relative min-h-[100svh] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/vehicles/civic-2017-black.png"
          alt="Honda Civic for rent in Batkhela"
          className="animate-pan absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-24 pt-28 sm:pb-28">
          <div className="animate-rise flex flex-wrap items-center gap-4 sm:gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-ak.png?v=3"
              alt="AK"
              className="-mt-3 h-28 w-auto object-contain sm:-mt-4 sm:h-36 md:h-44"
            />
            <div>
              <p className="font-[family-name:var(--font-syne)] text-2xl font-extrabold leading-tight tracking-wide text-white sm:text-4xl md:text-5xl">
                Rent A Car
                <br />
                &amp; Tourism Company
              </p>
            </div>
          </div>
          <p className="animate-rise-delay mt-5 max-w-lg text-base text-copper sm:text-lg">
            Your trusted place for safe travel and reliable car rental
          </p>
          <p className="animate-rise-delay-2 mt-3 max-w-md text-fog/85">
            Book online in Batkhela — near Waseem Medical Complex, opposite
            Shesho Masjid. Clear rates, honest service, cars you can count on.
          </p>
          <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-4">
            <Link
              href="/fleet"
              className="bg-copper px-7 py-3 font-semibold text-ink transition hover:bg-copper-bright"
            >
              Browse fleet
            </Link>
            <Link
              href="/fleet"
              className="border border-white/25 px-7 py-3 font-semibold text-white transition hover:border-copper/60"
            >
              Reserve a car
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 max-w-xl">
          <h2 className="font-[family-name:var(--font-syne)] text-4xl font-bold text-white sm:text-5xl">
            Choose your drive
          </h2>
          <p className="mt-3 text-steel">
            Civics, Grande, Yaris, GLI, Hilux Vigo, and Prado — clear daily rates
            in Pakistani Rupees.
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
        <div className="mt-12">
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 text-copper transition hover:text-copper-bright"
          >
            View full fleet →
          </Link>
        </div>
      </section>

      <section className="border-y border-white/10 bg-ink-soft">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-3">
          {[
            {
              title: "Trusted locally",
              copy: "A Batkhela company people know — honest rates and clear bookings.",
            },
            {
              title: "Cars & tourism",
              copy: "Rent a car for city trips, family travel, or tourism around all Pakistan.",
            },
            {
              title: "Book with confidence",
              copy: "Reserve online, get confirmed fast, and drive with peace of mind.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-steel">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-xs uppercase tracking-[0.25em] text-copper">
          Contact
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-syne)] text-4xl font-bold text-white sm:text-5xl">
          Call or WhatsApp us
        </h2>
        <p className="mt-3 max-w-xl text-steel">
          Tap a WhatsApp number to open a chat instantly. We are ready to help
          you book your car.
        </p>
        <div className="mt-10 max-w-md border border-white/10 bg-ink-soft/50 p-6 sm:p-8">
          <ContactDetails />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
