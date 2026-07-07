import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/layout/Container";
import { NextStep } from "@/components/ui/NextStep";
import { ProjectFilter } from "@/features/project-filter/ProjectFilter";
import { getAllProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Projects",
  "Engineering projects by Seb Moon — product design, mechatronics, manufacturing and CAD, presented as case studies.",
  "/projects",
);

export default function ProjectsPage() {
  const projects = getAllProjects();
  const flagship = projects[0];

  return (
    <Container className="py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-3 max-w-2xl text-muted">
        {projects.length} projects across product design, mechatronics,
        manufacturing and visualisation. Flagship case studies document the
        full engineering process; the rest are focused skill demonstrations.
      </p>
      <div className="mt-10">
        {/* Suspense boundary required for the URL-synced filter */}
        <Suspense fallback={null}>
          <ProjectFilter projects={projects} />
        </Suspense>
      </div>
      <NextStep
        title="Want the story behind the work?"
        description="Start with the flagship case study, or get in touch and I'll walk you through the rest."
        primary={{
          href: `/projects/${flagship.slug}`,
          label: `Start with ${flagship.title.split("—")[0].trim()} →`,
        }}
        secondary={{ href: "/contact", label: "Get in touch" }}
      />
    </Container>
  );
}
