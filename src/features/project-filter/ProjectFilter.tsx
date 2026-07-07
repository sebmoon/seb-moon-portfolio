"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Discipline, Project } from "@/types/project";
import { DISCIPLINES } from "@/types/project";
import { ProjectCard } from "@/components/project/ProjectCard";
import { cn } from "@/lib/cn";

function parseDiscipline(value: string | null): Discipline | null {
  return (DISCIPLINES as readonly string[]).includes(value ?? "")
    ? (value as Discipline)
    : null;
}

/**
 * Client-side discipline filter, synced with the `?d=` query parameter so
 * discipline tags anywhere on the site can deep-link into a filtered view
 * and filtered views are shareable URLs.
 */
export function ProjectFilter({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const param = parseDiscipline(searchParams.get("d"));
  const [active, setActive] = useState<Discipline | null>(param);

  // Follow external navigation (e.g. a tag click while already on this page).
  useEffect(() => {
    setActive(param);
  }, [param]);

  function select(d: Discipline | null) {
    setActive(d);
    router.replace(d ? `/projects?d=${encodeURIComponent(d)}` : "/projects", {
      scroll: false,
    });
  }

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
        <FilterButton selected={active === null} onClick={() => select(null)}>
          All ({projects.length})
        </FilterButton>
        {DISCIPLINES.map((d) => (
          <FilterButton
            key={d}
            selected={active === d}
            onClick={() => select(d)}
          >
            {d}
          </FilterButton>
        ))}
      </div>
      <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <li key={p.slug}>
            <ProjectCard project={p} />
          </li>
        ))}
        {/* Placeholder — not a project page, just a signpost for what's coming */}
        <li>
          <div className="flex h-full min-h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-line bg-surface p-6 text-center">
            <span className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-medium text-muted">
              In progress
            </span>
            <h3 className="mt-4 text-base font-semibold tracking-tight">
              MSc projects — coming soon
            </h3>
            <p className="mt-2 max-w-xs text-sm text-muted">
              Case studies from my Advanced Manufacturing Engineering and
              Management MSc — robotics, automation and machine learning —
              will be published here as they complete.
            </p>
          </div>
        </li>
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
