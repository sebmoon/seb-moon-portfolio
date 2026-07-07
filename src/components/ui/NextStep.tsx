import Link from "next/link";

/**
 * End-of-page signpost: every page closes with one clear next step so
 * visitors are never left at a dead end.
 */
export function NextStep({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="mt-20 rounded-xl border border-line bg-surface p-8 text-center">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {description && (
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted">{description}</p>
      )}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={primary.href}
          className="rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-85"
        >
          {primary.label}
        </Link>
        {secondary && (
          <Link
            href={secondary.href}
            className="rounded-lg border border-ink/20 bg-paper px-5 py-2.5 text-sm font-medium transition-colors hover:border-ink"
          >
            {secondary.label}
          </Link>
        )}
      </div>
    </section>
  );
}
