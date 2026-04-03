"use client";

import { useState } from "react";

const storeBrowseFilters = ["All packs", "Starter", "Sports", "Markets", "Premium"];

export function StoreBrowseBar() {
  const [activeFilter, setActiveFilter] = useState(storeBrowseFilters[0]);
  const [query, setQuery] = useState("");

  return (
    <div className="rounded-full border border-[#2b2b2b] bg-[#131313] px-5 py-3 md:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          {storeBrowseFilters.map((label) => {
            const isActive = activeFilter === label;

            return (
              <button
                key={label}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(label)}
                className={`rounded-full border px-5 py-[10px] font-sans text-[13px] leading-none transition-colors duration-200 ${
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
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search packs or cards"
              className="h-[49px] w-full rounded-full border border-[#2e2e2e] bg-[#171717] px-7 pr-12 font-sans text-[13px] text-[#d7d7d7] outline-none transition-colors duration-200 placeholder:text-[#8d8d8d] hover:border-[#5f96a1] hover:bg-[#1b2628] hover:text-white focus:border-[#5f96a1] focus:bg-[#1b2628] focus:text-white focus:placeholder:text-[#b8b8b8] xl:w-[292px]"
            />
            {query ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 font-sans text-[16px] font-semibold leading-none text-[#5f96a1] transition-colors hover:text-white"
              >
                ×
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
