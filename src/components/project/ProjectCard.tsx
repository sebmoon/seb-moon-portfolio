import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";
import { DisciplineTag } from "@/components/ui/Tag";

/**
 * The whole card is clickable via a stretched link (the `after:absolute
 * after:inset-0` on the title link), with an explicit "View project →"
 * affordance. Discipline tags sit above the stretched link (z-10) and go
 * to the filtered projects view instead.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-paper transition-all duration-200 hover:border-ink/40 hover:shadow-md focus-within:border-ink/40">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-surface">
        {project.hero ? (
          <Image
            src={project.hero.src}
            alt={project.hero.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full items-center justify-center text-sm text-muted"
          >
            Image coming soon
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold tracking-tight">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted">
          {project.summary}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-muted">{project.year}</span>
          {project.disciplines.map((d) => (
            <DisciplineTag key={d} discipline={d} />
          ))}
        </div>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
          View project
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </span>
      </div>
    </article>
  );
}
