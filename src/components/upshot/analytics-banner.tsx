"use client";

import Link from "next/link";
import { useState } from "react";

import { CloseIcon } from "@/components/icons";

export function AnalyticsBanner() {
  const [hidden, setHidden] = useState(false);

  if (hidden) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 ml-auto w-auto max-w-[420px] rounded-[16px] border border-[#2d2d2d] bg-[#111111f2] p-6 text-[#f3f3f3] shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur-[12px] md:left-auto">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-good-headline-regular text-[20px] leading-6 text-[#f3f3f3]">Analytics Preferences</h3>
        <button
          type="button"
          aria-label="Close analytics preferences"
          onClick={() => setHidden(true)}
          className="flex h-6 w-6 items-center justify-center text-white/70 transition-colors hover:text-white"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>

      <p className="mt-4 font-sans text-[14px] leading-7 text-[#d4d4d4]">
        By clicking &quot;Accept&quot;, you agree to the storing of cookies on your device to enhance site navigation,
        analyze site usage, and assist in our marketing efforts.{" "}
        <Link href="/privacy" className="underline underline-offset-4 transition-colors hover:text-white">
          View our Privacy Policy
        </Link>{" "}
        for more information.
      </p>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => setHidden(true)}
          className="rounded-full bg-[#5a5a5a] px-5 py-2 font-good-headline-medium text-[16px] leading-6 text-white transition-colors hover:bg-[#696969]"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => setHidden(true)}
          className="rounded-full bg-linear-to-r from-[#89fdfc] to-[#96e3ff] px-5 py-2 font-good-headline-medium text-[16px] leading-6 text-[#111]"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
