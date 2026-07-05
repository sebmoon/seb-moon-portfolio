import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { pageMetadata, personJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "About",
  "About Seb Moon — multi-disciplinary engineering student focused on product design, mechatronics and manufacturing.",
  "/about",
);

/*
 * CONTENT PLACEHOLDER — the structure below is final, the copy is not.
 * Education, skills matrix and CV download need source material from Seb
 * (tracked in docs/decisions and the project decision log).
 */
export default function AboutPage() {
  return (
    <Container className="py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <div className="mt-6 max-w-prose space-y-4 leading-relaxed">
        <p>
          I&apos;m Seb, a multi-disciplinary engineering student. I care about
          designing products around the people who use them — and then
          actually building and testing them.
        </p>
        <p>
          My work spans user-centred product design (assistive and health
          products), mechatronics and robotics (ROS2, embedded systems), and
          hands-on manufacturing (machining, 3D printing, metrology).
        </p>
        <p className="text-muted">
          A fuller biography, education history, skills matrix and
          downloadable CV are on their way.
        </p>
      </div>
    </Container>
  );
}
