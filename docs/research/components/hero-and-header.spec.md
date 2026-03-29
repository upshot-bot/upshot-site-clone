# Hero And Header

## Desktop Reference
- Screenshot: `docs/design-references/01-open-mystery-packs-reveal-prediction-cards-win-cash-prizes.png`
- Section box: top `73px`, width `1440px`, height `818px`
- Header overlay: fixed, transparent, height `84px`, z-index `1000`

## Typography
- Hero headline: `goodHeadlineBold`, `56px`, white with cyan emphasis on the last line
- Nav labels: `goodHeadlineMedium`, ~`13px` to `16px`
- CTA buttons: `goodHeadlineMedium`, `16px` to `18px`

## Key Assets
- Logo: `public/images/upshot-logo-bw.svg`
- Hero stars: `public/images/carousel-stars.svg`
- Shooting star accent: `public/images/shooting-star.svg`
- Card stack: `public/images/hero/tile-1.png`, `tile-2.png`, `tile-3.png`

## Layout Notes
- Header keeps the logo left, nav centered-left, auth controls right
- Desktop hero is a two-column composition: copy block left, stacked cards right
- Card stack uses strong shadows, one centered dominant card, two rotated cards behind
- Body background is `#050505`

## Behavior
- Header stays fixed while the page scrolls
- CTA and nav items only use simple hover color changes
- No hero carousel motion observed in the captured state

## Responsive Notes
- Mobile compresses the header controls and collapses the nav links
- Hero content becomes a vertical stack with the card composition scaled down
