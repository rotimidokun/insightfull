import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { works, type Work } from "@/lib/works";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { EventHighlight } from "@/components/project/EventHighlight";
import { OtherProjects } from "@/components/project/OtherProjects";

// Opt out of the Next 16 "instant" shell for this route: `params` is read in the
// page body, which blocks the instant shell. The route is fully static via
// generateStaticParams, so blocking prerender is fine here.
export const instant = false;

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  return {
    title: work
      ? `${work.projectTitle ?? work.title} — Insightfull Creative`
      : "Insightfull Creative",
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) notFound();

  const others: Work[] = work.otherSlugs
    ? work.otherSlugs
        .map((s) => works.find((w) => w.slug === s))
        .filter((w): w is Work => Boolean(w))
    : works.filter((w) => w.slug !== slug).slice(0, 2);

  return (
    <>
      <ProjectHeader title={work.projectTitle ?? work.title} />
      {work.gallery ? <ProjectGallery gallery={work.gallery} /> : null}
      {work.eventHighlight ? <EventHighlight /> : null}
      {others.length > 0 ? <OtherProjects others={others} /> : null}
    </>
  );
}
