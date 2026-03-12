# DP World Marine Services — Design System

Universal design reference for all Marine Services Shipping Solutions applications. Use this document to bootstrap new projects or align existing apps to the shared visual standard.

**This design system is based on the official DP World brand guidelines from brand.dpworld.com.**

---

## 1. Logo

The DP World vertical logo is the primary brand mark across all apps. Two variants exist for light and dark backgrounds.

### 1.1 Assets

| Variant | Filename | Use When |
|---|---|---|
| Light background | `DP_World_Logo_Colour_WhiteBG_Vertical_CMYK-01.png` | Light theme (`bg-card` is light) |
| Dark background | `DP_World_Logo_Colour_BlackBG_Vertical_CMYK-01.png` | Dark theme (`bg-card` is dark) |

Both files should be placed in the project's asset directory (e.g. `attached_assets/`).

### 1.2 Theme-Aware Import

Import both variants and switch based on the current theme:

```tsx
import dpWorldLogoLight from "@assets/DP_World_Logo_Colour_WhiteBG_Vertical_CMYK-01.png";
import dpWorldLogoDark from "@assets/DP_World_Logo_Colour_BlackBG_Vertical_CMYK-01.png";

const { theme } = useTheme();
const dpWorldLogo = theme === "dark" ? dpWorldLogoDark : dpWorldLogoLight;
```

### 1.3 Placement & Sizing

- **Placement**: Far left of the header, followed by a vertical `1px` divider (`bg-border`)
- **Responsive sizing**:
  - Mobile: `h-6`
  - Small: `h-7` (`sm:`)
  - Desktop: `h-10` (`lg:`)
- **Attributes**: `w-auto object-contain flex-shrink-0`
- **Alt text**: `"DP World Logo"`

---

## 2. Color Palette

All colors are derived from the **five official DP World brand colors**. No tints of the brand palette should ever be used. Semantic UI tokens use opacity-based variants where needed.

### 2.1 Official Brand Colors

| Name | Hex | RGB | HSL (CSS) | Role |
|---|---|---|---|---|
| Lucky Point | `#1E1450` | 30, 20, 80 | `250 60% 20%` | Primary brand indigo |
| Radical Red | `#FF2261` | 255, 34, 97 | `343 100% 57%` | Signature accent |
| Caribbean Green | `#00E68C` | 0, 230, 140 | `157 100% 45%` | Signature accent |
| Maverick | `#F5F3F5` | 245, 243, 245 | `300 9% 96%` | Light neutral (text on dark, light backgrounds) |
| Cinder | `#0F0F19` | 15, 15, 25 | `240 25% 8%` | Dark neutral (text on light, dark backgrounds) |

### 2.2 Brand Color Rules

1. **No tints**: Never create tints, shades, or variations of the five brand colors. Use them at full value only.
2. **Text color**: Font color must only be **Cinder** (`#0F0F19`) or **Maverick** (`#F5F3F5`). No other text colors are permitted.
3. **Service colors**: Each DP World service uses one signature color (Radical Red or Caribbean Green) plus the two neutrals (Cinder and Maverick).
4. **Opacity for UI surfaces**: Where lighter/darker variants are needed for backgrounds, borders, and surfaces, use the brand colors with CSS opacity — never create new color values.

### 2.3 Core Semantic Tokens

All colors are defined as CSS custom properties using **HSL values without the `hsl()` wrapper** (space-separated, with `%` on S and L). Tailwind consumes them via `hsl(var(--token) / <alpha-value>)`.

Every token value is one of the five official brand colors. Surface differentiation is achieved through Tailwind's opacity utilities (e.g., `bg-border/10`, `bg-muted/50`) rather than creating new color values.

| Token | Light Mode | Dark Mode | Brand Color |
|---|---|---|---|
| `--background` | `300 9% 96%` | `240 25% 8%` | Maverick / Cinder |
| `--foreground` | `240 25% 8%` | `300 9% 96%` | Cinder / Maverick |
| `--primary` | `250 60% 20%` | `250 60% 20%` | Lucky Point |
| `--primary-foreground` | `300 9% 96%` | `300 9% 96%` | Maverick |
| `--accent` | `157 100% 45%` | `157 100% 45%` | Caribbean Green |
| `--accent-foreground` | `240 25% 8%` | `240 25% 8%` | Cinder |
| `--secondary` | `300 9% 96%` | `240 25% 8%` | Maverick / Cinder |
| `--secondary-foreground` | `240 25% 8%` | `300 9% 96%` | Cinder / Maverick |
| `--muted` | `300 9% 96%` | `240 25% 8%` | Maverick / Cinder |
| `--muted-foreground` | `240 25% 8%` | `300 9% 96%` | Cinder / Maverick (use at reduced opacity via utilities) |
| `--destructive` | `343 100% 57%` | `343 100% 57%` | Radical Red |
| `--destructive-foreground` | `300 9% 96%` | `300 9% 96%` | Maverick |

### 2.4 Surface & Border Tokens

All surface and border tokens use Maverick (light) or Cinder (dark). Borders use the opposing neutral — apply opacity via Tailwind utilities (`border-border/10`, `border-card-border/15`) to achieve desired subtlety.

| Token | Light Mode | Dark Mode | Brand Color |
|---|---|---|---|
| `--card` | `300 9% 96%` | `240 25% 8%` | Maverick / Cinder |
| `--card-foreground` | `240 25% 8%` | `300 9% 96%` | Cinder / Maverick |
| `--card-border` | `240 25% 8%` | `300 9% 96%` | Cinder / Maverick (at opacity) |
| `--popover` | `300 9% 96%` | `240 25% 8%` | Maverick / Cinder |
| `--popover-foreground` | `240 25% 8%` | `300 9% 96%` | Cinder / Maverick |
| `--popover-border` | `240 25% 8%` | `300 9% 96%` | Cinder / Maverick (at opacity) |
| `--border` | `240 25% 8%` | `300 9% 96%` | Cinder / Maverick (at opacity) |
| `--input` | `240 25% 8%` | `300 9% 96%` | Cinder / Maverick (at opacity) |
| `--ring` | `250 60% 20%` | `250 60% 20%` | Lucky Point |

### 2.5 Sidebar Tokens

| Token | Light Mode | Dark Mode | Brand Color |
|---|---|---|---|
| `--sidebar` | `300 9% 96%` | `240 25% 8%` | Maverick / Cinder |
| `--sidebar-foreground` | `240 25% 8%` | `300 9% 96%` | Cinder / Maverick |
| `--sidebar-border` | `240 25% 8%` | `300 9% 96%` | Cinder / Maverick (at opacity) |
| `--sidebar-primary` | `250 60% 20%` | `250 60% 20%` | Lucky Point |
| `--sidebar-accent` | `157 100% 45%` | `157 100% 45%` | Caribbean Green |
| `--sidebar-ring` | `250 60% 20%` | `250 60% 20%` | Lucky Point |

### 2.6 Chart Colors

All chart colors use the three non-neutral brand colors. Differentiate data series via opacity utilities when more than three series are needed.

| Token | Value (both modes) | Brand Color |
|---|---|---|
| `--chart-1` | `250 60% 20%` | Lucky Point |
| `--chart-2` | `157 100% 45%` | Caribbean Green |
| `--chart-3` | `343 100% 57%` | Radical Red |
| `--chart-4` | `250 60% 20%` | Lucky Point (use at different opacity) |
| `--chart-5` | `157 100% 45%` | Caribbean Green (use at different opacity) |

### 2.7 Status Colors

Defined directly in `tailwind.config.ts` using brand accent colors:

| Token | Value | Brand Color |
|---|---|---|
| `status.online` | `rgb(0 230 140)` | Caribbean Green |
| `status.away` | `rgb(255 34 97)` | Radical Red |
| `status.busy` | `rgb(255 34 97)` | Radical Red |
| `status.offline` | `hsl(240 25% 8% / 0.3)` | Cinder at 30% opacity (non-interactive indicator) |

### 2.8 Alarm / Severity Colors

Custom CSS variables for status-sensitive UI (using brand colors only):

| Token | Value (both modes) | Brand Color |
|---|---|---|
| `--alarm-critical` | `343 100% 57%` | Radical Red |
| `--alarm-warning` | `343 100% 57%` | Radical Red (use at reduced opacity for warning vs critical) |
| `--alarm-info` | `250 60% 20%` | Lucky Point |
| `--alarm-success` | `157 100% 45%` | Caribbean Green |

Tailwind mapping: `alarm.critical`, `alarm.warning`, `alarm.info`, `alarm.success`.

### 2.9 Interaction Overlays

| Variable | Light Mode | Dark Mode | Purpose |
|---|---|---|---|
| `--button-outline` | `rgba(0,0,0, .10)` | `rgba(255,255,255, .10)` | Outline button border |
| `--badge-outline` | `rgba(0,0,0, .05)` | `rgba(255,255,255, .05)` | Outline badge border |
| `--elevate-1` | `rgba(0,0,0, .03)` | `rgba(255,255,255, .04)` | Hover overlay |
| `--elevate-2` | `rgba(0,0,0, .08)` | `rgba(255,255,255, .09)` | Active/pressed overlay |

### 2.10 Official Gradients

DP World has three official gradient sets, each tied to a specific business division. Source .ai files (CMYK + RGB) are stored in `public/assets/gradients/`.

| Gradient | Division | Colors |
|---|---|---|
| **DP World Master** | Corporate / brand-wide | Lucky Point → Radical Red → Caribbean Green |
| **Ports and Terminals** | Ports & Terminals division | Lucky Point → Caribbean Green |
| **Economic Zones** | Economic Zones division | Lucky Point → Radical Red |

**CSS implementations:**

```css
/* DP World Master Gradient */
background: linear-gradient(135deg, #1E1450 0%, #FF2261 50%, #00E68C 100%);

/* Ports and Terminals Gradient */
background: linear-gradient(135deg, #1E1450 0%, #00E68C 100%);

/* Economic Zones Gradient */
background: linear-gradient(135deg, #1E1450 0%, #FF2261 100%);
```

**Rules:**
1. Only use the three official gradients — never invent new gradient combinations.
2. Gradients use brand colors only (Lucky Point, Radical Red, Caribbean Green).
3. Use gradients sparingly — hero sections, feature highlights, or decorative accents.
4. Do not use gradients on text (readability concern).
5. Solid brand colors are preferred for interactive elements (buttons, links).

**Source files:**
- `public/assets/gradients/DP_World_Master_Gradient_CMYK.ai` / `_RGB.ai`
- `public/assets/gradients/Ports_And_Terminals_Gradient_CMYK.ai` / `_RGB.ai`
- `public/assets/gradients/Economic_Zones_Gradient_CMYK.ai` / `_RGB.ai`

---

## 3. Typography

### 3.1 Font Family — Pilat by General Type Studio

DP World uses the Pilat font family exclusively. The font files are served from `public/assets/fonts/` and must be loaded via `@font-face` declarations.

| Font | Weight | CSS Family | Role |
|---|---|---|---|
| Pilat Wide Heavy | 400 | `'Pilat Wide'` | Main headings (h1, h2) — uppercase, bold presence |
| Pilat Wide Book | 300 | `'Pilat Wide'` | Data highlights, statistics — left-aligned |
| Pilat Demi | 400 | `'Pilat'` | Sub headers (h3, h4) — uppercase |
| Pilat Light | 300 | `'Pilat'` | Body copy, paragraphs, UI text |

Tailwind font classes:

| Role | Variable | Stack |
|---|---|---|
| Display (headings) | `--font-display` | `'Pilat Wide', sans-serif` |
| Sans (body/UI) | `--font-sans` | `'Pilat', sans-serif` |
| Mono (data/codes) | `--font-mono` | `'JetBrains Mono', monospace` |

Tailwind classes: `font-display`, `font-sans`, `font-mono`.

### 3.2 @font-face Declarations

```css
@font-face {
  font-family: 'Pilat';
  src: url('/assets/fonts/PilatLight.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Pilat';
  src: url('/assets/fonts/PilatDemi.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Pilat Wide';
  src: url('/assets/fonts/PilatWideBook.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Pilat Wide';
  src: url('/assets/fonts/PilatWideHeavy.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

### 3.3 Text Scale Patterns

For the **app title** and other prominent header text, use CSS `clamp()` for fluid sizing that scales smoothly with viewport width — no breakpoint jumps:

| Use Case | `clamp()` value | Range |
|---|---|---|
| App title (header) | `clamp(0.7rem, 1vw + 0.35rem, 1rem)` | ~11px → 16px |
| Header subtitle | `clamp(0.575rem, 0.5vw + 0.3rem, 0.75rem)` | ~9px → 12px |

For **body content** and non-header elements, use Tailwind's responsive prefixes:

| Use Case | Mobile | Small (`sm:`) | Desktop (`lg:`) |
|---|---|---|---|
| Section heading | `text-xs` | `text-sm` | `text-sm` |
| Body text | `text-xs` | `text-xs` | `text-sm` |
| Compact labels | `text-[10px]` | `text-[10px]` | `text-xs` |
| Micro labels | `text-[9px]` | `text-[9px]` | `text-[10px]` |
| Subtitle / caption | `text-[10px]` | `text-[10px]` | `text-xs` |

Prefer `clamp()` for any text that must scale fluidly across a wide range of viewport widths. Use Tailwind breakpoint classes for elements with discrete sizing needs.

### 3.4 Font Weight Conventions

| Purpose | Weight | Font |
|---|---|---|
| Page/section titles (h1, h2) | `font-normal` (400) | Pilat Wide Heavy (`font-display`), uppercase |
| Sub-headers (h3, h4) | `font-normal` (400) | Pilat Demi (`font-sans`), uppercase |
| Body copy / UI text | `font-light` (300) | Pilat Light (`font-sans`) |
| Data values / statistics | `font-light` (300) | Pilat Wide Book (`font-display font-light`) |
| Badges | `font-normal` (400) | Pilat Demi (`font-sans`) |
| Buttons | `font-normal` (400) | Pilat Demi (`font-sans`) |

### 3.5 Heading Rules

- All headings (h1-h4) should be **uppercase** following DP World brand guidelines
- Main headings use `font-display font-normal uppercase`
- Sub-headings use `font-sans font-normal uppercase`

### 3.6 Numeric Data

Use `tabular-nums` for aligned columns of numbers. Use `font-mono` for codes, identifiers, and reference values.

---

## 4. Spacing

### 4.1 Base Unit

```css
--spacing: 0.25rem; /* 4px */
```

The standard Tailwind scale applies (multiples of 4px).

### 4.2 Responsive Spacing Patterns

Apply spacing that scales across breakpoints:

| Context | Mobile | Small (`sm:`) | Desktop (`lg:`) |
|---|---|---|---|
| Page horizontal padding | `px-2` | `px-3` | `px-6` |
| Header vertical padding | `py-1.5` | `py-2` | `py-4` |
| Element gaps | `gap-1.5` | `gap-2` | `gap-4` |
| Card internal padding | `p-3` | `p-4` | `p-6` |
| Section spacing | `space-y-2` | `space-y-3` | `space-y-4` |

### 4.3 Dividers

Vertical dividers between header sections:
```
<div className="h-5 sm:h-6 lg:h-8 w-px bg-border flex-shrink-0" />
```

Horizontal dividers between content sections:
```
<div className="h-px bg-border" />
```

Or use `border-t border-border` / `border-b border-border` on adjacent elements.

---

## 5. Border Radius

| Token | Value | Pixels |
|---|---|---|
| `--radius` (default) | `.625rem` | 10px |
| `rounded-lg` | `.5625rem` | 9px |
| `rounded-md` | `.375rem` | 6px |
| `rounded-sm` | `.1875rem` | 3px |
| `rounded-xl` | Tailwind default | Cards |

Cards use `rounded-xl`. Badges and buttons use `rounded-md`. Inputs use `rounded-md`.

---

## 6. Shadows

A progressive shadow scale defined as CSS variables. Dark mode uses heavier opacity for visibility against dark surfaces.

**Light Mode**

| Token | Value |
|---|---|
| `--shadow-2xs` | `0px 1px 2px 0px rgba(0,0,0,0.05)` |
| `--shadow-xs` | `0px 1px 3px 0px rgba(0,0,0,0.08)` |
| `--shadow-sm` | `0px 2px 4px 0px rgba(0,0,0,0.08), 0px 1px 2px -1px rgba(0,0,0,0.06)` |
| `--shadow` | `0px 4px 6px -1px rgba(0,0,0,0.08), 0px 2px 4px -2px rgba(0,0,0,0.06)` |
| `--shadow-md` | `0px 6px 10px -1px rgba(0,0,0,0.08), 0px 4px 6px -2px rgba(0,0,0,0.05)` |
| `--shadow-lg` | `0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.08)` |
| `--shadow-xl` | `0px 20px 25px -5px rgba(0,0,0,0.1), 0px 10px 10px -5px rgba(0,0,0,0.06)` |
| `--shadow-2xl` | `0px 25px 50px -12px rgba(0,0,0,0.2)` |

**Dark Mode** (heavier opacity for visibility on dark surfaces)

| Token | Value |
|---|---|
| `--shadow-2xs` | `0px 1px 2px 0px rgba(0,0,0,0.3)` |
| `--shadow-xs` | `0px 1px 3px 0px rgba(0,0,0,0.4)` |
| `--shadow-sm` | `0px 2px 4px 0px rgba(0,0,0,0.35), 0px 1px 2px -1px rgba(0,0,0,0.3)` |
| `--shadow` | `0px 4px 6px -1px rgba(0,0,0,0.35), 0px 2px 4px -2px rgba(0,0,0,0.3)` |
| `--shadow-md` | `0px 6px 10px -1px rgba(0,0,0,0.35), 0px 4px 6px -2px rgba(0,0,0,0.25)` |
| `--shadow-lg` | `0px 10px 15px -3px rgba(0,0,0,0.4), 0px 4px 6px -4px rgba(0,0,0,0.35)` |
| `--shadow-xl` | `0px 20px 25px -5px rgba(0,0,0,0.4), 0px 10px 10px -5px rgba(0,0,0,0.3)` |
| `--shadow-2xl` | `0px 25px 50px -12px rgba(0,0,0,0.6)` |

Cards use `shadow-sm`. Popovers/tooltips use `shadow-md` or `shadow-lg`.

---

## 7. Elevation System

Interactive elements use a pseudo-element overlay system for hover and active states. This keeps interaction feedback consistent and theme-aware without overriding background colors.

### 7.1 CSS Classes

| Class | Effect | Overlay Variable |
|---|---|---|
| `hover-elevate` | Shows overlay on hover | `--elevate-1` |
| `hover-elevate-2` | Stronger overlay on hover | `--elevate-2` |
| `active-elevate` | Shows overlay on active/press | `--elevate-1` |
| `active-elevate-2` | Stronger overlay on active/press | `--elevate-2` |
| `toggle-elevate` | Persistent overlay when `.toggle-elevated` is set | `--elevate-2` |

### 7.2 How It Works

- Elements with elevation classes get `position: relative; z-index: 0`
- A `::after` pseudo-element covers the element with `position: absolute; inset: 0`
- On hover/active, the pseudo-element's `background-color` is set to the semi-transparent overlay
- Elements with `border` get `inset: -1px` to cover the border area
- Opt out with `no-default-hover-elevate` or `no-default-active-elevate`

### 7.3 Opaque Button Borders

Buttons use relative color syntax to compute borders:
```css
--primary-border: hsl(from hsl(var(--primary)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);
```
`--opaque-button-border-intensity` is `-8` in light mode, `+9` in dark mode. This produces borders that are subtly darker (light) or lighter (dark) than their fill.

---

## 8. Component Composability

All apps share the same `shadcn/ui` primitives, customized once at the component level. Domain-specific components compose these primitives — they never bypass them.

### 8.1 Principle

```
UI Primitives (Badge, Button, Card, Dialog, Tooltip, ...)
    └── Domain Components (StatusCard, DataRow, DetailPane, ...)
         └── Page Layouts (compose domain components)
```

Every interactive surface is built from the shared primitives. This ensures elevation, focus rings, border styles, and spacing are consistent without per-component overrides.

### 8.2 Badge

Base: `whitespace-nowrap inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover-elevate`

| Variant | Styling |
|---|---|
| `default` | `bg-primary text-primary-foreground shadow-xs border-transparent` |
| `secondary` | `bg-secondary text-secondary-foreground border-transparent` |
| `destructive` | `bg-destructive text-destructive-foreground shadow-xs border-transparent` |
| `outline` | `border [border-color:var(--badge-outline)] shadow-xs` |

Compact badges for counts and labels: override with `text-[9px] px-1 py-0 min-w-0 h-4`.

### 8.3 Button

Base: `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2`

| Variant | Styling |
|---|---|
| `default` | `bg-primary text-primary-foreground border border-primary-border` |
| `destructive` | `bg-destructive text-destructive-foreground border border-destructive-border` |
| `outline` | `border [border-color:var(--button-outline)] shadow-xs` |
| `secondary` | `bg-secondary text-secondary-foreground border border-secondary-border` |
| `ghost` | `border border-transparent` (no visible border, no background) |

Sizing uses `min-h` instead of fixed `h` to allow content expansion:

| Size | Class |
|---|---|
| `default` | `min-h-9 px-4 py-2` |
| `sm` | `min-h-8 px-3 text-xs` |
| `lg` | `min-h-10 px-8` |
| `icon` | `h-9 w-9` |

### 8.4 Card

Base: `rounded-xl border bg-card border-card-border text-card-foreground shadow-sm`

Sub-components:
- `CardHeader`: `flex flex-col space-y-1.5 p-6`
- `CardTitle`: `text-2xl font-normal leading-none tracking-tight uppercase`
- `CardDescription`: `text-sm text-muted-foreground`
- `CardContent`: `p-6 pt-0`
- `CardFooter`: `flex items-center p-6 pt-0`

For compact cards, override padding to `p-3` or `p-4`.

### 8.5 Composition Example

A domain component composes primitives without reimplementing styling:

```tsx
function DataRow({ icon: Icon, label, value, highlight }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-xs">{label}</span>
      </div>
      <span className={`text-sm font-normal ${highlight ? "text-primary" : "text-foreground"}`}>
        {value}
      </span>
    </div>
  );
}
```

This pattern (icon + label left, value right, `py-1.5` vertical rhythm) is the standard `DataRow` layout used across all apps. Combine with `Badge` for status values, or plain text for data values.

---

## 9. Header

The header is shared across all apps. Its structure is fixed; only the right-side content varies per app.

### 9.1 Container

```tsx
<header className="flex items-center justify-between gap-1 sm:gap-2 lg:gap-4 px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-4 border-b border-border bg-card">
```

### 9.2 Left Side (Fixed)

```
[ Logo ] | [ AppIcon + Title / Subtitle ] | [ Desktop Nav ]
```

1. **DP World Logo** — responsive height (h-6 / h-7 / h-10)
2. **Vertical divider** — `h-5 sm:h-6 lg:h-8 w-px bg-border`
3. **App icon + title** — a `lucide-react` icon (`h-4 w-4 lg:h-5 lg:w-5 text-primary`) paired with:
   - Title: fluid `clamp(0.7rem, 1vw + 0.35rem, 1rem)` with `font-normal text-foreground uppercase` — scales ~11px to 16px (never use `truncate`)
   - Subtitle: fluid `clamp(0.575rem, 0.5vw + 0.3rem, 0.75rem)` with `text-muted-foreground hidden sm:block`
4. **Vertical divider** — `hidden md:block`
5. **Desktop nav** — `hidden md:flex items-center gap-1`, uses `Button` with `variant="secondary"` for the active route and `variant="ghost"` for inactive routes, each paired with a `lucide-react` icon

### 9.3 Right Side (Variable Per App)

The right content area holds app-specific utilities. The content differs per application but follows consistent patterns:

- **Status indicators** — icon + label badge showing connectivity or sync state
- **Timestamps** — last-update text with tooltip for detailed breakdown
- **Theme toggle** — ghost button switching Sun/Moon icons
- **Action dialogs** — icon buttons opening Dialog overlays (history, logs, settings)
- **User greeting** — `text-[10px] text-muted-foreground` with User icon

All right-side items use `flex items-center gap-1 sm:gap-2`.

### 9.4 Fluid Title Sizing

Never use `truncate` on the app title. Use CSS `clamp()` for fluid font sizing so the title scales smoothly with viewport width:

```tsx
<h1
  className="font-normal text-foreground leading-tight uppercase"
  style={{ fontSize: 'clamp(0.7rem, 1vw + 0.35rem, 1rem)' }}
>
  <span className="sm:hidden">Short</span>
  <span className="hidden sm:inline">Full Application Title</span>
</h1>
```

- The `clamp(min, preferred, max)` formula ensures the font size scales linearly between a minimum and maximum based on viewport width
- Use a mobile-only short label (`sm:hidden`) and the full title from `sm:` up
- The fluid sizing handles all intermediate widths — no need for `md:` or `lg:` breakpoint variants on the title itself

---

## 10. Mobile Navigation

A fixed bottom navigation bar replaces the desktop nav on small screens.

### 10.1 Structure

```tsx
<nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card pb-[env(safe-area-inset-bottom)]">
  <div className="flex items-center justify-around">
    {/* Tab buttons */}
  </div>
</nav>
```

### 10.2 Tab Button Pattern

```tsx
<button className={`flex flex-col items-center gap-0.5 py-2.5 w-full transition-colors ${
  isActive ? "text-primary" : "text-muted-foreground"
}`}>
  <Icon className="h-5 w-5" />
  <span className="text-[10px] font-normal uppercase">Label</span>
</button>
```

### 10.3 Page Body Padding

The main content area must account for the mobile nav height:
```tsx
<div className="h-full pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">
  {/* Routes */}
</div>
```

---

## 11. Page Layout

All pages follow the same structural pattern.

### 11.1 Shell

```tsx
<div className="h-full bg-background overflow-hidden flex flex-col">
  <Header />
  <main className="flex-1 overflow-y-auto">
    {/* Page content */}
  </main>
</div>
```

- The outermost container is `h-full` and `overflow-hidden` to prevent double scrollbars
- `<main>` is `flex-1 overflow-y-auto` — it fills remaining height and scrolls independently
- The header is outside the scroll area (always visible)

### 11.2 Content Width

For full-width data views (tables, charts, timelines): no max-width constraint, pad with `px-2 sm:px-3 lg:px-6`.

For form/document pages: optionally constrain with `max-w-4xl mx-auto`.

### 11.3 Side Panels / Detail Panes

Detail panes slide in from the right as a flex sibling of the main content:

```tsx
<div className="flex h-[calc(100%-headerHeight)] overflow-hidden">
  <main className="flex-1 overflow-y-auto">
    {/* List / grid content */}
  </main>
  {selectedItem && (
    <aside className="w-[630px] max-w-full border-l border-border bg-card overflow-hidden flex flex-col">
      {/* Pane header, tabs, scrollable body */}
    </aside>
  )}
</div>
```

On mobile, detail panes are replaced by full-screen views or bottom sheets.

---

## 12. Mobile Optimization

### 12.1 Breakpoint

The primary mobile/desktop breakpoint is **768px** (`md:`). Use a shared hook:

```tsx
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    onChange();
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}
```

### 12.2 Responsive Strategies

| Strategy | Implementation |
|---|---|
| **Hide/show content** | `hidden md:block` / `block md:hidden` |
| **Shorter labels** | `<span className="sm:hidden">Act</span><span className="hidden sm:inline">Action Taken</span>` |
| **Responsive icons** | `h-4 w-4 lg:h-5 lg:w-5` |
| **Responsive text** | `text-[9px] lg:text-[10px]`, `text-xs sm:text-sm lg:text-lg` |
| **Responsive spacing** | `gap-1.5 sm:gap-2 lg:gap-4`, `px-2 sm:px-3 lg:px-6` |
| **Touch targets** | `min-h-8` to `min-h-10` on buttons; `py-2.5` on nav tabs |
| **Tooltips** | Disable on mobile (tooltips are hover-only); use expandable sections instead |
| **Detail views** | Side panes on desktop → full-screen or dialog on mobile |
| **Grid columns** | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` |

### 12.3 Safe Area Handling

Always account for device safe areas (notch, home indicator):

```css
html {
  padding-top: env(safe-area-inset-top);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

Mobile nav uses `pb-[env(safe-area-inset-bottom)]`.

### 12.4 Full-Height Layout

Use `100dvh` (dynamic viewport height) for the root container to handle mobile browser chrome:

```css
#root {
  height: 100dvh;
}
```

---

## 13. Dark Mode

### 13.1 Configuration

```ts
// tailwind.config.ts
darkMode: ["class"]
```

### 13.2 Implementation

Theme is managed via a `useTheme` hook (not a context provider). The hook manages the `dark` class on `document.documentElement` with `localStorage` persistence. Default is `"light"`.

```tsx
type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return "light";
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
  }, []);

  return { theme, toggleTheme, setTheme };
}
```

Call `useTheme()` in the Header (or wherever the toggle lives). No wrapping provider is needed.

### 13.3 Usage Rules

- Dark mode: Cinder (`#0F0F19`) background, Maverick (`#F5F3F5`) text
- Light mode: Maverick/white background, Cinder text
- All visual properties must work in both modes via the CSS variable system
- When using Tailwind utility classes mapped to CSS variables (`bg-card`, `text-foreground`, `border-border`), dark mode is automatic
- For hardcoded colors, pair with explicit dark variants
- Dark mode is the default/primary theme for apps used in 24/7 environments

---

## 14. Scrollbar Styling

Thin, subtle scrollbars for a clean UI:

```css
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.2);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.4);
}

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--muted-foreground) / 0.2) transparent;
}
```

---

## 15. Icons

| Source | Use Case | Import |
|---|---|---|
| `lucide-react` | All UI icons (actions, navigation, status, data) | `import { Ship, AlertTriangle, ... } from "lucide-react"` |
| `react-icons/si` | Company/brand logos (third-party services) | `import { SiGithub, ... } from "react-icons/si"` |

Standard icon sizing:
- Inline with text: `h-3.5 w-3.5`
- Navigation / buttons: `h-4 w-4`
- Mobile nav: `h-5 w-5`
- Empty state illustrations: `h-8 w-8`
- Large feature icons: `h-10 w-10`

Always pair with `flex-shrink-0` when inside flex containers.

---

## 16. Data Test IDs

Every interactive and meaningful display element must have a `data-testid` attribute.

### 16.1 Naming Patterns

| Element Type | Pattern | Example |
|---|---|---|
| Buttons | `button-{action}` | `button-submit`, `button-close-pane` |
| Inputs | `input-{field}` | `input-email`, `input-search` |
| Links / nav | `nav-{destination}` | `nav-port-calls`, `nav-mobile-docs` |
| Text displays | `text-{content}` | `text-app-title`, `text-username` |
| Images | `img-{subject}` | `img-dpworld-logo` |
| Badges | `badge-{type}` | `badge-status`, `badge-source-type` |
| Tabs | `tab-{section}` | `tab-detail-overview`, `tab-detail-data` |
| Cards / rows | `card-{type}-{id}` | `card-item-${id}`, `row-entry-${idx}` |
| Panes | `pane-{name}` | `pane-detail`, `pane-settings` |

### 16.2 Dynamic IDs

For repeated elements, append a unique identifier:
```tsx
data-testid={`card-item-${item.id}`}
data-testid={`button-action-${entry.id}`}
```

---

## 17. Shared Dependencies

All apps use the same core stack:

| Category | Package |
|---|---|
| Framework | React 18+ (Vite bundler) |
| Routing | `wouter` |
| Data fetching | `@tanstack/react-query` v5 |
| UI primitives | `shadcn/ui` (Radix + Tailwind) |
| Styling | Tailwind CSS 3 + `tailwindcss-animate` + `@tailwindcss/typography` |
| Forms | `react-hook-form` + `@hookform/resolvers/zod` |
| Validation | `zod` + `drizzle-zod` |
| Icons | `lucide-react`, `react-icons` |
| Variant management | `class-variance-authority` |
| Class merging | `tailwind-merge` via `cn()` utility |
| Font | Pilat (served from hub, synced via skill-sync) |

### 17.1 The `cn()` Utility

All className composition uses the shared `cn()` helper:

```tsx
import { cn } from "@/lib/utils";

className={cn("base-classes", conditional && "conditional-class", className)}
```

---

## 18. App Provider Stack

Every app wraps its root in the same provider order. Theme is handled via the `useTheme` hook (Section 13), not a provider — it is called inside the Header component.

```tsx
<QueryClientProvider client={queryClient}>
  <TooltipProvider delayDuration={300} skipDelayDuration={100}>
    <Toaster />
    <div className="h-full pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0 select-none">
      <Router />
    </div>
    <MobileNav />
  </TooltipProvider>
</QueryClientProvider>
```

Add any app-specific context providers (real-time connections, auth state) as additional wrappers inside `TooltipProvider`.

- `select-none` on the main container prevents accidental text selection in data-dense UIs. Use `select-text` on specific elements where text selection should be allowed (detail panes, documentation pages).

---

## 19. Animation & Transitions

| Purpose | Implementation |
|---|---|
| Accordion open/close | `accordion-down` / `accordion-up` keyframes (0.2s ease-out) |
| Expandable sections | `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` via `.expand-transition` |
| General transitions | `transition-colors` on interactive elements (default Tailwind duration) |
| Pane slide-in | `transition-transform duration-300 ease-in-out` |

---

## 20. Checklist for New Apps

1. Copy `index.css` with all CSS variables (light + dark mode) and `@font-face` declarations for Pilat
2. Copy `tailwind.config.ts` with color mappings, border radii, font families, and plugins
3. Copy `components/ui/` directory (Badge, Button, Card, Dialog, Tooltip, etc.)
4. Copy `lib/utils.ts` with the `cn()` helper
5. Place the DP World logo asset and configure the `@assets` import alias
6. Place Pilat font files in `public/assets/fonts/` (PilatLight.ttf, PilatDemi.ttf, PilatWideBook.ttf, PilatWideHeavy.ttf)
7. Implement the `Header` component following Section 9
8. Implement the `MobileNav` component following Section 10
9. Set up the provider stack following Section 18
10. Set `darkMode: ["class"]` and implement the theme provider (Section 13)
11. Add safe-area CSS and `100dvh` root height (Section 12)
12. Add scrollbar styling (Section 14)
13. Apply `data-testid` attributes to all interactive and display elements (Section 16)
