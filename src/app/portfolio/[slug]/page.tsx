import { notFound } from "next/navigation";
import { projects, getSubItems } from "../../../../data/projects";
import ClientProjectPage from "./ClientProjectPage";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Not Found / Michael Pasyechnyk" };
  }

  return { title: `${project.title} / Michael Pasyechnyk` };
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  return <ClientProjectPage project={project} subItems={getSubItems(project)} />;
}
