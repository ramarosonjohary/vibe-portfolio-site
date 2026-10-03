# Portfolio project guide

This file documents the first-version requirements, implementation, and maintenance rules for agents working anywhere in this repository. Follow the user's current instructions when they change the scope. Keep this file and `README.md` accurate as the project evolves.

## Purpose and scope

Build a simple personal website that introduces its owner and encourages visitors to join a future newsletter. Prioritize simplicity, fast performance, easy editing, and code a beginner or another LLM can understand.

The first version has exactly three pages:

- `/`: editorial hero, short introduction, Projects and About links, three selected projects, about teaser, and newsletter signup preview.
- `/about`: narrative introduction, personal story, interests, currently/previously/interested-in snapshot, and newsletter signup preview.
- `/projects`: six placeholder projects in an expandable text-led archive and newsletter signup preview.

All personal content is intentionally placeholder content. Use labels such as “Your Name,” “Project Title,” “Your story goes here,” and “2026.” Do not invent achievements, employers, schools, jobs, awards, or detailed personal history. Do not add case-study pages or other routes unless requested or essential to basic functionality.

## Stack and dependency policy

- Astro with static rendering (`output: 'static'`).
- Vanilla CSS and minimal browser JavaScript.
- npm with a committed `package-lock.json`.
- GitHub for source control; Cloudflare Pages is the hosting target.
- Astro is the only direct dependency; the initial completed version uses Astro 7.3.5 with package range `^7.3.5`.
- Node.js 22.12 or newer; `.nvmrc` selects Node 22.

Only add a dependency when the problem cannot reasonably be solved with Astro, CSS, or native browser APIs. Do not introduce React, Next.js, Tailwind, Bootstrap, component libraries, animation libraries, a database, authentication, CMS, or backend. The static site does not require a Cloudflare adapter, Functions, Wrangler, or bindings.

## Visual direction

Keep the design clean, minimal, bold, editorial, modern, personal, spacious, and professional without a corporate résumé aesthetic. Typography, spacing, hierarchy, and a scarce vivid red accent should carry the identity. Prefer open layouts, simple grids, numbered project rows, restrained widths, fine horizontal rules, and generous margins over cards and containers.

Use white, very light grey, near-black text, and one red accent. The implemented accent is `#d91428`, a slightly darker adjustment of the requested `#F21B2D` for contrast. Red belongs in small labels, project numbers, active navigation, link states, arrows, selection, and the newsletter button. Avoid large red sections, dark mode, gradients, glowing cards, glassmorphism, excessive rounding, stock photos, and image-heavy project cards.

Load the requested Fontshare stylesheet:

```html
<link href="https://api.fontshare.com/v2/css?f[]=rowan@400&f[]=quilon@500&display=swap" rel="stylesheet">
```

- `'Rowan', Georgia, serif`: large headings and editorial display text.
- `'Quilon', Arial, sans-serif`: body copy, navigation, buttons, labels, and metadata.

Retain font fallbacks and `display=swap`. Use mobile-first layouts and fluid `clamp()` typography. Support mobile, tablet, laptop, and large desktop screens. Keep motion subtle and respect `prefers-reduced-motion`; never add scroll-jacking, parallax, complex transitions, or large entrance animations.

## File map and editing

```text
astro.config.mjs             Static build; optional SITE_URL
wrangler.json               Optional assets-only deployment; ./dist, no entry point
package.json                npm scripts and Astro dependency
package-lock.json           Reproducible dependency tree
.nvmrc                      Node version
.gitignore                  Excludes output, dependencies, and local secrets
README.md                   Beginner setup and deployment guide
AGENTS.md                   Project requirements and agent guidance
public/favicon.svg          Simple placeholder favicon
public/JoharyPic.jpeg        User-provided homepage portrait; preserve the original
src/
  components/
    Navbar.astro            Wordmark, three links, current-page indication
    Footer.astro            Wordmark, short text, current copyright year
    NewsletterSignup.astro  Shared local-only email form preview
    ProjectCard.astro       Semantic project list row
  data/
    projects.js             Shared project records
  layouts/
    BaseLayout.astro        Document shell, metadata, fonts, navigation, footer
  pages/
    index.astro             Homepage content and first three projects
    about.astro             Narrative content and personal snapshot
    projects.astro          Archive of all project records
  styles/
    global.css              Shared design tokens and responsive CSS
```

Edit page copy in the corresponding `.astro` page. Edit the name in Navbar, Footer, page metadata, and BaseLayout's site-name metadata. Edit project records in `src/data/projects.js`; each record supports `number`, `title`, `description`, `category`, `year`, `status`, and optional `href`. A missing `href` renders a title without a fake link. The homepage selects the first three records, and the archive count derives from the array length.

Keep the component structure small. Do not extract every HTML fragment, introduce complicated TypeScript architecture, or add clever abstractions. Use light comments for decisions and integration points. Define shared colors, spacing, content width, typography, and borders with readable CSS custom properties. Avoid deeply nested selectors and excessive utilities.

The homepage's hero includes the user-provided portrait from `public/JoharyPic.jpeg`. It uses Astro's built-in `Image` component, responsive WebP widths, intrinsic dimensions, descriptive alt text, and eager loading because it appears above the fold. It sits alongside the hero copy on desktop and stacks after the copy on smaller screens. Keep the original image intact and use built-in optimization rather than adding an image dependency.

## Newsletter contract

The first version is a visual interaction demonstration only. Do not connect a provider, email API, database, or storage without a new request. This includes Substack, Beehiiv, Buttondown, ConvertKit/Kit, and Mailchimp.

Preserve these behaviors:

- Semantic `<form>` with an explicit accessible label.
- Required `type="email"` input and native browser validation.
- Clear “Join” submit button.
- Prevent actual submission in the local handler.
- Show an honest “Newsletter integration coming soon” response, explicitly saying the visitor has not been subscribed.
- Never send, store, log, or persist the email; clear the field after a valid preview submission.
- The input intentionally has no `name`, preventing native form serialization of the email.
- The button is disabled in the initial HTML and enabled by the script; without JavaScript, explanatory text remains and signup stays unavailable.
- Maintain the code comment identifying the future integration point.

When a real integration is requested, update form handling, copy, labels, privacy behavior, and the no-JavaScript experience together. Never simulate a successful real subscription.

## Accessibility, metadata, and performance

Use semantic header, navigation, main, section, list, and footer elements. Maintain one `h1` per page and a logical heading hierarchy. Keep the skip link, meaningful link text, visible keyboard focus, form labels, live status message, sufficient contrast, and keyboard-accessible controls. Active navigation uses both color and an underline. Avoid conveying meaning only through color.

BaseLayout provides the language, charset, viewport, title, description, Open Graph title/description/type/site name, favicon, and theme color. Page-specific titles are “Your Name — Personal Website,” “About — Your Name,” and “Projects — Your Name.” Keep all placeholder metadata easy to replace.

Set `SITE_URL` to the real public origin at build time to enable canonical and Open Graph URLs. Leave it unset when the domain is unknown rather than publishing an invented canonical domain.

Preserve static-first behavior, minimal JavaScript, no client-side framework hydration, no large images, and no unused packages. Aim for strong Lighthouse performance and accessibility scores, but do not claim measured scores without running the audit.

## Local commands

Run commands from the repository root:

```sh
npm install       # First installation
npm ci            # Clean installation using the existing lockfile
npm run dev       # Use the localhost URL printed by Astro
npm run build     # Generates dist/
npm run preview   # Serves the production build locally
```

The default local port is usually 4321; use the actual printed address. Do not assume a server from an earlier agent session is still running. The initial handoff also ran a development server on `127.0.0.1:4322`.

For a canonical production build:

```sh
SITE_URL=https://your-domain.com npm run build
```

Never commit `node_modules/`, `dist/`, `.astro/`, `.env` files, or credentials. These paths are ignored.

## Verification and completion

For implementation changes, run the production build and resolve errors before finishing. Start the project and verify the affected pages locally. Check visual consistency and representative mobile, tablet, and desktop widths, navigation, headings, focus states, form behavior, console errors, and horizontal overflow. Use checks appropriate to the change; documentation-only edits do not need a new application build.

The first version was built successfully and checked in an isolated headless Chrome browser at 375px, 768px, and 1440px. All three routes had one main heading, correct active navigation, loaded fonts, no horizontal overflow, and no JavaScript exceptions. Email validation, the coming-soon response, cleared input, absence of a serialized email field, and disabled no-JavaScript submission were verified. Desktop and mobile screenshots were visually reviewed. These are historical checks, not a guarantee for future changes.

At the initial handoff, `npm audit` reported a high-severity advisory in Astro's transitive `http-cache-semantics` dependency and flagged Astro through it. The registry offered no patched version of that dependency. The site has no shared response cache or backend. Recheck the current audit and upstream releases when updating dependencies; do not blindly apply `npm audit fix --force` or downgrade Astro to an obsolete major version. Document any unresolved finding accurately.

Only the newsletter integration and content replacement are intentionally unfinished. GitHub pushing and Cloudflare deployment were documented, not performed. Final reports should distinguish completed local verification from deployment and explain any material limitation.

## GitHub workflow

Inspect the current branch, changes, and remote before making source-control changes. Do not overwrite existing remotes or unrelated work.

To publish manually, create an empty GitHub repository, then:

```sh
git remote -v
git add .
git commit -m "Build initial Astro portfolio"
# Only if origin does not already exist:
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin HEAD
```

For a feature branch, open a pull request and merge into the intended production branch. The commands above are instructions; their presence does not itself request a push or merge.

## Cloudflare Pages deployment

1. Open Cloudflare's Workers & Pages dashboard and create a Pages project connected to Git.
2. Authorize GitHub, select the repository, and choose the production branch, usually `main`.
3. Choose the Astro framework preset.
4. Set the build command to `npm run build` and the output directory to `dist`. Leave the root directory empty if this project is at the repository root.
5. Set `NODE_VERSION=22`. Set `SITE_URL` to the final public origin when known.
6. Save and deploy. Cloudflare supplies a `pages.dev` address; production-branch pushes trigger subsequent deployments, and other branches can have previews.
7. Add a custom domain later in the project's Custom domains settings, update `SITE_URL`, and rebuild.

Dashboard labels can change. Use official documentation when checking current deployment details:

The root `wrangler.json` configures optional Cloudflare Workers static-asset hosting with `assets.directory: "./dist"` and compatibility date `2026-10-03`. It intentionally has no `main`, binding, SSR adapter, or backend. Pages Git deployments continue using the build settings above. No Wrangler dependency is installed. Keep this distinction clear when editing deployment instructions.

- https://docs.astro.build/en/install-and-setup/
- https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
- https://developers.cloudflare.com/pages/configuration/build-configuration/

## Future extensions

Keep room for real newsletter integration, individual project case studies, a blog/writing section, Markdown or MDX content, analytics, a custom domain, and social links. Do not build these features in advance. A future case study can live at `src/pages/projects/your-project.astro` and be linked through a project record's `href` without redesigning the archive.
