# Dave Garry - Financial Messaging & Technologies (GEMINI.md)

This file contains architectural guidelines, development standards, and critical workflows for developers and AI agents working on this codebase.

---

## 1. Project Overview

This repository is the personal portfolio, engineering blog, and systems utilities website of Dave Garry, a systems engineer specializing in financial messaging (ISO 20022, SEPA, SWIFT, etc.) and software architecture.

- **URL:** [https://davegarry.com](https://davegarry.com)
- **Key Modules:** 
  - **Engineering Log (Blog):** Deep dives into financial messaging messages (PACS, PAIN, CAMT), standards, clearing & settlement.
  - **Core Systems Toolkit (Utilities):** Web-based tools like JSON Formatter, XML Formatter, and Base64 Converter used by integration engineers.

---

## 2. Core Tech Stack & Framework Architecture

The project is built on **Nuxt 4** with the following technical foundations:

- **Nuxt Framework:** Version `^4.4.2` with **Nuxt 4 directory structure** enabled (`future: { compatibilityVersion: 4 }`).
- **Framework Root:** All application-level source code (pages, components, layouts, utils) **must** reside in the `app/` directory instead of the root directory.
- **Content Engine:** `@nuxt/content` v3 (`^3.12.0`) with schema definition in `content.config.ts`.
- **CSS / Styling:** Tailwind CSS (`@nuxtjs/tailwindcss: ^6.14.0`) with Tailwind Typography (`@tailwindcss/typography: ^0.5.19`).
- **Static Assets:** Static site images, fonts, and icons are managed in the `public/` directory.

---

## 3. Key Architectural Rules & Coding Standards

### A. Trailing Slashes & SEO Hygiene (Critical)
Trailing slashes are strictly enforced across the site's URLs for SEO consistency.
1. **Router & Nuxt Config:** `router.options.trailingSlash: true` and `content.trailingSlash: true` are configured in `nuxt.config.ts`.
2. **Canonical Headers:** Programmatically set in `app/app.vue` to ensure standard dynamic canonical headers:
   ```ts
   const route = useRoute()
   const canonicalUrl = `https://davegarry.com${route.path.replace(/\/$/, '')}/`
   ```
3. **Sitemap Generation:** The Nitro sitemap plugin (`server/plugins/sitemap-transformer.ts`) runs as a post-processor, using regex replacement to guarantee all sitemap `<loc>` tags contain a trailing slash.
4. **Internal Links:** Always format internal links with a trailing slash (e.g., `<NuxtLink to="/utilities/">` or `<NuxtLink to="/blog/">`).

### B. Legacy URL Redirection
Legacy blog post paths (previously formatted under `/blog/output/posts/YYYY-MM-DD-slug`) must be redirect-handled using a permanent 301 redirect to the clean root-level slug (with a trailing slash, e.g., `/${slug}/`).
- Implementation lives in `server/middleware/legacy-blog-redirect.ts`.
- Ensure new routes or content structures do not break this regex redirection rule.

---

## 4. Blog & Content Structure (Nuxt Content v3)

### A. Directory Layout
- **Posts Folder:** All raw Markdown (`.md`) files live under `content/blog/output/posts/` inside folders named after the post, e.g., `content/blog/output/posts/2023-02-13-pacs-008-message/index.md`.
- **Drafts Folder:** Work-in-progress posts or drafts are placed inside subdirectory paths containing `_drafts`, e.g., `content/blog/output/posts/_drafts/2025-01-20-replacing-traditional-coding-techniques-with-ai-agents/index.md`.

### B. Schema Configuration
The blog posts schema is defined in `content.config.ts` using `zod`:
- **Collection Name:** `blog`
- **Fields:**
  - `date`: `z.date()` (Required)
  - `description`: `z.string().optional()`
  - `categories`: `z.array(z.string()).optional()`
  - `tags`: `z.array(z.string()).optional()`

### C. Content Fetching & Slug Helpers
- Use Nuxt Content v3's `queryCollection()` queries to pull content.
- **Draft Filtering:** Always filter out posts where the path contains `_drafts` and ensure it belongs to the output path (`path.startsWith('/blog/output/posts')`):
  ```ts
  const filteredPosts = posts.filter(post => {
    const isDraft = post.path.includes('_drafts')
    const isOutputPost = post.path.startsWith('/blog/output/posts')
    return !isDraft && isOutputPost
  })
  ```
- **Slug Extraction Helper:** Inside `app/utils/blog.ts`, use `extractSlug(path)` to strip out dates from filenames (e.g., mapping `/blog/output/posts/2023-02-13-pacs-008-message/` to a clean slug `pacs-008-message`).

---

## 5. Post Image & Asset Management

Post-specific images must not clutter the Markdown content folder. 

1. **Storage Location:** All images are centralized under `public/images/<post-folder-name>/` (e.g., `public/images/2022-11-12-life-cycle-of-a-sepa-direct-debit-sdd-message/`).
2. **References inside Markdown:**
   - Standard Markdown format: `![Alt Text](/images/<post-folder-name>/image.png)`
   - HTML format: `<img src="/images/<post-folder-name>/image.png" alt="Alt Text" />`
3. **Asset Migration Tool:** Use the `migrate-assets.sh` bash script in the root to automate moving images from markdown folders into `public/images/` and rewriting local references inside markdown files to point to the correct public path.

---

## 6. Toolkit Utilities & API Integration

The interactive utilities (`Base64Converter.vue`, `JsonPrettyPrinter.vue`, `XmlPrettyPrinter.vue`, `JsonDiff.vue`, `XmlDiff.vue`) are placed in `app/components/tools/` and rendered on `app/pages/utilities/index.vue`.

- **API Base URL:** Utilities perform tasks using client-side processing or backend endpoints:
  - XML Formatting: Client-side (CodeMirror 6 with syntax-aware folding & local AST formatting)
  - XML Diff: Client-side (CodeMirror 6 with syntax-aware folding & local structural XML diff)
  - JSON Formatting: Client-side (CodeMirror 6 with syntax-aware folding & local recursive auto-parse formatting)
  - JSON Diff: Client-side (CodeMirror 6 with AST source mapping & semantic JSON diff)
  - Base64 Conversion: `${config.public.apiBase}/api/convert/base64`
- Maintain consistency by utilizing this runtime config for any new integration utility added to the site.

---

## 7. Operational & Build Workflows

### Standard Scripts
- **Development Server:** `npm run dev` (Starts Vite dev server on `http://localhost:3000`)
- **Memory-Tuned Build:** `npm run build` or `npm run generate`
  - Nuxt static site rendering is highly memory intensive. Both build and generate scripts are explicitly configured to run with `NODE_OPTIONS=--max-old-space-size=4096` to bypass memory limitations on pre-rendering.
- **Production Preview:** `npm run preview`
- **Post-Install Hook:** `npm run postinstall` (runs `nuxt prepare` for Nuxt autocomplete / type generations).
