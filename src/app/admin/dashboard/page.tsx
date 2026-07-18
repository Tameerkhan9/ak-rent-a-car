import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { getBookings, getVehicles } from "@/lib/data";
import { formatPKR } from "@/lib/format";

export default async function DashboardPage() {
  const [bookings, vehicles] = await Promise.all([getBookings(), getVehicles()]);
  const pending = bookings.filter((b) => b.status === "pending").length;
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const available = vehicles.filter((v) => v.available).length;
  const revenue = bookings
    .filter((b) => b.status === "confirmed" || b.status === "completed")
    .reduce((sum, b) => sum + b.totalPrice, 0);
  const recent = bookings.slice(0, 6);

  const stats = [
    {
      label: "Total bookings",
      value: String(bookings.length),
      hint: "All time",
      accent: "from-copper/30 to-transparent",
    },
    {
      label: "Pending",
      value: String(pending),
      hint: "Needs your reply",
      accent: "from-amber-400/25 to-transparent",
    },
    {
      label: "Confirmed",
      value: String(confirmed),
      hint: "Ready to go",
      accent: "from-emerald-400/25 to-transparent",
    },
    {
      label: "Fleet ready",
      value: `${available}/${vehicles.length}`,
      hint: "Cars available",
      accent: "from-sky-400/25 to-transparent",
    },
  ];

  return (
    <AdminShell
      title="Overview"
      subtitle="Track bookings, confirm reservations, and manage your Batkhela fleet."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`relative overflow-hidden border border-white/10 bg-gradient-to-br ${stat.accent} bg-ink-soft/80 p-5`}
          >
            <p className="text-xs uppercase tracking-[0.18em] text-steel">
              {stat.label}
            </p>
            <p className="mt-3 font-[family-name:var(--font-syne)] text-4xl font-bold text-white">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-fog/60">{stat.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <section className="border border-white/10 bg-ink-soft/60 p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-[family-name:var(--font-syne)] text-xl font-bold text-white">
                Recent bookings
              </h2>
              <p className="mt-1 text-sm text-steel">Latest customer requests</p>
            </div>
            <Link
              href="/admin/bookings"
              className="text-sm text-copper transition hover:text-copper-bright"
            >
              View all →
            </Link>
          </div>

          {recent.length === 0 ? (
            <div className="border border-dashed border-white/15 px-4 py-10 text-center text-sm text-steel">
              No bookings yet. When customers book online, they appear here.
            </div>
          ) : (
            <ul className="space-y-3">
              {recent.map((b) => (
                <li
                  key={b.id}
                  className="border border-white/10 bg-black/20 px-4 py-4 transition hover:border-copper/40"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{b.customerName}</p>
                      <p className="mt-1 text-sm text-steel">{b.vehicleName}</p>
                    </div>
                    <StatusBadge status={b.status} />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-fog/70">
                    <span>
                      {b.pickupDate} → {b.returnDate}
                    </span>
                    <span>{formatPKR(b.totalPrice)}</span>
                    <span>{b.customerPhone}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="border border-white/10 bg-ink-soft/60 p-5 sm:p-6">
          <h2 className="font-[family-name:var(--font-syne)] text-xl font-bold text-white">
            Quick actions
          </h2>
          <p className="mt-1 text-sm text-steel">Jump to common tasks</p>

          <div className="mt-6 space-y-3">
            <Link
              href="/admin/bookings"
              className="block border border-white/10 bg-black/20 px-4 py-4 transition hover:border-copper/50"
            >
              <p className="font-semibold text-white">Manage bookings</p>
              <p className="mt-1 text-sm text-steel">
                Confirm, complete, or cancel requests
              </p>
            </Link>
            <Link
              href="/admin/vehicles"
              className="block border border-white/10 bg-black/20 px-4 py-4 transition hover:border-copper/50"
            >
              <p className="font-semibold text-white">Edit fleet</p>
              <p className="mt-1 text-sm text-steel">
                Prices, availability, and car details
              </p>
            </Link>
            <Link
              href="/fleet"
              className="block border border-white/10 bg-black/20 px-4 py-4 transition hover:border-copper/50"
            >
              <p className="font-semibold text-white">Open public fleet</p>
              <p className="mt-1 text-sm text-steel">
                See what customers see online
              </p>
            </Link>
          </div>

          <div className="mt-6 border border-copper/30 bg-copper/10 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-copper">
              Confirmed revenue
            </p>
            <p className="mt-2 font-[family-name:var(--font-syne)] text-3xl font-bold text-white">
              {formatPKR(revenue)}
            </p>
            <p className="mt-1 text-xs text-fog/60">
              From confirmed + completed bookings
            </p>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
