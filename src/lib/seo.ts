import type { Metadata } from "next";

export const SITE = {
  name: "Seb Moon",
  title: "Seb Moon — Product Design Engineer",
  description:
    "Engineering portfolio of Seb Moon: product design, mechatronics and manufacturing projects presented as engineering case studies.",
  url: "https://www.sebmoon.dev",
  linkedin: "https://www.linkedin.com/in/sebmoon/",
} as const;

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const url = `${SITE.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE.name, type: "website" },
  };
}

/** JSON-LD for the About page. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    url: SITE.url,
    sameAs: [SITE.linkedin],
    jobTitle: "Product Design Engineering student",
  };
}

/** JSON-LD for a project case study. */
export function projectJsonLd(p: {
  title: string;
  summary: string;
  slug: string;
  year: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.summary,
    url: `${SITE.url}/projects/${p.slug}`,
    dateCreated: String(p.year),
    author: { "@type": "Person", name: SITE.name, url: SITE.url },
  };
}
