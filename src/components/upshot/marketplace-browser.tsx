/* eslint-disable @next/next/no-img-element */

"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { UpshotLink } from "@/components/upshot/upshot-shell";
import type { MarketplaceEventType, MarketplaceListingItem, MarketplaceRarity } from "@/types/upshot";

const rarityFilters = [
  { label: "Common", value: "common" },
  { label: "Uncommon", value: "uncommon" },
  { label: "Rare", value: "rare" },
  { label: "Legendary", value: "legendary" },
] as const satisfies ReadonlyArray<{ label: string; value: MarketplaceRarity }>;

const eventTypeFilters = [
  { label: "All Types", value: "all" },
  { label: "Instant Win", value: "instant-win" },
  { label: "Gold", value: "gold" },
  { label: "Shots", value: "shots" },
  { label: "Cash", value: "cash" },
] as const satisfies ReadonlyArray<{ label: string; value: MarketplaceEventType | "all" }>;

const categoryFilters = [
  "Entertainment",
  "Featured",
  "Internet Culture",
  "Finance",
  "Crypto",
  "Politics",
  "Gaming",
  "Sports",
] as const;

const marketplaceSortOptions = [
  { label: "Ending Soonest", value: "ending-soonest" },
  { label: "Ending Latest", value: "ending-latest" },
  { label: "Name A-Z", value: "name-asc" },
] as const;

type MarketplaceBrowseMode = "all-cards" | "by-event";
type RarityFilterValue = MarketplaceRarity | "all";
type EventTypeFilterValue = MarketplaceEventType | "all";
type CategoryFilterValue = (typeof categoryFilters)[number] | "all";
type MarketplaceViewMode = "grid" | "list";
type MarketplaceSortValue = (typeof marketplaceSortOptions)[number]["value"];

const selectedPillClass = "border-[#5f96a1] bg-[#1b2628] text-white";
const defaultPillClass =
  "border-[#2e2e2e] bg-[#1a1a1a] text-[#bdbdbd] hover:border-[#5f96a1] hover:bg-[#1b2628] hover:text-white";

function matchesRarity(listing: MarketplaceListingItem, activeRarity: RarityFilterValue) {
  if (activeRarity === "all") {
    return true;
  }

  return listing.rarity === activeRarity;
}

function matchesEventType(listing: MarketplaceListingItem, activeEventType: EventTypeFilterValue) {
  if (activeEventType === "all") {
    return true;
  }

  return listing.eventType === activeEventType;
}

function matchesCategory(listing: MarketplaceListingItem, activeCategory: CategoryFilterValue) {
  if (activeCategory === "all") {
    return true;
  }

  if (activeCategory === "Featured") {
    return Boolean(listing.isFeatured);
  }

  return listing.category === activeCategory;
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
      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-[9px] font-sans text-[13px] leading-none transition-colors duration-200 ${
        active ? selectedPillClass : defaultPillClass
      } ${className}`}
    >
      {children}
    </button>
  );
}

function MarketplaceListingCard({ listing }: { listing: MarketplaceListingItem }) {
  return (
    <article className="group rounded-[10px] border border-[#242424] bg-[#151515] p-2.5 shadow-[0_10px_24px_rgba(0,0,0,0.24)] transition-all duration-200 hover:-translate-y-1 hover:border-[#999]">
      <UpshotLink href={listing.href} className="block rounded-[6px]">
        <div className="relative overflow-hidden rounded-[6px]">
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <div className="featured-card-hover-shimmer h-full" />
          </div>
          <img
            src={listing.image}
            alt={listing.title}
            title={listing.title}
            className="w-full rounded-[6px] bg-[#0c0c0c] shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition-transform duration-200 group-hover:scale-[1.01] group-hover:shadow-[0_14px_28px_rgba(0,0,0,0.35)]"
          />
        </div>
      </UpshotLink>

      <div className="mt-4 border-t border-[#303030] pt-4 transition-colors duration-200 group-hover:border-[#444]">
        <div className="grid gap-2">
          <button
            type="button"
            className="inline-flex h-[43px] w-full items-center justify-center rounded-full bg-[#759da8] px-3 font-sans text-[15px] font-semibold text-[#121212]"
          >
            Login to Buy
          </button>

          <div className="flex items-center justify-center gap-4 px-2 pt-1 text-center">
            <div className="font-sans text-[16px] leading-none text-[#b9b9b9]">
              Available: <span className="text-white">{listing.available}</span>
            </div>
            <div className="h-[28px] w-px bg-[#3a3a3a]" />
            <div className="font-sans text-[16px] leading-none text-[#b9b9b9]">
              Burned: <span className="text-white">{listing.burned}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function MarketplaceListTable({ listings }: { listings: MarketplaceListingItem[] }) {
  const [hoveredListingHref, setHoveredListingHref] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto rounded-[8px] border border-[#232323] bg-[#131313]">
      <div className="min-w-[760px]">
        <div className="grid grid-cols-[minmax(260px,1.35fr)_minmax(220px,1.2fr)_120px_120px] bg-[#2a2a2a] px-3 py-4 font-sans text-[16px] font-semibold text-[#89fdfc]">
          <div className="pl-[28px]">Card Name</div>
          <div>Event</div>
          <div className="-translate-x-12 text-center">Quantity</div>
          <div className="text-center">Actions</div>
        </div>

        {listings.map((listing, index) => (
          <div
            key={`${listing.href}-row-${index}`}
            className="grid grid-cols-[minmax(260px,1.35fr)_minmax(220px,1.2fr)_120px_120px] items-center border-t border-[#202020] px-3 py-5"
          >
            <UpshotLink
              href={listing.href}
              onMouseEnter={() => setHoveredListingHref(listing.href)}
              onMouseLeave={() => setHoveredListingHref((current) => (current === listing.href ? null : current))}
              onFocus={() => setHoveredListingHref(listing.href)}
              onBlur={() => setHoveredListingHref((current) => (current === listing.href ? null : current))}
              className={`flex items-center gap-4 pl-[28px] pr-6 font-sans text-[16px] font-medium leading-[1.35] transition-colors duration-200 ${
                hoveredListingHref === listing.href ? "text-[#89fdfc]" : "text-[#f0f0f0] hover:text-[#89fdfc]"
              }`}
            >
              <img
                src={listing.image}
                alt={listing.title}
                className={`h-[38px] w-auto shrink-0 object-contain transition-all duration-200 ${
                  hoveredListingHref === listing.href
                    ? "scale-[1.06] drop-shadow-[0_12px_20px_rgba(0,0,0,0.35)]"
                    : "drop-shadow-[0_0_0_rgba(0,0,0,0)]"
                }`}
              />
              <span>{listing.title}</span>
            </UpshotLink>

            <div
              className={`pr-6 font-sans text-[16px] leading-[1.35] transition-colors duration-200 ${
                hoveredListingHref === listing.href ? "text-white" : "text-[#b5b5b5]"
              }`}
            >
              {listing.eventTitle}
            </div>

            <div className="-translate-x-12 flex justify-center">
              <span
                className={`inline-flex font-sans text-[15px] font-semibold transition-colors duration-200 ${
                  hoveredListingHref === listing.href ? "text-[#89fdfc]" : "text-[#f1f1f1]"
                }`}
              >
                {listing.available}
              </span>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                className={`inline-flex h-[38px] min-w-[78px] items-center justify-center rounded-full border px-4 font-sans text-[15px] font-semibold transition-colors duration-200 ${
                  hoveredListingHref === listing.href
                    ? "border-[#8fdcf8] bg-[#8fdcf8] text-[#111111]"
                    : "border-[#5f96a1] bg-[#1b2628] text-white hover:border-[#8fdcf8] hover:bg-[#8fdcf8] hover:text-[#111111]"
                }`}
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MarketplaceBrowser({ listings }: { listings: MarketplaceListingItem[] }) {
  const [browseMode, setBrowseMode] = useState<MarketplaceBrowseMode>("all-cards");
  const [activeRarity, setActiveRarity] = useState<RarityFilterValue>("all");
  const [activeEventType, setActiveEventType] = useState<EventTypeFilterValue>("all");
  const [activeCategory, setActiveCategory] = useState<CategoryFilterValue>("all");
  const [query, setQuery] = useState("");
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);
  const [viewMode, setViewMode] = useState<MarketplaceViewMode>("grid");
  const [activeSort, setActiveSort] = useState<MarketplaceSortValue>("ending-soonest");
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement | null>(null);

  const listingOrder = new Map(listings.map((listing, index) => [listing.href, index]));

  useEffect(() => {
    if (!isSortMenuOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!sortMenuRef.current?.contains(event.target as Node)) {
        setIsSortMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isSortMenuOpen]);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleListings = listings.filter((listing) => {
    const matchesQuery = normalizedQuery
      ? `${listing.title} ${listing.eventTitle} ${listing.category} ${listing.rarity} ${listing.eventType}`.toLowerCase().includes(normalizedQuery)
      : true;

    return (
      matchesQuery &&
      matchesRarity(listing, activeRarity) &&
      matchesEventType(listing, activeEventType) &&
      matchesCategory(listing, activeCategory)
    );
  });

  const filteredListings = [...visibleListings].sort((left, right) => {
    if (activeSort === "name-asc") {
      return (
        left.title.localeCompare(right.title) ||
        left.eventTitle.localeCompare(right.eventTitle) ||
        (listingOrder.get(left.href) ?? 0) - (listingOrder.get(right.href) ?? 0)
      );
    }

    const direction = activeSort === "ending-latest" ? -1 : 1;

    if (browseMode === "by-event") {
      return (
        left.eventTitle.localeCompare(right.eventTitle) ||
        direction * ((listingOrder.get(left.href) ?? 0) - (listingOrder.get(right.href) ?? 0)) ||
        left.title.localeCompare(right.title)
      );
    }

    return (
      direction * ((listingOrder.get(left.href) ?? 0) - (listingOrder.get(right.href) ?? 0)) ||
      left.title.localeCompare(right.title)
    );
  });

  const activeSortLabel =
    marketplaceSortOptions.find((option) => option.value === activeSort)?.label ?? "Ending Soonest";

  return (
    <div>
      <div className="relative z-20 rounded-full border border-[#2b2b2b] bg-[#131313] px-5 py-2.5 md:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setBrowseMode("all-cards")}
              className={`inline-flex h-[44px] items-center rounded-full border px-6 font-sans text-[13px] leading-none transition-colors duration-200 ${
                browseMode === "all-cards" ? selectedPillClass : defaultPillClass
              }`}
            >
              All Cards
            </button>
            <button
              type="button"
              onClick={() => setBrowseMode("by-event")}
              className={`inline-flex h-[44px] items-center rounded-full border px-6 font-sans text-[13px] leading-none transition-colors duration-200 ${
                browseMode === "by-event" ? selectedPillClass : defaultPillClass
              }`}
            >
              By Event
            </button>
          </div>

          <label className="relative inline-flex h-[44px] min-w-[320px] flex-1 items-center rounded-full border border-[#2e2e2e] bg-[#171717] pl-7 pr-14 transition-colors duration-200 hover:border-[#5f96a1] hover:bg-[#1b2628] focus-within:border-[#5f96a1] focus-within:bg-[#1b2628]">
            <Search className="pointer-events-none absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8d8d8d]" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search cards..."
              className="w-full bg-transparent pl-7 font-sans text-[13px] text-[#d7d7d7] outline-none placeholder:text-[#8d8d8d]"
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

          <div ref={sortMenuRef} className="relative shrink-0">
            <button
              type="button"
              aria-expanded={isSortMenuOpen}
              onClick={() => setIsSortMenuOpen((current) => !current)}
              className={`inline-flex h-[44px] shrink-0 items-center gap-3 rounded-full border px-6 font-sans text-[13px] leading-none transition-colors duration-200 ${
                isSortMenuOpen
                  ? "border-[#8ec6ff] bg-[#1a1a1a] text-white shadow-[0_0_0_1px_rgba(142,198,255,0.25)]"
                  : defaultPillClass
              }`}
            >
              <span>{activeSortLabel}</span>
              <svg
                viewBox="0 0 20 20"
                className={`h-3.5 w-3.5 text-current transition-transform duration-200 ${
                  isSortMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                aria-hidden="true"
              >
                <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {isSortMenuOpen ? (
              <div className="absolute left-0 top-[calc(100%+12px)] z-40 min-w-[208px] overflow-hidden rounded-[16px] border border-[#2f2f2f] bg-[#1a1a1a] shadow-[0_18px_32px_rgba(0,0,0,0.44)]">
                {marketplaceSortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setActiveSort(option.value);
                      setIsSortMenuOpen(false);
                    }}
                    className={`flex w-full items-center px-6 py-4 text-left font-sans text-[13px] font-medium transition-colors duration-200 ${
                      activeSort === option.value
                        ? "bg-[#242424] text-[#89fdfc]"
                        : "text-[#949494] hover:bg-[#202020] hover:text-white"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => setIsFiltersVisible((current) => !current)}
            className={`inline-flex h-[44px] shrink-0 items-center gap-3 rounded-full border px-6 font-sans text-[13px] leading-none transition-colors duration-200 ${
              isFiltersVisible ? selectedPillClass : defaultPillClass
            }`}
          >
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-current" fill="none" aria-hidden="true">
              <path
                d="M3.5 4.5h13l-5.2 6.067V15.5l-2.6-1.3v-3.633L3.5 4.5Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Filter</span>
          </button>

          <button
            type="button"
            aria-label="Grid view"
            onClick={() => setViewMode("grid")}
            className={`inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
              viewMode === "grid" ? "border-[#5f96a1] bg-[#1b2628] text-white" : defaultPillClass
            }`}
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M3 3h6v6H3V3Zm8 0h6v6h-6V3ZM3 11h6v6H3v-6Zm8 0h6v6h-6v-6Z" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="List view"
            onClick={() => setViewMode("list")}
            className={`inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
              viewMode === "list" ? "border-[#5f96a1] bg-[#1b2628] text-white" : defaultPillClass
            }`}
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M4 5h3v3H4V5Zm5 0h7v1.8H9V5Zm0 8.2h7V15H9v-1.8ZM4 12h3v3H4v-3Z" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`mt-6 grid gap-5 lg:items-start lg:gap-6 ${
          isFiltersVisible
            ? "lg:grid-cols-[minmax(250px,0.9fr)_minmax(0,3.1fr)] xl:grid-cols-[274px_minmax(0,1fr)]"
            : "lg:grid-cols-1"
        }`}
      >
        <aside
          className={`w-full rounded-[8px] border border-[#2a2a2a] bg-[#1a1a1a] p-5 lg:sticky lg:top-[108px] ${
            isFiltersVisible ? "block" : "hidden"
          }`}
        >
          <div className="font-sans text-[13px] font-semibold uppercase tracking-[0.04em] text-[#efefef]">Filters</div>

          <div className="mt-10">
            <div className="font-sans text-[12px] font-semibold uppercase tracking-[0.03em] text-[#efefef]">Rarity</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {rarityFilters.map((filter) => (
                <FilterPill
                  key={filter.value}
                  active={activeRarity === filter.value}
                  onClick={() => setActiveRarity((current) => (current === filter.value ? "all" : filter.value))}
                >
                  <span>{filter.label}</span>
                </FilterPill>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="font-sans text-[12px] font-semibold uppercase tracking-[0.03em] text-[#efefef]">
              Event Type
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
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

          <div className="mt-8">
            <div className="font-sans text-[12px] font-semibold uppercase tracking-[0.03em] text-[#efefef]">Categories</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {categoryFilters.map((filter) => (
                <FilterPill
                  key={filter}
                  active={activeCategory === filter}
                  onClick={() => setActiveCategory((current) => (current === filter ? "all" : filter))}
                >
                  <span>{filter}</span>
                </FilterPill>
              ))}
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          {filteredListings.length ? (
            viewMode === "list" ? (
              <MarketplaceListTable listings={filteredListings} />
            ) : (
              <div
                className={`grid gap-x-4 gap-y-5 md:gap-x-5 md:gap-y-6 xl:gap-x-6 xl:gap-y-7 ${
                  isFiltersVisible ? "grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" : "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                }`}
              >
                {filteredListings.map((listing, index) => (
                  <MarketplaceListingCard key={`${listing.title}-${index}-${listing.href}`} listing={listing} />
                ))}
              </div>
            )
          ) : (
            <div className="rounded-[8px] border border-[#2a2a2a] bg-[#101010] px-5 py-6 font-sans text-[14px] leading-6 text-[#a6a6a6]">
              No marketplace cards match that filter yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
