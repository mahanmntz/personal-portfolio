import Image from "next/image";
import { Metadata } from "next";
import { singleProjectQuery, projectPathsQuery } from "@/lib/sanity.query";
import type { ProjectType } from "@/types";
import { PortableText } from "@portabletext/react";
import { CustomPortableText } from "@/app/components/shared/CustomPortableText";
import { Slide } from "../../animation/Slide";
import { urlFor } from "@/lib/sanity.image";
import { sanityFetch } from "@/lib/sanity.client";
import { BiLinkExternal, BiLogoGithub } from "react-icons/bi";
import StackIcons from "@/app/components/shared/StackIcons";

type Props = {
  params: {
    project: string;
  };
};

const fallbackImage: string =
  "/og.png";

// Static export: only build the projects returned below; 404 anything else.
export const dynamicParams = false;

// Pre-build a static page for every project at build time
export async function generateStaticParams() {
  const projects: { slug: string }[] = await sanityFetch({
    query: projectPathsQuery,
    tags: ["project"],
  });
  return projects.map((project) => ({ project: project.slug }));
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.project;
  const project: ProjectType = await sanityFetch({
    query: singleProjectQuery,
    tags: ["project"],
    qParams: { slug },
  });

  return {
    title: `${project.name} | Project`,
    metadataBase: new URL(`https://mahanmontazeri.ir/projects/${project.slug}`),
    description: project.tagline,
    openGraph: {
      images: project.coverImage
        ? urlFor(project.coverImage.image).width(1200).height(630).url()
        : fallbackImage,
      url: `https://mahanmontazeri.ir/projects/${project.slug}`,
      title: project.name,
      description: project.tagline,
    },
  };
}

export default async function Project({ params }: Props) {
  const slug = params.project;
  const project: ProjectType = await sanityFetch({
    query: singleProjectQuery,
    tags: ["project"],
    qParams: { slug },
  });

  return (
    <main className="max-w-6xl mx-auto lg:px-16 px-8">
      <Slide>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start justify-between flex-wrap mb-4">
            <h1 className="font-incognito font-black tracking-tight sm:text-5xl text-3xl mb-4 max-w-md">
              {project.name}
            </h1>

            <div className="flex items-center gap-x-2">
              <a
                href={project.projectUrl}
                rel="noreferrer noopener"
                target="_blank"
                className={`flex items-center gap-x-2 dark:bg-primary-bg bg-secondary-bg dark:text-white text-zinc-700 border border-transparent rounded-md px-4 py-2 duration-200 ${
                  !project.projectUrl
                    ? "cursor-not-allowed opacity-80"
                    : "cursor-pointer hover:dark:border-zinc-700 hover:border-zinc-200"
                }`}
              >
                <BiLinkExternal aria-hidden="true" />
                {project.projectUrl ? "Live URL" : "Coming Soon"}
              </a>

              <a
                href={project.repository}
                rel="noreferrer noopener"
                target="_blank"
                className={`flex items-center gap-x-2 dark:bg-primary-bg bg-secondary-bg dark:text-white text-zinc-700 border border-transparent rounded-md px-4 py-2 duration-200 ${
                  !project.repository
                    ? "cursor-not-allowed opacity-80"
                    : "cursor-pointer hover:dark:border-zinc-700 hover:border-zinc-200"
                }`}
              >
                <BiLogoGithub aria-hidden="true" />
                {project.repository ? "GitHub" : "No Repo"}
              </a>
            </div>
          </div>

          {((project.frameworks && project.frameworks.length > 0) ||
            (project.technologies && project.technologies.length > 0)) && (
            <div className="mb-8 flex flex-col gap-4">
              {project.frameworks && project.frameworks.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="w-24 text-sm dark:text-zinc-400 text-zinc-500">
                    Built with
                  </span>
                  <StackIcons stack={project.frameworks} size="md" />
                </div>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="w-24 text-sm dark:text-zinc-400 text-zinc-500">
                    Technologies
                  </span>
                  <StackIcons stack={project.technologies} size="md" />
                </div>
              )}
            </div>
          )}

          {project.coverImage?.image && (
            <div className="relative w-full h-40 pt-[52.5%]">
              <Image
                className="rounded-xl border dark:border-zinc-800 border-zinc-100 object-cover"
                fill
                src={project.coverImage.image}
                alt={project.coverImage.alt ?? project.name}
                quality={100}
                placeholder={project.coverImage?.lqip ? `blur` : "empty"}
                blurDataURL={project.coverImage?.lqip || ""}
              />
            </div>
          )}

          <div className="mt-8 dark:text-zinc-400 text-zinc-600 leading-relaxed">
            <PortableText
              value={project.description}
              components={CustomPortableText}
            />
          </div>
        </div>
      </Slide>
    </main>
  );
}
