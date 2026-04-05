"use client";

import { useState } from "react";

import { ContestBoard } from "@/components/upshot/contest-board";
import { ContestsFilterBar, type ContestFilterLabel } from "@/components/upshot/contests-filter-bar";
import type { ContestItem, ContestStatus } from "@/types/upshot";

const filterToStatus: Record<Exclude<ContestFilterLabel, "All">, ContestStatus> = {
  Completed: "completed",
  Live: "live",
  Open: "open",
};

function matchesFilter(contest: ContestItem, activeFilter: ContestFilterLabel) {
  if (activeFilter === "All") {
    return true;
  }

  return contest.status === filterToStatus[activeFilter];
}

export function ContestsBrowser({ contests }: { contests: ContestItem[] }) {
  const [activeFilter, setActiveFilter] = useState<ContestFilterLabel>("All");
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const filteredContests = contests.filter((contest) => {
    const matchesQuery = normalizedQuery
      ? `${contest.title} ${contest.categories.map((category) => category.label).join(" ")} ${contest.prizePool}`.toLowerCase().includes(normalizedQuery)
      : true;

    return matchesQuery && matchesFilter(contest, activeFilter);
  });

  return (
    <>
      <ContestsFilterBar
        activeFilter={activeFilter}
        onChange={setActiveFilter}
        query={query}
        onQueryChange={setQuery}
      />

      {filteredContests.length ? (
        <div className="mt-10 grid gap-4">
          {filteredContests.map((contest) => (
            <ContestBoard key={contest.href} contest={contest} interactive />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-[12px] border border-[#2d2d2d] bg-[#111] p-6 font-sans text-[15px] leading-7 text-[#bfbfbf]">
          No contests match the current filter yet.
        </div>
      )}
    </>
  );
}
