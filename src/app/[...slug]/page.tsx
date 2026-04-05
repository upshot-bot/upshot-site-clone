/* eslint-disable @next/next/no-img-element */

import { notFound } from "next/navigation";

import { ContestsBrowser } from "@/components/upshot/contests-browser";
import { DashboardBrowser } from "@/components/upshot/dashboard-browser";
import { EventsBrowser } from "@/components/upshot/events-browser";
import { LeaderboardBrowser, LeaderboardHeader } from "@/components/upshot/leaderboard-browser";
import { MarketplaceBrowser } from "@/components/upshot/marketplace-browser";
import {
  UpshotLink,
  UpshotPageFrame,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/upshot/upshot-shell";
import { StoreBrowseBar } from "@/components/upshot/store-browse-bar";
import { StoreSliderHeader } from "@/components/upshot/store-slider-header";
import {
  allContests,
  allEvents,
  contestListings,
  eventListings,
  featuredCards,
  howToSteps,
  leaderboardEntries,
  marketplaceListings,
  storePacks,
} from "@/lib/upshot-data";
import type {
  ContestItem,
  EventItem,
  FeaturedCardItem,
  StorePackItem,
} from "@/types/upshot";

type PageParams = {
  slug: string[];
};

function findRouteItem<T extends { href: string }>(items: T[], href: string) {
  return items.find((item) => item.href === href);
}

function formatTitleFromSlug(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 pb-10 pt-8 md:px-16 md:pb-16 md:pt-14">
      <div className="overflow-hidden rounded-[16px] border border-[#222] bg-[radial-gradient(circle_at_top_left,_rgba(137,253,252,0.14),_transparent_38%),linear-gradient(180deg,#151515_0%,#0b0b0b_100%)] px-6 py-10 md:px-10 md:py-14">
        <div className="max-w-[760px]">
          <div className="font-good-headline-medium text-[14px] uppercase tracking-[0.18em] text-[#89fdfc]">{eyebrow}</div>
          <h1 className="mt-4 font-good-headline-bold text-[40px] leading-[1.05] text-white md:text-[60px]">
            {title}
          </h1>
          <p className="mt-5 max-w-[640px] font-sans text-[17px] leading-8 text-[#cfcfcf]">{description}</p>
        </div>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}

function SectionFrame({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-6 md:px-16 md:py-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-good-headline-bold text-[28px] leading-[1.1] text-white md:text-[36px]">{title}</h2>
          {description ? (
            <p className="mt-2 max-w-[720px] font-sans text-[15px] leading-7 text-[#9f9f9f]">{description}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function OverviewPanel({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-[12px] border border-[#2d2d2d] bg-[#121212] p-5">
      <div className="font-good-headline-medium text-[13px] uppercase tracking-[0.14em] text-[#76d4ff]">{label}</div>
      <div className="mt-3 font-good-headline-medium text-[30px] leading-[1.05] text-white">{value}</div>
      <div className="mt-2 font-sans text-[14px] leading-6 text-[#9f9f9f]">{note}</div>
    </div>
  );
}

function CardGrid({ cards }: { cards: FeaturedCardItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
      {cards.map((card) => (
        <UpshotLink
          key={card.title}
          href={card.href}
          className="overflow-hidden rounded-[8px] border border-[#333] bg-[#1b1b1b]"
        >
          <div className="relative px-2 pt-2">
            <img src="/images/skill-glow.svg" alt="" className="pointer-events-none absolute inset-x-0 top-10 z-0 w-full opacity-25" />
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
  );
}

function StorePackVisual({ pack }: { pack: StorePackItem }) {
  return (
    <div className="relative overflow-hidden rounded-[4px] bg-black">
      <div className="relative aspect-[291/480] w-full">
        <img
          src={pack.imageSrc}
          alt={pack.imageAlt}
          className={`h-full w-full object-contain ${pack.isSoldOut ? "opacity-50" : ""}`}
        />
        <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center">
          <div className="font-good-headline-bold text-[28px] leading-none text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)] md:text-[30px]">
            {pack.statusLabel}
          </div>
        </div>
      </div>
    </div>
  );
}

function StorePackGrid({ packs }: { packs: StorePackItem[] }) {
  return (
    <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
      {packs.map((pack) => (
        <article key={pack.href} className="flex h-full flex-col">
          <div className="mx-auto w-full max-w-[189px]">
            <StorePackVisual pack={pack} />
          </div>

          <div className="mt-5 w-full">
            <div className="flex items-start justify-between gap-4">
              <h3 className="max-w-[72%] overflow-hidden text-ellipsis whitespace-nowrap font-good-headline-medium text-[22px] leading-[1.02] text-white md:text-[24px]">
                {pack.title}
              </h3>
              <div className="flex shrink-0 items-end gap-1.5 pt-0.5 text-right">
                <div className="font-good-headline-medium text-[24px] leading-none text-white">{pack.price}</div>
                <div className="pb-[3px] font-sans text-[12px] uppercase leading-none text-[#b7b7b7]">
                  {pack.priceSuffix}
                </div>
              </div>
            </div>

            <p
              className="mt-3 h-[43px] overflow-hidden pr-2 font-sans text-[16px] leading-[1.34] text-[#8f8f8f]"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
              }}
            >
              {pack.description}
            </p>

            <button
              type="button"
              disabled={pack.isSoldOut}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#7da8b4] px-4 py-3 font-sans text-[14px] font-semibold leading-5 text-[#111] opacity-80"
            >
              {pack.buttonLabel}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

function EventDetail({ event }: { event: EventItem }) {
  return (
    <>
      <PageHero
        eyebrow={event.category}
        title={event.title}
        description={`Local event detail page mirrored from the current Upshot events catalog so you can tweak the flow, card storytelling, and follow-on actions without leaving the clone.`}
      >
        <div className="flex flex-wrap gap-3">
          <UpshotLink href="/events" className={`${secondaryButtonClass} px-5 py-2 text-[16px]`}>
            Back to events
          </UpshotLink>
          <UpshotLink href="/contests" className={`${primaryButtonClass} px-5 py-2 text-[16px]`}>
            Browse contests
          </UpshotLink>
        </div>
      </PageHero>

      <SectionFrame title="Event snapshot" description="This page uses the assets captured during the clone run so you can extend the event experience locally.">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-[12px] border border-[#2d2d2d] bg-[#111] p-4">
            <div className="relative overflow-hidden rounded-[10px]">
              <img src={event.heroImage} alt={event.title} className="w-full object-cover" />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <img src={event.categoryIcon} alt="" className="h-4 w-4" />
              <span className="font-good-headline-medium text-[16px] leading-5 text-[#d8d8d8]">{event.category}</span>
            </div>
            <div className="mt-3 font-good-headline-medium text-[28px] leading-[1.1] text-white uppercase">{event.statusLabel}</div>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-[12px] border border-[#2d2d2d] bg-[#111] p-4">
            {event.thumbnails.map((thumbnail, index) => (
              <div key={`${event.title}-${index}`} className="overflow-hidden rounded-[8px]">
                <img src={thumbnail} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </SectionFrame>
    </>
  );
}

function ContestDetail({ contest }: { contest: ContestItem }) {
  return (
    <>
      <PageHero
        eyebrow="Contest"
        title={contest.title}
        description="This route is now local so you can iterate on contest layout, countdown behavior, and entry flows without bouncing back to the live product."
      >
        <div className="flex flex-wrap gap-3">
          <UpshotLink href="/contests" className={`${secondaryButtonClass} px-5 py-2 text-[16px]`}>
            Back to contests
          </UpshotLink>
          <UpshotLink href="/store" className={`${primaryButtonClass} px-5 py-2 text-[16px]`}>
            Open the store
          </UpshotLink>
        </div>
      </PageHero>

      <SectionFrame title="Contest overview" description="Timer values are still snapshot values from the captured homepage, which keeps the current clone faithful to the source.">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden rounded-[12px] border border-[#2d2d2d] bg-[#111] p-4">
            <img src={contest.poster} alt={contest.title} className="w-full rounded-[10px]" />
          </div>
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <OverviewPanel label="Ends In" value={contest.endsIn} note={contest.ctaLabel} />
              <OverviewPanel label="Prize Pool" value={contest.prizePool} note={`${contest.cardsRequired} cards required`} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <OverviewPanel label={contest.lineupLockLabel} value={contest.lineupLockValue} note={contest.lineupLockNote} />
              <OverviewPanel
                label={contest.resolutionLabel}
                value={contest.resolutionValue}
                note={contest.resolutionNote}
              />
            </div>
            <div className="rounded-[12px] border border-[#2d2d2d] bg-[#111] p-5">
              <div className="font-good-headline-medium text-[14px] uppercase tracking-[0.14em] text-[#89fdfc]">Categories</div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {contest.categories.map((category) => (
                  <div
                    key={`${contest.title}-${category.label}`}
                    className="inline-flex items-center gap-2 rounded-full border border-[#2d2d2d] bg-[#181818] px-4 py-2"
                  >
                    <img src={category.icon} alt="" className="h-[18px] w-[18px]" />
                    <span className="font-sans text-[14px] leading-5 text-[#ededed]">{category.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionFrame>
    </>
  );
}

function CardDetail({ card }: { card: FeaturedCardItem }) {
  return (
    <>
      <PageHero
        eyebrow="Prediction card"
        title={card.title}
        description="This local detail page gives you a safe place to redesign card detail UX, scarcity messaging, and collection flows without depending on the production app shell."
      >
        <div className="flex flex-wrap gap-3">
          <UpshotLink href="/cards" className={`${secondaryButtonClass} px-5 py-2 text-[16px]`}>
            Back to cards
          </UpshotLink>
          <UpshotLink href="/store" className={`${primaryButtonClass} px-5 py-2 text-[16px]`}>
            Buy a pack
          </UpshotLink>
        </div>
      </PageHero>

      <SectionFrame title="Card stats" description="All data below is sourced from the captured homepage snapshot.">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="rounded-[12px] border border-[#2d2d2d] bg-[#111] p-4">
            <img src={card.image} alt={card.title} className="w-full rounded-[12px]" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <OverviewPanel label="Supply" value={String(card.supply)} note="Total printed cards" />
            <OverviewPanel label="Claimed" value={String(card.claimed)} note="Cards in collections" />
            <OverviewPanel label="Burned" value={String(card.burned)} note="Cards removed from supply" />
          </div>
        </div>
      </SectionFrame>
    </>
  );
}

function StorePage() {
  const storeSlides = [
    {
      ctaHref: "/store",
      ctaLabel: "Buy a pack",
      description: "A more app-like local store surface so the pack flow feels closer to Upshot instead of a generic placeholder.",
      eyebrow: "Packs",
      imageAlt: storePacks[0].imageAlt,
      imageSrc: storePacks[0].imageSrc,
      title: "Collect. Play. Win",
    },
    {
      ctaHref: "/store/march-mayhem-3",
      ctaLabel: "Buy a pack",
      description: "Rip prediction packs, reveal live outcomes, and collect cards tied to sports, markets, and culture moments.",
      eyebrow: "Prediction packs",
      imageAlt: storePacks[2].imageAlt,
      imageSrc: storePacks[2].imageSrc,
      title: "Open mystery packs",
    },
    {
      ctaHref: "/store/network-effect-1",
      ctaLabel: "Buy a pack",
      description: "Browse limited drops, sold-out classics, and packs built around the stories people are actually watching right now.",
      eyebrow: "Limited drops",
      imageAlt: storePacks[3].imageAlt,
      imageSrc: storePacks[3].imageSrc,
      title: "Track the moment",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 pb-14 pt-8 md:px-8 md:pb-16 md:pt-10 xl:px-14">
      <StoreSliderHeader slides={storeSlides} />

      <div className="mt-10">
        <h2 className="font-good-headline-bold text-[27px] leading-none text-white md:text-[33px]">Browse packs</h2>
      </div>
      <div className="mt-6">
        <StoreBrowseBar />
      </div>
      <div className="mt-8">
        <StorePackGrid packs={storePacks} />
      </div>
    </section>
  );
}

function StorePackDetail({ pack }: { pack: StorePackItem }) {
  const includedCards = pack.includedCardIndexes
    .map((index) => featuredCards[index])
    .filter((card): card is FeaturedCardItem => Boolean(card));

  return (
    <>
      <PageHero
        eyebrow={pack.statusLabel}
        title={pack.title}
        description="This pack detail route stays local so we can keep iterating on the live store design without sending you back to the production app."
      >
        <div className="flex flex-wrap gap-3">
          <UpshotLink href="/store" className={`${secondaryButtonClass} px-5 py-2 text-[16px]`}>
            Back to store
          </UpshotLink>
        </div>
      </PageHero>

      <SectionFrame title="Pack overview" description="Live store copy and art captured from the current store route.">
        <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="rounded-[14px] border border-[#2d2d2d] bg-[#111] p-4">
            <div className="mx-auto max-w-[280px]">
              <StorePackVisual pack={pack} />
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <OverviewPanel label="Price" value={pack.price} note={pack.priceSuffix} />
              <OverviewPanel label="Status" value={pack.statusLabel} note={pack.buttonLabel} />
            </div>
            <div className="rounded-[12px] border border-[#2d2d2d] bg-[#111] p-5">
              <div className="font-good-headline-medium text-[14px] uppercase tracking-[0.14em] text-[#89fdfc]">Description</div>
              <p className="mt-4 font-sans text-[15px] leading-7 text-[#cfcfcf]">{pack.description}</p>
            </div>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame title="Included highlights" description="Sample cards keep the pack detail page visually rich and locally navigable.">
        <CardGrid cards={includedCards} />
      </SectionFrame>
    </>
  );
}

function ClaimPage() {
  return (
    <>
      <PageHero
        eyebrow="Claim"
        title="Turn the claim flow into a first-class onboarding moment"
        description="This route is wired locally now, which makes it the right place to experiment with your free-card funnel, conversion copy, or account creation UX."
      >
        <div className="flex flex-wrap gap-3">
          <UpshotLink href="/login" className={primaryButtonClass}>
            Login / Register
          </UpshotLink>
          <UpshotLink href="/store" className={secondaryButtonClass}>
            Browse packs first
          </UpshotLink>
        </div>
      </PageHero>

      <SectionFrame title="How it works" description="These steps were captured from the homepage onboarding rail.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {howToSteps.map((step) => (
            <article key={step.title} className="overflow-hidden rounded-[12px] border border-[#2d2d2d] bg-[#111]">
              <div className="p-5">
                <h3 className="font-good-headline-medium text-[28px] leading-[1.05] text-white">{step.title}</h3>
                <p className="mt-3 font-sans text-[15px] leading-7 text-[#bfbfbf]">{step.description}</p>
              </div>
              <video
                src={step.mediaSrc}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-contain"
              />
            </article>
          ))}
        </div>
      </SectionFrame>
    </>
  );
}

function StaticContentPage({
  eyebrow,
  title,
  description,
  paragraphs,
}: {
  eyebrow: string;
  title: string;
  description: string;
  paragraphs: string[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description}>
        <div className="flex flex-wrap gap-3">
          <UpshotLink href="/" className={secondaryButtonClass}>
            Back home
          </UpshotLink>
          <UpshotLink href="/store" className={primaryButtonClass}>
            Explore the clone
          </UpshotLink>
        </div>
      </PageHero>

      <SectionFrame title={title} description="This content is local to the clone so you can iterate on structure before pulling in final production copy.">
        <div className="rounded-[12px] border border-[#2d2d2d] bg-[#111] p-6 md:p-8">
          <div className="space-y-5 font-sans text-[15px] leading-8 text-[#cfcfcf]">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </SectionFrame>
    </>
  );
}

function LoginPage() {
  return (
    <>
      <PageHero
        eyebrow="Account"
        title="Keep account flows local while you redesign"
        description="The original login button on the clone homepage now routes here, which lets you test authentication UX, messaging, and pre-login conversion screens without leaving the project."
      >
        <div className="flex flex-wrap gap-3">
          <UpshotLink href="/claim" className={primaryButtonClass}>
            Claim your free card
          </UpshotLink>
          <UpshotLink href="/store" className={secondaryButtonClass}>
            Browse packs
          </UpshotLink>
        </div>
      </PageHero>

      <SectionFrame title="Account entry points" description="Useful placeholders until you wire a real auth provider.">
        <div className="grid gap-4 md:grid-cols-3">
          <OverviewPanel label="Wallet" value="Connect" note="Prototype wallet-first onboarding." />
          <OverviewPanel label="Email" value="Join" note="Test lightweight sign-up flows." />
          <OverviewPanel label="Daily gift" value="Track streak" note="Design retention loops from here." />
        </div>
      </SectionFrame>
    </>
  );
}

function EventsPage() {
  const eventSlides = [
    {
      ctaHref: "/event/cmm8vp91w0j5m2hry0l2c3p2v",
      ctaLabel: "View event",
      description:
        "A more app-like Events surface so live predictions, instant winners, and culture moments feel closer to Upshot instead of a static archive.",
      eyebrow: "Events",
      title: "Track the moment",
    },
    {
      ctaHref: "/event/cmmeinwji1kbr2hmgkib3poex",
      ctaLabel: "Browse instant wins",
      description:
        "Jump between entertainment, sports, markets, and internet culture while the catalog keeps the same bold rhythm as the Store page.",
      eyebrow: "Live now",
      title: "Play the headlines",
    },
    {
      ctaHref: "/event/cmlyy429c00iu2hnur1ivka4u",
      ctaLabel: "See what resolves next",
      description:
        "Keep the Events route feeling active and high-stakes with faster scanning, cleaner filters, and countdown-driven cards that push attention to what matters.",
      eyebrow: "Resolution watch",
      title: "Watch outcomes unfold",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 pb-14 pt-8 md:px-8 md:pb-16 md:pt-10 xl:px-14">
      <StoreSliderHeader slides={eventSlides} descriptionClassName="max-w-[690px]" descriptionLineClamp={2} />

      <div className="mt-10">
        <h1 className="font-good-headline-medium text-[28px] leading-none text-white md:text-[33px]">Events</h1>
      </div>

      <div className="mt-6">
        <EventsBrowser events={eventListings} />
      </div>
    </section>
  );
}

function ContestsPage() {
  const contestSlides = [
    {
      ctaHref: "/contests/ncaa-pick-5-unlimited",
      ctaLabel: "View Contest",
      description: "Build lineups, track locks, and keep the contests page feeling like a real Upshot competition surface instead of a generic list.",
      eyebrow: "Contests",
      title: "Make your call",
    },
    {
      ctaHref: "/contests/pick-5-mid-march-prime-time",
      ctaLabel: "View Contest",
      description: "Browse live contests, compare prize pools, and move through current entries with the same tighter rhythm as the store and marketplace routes.",
      eyebrow: "Live entries",
      title: "Pick your lineup",
    },
    {
      ctaHref: "/contests/pick-3-early-april-sports",
      ctaLabel: "View Contest",
      description: "Surface lineup lock timing, resolution windows, and contest pressure in a layout that feels purpose-built for Upshot’s prediction flow.",
      eyebrow: "Contest flow",
      title: "Chase the prize",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 pb-14 pt-8 md:px-8 md:pb-16 md:pt-10 xl:px-14">
      <StoreSliderHeader slides={contestSlides} descriptionClassName="max-w-[690px]" />

      <div className="mt-10">
        <div>
          <h1 className="font-good-headline-medium text-[28px] leading-none text-white md:text-[33px]">Contests</h1>
          <p className="mt-4 font-sans text-[15px] leading-6 text-[#b0b0b0]">Fantasy-style prediction contests.</p>
        </div>
      </div>

      <div className="mt-6">
        <ContestsBrowser contests={contestListings} />
      </div>
    </section>
  );
}

function MarketplacePage() {
  const marketplaceSlides = [
    {
      ctaHref: "/marketplace",
      ctaLabel: "Browse cards",
      description: "Track live listings, scan card scarcity, and keep the marketplace flow feeling like the same Upshot product language as the store.",
      eyebrow: "Marketplace",
      title: "The perfect to play",
    },
    {
      ctaHref: "/marketplace",
      ctaLabel: "Browse cards",
      description: "Search fast, compare availability, and move through current listings without the page collapsing into a generic gallery.",
      eyebrow: "Listings",
      title: "Watch the market",
    },
    {
      ctaHref: "/marketplace",
      ctaLabel: "Browse cards",
      description: "Surface scarce cards, track burned supply, and keep the buying layer tight and readable while you iterate on the full market UX.",
      eyebrow: "Card flow",
      title: "Find the right card",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 pb-14 pt-8 md:px-8 md:pb-16 md:pt-10 xl:px-14">
      <StoreSliderHeader slides={marketplaceSlides} descriptionClassName="max-w-[690px]" />

      <div className="mt-10">
        <h1 className="font-good-headline-medium text-[28px] leading-none text-white md:text-[33px]">Marketplace</h1>
      </div>

      <div className="mt-6">
        <MarketplaceBrowser listings={marketplaceListings} />
      </div>
    </section>
  );
}

function LeaderboardPage() {
  const leaderboardSlides = [
    {
      ctaHref: "/leaderboard",
      ctaLabel: "View rankings",
      description:
        "Track the season race, compare total XP swings, and keep the leaderboard feeling like a live Upshot surface instead of a static stats page.",
      eyebrow: "Leaderboard",
      title: "Climb the table",
    },
    {
      ctaHref: "/leaderboard",
      ctaLabel: "Check the season",
      description:
        "Follow rank changes, prize positions, and boost totals in a layout that matches the rest of the product instead of breaking into a separate admin style.",
      eyebrow: "Season race",
      title: "Chase the top spot",
    },
    {
      ctaHref: "/leaderboard",
      ctaLabel: "Compare players",
      description:
        "Keep monthly standings, lifetime snapshots, and reward pressure readable with the same polished rhythm already used across Store, Events, and Marketplace.",
      eyebrow: "XP standings",
      title: "Watch the climb",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 pb-14 pt-8 md:px-8 md:pb-16 md:pt-10 xl:px-14">
      <StoreSliderHeader slides={leaderboardSlides} descriptionClassName="max-w-[690px]" />

      <div className="mt-10">
        <LeaderboardHeader />
      </div>

      <div className="mt-6">
        <LeaderboardBrowser entriesByPeriod={leaderboardEntries} />
      </div>
    </section>
  );
}

function CardsPage() {
  return (
    <>
      <PageHero
        eyebrow="Cards"
        title="A local gallery for the captured collection"
        description="This route now keeps card discovery inside the clone, which makes it easy to experiment with browsing, filters, rarity framing, and detail-page transitions."
      >
        <div className="flex flex-wrap gap-3">
          <UpshotLink href="/store" className={primaryButtonClass}>
            Buy a pack
          </UpshotLink>
          <UpshotLink href="/marketplace" className={secondaryButtonClass}>
            Visit marketplace
          </UpshotLink>
        </div>
      </PageHero>

      <SectionFrame title="Captured cards" description="Each card links to a local detail page instead of bouncing to the live product.">
        <CardGrid cards={featuredCards} />
      </SectionFrame>
    </>
  );
}

function DashboardPage() {
  return <DashboardBrowser cards={featuredCards.slice(0, 6)} contests={contestListings.slice(0, 3)} />;
}

function UnknownRoute({ slug }: { slug: string[] }) {
  const pathLabel = `/${slug.join("/")}`;

  return (
    <>
      <PageHero
        eyebrow="Captured route"
        title={formatTitleFromSlug(slug[slug.length - 1] ?? "page")}
        description={`The path ${pathLabel} is now intercepted locally so you can keep exploring within the clone, even before this page gets a custom build-out.`}
      >
        <div className="flex flex-wrap gap-3">
          <UpshotLink href="/" className={secondaryButtonClass}>
            Back home
          </UpshotLink>
          <UpshotLink href="/store" className={primaryButtonClass}>
            Continue exploring
          </UpshotLink>
        </div>
      </PageHero>

      <SectionFrame title="Next build target" description="This fallback keeps the cloned app self-contained until you decide which route to design next.">
        <div className="rounded-[12px] border border-dashed border-[#2d2d2d] bg-[#111] p-6 font-sans text-[15px] leading-8 text-[#cfcfcf]">
          This route is wired locally, but it has not been custom-designed yet. If you want, the next pass can turn it into a fully built page instead of a safe local placeholder.
        </div>
      </SectionFrame>
    </>
  );
}

export default async function UpshotSubpage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;
  const topLevel = slug[0];

  let content: React.ReactNode;

  switch (topLevel) {
    case "store":
      if (slug.length === 1) {
        content = <StorePage />;
        break;
      }

      content = findRouteItem(storePacks, path) ? (
        <StorePackDetail pack={findRouteItem(storePacks, path)!} />
      ) : (
        <UnknownRoute slug={slug} />
      );
      break;
    case "cards":
      content = <CardsPage />;
      break;
    case "claim":
      content = <ClaimPage />;
      break;
    case "login":
      content = <LoginPage />;
      break;
    case "dashboard":
      content = <DashboardPage />;
      break;
    case "events":
      content = <EventsPage />;
      break;
    case "event": {
      const event = findRouteItem(allEvents, path);
      content = event ? <EventDetail event={event} /> : <UnknownRoute slug={slug} />;
      break;
    }
    case "contests":
      if (slug.length === 1) {
        content = <ContestsPage />;
        break;
      }

      content = findRouteItem(allContests, path) ? (
        <ContestDetail contest={findRouteItem(allContests, path)!} />
      ) : (
        <UnknownRoute slug={slug} />
      );
      break;
    case "card-detail":
      content = findRouteItem(featuredCards, path) ? (
        <CardDetail card={findRouteItem(featuredCards, path)!} />
      ) : (
        <UnknownRoute slug={slug} />
      );
      break;
    case "marketplace":
      content = <MarketplacePage />;
      break;
    case "leaderboard":
      content = <LeaderboardPage />;
      break;
    case "terms":
      content = (
        <StaticContentPage
          eyebrow="Legal"
          title="Terms & Conditions"
          description="A local placeholder for the cloned site so you can shape legal-page layout before swapping in final approved copy."
          paragraphs={[
            "This Upshot clone is a local design baseline created from publicly visible front-end content. It is intended for interface iteration and not as a production service.",
            "If you take this clone live, replace this placeholder with reviewed terms that match your product, business entity, and actual user flows.",
            "Until then, this page exists mainly to keep footer navigation self-contained and realistic during design work.",
          ]}
        />
      );
      break;
    case "privacy":
      content = (
        <StaticContentPage
          eyebrow="Legal"
          title="Privacy Policy"
          description="A local placeholder that keeps the clone navigable while you decide how analytics, wallets, and onboarding should actually work."
          paragraphs={[
            "This cloned project stores no production user data by default. It exists as a front-end baseline for design and UX experimentation.",
            "Before shipping anything public, replace this placeholder with a policy that accurately explains any analytics, authentication, cookies, wallet connections, or support tooling you enable.",
            "For now, keeping the page local prevents the privacy link from sending you back to the live site during review sessions.",
          ]}
        />
      );
      break;
    default:
      if (slug.length === 0) {
        notFound();
      }

      content = <UnknownRoute slug={slug} />;
      break;
  }

  return <UpshotPageFrame>{content}</UpshotPageFrame>;
}
