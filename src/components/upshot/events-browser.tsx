/* eslint-disable @next/next/no-img-element */

"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

import { UpshotLink } from "@/components/upshot/upshot-shell";
import type { EventItem } from "@/types/upshot";

const eventFilters = [
  { label: "All" },
  { label: "Featured", icon: "/images/gold.svg" },
  { label: "Entertainment", icon: "/images/categories/entertainment.svg" },
  { label: "Internet Culture", icon: "/images/categories/internet-culture.svg" },
  { label: "Finance", icon: "/images/categories/finance.svg" },
  { label: "Crypto", icon: "/images/categories/crypto.svg" },
  { label: "Politics", icon: "/images/categories/politics.svg" },
  { label: "Gaming", icon: "/images/categories/gaming.svg" },
  { label: "Sports", icon: "/images/categories/sports.svg" },
] as const;

type EventFilterLabel = (typeof eventFilters)[number]["label"];

function matchesFilter(event: EventItem, activeFilter: EventFilterLabel) {
  if (activeFilter === "All") {
    return true;
  }

  if (activeFilter === "Featured") {
    return Boolean(event.isFeatured);
  }

  return event.category === activeFilter;
}

export function EventsBrowser({ events }: { events: EventItem[] }) {
  const [activeFilter, setActiveFilter] = useState<EventFilterLabel>("All");
  const [query, setQuery] = useState("");

  const filteredEvents = events.filter((event) => {
    const matchesQuery = query
      ? `${event.title} ${event.category}`.toLowerCase().includes(query.trim().toLowerCase())
      : true;

    return matchesQuery && matchesFilter(event, activeFilter);
  });

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#888]" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            className="h-[42px] w-full rounded-[4px] border border-[#272727] bg-[#121212] pl-11 pr-4 font-sans text-[13px] text-[#dedede] outline-none transition-colors placeholder:text-[#777] hover:border-[#424242] focus:border-[#5f96a1]"
          />
        </div>

        <button
          type="button"
          aria-label="Filter events"
          className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-[4px] border border-[#272727] bg-[#121212] text-[#9a9a9a] transition-colors hover:border-[#424242] hover:text-white"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {eventFilters.map((filter) => {
          const isActive = activeFilter === filter.label;
          const iconSrc = "icon" in filter ? filter.icon : null;

          return (
            <button
              key={filter.label}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveFilter(filter.label)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-sans text-[11px] font-medium leading-none transition-colors ${
                isActive
                  ? "border-[#444] bg-[#1a1a1a] text-white"
                  : "border-[#2a2a2a] bg-[#0f0f0f] text-[#9d9d9d] hover:border-[#3f3f3f] hover:text-white"
              }`}
            >
              {iconSrc ? <img src={iconSrc} alt="" className="h-3 w-3" /> : null}
              <span>{filter.label}</span>
            </button>
          );
        })}
      </div>

      {filteredEvents.length ? (
        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {filteredEvents.map((event) => (
            <UpshotLink
              key={event.href}
              href={event.href}
              className="group overflow-hidden rounded-[8px] border border-[#232323] bg-[#0a0a0a] transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#343434]"
            >
              <div className="relative aspect-[31/15] overflow-hidden border-b border-[#1d1d1d] bg-[#111]">
                <img src={event.heroImage} alt={event.title} className="h-full w-full object-cover object-top" />
                {event.badgeLabel ? (
                  <div className="absolute right-3 top-3 rounded-[14px] border border-[#ea8b55] bg-[#090909f0] px-3 py-1.5 font-sans text-[11px] font-medium leading-none text-white shadow-[0_0_0_1px_rgba(0,0,0,0.25)]">
                    {event.badgeLabel}
                  </div>
                ) : null}
              </div>

              <div className="min-h-[164px] px-4 pb-4 pt-4">
                <h2 className="font-good-headline-medium text-[25px] leading-[1.08] text-white uppercase md:text-[27px]">
                  {event.title}
                </h2>
                {event.resolutionDate ? (
                  <div className="mt-4 font-sans text-[13px] leading-5 text-[#787878]">
                    Resolution Date: {event.resolutionDate}
                  </div>
                ) : null}
              </div>
            </UpshotLink>
          ))}
        </div>
      ) : (
        <div className="mt-7 rounded-[8px] border border-[#232323] bg-[#0a0a0a] px-5 py-6 font-sans text-[14px] leading-6 text-[#909090]">
          No events match that filter yet.
        </div>
      )}
    </div>
  );
}
