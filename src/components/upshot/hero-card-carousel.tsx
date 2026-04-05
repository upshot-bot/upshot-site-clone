/* eslint-disable @next/next/no-img-element */

"use client";

import type { CSSProperties, MouseEvent } from "react";
import { useEffect, useState } from "react";

import { SparkleIcon } from "@/components/icons";

const heroCards = [
  { alt: "Prediction card 1", src: "/images/hero/tile-1.png" },
  { alt: "Prediction card 2", src: "/images/hero/tile-2.png" },
  { alt: "Prediction card 3", src: "/images/hero/tile-3.png" },
] as const;

const defaultTilt = {
  rotateX: 0,
  rotateY: 0,
};

function wrapIndex(value: number) {
  return (value + heroCards.length) % heroCards.length;
}

function getCardSlot(cardIndex: number, activeIndex: number) {
  if (cardIndex === activeIndex) {
    return "center";
  }

  if (cardIndex === wrapIndex(activeIndex - 1)) {
    return "left";
  }

  return "right";
}

function getSlotClass(slot: ReturnType<typeof getCardSlot>) {
  switch (slot) {
    case "center":
      return "left-1/2 top-[12%] z-20 w-[45%] -translate-x-1/2 opacity-100";
    case "left":
      return "left-[26%] top-[25%] z-10 w-[27.5%] -translate-x-1/2 -rotate-[8deg] opacity-72";
    case "right":
      return "left-[74%] top-[25%] z-10 w-[27.5%] -translate-x-1/2 rotate-[8deg] opacity-72";
  }
}

export function HeroCardCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [tilt, setTilt] = useState(defaultTilt);
  const showCard = (index: number) => {
    setTilt(defaultTilt);
    setActiveIndex(index);
  };

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setTilt(defaultTilt);
      setActiveIndex((current) => wrapIndex(current + 1));
    }, 3400);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  const handleCenterCardMove = (event: MouseEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    setTilt({
      rotateX: (0.5 - y) * 14,
      rotateY: (x - 0.5) * 16,
    });
  };

  const resetCenterCardTilt = () => {
    setTilt(defaultTilt);
  };

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <img
        src="/images/carousel-stars.svg"
        alt=""
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-contain opacity-95"
      />

      <SparkleIcon className="pointer-events-none absolute bottom-[6%] left-[7%] z-20 h-14 w-14 text-[#8efff7] opacity-90" />
      <SparkleIcon className="pointer-events-none absolute bottom-[8%] right-[12%] z-20 h-8 w-8 text-[#8efff7]" />

      {heroCards.map((card, index) => {
        const slot = getCardSlot(index, activeIndex);

        return (
          <button
            key={card.src}
            type="button"
            aria-label={`Show ${card.alt}`}
            onClick={() => showCard(index)}
            onMouseLeave={slot === "center" ? resetCenterCardTilt : undefined}
            onMouseMove={slot === "center" ? handleCenterCardMove : undefined}
            className={`group absolute origin-center cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${getSlotClass(slot)}`}
          >
            <div
              className="relative rounded-[18px] transition-transform duration-300 ease-out"
              style={
                slot === "center"
                  ? ({
                      transform: `perspective(1400px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.02,1.02,1.02)`,
                      transformStyle: "preserve-3d",
                    } satisfies CSSProperties)
                  : undefined
              }
            >
              <img
                src={card.src}
                alt={card.alt}
                className={`relative z-0 w-full rounded-[18px] shadow-[0_30px_80px_rgba(0,0,0,0.55)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  slot === "center"
                    ? "shadow-[0_32px_90px_rgba(0,0,0,0.55)] group-hover:shadow-[0_0_44px_rgba(137,253,252,0.72),0_32px_90px_rgba(0,0,0,0.55)]"
                    : "blur-[0.15px] saturate-[0.92] group-hover:shadow-[0_0_32px_rgba(137,253,252,0.58),0_30px_80px_rgba(0,0,0,0.55)]"
                }`}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
