// src/utils/fetchJWSTData.js
export default async function fetchJWSTData() {
  const response = await fetch(
    "https://images-api.nasa.gov/search?q=James+Webb+Space+Telescope&media_type=image&year_start=2022"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch JWST data");
  }

  const data = await response.json();

  const item = data.collection.items.find(
    (i) => i.links?.length > 0 && i.data?.length > 0
  );

  if (!item) throw new Error("No usable JWST images found");

  return {
    title: item.data[0].title,
    image_url: item.links[0].href,
    date: item.data[0].date_created,
    description: item.data[0].description,
  };
}
