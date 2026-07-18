"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Vehicle, VehicleCategory } from "@/lib/types";
import { formatPKR } from "@/lib/format";

const emptyForm = {
  name: "",
  brand: "",
  year: new Date().getFullYear(),
  color: "",
  category: "sedan" as VehicleCategory,
  seats: 5,
  transmission: "automatic" as "automatic" | "manual",
  fuel: "Petrol",
  pricePerDay: 5000,
  image: "",
  available: true,
  description: "",
};

export function VehicleManager({
  initialVehicles,
}: {
  initialVehicles: Vehicle[];
}) {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function startEdit(v: Vehicle) {
    setEditingId(v.id);
    setForm({
      name: v.name,
      brand: v.brand,
      year: v.year,
      color: v.color,
      category: v.category,
      seats: v.seats,
      transmission: v.transmission,
      fuel: v.fuel,
      pricePerDay: v.pricePerDay,
      image: v.image,
      available: v.available,
      description: v.description,
    });
  }

  function reset() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url = editingId ? `/api/vehicles/${editingId}` : "/api/vehicles";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        setError("Could not save vehicle");
        return;
      }
      reset();
      router.refresh();
    } catch {
      setError("Could not save vehicle");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this vehicle?")) return;
    await fetch(`/api/vehicles/${id}`, { method: "DELETE" });
    router.refresh();
  }

  async function toggleAvailable(v: Vehicle) {
    await fetch(`/api/vehicles/${v.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...v, available: !v.available }),
    });
    router.refresh();
  }

  const input =
    "w-full border border-white/15 bg-black/30 px-3 py-2 text-sm text-fog outline-none focus:border-copper";

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
      <form
        onSubmit={onSubmit}
        className="space-y-3 border border-white/10 bg-ink-soft/70 p-5"
      >
        <h2 className="font-[family-name:var(--font-syne)] text-lg font-bold text-white">
          {editingId ? "Edit vehicle" : "Add vehicle"}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className={input}
            placeholder="Brand"
            required
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
          />
          <input
            className={input}
            placeholder="Model name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className={input}
            type="number"
            min={1990}
            placeholder="Year"
            required
            value={form.year}
            onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
          />
          <input
            className={input}
            placeholder="Color"
            required
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
          />
          <select
            className={input}
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value as VehicleCategory })
            }
          >
            <option value="economy">Economy</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="pickup">Pickup</option>
          </select>
          <select
            className={input}
            value={form.transmission}
            onChange={(e) =>
              setForm({
                ...form,
                transmission: e.target.value as "automatic" | "manual",
              })
            }
          >
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
          </select>
          <input
            className={input}
            type="number"
            min={2}
            placeholder="Seats"
            value={form.seats}
            onChange={(e) =>
              setForm({ ...form, seats: Number(e.target.value) })
            }
          />
          <input
            className={input}
            placeholder="Fuel"
            value={form.fuel}
            onChange={(e) => setForm({ ...form, fuel: e.target.value })}
          />
          <input
            className={input}
            type="number"
            min={1}
            placeholder="Price per day (Rs)"
            value={form.pricePerDay}
            onChange={(e) =>
              setForm({ ...form, pricePerDay: Number(e.target.value) })
            }
          />
          <label className="flex items-center gap-2 text-sm text-fog/80">
            <input
              type="checkbox"
              checked={form.available}
              onChange={(e) =>
                setForm({ ...form, available: e.target.checked })
              }
            />
            Available for booking
          </label>
        </div>
        <input
          className={input}
          placeholder="Image path e.g. /vehicles/my-car.png"
          required
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <textarea
          className={input}
          rows={3}
          placeholder="Description"
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-copper px-4 py-2 text-sm font-semibold text-ink transition hover:bg-copper-bright disabled:opacity-50"
          >
            {saving ? "Saving…" : editingId ? "Update" : "Add vehicle"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={reset}
              className="border border-white/15 px-4 py-2 text-sm text-fog hover:border-copper/50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {initialVehicles.map((v) => (
          <div
            key={v.id}
            className="flex flex-wrap items-center justify-between gap-3 border border-white/10 bg-ink-soft/70 p-4"
          >
            <div>
              <p className="font-semibold text-white">
                {v.year} {v.color} {v.brand} {v.name}
              </p>
              <p className="text-sm text-steel">
                {formatPKR(v.pricePerDay)}/day · {v.category} ·{" "}
                {v.available ? "Available" : "Unavailable"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <button
                type="button"
                onClick={() => toggleAvailable(v)}
                className="border border-white/15 px-3 py-1.5 text-fog/80 hover:border-copper/50 hover:text-copper"
              >
                {v.available ? "Mark unavailable" : "Mark available"}
              </button>
              <button
                type="button"
                onClick={() => startEdit(v)}
                className="border border-white/15 px-3 py-1.5 text-fog/80 hover:border-copper/50 hover:text-copper"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => remove(v.id)}
                className="border border-rose-400/30 px-3 py-1.5 text-rose-300 hover:bg-rose-400/10"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
