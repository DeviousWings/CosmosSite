// src/utils/fetchMarsPhotos.js
export default async function fetchMarsPhotos() {
  const apiKey = import.meta.env.PUBLIC_NASA_API_KEY;
  const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`);
  const data = await res.json();
  return data.photos.slice(0, 5);
}
