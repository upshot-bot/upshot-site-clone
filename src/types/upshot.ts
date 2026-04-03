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
  badgeLabel?: string;
  category: string;
  categoryIcon: string;
  heroImage: string;
  href: string;
  isFeatured?: boolean;
  resolutionDate?: string;
  statusLabel: string;
  thumbnails: string[];
  title: string;
}

export interface ContestCategory {
  icon: string;
  label: string;
}

export type ContestStatus = "live" | "open" | "completed";

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
  status: ContestStatus;
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

export interface MarketplaceListingItem {
  available: number;
  buttonLabel: string;
  burned: number;
  editionLabel: string;
  href: string;
  image: string;
  price: string;
  priceSuffix: string;
  title: string;
}

export interface StorePackItem {
  buttonLabel: string;
  description: string;
  href: string;
  imageAlt: string;
  imageSrc: string;
  includedCardIndexes: number[];
  isSoldOut: boolean;
  price: string;
  priceSuffix: string;
  revealCount: string;
  statusLabel: string;
  title: string;
}
