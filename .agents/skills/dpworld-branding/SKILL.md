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
| §3 | Typography — Pilat Demi for all headings, Inter for body, fluid `clamp()` for titles |
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

#### Typography — Pilat + Inter

| Font | Weight | Role |
|---|---|---|
| Pilat Demi | 400 | All headings (h1–h4), header bar app title, badges |
| Inter | 400 | Body copy, paragraphs, UI text, buttons, form labels, all other text |
| Pilat Wide Book | 300 | Data highlights, large statistics/KPI numbers only |

**Pilat Wide Heavy is NOT used in web apps.** It is too heavy for screen use — it belongs in print materials and presentations only. Do not use it for any heading, title, or label in a web application.

**Rules:**
- [ ] All headings (h1–h4) use Pilat Demi — never Pilat Wide Heavy
- [ ] Body text, UI elements, buttons, and form controls use Inter
- [ ] `@font-face` declarations load Pilat fonts from `/assets/fonts/`; Inter is loaded from Google Fonts or bundled
- [ ] Pilat Demi uses font-weight 400, Inter uses font-weight 400 for body
- [ ] JetBrains Mono is acceptable for monospace/code contexts only
- [ ] App names in headers should NOT be uppercase — only decorative headings may be uppercase

**Fluid title typography** — never use `truncate` on app titles. Use CSS `clamp()`:
```tsx
<h1 style={{ fontSize: 'clamp(0.7rem, 1vw + 0.35rem, 1rem)' }}>
  <span className="sm:hidden">Short</span>
  <span className="hidden sm:inline">Full Title</span>
</h1>
```

#### Logo Placement

- [ ] DP World vertical logo appears in the header of every app
- [ ] Light logo variant (`WhiteBG`) used on light backgrounds, dark variant (`BlackBG`) on dark backgrounds
- [ ] Logo is the first element in the header (far left)
- [ ] Logo followed by a vertical divider before app title
- [ ] Responsive sizing: `h-8` mobile, `h-9 sm:` small, `h-12 lg:` desktop — these exact classes are mandatory

**Theme-aware logos** — import both WhiteBG (light mode) and BlackBG (dark mode) logo variants, switch based on `useTheme()`:
```tsx
import dpWorldLogoLight from "@assets/DP_World_Logo_Colour_WhiteBG_Vertical_CMYK-01.png";
import dpWorldLogoDark from "@assets/DP_World_Logo_Colour_BlackBG_Vertical_CMYK-01.png";

const { theme } = useTheme();
const dpWorldLogo = theme === "dark" ? dpWorldLogoDark : dpWorldLogoLight;

<img src={dpWorldLogo} alt="DP World" className="h-8 sm:h-9 lg:h-12" />
```

#### Header Layout

The header follows a standardized layout pattern across all DP World apps:

```
[Logo] | [Title + Subtitle] | [Nav Items] ........................ [Theme Toggle] [Mobile Menu]
```

Nav items are grouped with the logo and title on the LEFT side, separated by a vertical divider. They are NOT centered or floating in the middle of the header. The right side only has the theme toggle and mobile menu.

**Structure:**
- [ ] Left group: Logo → divider → title block → divider → nav items — all in ONE flex row on the left
- [ ] Logo sits flush to the left edge — use tight padding (`px-3 sm:px-4`) and small gap (`gap-2`) so the logo stays in the corner, not pushed toward center
- [ ] First divider: separates logo from title block (`h-6 w-px bg-border/50`)
- [ ] Title block: app name (Pilat Demi, NOT uppercase, NOT Pilat Wide Heavy) + optional subtitle (Inter, muted)
- [ ] Second divider: separates title block from nav items (`h-6 w-px bg-border/50`)
- [ ] Nav items: ghost buttons immediately after the second divider — they sit adjacent to the title, not floating in the center
- [ ] Nav items use `variant="ghost"` or `variant="secondary"` button styles with Inter font
- [ ] Nav items are **text-only** — do not add Lucide icons to header nav buttons (icons create visual clutter and redundancy)
- [ ] Right group (far right, `ml-auto`): theme toggle + mobile hamburger menu only
- [ ] Desktop nav items are hidden on mobile (`hidden md:flex`), replaced by mobile menu
- [ ] Mobile menu is hidden on desktop (`md:hidden`)
- [ ] All header text (title, subtitle, nav items, dropdowns) must use a **uniform font size** — do not mix different sizes within the same header bar
- [ ] Dropdowns in the header (team selectors, region pickers, etc.) use Inter for all text content and follow the same font size as other header items
- [ ] All interactive elements must have hover, active, and focus-visible states

**Example:**
```tsx
<header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur">
  <div className="flex h-14 items-center px-3 sm:px-4">
    <div className="flex items-center gap-2">
      <img src={dpWorldLogo} alt="DP World" className="h-8 sm:h-9 lg:h-12" />
      <div className="h-6 w-px bg-border/50" />
      <div>
        <h1 className="text-sm font-normal" style={{ fontFamily: 'Pilat Demi' }}>
          App Name
        </h1>
        <p className="text-xs text-muted-foreground font-sans">Subtitle</p>
      </div>
      <div className="hidden md:block h-6 w-px bg-border/50" />
      <nav className="hidden md:flex items-center gap-1">
        <Button variant="ghost" size="sm" className="text-sm font-sans">Page One</Button>
        <Button variant="ghost" size="sm" className="text-sm font-sans">Page Two</Button>
      </nav>
    </div>
    <div className="flex items-center gap-2 ml-auto">
      <ThemeToggle />
      <Button variant="ghost" size="icon" className="md:hidden"><Menu className="h-5 w-5" /></Button>
    </div>
  </div>
</header>
```

#### Dropdowns & Select Menus

All dropdown components (Select, DropdownMenu, Combobox, Popover menus) must follow these rules:

- [ ] Dropdown trigger text uses Inter font, same size as surrounding header/UI text
- [ ] Dropdown menu items use Inter font at a consistent size (`text-sm`, 14px)
- [ ] No Pilat fonts inside dropdown menus — Pilat is only for headings
- [ ] Dropdown items should not have icons unless they serve a distinct purpose (e.g., a check mark for selected state)
- [ ] Selected item indicator: use a check mark (`✓` or Lucide `Check`) — not bold text, not colored text
- [ ] Dropdown borders, shadows, and radii follow the design system (see `design.md` §4-6)

**Example dropdown:**
```tsx
<Select>
  <SelectTrigger className="text-sm font-sans border-0 bg-transparent">
    <SelectValue placeholder="Select team" />
  </SelectTrigger>
  <SelectContent className="font-sans">
    <SelectItem value="central" className="text-sm">Central OPS</SelectItem>
    <SelectItem value="baltic" className="text-sm">Baltic OPS</SelectItem>
    <SelectItem value="scandinavian" className="text-sm">Scandinavian OPS</SelectItem>
  </SelectContent>
</Select>
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

#### Visual Weight — Keep It Light

DP World apps should feel clean and airy, not heavy or boxed in. Avoid bulky styling.

**Rules:**
- [ ] Borders should be subtle — use `border-border/50` or `border-border/40` instead of full-opacity `border-border`
- [ ] Header bottom border: `border-b border-border/50` — not a heavy solid line
- [ ] List separators: use `divide-y divide-border/30` or thin `border-b border-border/40` — not full solid borders on every row
- [ ] Cards: prefer `shadow-sm` with `border border-border/30` over thick solid borders
- [ ] Tables and data rows: use very light horizontal separators only — no vertical borders, no cell outlines
- [ ] Avoid wrapping every element in a border — use spacing and subtle background shifts to group content instead
- [ ] Container dividers (vertical/horizontal): use `bg-border/50` not `bg-border`
- [ ] When in doubt, reduce border opacity — `border-border/30` is almost always better than `border-border`

**Data Lists & Record Rows:**

The preferred pattern for lists of records (vessels, port calls, shipments, etc.) is standalone card-rows — each record is its own rounded container with very subtle styling. This keeps the UI open and breathable instead of dense and boxed-in.

- [ ] Each record row is a standalone rounded card: `rounded-lg border border-border/30 px-4 py-3`
- [ ] Rows are separated by vertical spacing (`space-y-2`), NOT by `divide-y` borders between them
- [ ] Record name/title: Pilat Demi, `text-sm` or `text-base`, foreground color
- [ ] Record metadata (IDs, dimensions, counts): Inter font, `text-sm text-muted-foreground`, inline after the name
- [ ] Optional expand/collapse chevron: small muted chevron on the left (`text-muted-foreground`), rotates when expanded
- [ ] Row hover state: subtle background shift (`hover:bg-accent/50 transition-colors`)
- [ ] No heavy outer wrapper border around the entire list — just the individual card-rows with spacing
- [ ] Section headers above lists: Pilat Demi for the title, Inter for breadcrumbs/subtitles, summary stats in a horizontal row

**Good — card-row pattern:**
```tsx
<div className="space-y-2">
  <div className="flex items-center gap-3 rounded-lg border border-border/30 px-4 py-3 hover:bg-accent/50 transition-colors">
    <ChevronRight className="h-4 w-4 text-muted-foreground" />
    <span className="font-normal" style={{ fontFamily: 'Pilat Demi' }}>AKACIA</span>
    <span className="text-sm text-muted-foreground font-sans">IMO 9315028</span>
    <span className="text-sm text-muted-foreground font-sans">720 TEU</span>
    <span className="text-sm text-muted-foreground font-sans">10080t</span>
  </div>
  <div className="flex items-center gap-3 rounded-lg border border-border/30 px-4 py-3 hover:bg-accent/50 transition-colors">
    <ChevronRight className="h-4 w-4 text-muted-foreground" />
    <span className="font-normal" style={{ fontFamily: 'Pilat Demi' }}>ANNABA</span>
    <span className="text-sm text-muted-foreground font-sans">IMO 9306201</span>
    <span className="text-sm text-muted-foreground font-sans">1035 TEU</span>
    <span className="text-sm text-muted-foreground font-sans">14490t</span>
  </div>
</div>
```

**Good — simple divider list (for lighter-weight lists):**
```tsx
<div className="divide-y divide-border/30">
  <div className="py-3 px-4">Row content</div>
  <div className="py-3 px-4">Row content</div>
</div>
```

**Bad — heavy bordered wrapper with solid dividers:**
```tsx
<div className="border border-border rounded-lg">
  <div className="border-b border-border py-3 px-4">Row content</div>
  <div className="border-b border-border py-3 px-4">Row content</div>
</div>
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

- Using Pilat Wide Heavy in web apps — it is too heavy for screen use (print/presentations only)
- Using tints or shades of brand colors (e.g., lighter indigo, pastel red)
- Using non-brand colors for UI elements
- Using colored text for body copy
- Using Arial, Helvetica, or system fonts as primary (Inter is the approved body font)
- Creating custom gradient combinations outside the three official gradients
- Modifying brand color hex values
- Adding icons to header navigation buttons (text-only nav)
- Mixing different font sizes within the same header bar
- Using full-opacity borders on lists, tables, or data rows (use `/30` to `/50` opacity)
- Wrapping every element in solid borders — use spacing and background shifts instead

### 5. Ensure `replit.md` References `design.md`

When bootstrapping a new project, add this section to `replit.md` (after Branding or Overview):

```markdown
## Design System
**Before making any UI, styling, layout, or component changes, read `design.md` at the project root.** It is the authoritative reference for the official DP World brand colors (Lucky Point, Radical Red, Caribbean Green, Maverick, Cinder), Pilat typography, spacing, border radii, shadows, component composability, header/nav structure, dark mode, responsive patterns, and mobile optimization. All visual decisions must follow `design.md`. Also read `.agents/skills/dpworld-branding/SKILL.md` for brand compliance rules.
```

### 6. If `design.md` Does Not Exist

If the project has no `design.md`, inform the user and ask whether they want one created from the standard template. Do not proceed with ad-hoc styling decisions — the design system ensures consistency across all apps.

## Font Files

Pilat font files should be placed in `public/assets/fonts/` (or the equivalent in your project):

- `PilatDemi.ttf` — Pilat Demi (400) — for all headings (h1–h4), header app title, badges
- `PilatWideBook.ttf` — Pilat Wide Book (300) — for data highlights and KPI numbers only
- `PilatWideHeavy.ttf` — **NOT for web apps** — included in the template for print/presentation use only

Inter is used for body text and UI elements. Load it via Google Fonts or bundle it locally.
