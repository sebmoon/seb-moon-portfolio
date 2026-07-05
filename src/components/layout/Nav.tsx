"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { cn } from "@/lib/cn";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Every nav item — including the "Seb Moon" wordmark — is a visible pill
 * button (thin darker border, rounded corners) so it reads as clickable at
 * a glance. The current page's pill is filled.
 */
function pillClasses(active: boolean, extra?: string) {
  return cn(
    "inline-flex items-center rounded-lg border px-3.5 py-1.5 text-sm transition-colors",
    active
      ? "border-ink bg-ink text-paper"
      : "border-ink/20 text-ink hover:border-ink hover:bg-surface",
    extra,
  );
}

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-line">
      <Container className="flex h-16 items-center justify-between gap-3">
        <Link
          href="/"
          aria-label="Seb Moon — home"
          className={pillClasses(pathname === "/", "font-semibold tracking-tight")}
        >
          Seb Moon
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-2 sm:gap-3">
            {links.map((l) => {
              const active = pathname.startsWith(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={pillClasses(active)}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
