import Link from "next/link";
import type { PublicReview } from "@/lib/types";

function Stars({ rating }: { rating: number }) {
  return (
    <p className="text-copper" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rating)}
      <span className="text-white/20">{"★".repeat(5 - rating)}</span>
    </p>
  );
}

export function ReviewsSection({
  reviews,
  showFormLink = true,
  compact = false,
}: {
  reviews: PublicReview[];
  showFormLink?: boolean;
  compact?: boolean;
}) {
  return (
    <section
      id="reviews"
      className={compact ? "" : "mx-auto max-w-6xl px-6 py-20"}
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.25em] text-copper">
            Reviews
          </p>
          <h2
            className={`mt-3 font-[family-name:var(--font-syne)] font-bold text-white ${
              compact ? "text-3xl" : "text-4xl sm:text-5xl"
            }`}
          >
            What customers say
          </h2>
          {!compact && (
            <p className="mt-3 text-steel">
              Real feedback after cars are returned. Share your experience too.
            </p>
          )}
        </div>
        {showFormLink && (
          <Link
            href="/reviews"
            className="border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-copper/60"
          >
            Write a review
          </Link>
        )}
      </div>

      {reviews.length === 0 ? (
        <p className="mt-10 border border-dashed border-white/15 px-6 py-12 text-center text-steel">
          No reviews yet. After your rental is completed, you can leave the
          first one.
        </p>
      ) : (
        <div
          className={`mt-10 grid gap-6 ${compact ? "grid-cols-1" : "md:grid-cols-2"}`}
        >
          {reviews.map((review) => (
            <article
              key={review.id}
              className="border border-white/10 bg-ink-soft/40 p-6"
            >
              <Stars rating={review.rating} />
              <p className="mt-4 text-fog/90 leading-relaxed">
                “{review.comment}”
              </p>
              <p className="mt-5 text-sm font-semibold text-white">
                {review.customerName}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
