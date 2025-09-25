Product Catalogue Application built with Next.js (TypeScript), Sanity, and Tailwind CSS.

Tech stack
- Next.js App Router + TypeScript
- Sanity CMS (+ Vision)
- Tailwind CSS

Getting started
1) Install dependencies

```bash
npm install
```

2) Configure environment

Create a `.env.local` in project root:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
```

3) Run the app

```bash
npm run dev
```

Open the app at `http://localhost:3000` and the Sanity Studio at `http://localhost:3000/studio`.

Sanity schema
- Product: title (string), description (text), image (image), category (string), price (number), availability (boolean), slug (slug)

Features
- Product listing with search, category filter, price range, sort by price
- Product detail page with related products
