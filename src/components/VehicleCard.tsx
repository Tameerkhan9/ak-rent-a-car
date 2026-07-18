import Link from "next/link";
import type { Vehicle } from "@/lib/types";
import { formatPKR } from "@/lib/format";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <article className="group overflow-hidden border-b border-white/10 pb-8">
      <Link href={`/book/${vehicle.id}`} className="block">
        <div className="relative mb-5 aspect-[16/10] overflow-hidden bg-ink-soft">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={vehicle.image}
            alt={`${vehicle.year} ${vehicle.color} ${vehicle.brand} ${vehicle.name}`}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          {!vehicle.available && (
            <span className="absolute left-4 top-4 bg-ink/80 px-3 py-1 text-xs uppercase tracking-wider text-fog">
              Unavailable
            </span>
          )}
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-copper">
              {vehicle.year} · {vehicle.color}
            </p>
            <h3 className="mt-1 font-[family-name:var(--font-syne)] text-2xl font-bold text-white">
              {vehicle.brand} {vehicle.name}
            </h3>
            <p className="mt-2 max-w-md text-sm text-steel">
              {vehicle.seats} seats · {vehicle.transmission} · {vehicle.fuel}
            </p>
          </div>
          <div className="text-right">
            <p className="font-[family-name:var(--font-syne)] text-xl font-bold text-white sm:text-2xl">
              {formatPKR(vehicle.pricePerDay)}
            </p>
            <p className="text-xs text-steel">per day</p>
          </div>
        </div>
      </Link>
    </article>
  );
}
