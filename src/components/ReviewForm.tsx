"use client";

import { useState } from "react";
import type { Vehicle } from "@/lib/types";

export function ReviewForm({ vehicles }: { vehicles: Vehicle[] }) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [vehicleId, setVehicleId] = useState(vehicles[0]?.id ?? "");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          vehicleId,
          rating,
          comment,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not submit review.");
        return;
      }
      setSuccess(
        data.message ||
          "Thanks! Your review was submitted and will appear after approval."
      );
      setComment("");
      setRating(5);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 border border-white/10 bg-ink-soft/50 p-6 sm:p-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-copper">
          After return
        </p>
        <h3 className="mt-2 font-[family-name:var(--font-syne)] text-2xl font-bold text-white">
          Leave a review
        </h3>
        <p className="mt-2 text-sm text-steel">
          Available when your booking status is{" "}
          <span className="text-fog">completed</span> (car returned).
        </p>
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-[0.16em] text-steel">
          Your name
        </span>
        <input
          required
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="mt-2 w-full border border-white/15 bg-ink px-4 py-3 text-sm text-white outline-none focus:border-copper"
          placeholder="Full name"
        />
      </label>

      <label className="block">
        <span className="text-xs uppercase tracking-[0.16em] text-steel">
          Phone used for booking
        </span>
        <input
          required
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          className="mt-2 w-full border border-white/15 bg-ink px-4 py-3 text-sm text-white outline-none focus:border-copper"
          placeholder="03XX XXXXXXX"
        />
      </label>

      <label className="block">
        <span className="text-xs uppercase tracking-[0.16em] text-steel">
          Vehicle you rented
        </span>
        <select
          required
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
          className="mt-2 w-full border border-white/15 bg-ink px-4 py-3 text-sm text-white outline-none focus:border-copper"
        >
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.year} {v.color} {v.brand} {v.name}
            </option>
          ))}
        </select>
      </label>

      <div>
        <span className="text-xs uppercase tracking-[0.16em] text-steel">
          Rating
        </span>
        <div className="mt-3 flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              className={`px-3 py-2 text-sm font-semibold transition ${
                rating >= n
                  ? "bg-copper text-ink"
                  : "border border-white/15 text-fog/70 hover:border-copper/50"
              }`}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
            >
              {n}★
            </button>
          ))}
        </div>
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-[0.16em] text-steel">
          Your experience
        </span>
        <textarea
          required
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-2 w-full resize-y border border-white/15 bg-ink px-4 py-3 text-sm text-white outline-none focus:border-copper"
          placeholder="How was the car and service?"
        />
      </label>

      {error && <p className="text-sm text-red-300">{error}</p>}
      {success && <p className="text-sm text-emerald-300">{success}</p>}

      <button
        type="submit"
        disabled={busy}
        className="bg-copper px-6 py-3 text-sm font-semibold text-ink transition hover:bg-copper-bright disabled:opacity-60"
      >
        {busy ? "Submitting…" : "Submit review"}
      </button>
    </form>
  );
}
