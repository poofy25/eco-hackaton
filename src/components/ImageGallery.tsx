"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <div className="space-y-3">
        {/* Main Image */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="relative w-full aspect-[4/3] overflow-hidden rounded-xl cursor-zoom-in"
        >
          <img
            src={images[activeIndex]}
            alt={`${alt} - Image ${activeIndex + 1}`}
            className="h-full w-full object-cover"
          />
        </button>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                  i === activeIndex
                    ? "border-forest"
                    : "border-transparent hover:border-stone/30"
                }`}
              >
                <img
                  src={img}
                  alt={`${alt} thumbnail ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-charcoal/95">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                }
                className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={() =>
                  setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
                }
                className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </>
          )}

          <img
            src={images[activeIndex]}
            alt={`${alt} - Full size ${activeIndex + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
          />

          {images.length > 1 && (
            <div className="absolute bottom-6 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    i === activeIndex ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
