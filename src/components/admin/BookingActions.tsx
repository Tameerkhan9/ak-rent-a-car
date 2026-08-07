"use client";

import { useRouter } from "next/navigation";
import type { BookingStatus } from "@/lib/types";

const statuses: BookingStatus[] = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];

export function BookingActions({
  id,
  status,
}: {
  id: string;
  status: BookingStatus;
}) {
  const router = useRouter();

  async function update(next: BookingStatus) {
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    router.refresh();
  }

  async function remove() {
    if (!confirm("Delete this booking permanently?")) return;
    const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("Could not delete booking. Please try again.");
      return;
    }
    router.refresh();
  }

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {statuses.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => update(s)}
          disabled={s === status}
          className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
            s === status
              ? "bg-copper text-ink"
              : "border border-white/15 text-fog/80 hover:border-copper/50 hover:text-copper"
          }`}
        >
          {s}
        </button>
      ))}
      <button
        type="button"
        onClick={remove}
        className="border border-red-400/30 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-red-300 transition hover:border-red-300/60"
      >
        Delete
      </button>
    </div>
  );
}
