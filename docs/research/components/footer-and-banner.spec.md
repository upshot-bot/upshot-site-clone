# Footer And Analytics Banner

## Footer Reference
- Visible at the bottom of `docs/design-references/upshot-cards-desktop-full.png`
- Left cluster: logo, copyright, social links
- Right cluster: Terms & Conditions, Privacy Policy

## Footer Assets
- Logo: `public/images/upshot-logo-bw.svg`
- Social icons:
  - `public/images/social-x.svg`
  - `public/images/social-discord.svg`

## Analytics Banner Reference
- Fixed element rect: width `420px`, height `260px`, bottom-right on desktop
- Background: `rgba(17, 17, 17, 0.95)`
- Radius: `16px`
- Shadow: `0 12px 32px rgba(0,0,0,0.35)`
- Backdrop blur: `12px`

## Banner Content
- Title: "Analytics Preferences"
- Description includes the privacy-policy link
- Actions: `Decline`, `Accept`
- Close affordance uses the extracted Lucide-style `X` icon

## Behavior
- Original banner is dismissible
- Baseline clone includes dismiss actions for close, decline, and accept

## Responsive Notes
- Banner width collapses to `calc(100vw - 32px)` on smaller screens while staying bottom-right aligned
