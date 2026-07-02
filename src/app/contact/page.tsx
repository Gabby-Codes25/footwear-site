import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${siteConfig.name} team.`,
};

export default function ContactPage() {
  return (
    <div className="container-content max-w-2xl py-14">
      <p className="eyebrow">Contact</p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink">
        Get in touch
      </h1>
      <p className="mt-4 text-stone">
        Questions, partnership inquiries, or corrections — we read every
        message.
      </p>

      <div className="mt-10 rounded-card border border-line bg-card p-6">
        <p className="sku-tag">Email</p>
        <a
          href={`mailto:${siteConfig.email}`}
          className="mt-1 block font-display text-xl font-bold text-ink hover:text-clay"
        >
          {siteConfig.email}
        </a>
      </div>

      <div className="mt-6 rounded-card border border-line bg-card p-6">
        <p className="sku-tag">Pinterest</p>
        <a
          href={siteConfig.social.pinterest}
          target="_blank"
          rel="noopener"
          className="mt-1 block font-display text-xl font-bold text-ink hover:text-clay"
        >
          Follow us on Pinterest
        </a>
      </div>
    </div>
  );
}
