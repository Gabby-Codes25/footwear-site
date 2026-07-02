import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container-content max-w-3xl py-14">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink">
        Privacy Policy
      </h1>
      <p className="mt-2 font-mono text-xs uppercase tracking-wider text-stone">
        Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="prose prose-neutral mt-8 max-w-none">
        <p>
          This Privacy Policy explains how {siteConfig.name} (&ldquo;we&rdquo;,
          &ldquo;us&rdquo;, &ldquo;our&rdquo;) collects, uses, and protects
          information when you visit {siteConfig.url}.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Usage data:</strong> pages visited, time on site, referral
            source (e.g. Pinterest), device and browser type, collected
            automatically via analytics tools such as Google Analytics.
          </li>
          <li>
            <strong>Cookies:</strong> we and our advertising/affiliate
            partners use cookies to remember preferences and track
            affiliate referrals so commissions are correctly attributed.
          </li>
          <li>
            <strong>Contact information:</strong> if you email us or submit a
            form, we collect your name and email address to respond to you.
          </li>
        </ul>

        <h2>How we use information</h2>
        <ul>
          <li>To operate, maintain, and improve the website.</li>
          <li>To understand which content and Pins perform well.</li>
          <li>To attribute affiliate purchases correctly.</li>
          <li>To respond to inquiries sent via our Contact page.</li>
        </ul>

        <h2>Third-party services</h2>
        <p>
          We participate in affiliate programs including Amazon Associates,
          ShareASale, CJ Affiliate, Impact, Awin, Rakuten Advertising, and
          individual brand affiliate programs. These third parties may set
          their own cookies and collect data according to their own privacy
          policies when you click an affiliate link. We do not control and
          are not responsible for their data practices.
        </p>
        <p>
          As an Amazon Associate, we earn from qualifying purchases through
          links to Amazon.com.
        </p>

        <h2>Your choices</h2>
        <p>
          You can disable cookies in your browser settings. Doing so may
          affect site functionality. You can opt out of interest-based
          advertising through your browser or device settings.
        </p>

        <h2>Children&apos;s privacy</h2>
        <p>
          This site is not directed at children under 13, and we do not
          knowingly collect personal information from children.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this Privacy Policy periodically. Changes will be
          posted on this page with an updated revision date.
        </p>

        <h2>Contact us</h2>
        <p>
          Questions about this policy can be sent to{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </div>
    </div>
  );
}
