import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingForm } from "@/components/BookingForm";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getVehicleById } from "@/lib/data";
import { formatPKR } from "@/lib/format";

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);
  if (!vehicle) notFound();

  return (
    <div className="site-noise min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 pb-20 pt-28">
        <Link href="/fleet" className="text-sm text-steel hover:text-fog">
          ← Back to fleet
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="aspect-[16/11] overflow-hidden bg-ink-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={vehicle.image}
                alt={`${vehicle.year} ${vehicle.color} ${vehicle.brand} ${vehicle.name}`}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-copper">
              {vehicle.year} · {vehicle.color} · {vehicle.category}
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-syne)] text-4xl font-bold text-white">
              {vehicle.brand} {vehicle.name}
            </h1>
            <p className="mt-3 text-steel">{vehicle.description}</p>
            <p className="mt-4 text-sm text-fog/80">
              {vehicle.seats} seats · {vehicle.transmission} · {vehicle.fuel} ·{" "}
              {formatPKR(vehicle.pricePerDay)}/day
            </p>
          </div>

          <div className="border border-white/10 bg-ink-soft/60 p-6 sm:p-8">
            <h2 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-white">
              Reserve this car
            </h2>
            <p className="mt-2 mb-8 text-sm text-steel">
              Submit your details and we will confirm your booking.
            </p>
            <BookingForm vehicle={vehicle} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
