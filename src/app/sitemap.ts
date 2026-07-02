import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const staticPages = [
    "",
    "/about",
    "/blog",
    "/contact",
    "/privacy-policy",
    "/terms-of-use",
    "/affiliate-disclosure",
    "/disclaimer",
    ...siteConfig.categories.map((c) => `/category/${c.slug}`),
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date(),
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: post.updatedAt ?? post.publishedAt,
    })),
  ];
}
