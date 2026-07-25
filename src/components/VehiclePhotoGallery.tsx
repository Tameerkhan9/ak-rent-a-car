"use client";

import { useState } from "react";

export function VehiclePhotoGallery({
  alt,
  images,
}: {
  alt: string;
  images: string[];
}) {
  const photos = images.filter(Boolean);
  const [active, setActive] = useState(0);
  const current = photos[active] ?? photos[0];

  if (!current) return null;

  return (
    <div>
      <div className="aspect-[16/11] overflow-hidden bg-ink-soft">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>
      {photos.length > 1 && (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {photos.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              className={`aspect-[16/11] overflow-hidden border transition ${
                index === active
                  ? "border-copper"
                  : "border-white/10 opacity-70 hover:opacity-100"
              }`}
              aria-label={`Show photo ${index + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
