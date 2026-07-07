import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/project/ProjectCard";
import { NextStep } from "@/components/ui/NextStep";
import { TestimonialCarousel } from "@/features/testimonials/TestimonialCarousel";
import { getAllProjects, getFeaturedProjects } from "@/lib/content";
import { TESTIMONIALS } from "@/lib/testimonials";

export default function HomePage() {
  const featured = getFeaturedProjects();
  const total = getAllProjects().length;

  return (
    <>
      <section className="py-20 sm:py-28">
        <Container>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Product design engineer building robust, manufacturable products.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            MSc Advanced Manufacturing Engineering &amp; Management at
            Loughborough University (predicted Distinction), BEng (Hons)
            Product Design Engineering with DIS. Industry experience across
            agricultural, renewable-energy and sports engineering hardware —
            from first-principles concept work and CAD to prototyping,
            testing and manufacture. Every project below is an engineering
            case study: the problem, the decisions, the evidence.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              href="/projects"
              className="rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-85"
            >
              View projects
            </Link>
            <Link
              href="/about"
              className="rounded-lg border border-ink/20 px-5 py-2.5 text-sm font-medium transition-colors hover:border-ink hover:bg-surface"
            >
              About me
            </Link>
          </div>
        </Container>
      </section>

      <section aria-labelledby="featured-heading" className="py-8">
        <Container>
          <div className="flex items-baseline justify-between">
            <h2 id="featured-heading" className="text-xl font-semibold tracking-tight">
              Selected work
            </h2>
            <Link
              href="/projects"
              className="text-sm font-medium text-accent hover:underline"
            >
              All projects →
            </Link>
          </div>
          <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {featured.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="references-heading" className="py-16">
        <Container>
          <h2
            id="references-heading"
            className="text-center text-xl font-semibold tracking-tight"
          >
            In their words
          </h2>
          <p className="mt-2 text-center text-sm text-muted">
            From written recommendation letters — full copies available on
            request.
          </p>
          <div className="mx-auto mt-8 max-w-3xl">
            <TestimonialCarousel items={TESTIMONIALS} />
          </div>
          <div className="mx-auto max-w-3xl">
            <NextStep
              title="See the full body of work"
              description={`${total} projects across product design, mechatronics, manufacturing and visualisation — each one an engineering case study.`}
              primary={{ href: "/projects", label: "Explore all projects" }}
              secondary={{ href: "/contact", label: "Get in touch" }}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
