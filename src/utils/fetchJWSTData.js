// src/utils/fetchJWSTData.js
export default async function fetchJWSTData() {
  const response = await fetch(
    "https://images-api.nasa.gov/search?q=JWST&media_type=image"
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch JWST data");
  }
  
  const data = await response.json();
  
  // Find first usable image item
  const item = data.collection.items.find(
    i => i.links && i.links.length > 0 && i.data && i.data.length > 0
  );
  
  return {
    title: item.data[0].title,
    image_url: item.links[0].href,
    date: item.data[0].date_created,
    description: item.data[0].description,
  };
}
