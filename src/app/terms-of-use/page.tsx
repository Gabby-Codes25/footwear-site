import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Use",
  robots: { index: true, follow: true },
};

export default function TermsOfUsePage() {
  return (
    <div className="container-content max-w-3xl py-14">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink">
        Terms of Use
      </h1>
      <p className="mt-2 font-mono text-xs uppercase tracking-wider text-stone">
        Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="prose prose-neutral mt-8 max-w-none">
        <p>
          By accessing {siteConfig.url}, you agree to these Terms of Use. If
          you do not agree, please do not use this website.
        </p>

        <h2>Use of content</h2>
        <p>
          All content on this site, including text, images, and graphics, is
          owned by {siteConfig.name} or its licensors unless otherwise noted.
          You may share links to our articles but may not republish or
          reproduce our content without written permission.
        </p>

        <h2>Product information</h2>
        <p>
          We strive for accuracy in product descriptions, pricing, and
          availability, but this information is provided by third-party
          retailers and brands and may change without notice. Always confirm
          current pricing and details on the retailer&apos;s website before
          purchasing.
        </p>

        <h2>Affiliate links</h2>
        <p>
          This site contains affiliate links. See our{" "}
          <a href="/affiliate-disclosure">Affiliate Disclosure</a> for
          details.
        </p>

        <h2>No professional advice</h2>
        <p>
          Content on this site is for general informational purposes only
          and does not constitute professional advice of any kind.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          {siteConfig.name} is not liable for any damages arising from your
          use of this site or reliance on its content, to the fullest extent
          permitted by law.
        </p>

        <h2>External links</h2>
        <p>
          Our site links to third-party websites, including retailers and
          affiliate partners. We are not responsible for the content,
          policies, or practices of any third-party site.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may revise these Terms of Use at any time. Continued use of the
          site after changes constitutes acceptance of the updated terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </div>
    </div>
  );
}
