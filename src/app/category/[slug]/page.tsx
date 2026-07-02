import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import { getPostsByCategory } from "@/lib/posts";
import { siteConfig, CategorySlug } from "@/lib/site-config";

export function generateStaticParams() {
  return siteConfig.categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = siteConfig.categories.find((c) => c.slug === params.slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = siteConfig.categories.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const posts = getPostsByCategory(category.slug as CategorySlug);

  return (
    <div className="container-content py-14">
      <p className="eyebrow">Category</p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink">
        {category.name}
      </h1>
      <p className="mt-3 max-w-lg text-stone">{category.description}</p>

      {posts.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-card border border-dashed border-line p-12 text-center">
          <p className="font-display text-lg text-ink">
            No articles in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}
