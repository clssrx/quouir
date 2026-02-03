# Quouir

![Node.js](https://img.shields.io/badge/node-%3E%3D20.0.0-green)
![PNPM](https://img.shields.io/badge/pnpm-%3E%3D10.0.0-blue)
![Vercel](https://img.shields.io/badge/deploy-vercel-black)

Quouir is a **work-in-progress** web project built with **Next.js** and **Sanity**.  
This monorepo contains:

- `apps/web` – Next.js frontend
- `apps/studio` – Sanity Studio (CMS)

---

## Features

- Modern Next.js frontend with App Router
- Sanity CMS integration for content management
- Monorepo structure for scalable development
- Ready for deployment to Vercel

---

## Getting Started (Development)

### Prerequisites

- Node.js >= 20.0.0
- PNPM >= 10.0.0

### Web (Next.js)

```
cd apps/web
pnpm install
pnpm run dev
```

Frontend will run at http://localhost:3000.

### Studio (Sanity)

```
cd apps/studio
pnpm install
pnpm run dev
```

Sanity Studio will run at http://localhost:3333.

### Deployment

- Frontend: Deploy `apps/web` to Vercel (set Root Directory = apps/web)
- Sanity Studio: Deploy using:

```
cd apps/studio
npx sanity deploy
```

---

## License

This work is licensed under a Creative Commons Attribution 4.0 International License
.

You are free to:

- Share — copy and redistribute the material in any medium or format
- Adapt — remix, transform, and build upon the material for any purpose, even commercially

As long as you give appropriate credit, provide a link to the license, and indicate if changes were made.

_Work in progress — contributions, feedback, and ideas are welcome via issues or pull requests._
