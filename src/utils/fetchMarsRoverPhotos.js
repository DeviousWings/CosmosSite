// NASA Mars Photos API was retired. Replaced with Near Earth Objects (NeoWS).
export default async function fetchNearEarthObjects() {
  const apiKey = import.meta.env.PUBLIC_NASA_API_KEY;
  const res = await fetch(
    `https://api.nasa.gov/neo/rest/v1/feed/today?api_key=${apiKey}`
  );
  if (!res.ok) throw new Error(`NeoWS API error: ${res.status}`);
  const data = await res.json();

  const date = Object.keys(data.near_earth_objects)[0];
  const neos = data.near_earth_objects[date];

  return neos.slice(0, 5).map((neo) => ({
    name: neo.name.replace(/[()]/g, "").trim(),
    hazardous: neo.is_potentially_hazardous_asteroid,
    diameter_min: Math.round(neo.estimated_diameter.meters.estimated_diameter_min),
    diameter_max: Math.round(neo.estimated_diameter.meters.estimated_diameter_max),
    miss_distance_km: Math.round(parseFloat(neo.close_approach_data[0].miss_distance.kilometers)).toLocaleString(),
    velocity_kph: Math.round(parseFloat(neo.close_approach_data[0].relative_velocity.kilometers_per_hour)).toLocaleString(),
  }));
}
