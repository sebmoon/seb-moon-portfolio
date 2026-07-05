import Link from "next/link";
import { Container } from "./Container";
import { SITE } from "@/lib/seo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line py-10">
      <Container className="flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Seb Moon</p>
        <p>
          <a
            href={SITE.linkedin}
            rel="noopener noreferrer"
            target="_blank"
            className="hover:text-ink"
          >
            LinkedIn
          </a>
          <span aria-hidden="true" className="mx-2">
            ·
          </span>
          <Link href="/contact" className="hover:text-ink">
            Contact
          </Link>
        </p>
      </Container>
    </footer>
  );
}
