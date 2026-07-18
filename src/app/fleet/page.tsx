import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { VehicleCard } from "@/components/VehicleCard";
import { getVehicles } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function FleetPage() {
  const vehicles = await getVehicles();

  return (
    <div className="site-noise min-h-screen">
      <div className="relative overflow-hidden border-b border-white/10">
        <SiteHeader />
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-32">
          <p className="animate-rise text-xs uppercase tracking-[0.25em] text-copper">
            AK Rent A Car &amp; Tourism Company
          </p>
          <h1 className="animate-rise-delay mt-3 font-[family-name:var(--font-syne)] text-5xl font-extrabold text-white sm:text-6xl">
            Available vehicles
          </h1>
          <p className="animate-rise-delay-2 mt-4 max-w-lg text-steel">
            Your trusted fleet in Batkhela — clear rates in Rs per day. Pickup
            near Waseem Medical Complex, opposite Shesho Masjid.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
