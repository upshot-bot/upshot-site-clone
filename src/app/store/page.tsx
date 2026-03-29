import {
  UpshotLink,
  UpshotPageFrame,
  primaryButtonClass,
} from "@/components/upshot/upshot-shell";
import { bonusCardOdds, goldCards, storePacks } from "@/lib/upshot-data";
import type { GoldCard as GoldCardType } from "@/types/upshot";

function PackCard({
  pack,
}: {
  pack: (typeof storePacks)[number];
}) {
  const isMostPopular = pack.badge === "Most Popular";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[16px] border border-[#333] bg-[#111] transition-all hover:border-[#555]">
      {/* Badge */}
      {isMostPopular && (
        <div className="absolute left-4 top-4 z-10">
          <div className="rounded-full bg-linear-to-r from-[#ffc439] to-[#ff7c33] px-3 py-1 font-good-headline-medium text-[12px] leading-5 text-black">
            {pack.badge}
          </div>
        </div>
      )}

      {/* Pack Image Area */}
      <div className="relative flex aspect-[3/4] items-center justify-center bg-[#0a0a0a] p-6">
        {/* Glow effect */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at center, ${pack.accentFrom}40 0%, transparent 70%)`,
          }}
        />

        {/* Pack placeholder - in real app this would be pack.image */}
        <div
          className="relative flex h-[200px] w-[140px] flex-col items-center justify-center rounded-[12px] border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-4 shadow-xl"
          style={{
            boxShadow: `0 20px 60px -20px ${pack.accentFrom}50`,
          }}
        >
          <div
            className="mb-3 h-[80px] w-[60px] rounded-lg"
            style={{
              background: `linear-gradient(135deg, ${pack.accentFrom}, ${pack.accentTo})`,
            }}
          />
          <span className="font-good-headline-medium text-[14px] text-white">
            {pack.title}
          </span>
          <span className="mt-1 font-sans text-[11px] text-white/50">
            {pack.revealCount}
          </span>
        </div>
      </div>

      {/* Pack Info */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <span
            className="rounded-full px-2 py-0.5 font-sans text-[11px] font-medium leading-5"
            style={{
              background: `linear-gradient(135deg, ${pack.accentFrom}20, ${pack.accentTo}20)`,
              color: pack.accentFrom,
            }}
          >
            {pack.badge}
          </span>
        </div>

        <h3 className="mt-3 font-good-headline-bold text-[20px] leading-6 text-white">
          {pack.title}
        </h3>

        <p className="mt-2 line-clamp-2 font-sans text-[14px] leading-5 text-[#999]">
          {pack.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex items-baseline gap-1">
            <span className="font-good-headline-bold text-[28px] leading-[1.1] text-white">
              {pack.price}
            </span>
          </div>

          <UpshotLink
            href={pack.href}
            className="rounded-full bg-white px-5 py-2.5 font-good-headline-medium text-[15px] leading-6 text-black transition-transform hover:scale-[1.02]"
          >
            Open Pack
          </UpshotLink>
        </div>
      </div>
    </div>
  );
}

function GoldCardItem({ card }: { card: GoldCardType }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[120px] overflow-hidden rounded-[8px] border border-[#ffc439]/30 bg-gradient-to-b from-[#2a2400] to-[#1a1700]">
        <div className="aspect-[3/4] w-full">
          {/* Placeholder for card image */}
          <div className="flex h-full w-full items-center justify-center bg-[#1a1700]">
            <span className="font-good-headline-medium text-[12px] text-[#ffc439]">
              {card.title}
            </span>
          </div>
        </div>
        {/* Gold corner accent */}
        <div className="absolute inset-0 border border-[#ffc439]/20" />
      </div>
      <div className="mt-3 text-center">
        <div className="font-good-headline-medium text-[14px] text-white">
          {card.title}
        </div>
        <div className="font-sans text-[12px] text-[#ffc439]">{card.chance} chance</div>
      </div>
    </div>
  );
}

function BonusCardOddsItem({ odd }: { odd: (typeof bonusCardOdds)[number] }) {
  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-white/10" style={{ background: `${odd.color}15` }}>
        <span className="font-good-headline-bold text-[20px] text-white">{odd.percentage}</span>
      </div>
      <div className="mt-3 font-good-headline-medium text-[14px] text-white">{odd.label}</div>
    </div>
  );
}

export default function StorePage() {
  return (
    <UpshotPageFrame>
      <div className="mx-auto w-full max-w-[1440px] px-4 py-8 md:px-8 md:py-12">
        {/* Page Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="font-good-headline-bold text-[36px] leading-[1.1] text-white md:text-[48px]">
            Mystery Packs
          </h1>
          <p className="mt-3 max-w-[600px] font-sans text-[16px] leading-6 text-[#999] md:text-[18px]">
            Open packs to reveal prediction cards. Each card is your ticket to winning cash prizes if your prediction comes true!
          </p>
        </div>

        {/* Pack Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {storePacks.map((pack) => (
            <PackCard key={pack.title} pack={pack} />
          ))}
        </div>

        {/* What's Inside a Pack Section */}
        <div className="mt-16 md:mt-24">
          <h2 className="font-good-headline-bold text-[28px] leading-[1.2] text-white md:text-[40px]">
            What&apos;s Inside a Pack?
          </h2>

          <div className="mt-8 rounded-[16px] border border-[#333] bg-[#111] p-6 md:p-10">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              {/* Gold Cards */}
              <div>
                <h3 className="font-good-headline-bold text-[22px] leading-[1.2] text-white">
                  🥇 Gold Cards (4 Per Pack)
                </h3>
                <p className="mt-2 font-sans text-[15px] leading-6 text-[#999]">
                  Gold cards can be used to enter contests and win prizes. Each pack contains 4 gold cards from various events.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  {goldCards.map((card) => (
                    <GoldCardItem key={card.title} card={card} />
                  ))}
                </div>
              </div>

              {/* Bonus Card */}
              <div>
                <h3 className="font-good-headline-bold text-[22px] leading-[1.2] text-white">
                  🎁 Bonus Card (1 Per Pack)
                </h3>
                <p className="mt-2 font-sans text-[15px] leading-6 text-[#999]">
                  The Bonus Card is where extra excitement lives. Every pack includes one bonus card with a chance to win!
                </p>

                <div className="mt-6 flex justify-around">
                  {bonusCardOdds.map((odd) => (
                    <BonusCardOddsItem key={odd.label} odd={odd} />
                  ))}
                </div>

                <div className="mt-8 rounded-[8px] bg-[#1a1a1a] p-4">
                  <div className="font-sans text-[13px] leading-5 text-[#999]">
                    <span className="text-white">Example:</span> If you pull a &quot;Cash&quot; bonus card, you could win a share of the prize pool for that event!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 flex justify-center md:mt-16">
          <UpshotLink href="/claim" className={primaryButtonClass}>
            Claim Your Free Card
          </UpshotLink>
        </div>
      </div>
    </UpshotPageFrame>
  );
}
