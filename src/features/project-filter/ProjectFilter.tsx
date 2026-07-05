"use client";

import { useMemo, useState } from "react";
import type { Discipline, Project } from "@/types/project";
import { DISCIPLINES } from "@/types/project";
import { ProjectCard } from "@/components/project/ProjectCard";
import { cn } from "@/lib/cn";

/**
 * The only client component at launch. Receives the full (small) project
 * list from the server and filters in memory — no fetching, no state library.
 */
export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Discipline | null>(null);

  const visible = useMemo(
    () =>
      active ? projects.filter((p) => p.disciplines.includes(active)) : projects,
    [projects, active],
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by discipline"
        className="flex flex-wrap gap-2"
      >
        <FilterButton selected={active === null} onClick={() => setActive(null)}>
          All ({projects.length})
        </FilterButton>
        {DISCIPLINES.map((d) => (
          <FilterButton
            key={d}
            selected={active === d}
            onClick={() => setActive(d)}
          >
            {d}
          </FilterButton>
        ))}
      </div>
      <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <li key={p.slug}>
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
      {visible.length === 0 && (
        <p className="mt-8 text-sm text-muted">No projects in this category.</p>
      )}
    </div>
  );
}

function FilterButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-sm transition-colors",
        selected
          ? "border-ink bg-ink text-paper"
          : "border-line bg-paper text-muted hover:border-ink hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
