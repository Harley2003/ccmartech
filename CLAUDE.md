# CCMartech Design System Rules

> Generated for Figma MCP integration. This document defines all design system rules, component patterns, and conventions for the CCMartech project.

## 1. Token Definitions

### Color Tokens

All color tokens are defined as CSS custom properties in `src/app/globals.css` and registered with Tailwind via `@theme inline`. **Only use these exact HEX values — never invent similar colors.**

| Token (CSS Variable)         | Tailwind Class        | HEX       | Usage                              |
|------------------------------|-----------------------|-----------|------------------------------------|
| `--color-page-bg`            | `bg-page-bg`          | `#F1F2F4` | Main page background               |
| `--color-nav-white`          | `bg-nav-white`        | `#F8F8F9` | Navbar background                  |
| `--color-footer-bg`          | `bg-footer-bg`        | `#FAFAFA` | Footer background                  |
| `--color-topbar-dark`        | `bg-topbar-dark`      | `#313234` | Top info bar (charcoal)            |
| `--color-copyright-bar`      | `bg-copyright-bar`    | `#343434` | Copyright bar at page bottom       |
| `--color-brand-blue`         | `text-brand-blue` / `bg-brand-blue` | `#003FBB` | Primary brand color, CTA solid bg  |
| `--color-logo-icon`          | `text-logo-icon`      | `#0A3EA4` | Logo CC icon color                 |
| `--color-footer-link`        | `text-footer-link`    | `#0B539D` | Footer links & logo color          |
| `--color-heading-dark`       | `text-heading-dark`   | `#444547` | Headings (never pure black)        |
| `--color-body-text`          | `text-body-text`      | `#676767` | Body/description text              |

JS constants also available in `src/lib/constants.ts` via `COLORS` object.

### Gradient Tokens

Defined as CSS custom properties and utility classes:

| Gradient              | CSS Class               | Value                                              | Usage            |
|-----------------------|-------------------------|----------------------------------------------------|------------------|
| CTA Button            | `.bg-cta-gradient`      | `linear-gradient(135deg, #1B3D80 0%, #0067A1 100%)` | Primary CTA      |
| Brand Icon            | `.bg-brand-icon-gradient` | `linear-gradient(180deg, #0A3EA4 0%, #003FBB 100%)` | Brand icons      |
| Page Background       | `.bg-page-gradient`     | `linear-gradient(180deg, #F1F2F4 0%, #E8EAEE 100%)` | Section bg       |

### Typography Tokens

| Font                 | CSS Variable      | Tailwind Class | Family                       | Usage                         |
|----------------------|--------------------|----------------|------------------------------|-------------------------------|
| Primary              | `--font-primary`   | `font-sans`    | `Be Vietnam Pro, sans-serif` | Headings, body, buttons       |
| Monospace            | `--font-mono`      | `font-mono`    | `Space Mono, monospace`      | Code, labels, badges, dates   |

Fonts are loaded via `next/font/google` in `src/app/layout.tsx` with Vietnamese subset support.

## 2. Theme Rules

- **Light Theme ONLY** — absolutely no dark mode, no dark backgrounds for overall page.
- **Style**: Modern, professional, Navy Blue primary tone with Charcoal accents.
- Body background: `#F1F2F4` (page-bg)
- Body text color: `#676767` (body-text)
- Headings: `#444547` (heading-dark) — never use pure `#000000`

## 3. Component Library

### Location & Architecture

Components live in `src/components/` organized by purpose:

```
src/components/
├── layout/          # Page structure (Header, Footer, TopBar, Navbar)
├── ui/              # Reusable primitives (Button, Card, Badge)
└── sections/        # Page-specific sections (Hero, ServiceCard, NewsCard, ContactForm)
```

Each folder has an `index.ts` barrel export. Import pattern:

```tsx
import { Header, Footer } from "@/components/layout";
import { Button, Card, Badge } from "@/components/ui";
import { Hero, ServiceCard } from "@/components/sections";
```

### UI Components

#### Button (`src/components/ui/Button.tsx`)

```tsx
<Button variant="primary">Text</Button>   // Solid #003FBB bg, white text
<Button variant="gradient">Text</Button>   // CTA gradient bg, white text
<Button variant="outline">Text</Button>    // Blue border, blue text, fills on hover
```

- Base: `px-6 py-3 rounded-lg font-bold font-sans transition-all duration-200`
- All buttons use `font-bold` (700 weight), white text on filled variants

#### Card (`src/components/ui/Card.tsx`)

```tsx
<Card className="optional-extra-classes">
  {children}
</Card>
```

- Base: `bg-white rounded-xl shadow-sm border border-gray-100 p-6`

#### Badge (`src/components/ui/Badge.tsx`)

```tsx
<Badge variant="default">Label</Badge>  // Gray bg
<Badge variant="blue">Label</Badge>     // Blue tinted bg
```

- Uses `font-mono` (Space Mono), `text-xs`, `rounded-full`

### Layout Components

#### Header = TopBar + Navbar

- **TopBar**: Charcoal bg (`#313234`), white text, `font-mono`, shows hotline + email
- **Navbar**: White bg (`#F8F8F9`), bottom border, brand name left, nav links right

#### Footer

- **Main section**: `#FAFAFA` bg, 3-column grid (about, links, contact)
- **Copyright bar**: `#343434` bg, white text, `font-mono`

### Section Components

- **Hero**: Page gradient bg, large heading, description, 2 CTA buttons
- **ServiceCard**: Card with emoji icon, title, description
- **NewsCard**: Card with Badge, title link, excerpt, date
- **ContactForm**: Labels with `htmlFor`/`id` bindings, styled inputs, gradient submit button

## 4. Data Management

All content data lives in JSON files under `src/data/`:

```
src/data/
├── site.json         # Company info, contact, working hours, copyright
├── navigation.json   # Nav menu links (used by Navbar + Footer)
├── home.json         # Hero content + featured services
├── services.json     # Full services list + page metadata
└── news.json         # Articles list + page metadata
```

Import pattern:

```tsx
import siteData from "@/data/site.json";
import navLinks from "@/data/navigation.json";
```

## 5. Page Routes

Next.js App Router structure:

```
src/app/
├── page.tsx                 # / (Trang chủ)
├── dich-vu/page.tsx         # /dich-vu (Dịch vụ)
├── tin-tuc/page.tsx         # /tin-tuc (Tin tức)
├── tin-tuc/[slug]/page.tsx  # /tin-tuc/:slug (Chi tiết bài viết)
├── lien-he/page.tsx         # /lien-he (Liên hệ)
└── api/chatbot/route.ts     # /api/chatbot (Chatbot API endpoint)
```

- Vietnamese URL slugs (dich-vu, tin-tuc, lien-he)
- HTML lang attribute: `vi`
- Each page exports `metadata: Metadata` for SEO

## 6. Styling Approach

- **Framework**: Tailwind CSS v4 via PostCSS (`@tailwindcss/postcss`)
- **Methodology**: Utility-first Tailwind classes in JSX
- **Global styles**: `src/app/globals.css` — CSS variables, `@theme inline` registration, gradient utility classes
- **No CSS Modules**, no styled-components
- **Responsive**: Mobile-first with `md:` and `lg:` breakpoints. Grid layouts use `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Container: `container mx-auto` pattern with `px-4` padding

## 7. Asset Management

- Static assets in `public/` directory (SVGs: file.svg, globe.svg, next.svg, vercel.svg, window.svg)
- Images via `next/image` component for optimization
- No CDN configured currently
- No custom icon system — using emoji icons for service cards

## 8. TypeScript Types

Shared types defined in `src/types/index.ts`:

```typescript
NavLink        // { href, label }
ServiceItem    // { id, title, description, icon? }
NewsArticle    // { id, title, slug, excerpt, content, category, publishedAt, author?, thumbnail? }
ContactFormData // { fullName, email, phone, message }
```

## 9. Project Configuration

- **Next.js**: 15.5.12 (App Router)
- **React**: 19.1.0
- **Tailwind**: v4 with `@tailwindcss/postcss`
- **TypeScript**: strict mode, bundler module resolution
- **Path alias**: `@/*` → `./src/*`
- **Build**: `next build` / `next dev`
- **Lint**: ESLint with `next/core-web-vitals` + `next/typescript`

## 10. Key Conventions

1. **No dark mode** — all designs must be light theme only
2. **No pure black** — headings use `#444547`, body uses `#676767`
3. **Exact HEX values only** — never approximate the color palette
4. **Be Vietnam Pro** for all visible text; **Space Mono** for code/labels/badges/dates
5. **CTA buttons**: Either solid `#003FBB` or gradient `135deg #1B3D80→#0067A1`, always white bold text
6. **Data in JSON** — no hardcoded content strings in components
7. **Barrel exports** — each component folder has `index.ts`
8. **Vietnamese language** — page content in Vietnamese, `lang="vi"` on HTML
9. **Label accessibility** — all form labels must use `htmlFor` + `id` pairing
10. **Unique keys** — use semantic keys (title, slug) not array indices
