// pages/api/proxy-rss.js
import Parser from "rss-parser";

const parser = new Parser();

export default async function handler(req, res) {
  try {
    const feed = await parser.parseURL(
      "https://www.cnbc.com/id/19854910/device/rss/rss.html"
    );

    // Send the parsed feed as JSON
    res.status(200).json(feed);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch RSS feed" });
  }
}
