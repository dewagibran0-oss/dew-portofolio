import type { MetadataRoute } from "next";

const SITE_URL = "https://dewagibran.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/archive", "/changelog", "/docs", "/components"];
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date("2026-07-06"),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
