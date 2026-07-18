"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin/dashboard", label: "Overview" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/vehicles", label: "Vehicles" },
];

export function AdminNav({
  orientation = "vertical",
}: {
  orientation?: "vertical" | "horizontal";
}) {
  const pathname = usePathname();
  const horizontal = orientation === "horizontal";

  return (
    <nav
      className={
        horizontal
          ? "flex items-center gap-1"
          : "flex flex-col gap-1"
      }
    >
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap px-4 py-2.5 text-sm transition ${
              active
                ? "bg-copper/15 text-copper"
                : "text-fog/70 hover:bg-white/5 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
      {!horizontal && (
        <Link
          href="/"
          className="mt-4 px-4 py-2.5 text-sm text-steel hover:text-fog"
        >
          ← Public site
        </Link>
      )}
      {horizontal && (
        <Link
          href="/"
          className="whitespace-nowrap px-4 py-2.5 text-sm text-steel hover:text-fog"
        >
          Public site
        </Link>
      )}
    </nav>
  );
}
