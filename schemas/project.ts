import { BiPackage } from "react-icons/bi";
import { defineField } from "sanity";
import { frameworkOptions, technologyOptions } from "@/app/data/tech";

const project = {
  name: "project",
  title: "Projects",
  description: "Project Schema",
  type: "document",
  icon: BiPackage,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "Enter the name of the project",
    },
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (rule) => rule.max(60).required(),
    }),
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Add a custom slug for the URL or generate one from the name",
      options: { source: "name" },
    },
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Lower numbers show first (1, 2, 3…). Leave empty to fall back to newest.",
    }),
    defineField({
      name: "frameworks",
      title: "Frameworks",
      type: "array",
      of: [{ type: "string" }],
      options: { list: frameworkOptions },
      description:
        "Main frameworks (React, Next.js, Flutter…). Shown as logos on cards & detail.",
    }),
    defineField({
      name: "technologies",
      title: "Technologies & Tools",
      type: "array",
      of: [{ type: "string" }],
      options: { list: technologyOptions },
      description:
        "Languages, databases & tools (Redis, PostgreSQL…). Shown on the project detail page.",
    }),
    {
      name: "logo",
      title: "Project Logo",
      type: "image",
    },
    {
      name: "projectUrl",
      title: "Project URL",
      type: "url",
      description: "Leaving this URL blank will add a coming soon to the link.",
    },
    {
      name: "repository",
      title: "Repository URL",
      type: "url",
      description:
        'Leaving this URL blank will add a "No Repository" message to the link.',
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description: "Upload a cover image for this project",
      options: {
        hotspot: true,
        metadata: ["lqip"],
      },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    },
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
      description: "Write a full description about this project",
    }),
  ],
};

export default project;
