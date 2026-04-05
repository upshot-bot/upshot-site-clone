"use client";

import { CircleAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { LeaderboardEntry, LeaderboardPeriod } from "@/types/upshot";

const periodOptions = [
  { label: "Season", value: "season" },
  { label: "Lifetime", value: "lifetime" },
] as const satisfies ReadonlyArray<{ label: string; value: LeaderboardPeriod }>;

const selectedPillClass = "border-[#5f96a1] bg-[#1b2628] text-white";
const defaultPillClass =
  "border-[#2e2e2e] bg-[#1a1a1a] text-[#bdbdbd] hover:border-[#5f96a1] hover:bg-[#1b2628] hover:text-white";
const leaderboardSeasonEndsAt = "2026-04-30T23:59:59Z";
const leaderboardMonthOptions = [
  { label: "April 2026", value: "april-2026", tag: "CURRENT" },
  { label: "March 2026", value: "march-2026" },
  { label: "Legacy", value: "legacy" },
] as const;

function formatCountdownParts(targetIso: string) {
  const target = new Date(targetIso).getTime();
  const difference = Math.max(0, target - Date.now());
  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return [
    { label: "d", value: String(days).padStart(2, "0") },
    { label: "h", value: String(hours).padStart(2, "0") },
    { label: "m", value: String(minutes).padStart(2, "0") },
    { label: "s", value: String(seconds).padStart(2, "0") },
  ];
}

export function LeaderboardHeader() {
  const [countdownParts, setCountdownParts] = useState(() => formatCountdownParts(leaderboardSeasonEndsAt));

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCountdownParts(formatCountdownParts(leaderboardSeasonEndsAt));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="mt-1 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex items-end gap-2">
        <h1 className="font-good-headline-medium text-[28px] leading-none text-white md:text-[33px]">Leaderboard</h1>

        <a
          href="https://docs.upshot.cards/leaderboard-system"
          target="_blank"
          rel="noreferrer"
          aria-label="Open leaderboard system docs"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#2d2d2d] bg-[#151515] text-[#8e8e8e] transition-colors duration-200 hover:border-[#5f96a1] hover:bg-[#1b2628] hover:text-[#89fdfc]"
        >
          <span className="sr-only">Leaderboard docs</span>
          <CircleAlert className="h-4 w-4" strokeWidth={1.9} />
        </a>
      </div>

      <div className="flex flex-col items-center gap-3 md:items-start lg:items-end">
        <div className="inline-flex items-center gap-3 rounded-[12px] border border-[#5f96a1] bg-[#151515] px-4 py-3">
          <div className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-[#89fdfc]">
            Season Ends In
          </div>

          <div className="flex items-center gap-1.5">
            {countdownParts.map((part) => (
              <div key={part.label} className="inline-flex items-center gap-1 px-0.5 py-0">
                <div className="font-good-headline-medium text-[20px] leading-none text-white">{part.value}</div>
                <div className="font-sans text-[10px] tracking-[0.08em] text-[#89fdfc]">{part.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getPrizeClass(rank: number, prize: string) {
  if (!prize) {
    return "text-[#6f6f6f]";
  }

  if (rank === 1) {
    return "border-[#f2c14d] bg-[#231b0b] text-[#ffe08c]";
  }

  if (rank === 2) {
    return "border-[#b9c7d5] bg-[#161c22] text-[#e2eef8]";
  }

  if (rank === 3) {
    return "border-[#d28d63] bg-[#24160f] text-[#f3be9c]";
  }

  return "border-[#5f96a1] bg-[#1b2628] text-white";
}

function getRankBadgeClass(rank: number) {
  if (rank === 1) {
    return "border-[#f2c14d] bg-[#231b0b] text-[#ffe08c]";
  }

  if (rank === 2) {
    return "border-[#b9c7d5] bg-[#161c22] text-[#e2eef8]";
  }

  if (rank === 3) {
    return "border-[#d28d63] bg-[#24160f] text-[#f3be9c]";
  }

  return "border-[#343434] bg-[#171717] text-white";
}

function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  return (
    <div className="relative grid grid-cols-[88px_minmax(280px,1.8fr)_140px_170px_130px_140px_150px] items-center gap-x-4 border-t border-[#202020] px-5 py-4 transition-colors duration-200 hover:bg-[#161616] hover:ring-1 hover:ring-inset hover:ring-[#5f96a1]">
      <div className="flex justify-center">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full border font-good-headline-medium text-[22px] leading-none ${getRankBadgeClass(
            entry.rank,
          )}`}
        >
          {entry.rank}
        </div>
      </div>

      <div className="min-w-0">
        <div className="truncate font-sans text-[16px] font-semibold leading-[1.3] text-white">{entry.name}</div>
        <div className="mt-1 truncate font-sans text-[13px] leading-none text-[#7e7e7e]">{entry.walletTag}</div>
      </div>

      <div className="text-center font-sans text-[15px] font-semibold text-white">{entry.totalXp}</div>
      <div className="text-center font-sans text-[15px] font-semibold text-white">{entry.winningCardXp}</div>
      <div className="text-center font-sans text-[15px] text-[#bcbcbc]">{entry.setBoost}</div>
      <div className="text-center font-sans text-[15px] text-[#bcbcbc]">{entry.otherBoosts}</div>

      <div className="flex justify-center">
        <span
          className={`inline-flex min-h-[34px] items-center justify-center rounded-full border px-3.5 py-1.5 text-center font-sans text-[13px] font-semibold leading-none ${getPrizeClass(
            entry.rank,
            entry.prize,
          )}`}
        >
          {entry.prize || "—"}
        </span>
      </div>
    </div>
  );
}

export function LeaderboardBrowser({
  entriesByPeriod,
}: {
  entriesByPeriod: Record<LeaderboardPeriod, LeaderboardEntry[]>;
}) {
  const [activePeriod, setActivePeriod] = useState<LeaderboardPeriod>("season");
  const [selectedMonth, setSelectedMonth] = useState<(typeof leaderboardMonthOptions)[number]["value"]>("april-2026");
  const [isMonthMenuOpen, setIsMonthMenuOpen] = useState(false);
  const monthMenuRef = useRef<HTMLDivElement | null>(null);
  const entries = entriesByPeriod[activePeriod];

  useEffect(() => {
    if (!isMonthMenuOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!monthMenuRef.current?.contains(event.target as Node)) {
        setIsMonthMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isMonthMenuOpen]);

  const activeMonthLabel =
    leaderboardMonthOptions.find((option) => option.value === selectedMonth)?.label ?? "April 2026";

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {periodOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setActivePeriod(option.value)}
              className={`inline-flex items-center rounded-full border px-4 py-2 font-sans text-[14px] font-medium leading-none transition-colors duration-200 ${
                activePeriod === option.value ? selectedPillClass : defaultPillClass
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div ref={monthMenuRef} className="relative md:ml-auto">
          <button
            type="button"
            aria-expanded={isMonthMenuOpen}
            onClick={() => setIsMonthMenuOpen((current) => !current)}
            className={`inline-flex h-[44px] min-w-[220px] items-center justify-between gap-3 rounded-full border px-6 font-sans text-[13px] leading-none transition-colors duration-200 ${
              isMonthMenuOpen
                ? "border-[#8ec6ff] bg-[#1a1a1a] text-white shadow-[0_0_0_1px_rgba(142,198,255,0.25)]"
                : defaultPillClass
            }`}
          >
            <span>{activeMonthLabel}</span>
            <svg
              viewBox="0 0 20 20"
              className={`h-3.5 w-3.5 text-current transition-transform duration-200 ${isMonthMenuOpen ? "rotate-180" : ""}`}
              fill="none"
              aria-hidden="true"
            >
              <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {isMonthMenuOpen ? (
            <div className="absolute right-0 top-[calc(100%+12px)] z-40 min-w-[260px] overflow-hidden rounded-[16px] border border-[#2f2f2f] bg-[#1a1a1a] shadow-[0_18px_32px_rgba(0,0,0,0.44)]">
              {leaderboardMonthOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setSelectedMonth(option.value);
                    setIsMonthMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-6 py-4 text-left font-sans text-[13px] font-medium transition-colors duration-200 ${
                    selectedMonth === option.value
                      ? "bg-[#242424] text-[#89fdfc]"
                      : "text-[#949494] hover:bg-[#202020] hover:text-white"
                  }`}
                >
                  <span>{option.label}</span>
                  {"tag" in option ? (
                    <span className="inline-flex items-center rounded-full bg-linear-to-r from-[#67efc9] to-[#2b8cff] px-3.5 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-[#111]">
                      {option.tag}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-[8px] border border-[#232323] bg-[#131313]">
        <div className="overflow-x-auto">
          <div className="min-w-[1160px]">
            <div className="grid grid-cols-[88px_minmax(280px,1.8fr)_140px_170px_130px_140px_150px] gap-x-4 bg-[#2a2a2a] px-5 py-4 font-sans text-[16px] font-semibold text-[#89fdfc]">
              <div className="text-center">Rank</div>
              <div>Name/Wallet Tag</div>
              <div className="text-center">Total XP</div>
              <div className="text-center">Winning Card XP</div>
              <div className="text-center">Set Boost</div>
              <div className="text-center">Other Boosts</div>
              <div className="text-center">Prize</div>
            </div>

            {entries.map((entry) => (
              <LeaderboardRow key={`${activePeriod}-${entry.rank}-${entry.walletTag}`} entry={entry} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
