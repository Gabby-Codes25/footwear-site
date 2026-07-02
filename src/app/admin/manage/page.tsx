"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

type ArticleSummary = {
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  author: string;
};

export default function ManageArticlesPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<ArticleSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmSlug, setConfirmSlug] = useState<string | null>(null);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/list");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setPosts(data.posts || []);
    } catch {
      setMessage("Could not load articles.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(slug: string) {
    setDeletingSlug(slug);
    setMessage("");
    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Delete failed.");
        setDeletingSlug(null);
        setConfirmSlug(null);
        return;
      }

      setPosts((prev) => prev.filter((p) => p.slug !== slug));
      setMessage(`Deleted. The site will rebuild shortly and remove it.`);
    } catch {
      setMessage("Network error. Please try again.");
    } finally {
      setDeletingSlug(null);
      setConfirmSlug(null);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-paper">
      <div className="border-b border-line bg-card">
        <div className="container-content flex h-16 items-center justify-between">
          <p className="font-display text-lg font-bold text-ink">Manage articles</p>
          <div className="flex items-center gap-5">
            <Link href="/admin/new" className="font-mono text-xs uppercase tracking-wider text-clay hover:underline">
              + New article
            </Link>
            <button onClick={handleLogout} className="font-mono text-xs uppercase tracking-wider text-stone hover:text-clay">
              Log out
            </button>
          </div>
        </div>
      </div>

      <div className="container-content max-w-3xl py-10">
        {message && (
          <p className="mb-6 rounded-card bg-sage/10 px-4 py-3 text-sm text-sage">{message}</p>
        )}

        {loading ? (
          <p className="text-stone">Loading articles…</p>
        ) : posts.length === 0 ? (
          <p className="text-stone">No articles published yet.</p>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => {
              const category = siteConfig.categories.find((c) => c.slug === post.category);
              const isConfirming = confirmSlug === post.slug;
              const isDeleting = deletingSlug === post.slug;

              return (
                <div
                  key={post.slug}
                  className="flex items-center justify-between rounded-card border border-line bg-card p-4"
                >
                  <div>
                    <p className="font-display font-bold text-ink">{post.title}</p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-stone">
                      {category?.name ?? post.category} · {post.publishedAt}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener"
                      className="font-mono text-xs uppercase tracking-wider text-stone hover:text-clay"
                    >
                      View
                    </a>

                    {isConfirming ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone">Delete this article?</span>
                        <button
                          onClick={() => handleDelete(post.slug)}
                          disabled={isDeleting}
                          className="rounded-card bg-clay px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-paper hover:bg-clay-dark disabled:opacity-50"
                        >
                          {isDeleting ? "Deleting…" : "Confirm"}
                        </button>
                        <button
                          onClick={() => setConfirmSlug(null)}
                          className="rounded-card border border-line px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-ink hover:border-clay"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmSlug(post.slug)}
                        className="rounded-card border border-line px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-ink hover:border-clay hover:text-clay"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
