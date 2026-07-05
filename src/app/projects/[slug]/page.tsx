import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { Container } from "@/components/layout/Container";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { Prose } from "@/components/ui/Prose";
import { getAllProjects, getProject } from "@/lib/content";
import { pageMetadata, projectJsonLd } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata(project.title, project.summary, `/projects/${slug}`);
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { content } = await compileMDX({ source: project.body });

  return (
    <Container className="py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectJsonLd(project)),
        }}
      />
      <article>
        <ProjectHeader project={project} />
        <Prose className="mt-4">{content}</Prose>
      </article>
    </Container>
  );
}
