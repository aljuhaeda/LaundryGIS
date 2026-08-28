# LaundryGIS — Progress

## Status
Deployed, verified. Live: [laundrygis.aljuhaeda.com](https://laundrygis.aljuhaeda.com)
(Cloudflare Pages, Git-integrated with `main` — pushes auto-redeploy;
custom subdomain added 2026-08-15, `laundrygis.pages.dev` also works).

## Done
- Every page previously embedded a dead `localhost:8080` Mapstore
  iframe — a dashboard that only ever existed on the original
  developer's machine, broken for any real visitor since day one.
  Rebuilt as a self-contained Leaflet + vanilla JS app using the same
  underlying dataset (`Additional Data/LaundryUIN.csv`) — 28 real
  laundry locations near UIN Malang, unchanged data, no backend needed.
- Interactive map (`peta.html`), searchable data table (`data.html`),
  and price/speed filter dashboard (`kategori.html`) all working on the
  real dataset.
- `feature.html` and `team.html` were never actually de-templated: navbar
  still said "BizConsult," nav links pointed at 6 nonexistent pages,
  team page showed 8 fake placeholder members with stock photos.
  Rewritten with honest content and fixed site-wide nav/breadcrumbs.
- Original PostgreSQL/PostGIS/GeoServer/Mapstore stack still documented
  in the README for reference (legitimate heavier path for real-time
  layers or multi-user editing), clearly marked as not what currently
  runs.

## In progress
- Landing-page rework committed (`c193f2f`), not yet pushed/deployed.
  Full visual redesign of `index.html` only — warm-local direction
  (cream + ink + clay, Bricolage Grotesque), self-contained
  `css/home.css` + `js/home.js`, template libs (Bootstrap/jQuery/WOW/
  AOS/Owl/Animate/FontAwesome) dropped from this page. Featured
  laundries now generated from `LAUNDRY_DATA` (cheapest 3 / fastest 3).
  Fabricated footer content (fake phone/email/socials, dead newsletter
  form, nonexistent Privacy/Terms/Careers links) removed. Other 5 pages
  untouched — still on the old template stylesheets, so a future pass
  could roll this design system to them.
- Not visually verified on a real mobile viewport (browser automation
  was locked at 1920px); responsive CSS is conventional grid/flex
  collapse + hamburger toggle.

## Known issues / honest limitations
- Static dataset — no live backend, so data updates require editing
  `js/laundry-data.js` / the source CSV directly, not a live re-crawl.

## Verification log
- 2026-07-23: git working tree clean, no pending diff. `/security-review`
  skill checked — N/A, diff-based and nothing to review. Confirmed no
  leftover `localhost:8080`/Mapstore references in any HTML file.
  Served `peta.html` directly and confirmed: Leaflet map renders with
  live markers, full nav bar present and correct, no console errors.

## Next up
- Push `main` to deploy the landing rework (Cloudflare Pages auto-build),
  then verify the live URL — especially on a phone.
- If the new design lands well: roll `css/home.css`'s system to
  `peta.html` / `data.html` / `kategori.html` / `feature.html` /
  `team.html` and retire the old template stylesheets + `lib/`.

## Verification log (continued)
- 2026-07-28: fresh audit found the landing page (`index.html`) had the
  same fabricated-testimonial pattern already fixed on `team.html` —
  four fake customer quotes with invented names and stock photos,
  presented as real reviews for a site with no actual customer base.
  Section removed entirely, matching the honest-content precedent set
  by the `team.html` fix.
- 2026-07-31: removed a duplicate template `LICENSE.txt` and a stray
  `READ-ME.txt` left over from the original template — the project has
  its own `LICENSE` and `README.md`.
- 2026-08-15: deployed to Cloudflare Pages, Git-integrated (`main`
  branch, no build step — static site served from repo root). Live at
  [laundrygis.pages.dev](https://laundrygis.pages.dev). Verified: landing
  page and `peta.html` (Leaflet map) both render correctly live, zero
  console errors. Custom subdomain `laundrygis.aljuhaeda.com` added the
  same day (CNAME to `laundrygis.pages.dev`, proxied through
  Cloudflare) — verified live over HTTPS.
