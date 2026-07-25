"use client";

import { useEffect, useState } from "react";

type Slide = {
  src: string;
  alt: string;
};

export function FleetCinematicHero({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const count = slides.length;

  useEffect(() => {
    if (count < 2) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % count);
    }, 4500);
    return () => window.clearInterval(id);
  }, [count]);

  if (count === 0) return null;

  return (
    <div className="fleet-cinema pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`fleet-cinema-slide absolute inset-0 ${
            index === active ? "is-active" : ""
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt=""
            className="fleet-cinema-img h-full w-full object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_70%_55%,rgba(201,162,39,0.14),transparent)]" />
    </div>
  );
}
