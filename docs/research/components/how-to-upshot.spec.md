# How To Upshot

## Desktop Reference
- Screenshot: `docs/design-references/02-how-to-upshot.png`
- Section box: top `891px`, height `732px`

## Structure
- Outer dark panel with subtle border and rounded corners
- Title row above a horizontal card carousel
- Six cards in total, with the first three visible at desktop width

## Card Anatomy
- Card shell: `#1b1b1b` background, `#333` border, `8px` radius
- Title: `goodHeadlineBold`, `24px`
- Body copy: Inter, `16px`, `#ccc`
- Media region: autoplaying MP4 demo, object-contained

## Local Assets
- `public/videos/onboard/open-mystery-packs-compressed.mp4`
- `public/videos/onboard/each-card-is-a-prediction-compressed.mp4`
- `public/videos/onboard/win-cash-prizes-compressed.mp4`
- `public/videos/onboard/daily-free-gifts-compressed.mp4`
- `public/videos/onboard/join-contests-compressed.mp4`
- `public/videos/onboard/open-pack-now-compressed.mp4`

## Behavior
- Original section is a horizontal carousel
- Videos autoplay, loop, are muted, and have no controls
- Hover glow exists in production, but the baseline clone keeps the captured default state

## Responsive Notes
- Mobile presents the cards as a horizontal swipe area with one primary card visible at a time
