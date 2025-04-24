export default async function fetchNasaAPOD() {
    const apiKey = import.meta.env.PUBLIC_NASA_API_KEY;
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
  
    if (!response.ok) throw new Error("Failed to fetch APOD");
  
    const data = await response.json();
    return data;
  }
  