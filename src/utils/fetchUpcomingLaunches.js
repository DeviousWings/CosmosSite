export default async function fetchUpcomingLaunches(limit = 5) {
  const response = await fetch(
    `https://ll.thespacedevs.com/2.2.0/launch/upcoming/?format=json&limit=${limit}&ordering=net`
  );

  if (!response.ok) {
    throw new Error(`Launch Library API error: ${response.status}`);
  }

  const data = await response.json();

  return data.results.map((launch) => ({
    id: launch.id,
    name: launch.name,
    net: launch.net, // ISO timestamp of launch
    status: launch.status?.name ?? "Unknown",
    rocket: launch.rocket?.configuration?.name ?? "Unknown Rocket",
    mission: launch.mission?.name ?? null,
    mission_desc: launch.mission?.description ?? null,
    pad: launch.pad?.name ?? null,
    location: launch.pad?.location?.name ?? null,
    image: launch.image ?? null,
    url: launch.url ?? null,
  }));
}
