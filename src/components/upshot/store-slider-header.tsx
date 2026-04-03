"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

type StoreSliderSlide = {
  ctaHref: string;
  ctaLabel: string;
  description: string;
  eyebrow: string;
  title: string;
};

export function StoreSliderHeader({
  descriptionClassName,
  slides,
}: {
  descriptionClassName?: string;
  slides: StoreSliderSlide[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [slides.length]);

  if (!slides.length) {
    return null;
  }

  const activeSlide = slides[activeIndex];

  return (
    <div className="overflow-hidden rounded-[26px] border border-[#232323] bg-[radial-gradient(circle_at_top_left,_rgba(137,253,252,0.09),_transparent_34%),linear-gradient(180deg,#171717_0%,#0f0f0f_100%)] px-7 py-7 md:px-14 md:py-12">
      <div className="max-w-[760px]">
        <div className="font-good-headline-medium text-[14px] uppercase tracking-[0.22em] text-[#9aefff]">
          {activeSlide.eyebrow}
        </div>
        <h1 className="mt-5 font-good-headline-bold text-[46px] leading-[0.95] text-white md:text-[60px]">
          {activeSlide.title}
        </h1>
        <p
          className={`mt-6 max-w-[500px] font-sans text-[18px] leading-[1.9] text-[#cdcdcd] ${
            descriptionClassName ?? ""
          }`}
        >
          {activeSlide.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={activeSlide.ctaHref}
            className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#89fdfc] to-[#96e3ff] px-8 py-3 font-good-headline-medium text-[18px] leading-6 text-[#111]"
          >
            {activeSlide.ctaLabel}
          </Link>
        </div>

        <div className="mt-8 flex items-center gap-2.5">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={`${slide.title}-${index}`}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-pressed={isActive}
                onClick={() => setActiveIndex(index)}
                className={`rounded-full transition-all duration-200 ${
                  isActive ? "h-[8px] w-[24px] bg-[#89fdfc]" : "h-[8px] w-[8px] bg-white/20 hover:bg-white/40"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
