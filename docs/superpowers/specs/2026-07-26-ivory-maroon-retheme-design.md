# Portfolio Retheme — Warm Ivory / Maroon Redesign

**Date:** 2026-07-26
**Status:** Approved by user (pending spec review)
**Approach:** A — Comprehensive retheme at the design-token level, layout structure untouched

## Goal

Remove the "AI-generated" neon look (cyan/purple glows, terminal labels, 3D particles) and replace it with a bright, elegant, editorial aesthetic. Light mode becomes the default for first-time visitors; dark mode gets a maroon accent. Maintain Lighthouse performance ≈99.

## What stays

- Overall layout/structure of every section (user explicitly likes it)
- Hero portrait photo with lightweight depth-parallax + its no-lag fallback
- Framer-motion entrance animations (fade/slide)
- Services/Experience modals portaled to body (mechanism untouched)
- 3-zone navbar, i18n (EN/ID), theme persistence via localStorage + anti-FOUC script

## 1. Color palette (design tokens)

Single source of truth: `src/app/globals.css` (@theme + `html[data-theme]` blocks) and `tailwind.config.ts`. All cyan/purple/blue neon tokens are removed from both themes.

### Light mode (default)

| Token | Value | Usage |
|---|---|---|
| Background main | `#faf7f2` (warm ivory) | body |
| Background section | `#f4efe8` | alternating sections |
| Card/panel | `#ffffff` | cards, modals |
| Text primary | `#1c1917` (warm charcoal) | headlines, body |
| Text secondary | `#57534e` (stone) | descriptions, meta |
| Accent maroon | `#8c2f39` | links, buttons, highlights, accent rules |
| Maroon hover/dark | `#6d2430` | hover states |
| Border | `rgba(28, 25, 23, 0.10)` | hairlines |

### Dark mode (black + maroon accent)

| Token | Value | Usage |
|---|---|---|
| Background main | `#0c0a09` (warm black, not blue) | body |
| Background section | `#121010` | alternating sections |
| Card/panel | `#1a1717` | cards, modals |
| Text primary | `#f5f0eb` (ivory) | headlines, body |
| Text secondary | `#a8a29e` | descriptions |
| Accent maroon | `#c94f5d` (brightened for WCAG contrast on black) | links, buttons, highlights |
| Maroon deep | `#8c2f39` | accent borders, subtle gradients |
| Border | `rgba(245, 240, 235, 0.10)` | hairlines |

Selection color: maroon with alpha. Scrollbar colors follow new palette. Hex values may be fine-tuned during implementation once seen on screen.

## 2. Typography

- **Headings (h1–h3, hero name):** Fraunces serif via `next/font/google` (latin subset, variable weight, `display: swap`). Modern-editorial character.
- **Body & UI:** existing sans-serif, unchanged.
- **Monospace removed from UI labels** (badges, labels, buttons). Mono remains acceptable only for genuine code blocks in project details.
- **Terminal labels → natural language** (both EN/ID via existing `src/lib/dictionary.ts`):
  - `Career_Matrix_v4.0` → "Experience" / "Pengalaman"
  - `Project_Vault_2026` → "Selected Work" / "Karya Pilihan"
  - `Initialize_Inquiry` → "Get in Touch" / "Hubungi Saya"
  - `COPY_UID` → "Copy email" / "Salin email"
  - `[LIVE]`, `[ACTIVE]`, `Systems_Architect // 2026.V1`, `>` prompts → plain text (e.g. "Available for work" / "Terbuka untuk proyek")
- Hierarchy: large serif hero name; small sans subtitles with generous letter-spacing. The serif/sans contrast carries the premium feel.

## 3. Hero & visual effects

### Hero

- **HeroCanvas (Three.js) deleted entirely** — component, dynamic import, and the `three` dependency removed from `package.json` (~884KB chunk gone). Largest single performance win.
- Portrait photo with depth-parallax retained as the hero focal point.
- Background: plain ivory + one thin maroon accent detail (hairline rule or section color block). No giant aurora blurs.
- Status badge: small static maroon dot (no `animate-ping`) + "Available for work" text.

### Removed across all sections

- All aurora blobs (`blur-[90px]`–`blur-[150px]` cyan/purple/blue) → replaced by alternating section backgrounds (ivory ↔ darker ivory; black ↔ `#121010`).
- All `animate-ping`, `glow-primary`, neon `shadow-[0_0_15px...]`.
- Cyan→purple gradient text on headlines → solid color (charcoal/ivory), maroon accent on at most one key word.
- `mix-blend-screen` overlays.
- Glassmorphism `.glass` → solid cards with hairline border + soft shadow. iOS `backdrop-filter` patches become largely unnecessary and are cleaned up (removed, not extended).

## 4. Default theme & persistence

- `src/lib/theme.tsx` and the anti-FOUC inline script in `src/app/layout.tsx`: fallback changes `"dark"` → `"light"` when no stored preference exists.
- Returning visitors keep their stored choice (localStorage wins).
- `viewport.themeColor` updated to new ivory/black values.

## 5. Performance

- No new libraries. All new effects are pure CSS.
- Three.js removal is the dominant JS reduction; giant blurs and blend modes removal reduces paint/composite cost (mobile especially).
- Fraunces via `next/font` = no CLS, no render-blocking.
- Target: Lighthouse performance ≈99 on production build.

## 6. Testing / acceptance

1. `npm run build` passes with no new errors/warnings.
2. Manual visual pass in light & dark; maroon accent text meets WCAG AA contrast.
3. Both languages (EN/ID) verified for all replaced labels.
4. First visit (empty localStorage) → light mode, no flash; stored preference honored.
5. Lighthouse run on production build confirms score.

## Affected files (expected)

- `src/app/globals.css`, `tailwind.config.ts` — token overhaul
- `src/app/layout.tsx` — font, default theme script, themeColor
- `src/lib/theme.tsx` — default light
- `src/lib/dictionary.ts` — label rewrites (EN/ID)
- `src/components/`: Hero, HeroScene (rework), HeroCanvas (delete), Navbar, Skills, About, Services, Projects, Experience, Contact, PremiumFooter — color/label/effect sweep
- `package.json` — remove `three` (+ related types)
