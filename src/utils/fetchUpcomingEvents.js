/**
 * Fetch upcoming space events — cache-first strategy.
 *
 * Reads from Netlify Blobs on the deployed site (refreshed at 6 AM UTC daily
 * by the `refresh-launches` scheduled function).  Falls back to a direct API
 * call in local development where Blobs are unavailable.
 */

import { getStore } from "@netlify/blobs";

export default async function fetchUpcomingEvents(limit = 5) {

  // ── 1. Try Netlify Blobs cache (production only) ──────────────────────────
  try {
    const store  = getStore("space-devs-cache");
    const cached = await store.get("events", { type: "json" });

    if (cached && Array.isArray(cached.data) && cached.data.length > 0) {
      // Drop events whose date has already passed since the last refresh
      const future = cached.data.filter((e) => new Date(e.date) > new Date());
      if (future.length > 0) {
        return future.slice(0, limit);
      }
    }
  } catch {
    // Blobs context not available (local dev) — fall through silently
  }

  // ── 2. Direct API call (local dev or empty/stale cache) ───────────────────
  const now = new Date().toISOString().replace(/\.\d+Z$/, "Z");
  const response = await fetch(
    `https://ll.thespacedevs.com/2.2.0/event/upcoming/?format=json&limit=${limit}&ordering=date&date__gt=${now}`
  );

  if (response.status === 429) {
    throw new Error("Rate limited by Space Devs API — try again shortly.");
  }
  if (!response.ok) {
    throw new Error(`Space Devs Events API error: ${response.status}`);
  }

  const data = await response.json();

  return data.results.map((event) => ({
    id:          event.id,
    name:        event.name,
    type:        event.type?.name   ?? "Event",
    date:        event.date,
    description: event.description  ?? null,
    location:    event.location     ?? null,
    image:       event.feature_image ?? null,
    video_url:   event.video_url    ?? null,
    news_url:    event.news_url     ?? null,
  }));
}
