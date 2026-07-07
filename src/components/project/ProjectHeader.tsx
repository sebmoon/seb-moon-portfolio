import Image from "next/image";
import type { Project } from "@/types/project";
import { DisciplineTag, Tag } from "@/components/ui/Tag";

export function ProjectHeader({ project }: { project: Project }) {
  return (
    <header>
      <p className="text-sm text-muted">{project.year}</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
        {project.title}
      </h1>
      <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted">
        {project.summary}
      </p>
      <dl className="mt-6 grid grid-cols-1 gap-4 border-y border-line py-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-medium">Disciplines</dt>
          <dd className="mt-1 flex flex-wrap gap-1.5">
            {project.disciplines.map((d) => (
              <DisciplineTag key={d} discipline={d} />
            ))}
          </dd>
        </div>
        <div>
          <dt className="font-medium">My role</dt>
          <dd className="mt-1 flex flex-wrap gap-1.5">
            {project.roles.map((r) => (
              <Tag key={r}>{r}</Tag>
            ))}
          </dd>
        </div>
      </dl>
      {project.hero && (
        <figure className="mt-8">
          <Image
            src={project.hero.src}
            alt={project.hero.alt}
            width={project.hero.width}
            height={project.hero.height}
            priority
            sizes="(min-width: 1024px) 960px, 100vw"
            className="w-full rounded-lg border border-line"
          />
          {project.hero.caption && (
            <figcaption className="mt-2 text-sm text-muted">
              {project.hero.caption}
            </figcaption>
          )}
        </figure>
      )}
    </header>
  );
}
