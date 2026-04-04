/* eslint-disable @next/next/no-img-element */

"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

import { UpshotLink } from "@/components/upshot/upshot-shell";
import type { EventItem, EventStatus, EventType } from "@/types/upshot";

const categoryFilters = [
  { label: "All" },
  { label: "Featured", icon: "/images/shooting-star.svg" },
  { label: "Entertainment", icon: "/images/categories/entertainment.svg" },
  { label: "Internet Culture", icon: "/images/categories/internet-culture.svg" },
  { label: "Finance", icon: "/images/categories/finance.svg" },
  { label: "Crypto", icon: "/images/categories/crypto.svg" },
  { label: "Politics", icon: "/images/categories/politics.svg" },
  { label: "Gaming", icon: "/images/categories/gaming.svg" },
  { label: "Sports", icon: "/images/categories/sports.svg" },
] as const;

const statusFilters = [
  { label: "Active", value: "active" },
  { label: "Resolved", value: "resolved" },
] as const satisfies ReadonlyArray<{ label: string; value: EventStatus }>;

const eventTypeFilters = [
  { label: "All Types", value: "all" },
  { label: "Instant Win", value: "instant-win" },
  { label: "Gold", value: "gold" },
  { label: "Shots", value: "shots" },
  { label: "Cash", value: "cash" },
] as const satisfies ReadonlyArray<{ label: string; value: EventType | "all" }>;

type CategoryFilterLabel = (typeof categoryFilters)[number]["label"];
type StatusFilterValue = (typeof statusFilters)[number]["value"];
type EventTypeFilterValue = (typeof eventTypeFilters)[number]["value"];

const cardTitleClamp = {
  WebkitBoxOrient: "vertical" as const,
  WebkitLineClamp: 2,
  display: "-webkit-box",
  overflow: "hidden",
};

const selectedPillClass = "border-[#5f96a1] bg-[#1b2628] text-white";
const defaultPillClass =
  "border-[#2e2e2e] bg-[#1a1a1a] text-[#bdbdbd] hover:border-[#5f96a1] hover:bg-[#1b2628] hover:text-white";

function renderResolutionDate(dateText: string) {
  const match = dateText.match(/^([A-Za-z]+)\s+(\d{1,2},?)\s+(\d{4})$/);

  if (!match) {
    return dateText;
  }

  const [, month, day, year] = match;

  return (
    <>
      <span className="text-white">{month}</span>{" "}
      <span className="text-white">{day}</span>{" "}
      <span className="text-white">{year}</span>
    </>
  );
}

function matchesCategory(event: EventItem, activeCategory: CategoryFilterLabel) {
  if (activeCategory === "All") {
    return true;
  }

  if (activeCategory === "Featured") {
    return Boolean(event.isFeatured);
  }

  return event.category === activeCategory;
}

function matchesStatus(event: EventItem, activeStatus: StatusFilterValue) {
  return event.listingStatus === activeStatus;
}

function matchesEventType(event: EventItem, activeEventType: EventTypeFilterValue) {
  if (activeEventType === "all") {
    return true;
  }

  return event.eventType === activeEventType;
}

function FilterPill({
  active,
  children,
  className = "",
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-[8px] font-sans text-[12px] leading-none transition-colors duration-200 ${
        active ? selectedPillClass : defaultPillClass
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function EventsBrowser({ events }: { events: EventItem[] }) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilterLabel>("All");
  const [activeStatus, setActiveStatus] = useState<StatusFilterValue>("active");
  const [activeEventType, setActiveEventType] = useState<EventTypeFilterValue>("all");
  const [query, setQuery] = useState("");
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredEvents = events.filter((event) => {
    const matchesQuery = normalizedQuery
      ? `${event.title} ${event.category} ${event.resolutionDate ?? ""}`.toLowerCase().includes(normalizedQuery)
      : true;

    return (
      matchesQuery &&
      matchesCategory(event, activeCategory) &&
      matchesStatus(event, activeStatus) &&
      matchesEventType(event, activeEventType)
    );
  });

  const handleFilterToggle = () => {
    setIsFiltersVisible((current) => !current);
  };

  return (
    <div>
      <div className="rounded-full border border-[#2b2b2b] bg-[#131313] px-4 py-3 md:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-1 lg:flex-1 lg:pb-0">
            {categoryFilters.map((filter) => {
              const isActive = activeCategory === filter.label;
              const iconSrc = "icon" in filter ? filter.icon : null;

              return (
                <FilterPill
                  key={filter.label}
                  active={isActive}
                  className="shrink-0 px-[13.625px] py-[8.875px] text-[12.9375px]"
                  onClick={() => setActiveCategory(filter.label)}
                >
                  {iconSrc ? <img src={iconSrc} alt="" className="h-[12.625px] w-[12.625px]" /> : null}
                  <span>{filter.label}</span>
                </FilterPill>
              );
            })}
          </div>

          <div className="flex items-center gap-3 lg:shrink-0">
            <label className="relative w-full lg:w-[285px]">
              <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8d8d8d]" />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search events"
                className="h-[43px] w-full rounded-full border border-[#2e2e2e] bg-[#171717] pl-12 pr-14 font-sans text-[12px] text-[#d7d7d7] outline-none transition-colors duration-200 placeholder:text-[#8d8d8d] hover:border-[#5f96a1] hover:bg-[#1b2628] hover:text-white focus:border-[#5f96a1] focus:bg-[#1b2628] focus:text-white focus:placeholder:text-[#b8b8b8]"
              />
              {query ? (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 z-10 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#5f96a1]/50 bg-[#111111] text-[#89fdfc] transition-colors hover:border-[#89fdfc] hover:bg-[#1b2628] hover:text-white"
                >
                  <X className="h-4 w-4" strokeWidth={2.4} />
                </button>
              ) : null}
            </label>

            <button
              type="button"
              aria-label="Toggle filters"
              onClick={handleFilterToggle}
              className={`inline-flex h-[43px] w-[43px] shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                isFiltersVisible
                  ? "border-[#5f96a1] bg-[#1b2628] text-white"
                  : "border-[#2e2e2e] bg-[#1a1a1a] text-[#bdbdbd] hover:border-[#5f96a1] hover:bg-[#1b2628] hover:text-white"
              }`}
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                <path
                  d="M3.5 4.5h13l-5.2 6.067V15.5l-2.6-1.3v-3.633L3.5 4.5Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`mt-6 grid gap-5 lg:items-start lg:gap-6 ${
          isFiltersVisible
            ? "lg:grid-cols-[minmax(240px,1fr)_minmax(0,3fr)] xl:grid-cols-[minmax(260px,1fr)_minmax(0,3fr)]"
            : "lg:grid-cols-1"
        }`}
      >
        <aside
          className={`w-full rounded-[4px] border border-[#232323] bg-[#151515] p-5 lg:sticky lg:top-[108px] ${
            isFiltersVisible ? "block" : "hidden"
          }`}
        >
          <div className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-[#efefef]">Filters</div>

          <div className="mt-6">
            <div className="font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-[#858585]">Status</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {statusFilters.map((filter) => (
                <FilterPill
                  key={filter.value}
                  active={activeStatus === filter.value}
                  onClick={() => setActiveStatus(filter.value)}
                >
                  <span>{filter.label}</span>
                </FilterPill>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-[#858585]">
              Event Type
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {eventTypeFilters.map((filter) => (
                <FilterPill
                  key={filter.value}
                  active={activeEventType === filter.value}
                  onClick={() => setActiveEventType(filter.value)}
                >
                  <span>{filter.label}</span>
                </FilterPill>
              ))}
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {filteredEvents.length ? (
            <div
              className={`grid gap-x-4 gap-y-5 md:grid-cols-2 ${
                isFiltersVisible ? "xl:grid-cols-3" : "lg:grid-cols-4"
              }`}
            >
              {filteredEvents.map((event) => (
                <UpshotLink
                  key={event.href}
                  href={event.href}
                  className="group overflow-hidden rounded-[4px] border border-[#222] bg-[#0b0b0b] transition-all duration-200 hover:-translate-y-1 hover:border-[#999]"
                >
                  <div className="relative aspect-square overflow-hidden border-b border-[#1d1d1d] bg-[#111]">
                    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <div className="featured-card-hover-shimmer h-full" />
                    </div>
                    <img
                      src={event.heroImage}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03] group-hover:shadow-[0_14px_28px_rgba(0,0,0,0.35)]"
                    />
                    {event.badgeLabel ? (
                      <div className="absolute right-3 top-3 rounded-[18px] border border-[#ea8b55] bg-[#090909f0] px-[15px] py-[7px] font-sans text-[13px] font-medium leading-none text-white shadow-[0_0_0_1px_rgba(0,0,0,0.25)]">
                        {event.badgeLabel}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex min-h-[110px] flex-col px-3.5 pb-3.5 pt-3">
                    <h2
                      className="font-good-headline-medium text-[24px] leading-[1.02] text-white uppercase"
                      style={cardTitleClamp}
                    >
                      {event.title}
                    </h2>
                    {event.resolutionDate ? (
                      <div className="mt-auto pt-2.5 font-sans text-[16px] leading-[1.25] text-[#7a7a7a]">
                        Resolution Date: {renderResolutionDate(event.resolutionDate)}
                      </div>
                    ) : null}
                  </div>
                </UpshotLink>
              ))}
            </div>
          ) : (
            <div className="rounded-[4px] border border-[#232323] bg-[#0d0d0d] px-5 py-6 font-sans text-[13px] leading-6 text-[#9a9a9a]">
              No events match that filter yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
