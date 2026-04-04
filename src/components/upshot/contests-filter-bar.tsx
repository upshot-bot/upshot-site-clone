"use client";

import { Search, X } from "lucide-react";

export const contestFilters = ["All", "Live", "Open", "Completed"] as const;

export type ContestFilterLabel = (typeof contestFilters)[number];

export function ContestsFilterBar({
  activeFilter,
  onChange,
  query,
  onQueryChange,
}: {
  activeFilter: ContestFilterLabel;
  onChange: (nextFilter: ContestFilterLabel) => void;
  query: string;
  onQueryChange: (nextQuery: string) => void;
}) {
  return (
    <div className="rounded-full border border-[#2b2b2b] bg-[#131313] px-5 py-3 md:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3 overflow-x-auto">
          {contestFilters.map((label) => {
            const isActive = activeFilter === label;

            return (
              <button
                key={label}
                type="button"
                aria-pressed={isActive}
                onClick={() => onChange(label)}
                className={`inline-flex h-[44px] shrink-0 items-center rounded-full border px-6 font-sans text-[13px] leading-none transition-colors duration-200 ${
                  isActive
                    ? "border-[#5f96a1] bg-[#1b2628] text-white"
                    : "border-[#2e2e2e] bg-[#1a1a1a] text-[#bdbdbd] hover:border-[#5f96a1] hover:bg-[#1b2628] hover:text-white"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="w-full xl:w-auto">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8d8d8d]" />
            <input
              type="text"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search contests"
              className="h-[49px] w-full rounded-full border border-[#2e2e2e] bg-[#171717] pl-12 pr-14 font-sans text-[13px] text-[#d7d7d7] outline-none transition-colors duration-200 placeholder:text-[#8d8d8d] hover:border-[#5f96a1] hover:bg-[#1b2628] hover:text-white focus:border-[#5f96a1] focus:bg-[#1b2628] focus:text-white focus:placeholder:text-[#b8b8b8] xl:w-[292px]"
            />
            {query ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => onQueryChange("")}
                className="absolute right-3 top-1/2 z-10 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#5f96a1]/50 bg-[#111111] text-[#89fdfc] transition-colors hover:border-[#89fdfc] hover:bg-[#1b2628] hover:text-white"
              >
                <X className="h-4 w-4" strokeWidth={2.4} />
              </button>
            ) : null}
          </label>
        </div>
      </div>
    </div>
  );
}
