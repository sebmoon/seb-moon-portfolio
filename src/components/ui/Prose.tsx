import { cn } from "@/lib/cn";

/**
 * Typographic wrapper for MDX case-study bodies. Deliberately hand-rolled
 * (no @tailwindcss/typography dependency): the handbook wants a controlled,
 * document-like reading experience and minimal dependencies.
 */
export function Prose({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "max-w-prose",
        "[&_h2]:mt-12 [&_h2]:scroll-mt-24 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight",
        "[&_h3]:mt-8 [&_h3]:text-base [&_h3]:font-semibold",
        "[&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-ink",
        "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1",
        "[&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5",
        "[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2",
        "[&_strong]:font-semibold",
        "[&_img]:mt-6 [&_img]:rounded-lg [&_img]:border [&_img]:border-line",
        "[&_figcaption]:mt-2 [&_figcaption]:text-sm [&_figcaption]:text-muted",
        "[&_table]:mt-6 [&_table]:w-full [&_table]:border-collapse [&_th]:border-b [&_th]:border-line [&_th]:py-2 [&_th]:text-left [&_td]:border-b [&_td]:border-line [&_td]:py-2",
        className,
      )}
    >
      {children}
    </div>
  );
}
