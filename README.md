# Your Name — personal portfolio

A static, three-page Astro website using vanilla CSS. Astro is the only direct npm dependency. No backend, database, CMS, or newsletter service is included.

## Run locally

Install Node.js 22.12 or newer (Node 22 LTS is recommended), then open a terminal in this project:

```sh
npm install
npm run dev
```

Open the localhost address printed in the terminal (usually http://localhost:4321). Stop the server with Ctrl+C.

## Build and preview

```sh
npm run build
npm run preview
```

The production files are generated in `dist/`. Commit `package-lock.json` so installations are reproducible; use `npm ci` for a clean installation from that lockfile.

## Replace the placeholders

- `src/pages/index.astro`: homepage introduction and about teaser.
- `src/pages/about.astro`: your personal story, interests, and current snapshot.
- `src/pages/projects.astro`: archive introduction.
- `src/data/projects.js`: shared project list. Add entries to expand the archive; the homepage displays the first three. Set a project's `href` to a real destination when available. There are no fake project links.
- `src/components/Navbar.astro` and `Footer.astro`: name and footer text.
- `src/components/NewsletterSignup.astro`: newsletter copy and future integration point.
- `src/layouts/BaseLayout.astro`: shared metadata, fonts, and site name. Page titles and descriptions live in each page.
- `src/styles/global.css`: colors, type, spacing, and responsive layouts.
- `public/favicon.svg`: placeholder favicon.
- `public/JoharyPic.jpeg`: original homepage portrait. The homepage uses `/JoharyPic.jpeg` directly; Astro copies the public asset unchanged to `dist/JoharyPic.jpeg`. CSS controls its responsive display size.

Rowan and Quilon load from Fontshare with `display=swap`. System fonts provide a fallback when the service is unavailable.

The newsletter uses native required/email validation and a tiny local script to show an explicit coming-soon response. It clears the input and never stores or sends it. Without JavaScript, the button stays disabled. Its input has no `name` so even a native form submission cannot serialize the email. The code comment identifies where to connect your future provider; update the form handling, copy, and no-JavaScript behavior together when doing so.

Set `SITE_URL` to your real public origin (for example `https://your-domain.com`) when building to enable canonical and Open Graph URLs. It is intentionally unset until you know the domain. For a local build:

```sh
SITE_URL=https://your-domain.com npm run build
```

There are no case-study pages yet. You can later add `src/pages/projects/your-project.astro` and link it through `href`. Blog pages, Markdown content, analytics, and social links can be added independently without changing the current structure.

## Push to GitHub

Create an empty repository on GitHub. This workspace already uses Git; review your remote with `git remote -v`. Commit your files:

```sh
git add .
git commit -m "Build initial Astro portfolio"
```

If no `origin` remote exists, add the URL shown by GitHub:

```sh
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
```

Push your current branch with `git push -u origin HEAD`. If you are working on a feature branch, open a pull request and merge it into the branch you want to deploy. Never commit `.env` files or `node_modules`.

## Deploy to Cloudflare Pages

1. Sign in to Cloudflare and open **Workers & Pages**. Create a **Pages** project and choose **Connect to Git** (the UI may also call this importing an existing Git repository).
2. Authorize GitHub and select your repository and production branch, usually `main`.
3. Select the **Astro** framework preset. Use **`npm run build`** as the build command and **`dist`** as the output directory. Leave the root directory empty when this project is at the repository root.
4. Set the build environment variable `NODE_VERSION` to `22`. When you know the final public URL, set `SITE_URL` to that URL too.
5. Save and deploy. Cloudflare supplies a `pages.dev` URL. Push changes to the production branch to trigger future deployments; other branches can create previews.
6. A custom domain can be connected later from the Pages project's **Custom domains** settings. Update `SITE_URL` and redeploy if the canonical domain changes.

This is a fully static build. No Cloudflare adapter, Functions, Wrangler package, or bindings are necessary.

`wrangler.json` also provides an optional assets-only Cloudflare Workers deployment configuration: it serves `./dist`, uses compatibility date `2026-10-03`, and has no Worker entry point or SSR adapter. This uses Workers static-asset hosting; the Pages workflow above still uses `npm run build` and `dist`. Build before using Wrangler to deploy. Wrangler is not installed as a project dependency.

References: [Astro setup](https://docs.astro.build/en/install-and-setup/), [Cloudflare Pages Astro guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/), [Cloudflare build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/).

## Verification notes

The production build generates exactly three pages. Verified in an isolated Chrome browser at 375px, 768px, and 1440px: no horizontal overflow, correct active navigation, one main heading per page, working Fontshare fonts, and no JavaScript exceptions. Native email validation, the coming-soon response, input clearing, and the disabled no-JavaScript form were also checked.

The installed Astro version is 7.3.5. At the time of setup, `npm audit` reports a high-severity advisory in Astro's transitive `http-cache-semantics` dependency (and flags Astro through that dependency). No patched release of that dependency is available. This site has no shared response cache or backend; review upstream updates before adding server features.
