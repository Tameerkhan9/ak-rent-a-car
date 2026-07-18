"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";

export default function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Wrong password");
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-shell flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md border border-white/10 bg-ink-soft/80 p-8 shadow-[0_0_80px_rgba(201,162,39,0.08)]">
        <BrandLogo markClassName="h-16 w-auto" showText={false} />
        <p className="mt-5 text-xs uppercase tracking-[0.25em] text-copper">
          AK Control
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-syne)] text-3xl font-bold text-white">
          Admin login
        </h1>
        <p className="mt-2 text-sm text-steel">
          Manage bookings, fleet, and day-to-day rentals.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block text-sm">
            <span className="mb-2 block text-steel">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-white/15 bg-black/40 px-4 py-3 text-fog outline-none focus:border-copper"
            />
          </label>
          {error && <p className="text-sm text-rose-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-copper py-3 font-semibold text-ink transition hover:bg-copper-bright disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
