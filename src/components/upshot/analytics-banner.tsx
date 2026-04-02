"use client";

import { BetaIcon } from "@/components/icons";

export function AnalyticsBanner() {
  return (
    <div className="fixed bottom-3 right-3 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-[#121212f2] px-3 py-2 text-white/80 shadow-[0_10px_24px_rgba(0,0,0,0.35)] backdrop-blur-[10px]">
      <BetaIcon className="h-4 w-4" />
      <span className="font-sans text-[12px] font-medium leading-4">Beta</span>
    </div>
  );
}
