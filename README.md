# 805Returns — Validation Landing Page

A conversion-focused landing page to **validate whether people will pay a monthly subscription** for 805Returns to handle their Amazon (and other) returns from their doorstep, here on California's Central Coast.

It's a "fake-door" smoke test: visitors browse the offer, **pick the plan they'd actually pay for**, and join a waitlist. Every plan choice and signup is recorded in a **Cloudflare D1** database so you can measure real willingness-to-pay before building the operation.

## What's being measured

| Signal | Where it's captured |
| --- | --- |
| Total demand | `signups` table (one row per email) |
| **Which price wins** | `signups.plan` + `plan_click` events |
| Geographic demand | `signups.zip` (launch the densest ZIPs first) |
| Customer value | `signups.returns_per_month` |
| Top-of-funnel interest | `events` table (`cta_click`, `plan_click`) |

View it all at `/api/stats?token=YOUR_ADMIN_TOKEN`.

## Stack & why

- **Vite + React + TypeScript** — fast, zero-config static build; easy for any dev to extend.
- **Tailwind CSS v4** — quick, consistent styling; all theme tokens in `src/index.css`.
- **Cloudflare Pages + Pages Functions** — the page is static, the `/api/*` routes run at the edge.
- **Cloudflare D1** — serverless SQLite for leads + funnel events. Already provisioned (`805returns-waitlist`).

All marketing copy and pricing live in **one file** — `src/lib/content.ts`. Change a price there and the whole page (and the choices recorded in D1) updates.

## Project structure

```
src/
  lib/content.ts        ← all copy + the plans being validated (edit here)
  lib/analytics.ts      ← fires funnel events to /api/track
  components/           ← Hero, Pricing, WaitlistForm, FAQ, …
  App.tsx               ← wires plan selection → waitlist
functions/api/
  waitlist.ts           ← POST: save a signup to D1 (upsert by email)
  track.ts              ← POST: record funnel events
  stats.ts              ← GET:  token-guarded validation dashboard (JSON)
schema.sql              ← D1 tables
wrangler.toml           ← Pages + D1 binding
```

## Local development

```bash
npm install

# 1. Pure front-end with hot reload (the /api routes won't run here):
npm run dev

# 2. Full stack — page + Functions + a LOCAL D1 — like production:
npm run db:migrate:local      # create tables in the local D1
npm run pages:dev             # serves the built site at http://localhost:8788
```

> `npm run dev` (Vite) is best for styling/copy work. To exercise the waitlist
> form end-to-end, use `npm run pages:dev`, which runs the Cloudflare Functions
> against a local D1.

## Deploy to Cloudflare Pages

The D1 database is already created and bound in `wrangler.toml`
(`805returns-waitlist`, id `467dbd5b-...`). The remote schema is already applied.

```bash
# Protect the stats dashboard:
npx wrangler pages secret put ADMIN_TOKEN

# Build + deploy:
npm run deploy
```

Then point `805Returns.com` at the Pages project in the Cloudflare dashboard.

### Re-applying the schema (if needed)

```bash
npm run db:migrate:remote
```

## Reading the results

```bash
curl "https://<your-pages-domain>/api/stats?token=$ADMIN_TOKEN"
```

You can also query D1 directly:

```bash
npx wrangler d1 execute 805returns-waitlist --remote \
  --command "SELECT plan, COUNT(*) FROM signups GROUP BY plan"
```

## Pricing under test

Defaults are informed by competitor research (ReturnQueen, the discontinued
Returnmates). Edit in `src/lib/content.ts`:

- **Pay per pickup** — $9.99 / pickup
- **Unlimited monthly** — $19 / month  *(the subscription being validated)*
- **Annual** — $99 / year

## Notes

- This site explicitly does **not** charge anyone — it captures intent. The
  footer states it's validating demand and not yet accepting orders.
- No PII beyond email/ZIP is collected. Add a privacy link before a public launch.
