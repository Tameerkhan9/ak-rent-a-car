import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ReviewForm } from "@/components/ReviewForm";
import { ReviewsSection } from "@/components/ReviewsSection";
import { getApprovedReviews, getVehicles } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Reviews",
  description:
    "Customer reviews for AK Rent A Car in Batkhela. Read real feedback and leave a review after your rental.",
  alternates: { canonical: "/reviews" },
};

export default async function ReviewsPage() {
  const [reviews, vehicles] = await Promise.all([
    getApprovedReviews(),
    getVehicles(),
  ]);

  return (
    <div className="site-noise min-h-screen">
      <div className="relative overflow-hidden border-b border-white/10">
        <SiteHeader />
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-32">
          <p className="animate-rise text-xs uppercase tracking-[0.25em] text-copper">
            Customer feedback
          </p>
          <h1 className="animate-rise-delay mt-3 font-[family-name:var(--font-syne)] text-5xl font-extrabold text-white sm:text-6xl">
            Reviews
          </h1>
          <p className="animate-rise-delay-2 mt-4 max-w-xl text-steel">
            After you return the car and your booking is marked completed, you
            can rate your experience here.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1fr_1.1fr]">
        <ReviewForm vehicles={vehicles} />
        <ReviewsSection reviews={reviews} showFormLink={false} compact />
      </div>

      <SiteFooter />
    </div>
  );
}
