import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { VehicleCard } from "@/components/VehicleCard";
import { getVehicles } from "@/lib/data";

export const dynamic = "force-dynamic";

const LINEUP_IDS = ["v1", "v8", "v5", "v6", "v10", "v2"];

export default async function FleetPage() {
  const vehicles = await getVehicles();
  const lineup = LINEUP_IDS.map((id) => vehicles.find((v) => v.id === id)).filter(
    (v): v is NonNullable<typeof v> => Boolean(v)
  );
  const showcase = lineup.length >= 4 ? lineup : vehicles.slice(0, 6);

  return (
    <div className="site-noise min-h-screen">
      <div className="relative overflow-hidden border-b border-white/10">
        <SiteHeader />

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-ink via-ink/80 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(201,162,39,0.12),transparent)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-6 pt-32">
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

        <div className="animate-fade relative mx-auto max-w-6xl px-2 pb-2 sm:px-4">
          <div className="flex items-end justify-center">
            {showcase.map((vehicle, index) => {
              const mid = (showcase.length - 1) / 2;
              const depth = Math.abs(index - mid);
              const scale = 1 - depth * 0.04;
              const z = 20 - Math.round(depth * 2);

              return (
                <div
                  key={vehicle.id}
                  className="relative w-[28%] min-w-[5.5rem] max-w-[11rem] shrink-0 sm:w-[22%] sm:min-w-[7rem] sm:max-w-[13rem] md:max-w-[14.5rem]"
                  style={{
                    marginLeft: index === 0 ? 0 : "-1.75rem",
                    zIndex: z,
                    transform: `scale(${scale}) translateY(${depth * 6}px)`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={vehicle.image}
                    alt=""
                    className="h-auto w-full object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.65)]"
                  />
                </div>
              );
            })}
          </div>
          <div
            className="pointer-events-none absolute inset-x-8 bottom-0 h-10 rounded-[100%] bg-black/45 blur-xl sm:inset-x-16"
            aria-hidden
          />
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
