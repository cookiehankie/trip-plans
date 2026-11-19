# Trip Plan Authoring Guide (`AGENT_TEMPLATE.md`)

Use this guide whenever adding or updating a trip in `cookiehankie/trip-plans`.

## Directory Structure

- `template/`: Shared CSS (`styles.css`, `portal.css`), shared renderer (`engine.js`), and vendored Leaflet/icon assets. Keep this folder trip-agnostic; never put trip-specific copy, dates, or coordinates here.
- `trips/_example/`: Annotated starter folder ignored by the build script. Copy this when starting a new trip.
- `trips/<slug>/`: One isolated folder per trip containing `data.js` and `assets/*.jpg`.
- `scripts/build.mjs`: Zero-dependency Node script that validates all `trips/<slug>/data.js` files, checks referenced assets, generates each trip's `index.html`, `manifest.webmanifest`, and `sw.js`, and builds `docs/` (including `docs/index.html`).
- `.github/workflows/pages.yml`: Builds and deploys `docs/` to GitHub Pages on push to `main`.

## Step-by-Step Workflow

1. Pick a clean folder slug `<YYYY>-<short-name>` (for example `2027-spring-kansai`) and copy `trips/_example/` to `trips/<slug>/`.
2. Add 3:2 JPEG photos (around 960x640, 80-200 KB each) into `trips/<slug>/assets/`.
3. Author `trips/<slug>/data.js` setting `window.TRIP_DATA`:
   - `slug`: Must exactly match the folder name.
   - `sortDate`: `YYYY-MM-DD` start date used to sort the portal newest first.
   - `meta`: Page title, short mobile title, portal card summary, date string, `coverImage`, tags, brand labels, and nav labels.
   - `hero`: Eyebrow, pill tags, headline HTML, short intro, and optional `artPreset` (`desert`, `mountain`, `coast`) or custom `artSvg`.
   - `climate`: Weather, packing, and transit/charging prep cards plus notice strip.
   - `places`: Stop cards (`photo`, `brief`, `region`, `mapQuery`, `copyAddress`), `transitNote`, optional `highlightCard`, and collapsible `bookingReference` table.
   - `compare`: 1 to 4 perspective plans in `plans` (`id`, `shortLabel`, `cardLines`, `days`, `considerations`, `dropped`).
   - `map`: `coordinates` (`[lat, lng]`), `hubNodes`, `shortNames`, `popupNotes`, `routeLegs`, `routePaths`, and `routeStops`.
   - `customBuilder`: Set `enabled: true` with `roadEdges` and `templates` for road trips, or `enabled: false` to omit the editor.
   - `checklist`: Pre-trip checkable items and reference links.
   - `mobile`: `regions`, `vaultItems`, `progressSteps`, `stepActionRules` (for one-tap copy and Google/Apple Maps links inside daily steps), and `offlineTip`.
   - `footer`: Brand, tagline, and route summary per plan.
4. Run `node scripts/build.mjs` from the repository root to validate and rebuild `docs/`.
5. Commit `trips/<slug>/` and `docs/`, then push to `main`.

## Writing Rules

- Keep public logistics accurate (flight numbers, hotel names, parking addresses, charging/transit targets), and **redact all personal booking confirmation codes, PNRs, reservation IDs, emails, phone numbers, and credentials** before committing to this public repository (use placeholders like "确认号见个人邮件 / App").
- Write in plain, direct human prose. Avoid buzzwords and Unicode em-dashes.
- Do not repeat every daily step inside the day summary paragraph; use the summary for the day's overall rhythm and let `steps` carry the schedule.
