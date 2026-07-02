import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  robots: { index: true, follow: true },
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="container-content max-w-3xl py-14">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink">
        Affiliate Disclosure
      </h1>
      <p className="mt-2 font-mono text-xs uppercase tracking-wider text-stone">
        Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="prose prose-neutral mt-8 max-w-none">
        <p>
          {siteConfig.name} is a participant in several affiliate marketing
          programs, which means we may earn commissions on purchases made
          through links on this site — at no additional cost to you.
        </p>

        <h2>Programs we participate in</h2>
        <p>This includes, but is not limited to:</p>
        <ul>
          <li>Amazon Associates Program</li>
          <li>ShareASale</li>
          <li>CJ Affiliate</li>
          <li>Impact</li>
          <li>Awin</li>
          <li>Rakuten Advertising</li>
          <li>
            Individual brand affiliate programs (such as Nike, Adidas, ASOS,
            Puma, New Balance, Vans, and Converse)
          </li>
        </ul>

        <h2>Amazon Associates disclosure</h2>
        <p>
          As an Amazon Associate, {siteConfig.name} earns from qualifying
          purchases made through links to Amazon.com.
        </p>

        <h2>How this affects you</h2>
        <p>
          Clicking an affiliate link and making a purchase costs you nothing
          extra. The retailer pays us a small commission for referring the
          sale. This helps fund the research, writing, and photography that
          goes into our free content.
        </p>

        <h2>Our editorial independence</h2>
        <p>
          Affiliate relationships do not influence which products we choose
          to feature or how we rate them. We only recommend products we
          believe are genuinely useful to our readers. Not every product we
          mention is a paid or affiliate link.
        </p>

        <h2>Questions</h2>
        <p>
          If you have questions about our affiliate relationships, contact us
          at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </div>
    </div>
  );
}
