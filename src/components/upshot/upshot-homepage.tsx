/* eslint-disable @next/next/no-img-element */

import { SparkleIcon } from "@/components/icons";
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

function EventCollage({ event }: { event: EventItem }) {
  const leftColumn = event.thumbnails.slice(0, 4);
  const rightColumn = event.thumbnails.slice(4, 8);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {event.thumbnails.slice(0, 4).map((thumbnail, index) => (
          <div key={`${event.title}-mobile-${index}`} className="relative aspect-[128/179] overflow-hidden rounded-[2px]">
            <img src={thumbnail} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>

      <div className="hidden shrink-0 items-center gap-4 overflow-hidden md:flex">
        <div className="flex flex-col gap-4">
          {leftColumn.map((thumbnail, index) => (
            <div key={`${event.title}-left-${index}`} className="relative h-[179px] w-32 overflow-hidden rounded-[2px]">
              <img src={thumbnail} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {rightColumn.map((thumbnail, index) => (
            <div key={`${event.title}-right-${index}`} className="relative h-[179px] w-32 overflow-hidden rounded-[2px]">
              <img src={thumbnail} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function EventStatus({ label }: { label: string }) {
  return (
    <div className="w-fit rounded-md bg-linear-to-br from-white via-[#ffc439] to-[#ff7c33] p-px">
      <div className="rounded-[5px] bg-black px-2 py-1 font-good-headline-medium text-[16px] leading-5 text-white">
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
          <div className="relative z-10 max-w-[510px]">
            <h1 className="font-good-headline-bold text-[44px] leading-[1.05] text-white md:text-[56px] md:leading-[1.2]">
              Open Mystery Packs.
              <br />
              Reveal Prediction Cards.
              <br />
              <span className="text-[#89fdfc]">Win Cash Prizes.</span>
            </h1>

            <div className="mt-4 md:mt-6">
              <img src="/images/shooting-star.svg" alt="" className="h-[32px] w-[72px] md:h-[48px] md:w-[93px]" />
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
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

          <div className="relative mt-10 flex flex-1 justify-center md:mt-0 md:justify-end">
            <div className="relative h-[360px] w-full max-w-[820px] md:h-[724px]">
              <img
                src="/images/carousel-stars.svg"
                alt=""
                className="absolute inset-0 z-0 h-full w-full object-contain opacity-95"
              />
              <SparkleIcon className="absolute left-[58%] top-[3%] z-20 h-8 w-8 text-[#8efff7]" />
              <SparkleIcon className="absolute left-[62%] top-[7%] z-20 h-5 w-5 text-[#8efff7]" />

              <img
                src="/images/hero/tile-2.png"
                alt="Prediction card 2"
                className="absolute left-[18%] top-[22%] z-10 w-[32%] rotate-[-9deg] rounded-[16px] shadow-[0_30px_80px_rgba(0,0,0,0.55)] md:left-[16%] md:top-[16%] md:w-[34%]"
              />
              <img
                src="/images/hero/tile-1.png"
                alt="Prediction card 1"
                className="absolute left-[34%] top-[6%] z-20 w-[50%] rounded-[18px] shadow-[0_32px_90px_rgba(94,0,109,0.55)] md:left-[34%] md:top-[2%] md:w-[49%]"
              />
              <img
                src="/images/hero/tile-3.png"
                alt="Prediction card 3"
                className="absolute right-[2%] top-[21%] z-0 w-[28%] rotate-[5deg] rounded-[16px] shadow-[0_24px_70px_rgba(0,0,0,0.45)] md:right-[1%] md:top-[16%] md:w-[28%]"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] px-4 pb-12 md:px-16 md:pb-20">
          <div className="relative overflow-hidden rounded-[12px] border border-[#222] bg-[#111] px-6 py-7 md:px-8 md:py-10">
            <h2 className="font-good-headline-bold text-[28px] leading-[1.2] text-white md:text-[48px]">How To Upshot</h2>

            <div className="relative mt-6 md:mt-8">
              <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-linear-to-l from-[#111] to-transparent md:block" />
              <div className="scrollbar-hidden flex snap-x snap-mandatory gap-6 overflow-x-auto pb-1">
                {howToSteps.map((step) => (
                  <article
                    key={step.title}
                    className="min-w-[280px] snap-start overflow-hidden rounded-[8px] border border-[#333] bg-[#1b1b1b] md:w-[358px]"
                  >
                    <div className="flex h-full min-h-[500px] flex-col justify-between">
                      <div className="p-6">
                        <h3 className="font-good-headline-bold text-[34px] leading-[1.2] text-white">{step.title}</h3>
                        <div className="mt-3 font-sans text-[16px] leading-7 text-[#ccc]">{renderHowToDescription(step)}</div>
                        <div className="min-h-8" />
                      </div>
                      <div className="relative bg-[#1b1b1b]">
                        <video
                          src={step.mediaSrc}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          className="block h-full w-full object-contain"
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
              <UpshotLink href="/events" className="font-good-headline-medium text-[16px] leading-6 text-white">
                See all events
              </UpshotLink>
            </div>

            <div className="scrollbar-hidden overflow-x-auto">
              <div className="flex gap-6 pr-4">
                {featuredEvents.map((event) => (
                  <article
                    key={event.title}
                    className="w-[min(844px,calc(100vw-32px))] shrink-0 overflow-hidden rounded-[8px] border border-[#333] bg-[#111]"
                  >
                    <div className="flex h-full flex-col gap-5 p-5 md:h-[296px] md:flex-row md:gap-6">
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl md:h-20 md:w-20">
                              <img src={event.heroImage} alt={event.title} className="h-full w-full object-cover" />
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

                      <EventCollage event={event} />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] py-12">
          <div className="px-4 md:px-10">
            <div className="flex items-center justify-between">
              <h2 className="font-good-headline-bold text-[28px] leading-[1.2] text-white">Featured Contests</h2>
              <UpshotLink href="/contests" className="font-good-headline-medium text-[16px] leading-6 text-[#d9d9d9]">
                View all contests
              </UpshotLink>
            </div>

            <div className="mt-6 flex flex-col gap-5">
              {featuredContests.map((contest) => (
                <article
                  key={contest.title}
                  className="rounded-[8px] border border-[#333] bg-[#111] p-4 md:p-5"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-center">
                    <div className="relative w-full overflow-hidden rounded-[6px] md:w-[156px] md:shrink-0">
                      <img src={contest.poster} alt={contest.title} className="aspect-square h-full w-full object-cover" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <div className="flex items-center gap-2 font-good-headline-medium text-[18px] leading-6 text-[#e5e5e5]">
                            <img src="/images/gold.svg" alt="" className="h-4 w-4" />
                            <span>{contest.cardsRequired} cards required</span>
                          </div>
                          <h3 className="mt-2 font-good-headline-medium text-[22px] leading-tight text-white uppercase md:text-[28px]">
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
                              className="h-[18px] w-[18px]"
                            />
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 grid gap-6 text-white sm:grid-cols-2">
                        <div>
                          <div className="font-good-headline-medium text-[13px] leading-5 text-[#76d4ff]">{contest.lineupLockLabel}</div>
                          <div className="mt-1 font-good-headline-medium text-[28px] leading-[1.1] text-white">{contest.lineupLockValue}</div>
                          <div className="mt-1 font-sans text-[14px] leading-5 text-[#9d9d9d]">{contest.lineupLockNote}</div>
                        </div>
                        <div>
                          <div className="font-good-headline-medium text-[13px] leading-5 text-[#76d4ff]">{contest.resolutionLabel}</div>
                          <div className="mt-1 font-good-headline-medium text-[28px] leading-[1.1] text-white">{contest.resolutionValue}</div>
                          <div className="mt-1 font-sans text-[14px] leading-5 text-[#9d9d9d]">{contest.resolutionNote}</div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[8px] border border-[#333] bg-[#151515] p-4 md:w-[188px] md:shrink-0">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="border-r border-[#333] pr-4">
                          <div className="font-sans text-[12px] uppercase tracking-[0.08em] text-[#9b9b9b]">Ends in</div>
                          <div className="mt-2 font-good-headline-medium text-[34px] leading-none text-white">{contest.endsIn}</div>
                        </div>
                        <div>
                          <div className="font-sans text-[12px] uppercase tracking-[0.08em] text-[#9b9b9b]">Prize Pool</div>
                          <div className="mt-2 font-good-headline-medium text-[34px] leading-none text-white">{contest.prizePool}</div>
                        </div>
                      </div>

                      <UpshotLink href={contest.href} className={`${primaryButtonClass} mt-5 w-full justify-center px-4 py-2 text-[16px]`}>
                        {contest.ctaLabel}
                      </UpshotLink>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1440px] py-12">
          <div className="px-4 md:px-10">
            <div className="flex items-center justify-between">
              <h2 className="font-good-headline-bold text-[28px] leading-[1.2] text-white">Featured Cards</h2>
              <UpshotLink href="/cards" className="font-good-headline-medium text-[16px] leading-6 text-[#d9d9d9]">
                See all cards
              </UpshotLink>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
              {featuredCards.map((card) => (
                <UpshotLink
                  key={card.title}
                  href={card.href}
                  className="overflow-hidden rounded-[8px] border border-[#333] bg-[#1b1b1b]"
                >
                  <div className="relative px-2 pt-2">
                    <img
                      src="/images/skill-glow.svg"
                      alt=""
                      className="pointer-events-none absolute inset-x-0 top-10 z-0 w-full opacity-25"
                    />
                    <img src={card.image} alt={card.title} className="relative z-10 w-full rounded-[12px]" />
                  </div>
                  <div className="mt-2 grid grid-cols-3 border-t border-[#333] bg-[#1f1f1f]">
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
