export default async function fetchSpaceNews(limit = 6) {
  const response = await fetch(
    `https://api.spaceflightnewsapi.net/v4/articles/?limit=${limit}&ordering=-published_at`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch space news");
  }

  const data = await response.json();

  return data.results.map((article) => ({
    title: article.title,
    url: article.url,
    image_url: article.image_url,
    summary: article.summary,
    news_site: article.news_site,
    published_at: new Date(article.published_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  }));
}
