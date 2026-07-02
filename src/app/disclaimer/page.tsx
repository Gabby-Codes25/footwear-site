import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Disclaimer",
  robots: { index: true, follow: true },
};

export default function DisclaimerPage() {
  return (
    <div className="container-content max-w-3xl py-14">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink">
        Disclaimer
      </h1>
      <p className="mt-2 font-mono text-xs uppercase tracking-wider text-stone">
        Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="prose prose-neutral mt-8 max-w-none">
        <h2>General information</h2>
        <p>
          The information provided on {siteConfig.url} is for general
          informational and educational purposes only. All content, including
          product reviews, buying guides, and style advice, reflects our own
          opinions and research at the time of publication.
        </p>

        <h2>No guarantees</h2>
        <p>
          We make no representations or warranties of any kind, express or
          implied, about the completeness, accuracy, reliability, or
          availability of the information, products, or services mentioned
          on this site. Product prices, availability, and specifications are
          subject to change by the retailer or manufacturer without notice.
        </p>

        <h2>Sizing and fit</h2>
        <p>
          Footwear and clothing sizing varies by brand. We provide general
          guidance where possible, but you should always consult the
          specific retailer&apos;s sizing chart before purchasing.
        </p>

        <h2>Not professional advice</h2>
        <p>
          Nothing on this site should be taken as medical, podiatric, or
          professional advice regarding footwear or health. Consult a
          qualified professional for advice specific to your situation.
        </p>

        <h2>Affiliate links</h2>
        <p>
          This site uses affiliate links, as described in our{" "}
          <a href="/affiliate-disclosure">Affiliate Disclosure</a>. Any
          reliance you place on information from this site is strictly at
          your own risk.
        </p>

        <h2>External links</h2>
        <p>
          Our site may link to external websites that are not provided or
          maintained by us. We do not guarantee the accuracy or completeness
          of any information on these external sites.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this disclaimer can be sent to{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </div>
    </div>
  );
}
