# QU'OUÏR

![Node.js](https://img.shields.io/badge/node-%3E%3D22.12-green)
![Vercel](https://img.shields.io/badge/deploy-vercel-black)

[QU'OUÏR](https://www.quouir.com) is an editorial platform for the QU'OUÏR collective, built with **Next.js**, **TypeScript**, **Sanity**, and **Tailwind CSS**.

The public website and Sanity Studio live in a single Next.js application.

## Features

- CMS-driven editorial content with Sanity
- Responsive editorial and archive-style layouts
- Portable Text rendering with images and footnotes
- Dynamic metadata, sitemap, robots, and canonical URLs
- Sanity TypeGen for query-driven TypeScript types
- Automated accessibility checks with axe and Playwright
- Vercel deployment

## Project Structure

```text
src/
├── app/
│   ├── (frontend)/     # Public website
│   └── studio/         # Embedded Sanity Studio
├── components/         # Shared UI
├── sanity/             # Schemas, queries, clients, generated types
├── types/
└── utils/

tests/                   # Playwright accessibility tests
```

Route-specific components, data, and utilities are colocated in `_components`, `_data`, and `_utils` folders.

## Getting Started

Requires **Node.js >= 22.12**.

```bash
npm install
npm run dev
```

Local URLs:

```text
Frontend: http://localhost:3000
Studio:   http://localhost:3000/studio
```

Create `.env.local` from `.env.example` and add the required Sanity environment variables.

## Scripts

```bash
npm run dev        # Generate Sanity types and start development
npm run build      # Generate Sanity types and create a production build
npm run lint       # Run ESLint
npm run typegen    # Regenerate Sanity types
npm run test:a11y  # Run accessibility tests
```

## Accessibility

The project includes semantic markup, keyboard navigation, visible focus states, accessible Portable Text rendering, `eslint-plugin-jsx-a11y`, and automated axe checks with Playwright.

## Deployment

The site is deployed on Vercel at:

https://www.quouir.com

## License

The source code for this website is open source and available under the
[MIT License](./LICENSE).

Unless otherwise stated, QU'OUÏR editorial content is distributed under the
**CC BY-NC-ND 4.0** license.

QU'OUÏR's name, logo, editorial content, and other brand assets are not
licensed under the MIT License.
