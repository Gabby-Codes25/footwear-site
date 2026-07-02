# Footwear & Fashion Affiliate Site

Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Project structure

```
src/
  app/                    Pages (App Router)
    blog/[slug]/          Individual article pages
    category/[slug]/      Category listing pages
    search/                Client-side search
    about, contact, privacy-policy, terms-of-use,
    affiliate-disclosure, disclaimer/   Required static pages
  components/             Header, Footer, ProductCard, PostCard
  content/blog/           Your articles, as .mdx files
  lib/
    site-config.ts        Brand name, categories, social links — EDIT THIS FIRST
    posts.ts              Content loading logic
```

## Rebranding

Everything brand-specific lives in `src/lib/site-config.ts`. Change the
name, tagline, description, categories, and social links there — nothing
else needs to be touched to rebrand the whole site.

## Writing a new article

1. Create a new file in `src/content/blog/your-slug.mdx`
2. Copy the frontmatter format from the example post
   (`best-unisex-sneakers-everyday-wear.mdx`)
3. Write your article in Markdown
4. Drop in a `<ProductCard product={{...}} />` anywhere you want an
   affiliate recommendation block — see the example post for the shape
5. Run `npm run dev` and visit `/blog/your-slug` to preview

Each post needs:
- `title`, `slug`, `excerpt`, `category` (must match a slug in
  `site-config.ts`), `coverImage`, `publishedAt`, `author`, `keywords`

## Images

Cover images and product images currently point to Unsplash URLs as
placeholders. Replace with your own photography or licensed images —
`next.config.js` is set to allow any HTTPS image host, but you should
lock `remotePatterns` down to your actual image CDN before going live.

## SEO

- `src/app/sitemap.ts` auto-generates `/sitemap.xml` from your posts
- `src/app/robots.ts` generates `/robots.txt`
- Each post outputs Article JSON-LD structured data automatically
- Update `siteConfig.url` before deploying — metadata depends on it

## Setting up the writer admin panel (`/admin`)

This gives a non-technical writer a simple email/password login and a form
(title, category, cover image, body) to publish articles — no GitHub account,
no Git knowledge, no third-party CMS needed. Under the hood, publishing
commits a new `.mdx` file to your GitHub repo using your own credentials,
which triggers a Vercel rebuild.

### One-time setup

1. **Push this project to a GitHub repo** if you haven't already.

2. **Generate a password hash** for your writer's login (never store the
   plaintext password anywhere):
   ```bash
   node scripts/hash-password.js "the-password-you-choose"
   ```
   Copy the `salt:hash` value it prints out.

3. **Generate a session secret**:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. **Create a GitHub Personal Access Token** (this belongs to you, the site
   owner — the writer never sees or uses it):
   - GitHub → Settings → Developer settings → Personal access tokens →
     Tokens (classic) → Generate new token
   - Scope needed: `repo`
   - Copy the token — GitHub only shows it once

5. **Add environment variables in Vercel** (Project Settings → Environment
   Variables) — see `.env.local.example` for the full list:
   - `ADMIN_EMAIL` — the email your writer will log in with
   - `ADMIN_PASSWORD_HASH` — from step 2
   - `ADMIN_SESSION_SECRET` — from step 3
   - `GITHUB_COMMIT_TOKEN` — from step 4
   - `GITHUB_REPO` — e.g. `yourusername/footwear-site`
   - `GITHUB_BRANCH` — usually `main`
   - Redeploy after adding these.

6. **Give your writer the login**: share `yoursite.com/admin`, the email,
   and the password you chose in step 2. That's it — no GitHub account
   needed on their end.

### How it works day to day

- Writer goes to `yoursite.com/admin`, logs in with email + password
- Fills out the form: title, category, cover image URL, keywords, body
  (Markdown — headings with `##`, and `<ProductCard product={{...}} />`
  for affiliate blocks, same as any other article)
- Clicks **Publish article** → the site commits a new `.mdx` file to your
  GitHub repo automatically
- Vercel rebuilds and the article is live within a minute or two

There's no review/draft step in this version — publishing is immediate.
If you want a review step before articles go live, that would need a
"draft" flag in the frontmatter and a small change to hide unpublished
drafts from the live site until you flip them — ask if you want that added.

### A note on cover images

The writer pastes an image URL rather than uploading a file directly, since
there's no file storage wired up. Free options that work well: Unsplash
(for placeholder/stock imagery) or a free image host like Cloudinary's free
tier if you want to upload real product photos.

## Deploying

This is a static/SSG-friendly Next.js app. Vercel (from the makers of
Next.js) is the simplest deploy path — connect your GitHub repo and it
builds automatically. Netlify and Cloudflare Pages also work.

## Before going live — checklist

- [ ] Replace placeholder brand name/logo in `site-config.ts`
- [ ] Get approved for Amazon Associates + other affiliate programs,
      replace placeholder `affiliateUrl` values in real posts
- [ ] Replace Unsplash placeholder images with real/licensed photography
- [ ] Set up Google Search Console and submit sitemap
- [ ] Set up analytics (Google Analytics or Plausible)
- [ ] Review legal pages with a lawyer if operating at scale
- [ ] Set `siteConfig.url` to your real domain
