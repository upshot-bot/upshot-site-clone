import {
  UpshotLink,
  UpshotPageFrame,
} from "@/components/upshot/upshot-shell";
import { storePacks } from "@/lib/upshot-data";

function PackCard({
  pack,
}: {
  pack: (typeof storePacks)[number];
}) {
  // Badge color mapping
  const badgeColors: Record<string, { bg: string; text: string }> = {
    Starter: { bg: "bg-gradient-to-r from-[#89fdfc] to-[#5ea9ff]", text: "text-black" },
    Sports: { bg: "bg-gradient-to-r from-[#ffc439] to-[#ff7c33]", text: "text-black" },
    Markets: { bg: "bg-gradient-to-r from-[#b28cff] to-[#ff6fa8]", text: "text-white" },
    Premium: { bg: "bg-gradient-to-r from-[#78f08d] to-[#17b67a]", text: "text-black" },
  };
  
  const badge = badgeColors[pack.badge] || badgeColors.Starter;

  return (
    <div className="group relative flex w-[280px] shrink-0 flex-col rounded-[10px] border border-white/[0.08] bg-[#111] transition-all hover:border-white/[0.18]">
      {/* Badge - top left */}
      <div className="absolute left-3 top-3 z-10">
        <span className={`rounded-full px-2.5 py-1 font-good-headline-medium text-[11px] leading-5 ${badge.bg} ${badge.text}`}>
          {pack.badge}
        </span>
      </div>

      {/* Pack Image - sealed pack visual */}
      <div className="relative flex h-[180px] items-center justify-center bg-[#080808]">
        {/* Glow */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            background: `radial-gradient(circle at 50% 60%, ${pack.accentFrom} 0%, transparent 60%)`,
          }}
        />
        
        {/* Sealed Pack - rectangular with seal */}
        <div className="relative h-[90px] w-[130px]">
          {/* Pack body */}
          <div 
            className="absolute inset-0 rounded-md"
            style={{
              background: `linear-gradient(135deg, ${pack.accentFrom}, ${pack.accentTo})`,
              boxShadow: `0 8px 32px -8px ${pack.accentFrom}80`,
            }}
          />
          {/* Pack seal/icon area */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[30px] w-[30px] rounded-full border-2 border-white/30 flex items-center justify-center">
              <span className="font-good-headline-bold text-[18px] text-white/70">?</span>
            </div>
          </div>
          {/* Pack edge highlight */}
          <div className="absolute inset-0 rounded-md border border-white/10" />
        </div>
      </div>

      {/* Pack Details */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-good-headline-bold text-[17px] leading-6 text-white">
          {pack.title}
        </h3>

        <p className="mt-1.5 line-clamp-2 font-sans text-[12px] leading-5 text-[#777]">
          {pack.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-baseline">
            <span className="font-good-headline-bold text-[22px] leading-[1.1] text-white">
              {pack.price}
            </span>
          </div>

          <UpshotLink
            href={pack.href}
            className="rounded-full bg-white px-4 py-2 font-good-headline-medium text-[13px] leading-5 text-black transition-transform hover:scale-[1.02]"
          >
            Open Pack
          </UpshotLink>
        </div>
      </div>
    </div>
  );
}

export default function StorePage() {
  return (
    <UpshotPageFrame>
      <div className="mx-auto w-full max-w-[1440px] px-4 py-8 md:px-8 md:py-10">
        {/* Page Header */}
        <div className="mb-8 md:mb-10">
          <h1 className="font-good-headline-bold text-[32px] leading-[1.1] text-white md:text-[44px]">
            Mystery Packs
          </h1>
          <p className="mt-2 max-w-[640px] font-sans text-[15px] leading-6 text-[#888] md:text-[16px]">
            Rip a Pack, Win the Future. Open a pack and reveal prediction cards tied to real-world events in Sports, Internet Culture and Beyond!
          </p>
        </div>

        {/* Pack Row - horizontal scroll on mobile */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide md:flex md:flex-wrap md:justify-center md:gap-5 md:overflow-visible">
          {storePacks.map((pack) => (
            <PackCard key={pack.title} pack={pack} />
          ))}
        </div>

        {/* Free Card Link */}
        <div className="mt-10 flex items-center justify-center md:mt-12">
          <UpshotLink 
            href="/claim" 
            className="font-good-headline-medium text-[14px] text-white underline underline-offset-4 transition-colors hover:text-[#89fdfc]"
          >
            Claim your free daily card
          </UpshotLink>
        </div>
      </div>
    </UpshotPageFrame>
  );
}
