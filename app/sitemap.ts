import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.coastalglomobile.info",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0, // Home page is given high priority.
    },
    {
      url: "https://www.coastalglomobile.info/services",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.coastalglomobile.info/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://www.coastalglomobile.info/faq",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
