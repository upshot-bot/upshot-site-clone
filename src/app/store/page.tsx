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
  const badgeColors: Record<string, { bg: string; text: string }> = {
    Starter: { bg: "from-[#89fdfc] to-[#5ea9ff]", text: "#111" },
    Sports: { bg: "from-[#ffc439] to-[#ff7c33]", text: "#111" },
    Markets: { bg: "from-[#b28cff] to-[#ff6fa8]", text: "#111" },
    Premium: { bg: "from-[#78f08d] to-[#17b67a]", text: "#111" },
  };
  
  const badge = badgeColors[pack.badge] || badgeColors.Starter;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[12px] border border-white/8 bg-[#111] transition-all hover:border-white/20">
      {/* Badge */}
      <div className="absolute left-3 top-3 z-10">
        <div className={`rounded-full bg-linear-to-r ${badge.bg} px-2.5 py-1 font-good-headline-medium text-[11px] leading-5 ${pack.badge === "Sports" || pack.badge === "Starter" || pack.badge === "Premium" ? "text-black" : "text-white"}`}>
          {pack.badge}
        </div>
      </div>

      {/* Pack Image Area */}
      <div className="relative flex aspect-[3/4] items-center justify-center bg-[#0a0a0a]">
        {/* Glow effect */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(ellipse at center, ${pack.accentFrom}30 0%, transparent 70%)`,
          }}
        />

        {/* Pack visualization */}
        <div
          className="relative flex flex-col items-center justify-center rounded-[10px] border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] p-4 shadow-2xl"
          style={{
            boxShadow: `0 16px 48px -16px ${pack.accentFrom}60`,
          }}
        >
          {/* Card stack effect */}
          <div className="relative h-[100px] w-[70px]">
            {/* Background cards */}
            <div 
              className="absolute left-0 top-2 h-full w-full rounded-lg border border-white/10 bg-gradient-to-br"
              style={{ 
                background: `linear-gradient(135deg, ${pack.accentFrom}15, ${pack.accentTo}15)`,
                transform: "translateX(-4px) rotate(-6deg)" 
              }}
            />
            <div 
              className="absolute left-0 top-2 h-full w-full rounded-lg border border-white/10 bg-gradient-to-br"
              style={{ 
                background: `linear-gradient(135deg, ${pack.accentFrom}20, ${pack.accentTo}20)`,
                transform: "translateX(2px) rotate(4deg)" 
              }}
            />
            {/* Front card */}
            <div 
              className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-lg border border-white/20 bg-gradient-to-br"
              style={{ 
                background: `linear-gradient(135deg, ${pack.accentFrom}, ${pack.accentTo})`,
              }}
            >
              <span className="font-good-headline-bold text-[24px] text-white/90">?</span>
            </div>
          </div>
          
          <span className="mt-4 font-good-headline-medium text-[13px] text-white/70">
            {pack.revealCount}
          </span>
        </div>
      </div>

      {/* Pack Info */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-good-headline-bold text-[18px] leading-6 text-white">
          {pack.title}
        </h3>

        <p className="mt-2 line-clamp-2 font-sans text-[13px] leading-5 text-[#888]">
          {pack.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-baseline gap-0.5">
            <span className="font-good-headline-bold text-[24px] leading-[1.1] text-white">
              {pack.price}
            </span>
          </div>

          <UpshotLink
            href={pack.href}
            className="rounded-full bg-white px-4 py-2 font-good-headline-medium text-[14px] leading-5 text-black transition-transform hover:scale-[1.02]"
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
          <p className="mt-2 max-w-[600px] font-sans text-[15px] leading-6 text-[#888] md:text-[16px]">
            Rip a Pack, Win the Future. Open a pack and reveal prediction cards tied to real-world events.
          </p>
        </div>

        {/* Pack Grid - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {storePacks.map((pack) => (
            <PackCard key={pack.title} pack={pack} />
          ))}
        </div>

        {/* Free Card CTA */}
        <div className="mt-10 flex items-center justify-center md:mt-12">
          <UpshotLink 
            href="/claim" 
            className="font-good-headline-medium text-[15px] text-white underline underline-offset-4 transition-colors hover:text-[#89fdfc]"
          >
            Claim your free daily card
          </UpshotLink>
        </div>
      </div>
    </UpshotPageFrame>
  );
}
