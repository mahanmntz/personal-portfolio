<div align="center">
<a href="https://mahanmontazeri.ir"><img src="./public/logo.png" width="60px"></a>
</div>

<div align="center">
<h1>Mahan Montazeri</h1>
<p>My personal portfolio website — built with Next.js & Sanity.</p>
</div>

## Tech Stack

- [Next.js][nextjs] — React framework (App Router)
- [Sanity.io][sanity] — Headless CMS & Content Lake
- [TailwindCSS][tailwind] — Styling and UI
- [Framer Motion][framer] — Animations
- [Next Themes][nexttheme] — Dark / light mode
- [React Refractor][reactrefractor] — Code syntax highlighting
- [giscus][giscus] — Blog comments (GitHub Discussions)
- [Vercel][vercel] — Hosting & deployment

## Project Overview

- **Public site** — a fully static site (`output: "export"`), content is baked in at build time.
- **Studio** — the Sanity Studio is embedded at [`/studio`](http://localhost:3000/studio) and used to manage all content (profile, work experience, projects, blog posts).

## Run Locally

```bash
git clone https://github.com/mahanmntz/personal-portfolio.git
cd personal-portfolio
npm install
```

Create a `.env` file in the root with the following variables:

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2023-07-21"
# Optional — only needed to read drafts. Leave unset in production (public dataset).
NEXT_PUBLIC_SANITY_ACCESS_TOKEN=""

# Blog comments (giscus) — from https://giscus.app
NEXT_PUBLIC_GISCUS_REPO="mahanmntz/personal-portfolio"
NEXT_PUBLIC_GISCUS_REPOID=""
NEXT_PUBLIC_GISCUS_CATEGORYID=""

# GitHub contribution graph
NEXT_PUBLIC_GITHUB_USERNAME="mahanmntz"
NEXT_PUBLIC_GITHUB_JOIN_YEAR="2022"
```

> The Sanity values come from your own Sanity project. Create one with
> `npm create sanity@latest` (or at [sanity.io/manage][sanity-manage]) and copy the
> `projectId` / `dataset`.

Then start the dev server:

```bash
npm run dev
```

- Site → [http://localhost:3000](http://localhost:3000)
- Studio → [http://localhost:3000/studio](http://localhost:3000/studio)

The site is empty until you add content. Open the studio, create & **publish** a
**Profile** (required), plus any **Projects**, **Work Experience** and **Blog Posts**.

## Build & Deploy

This project is configured for **static export** — `npm run build` outputs a fully
static site into `./out`, with all Sanity data baked in at build time.

```bash
npm run build
```

> The static build pre-renders every blog post and project, so you need at least
> **one published Project** and **one published Post** for the build to succeed.

Deploy the `out/` folder to any static host (Vercel, ArvanCloud, Netlify, etc.).
On Vercel, just import the repo and add the env variables above — Vercel runs the
build for you. To update the live site after editing content, trigger a redeploy.

## Important Files

| File | Description |
| --- | --- |
| [`sanity.config.ts`](sanity.config.ts) | Sanity Studio configuration |
| [`lib/sanity.client.ts`](lib/sanity.client.ts) | Sanity client used for fetching |
| [`lib/sanity.query.ts`](lib/sanity.query.ts) | GROQ queries |
| [`app/studio`](app/studio) | Where the embedded Studio is mounted |
| [`schemas`](schemas) | Content types (schemas) |
| [`app/data/social.ts`](app/data/social.ts) | Social links config |

## Credits

This site is based on the open-source [victoreke.com][original] portfolio template by
[Victor Eke][victor] (MIT-licensed). Huge thanks for sharing it.

## License

MIT.

<!-- Link Refs -->

[nextjs]: https://nextjs.org
[vercel]: https://vercel.com
[sanity]: https://sanity.io
[tailwind]: https://tailwindcss.com
[framer]: https://www.framer.com/motion/
[nexttheme]: https://github.com/pacocoursey/next-themes
[reactrefractor]: https://github.com/rexxars/react-refractor
[giscus]: https://giscus.app
[sanity-manage]: https://sanity.io/manage
[original]: https://github.com/Evavic44/victoreke.com
[victor]: https://github.com/Evavic44
