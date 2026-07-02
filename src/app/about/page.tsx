import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name} and what we do.`,
};

export default function AboutPage() {
  return (
    <div className="container-content max-w-3xl py-14">
      <p className="eyebrow">About</p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink">
        We help you find shoes and style that actually fit your life.
      </h1>

      <div className="prose prose-neutral mt-8 max-w-none">
        <p>
          {siteConfig.name} started with a simple frustration: most footwear
          content is either paid influencer fluff or overwhelming spec sheets
          that don&apos;t answer the one question that matters — is this
          actually right for me?
        </p>
        <p>
          We write for people who want unisex, versatile pieces — sneakers,
          boots, bags, and everyday staples that work across genders, seasons,
          and budgets. Every guide is built around real use cases: everyday
          wear, travel, students on a budget, gifts, and seasonal transitions.
        </p>
        <h2>How we choose what to feature</h2>
        <p>
          We research specs, compare alternatives, and prioritize comfort,
          durability, and value over hype. Some of the products we mention
          are linked through affiliate programs, which is explained fully on
          our <a href="/affiliate-disclosure">Affiliate Disclosure</a> page.
          Affiliate relationships never determine which products we recommend
          — our opinions are our own.
        </p>
        <h2>Got a question?</h2>
        <p>
          Reach out any time via our <a href="/contact">Contact page</a>.
        </p>
      </div>
    </div>
  );
}
