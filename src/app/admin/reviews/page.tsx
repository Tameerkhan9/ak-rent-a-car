import { AdminShell } from "@/components/admin/AdminShell";
import { ReviewActions } from "@/components/admin/ReviewActions";
import { getReviews } from "@/lib/data";
import type { ReviewStatus } from "@/lib/types";

const badge: Record<ReviewStatus, string> = {
  pending: "bg-amber-400/15 text-amber-300 ring-1 ring-amber-400/30",
  approved: "bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/30",
  rejected: "bg-red-400/15 text-red-300 ring-1 ring-red-400/30",
};

export default async function AdminReviewsPage() {
  const reviews = await getReviews();
  const pending = reviews.filter((r) => r.status === "pending").length;

  return (
    <AdminShell
      title="Reviews"
      subtitle="Approve customer feedback before it appears on the website."
    >
      <p className="mb-6 text-sm text-steel">
        {pending > 0
          ? `${pending} review${pending === 1 ? "" : "s"} waiting for approval.`
          : "No pending reviews."}{" "}
        Tip: mark a booking as <span className="text-fog">completed</span> after
        the car is returned so the customer can submit a review.
      </p>

      {reviews.length === 0 ? (
        <div className="border border-dashed border-white/15 px-6 py-16 text-center text-steel">
          No reviews yet.
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <article
              key={r.id}
              className="border border-white/10 bg-ink-soft/70 p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-[family-name:var(--font-syne)] text-xl font-bold text-white">
                    {r.vehicleName}
                  </h2>
                  <p className="mt-1 text-sm text-steel">
                    {r.customerName} · {r.customerPhone} ·{" "}
                    {new Date(r.createdAt).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`inline-flex px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${badge[r.status]}`}
                >
                  {r.status}
                </span>
              </div>

              <p className="mt-4 text-copper">
                {"★".repeat(r.rating)}
                <span className="text-white/20">
                  {"★".repeat(5 - r.rating)}
                </span>
              </p>
              <p className="mt-3 text-fog/90 leading-relaxed">“{r.comment}”</p>
              <p className="mt-3 text-xs text-steel">Booking: {r.bookingId}</p>

              <ReviewActions id={r.id} status={r.status} />
            </article>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
