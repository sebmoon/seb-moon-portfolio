import Link from "next/link";
import { cn } from "@/lib/cn";

const tagClasses =
  "inline-block rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs text-muted";

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className={tagClasses}>{children}</span>;
}

/**
 * A discipline tag that links to the filtered projects view. `relative z-10`
 * lifts it above the stretched card link in ProjectCard so it stays clickable.
 */
export function DisciplineTag({ discipline }: { discipline: string }) {
  return (
    <Link
      href={`/projects?d=${encodeURIComponent(discipline)}`}
      className={cn(
        tagClasses,
        "relative z-10 transition-colors hover:border-ink hover:text-ink",
      )}
    >
      {discipline}
    </Link>
  );
}
