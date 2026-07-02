import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { CategorySlug } from "./site-config";

const POSTS_DIR = path.join(process.cwd(), "src/content/blog");

export type ProductRecommendation = {
  name: string;
  brand: string;
  price: string;
  affiliateUrl: string;
  image: string;
  blurb: string;
  sku: string;
};

export type PostFrontmatter = {
  title: string;
  slug: string;
  excerpt: string;
  category: CategorySlug;
  coverImage: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  keywords: string[];
};

export type Post = PostFrontmatter & {
  content: string;
  readingTime: string;
};

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    ...(data as PostFrontmatter),
    content,
    readingTime: readingTime(content).text,
  };
}

export function getAllPosts(): Post[] {
  return getAllPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => p !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getPostsByCategory(category: CategorySlug): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getRelatedPosts(current: Post, limit = 3): Post[] {
  return getAllPosts()
    .filter((p) => p.slug !== current.slug && p.category === current.category)
    .slice(0, limit);
}
