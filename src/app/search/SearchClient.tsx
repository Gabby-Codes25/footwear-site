"use client";

import { useMemo, useState } from "react";
import PostCard from "@/components/PostCard";
import { Post } from "@/lib/posts";

type SearchablePost = Omit<Post, "content">;

export default function SearchClient({ posts }: { posts: SearchablePost[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return posts;
    const q = query.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [query, posts]);

  return (
    <div>
      <div className="relative mt-6 max-w-lg">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search sneakers, boots, outfit ideas…"
          className="w-full rounded-card border border-line bg-card px-5 py-3 text-sm text-ink placeholder:text-stone focus:border-clay focus:outline-none"
          autoFocus
        />
      </div>

      <p className="mt-6 font-mono text-xs uppercase tracking-wider text-stone">
        {results.length} {results.length === 1 ? "result" : "results"}
      </p>

      {results.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((post) => (
            <PostCard key={post.slug} post={post as Post} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-card border border-dashed border-line p-12 text-center">
          <p className="text-stone">No articles match &ldquo;{query}&rdquo;.</p>
        </div>
      )}
    </div>
  );
}
