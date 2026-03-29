export interface NavLink {
  href: string;
  label: string;
}

export interface HeroAction {
  href: string;
  label: string;
  variant: "primary" | "secondary";
}

export interface HowToStep {
  description: string;
  descriptionLinkHref?: string;
  descriptionLinkLabel?: string;
  descriptionSuffix?: string;
  href?: string;
  mediaSrc: string;
  title: string;
}

export interface EventItem {
  category: string;
  categoryIcon: string;
  heroImage: string;
  href: string;
  statusLabel: string;
  thumbnails: string[];
  title: string;
}

export interface ContestCategory {
  icon: string;
  label: string;
}

export interface ContestItem {
  cardsRequired: number;
  categories: ContestCategory[];
  ctaLabel: string;
  endsIn: string;
  href: string;
  lineupLockLabel: string;
  lineupLockNote: string;
  lineupLockValue: string;
  poster: string;
  prizePool: string;
  resolutionLabel: string;
  resolutionNote: string;
  resolutionValue: string;
  title: string;
}

export interface FeaturedCardItem {
  burned: number;
  claimed: number;
  href: string;
  image: string;
  supply: number;
  title: string;
}

export interface StorePackItem {
  accentFrom: string;
  accentTo: string;
  badge: string;
  description: string;
  href: string;
  includedCardIndexes: number[];
  price: string;
  previewCardIndexes: number[];
  revealCount: string;
  title: string;
}

export interface GoldCard {
  title: string;
  image: string;
  chance: string;
}

export interface BonusCardOdd {
  label: string;
  percentage: string;
  color: string;
}
