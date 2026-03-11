export default async function fetchUpcomingEvents(limit = 5) {
  const response = await fetch(
    `https://ll.thespacedevs.com/2.2.0/event/upcoming/?format=json&limit=${limit}&ordering=date`
  );

  if (!response.ok) {
    throw new Error(`Space Devs Events API error: ${response.status}`);
  }

  const data = await response.json();

  return data.results.map((event) => ({
    id: event.id,
    name: event.name,
    type: event.type?.name ?? "Event",
    date: event.date,
    description: event.description ?? null,
    location: event.location ?? null,
    image: event.feature_image ?? null,
    video_url: event.video_url ?? null,
    news_url: event.news_url ?? null,
  }));
}
