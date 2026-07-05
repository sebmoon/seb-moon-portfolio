import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { pageMetadata, SITE } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Contact",
  "Get in touch with Seb Moon.",
  "/contact",
);

export default function ContactPage() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-6 max-w-prose leading-relaxed">
        I&apos;m always happy to talk about engineering, design or potential
        opportunities. The fastest way to reach me is LinkedIn:
      </p>
      <p className="mt-4">
        <a
          href={SITE.linkedin}
          rel="noopener noreferrer"
          target="_blank"
          className="text-accent underline underline-offset-2"
        >
          linkedin.com/in/sebmoon
        </a>
      </p>
    </Container>
  );
}
