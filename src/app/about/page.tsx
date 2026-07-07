import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { TestimonialCarousel } from "@/features/testimonials/TestimonialCarousel";
import { pageMetadata, personJsonLd } from "@/lib/seo";
import { TESTIMONIALS } from "@/lib/testimonials";

export const metadata: Metadata = pageMetadata(
  "About",
  "Seb Moon — product design engineer; MSc Advanced Manufacturing Engineering and Management at Loughborough University (predicted Distinction), BEng (Hons) Product Design Engineering with DIS, with industry experience across agricultural, renewable and sports engineering hardware.",
  "/about",
);

/*
 * Photo files expected in /public/images/about/ (added by Seb, .jpg is fine —
 * next/image serves optimised WebP/AVIF automatically):
 *   portrait.png   — main front-on photo
 *   lab-1.jpg      — in the lab
 *   lab-2.jpg      — in the lab
 *   workshop.png   — in the workshop
 *   hazlerigg.jpg  — Hazlerigg Building, Loughborough University
 */

const experience = [
  {
    role: "Freelance Design Engineer",
    org: "onPoint Performance (design consultancy), Loughborough Incubator",
    period: "2026 — present",
    note: "Self-employed on design commissions spanning agricultural and fitness equipment: CAD models, detailed drawings and BOMs in SolidWorks and Fusion 360, coordinating with manufacturers on build issues and revision control.",
  },
  {
    role: "Product Design Engineer",
    org: "Aftrak — agricultural & renewable energy systems",
    period: "2024 — 2025",
    note: "Owned the modular aluminium solar array frame from requirements and concept through CAD, supplier selection, prototype build and field validation. DFMA work reduced assembly time by 40% and cost by 27%.",
  },
  {
    role: "Product Design Engineer & Interim Product Manager",
    org: "ESP Fitness — commercial fitness & performance hardware",
    period: "2023 — 2024",
    note: "Took day-to-day ownership of a gym hardware portfolio when the engineering manager left; designed welded steel frames, sheet metal enclosures and machined brackets; led DFMEA-based root-cause investigations validated through rig and field testing.",
  },
];

const education = [
  {
    title: "MSc Advanced Manufacturing Engineering and Management",
    org: "Loughborough University",
    period: "2025 — present",
    note: "Predicted Distinction. Operations and project management, manufacturing processes and automation, robotics control, machine learning.",
  },
  {
    title: "BEng (Hons) Product Design Engineering, with Diploma in Industrial Studies",
    org: "Loughborough University",
    period: "2021 — 2025",
    note: "Engineering science, advanced CAD, manufacturing processes, software engineering, product design — with a year of industrial experience (DIS).",
  },
];

const positions = [
  {
    title: "MSc Course Representative, Advanced Manufacturing Engineering and Management",
    org: "Wolfson School of Engineering, Loughborough University",
    period: "2025 — 2026",
    note: "Elected by the MSc cohort as the formal student voice at Staff–Student Liaison Committee meetings — summarising feedback and working with staff to improve module delivery and assessment.",
  },
  {
    title: "Lead Student Engineering Ambassador",
    org: "Wolfson School of Engineering, Loughborough University",
    period: "2021 — 2026",
    note: "Led over 77 engineering facility tours and demonstrations for prospective students and industrial visitors, coordinating other ambassadors.",
  },
  {
    title: "Deputy Head Boy",
    org: "Maltings Academy",
    period: "2018 — 2019",
    note: "",
  },
];

const honours = [
  { title: "Academic Excellence in EPQ", year: "2021" },
  { title: "Academic Excellence in Product Design", year: "2021" },
  { title: "Javelin Record Holder, Maltings Academy", year: "2016" },
];

const clubs = [
  { title: "American Football Athletics Union", year: "2023 — 2024" },
  { title: "Loughborough Lawn Tennis Club", year: "2026" },
];

export default function AboutPage() {
  return (
    <Container className="py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />

      {/* Intro */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[3fr_2fr] md:items-start">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">About</h1>
          <div className="mt-6 max-w-prose space-y-4 leading-relaxed">
            <p>
              I&apos;m Seb — a product and mechanical design engineer,
              currently completing an MSc in Advanced Manufacturing
              Engineering and Management at Loughborough University
              (predicted Distinction), after a BEng (Hons) in Product Design
              Engineering with a Diploma in Industrial Studies.
            </p>
            <p>
              I&apos;ve worked as a Product Design Engineer in industry across
              agricultural and renewable energy systems and elite sports
              hardware — including stepping up as Interim Product Manager at
              ESP Fitness — and I&apos;m currently self-employed as a
              freelance design engineer working with onPoint Performance, a
              design consultancy based in Loughborough&apos;s Incubator.
            </p>
            <p>
              I solve technical problems from first principles: concept
              generation, CAD and BOM ownership, DFMA/DFMEA-led improvement,
              prototype building and testing, and working day-to-day with
              suppliers and manufacturers to turn concepts into reliable
              products.
            </p>
            <p className="text-muted">
              Alongside the university and personal projects on this site,
              I&apos;ve delivered commercial design and engineering work for
              the companies above. That work belongs to my clients and
              employers, so it isn&apos;t published here — I&apos;m happy to
              talk through the skills and outcomes in
              conversation. <Link href="/contact" className="text-accent underline underline-offset-2">Get in touch</Link>.
            </p>
          </div>
        </div>
        <figure className="relative aspect-[6/5] overflow-hidden rounded-lg border border-line bg-surface">
          <Image
            src="/images/about/portrait.png"
            alt="Seb Moon"
            fill
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </figure>
      </div>

      {/* Experience */}
      <section aria-labelledby="experience-heading" className="mt-16">
        <h2 id="experience-heading" className="text-xl font-semibold tracking-tight">
          Experience
        </h2>
        <ul className="mt-6 space-y-6">
          {experience.map((e) => (
            <li key={e.role} className="border-b border-line pb-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold">{e.role}</h3>
                <span className="text-sm text-muted">{e.period}</span>
              </div>
              <p className="mt-0.5 text-sm text-muted">{e.org}</p>
              <p className="mt-2 max-w-prose text-sm leading-relaxed">{e.note}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Education */}
      <section aria-labelledby="education-heading" className="mt-16">
        <h2 id="education-heading" className="text-xl font-semibold tracking-tight">
          Education
        </h2>
        <ul className="mt-6 space-y-6">
          {education.map((e) => (
            <li key={e.title} className="border-b border-line pb-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold">{e.title}</h3>
                <span className="text-sm text-muted">{e.period}</span>
              </div>
              <p className="mt-0.5 text-sm text-muted">{e.org}</p>
              <p className="mt-2 max-w-prose text-sm leading-relaxed">{e.note}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Positions of responsibility */}
      <section aria-labelledby="positions-heading" className="mt-16">
        <h2 id="positions-heading" className="text-xl font-semibold tracking-tight">
          Positions of responsibility
        </h2>
        <ul className="mt-6 space-y-6">
          {positions.map((e) => (
            <li key={e.title} className="border-b border-line pb-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold">{e.title}</h3>
                <span className="text-sm text-muted">{e.period}</span>
              </div>
              <p className="mt-0.5 text-sm text-muted">{e.org}</p>
              {e.note && (
                <p className="mt-2 max-w-prose text-sm leading-relaxed">{e.note}</p>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Honours & clubs */}
      <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2">
        <section aria-labelledby="honours-heading">
          <h2 id="honours-heading" className="text-xl font-semibold tracking-tight">
            Honours
          </h2>
          <ul className="mt-4">
            {honours.map((h) => (
              <li
                key={h.title}
                className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-sm"
              >
                <span>{h.title}</span>
                <span className="shrink-0 text-muted">{h.year}</span>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="clubs-heading">
          <h2 id="clubs-heading" className="text-xl font-semibold tracking-tight">
            Clubs
          </h2>
          <ul className="mt-4">
            {clubs.map((c) => (
              <li
                key={c.title}
                className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-sm"
              >
                <span>{c.title}</span>
                <span className="shrink-0 text-muted">{c.year}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Photos */}
      <section aria-labelledby="photos-heading" className="mt-16">
        <h2 id="photos-heading" className="text-xl font-semibold tracking-tight">
          In the lab and workshop
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            // `position` controls which part of the photo survives the crop:
            // object-left / object-center / object-right (or object-top etc.)
            {
              src: "/images/about/lab-1.jpg",
              alt: "Seb working in the engineering lab",
              position: "object-right",
            },
            {
              src: "/images/about/lab-2.jpg",
              alt: "Seb testing hardware in the lab",
              position: "object-center",
            },
            {
              src: "/images/about/workshop.png",
              alt: "Seb in the workshop",
              position: "object-center",
            },
            {
              src: "/images/about/hazlerigg.jpg",
              alt: "Hazlerigg Building, Loughborough University",
              position: "object-center",
            },
          ].map((img) => (
            <figure
              key={img.src}
              className="relative aspect-[3/4] overflow-hidden rounded-lg border border-line bg-surface"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className={`object-cover ${img.position}`}
              />
            </figure>
          ))}
        </div>
      </section>

      {/* Featured videos */}
      <section aria-labelledby="videos-heading" className="mt-16">
        <h2 id="videos-heading" className="text-xl font-semibold tracking-tight">
          Featured by Loughborough University
        </h2>
        <p className="mt-3 max-w-prose text-muted">
          Two promotional films on the official Loughborough University
          channel in which I&apos;m a key contributor. Click to play.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <YouTubeEmbed
            youtubeId="B_PbIg5WM70"
            title="Loughborough University — promotional film"
            start={25}
          />
          <YouTubeEmbed
            youtubeId="Vl5eqn6qVJs"
            title="Loughborough University — promotional film"
          />
        </div>
      </section>

      {/* References */}
      <section aria-labelledby="references-heading" className="mt-16">
        <h2
          id="references-heading"
          className="text-xl font-semibold tracking-tight"
        >
          In their words
        </h2>
        <p className="mt-2 text-sm text-muted">
          From written recommendation letters — full copies available on
          request.
        </p>
        <div className="mt-6">
          <TestimonialCarousel items={TESTIMONIALS} />
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 rounded-lg border border-line bg-surface p-6">
        <p className="max-w-prose">
          Want the full CV or to discuss a role or project? Send me a message
          on the <Link href="/contact" className="text-accent underline underline-offset-2">contact page</Link> and
          I&apos;ll come back to you directly.
        </p>
      </section>
    </Container>
  );
}
