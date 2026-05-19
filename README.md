# QU'OUÏR

![Node.js](https://img.shields.io/badge/node-%3E%3D20.0.0-green)
![npm](https://img.shields.io/badge/npm-%3E%3D10.0.0-blue)
![Vercel](https://img.shields.io/badge/deploy-vercel-black)

QU'OUÏR is a **work-in-progress** editorial web project for the Qu'ouir collective, built with **Next.js** and **Sanity**.

The project uses a **single-app structure**, with the Sanity Studio embedded inside the Next.js frontend.

---

## Project Structure

```text
quouir/
├─ src/
│  ├─ app/
│  │  ├─ (frontend)/        # Public website routes
│  │  └─ studio/            # Embedded Sanity Studio route
│  ├─ components/           # Shared UI components
│  ├─ sanity/               # Sanity config, queries, schemas, and generated types
│  └─ utils/                # Shared utility functions
├─ tests/                   # Playwright accessibility tests
├─ package.json
├─ playwright.config.ts
├─ .env.example
└─ README.md
```

Route-specific components, data, and utilities are colocated inside their route folders using `_components`, `_data`, and `_utils` folders.

The Sanity Studio is available at `/studio` in the running Next.js app.

---

## Architecture Notes

This project uses the Next.js App Router.

Page-specific UI is kept close to the route that uses it. For example, route-only components live in local `_components` folders, while reusable components live in `src/components`.

Sanity data access is kept in `src/sanity/queries`, and generated Sanity types are used across pages and components.

Content pages use ISR with `revalidate` so published content can refresh without requiring a full rebuild.

---

## Features

- Next.js frontend using the App Router
- Embedded Sanity Studio for content management
- CMS-driven editorial pages powered by Sanity
- Route-local component organization for page-specific UI
- Incremental Static Regeneration for content pages
- Portable Text rendering with accessible links, images, and footnotes
- Automated accessibility checks with axe and Playwright
- JSX accessibility linting with `eslint-plugin-jsx-a11y`
- Vercel-compatible deployment

---

## Content Updates

CMS-driven content pages use ISR with a short revalidation window, so published Sanity content can refresh without requiring a full rebuild.

---

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

Local URLs:

```text
Frontend: http://localhost:3000
Studio:   http://localhost:3000/studio
```

The Studio is served through `NextStudio` using a Next.js catch-all route.

---

## Environment Variables

Create `.env.local` from `.env.example`:

```bash
# Public variables
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset

# Server-only variables
SANITY_PROJECT_ID=your_project_id
SANITY_APP_ID=your_app_id
SANITY_DATASET=your_dataset
SANITY_STUDIO_API_VERSION=YYYY-MM-DD
SANITY_API_TOKEN=your_sanity_token_for_drafts
```

`.env.local` is ignored by git.

For Vercel deployments, add the same variables in the Vercel project dashboard for production and preview environments.

---

## Scripts

```bash
npm run dev        # Start the local development server
npm run lint       # Run linting
npm run build      # Create a production build
npm run test:a11y  # Run Playwright accessibility tests
npm run typegen    # Regenerate Sanity types
```

---

## Accessibility

This project includes an initial accessibility setup:

- axe and Playwright for automated checks on rendered pages
- `eslint-plugin-jsx-a11y` for JSX accessibility linting
- visible keyboard focus styles
- skip link for keyboard navigation
- semantic landmarks and headings
- accessible image alt handling
- accessible Portable Text links and footnotes

Automated tools do not replace manual testing, so keyboard navigation and screen-reader checks are still recommended before major releases.

---

## Deployment

The project can be deployed directly from the repository root on Vercel.

The frontend and Studio are served from the same Next.js app:

```text
Frontend: /
Studio:   /studio
```

---

## License

Unless otherwise stated, the contents are distributed under a Creative Commons BY-NC-ND 4.0 license.

This means the material may be shared with attribution for non-commercial purposes, without derivatives.

_Work in progress. Feedback, and ideas are welcome through issues._
