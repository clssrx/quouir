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
│  ├─ app/          # Next.js App Router pages
│  ├─ components/   # Shared React components
│  ├─ sanity/       # Sanity config, queries, schemas, and types
│  └─ studio/       # Embedded Sanity Studio
├─ tests/           # Playwright accessibility tests
├─ package.json
├─ playwright.config.ts
├─ .env.local       # Local secrets, gitignored
├─ .env.example     # Template for environment variables
└─ README.md
```

The Sanity Studio is available at `/studio` in the running Next.js app.

---

## Features

- Next.js frontend using the App Router
- Embedded Sanity Studio for content management
- Portable Text rendering with accessible links, images, and footnotes
- Automated accessibility checks with axe and Playwright
- JSX accessibility linting with `eslint-plugin-jsx-a11y`
- Vercel-compatible deployment

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

## Development

Before opening a pull request, run:

```bash
npm run lint
npm run test:a11y
npm run build
```

Regenerate Sanity types after schema or query changes:

```bash
npm run typegen
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

_Work in progress. Contributions, feedback, and ideas are welcome through issues or pull requests._
