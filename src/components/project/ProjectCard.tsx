import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";
import { Tag } from "@/components/ui/Tag";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group">
      <Link
        href={`/projects/${project.slug}`}
        className="block focus-visible:outline-2"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-surface">
          {project.hero ? (
            <Image
              src={project.hero.src}
              alt={project.hero.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
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
        <h3 className="mt-3 text-base font-semibold tracking-tight group-hover:underline">
          {project.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{project.summary}</p>
      </Link>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <span className="text-xs text-muted">{project.year}</span>
        {project.disciplines.map((d) => (
          <Tag key={d}>{d}</Tag>
        ))}
      </div>
    </article>
  );
}
