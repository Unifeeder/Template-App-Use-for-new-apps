---
name: dpworld-branding
description: Enforces official DP World brand compliance. Mandates Pilat fonts, the five official brand colors, no tints, and Cinder/Maverick-only text. Use before any styling, color, typography, or branding decision.
---

# DP World Branding Enforcement

## When to Use

Use this skill before any task involving:
- Styling, colors, or theming (light/dark mode)
- Typography or font sizing
- Layout, spacing, or responsive design
- Creating or modifying components (buttons, cards, badges, headers, nav)
- Building new pages or views
- Branding, logo placement, or visual identity
- Reviewing existing apps for brand compliance
- Mobile optimization
- Shadows, borders, elevation, or visual effects

## Instructions

### 1. Read `design.md`

Before making any UI changes, read `design.md` at the project root. It is the single source of truth for all visual design decisions based on the official DP World brand guidelines. Key sections:

| Section | Covers |
|---|---|
| §1-2 | Logo variants (light/dark), official brand colors, official gradients (§2.10) |
| §3 | Typography — Pilat font family (Wide Heavy, Demi, Light), fluid `clamp()` for titles |
| §4-5 | Spacing scale, border radii |
| §6 | Shadow/elevation system |
| §7-8 | Badge, Button, Card composability patterns |
| §9 | Header structure (left/right layout, fluid title sizing) |
| §10-11 | Mobile navigation, mobile optimization |
| §12-13 | Dark mode conventions, scrollbar styling |
| §14-17 | Icons, data-testid conventions, dependencies, provider stack |
| §19-20 | Animations, new-app checklist |

### 2. Brand Compliance Checklist

#### Colors — Five Official Colors Only

| Name | Hex | Usage |
|---|---|---|
| Lucky Point | `#1E1450` | Primary brand indigo — buttons, links, primary actions |
| Radical Red | `#FF2261` | Signature accent — alerts, destructive actions, highlights |
| Caribbean Green | `#00E68C` | Signature accent — success, positive status, secondary actions |
| Maverick | `#F5F3F5` | Light neutral — text on dark backgrounds, light mode backgrounds |
| Cinder | `#0F0F19` | Dark neutral — text on light backgrounds, dark mode backgrounds |

**Rules:**
- [ ] No tints, shades, or variations of these colors are ever used
- [ ] No colors outside this palette appear in the UI (except opacity-based variants for surfaces)
- [ ] Where lighter/darker variants are needed (cards, borders, surfaces), use opacity on the brand colors — never create new color values

#### Text Color — Cinder or Maverick Only

- [ ] All text uses either Cinder (`#0F0F19`) or Maverick (`#F5F3F5`)
- [ ] Light mode: Cinder text on Maverick/white backgrounds
- [ ] Dark mode: Maverick text on Cinder/dark backgrounds
- [ ] No colored text (no green text, no red text, no blue text for body copy)
- [ ] Status indicators use badges or icons with brand accent colors, not colored text

#### Typography — Pilat Font Family

| Font | Weight | Role |
|---|---|---|
| Pilat Wide Heavy | 400 | Main headings (h1, h2) — uppercase |
| Pilat Demi | 400 | Sub-headers (h3, h4), buttons, badges — uppercase |
| Pilat Light | 300 | Body copy, paragraphs, UI text |
| Pilat Wide Book | 300 | Data highlights, statistics |

**Rules:**
- [ ] Pilat is the only font used (no Inter, no system fonts as primary)
- [ ] `@font-face` declarations load fonts from `/assets/fonts/` or the synced location
- [ ] All headings are uppercase
- [ ] Pilat Wide Heavy and Pilat Demi use font-weight 400, Pilat Light and Pilat Wide Book use font-weight 300
- [ ] JetBrains Mono is acceptable for monospace/code contexts only

**Fluid title typography** — never use `truncate` on app titles. Use CSS `clamp()`:
```tsx
<h1 style={{ fontSize: 'clamp(0.7rem, 1vw + 0.35rem, 1rem)' }}>
  <span className="sm:hidden">Short</span>
  <span className="hidden sm:inline">Full Title</span>
</h1>
```

#### Logo Placement

- [ ] DP World vertical logo appears in the header of every app
- [ ] Light logo variant used on light backgrounds, dark variant on dark backgrounds
- [ ] Logo is the first element in the header (far left)
- [ ] Logo followed by a vertical divider before app title
- [ ] Responsive sizing: `h-6` mobile, `h-7` small, `h-10` desktop

**Theme-aware logos** — import both light and dark logo variants, switch based on `useTheme()`:
```tsx
import dpWorldLogoLight from "@assets/DP_World_Logo_Colour_WhiteBG_Vertical_CMYK-01.png";
import dpWorldLogoDark from "@assets/DP_World_Logo_Colour_BlackBG_Vertical_CMYK-01.png";

const { theme } = useTheme();
const dpWorldLogo = theme === "dark" ? dpWorldLogoDark : dpWorldLogoLight;
```

#### Dark Mode

- [ ] Dark mode uses Cinder (`#0F0F19`) as background
- [ ] Dark mode uses Maverick (`#F5F3F5`) as text
- [ ] Light mode uses Maverick/white as background
- [ ] Light mode uses Cinder as text
- [ ] Brand colors (Lucky Point, Radical Red, Caribbean Green) remain the same in both modes
- [ ] Use explicit light/dark variants for all visual properties when not using pre-configured Tailwind utility classes:
```tsx
className="bg-white dark:bg-black text-black dark:text-white"
```

#### Color Tokens

Use CSS custom properties defined in `index.css` (HSL format, space-separated). Reference via Tailwind utility classes (`bg-primary`, `text-muted-foreground`, etc.).

### 3. Official Gradients

DP World has three official gradient sets, each tied to a specific business division. Source .ai files are stored in `public/assets/gradients/` (both CMYK and RGB variants).

| Gradient | Division | Colors |
|---|---|---|
| **DP World Master** | Corporate / brand-wide | Lucky Point → Radical Red → Caribbean Green |
| **Ports and Terminals** | Ports & Terminals division | Lucky Point → Caribbean Green |
| **Economic Zones** | Economic Zones division | Lucky Point → Radical Red |

**CSS equivalents** (use these for web implementations):

```css
/* DP World Master Gradient */
background: linear-gradient(135deg, #1E1450 0%, #FF2261 50%, #00E68C 100%);

/* Ports and Terminals Gradient */
background: linear-gradient(135deg, #1E1450 0%, #00E68C 100%);

/* Economic Zones Gradient */
background: linear-gradient(135deg, #1E1450 0%, #FF2261 100%);
```

**Rules:**
- [ ] Only use the three official gradients above — do not invent new gradient combinations
- [ ] Gradients use brand colors only (Lucky Point, Radical Red, Caribbean Green)
- [ ] Use gradients sparingly — for hero sections, feature highlights, or decorative accents
- [ ] Do not use gradients on text (readability concern)
- [ ] Solid brand colors are preferred for interactive elements (buttons, links)

**Source files:**
- `public/assets/gradients/DP_World_Master_Gradient_CMYK.ai` / `_RGB.ai`
- `public/assets/gradients/Ports_And_Terminals_Gradient_CMYK.ai` / `_RGB.ai`
- `public/assets/gradients/Economic_Zones_Gradient_CMYK.ai` / `_RGB.ai`

### 4. Forbidden Patterns

- Using tints or shades of brand colors (e.g., lighter indigo, pastel red)
- Using non-brand colors for UI elements
- Using colored text for body copy
- Using Inter, Arial, Helvetica, or any non-Pilat font as primary
- Creating custom gradient combinations outside the three official gradients
- Modifying brand color hex values

### 5. Ensure `replit.md` References `design.md`

When bootstrapping a new project, add this section to `replit.md` (after Branding or Overview):

```markdown
## Design System
**Before making any UI, styling, layout, or component changes, read `design.md` at the project root.** It is the authoritative reference for the official DP World brand colors (Lucky Point, Radical Red, Caribbean Green, Maverick, Cinder), Pilat typography, spacing, border radii, shadows, component composability, header/nav structure, dark mode, responsive patterns, and mobile optimization. All visual decisions must follow `design.md`. Also read `.agents/skills/dpworld-branding/SKILL.md` for brand compliance rules.
```

### 6. If `design.md` Does Not Exist

If the project has no `design.md`, inform the user and ask whether they want one created from the standard template. Do not proceed with ad-hoc styling decisions — the design system ensures consistency across all apps.

## Font Files

Pilat font files are available from the DP World Shipping Solutions Hub and are synced via the skill-sync script. They should be placed in `public/assets/fonts/` (or the equivalent in your project):

- `PilatLight.ttf` — Pilat Light (300)
- `PilatDemi.ttf` — Pilat Demi (400)
- `PilatWideBook.ttf` — Pilat Wide Book (300)
- `PilatWideHeavy.ttf` — Pilat Wide Heavy (400)
