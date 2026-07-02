import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import SearchClient from "./SearchClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search articles, guides, and reviews.",
};

export default function SearchPage() {
  const posts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    coverImage: p.coverImage,
    keywords: p.keywords,
    readingTime: p.readingTime,
    publishedAt: p.publishedAt,
    author: p.author,
  }));

  return (
    <div className="container-content py-14">
      <p className="eyebrow">Search</p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink">
        Find an article
      </h1>
      <SearchClient posts={posts} />
    </div>
  );
}
