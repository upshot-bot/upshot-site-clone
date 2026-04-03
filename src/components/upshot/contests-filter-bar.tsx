"use client";

export const contestFilters = ["All", "Live", "Open", "Completed"] as const;

export type ContestFilterLabel = (typeof contestFilters)[number];

export function ContestsFilterBar({
  activeFilter,
  onChange,
}: {
  activeFilter: ContestFilterLabel;
  onChange: (nextFilter: ContestFilterLabel) => void;
}) {

  return (
    <div className="rounded-full border border-[#2b2b2b] bg-[#131313] px-5 py-2.5 md:px-6">
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
    </div>
  );
}
