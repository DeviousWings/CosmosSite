import Parser from "rss-parser";

const parser = new Parser();

export default async function getSubstackPosts() {
  const feed = await parser.parseURL("https://natdeviouswings.substack.com/feed");

  // List of tags/keywords to filter by (case-insensitive)
  const tags = ["space", "stars", "shipyard", "planets", "nasa"];

  const filteredPosts = feed.items
    .filter(item => {
      const title = item.title.toLowerCase();
      const content = item.contentSnippet?.toLowerCase() || "";

      return tags.some(tag =>
        title.includes(tag) || content.includes(tag)
      );
    })
    .map(item => ({
      title: item.title,
      slug: item.link,
      description: item.contentSnippet || "",
      date: item.pubDate,
    }));

  return filteredPosts;
}
