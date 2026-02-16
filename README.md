# Qu'ouir

![Node.js](https://img.shields.io/badge/node-%3E%3D20.0.0-green)
![npm](https://img.shields.io/badge/npm-%3E%3D10.0.0-blue)
![Vercel](https://img.shields.io/badge/deploy-vercel-black)

Qu'ouir is a **work-in-progress** web project for the Qu'ouir collective, built with **Next.js** and **Sanity**.

This project now uses a **single-app structure** with the Sanity Studio embedded inside the Next.js frontend.

---

## Project Structure

```
quouir/
├─ src/
│ ├─ app/ # Next.js App Router pages
│ ├─ studio/ # Embedded Sanity Studio
│ └─ ... # components, lib, etc.
├─ package.json
├─ .env.local # local secrets (gitignored)
├─ .env.example # template for environment variables
├─ README.md

- Studio is accessible at `/studio` in the running Next.js app.
```
---

## Features

- Modern Next.js frontend with App Router
- Embedded Sanity Studio for content management
- Draft mode / preview support for viewing unpublished content
- Fully compatible with **Vercel deployment**
- Simplified npm-based workflow

---

## Getting Started (Development)

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Install Dependencies

```bash
npm install
```

### Run Frontend + Studio

```bash
npm run dev
```

-Frontend: http://localhost:3000

- Studio: http://localhost:3000/studio

> The Studio is served via `NextStudio` using a Next.js catch-all route.

### Environment Variables

Create .env.local based on .env.example:

```bash
# Public variables (browser)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset

# Server-only variables (server)
SANITY_PROJECT_ID=your_project_id
SANITY_APP_ID=your_app_id
SANITY_DATASET=your_dataset
SANITY_STUDIO_API_VERSION=YYYY-MM-DD
SANITY_API_TOKEN=your_sanity_token_for_drafts

```

- `.env.local` is ignored by git.

- `.env.example` documents all required variables for development and production.

- Vercel: Set the same variables in your project dashboard for production and preview deployments.

### Build / Production

```bash
npm run build
npm start
```

- Builds the Next.js app (including embedded Studio)

- Starts the production server

> **On Vercel**, you can deploy the project root directly; the Studio will be served at /studio.

## License

This work is licensed under a Creative Commons Attribution 4.0 International License.

You are free to:

- Share — copy and redistribute the material in any medium or format

- Adapt — remix, transform, and build upon the material for any purpose, even commercially

As long as you give appropriate credit, provide a link to the license, and indicate if changes were made.

_Work in progress — contributions, feedback, and ideas are welcome via issues or pull requests._
