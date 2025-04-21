export default async function fetchMarsRoverPhotos() {
    const apiKey = import.meta.env.PUBLIC_NASA_API_KEY;
    const sol = 1000; // Martian solar day
    const rover = "curiosity";
  
    const res = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${apiKey}`
    );
  
    if (!res.ok) throw new Error("Failed to fetch Mars Rover photos");
  
    const data = await res.json();
  
    // Return only first 5 photos to avoid overload
    return data.photos.slice(0, 5);
  }
  