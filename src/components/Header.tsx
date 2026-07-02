import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="container-content flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-ink">
          {siteConfig.shortName}
          <span className="text-clay">.</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {siteConfig.categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:text-clay"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/blog"
            className="font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:text-clay"
          >
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/search"
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-clay hover:text-clay"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
