# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server → http://localhost:3000
npm run build    # Production build (client + Nitro server)
npm run generate # Static site generation
npm run preview  # Preview production build
```

## Project Architecture

Nuxt 3 SPA (`ssr: false`) — brand/portfolio landing page with cinematic scroll effects.

### Key Modules

| Module | Purpose |
|--------|---------|
| `@nuxtjs/tailwindcss` | Tailwind CSS integration |
| `@nuxtjs/google-fonts` | Inter + Playfair Display (auto-downloaded at build) |
| `@nuxtjs/i18n` | i18n with prefix_except_default strategy |

### Layout & Pages

- **`layouts/default.vue`** — wraps all pages with `GrainOverlay`, `CustomCursor`, `NavBar`, and the `#scroll-container` wrapper
- **`pages/index.vue`** — single page composing HeroSection / ServicesSection / WorksSection / FooterSection, and calling the three composables at setup top-level

### Composables (all JS behavior)

All composables use `onMounted`/`onUnmounted` guarded by `import.meta.client`:

- **`useSectionScroll`** (`composables/useSectionScroll.js`) — full-page scroll with wheel/keyboard/touch capture, cinematic depth transitions (scale + opacity per section), exports shared module-level `currentSection` ref and `scrollTo(id)` function
- **`useCustomCursor`** (`composables/useCustomCursor.js`) — difference-blend cursor in hero, small dot elsewhere, lerp follow via requestAnimationFrame
- **`useCardTilt`** (`composables/useCardTilt.js`) — 3D perspective tilt on `.service-card` elements

### Components (9 total)

- `NavBar.vue` — reads `currentSection` from useSectionScroll for active link highlight, includes language switcher
- `HeroSection.vue` / `ServicesSection.vue` / `WorksSection.vue` / `FooterSection.vue` — one per scroll section
- `ServiceCard.vue` / `WorkCard.vue` — reusable card components
- `CustomCursor.vue` / `GrainOverlay.vue` — purely visual wrapper components (the logic lives in composables)

### Scroll Architecture

Sections are identified by these DOM IDs (used in NavBar links and composable scrollTo):
- `hero-section`, `services`, `works`, `footer-section`

Each section gets CSS class `.depth-section` with `position: sticky; height: 100vh;`. The composable controls `scale`/`opacity` transforms via inline styles and `active`/`exiting`/`entering` classes during scroll.

### i18n

Two locales in `i18n/locales/`: `en.json` and `zh-CN.json`. Strategy is `prefix_except_default` (en at root, zh-CN under `/zh-CN`). Locale switching via `setLocale()` from `useI18n()`.

### Styling

- **`tailwind.config.ts`** — full custom design token set (Material 3-inspired colors, spacing scale, type ramp)
- **`assets/css/main.css`** — imports Material Symbols font, defines `.depth-section`, `.cursor-*`, `.service-card`, `.reveal-item` classes, and custom scrollbar hiding
- Material Symbols loaded via CSS `@import` (not through google-fonts module) to preserve variable-axis settings

## Git

- Remote: `git@github.com:zhaoxiaoyang741/personal-website.git`
- Ignored: `node_modules/`, `.nuxt/`, `.output/`, `dist/`, `.env`, IDE/OS files

### Commit Convention

Use Conventional Commits format. Commit messages **must be in English**. Use multiple `-m` flags — **never** use PowerShell here-string (`@'...'@`) syntax:

```powershell
git add .
git commit -m "feat: add dark mode support" -m "- Dark theme color scheme
- localStorage persistence preference
- Auto-switch with system theme"
```

Examples:
- `feat:` — new feature
- `fix:` — bug fix
- `refactor:` — code restructuring
- `style:` — styling changes (Tailwind/CSS)
- `chore:` — config, dependencies, tooling
