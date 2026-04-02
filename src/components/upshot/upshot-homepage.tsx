/* eslint-disable @next/next/no-img-element */

import { LeftArrowIcon, RightArrowIcon, SparkleIcon } from "@/components/icons";
import {
  UpshotLink,
  UpshotPageFrame,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/upshot/upshot-shell";
import {
  featuredCards,
  featuredContests,
  featuredEvents,
  heroActions,
  howToSteps,
} from "@/lib/upshot-data";
import type { EventItem, HowToStep } from "@/types/upshot";

function renderHowToDescription(step: HowToStep) {
  if (step.descriptionLinkHref && step.descriptionLinkLabel && step.descriptionSuffix) {
    return (
      <>
        <UpshotLink href={step.descriptionLinkHref} className="text-white underline underline-offset-4">
          {step.descriptionLinkLabel}
        </UpshotLink>
        {step.descriptionSuffix}
      </>
    );
  }

  if (step.title === "Each Card is a Prediction") {
    return (
      <>
        Each card comes with a <span className="font-semibold text-white">prediction</span>,{" "}
        <span className="font-semibold text-white">prize</span> and{" "}
        <span className="font-semibold text-white">resolution date</span>.
      </>
    );
  }

  return step.description;
}

function SectionHeader({ href, label, title }: { href: string; label: string; title: string }) {
  return (
    <div className="mb-3 flex items-center justify-between md:mb-4">
      <h2 className="font-good-headline-bold text-[16px] leading-5 text-white md:text-[18px]">{title}</h2>
      <UpshotLink href={href} className="font-sans text-[10px] font-medium leading-4 text-white/60 md:text-[11px]">
        {label}
      </UpshotLink>
    </div>
  );
}

function HeroControls() {
  return (
    <div className="absolute bottom-0 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 md:bottom-2">
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/35 bg-[#0d0d0d]/70 text-white/85"
        aria-label="Previous hero card"
      >
        <LeftArrowIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/35 bg-[#0d0d0d]/70 text-white/85"
        aria-label="Next hero card"
      >
        <RightArrowIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

function EventCollage({ event }: { event: EventItem }) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {event.thumbnails.slice(0, 4).map((thumbnail, index) => (
        <div
          key={`${event.title}-${index}`}
          className="relative aspect-[88/124] overflow-hidden rounded-[4px] border border-white/8 bg-black"
        >
          <img src={thumbnail} alt="" className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
}

function EventStatus({ label }: { label: string }) {
  return (
    <div className="w-fit rounded-[6px] bg-linear-to-br from-white via-[#ffc439] to-[#ff7c33] p-px">
      <div className="rounded-[5px] bg-black px-2 py-1 font-good-headline-medium text-[11px] leading-4 text-white md:text-[12px]">
        {label}
      </div>
    </div>
  );
}

function FeaturedCardShelf() {
  return (
    <div className="mt-3 grid grid-cols-2 gap-3 md:mt-4 md:grid-cols-4 md:gap-4">
      {featuredCards.map((card) => (
        <UpshotLink
          key={card.title}
          href={card.href}
          className="overflow-hidden rounded-[6px] border border-[#2b2b2b] bg-[#121212]"
        >
          <div className="relative px-1.5 pt-1.5">
            <img src="/images/skill-glow.svg" alt="" className="pointer-events-none absolute inset-x-0 top-8 z-0 w-full opacity-20" />
            <img src={card.image} alt={card.title} className="relative z-10 w-full rounded-[8px]" />
          </div>
          <div className="mt-1 grid grid-cols-3 border-t border-[#2b2b2b] bg-[#181818]">
            <div className="border-r border-[#2b2b2b] px-1 py-2 text-center">
              <div className="font-sans text-[9px] leading-3 text-[#8b8b8b]">Supply</div>
              <div className="mt-1 font-good-headline-medium text-[17px] leading-4 text-white">{card.supply}</div>
            </div>
            <div className="border-r border-[#2b2b2b] px-1 py-2 text-center">
              <div className="font-sans text-[9px] leading-3 text-[#8b8b8b]">Claimed</div>
              <div className="mt-1 font-good-headline-medium text-[17px] leading-4 text-white">{card.claimed}</div>
            </div>
            <div className="px-1 py-2 text-center">
              <div className="font-sans text-[9px] leading-3 text-[#8b8b8b]">Burned</div>
              <div className="mt-1 font-good-headline-medium text-[17px] leading-4 text-white">{card.burned}</div>
            </div>
          </div>
        </UpshotLink>
      ))}
    </div>
  );
}

export function UpshotHomePage() {
  return (
    <UpshotPageFrame showAnalyticsBanner>
      <>
        <section className="mx-auto w-full max-w-[1120px] px-4 pb-5 pt-4 md:px-4 md:pb-8 md:pt-6">
          <div className="grid items-center gap-6 md:grid-cols-[0.88fr_1.12fr]">
            <div className="relative z-10 max-w-[360px]">
              <h1 className="font-good-headline-bold text-[34px] leading-[1.04] text-white md:text-[55px]">
                Open Mystery Packs.
                <br />
                Reveal Prediction Cards.
                <br />
                <span className="text-[#89fdfc]">Win Cash Prizes.</span>
              </h1>

              <div className="mt-3">
                <img src="/images/shooting-star.svg" alt="" className="h-[20px] w-[46px] md:h-[34px] md:w-[78px]" />
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {heroActions.map((action) => (
                  <UpshotLink
                    key={action.label}
                    href={action.href}
                    className={action.variant === "primary" ? primaryButtonClass : secondaryButtonClass}
                  >
                    {action.label}
                  </UpshotLink>
                ))}
              </div>
            </div>

            <div className="relative flex justify-center md:justify-end">
              <div className="relative aspect-[760/430] w-full max-w-[690px]">
                <div className="absolute inset-[10%_6%_14%_12%] rounded-full bg-[radial-gradient(circle,rgba(100,0,132,0.36)_0%,rgba(0,0,0,0)_74%)] blur-2xl" />
                <img src="/images/carousel-stars.svg" alt="" className="absolute inset-0 z-0 h-full w-full object-contain opacity-95" />
                <SparkleIcon className="absolute left-[58%] top-[4%] z-20 h-7 w-7 text-[#8efff7]" />
                <SparkleIcon className="absolute left-[62%] top-[9%] z-20 h-4 w-4 text-[#8efff7]" />

                <img
                  src="/images/hero/tile-2.png"
                  alt="Prediction card 2"
                  className="absolute left-[15%] top-[21%] z-10 w-[28%] rotate-[-8deg] rounded-[12px] shadow-[0_24px_64px_rgba(0,0,0,0.55)]"
                />
                <img
                  src="/images/hero/tile-1.png"
                  alt="Prediction card 1"
                  className="absolute left-[34%] top-[2%] z-20 w-[44%] rounded-[14px] shadow-[0_28px_80px_rgba(94,0,109,0.55)]"
                />
                <img
                  src="/images/hero/tile-3.png"
                  alt="Prediction card 3"
                  className="absolute right-[5%] top-[18%] z-0 w-[24%] rotate-[5deg] rounded-[12px] shadow-[0_20px_52px_rgba(0,0,0,0.45)]"
                />

                <HeroControls />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1120px] px-4 pb-4 md:px-4 md:pb-6">
          <div className="overflow-hidden rounded-[8px] border border-[#222] bg-[#111] px-4 py-4 md:px-5 md:py-5">
            <SectionHeader href="/claim" title="How To Upshot" label="" />

            <div className="grid gap-3 md:grid-cols-3">
              {howToSteps.slice(0, 3).map((step) => (
                <article
                  key={step.title}
                  className="overflow-hidden rounded-[6px] border border-[#2a2a2a] bg-[#1b1b1b]"
                >
                  <div className="flex h-full flex-col justify-between">
                    <div className="p-4">
                      <h3 className="font-good-headline-bold text-[18px] leading-5 text-white md:text-[20px]">
                        {step.title}
                      </h3>
                      <div className="mt-2 font-sans text-[11px] leading-5 text-[#bdbdbd] md:text-[12px]">
                        {renderHowToDescription(step)}
                      </div>
                    </div>
                    <div className="relative border-t border-[#2a2a2a] bg-[#151515]">
                      <video
                        src={step.mediaSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="aspect-[16/10] w-full object-cover"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1120px] px-4 py-4 md:px-4 md:py-6">
          <SectionHeader href="/events" title="Featured Events" label="See all events" />
          <div className="scrollbar-hidden overflow-x-auto">
            <div className="flex gap-3 rounded-[8px] border border-[#222] bg-[#101010] p-3">
              {featuredEvents.map((event) => (
                <article
                  key={event.title}
                  className="w-[min(520px,calc(100vw-52px))] shrink-0 overflow-hidden rounded-[6px] border border-[#2a2a2a] bg-[#111]"
                >
                  <div className="flex h-full flex-col gap-4 p-3 md:h-[172px] md:flex-row md:gap-4">
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[8px]">
                            <img src={event.heroImage} alt={event.title} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <img src={event.categoryIcon} alt="" className="h-3.5 w-3.5" />
                              <span className="font-good-headline-bold text-[14px] leading-4 text-white">
                                {event.category}
                              </span>
                            </div>
                            <h3 className="mt-1 font-good-headline-medium text-[15px] leading-4 text-white uppercase">
                              {event.title}
                            </h3>
                          </div>
                        </div>
                        <EventStatus label={event.statusLabel} />
                      </div>

                      <UpshotLink href={event.href} className={`${primaryButtonClass} self-start px-4 py-2 text-[13px]`}>
                        View event
                      </UpshotLink>
                    </div>

                    <EventCollage event={event} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1120px] px-4 py-4 md:px-4 md:py-6">
          <SectionHeader href="/contests" title="Featured Contests" label="View all contests" />
          <div className="mt-3 flex flex-col gap-3">
            {featuredContests.map((contest) => (
              <article
                key={contest.title}
                className="rounded-[6px] border border-[#2a2a2a] bg-[#111] p-3"
              >
                <div className="flex flex-col gap-4 md:grid md:grid-cols-[176px_minmax(0,1fr)_182px] md:items-center">
                  <div className="relative w-full overflow-hidden rounded-[6px]">
                    <img src={contest.poster} alt={contest.title} className="aspect-[16/10] h-full w-full object-cover" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 font-good-headline-medium text-[12px] leading-4 text-[#e5e5e5]">
                          <img src="/images/gold.svg" alt="" className="h-3.5 w-3.5" />
                          <span>{contest.cardsRequired} cards required</span>
                        </div>
                        <h3 className="mt-1.5 font-good-headline-medium text-[18px] leading-5 text-white uppercase md:text-[21px]">
                          {contest.title}
                        </h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {contest.categories.map((category) => (
                          <img
                            key={`${contest.title}-${category.label}`}
                            src={category.icon}
                            alt={category.label}
                            title={category.label}
                            className="h-[14px] w-[14px]"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 text-white sm:grid-cols-2">
                      <div>
                        <div className="font-good-headline-medium text-[11px] leading-4 text-[#76d4ff]">
                          {contest.lineupLockLabel}
                        </div>
                        <div className="mt-1 font-good-headline-medium text-[16px] leading-4 text-white">
                          {contest.lineupLockValue}
                        </div>
                        <div className="mt-1 font-sans text-[11px] leading-4 text-[#9d9d9d]">{contest.lineupLockNote}</div>
                      </div>
                      <div>
                        <div className="font-good-headline-medium text-[11px] leading-4 text-[#76d4ff]">
                          {contest.resolutionLabel}
                        </div>
                        <div className="mt-1 font-good-headline-medium text-[16px] leading-4 text-white">
                          {contest.resolutionValue}
                        </div>
                        <div className="mt-1 font-sans text-[11px] leading-4 text-[#9d9d9d]">{contest.resolutionNote}</div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[6px] border border-[#2a2a2a] bg-[#151515] p-3">
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="border-r border-[#2a2a2a] pr-3">
                        <div className="font-sans text-[10px] uppercase tracking-[0.08em] text-[#9b9b9b]">Ends in</div>
                        <div className="mt-2 font-good-headline-medium text-[20px] leading-none text-white">
                          {contest.endsIn}
                        </div>
                      </div>
                      <div>
                        <div className="font-sans text-[10px] uppercase tracking-[0.08em] text-[#9b9b9b]">
                          Prize Pool
                        </div>
                        <div className="mt-2 font-good-headline-medium text-[20px] leading-none text-white">
                          {contest.prizePool}
                        </div>
                      </div>
                    </div>

                    <UpshotLink href={contest.href} className={`${primaryButtonClass} mt-4 w-full justify-center px-4 py-2 text-[12px]`}>
                      {contest.ctaLabel}
                    </UpshotLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1120px] px-4 py-4 md:px-4 md:py-6">
          <SectionHeader href="/cards" title="Featured Cards" label="See all cards" />
          <FeaturedCardShelf />
        </section>
      </>
    </UpshotPageFrame>
  );
}
