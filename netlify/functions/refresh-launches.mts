/**
 * Netlify Scheduled Function — runs at 6:00 AM UTC every day.
 * Fetches fresh launch + event data from The Space Devs API and
 * writes it into Netlify Blobs so SSR pages can read it without
 * hitting the API on every page load.
 */

import { getStore } from "@netlify/blobs";
import type { Config } from "@netlify/functions";

// ─── helpers ────────────────────────────────────────────────────────────────

async function fetchLaunches(limit = 5) {
  const now = new Date().toISOString().replace(/\.\d+Z$/, "Z");
  const res = await fetch(
    `https://ll.thespacedevs.com/2.2.0/launch/upcoming/?format=json&limit=${limit}&ordering=net&net__gt=${now}`
  );
  if (res.status === 429) throw new Error("Rate limited by Space Devs API");
  if (!res.ok) throw new Error(`Launch API error: ${res.status}`);

  const data = await res.json();
  return data.results
    .filter((l: any) => new Date(l.net) > new Date())
    .map((l: any) => ({
      id:           l.id,
      name:         l.name,
      net:          l.net,
      status:       l.status?.name          ?? "Unknown",
      rocket:       l.rocket?.configuration?.name ?? "Unknown Rocket",
      mission:      l.mission?.name         ?? null,
      mission_desc: l.mission?.description  ?? null,
      pad:          l.pad?.name             ?? null,
      location:     l.pad?.location?.name   ?? null,
      image:        l.image                 ?? null,
      url:          l.url                   ?? null,
    }));
}

async function fetchEvents(limit = 5) {
  const res = await fetch(
    `https://ll.thespacedevs.com/2.2.0/event/upcoming/?format=json&limit=${limit}&ordering=date`
  );
  if (res.status === 429) throw new Error("Rate limited by Space Devs API");
  if (!res.ok) throw new Error(`Events API error: ${res.status}`);

  const data = await res.json();
  return data.results.map((e: any) => ({
    id:        e.id,
    name:      e.name,
    type:      e.type?.name    ?? "Event",
    date:      e.date,
    description: e.description ?? null,
    location:  e.location      ?? null,
    image:     e.feature_image ?? null,
    video_url: e.video_url     ?? null,
    news_url:  e.news_url      ?? null,
  }));
}

// ─── handler ────────────────────────────────────────────────────────────────

export default async function handler() {
  const store = getStore("space-devs-cache");
  const results: Record<string, string> = {};

  try {
    const launches = await fetchLaunches(5);
    await store.setJSON("launches", {
      data: launches,
      refreshedAt: new Date().toISOString(),
    });
    results.launches = `ok — ${launches.length} upcoming launches cached`;
  } catch (err: any) {
    results.launches = `error — ${err.message}`;
    console.error("[refresh-launches] launches failed:", err.message);
  }

  try {
    const events = await fetchEvents(5);
    await store.setJSON("events", {
      data: events,
      refreshedAt: new Date().toISOString(),
    });
    results.events = `ok — ${events.length} upcoming events cached`;
  } catch (err: any) {
    results.events = `error — ${err.message}`;
    console.error("[refresh-launches] events failed:", err.message);
  }

  console.log("[refresh-launches] complete:", results);
  return new Response(JSON.stringify(results), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// Runs every day at 6:00 AM UTC
export const config: Config = {
  schedule: "0 6 * * *",
};
