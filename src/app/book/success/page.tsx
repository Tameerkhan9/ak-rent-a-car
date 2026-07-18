import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  return (
    <div className="site-noise min-h-screen">
      <SiteHeader />
      <main className="mx-auto flex min-h-[80svh] max-w-2xl flex-col justify-center px-6 py-28 text-center">
        <p className="animate-rise text-xs uppercase tracking-[0.25em] text-copper">
          Booking received
        </p>
        <h1 className="animate-rise-delay mt-4 font-[family-name:var(--font-syne)] text-5xl font-extrabold text-white">
          You&apos;re all set
        </h1>
        <p className="animate-rise-delay-2 mx-auto mt-4 max-w-md text-steel">
          We have your reservation. Our team will follow up shortly
          {id ? ` (ref ${id.slice(0, 8)})` : ""}.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/fleet"
            className="bg-copper px-6 py-3 font-semibold text-ink hover:bg-copper-bright"
          >
            Browse more cars
          </Link>
          <Link
            href="/"
            className="border border-white/20 px-6 py-3 font-semibold text-white"
          >
            Home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
