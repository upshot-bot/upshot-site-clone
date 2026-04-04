/* eslint-disable @next/next/no-img-element */

import { UpshotLink } from "@/components/upshot/upshot-shell";
import type { ContestItem } from "@/types/upshot";

export function ContestBoard({
  contest,
  interactive = false,
}: {
  contest: ContestItem;
  interactive?: boolean;
}) {
  return (
    <article
      className={`overflow-hidden rounded-[6px] border border-[#2b2b2b] bg-[#141414] ${
        interactive ? "group transition-all duration-200 hover:-translate-y-1 hover:border-[#999]" : ""
      }`}
    >
      <div className="flex flex-col gap-2.5 p-[10px] md:flex-row md:items-stretch md:gap-3 md:py-[10px] md:pr-[10px] md:pl-0">
        <div className="relative w-full overflow-hidden rounded-[2px] md:-my-[10px] md:flex md:w-[236px] md:shrink-0 md:self-stretch md:rounded-none">
          <div
            className={`pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-0 transition-opacity duration-200 ${
              interactive ? "group-hover:opacity-100" : ""
            }`}
          >
            <div className="featured-card-hover-shimmer h-full" />
          </div>
          <img
            src={contest.poster}
            alt={contest.title}
            className={`h-full max-h-full w-full object-cover object-left ${
              interactive ? "transition-transform duration-200 group-hover:scale-[1.01] group-hover:shadow-[0_14px_28px_rgba(0,0,0,0.35)]" : ""
            }`}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col py-0.5 md:pl-[18px]">
          <div className="mt-2 flex items-start justify-between gap-4">
            <div>
              <div className="mt-1 flex items-center gap-2 text-[#d7d7d7]">
                <img src="/images/gold.svg" alt="" className="h-4 w-4" />
                <span className="font-sans text-[13px] font-semibold">{contest.cardsRequired} cards required</span>
              </div>
              <h2 className="mt-2 font-good-headline-medium text-[22px] leading-[1.02] text-white uppercase md:text-[26px]">
                {contest.title}
              </h2>
            </div>

            <div className="mt-2 mr-5 flex items-center gap-1.5 md:mr-4">
              {contest.categories.map((category) => (
                <img
                  key={`${contest.title}-${category.label}`}
                  src={category.icon}
                  alt={category.label}
                  title={category.label}
                  className="h-[20px] w-[20px]"
                />
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-2.5 md:mt-[76px] md:grid-cols-2">
            <div>
              <div className="flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[#8ed8f8]">
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path
                    d="M6.5 8V6.5a3.5 3.5 0 0 1 7 0V8m-8 0h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{contest.lineupLockLabel}</span>
              </div>
              <div className="mt-1.5 font-sans text-[18px] font-semibold leading-none text-white">{contest.lineupLockValue}</div>
              <div className="mt-1.5 font-sans text-[13px] leading-none text-[#8e8e8e]">{contest.lineupLockNote}</div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[#8ed8f8]">
                <img src="/images/gold.svg" alt="" className="h-4 w-4" />
                <span>{contest.resolutionLabel}</span>
              </div>
              <div className="mt-1.5 font-sans text-[18px] font-semibold leading-none text-white">{contest.resolutionValue}</div>
              <div className="mt-1.5 font-sans text-[13px] leading-none text-[#8e8e8e]">{contest.resolutionNote}</div>
            </div>
          </div>
        </div>

        <div
          className={`rounded-[6px] border border-[#2d2d2d] bg-[#191919] p-[14px] md:flex md:min-h-[228px] md:w-[366px] md:shrink-0 md:flex-col ${
            interactive ? "transition-colors duration-200 group-hover:border-[#444]" : ""
          }`}
        >
          <div className="md:mt-[34px]">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="border-r border-[#303030] pr-3">
                <div className="font-sans text-[16px] text-[#b0b0b0]">Ends in</div>
                <div className="mt-2 font-good-headline-medium text-[33px] leading-none text-white">{contest.endsIn}</div>
              </div>
              <div className="pl-1">
                <div className="font-sans text-[16px] text-[#b0b0b0]">Prize Pool</div>
                <div className="mt-2 font-good-headline-medium text-[33px] leading-none text-white">{contest.prizePool}</div>
              </div>
            </div>

            <UpshotLink
              href={contest.href}
              className="mx-auto mt-5 flex h-[37px] w-[78%] max-w-[248px] items-center justify-center rounded-full bg-[#8fdcf8] px-5 font-sans text-[14px] font-semibold text-[#111] md:mt-[40px] md:w-[75%]"
            >
              {contest.ctaLabel}
            </UpshotLink>
          </div>
        </div>
      </div>
    </article>
  );
}
