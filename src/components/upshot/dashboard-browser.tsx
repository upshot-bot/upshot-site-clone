/* eslint-disable @next/next/no-img-element */

"use client";

import { Check, CheckCheck, ChevronDown, Clock3, Copy, Flame, Sparkles, Trophy } from "lucide-react";
import { useState } from "react";

import { UpshotLink } from "@/components/upshot/upshot-shell";
import type { ContestItem, FeaturedCardItem } from "@/types/upshot";

const dashboardTabs = ["My Dashboard", "My Collection", "My Packs", "Activity", "Referrals"] as const;

const currencyRows = [
  { icon: "/images/dashboard/cash.svg", label: "USD", value: "$427.39", valueClassName: "text-white" },
  { icon: "/images/dashboard/shooting_star_icon.svg", label: "Shot", value: "1,427", valueClassName: "text-[#89fdfc]" },
  { icon: "/images/dashboard/gold.svg", label: "Gold", value: "0", valueClassName: "text-[#f2c14d]" },
] as const;

const statRows = [
  { label: "Est. Season Payout", value: "$23.53", valueClassName: "text-white" },
  { label: "Season Rank", value: "#69", valueClassName: "text-white" },
  { label: "Season XP", value: "3,382", valueClassName: "text-[#d28cff]" },
] as const;

const expandedStatRows = [
  { label: "Card XP", value: "300", valueClassName: "text-white" },
  { label: "Lifetime Rank", value: "#25", valueClassName: "text-white" },
  { label: "Total XP", value: "63,396", valueClassName: "text-white" },
  { label: "Seasons", value: "1", valueClassName: "text-white" },
] as const;

const contestDescriptions: Record<string, string> = {
  "NCAA Pick 5 Unlimited":
    "March Mayhem is here and anything can happen. Lock in 5 Sports predictions and ride the chaos through the next slate.",
  "Pick 3: Early April Sports":
    "The quarter-finals stay on. The quarter finals of the English FA Cup are live, and another chaotic card slate is open.",
  "Pick 5: Mid-March Prime Time":
    "From mid-march to prime-time spotlights, this contest pulls together culture, internet momentum, games, and sports.",
};

const sectionPillLinkClass =
  "inline-flex items-center justify-center rounded-full border border-[#5f96a1] bg-[#1b2628] px-4 py-[9px] font-sans text-[13px] font-medium leading-none text-white transition-all duration-200 hover:border-[#89fdfc] hover:bg-linear-to-r hover:from-[#89fdfc] hover:to-[#96e3ff] hover:font-semibold hover:text-[#111]";

function SidebarBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[14px] border border-[#232323] bg-[#101010] p-4 shadow-[0_14px_32px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-1 hover:border-[#999]">
      <div className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6d6d6d]">{title}</div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function SectionHeading({
  title,
  count,
  href,
}: {
  title: string;
  count?: string;
  href?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <h2 className="font-good-headline-medium text-[21px] uppercase leading-none text-white">{title}</h2>
        {count ? <span className="font-sans text-[13px] text-[#6d6d6d]">{count}</span> : null}
      </div>

      {href ? (
        <UpshotLink href={href} className={sectionPillLinkClass}>
          View all
        </UpshotLink>
      ) : null}
    </div>
  );
}

function DashboardCardRail({ cards }: { cards: FeaturedCardItem[] }) {
  return (
    <div className="-mt-2 scrollbar-hidden flex gap-4 overflow-x-auto pb-2 pt-2">
      {cards.map((card) => (
        <UpshotLink
          key={card.href}
          href={card.href}
          className="group w-[313px] min-w-[313px] overflow-hidden rounded-[8px] border border-[#333] bg-[#1b1b1b] transition-all duration-200 hover:-translate-y-1 hover:border-[#999]"
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
  );
}

function DashboardContestList({ contests }: { contests: ContestItem[] }) {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {contests.map((contest) => (
        <UpshotLink
          key={contest.href}
          href={contest.href}
          className="group grid gap-5 overflow-hidden rounded-[12px] border border-[#262626] bg-[#131313] p-4 shadow-[0_14px_32px_rgba(0,0,0,0.22)] transition-all duration-200 hover:-translate-y-1 hover:border-[#999] hover:bg-[#151515] md:grid-cols-[130px_minmax(0,1fr)]"
        >
          <div className="relative overflow-hidden rounded-[8px] border border-[#2b2b2b] bg-[#0f0f0f]">
            <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <div className="featured-card-hover-shimmer h-full" />
            </div>
            <img
              src={contest.poster}
              alt={contest.title}
              className="h-full min-h-[112px] w-full object-cover transition-transform duration-200 group-hover:scale-[1.02] group-hover:shadow-[0_14px_28px_rgba(0,0,0,0.35)]"
            />
          </div>

          <div className="flex min-w-0 flex-col pt-1.5 pb-2">
            <div className="font-sans text-[17px] font-semibold leading-[1.35] text-white">{contest.title}</div>
            <p
              className="mt-2 h-[48px] overflow-hidden font-sans text-[16px] leading-[1.5] text-[#8c8c8c]"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
              }}
            >
              {contestDescriptions[contest.title] ??
                "Prediction contest synced into the local clone so you can keep iterating on lineup, timing, and rewards."}
            </p>

            <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1 pt-1 font-sans text-[16px] leading-[1.35] text-[#8e8e8e]">
              <span>
                Ends {contest.endsIn}
              </span>
              <span className="font-semibold text-[#57d4d2]">{contest.prizePool} Prize Pool</span>
            </div>
          </div>
        </UpshotLink>
      ))}
    </div>
  );
}

export function DashboardBrowser({
  cards,
  contests,
}: {
  cards: FeaturedCardItem[];
  contests: ContestItem[];
}) {
  const [activeTab, setActiveTab] = useState<(typeof dashboardTabs)[number]>("My Dashboard");
  const [hasCopied, setHasCopied] = useState(false);
  const [isStatsExpanded, setIsStatsExpanded] = useState(true);
  const [isQuestSummaryExpanded, setIsQuestSummaryExpanded] = useState(true);
  const profileUrl = "upshot.cards/profile/xibot9476";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${profileUrl}`);
      setHasCopied(true);
      window.setTimeout(() => setHasCopied(false), 1600);
    } catch {
      setHasCopied(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 pb-14 pt-8 md:px-8 md:pb-16 md:pt-10 xl:px-14">
      <div className="grid gap-5 xl:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <section className="rounded-[16px] border border-[#232323] bg-[#111] p-5 shadow-[0_14px_32px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-1 hover:border-[#999]">
            <div className="flex flex-col items-start gap-4 xl:items-center xl:text-center">
              <div className="relative">
                <div className="h-[62px] w-[62px] overflow-hidden rounded-full">
                  <img
                    src="/images/dashboard/xibot-upshot-pfp.png"
                    alt="XIBOT profile"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 rounded-full border border-[#202020] bg-[#0f0f0f] p-1 text-[#89fdfc]">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
              </div>

              <div>
                <div className="font-good-headline-medium text-[22px] leading-none text-white">XIBOT | AAVEGOTCHI</div>
                <div className="mt-2 font-sans text-[11px] uppercase tracking-[0.14em] text-[#8e8e8e]">@XIBOT</div>
              </div>

              <button
                type="button"
                className="inline-flex items-center rounded-full border border-[#2c2c2c] bg-[#171717] px-4 py-2 font-sans text-[12px] font-medium text-[#d4d4d4] transition-colors hover:border-[#5f96a1] hover:bg-[#1b2628] hover:text-white"
              >
                Edit Profile
              </button>
            </div>
          </section>

          <SidebarBlock title="Currencies">
            <div className="space-y-3">
              {currencyRows.map((row) => {
                return (
                  <div key={row.label} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 text-[#9e9e9e]">
                      <img src={row.icon} alt="" className="h-5 w-5 object-contain" />
                      <span className="font-sans text-[14px]">{row.label}</span>
                    </div>
                    <span className={`font-good-headline-medium text-[20px] leading-none ${row.valueClassName}`}>{row.value}</span>
                  </div>
                );
              })}
            </div>
          </SidebarBlock>

          <section className="rounded-[14px] border border-[#232323] bg-[#101010] p-4 shadow-[0_14px_32px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-1 hover:border-[#999]">
            <button
              type="button"
              onClick={() => setIsStatsExpanded((current) => !current)}
              className="group flex w-full items-center justify-between gap-3 text-left"
              aria-expanded={isStatsExpanded}
            >
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6d6d6d]">Stats</span>
              <ChevronDown
                className={`h-4 w-4 text-[#6d6d6d] transition-transform duration-200 group-hover:text-[#89fdfc] ${isStatsExpanded ? "rotate-180" : ""}`}
                strokeWidth={2.1}
              />
            </button>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2 pb-2 text-[#89fdfc]">
                <Clock3 className="h-4 w-4" strokeWidth={1.9} />
                <span className="font-sans text-[12px]">25d 22h remaining</span>
              </div>
              {statRows.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-4">
                <span className="font-sans text-[12.25px] text-[#8e8e8e]">{row.label}</span>
                  <span className={`font-good-headline-medium text-[20px] leading-none ${row.valueClassName}`}>{row.value}</span>
                </div>
              ))}
              {isStatsExpanded
                ? expandedStatRows.map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-4 pt-2">
                      <span className="font-sans text-[12.25px] text-[#8e8e8e]">{row.label}</span>
                      <span className={`font-good-headline-medium text-[20px] leading-none ${row.valueClassName}`}>{row.value}</span>
                    </div>
                  ))
                : null}
            </div>
          </section>

          <SidebarBlock title="Share Profile">
            <div className="space-y-3">
              <div className="rounded-[10px] border border-[#2a2a2a] bg-[#161616] px-3 py-2 font-sans text-[11px] text-[#7d7d7d]">
                {profileUrl}
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#89fdfc] to-[#96e3ff] px-4 py-2.5 font-sans text-[12px] font-semibold text-[#111]"
              >
                <Copy className="h-3.5 w-3.5" />
                {hasCopied ? "Copied Link" : "Copy Link"}
              </button>
            </div>
          </SidebarBlock>
        </aside>

        <div>
          <div className="pb-6">
            <div className="flex flex-wrap items-center gap-2">
              {dashboardTabs.map((tab) => {
                const isActive = tab === activeTab;

                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`inline-flex items-center rounded-full border px-4 py-2 font-sans text-[12px] font-medium leading-none transition-colors duration-200 ${
                      isActive
                        ? "border-[#5f96a1] bg-[#1b2628] text-white"
                        : "border-[#262626] bg-[#111] text-[#8d8d8d] hover:border-[#5f96a1] hover:bg-[#1b2628] hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-6">
            <SectionHeading title="Daily Quests" count="4/4 complete" />
          </div>

            <div className="mt-5 space-y-3">
            <div className="rounded-[16px] border border-[#1c2b2d] bg-[radial-gradient(circle_at_top,_rgba(137,253,252,0.12),_transparent_55%),linear-gradient(180deg,#101515_0%,#0d0d0d_100%)] px-6 py-[25px] text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#2b5254] bg-[#102123] text-[#89fdfc]">
                <CheckCheck className="h-5 w-5" />
              </div>
              <div className="mt-3 font-good-headline-medium text-[26px] leading-none text-white">All Done for Today</div>
              <p className="mx-auto mt-2 max-w-[420px] font-sans text-[13px] leading-[1.55] text-[#7f8b8c]">
                You&apos;ve completed all of your quests. Check back soon for new ones.
              </p>
            </div>

            <div className="rounded-[14px] border border-[#242424] bg-[#111] px-6 py-5 shadow-[0_14px_32px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-1 hover:border-[#999]">
              <div className="flex items-center gap-2">
                <div className="text-[#d28cff]">
                  <Flame className="h-5 w-5" strokeWidth={2.1} />
                </div>
                <div className="font-good-headline-medium text-[18px] leading-none text-white">31-Day Streak</div>
              </div>

              <div className="mt-3 font-sans text-[14px] leading-[1.3] text-[#7d7d7d]">Best: 31 days · 4d to bonus</div>

              <div className="mt-6 font-good-headline-medium text-[13px] uppercase leading-none text-[#89fdfc]">
                Ready To Claim
              </div>

              <div className="mt-4 h-[12px] overflow-hidden rounded-full bg-[#202020]">
                <div className="h-full w-full rounded-full bg-linear-to-r from-[#89fdfc] to-[#8de9ff]" />
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#89fdfc] to-[#96e3ff] px-4 py-[9px] font-sans text-[13px] font-semibold leading-none text-[#111] transition-transform duration-200 hover:scale-[1.02]"
                >
                  Claim Reward
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[16px] border border-[#242424] bg-[#111] shadow-[0_14px_32px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-1 hover:border-[#999]">
              <button
                type="button"
                onClick={() => setIsQuestSummaryExpanded((current) => !current)}
                className={`group flex w-full items-center justify-between gap-4 px-4 text-left ${
                  isQuestSummaryExpanded ? "py-[16px]" : "py-3"
                }`}
                aria-expanded={isQuestSummaryExpanded}
              >
                <div className="flex items-center gap-3 font-sans text-[12px]">
                  <div className="flex items-center gap-0.5 text-[#7d7d7d]">
                    <Check className="h-[11px] w-[11px]" strokeWidth={2.4} />
                    <Check className="h-[11px] w-[11px]" strokeWidth={2.4} />
                    <Check className="h-[11px] w-[11px]" strokeWidth={2.4} />
                  </div>
                  <span className="text-white">3 completed</span>
                  <span className="text-[#965cf3]">+100 XP earned</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-[#6d6d6d] transition-transform duration-200 group-hover:text-[#89fdfc] ${
                    isQuestSummaryExpanded ? "rotate-180" : ""
                  }`}
                  strokeWidth={2.1}
                />
              </button>

              {isQuestSummaryExpanded ? (
                <div className="px-4 pb-4 pt-2">
                  <div className="space-y-3">
                    {[
                      { label: "Generate Access Card", value: "+50" },
                      { label: "Set Your Username", value: "+25" },
                      { label: "Add a Profile Image", value: "+25" },
                    ].map((quest) => (
                      <div
                        key={quest.label}
                        className="flex items-center justify-between rounded-[12px] bg-[#151515] px-4 py-[7px]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#2b2b2b] bg-[#171717] text-[#7d7d7d]">
                            <Check className="h-[11px] w-[11px]" strokeWidth={2.4} />
                          </div>
                          <span className="font-sans text-[11px] text-[#8e8e8e] line-through">{quest.label}</span>
                        </div>
                        <span className="font-good-headline-medium text-[15px] leading-none text-[#965cf3]">{quest.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        <div>
          <SectionHeading title="Ready To Claim" />

          <div className="mt-3 rounded-[16px] border border-[#242424] bg-[#111] px-6 py-12 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#272727] bg-[#171717] text-[#7c7c7c]">
              <Trophy className="h-5 w-5" />
            </div>
            <div className="mt-4 font-good-headline-medium text-[24px] leading-none text-white">No Prizes to Claim</div>
            <p className="mx-auto mt-3 max-w-[360px] font-sans text-[13px] leading-6 text-[#7f7f7f]">
              When your cards win, you can claim prizes from this panel.
            </p>
          </div>
        </div>

        <div>
          <SectionHeading title="My Cards" count={`(${cards.length})`} href="/cards" />
          <div className="mt-5">
            <DashboardCardRail cards={cards} />
          </div>
        </div>

        <div>
          <SectionHeading title="My Contests" count={`(${contests.length})`} href="/contests" />
          <div className="mt-5">
            <DashboardContestList contests={contests} />
          </div>
        </div>
      </div>
    </section>
  );
}
