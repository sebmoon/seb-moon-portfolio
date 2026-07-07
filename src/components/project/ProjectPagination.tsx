import Link from "next/link";
import { getAllProjects } from "@/lib/content";

/**
 * Previous/next chaining at the bottom of every case study — the highest
 * -value engagement fix: engaged readers get a next thing to read instead
 * of a dead end. Wraps around so the chain never ends.
 */
export function ProjectPagination({ currentSlug }: { currentSlug: string }) {
  const all = getAllProjects();
  const i = all.findIndex((p) => p.slug === currentSlug);
  if (i === -1 || all.length < 2) return null;
  const prev = all[(i - 1 + all.length) % all.length];
  const next = all[(i + 1) % all.length];

  return (
    <nav aria-label="More projects" className="mt-16 border-t border-line pt-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href={`/projects/${prev.slug}`}
          className="group rounded-xl border border-line p-5 transition-all hover:border-ink/40 hover:shadow-md"
        >
          <span className="text-sm text-muted">
            <span aria-hidden="true" className="mr-1 inline-block transition-transform group-hover:-translate-x-0.5">
              ←
            </span>
            Previous project
          </span>
          <span className="mt-1.5 block font-semibold tracking-tight">
            {prev.title}
          </span>
        </Link>
        <Link
          href={`/projects/${next.slug}`}
          className="group rounded-xl border border-line p-5 text-right transition-all hover:border-ink/40 hover:shadow-md"
        >
          <span className="text-sm text-muted">
            Next project
            <span aria-hidden="true" className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </span>
          <span className="mt-1.5 block font-semibold tracking-tight">
            {next.title}
          </span>
        </Link>
      </div>
      <p className="mt-6 text-center">
        <Link
          href="/projects"
          className="text-sm font-medium text-accent hover:underline"
        >
          All projects
        </Link>
      </p>
    </nav>
  );
}
