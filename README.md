# Easy Invoice Frontend

Web client for the Easy Invoice system — manage invoices, view dashboards, and run reports.

Built with [Nuxt 4](https://nuxt.com), Vue 3, Vuetify, Tailwind CSS, and Pinia.

## Requirements

- Node.js 18+
- npm

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the example env file and set your API URLs:

```bash
cp example.env .env
```

Edit `.env`:

```env
NUXT_PUBLIC_BASE_URL=http://localhost:3000/
NUXT_PUBLIC_API_URL=http://localhost:8000/
```

## Development

Start the dev server at [http://localhost:3000](http://localhost:3000):

```bash
npm run dev
```

## Production

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project structure

```
app/
├── components/   # UI components and icons
├── composables/  # Shared Vue composables
├── layouts/      # Page layouts
├── middleware/   # Route middleware (auth)
├── pages/        # Application routes
├── plugins/      # Nuxt plugins (axios, vuetify, etc.)
└── store/        # Pinia stores
```
