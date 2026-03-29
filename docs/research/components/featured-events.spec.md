# Featured Events

## Desktop Reference
- Screenshot: `docs/design-references/03-featured-events.png`
- Section box: top `1623px`, height `450px`

## Structure
- Header row with left title and right "See all events" link
- Horizontal slider of oversized event cards
- First visible card is fully shown; the next card peeks in from the right edge

## Event Card Anatomy
- Shell: `#111` background, `#333` border, `8px` radius
- Left column: square event cover, category badge, uppercase title, status pill, CTA
- Right column: two vertical rails of smaller prediction-card thumbnails

## Local Assets
- Main covers:
  - `public/images/events/japan-f1-event.png`
  - `public/images/events/ncaa-event.png`
- Thumbnail strips:
  - `public/images/events/japan-f1-card-1.png` through `japan-f1-card-4.png`
  - `public/images/events/ncaa-card-1.png`
  - `public/images/events/ncaa-card-2.png`
- Category badge:
  - `public/images/categories/sports.svg`

## Typography
- Section title: `goodHeadlineBold`, `28px`
- Event title: `goodHeadlineMedium`, `24px`, uppercase
- CTA: `goodHeadlineMedium`, `16px`

## Behavior
- Section is horizontally scrollable
- CTA buttons use the cyan gradient fill
- No active autoplay was observed in the thumbnail rails during capture; the baseline keeps them static

## Responsive Notes
- Mobile collapses each event card into a stacked layout with the thumbnail collage below the text block
