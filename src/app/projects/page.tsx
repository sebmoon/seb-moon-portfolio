import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
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

  return (
    <Container className="py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-3 max-w-2xl text-muted">
        {projects.length} projects across product design, mechatronics,
        manufacturing and visualisation. Flagship case studies document the
        full engineering process; the rest are focused skill demonstrations.
      </p>
      <div className="mt-10">
        <ProjectFilter projects={projects} />
      </div>
    </Container>
  );
}
