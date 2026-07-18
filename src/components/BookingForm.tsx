"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Vehicle } from "@/lib/types";
import { formatPKR, PICKUP_LOCATIONS } from "@/lib/format";

function daysBetween(pickup: string, ret: string) {
  if (!pickup || !ret) return 0;
  const start = new Date(pickup);
  const end = new Date(ret);
  const ms = end.getTime() - start.getTime();
  return Math.max(Math.ceil(ms / (1000 * 60 * 60 * 24)), 0);
}

export function BookingForm({ vehicle }: { vehicle: Vehicle }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    pickupDate: "",
    returnDate: "",
    pickupLocation: PICKUP_LOCATIONS[0],
    notes: "",
  });

  const days = useMemo(
    () => daysBetween(form.pickupDate, form.returnDate),
    [form.pickupDate, form.returnDate]
  );
  const total = days * vehicle.pricePerDay;

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicleId: vehicle.id, ...form }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Booking failed");
        return;
      }
      router.push(`/book/success?id=${data.id}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full border border-white/15 bg-ink-soft px-4 py-3 text-fog outline-none transition focus:border-copper";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block text-steel">Full name</span>
          <input
            required
            className={inputClass}
            value={form.customerName}
            onChange={(e) => update("customerName", e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-2 block text-steel">Email</span>
          <input
            required
            type="email"
            className={inputClass}
            value={form.customerEmail}
            onChange={(e) => update("customerEmail", e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-2 block text-steel">Phone</span>
          <input
            required
            className={inputClass}
            value={form.customerPhone}
            onChange={(e) => update("customerPhone", e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-2 block text-steel">Pickup location</span>
          <select
            className={inputClass}
            value={form.pickupLocation}
            onChange={(e) => update("pickupLocation", e.target.value)}
          >
            {PICKUP_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-2 block text-steel">Pickup date</span>
          <input
            required
            type="date"
            className={inputClass}
            value={form.pickupDate}
            onChange={(e) => update("pickupDate", e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-2 block text-steel">Return date</span>
          <input
            required
            type="date"
            className={inputClass}
            value={form.returnDate}
            onChange={(e) => update("returnDate", e.target.value)}
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-2 block text-steel">Notes (optional)</span>
        <textarea
          rows={3}
          className={inputClass}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
      </label>

      <div className="flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-5">
        <div>
          <p className="text-sm text-steel">
            {days > 0 ? `${days} day${days > 1 ? "s" : ""}` : "Select dates"}
          </p>
          <p className="font-[family-name:var(--font-syne)] text-3xl font-bold text-white">
            {formatPKR(total || vehicle.pricePerDay)}
            <span className="ml-2 text-base font-medium text-steel">
              {days > 0 ? "total" : "/ day"}
            </span>
          </p>
        </div>
        <button
          type="submit"
          disabled={loading || !vehicle.available}
          className="bg-copper px-8 py-3 font-semibold text-ink transition hover:bg-copper-bright disabled:opacity-50"
        >
          {loading ? "Booking…" : "Confirm booking"}
        </button>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </form>
  );
}
