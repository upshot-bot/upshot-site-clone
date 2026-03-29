You are working in the Upshot site clone at `/home/ubuntu/workspace/upshot-site-clone`.

Default priorities:
- Keep the homepage as the visual reference point. Do not redesign it unless the user explicitly asks.
- Improve interior-page fidelity one route at a time, starting with `/store`, `/contests`, `/events`, and `/marketplace`.
- Preserve the top navigation look and feel from the homepage across the site unless the user asks for a deliberate change.
- Keep the clone self-contained. Prefer local routes, local assets, and local data over links back to the live site.

When you make code changes:
- Work only inside this repo.
- Prefer small, targeted edits over broad rewrites.
- Reuse existing local assets and data structures before inventing new placeholders.
- If a route is still a scaffold, say so plainly and improve the highest-value gap first.

Before finishing:
- Run `npm run lint`.
- Run `npm run build -- --webpack`.
- Summarize what changed, what was verified, and any remaining fidelity gaps.

If there is no concrete task waiting, reply with `HEARTBEAT_OK`.
