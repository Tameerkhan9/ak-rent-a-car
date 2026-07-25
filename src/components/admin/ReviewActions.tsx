"use client";

import { useRouter } from "next/navigation";
import type { ReviewStatus } from "@/lib/types";

const statuses: ReviewStatus[] = ["pending", "approved", "rejected"];

export function ReviewActions({
  id,
  status,
}: {
  id: string;
  status: ReviewStatus;
}) {
  const router = useRouter();

  async function update(next: ReviewStatus) {
    await fetch(`/api/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    router.refresh();
  }

  async function remove() {
    if (!confirm("Delete this review permanently?")) return;
    await fetch(`/api/reviews/${id}`, { method: "DELETE" });
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
