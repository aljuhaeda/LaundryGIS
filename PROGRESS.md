# LaundryGIS — Progress

## Status
Stable. Static site, no hosting requirement — runs directly from
`index.html` or any static host, no backend.

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
- Nothing currently active.

## Known issues / honest limitations
- Static dataset — no live backend, so data updates require editing
  `js/laundry-data.js` / the source CSV directly, not a live re-crawl.
- No hosted deployment (GitHub Pages, etc.) — must be opened locally or
  self-hosted.

## Verification log
- 2026-07-23: git working tree clean, no pending diff. `/security-review`
  skill checked — N/A, diff-based and nothing to review. Confirmed no
  leftover `localhost:8080`/Mapstore references in any HTML file.
  Served `peta.html` directly and confirmed: Leaflet map renders with
  live markers, full nav bar present and correct, no console errors.

## Next up
- Nothing scheduled.
