# Trip Plans

Personal multi-trip itinerary site published on GitHub Pages:

- Portal: https://cookiehankie.github.io/trip-plans/
- 2026 Thanksgiving LA & Death Valley: https://cookiehankie.github.io/trip-plans/trips/2026-thanksgiving-la-dv/

## How It Works

Each trip lives in its own isolated folder under `trips/<slug>/` (`data.js` + `assets/`). Shared desktop editorial styling, the Leaflet route map, and the iPhone Pocket Mode live in `template/`.

Run the zero-dependency builder after adding or editing any trip:

```bash
node scripts/build.mjs
```

The script validates every trip's `data.js` and local image paths, regenerates `docs/` (including each trip's `index.html`, PWA manifest, and offline service worker), and updates the root portal `docs/index.html`. Pushing to `main` deploys `docs/` via `.github/workflows/pages.yml`.

See [AGENT_TEMPLATE.md](./AGENT_TEMPLATE.md) and [trips/_example/data.js](./trips/_example/data.js) for the full schema when adding a new trip.