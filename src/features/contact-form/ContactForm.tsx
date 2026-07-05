"use client";

import { useState } from "react";
import { SITE } from "@/lib/seo";

/**
 * Contact form posting to Formspree (no backend needed on a static site).
 * Configure by setting NEXT_PUBLIC_FORMSPREE_ID (the id after /f/ in the
 * Formspree endpoint) in .env.local and in Vercel project env vars.
 */
const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  if (!FORM_ID) {
    return (
      <p className="max-w-prose text-muted">
        The contact form isn&apos;t configured yet — in the meantime, reach me
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
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Honeypot: real users never fill this hidden field.
    if (data.get("company")) return;
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Formspree ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="max-w-prose rounded-lg border border-line bg-surface p-6"
      >
        <p className="font-medium">Message sent — thank you.</p>
        <p className="mt-2 text-sm text-muted">
          I&apos;ll get back to you by email, usually within a day or two.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-prose space-y-5" noValidate={false}>
      {/* Honeypot — hidden from real users and screen readers */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="mt-1.5 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1.5 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="mt-1.5 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "error" && (
          <p role="alert" className="text-sm text-muted">
            Something went wrong — please try again, or message me on{" "}
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
        )}
      </div>
    </form>
  );
}
