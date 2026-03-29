import type {
  BonusCardOdd,
  ContestItem,
  EventItem,
  FeaturedCardItem,
  GoldCard,
  HeroAction,
  HowToStep,
  NavLink,
  StorePackItem,
} from "@/types/upshot";

export const navLinks: NavLink[] = [
  { href: "/store", label: "Store" },
  { href: "/contests", label: "Contests" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/events", label: "Events" },
  { href: "/leaderboard", label: "Leaderboard" },
];

export const heroActions: HeroAction[] = [
  { href: "/claim", label: "Claim your free card", variant: "primary" },
  { href: "/store", label: "Buy a pack", variant: "secondary" },
];

export const howToSteps: HowToStep[] = [
  {
    description: "Buy a pack",
    descriptionLinkHref: "/store",
    descriptionLinkLabel: "Buy a pack",
    descriptionSuffix: " and open it to reveal prediction cards.",
    href: "/store",
    mediaSrc: "/videos/onboard/open-mystery-packs-compressed.mp4",
    title: "Open Mystery Packs",
  },
  {
    description: "Each card comes with a prediction, prize and resolution date.",
    mediaSrc: "/videos/onboard/each-card-is-a-prediction-compressed.mp4",
    title: "Each Card is a Prediction",
  },
  {
    description: "If your card comes true, you win cash / prizes from Cards & Monthly Payouts.",
    mediaSrc: "/videos/onboard/win-cash-prizes-compressed.mp4",
    title: "Win Cash Prizes",
  },
  {
    description: "Login daily to claim a Free Gift. Collect streaks for more Gifts!",
    mediaSrc: "/videos/onboard/daily-free-gifts-compressed.mp4",
    title: "Daily Free Gifts",
  },
  {
    description: "Build card lineups and compete against other players to win cash!",
    mediaSrc: "/videos/onboard/join-contests-compressed.mp4",
    title: "Join Contests",
  },
  {
    description: "Start with a pack or claim a free card to see how predictions work.",
    mediaSrc: "/videos/onboard/open-pack-now-compressed.mp4",
    title: "Open Your First Pack Now!",
  },
];

export const featuredEvents: EventItem[] = [
  {
    category: "Sports",
    categoryIcon: "/images/categories/sports.svg",
    heroImage: "/images/events/japan-f1-event.png",
    href: "/event/cmmu4p2w7cf1q2imurbvldwva",
    statusLabel: "Event has ended",
    thumbnails: [
      "/images/events/japan-f1-card-1.png",
      "/images/events/japan-f1-card-2.png",
      "/images/events/japan-f1-card-3.png",
      "/images/events/japan-f1-card-4.png",
      "/images/events/japan-f1-card-1.png",
      "/images/events/japan-f1-card-2.png",
      "/images/events/japan-f1-card-3.png",
      "/images/events/japan-f1-card-4.png",
    ],
    title: "Japan F1 GP: Fastest Qualifier (Pole Position)",
  },
  {
    category: "Sports",
    categoryIcon: "/images/categories/sports.svg",
    heroImage: "/images/events/ncaa-event.png",
    href: "/event/cmmp521pg3gol2hprd8s6orwa",
    statusLabel: "in 9 days",
    thumbnails: [
      "/images/events/ncaa-card-1.png",
      "/images/events/ncaa-card-2.png",
      "/images/events/ncaa-card-1.png",
      "/images/events/ncaa-card-2.png",
      "/images/events/ncaa-card-1.png",
      "/images/events/ncaa-card-2.png",
      "/images/events/ncaa-card-1.png",
      "/images/events/ncaa-card-2.png",
    ],
    title: "NCAA Men’s Championship Comes Down To Five Or Fewer",
  },
];

export const featuredContests: ContestItem[] = [
  {
    cardsRequired: 3,
    categories: [{ icon: "/images/categories/sports.svg", label: "Sports" }],
    ctaLabel: "Entries Closed • View Contest",
    endsIn: "37:12:09",
    href: "/contests/cmmpzlegf4ejf2imuln7ki48p",
    lineupLockLabel: "Lineup Lock",
    lineupLockNote: "Locked",
    lineupLockValue: "March 27 at 22:00 UTC",
    poster: "/images/contests/pick-3-sports-madness.png",
    prizePool: "$1,164.22",
    resolutionLabel: "Contest Complete",
    resolutionNote: "Prizes distributed",
    resolutionValue: "March 30 at 14:00 UTC",
    title: "Pick 3: Sports Madness",
  },
  {
    cardsRequired: 5,
    categories: [
      { icon: "/images/categories/entertainment.svg", label: "Entertainment" },
      { icon: "/images/categories/internet-culture.svg", label: "Internet Culture" },
      { icon: "/images/categories/gaming.svg", label: "Gaming" },
      { icon: "/images/categories/sports.svg", label: "Sports" },
    ],
    ctaLabel: "View Contest",
    endsIn: "17d",
    href: "/contests/cmmod8vdo24e52it43mivwexf",
    lineupLockLabel: "Lineup Lock",
    lineupLockNote: "Last chance to submit",
    lineupLockValue: "April 1 at 18:00 UTC",
    poster: "/images/contests/pick-5-mid-march-prime-time.png",
    prizePool: "$2,409.1",
    resolutionLabel: "Contest Complete",
    resolutionNote: "Prizes distributed",
    resolutionValue: "April 15 at 18:00 UTC",
    title: "Pick 5: Mid-March Prime Time",
  },
  {
    cardsRequired: 5,
    categories: [
      { icon: "/images/categories/finance.svg", label: "Finance" },
      { icon: "/images/categories/crypto.svg", label: "Crypto" },
      { icon: "/images/categories/politics.svg", label: "Politics" },
    ],
    ctaLabel: "Entries Closed • View Contest",
    endsIn: "3d",
    href: "/contests/cmm303m3502q92inwd2qle5u6",
    lineupLockLabel: "Lineup Lock",
    lineupLockNote: "Locked",
    lineupLockValue: "March 15 at 14:00 UTC",
    poster: "/images/contests/pick-5-march-markets-and-power.png",
    prizePool: "$4,607.46",
    resolutionLabel: "Contest Complete",
    resolutionNote: "Prizes distributed",
    resolutionValue: "April 1 at 14:00 UTC",
    title: "Pick 5: March Markets and Power",
  },
  {
    cardsRequired: 5,
    categories: [
      { icon: "/images/categories/entertainment.svg", label: "Entertainment" },
      { icon: "/images/categories/internet-culture.svg", label: "Internet Culture" },
      { icon: "/images/categories/sports.svg", label: "Sports" },
    ],
    ctaLabel: "Entries Closed • View Contest",
    endsIn: "3d",
    href: "/contests/cmm2zme9i01q92iscvgo02wtw",
    lineupLockLabel: "Lineup Lock",
    lineupLockNote: "Locked",
    lineupLockValue: "March 15 at 14:00 UTC",
    poster: "/images/contests/pick-5-march-screens-and-scoreboards.png",
    prizePool: "$4,652.63",
    resolutionLabel: "Contest Complete",
    resolutionNote: "Prizes distributed",
    resolutionValue: "April 1 at 14:00 UTC",
    title: "Pick 5: March Screens and Scoreboards",
  },
];

export const featuredCards: FeaturedCardItem[] = [
  {
    burned: 0,
    claimed: 5,
    href: "/card-detail/cmmur9r6fedjf2hpr0enuy12v",
    image: "/images/cards/featured-1.png",
    supply: 5,
    title: "Cuba Falls to Washington",
  },
  {
    burned: 0,
    claimed: 15,
    href: "/card-detail/cmmur4gd5e7zr2it4z6p2scwf",
    image: "/images/cards/featured-2.png",
    supply: 15,
    title: "Washington and Tehran Declare Ceasefire",
  },
  {
    burned: 0,
    claimed: 34,
    href: "/card-detail/cmmu3wq9ycf1e2it4x76rd4ak",
    image: "/images/cards/featured-3.png",
    supply: 40,
    title: "Racing Bulls Coldest Moment at the Japan F1 GP",
  },
  {
    burned: 0,
    claimed: 12,
    href: "/card-detail/cmn2rdqip7vce2hlcixp6bxs1",
    image: "/images/cards/featured-4.png",
    supply: 13,
    title: "Super Mario Galaxy Opening Weekend Hits High Score",
  },
  {
    burned: 0,
    claimed: 13,
    href: "/card-detail/cmn2pq9ij7qrn2hlcmpv04nhg",
    image: "/images/cards/featured-5.png",
    supply: 13,
    title: "Jannik Sinner Wins Miami Open",
  },
  {
    burned: 0,
    claimed: 18,
    href: "/card-detail/cmn2r25kx7vvo2itc2otd65dx",
    image: "/images/cards/featured-6.png",
    supply: 19,
    title: "Secret Rare from Mega Evolution - Perfect Order",
  },
  {
    burned: 0,
    claimed: 3,
    href: "/card-detail/cmn2qhnz37sq32hlc80kcw7z8",
    image: "/images/cards/featured-7.png",
    supply: 3,
    title: "Upshot Q1 Mainnet Pack Ripping Goes Full Send",
  },
  {
    burned: 0,
    claimed: 12,
    href: "/card-detail/cmn2s7nbf7yd12hlc4bpar89m",
    image: "/images/cards/featured-8.png",
    supply: 12,
    title: "X Dislike Button Rolls Out Mid Cycle",
  },
];

export const storePacks: StorePackItem[] = [
  {
    accentFrom: "#89fdfc",
    accentTo: "#96e3ff",
    badge: "Most Popular",
    description: "Open a Mystery Pack to reveal 5 prediction cards. Each card represents a unique outcome for events in Sports, Internet Culture, and Beyond!",
    href: "/store/mystery-pack",
    includedCardIndexes: [0, 1, 2, 3, 4],
    price: "$4.99",
    previewCardIndexes: [0, 1],
    revealCount: "5 cards",
    title: "Mystery Pack",
  },
  {
    accentFrom: "#ffc439",
    accentTo: "#ff7c33",
    badge: "Sports",
    description: "Get ready for NBA Draft predictions! Build your lineup and compete for cash prizes.",
    href: "/store/nba-draft-pack",
    includedCardIndexes: [0, 1, 2, 3, 4],
    price: "$4.99",
    previewCardIndexes: [2, 3],
    revealCount: "5 cards",
    title: "NBA Draft Pack",
  },
  {
    accentFrom: "#b28cff",
    accentTo: "#ff6fa8",
    badge: "Internet Culture",
    description: "Predict the latest internet moments and memes. Your cards could be worth big prizes!",
    href: "/store/internet-culture-pack",
    includedCardIndexes: [0, 1, 2, 3, 4],
    price: "$4.99",
    previewCardIndexes: [1, 4],
    revealCount: "5 cards",
    title: "Internet Culture Pack",
  },
  {
    accentFrom: "#78f08d",
    accentTo: "#17b67a",
    badge: "Gaming",
    description: "Predict gaming outcomes and win! From esports to game releases, bet on the future.",
    href: "/store/gaming-pack",
    includedCardIndexes: [0, 1, 2, 3, 4],
    price: "$4.99",
    previewCardIndexes: [2, 3],
    revealCount: "5 cards",
    title: "Gaming Pack",
  },
];

// Gold cards shown in the "What's Inside" section
export const goldCards: GoldCard[] = [
  { title: "Elon Musk", image: "/images/cards/gold-1.png", chance: "32%" },
  { title: "Mark Zuckerberg", image: "/images/cards/gold-2.png", chance: "28%" },
  { title: "Jeff Bezos", image: "/images/cards/gold-3.png", chance: "18%" },
  { title: "Sam Altman", image: "/images/cards/gold-4.png", chance: "14%" },
];

// Bonus card odds
export const bonusCardOdds: BonusCardOdd[] = [
  { label: "Cash", percentage: "65%", color: "#78f08d" },
  { label: "Instant Win", percentage: "30%", color: "#ffc439" },
  { label: "Sweepstakes", percentage: "5%", color: "#ff6fa8" },
];

export const footerLinks: NavLink[] = [
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
];

export const socialLinks = [
  { href: "https://x.com/upshot_cards", icon: "/images/social-x.svg", label: "X" },
  { href: "https://discord.com/invite/upshot", icon: "/images/social-discord.svg", label: "Discord" },
] as const;
