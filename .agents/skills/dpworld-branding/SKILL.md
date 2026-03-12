# DP World Branding — Agent Skill

## Purpose

This skill enforces DP World Marine Services brand compliance across all Shipping Solutions apps. It MUST be followed whenever creating, modifying, or reviewing any frontend code.

## When to Activate

- Creating a new Shipping Solutions app
- Modifying any UI component, page, or style
- Reviewing code for brand compliance
- Auditing an existing app

## Brand Rules (Mandatory)

### Colors — STRICT

Only these five brand colors are permitted. No tints, shades, opacity variants, or approximations.

| Name            | Hex       | HSL                |
|-----------------|-----------|---------------------|
| Lucky Point     | #1E1450   | 254 62% 20%        |
| Radical Red     | #FF2261   | 345 100% 57%       |
| Caribbean Green | #00E68C   | 155 100% 45%       |
| Maverick        | #F5F3F5   | 300 8% 95%         |
| Cinder          | #0F0F19   | 240 18% 8%         |

If you encounter any other color values in the codebase (e.g., blue-500, gray-200, #333, rgb(100,100,100)), they MUST be replaced with the nearest DP World brand color.

### Typography — STRICT

- **Primary font**: Pilat (all weights loaded from `public/assets/fonts/`)
- **h1, h2**: Pilat Wide Heavy (900)
- **h3, h4**: Pilat Demi (600)
- **Body text**: Pilat Light (300)
- **Navigation**: Pilat Wide Book (400)

No Inter, system-ui, Arial, Helvetica, or any other font as primary. A system font stack may be used ONLY as a fallback after Pilat.

### CSS Variables — REQUIRED

All colors must be defined as HSL custom properties in `index.css`. Both `:root` (light) and `.dark` (dark) modes must be defined. Reference `design.md` for the complete variable definitions.

### Components — shadcn/ui

- Use shadcn/ui as the base component library
- Domain components must compose shadcn/ui primitives
- Every interactive element needs a `data-testid` attribute
- Every display element needs a `data-testid` attribute

### Dark Mode — REQUIRED

- Class-based: `.dark` class on `<html>` element
- Persist in `localStorage` under key `theme`
- Respect `prefers-color-scheme` as default
- Logo must swap between light/dark variants

### Logo — REQUIRED

The DP World logo MUST appear in the app header:
- Light mode: `attached_assets/DP_World_Logo_Colour_WhiteBG_Vertical_CMYK-01.png`
- Dark mode: `attached_assets/DP_World_Logo_Colour_BlackBG_Vertical_CMYK-01.png`

Import using `@assets/` alias and render based on current theme.

### Layout — REQUIRED

- Mobile-first responsive design
- Breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px)
- 4px base spacing unit
- Container max-width: 1280px

### /docs Route — REQUIRED

Every app must have a `/docs` route rendering `documentation.md` as a styled HTML page following the design system.

## Audit Checklist

When auditing an app, check every item:

1. [ ] All colors match the five brand colors exactly
2. [ ] Pilat fonts loaded and applied correctly
3. [ ] HSL CSS custom properties defined for light and dark modes
4. [ ] shadcn/ui primitives used for all components
5. [ ] Class-based dark mode with localStorage persistence
6. [ ] Mobile-first responsive layout
7. [ ] DP World logo in header with theme-aware variants
8. [ ] Proper spacing following 4px rhythm
9. [ ] `data-testid` on all interactive and display elements
10. [ ] `documentation.md` exists and follows the template
11. [ ] `/docs` route exists and renders documentation
12. [ ] Pilat Wide Heavy for h1/h2, Pilat Demi for h3/h4, Pilat Light for body

## Priority Levels for Fixes

1. **Critical**: Wrong brand colors, missing dark mode, broken layout, no logo
2. **Important**: Missing data-testid attributes, wrong fonts, spacing issues
3. **Nice to have**: Minor refinements, documentation improvements
