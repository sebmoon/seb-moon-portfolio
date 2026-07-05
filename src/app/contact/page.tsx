import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/features/contact-form/ContactForm";
import { pageMetadata, SITE } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Contact",
  "Get in touch with Seb Moon — send a message and I'll reply by email with my CV and details.",
  "/contact",
);

export default function ContactPage() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-4 max-w-prose leading-relaxed text-muted">
        Recruiting, collaborating, or want the full CV and a walkthrough of
        my commercial work and skills? Leave your name, email and a short
        message and I&apos;ll come back to you directly. You can also find me
        on{" "}
        <a
          href={SITE.linkedin}
          rel="noopener noreferrer"
          target="_blank"
          className="text-accent underline underline-offset-2"
        >
          LinkedIn
        </a>
        .
      </p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </Container>
  );
}
