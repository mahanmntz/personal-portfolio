import Image from "next/image";
import Link from "next/link";
import { projectsQuery } from "@/lib/sanity.query";
import type { ProjectType } from "@/types";
import { Slide } from "../../animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import EmptyState from "../shared/EmptyState";
import { HiArrowRight } from "react-icons/hi";
import ScrambleText from "../../animation/ScrambleText";
import StackIcons from "../shared/StackIcons";

export default async function FeaturedProjects() {
  const projects: ProjectType[] = await sanityFetch({
    query: projectsQuery,
    tags: ["project"],
  });

  return (
    <section className="mt-20 md:mt-28">
      <Slide delay={0.16}>
        <div className="mb-16 flex items-end justify-between gap-4">
          <h2 className="font-incognito text-4xl font-bold tracking-tight">
            <ScrambleText text="Projects" />
          </h2>
          {projects.length > 0 && (
            <Link
              href="/projects"
              className="group flex items-center gap-x-1 text-sm dark:text-zinc-400 text-zinc-600 hover:dark:text-primary-color hover:text-tertiary-color duration-300"
            >
              View all
              <HiArrowRight className="group-hover:translate-x-1 duration-300" />
            </Link>
          )}
        </div>
      </Slide>

      {projects.length > 0 ? (
        <Slide delay={0.18}>
          <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
            {projects.slice(0, 6).map((project) => (
              <Link
                href={`/projects/${project.slug}`}
                key={project._id}
                className="flex items-center gap-x-4 dark:bg-primary-bg bg-zinc-50 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 p-4 rounded-lg duration-300 hover:-translate-y-1"
              >
                {project.logo ? (
                  <Image
                    src={project.logo}
                    width={60}
                    height={60}
                    alt={project.name}
                    className="dark:bg-zinc-800 bg-zinc-100 rounded-md p-2"
                  />
                ) : (
                  <div className="dark:bg-zinc-800 bg-zinc-100 p-2 rounded-md text-3xl">
                    🪴
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="text-lg tracking-wide mb-1">{project.name}</h3>
                  <p className="text-sm dark:text-zinc-400 text-zinc-600">
                    {project.tagline}
                  </p>
                  {project.stack && project.stack.length > 0 && (
                    <div className="mt-3">
                      <StackIcons stack={project.stack} />
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </Slide>
      ) : (
        <EmptyState value="Projects" />
      )}
    </section>
  );
}
