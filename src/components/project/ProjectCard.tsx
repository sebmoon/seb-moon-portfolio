import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";
import { Tag } from "@/components/ui/Tag";

/**
 * The whole card is one link with an explicit "View project →" affordance —
 * user testing showed visitors didn't realise the images were clickable.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group h-full overflow-hidden rounded-xl border border-line bg-paper transition-all duration-200 hover:border-ink/40 hover:shadow-md focus-within:border-ink/40">
      <Link
        href={`/projects/${project.slug}`}
        className="flex h-full flex-col focus-visible:outline-none"
      >
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
            {project.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm text-muted">
            {project.summary}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-muted">{project.year}</span>
            {project.disciplines.map((d) => (
              <Tag key={d}>{d}</Tag>
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
      </Link>
    </article>
  );
}
