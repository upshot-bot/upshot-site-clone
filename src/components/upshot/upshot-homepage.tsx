/* eslint-disable @next/next/no-img-element */

import type { CSSProperties } from "react";

import { ContestBoard } from "@/components/upshot/contest-board";
import { HeroCardCarousel } from "@/components/upshot/hero-card-carousel";
import {
  UpshotLink,
  UpshotPageFrame,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/upshot/upshot-shell";
import {
  featuredCards,
  featuredContests,
  heroActions,
  homepageFeaturedEvents,
  howToSteps,
} from "@/lib/upshot-data";
import type { EventItem, HowToStep } from "@/types/upshot";

const EVENT_COLLAGE_CARD_WIDTH = 129;
const EVENT_COLLAGE_CARD_HEIGHT = 181;
const EVENT_COLLAGE_GAP = 16;
const heroBuyPackButtonClass =
  "inline-flex items-center justify-center rounded-full border border-[#89fdfc] bg-transparent px-6 py-3 font-good-headline-medium text-[18px] leading-6 text-white transition-all duration-200 hover:bg-linear-to-r hover:from-[#89fdfc] hover:to-[#96e3ff] hover:text-[#111]";
const sectionPillLinkClass =
  "inline-flex items-center justify-center rounded-full border border-[#5f96a1] bg-[#1b2628] px-4 py-[9px] font-sans text-[13px] font-medium leading-none text-white transition-all duration-200 hover:border-[#89fdfc] hover:bg-linear-to-r hover:from-[#89fdfc] hover:to-[#96e3ff] hover:font-semibold hover:text-[#111]";

function rotateThumbnails(thumbnails: string[], offset: number) {
  return thumbnails.map((_, index) => thumbnails[(index + offset) % thumbnails.length]);
}

function renderHowToDescription(step: HowToStep) {
  return step.description;
}

function EventCollageStrip({
  direction,
  eventTitle,
  offset,
  thumbnails,
  duration,
}: {
  direction: "up" | "down";
  eventTitle: string;
  offset: number;
  thumbnails: string[];
  duration: number;
}) {
  const loopDistance = thumbnails.length * (EVENT_COLLAGE_CARD_HEIGHT + EVENT_COLLAGE_GAP);
  const trackStyle = {
    "--loop-distance": `${loopDistance}px`,
    "--loop-offset": `${offset}px`,
    animationDuration: `${duration}s`,
  } as CSSProperties;

  return (
    <div className="relative h-full w-[129px] overflow-hidden">
      <div
        className={`event-collage-track flex flex-col gap-4 will-change-transform ${direction === "up" ? "event-collage-track-up" : "event-collage-track-down"}`}
        style={trackStyle}
      >
        {[...thumbnails, ...thumbnails].map((thumbnail, index) => (
          <div
            key={`${eventTitle}-${direction}-${index}`}
            className="relative h-[181px] w-[129px] overflow-hidden rounded-[8px]"
          >
            <img src={thumbnail} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

function EventCollage({ event }: { event: EventItem }) {
  const baseThumbnails = event.thumbnails.slice(0, 4);
  const columns = [
    { direction: "down" as const, duration: 20, offset: -116, thumbnails: rotateThumbnails(baseThumbnails, 0) },
    { direction: "up" as const, duration: 18, offset: -32, thumbnails: rotateThumbnails(baseThumbnails, 1) },
    { direction: "down" as const, duration: 22, offset: -139, thumbnails: rotateThumbnails(baseThumbnails, 2) },
  ];

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {event.thumbnails.slice(0, 4).map((thumbnail, index) => (
          <div key={`${event.title}-mobile-${index}`} className="relative aspect-[128/179] overflow-hidden rounded-[2px]">
            <img src={thumbnail} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>

      <div
        className="hidden shrink-0 items-stretch gap-4 overflow-hidden md:flex"
        style={{ height: "100%", width: `${EVENT_COLLAGE_CARD_WIDTH * 3 + EVENT_COLLAGE_GAP * 2}px` }}
      >
        {columns.map((column, index) => (
          <EventCollageStrip
            key={`${event.title}-column-${index}`}
            direction={column.direction}
            duration={column.duration}
            eventTitle={event.title}
            offset={column.offset}
            thumbnails={column.thumbnails}
          />
        ))}
      </div>
    </>
  );
}

function EventStatus({ label }: { label: string }) {
  return (
    <div className="w-fit rounded-full bg-linear-to-br from-white via-[#ffc439] to-[#ff7c33] p-px">
      <div className="rounded-full bg-black px-3 py-1.5 font-good-headline-medium text-[16px] leading-5 text-white">
        {label}
      </div>
    </div>
  );
}

export function UpshotHomePage() {
  return (
    <UpshotPageFrame>
      <>
        <section className="relative mx-auto flex min-h-[calc(100svh-80px)] w-full max-w-[1440px] flex-col justify-center px-4 pb-10 pt-6 md:min-h-[calc(100svh-80px)] md:flex-row md:items-center md:px-16 md:pb-0 md:pt-0">
          <div className="relative z-10 max-w-[590px]">
            <h1 className="font-good-headline-bold text-[44px] leading-[1.05] text-white md:text-[56px] md:leading-[1.2]">
              Open Mystery Packs.
              <br />
              Reveal Prediction Cards.
              <br />
              <span className="inline-flex items-center gap-2 whitespace-nowrap text-[#89fdfc] md:gap-3">
                <span>Win Cash Prizes.</span>
                <img
                  src="/images/shooting-star.svg"
                  alt=""
                  className="h-[28px] w-[62px] md:h-[40px] md:w-[78px]"
                />
              </span>
            </h1>

            <div className="mt-6 flex flex-wrap gap-4">
              {heroActions.map((action) => (
                <UpshotLink
                  key={action.label}
                  href={action.href}
                  className={
                    action.label === "Buy a pack"
                      ? heroBuyPackButtonClass
                      : action.variant === "primary"
                        ? primaryButtonClass
                        : secondaryButtonClass
                  }
                >
                  {action.label}
                </UpshotLink>
              ))}
            </div>
          </div>

          <div className="relative mt-10 flex flex-1 justify-center md:mt-0 md:justify-end">
            <div className="relative h-[360px] w-full max-w-[820px] md:h-[724px]">
              <HeroCardCarousel />
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-4 pb-12 md:px-16 md:pb-20">
          <div className="relative overflow-hidden rounded-[12px] border border-[#222] bg-[#111] px-6 py-7 md:px-8 md:py-10">
            <h2 className="pl-4 font-good-headline-bold text-[28px] leading-[1.2] text-white md:pl-8 md:text-[48px]">
              How To Upshot
            </h2>

            <div className="relative mt-6 pl-4 md:mt-8 md:pl-8">
              <div className="pointer-events-none absolute inset-y-0 right-0 z-30 hidden w-32 bg-linear-to-l from-[#111] to-transparent md:block" />
              <div className="scrollbar-hidden -mt-2 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-1 pt-2">
                {howToSteps.map((step) => (
                  <article
                    key={step.title}
                    className="group min-w-[280px] shrink-0 snap-start overflow-hidden rounded-[8px] border border-[#333] bg-[#1b1b1b] transition-all duration-200 hover:-translate-y-1 hover:border-[#999] md:w-[calc((100%-48px)/3-54px)]"
                  >
                    <div className="flex h-full min-h-[344px] flex-col justify-between">
                      <div className="p-6">
                        <h3 className="font-good-headline-bold text-[34px] leading-[1.2] text-white">{step.title}</h3>
                        <div className="mt-3 font-sans text-[16px] leading-7 text-[#ccc]">{renderHowToDescription(step)}</div>
                        <div className="min-h-3" />
                      </div>
                      <div className="relative overflow-hidden bg-[#1b1b1b]">
                        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          <div className="featured-card-hover-shimmer h-full" />
                        </div>
                        <video
                          src={step.mediaSrc}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          className="block h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.01] group-hover:shadow-[0_14px_28px_rgba(0,0,0,0.35)]"
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] py-12">
          <div className="flex flex-col gap-6 px-4 md:px-16">
            <div className="flex items-center justify-between">
              <h2 className="font-good-headline-bold text-[28px] leading-[1.2] text-white">Featured Events</h2>
              <UpshotLink href="/events" className={sectionPillLinkClass}>
                See all events
              </UpshotLink>
            </div>

            <div className="scrollbar-hidden -mt-2 overflow-x-auto pt-2">
              <div className="flex gap-6 pr-4">
                {homepageFeaturedEvents.map((event) => (
                  <article
                    key={event.title}
                    className="group w-[min(844px,calc(100vw-32px))] shrink-0 overflow-hidden rounded-[8px] border border-[#333] bg-[#111] transition-all duration-200 hover:-translate-y-1 hover:border-[#999]"
                  >
                    <div className="flex h-full flex-col gap-5 p-5 md:h-[296px] md:flex-row md:gap-0 md:p-0">
                      <div className="flex flex-1 flex-col justify-between md:px-5 md:py-5 md:pr-6">
                        <div className="space-y-4">
                          <div className="flex items-start gap-4">
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl md:h-20 md:w-20">
                              <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                <div className="featured-card-hover-shimmer h-full" />
                              </div>
                              <img
                                src={event.heroImage}
                                alt={event.title}
                                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03] group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)]"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <img src={event.categoryIcon} alt="" className="h-4 w-4" />
                                <span className="font-good-headline-bold text-[20px] leading-6 text-white">{event.category}</span>
                              </div>
                              <h3 className="mt-2 font-good-headline-medium text-[24px] leading-[1.2] text-white uppercase">
                                {event.title}
                              </h3>
                            </div>
                          </div>
                          <EventStatus label={event.statusLabel} />
                        </div>

                        <UpshotLink href={event.href} className={`${primaryButtonClass} self-start px-6 py-2 text-[16px]`}>
                          View event
                        </UpshotLink>
                      </div>

                      <div className="md:h-full md:shrink-0 md:pr-3">
                        <div className="relative h-full">
                          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[8px] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            <div className="featured-card-hover-shimmer h-full" />
                          </div>
                          <EventCollage event={event} />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] py-12">
          <div className="px-4 md:px-16">
            <div className="flex items-center justify-between">
              <h2 className="font-good-headline-bold text-[28px] leading-[1.2] text-white">Featured Contests</h2>
              <UpshotLink href="/contests" className={sectionPillLinkClass}>
                View all contests
              </UpshotLink>
            </div>

            <div className="mt-6 flex flex-col gap-5">
              {featuredContests.map((contest) => (
                <ContestBoard key={contest.href} contest={contest} interactive />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] py-12">
          <div className="px-4 md:px-16">
            <div className="flex items-center justify-between">
              <h2 className="font-good-headline-bold text-[28px] leading-[1.2] text-white">Featured Cards</h2>
              <UpshotLink href="/cards" className={sectionPillLinkClass}>
                See all cards
              </UpshotLink>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
              {featuredCards.map((card) => (
                <UpshotLink
                  key={card.title}
                  href={card.href}
                  className="group overflow-hidden rounded-[8px] border border-[#333] bg-[#1b1b1b] transition-all duration-200 hover:-translate-y-1 hover:border-[#999]"
                >
                  <div className="relative overflow-hidden px-2 pt-2">
                    <img
                      src="/images/skill-glow.svg"
                      alt=""
                      className="pointer-events-none absolute inset-x-0 top-10 z-0 w-full opacity-25 transition-opacity duration-200 group-hover:opacity-45"
                    />
                    <div className="pointer-events-none absolute inset-x-2 top-2 bottom-0 z-20 overflow-hidden rounded-[12px] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <div className="featured-card-hover-shimmer h-full" />
                    </div>
                    <img
                      src={card.image}
                      alt={card.title}
                      className="relative z-10 w-full rounded-[12px] transition-transform duration-200 group-hover:scale-[1.01] group-hover:shadow-[0_14px_28px_rgba(0,0,0,0.35)]"
                    />
                  </div>
                  <div className="mt-2 grid grid-cols-3 border-t border-[#333] bg-[#1f1f1f] transition-colors duration-200 group-hover:border-[#444]">
                    <div className="border-r border-[#333] px-2 py-3 text-center">
                      <div className="font-sans text-[12px] leading-4 text-[#999]">Supply</div>
                      <div className="mt-1 font-good-headline-medium text-[24px] leading-5 text-white">{card.supply}</div>
                    </div>
                    <div className="border-r border-[#333] px-2 py-3 text-center">
                      <div className="font-sans text-[12px] leading-4 text-[#999]">Claimed</div>
                      <div className="mt-1 font-good-headline-medium text-[24px] leading-5 text-white">{card.claimed}</div>
                    </div>
                    <div className="px-2 py-3 text-center">
                      <div className="font-sans text-[12px] leading-4 text-[#999]">Burned</div>
                      <div className="mt-1 font-good-headline-medium text-[24px] leading-5 text-white">{card.burned}</div>
                    </div>
                  </div>
                </UpshotLink>
              ))}
            </div>
          </div>
        </section>
      </>
    </UpshotPageFrame>
  );
}
