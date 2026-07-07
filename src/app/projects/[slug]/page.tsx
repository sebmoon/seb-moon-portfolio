import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { Container } from "@/components/layout/Container";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { ProjectPagination } from "@/components/project/ProjectPagination";
import { Prose } from "@/components/ui/Prose";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
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
        {project.highlight && (
          <aside
            aria-label="Recognition"
            className="mt-8 max-w-prose rounded-lg border-l-4 border-accent bg-surface px-5 py-4 text-sm leading-relaxed"
          >
            {project.highlight}
          </aside>
        )}
        <Prose className="mt-4">{content}</Prose>
        {project.videos && project.videos.length > 0 && (
          <section aria-label="Videos" className="mt-12 max-w-prose space-y-6">
            {project.videos.map((v) => (
              <YouTubeEmbed
                key={v.youtubeId}
                youtubeId={v.youtubeId}
                title={v.title}
                start={v.start}
              />
            ))}
          </section>
        )}
      </article>
      <ProjectPagination currentSlug={project.slug} />
    </Container>
  );
}
