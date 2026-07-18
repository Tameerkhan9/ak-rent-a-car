import Link from "next/link";

type BrandLogoProps = {
  href?: string | null;
  markClassName?: string;
  showText?: boolean;
  stacked?: boolean;
};

export function BrandLogo({
  href = "/",
  markClassName = "h-12 w-auto sm:h-14",
  showText = true,
  stacked = false,
}: BrandLogoProps) {
  const content = (
    <span
      className={`inline-flex items-center gap-3 ${
        stacked ? "flex-col items-start gap-2" : ""
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-ak.png?v=3"
        alt=""
        className={`-mt-1 object-contain object-left ${markClassName}`}
      />
      {showText && (
        <span
          className={`font-[family-name:var(--font-syne)] font-bold leading-tight tracking-wide text-white ${
            stacked ? "text-xl sm:text-2xl" : "text-sm sm:text-base"
          }`}
        >
          Rent A Car
          <br />
          &amp; Tourism Company
        </span>
      )}
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center"
      aria-label="AK Rent A Car & Tourism Company home"
    >
      {content}
    </Link>
  );
}
