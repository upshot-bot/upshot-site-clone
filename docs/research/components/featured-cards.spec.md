# Featured Cards

## Desktop Reference
- Screenshot: `docs/design-references/05-featured-cards.png`
- Section box: top `3382px`, height `1158px`

## Structure
- Title row with "See all cards" link
- Four-column desktop grid
- Each cell combines a prediction-card art image with a dark supply footer

## Card Anatomy
- Shell: `#1b1b1b` background, `#333` border, `8px` radius
- Image region includes a subtle glow layer behind the card art
- Footer uses three equal columns: Supply, Claimed, Burned
- Labels are Inter in muted gray; values use the headline font

## Local Assets
- Glow layer: `public/images/skill-glow.svg`
- Card art:
  - `public/images/cards/featured-1.png` through `featured-8.png`

## Behavior
- Cards are static links in the baseline clone
- Hover interaction was not required for the captured baseline

## Responsive Notes
- Mobile uses a two-column grid while preserving the same image-plus-stats structure
