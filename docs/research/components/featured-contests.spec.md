# Featured Contests

## Desktop Reference
- Screenshot: `docs/design-references/04-featured-contests.png`
- Section box: top `2073px`, height `1310px`

## Structure
- Title row with "View all contests" link
- Four stacked contest rows
- Each row has three zones: poster, contest metadata, prize/timer panel

## Row Anatomy
- Shell: `#111` background, `#333` border, `8px` radius
- Poster image: square, large, left-aligned
- Title: uppercase `goodHeadlineMedium`, ~`28px`
- Metadata includes:
  - cards required
  - category icons
  - lineup lock
  - contest complete
  - ends in
  - prize pool

## Local Assets
- Posters:
  - `public/images/contests/pick-3-sports-madness.png`
  - `public/images/contests/pick-5-mid-march-prime-time.png`
  - `public/images/contests/pick-5-march-markets-and-power.png`
  - `public/images/contests/pick-5-march-screens-and-scoreboards.png`
- Category badges:
  - `public/images/categories/sports.svg`
  - `public/images/categories/entertainment.svg`
  - `public/images/categories/internet-culture.svg`
  - `public/images/categories/gaming.svg`
  - `public/images/categories/finance.svg`
  - `public/images/categories/crypto.svg`
  - `public/images/categories/politics.svg`
- Currency icon:
  - `public/images/gold.svg`

## Behavior
- Rows are static in the captured state
- CTA buttons use the cyan gradient fill
- Timer text is snapshot data for the baseline clone, not live countdown logic

## Responsive Notes
- Mobile stacks each row vertically with the stats panel below the metadata block
