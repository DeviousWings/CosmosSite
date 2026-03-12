/**
 * Fetch upcoming launches — cache-first strategy.
 *
 * On the deployed Netlify site the data is refreshed once per day by
 * the `refresh-launches` scheduled function (6 AM UTC).  Each page
 * request reads from Netlify Blobs instead of calling the API directly,
 * so the 15-req/hour anonymous rate limit is never a concern in production.
 *
 * In local development Blobs are unavailable, so we fall back to a direct
 * API call just like before.
 */

import { getStore } from "@netlify/blobs";

export default async function fetchUpcomingLaunches(limit = 5) {

  // ── 1. Try Netlify Blobs cache (production only) ──────────────────────────
  try {
    const store  = getStore("space-devs-cache");
    const cached = await store.get("launches", { type: "json" });

    if (cached && Array.isArray(cached.data) && cached.data.length > 0) {
      // Drop any launches whose window has already passed since the last refresh
      const future = cached.data.filter((l) => new Date(l.net) > new Date());
      if (future.length > 0) {
        return future.slice(0, limit);
      }
      // Cache is stale (all launches are now in the past) — fall through to API
    }
  } catch {
    // Blobs context not available (local dev) — fall through silently
  }

  // ── 2. Direct API call (local dev or empty/stale cache) ───────────────────
  const now      = new Date().toISOString().replace(/\.\d+Z$/, "Z");
  const response = await fetch(
    `https://ll.thespacedevs.com/2.2.0/launch/upcoming/?format=json&limit=${limit}&ordering=net&net__gt=${now}`
  );

  if (response.status === 429) {
    throw new Error("Rate limited by Space Devs API — try again shortly.");
  }
  if (!response.ok) {
    throw new Error(`Launch Library API error: ${response.status}`);
  }

  const data = await response.json();

  return data.results
    .filter((launch) => new Date(launch.net) > new Date())
    .map((launch) => ({
      id:           launch.id,
      name:         launch.name,
      net:          launch.net,
      status:       launch.status?.name                 ?? "Unknown",
      rocket:       launch.rocket?.configuration?.name  ?? "Unknown Rocket",
      mission:      launch.mission?.name                ?? null,
      mission_desc: launch.mission?.description         ?? null,
      pad:          launch.pad?.name                    ?? null,
      location:     launch.pad?.location?.name          ?? null,
      image:        launch.image                        ?? null,
      url:          launch.url                          ?? null,
    }));
}
