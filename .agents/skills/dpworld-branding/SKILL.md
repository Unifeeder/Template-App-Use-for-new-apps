---
name: dpworld-branding
description: Enforces official DP World brand compliance. Mandates Pilat fonts, the five official brand colors, no tints, Cinder/Maverick-only text, and the strict UX patterns (cursor-pointer, hover/focus/active, search-left/filter-right, the loading/empty/error trio, no grey-on-grey). Use before any styling, color, typography, layout, component, or interaction decision.
---

# DP World Branding & UX Enforcement

## When to Use

Before **any** task that touches: styling, colors, theming, typography, layout, interactive elements, components, pages, branding, logo placement, visual identity, hover/focus/active states, table toolbars, search/filter UI, loading/empty/error states, or charts.

## The Canonical Reference: `/designsystem`

Every Shipping Solutions app ships a single-file reference page at `/designsystem` (source: `src/pages/design-system.tsx`). It is the authoritative live specimen for:

- All five brand colors and the semantic surfaces derived from them
- Heading and body type scale (Pilat Demi + Inter)
- Spacing, radius, and shadow scales
- Buttons, forms, cards, tables, navigation, feedback, overlays, charts
- The mandatory UX patterns (filtering, search, hover affordance, color contrast, the loading/empty/error trio)

**Before designing or building any new screen, open `/designsystem` and copy the patterns from it.** It is delivered to every app via the daily GitHub sync. If a pattern is not on `/designsystem`, you are inventing — push back to the user before you ship.

---

## 1. Design Philosophy — Read This First

DP World apps are **clean, smooth, and airy**. They breathe. The UI feels open, not boxed in.

**The golden rule: when in doubt, add NOTHING.** No border, no shadow, no divider, no wrapper. Let whitespace and spacing do the work. Every visual element you add (a border, a shadow, a divider line) makes the UI heavier. Only add one when it serves a clear, specific purpose.

**Principles:**
- **Space over borders** — Group content with padding and margin, not by wrapping things in bordered containers
- **Less is more** — A clean page with generous whitespace always looks better than a dense page with lots of visual elements
- **Flat over elevated** — Avoid stacking shadows and borders. If you use a shadow, skip the border. If you use a border, skip the shadow.
- **Subtle over bold** — When you do need a visual separator, make it barely visible. `border-border/30` is better than `border-border`. Most of the time you need neither.
- **Content speaks** — Good typography and spacing create hierarchy. You should not need borders and boxes to make content readable.

**How this applies in practice:**
- A list of items? Use `space-y-3` between them. No borders, no dividers, no card wrappers needed.
- A section of content? Use `mt-8` or `pt-8` to separate it from the previous section. No `<hr>`, no `border-t`.
- A card that needs to stand out? Use `rounded-lg bg-card p-4` with maybe `shadow-sm`. No border needed.
- A data table? Light horizontal separators only (`divide-y divide-border/20`). No vertical lines, no cell borders, no outer border.

---

## 2. Typography — Pilat Demi + Inter

| Font | Weight | Role |
|---|---|---|
| Pilat Demi | 400 | All headings (h1–h4), header app title |
| Inter | 400 | Everything else — body, buttons, labels, nav, metadata, form controls |
| Pilat Wide Book | 300 | Large KPI numbers only (optional, sparingly) |

**Pilat Wide Heavy is BANNED in web apps.** It is for print only.

### Font application rules

**Critical: Do NOT rely on Tailwind's `font-sans` class.** It does not reliably resolve to Inter in all setups. Instead:

- Set Inter explicitly on the body in CSS:
  ```css
  body { font-family: 'Inter', system-ui, sans-serif; }
  ```
- For headings, use inline styles:
  ```tsx
  <h1 style={{ fontFamily: 'Pilat Demi' }}>Heading</h1>
  ```
- For body text that inherits from body, no extra style needed. If you need to be explicit:
  ```tsx
  <p style={{ fontFamily: 'Inter, sans-serif' }}>Body text</p>
  ```
- Global heading rule in CSS:
  ```css
  h1, h2, h3, h4 { font-family: 'Pilat Demi', sans-serif; }
  ```

### Font files

Pilat fonts go in `src/assets/fonts/` (NOT `public/`). Load with relative CSS paths:
```css
@font-face {
  font-family: 'Pilat Demi';
  src: url('./assets/fonts/PilatDemi.ttf') format('truetype');
  font-weight: 400;
}
```
Never use absolute `/` paths — they break when Vite uses a base path.

Inter: load via Google Fonts `<link>` in `index.html`, or bundle locally.

### Other typography rules
- App names in headers: NOT uppercase (only decorative headings may be uppercase)
- Monospace (code blocks): JetBrains Mono is acceptable; use mono for IDs, codes, timestamps
- Fluid title sizing — never use `truncate` on app titles. Use `clamp()`:
  ```tsx
  <h1 style={{ fontSize: 'clamp(0.7rem, 1vw + 0.35rem, 1rem)', fontFamily: 'Pilat Demi' }}>
    App Title
  </h1>
  ```

---

## 3. Colors — Five Official Colors Only

| Name | Hex | Usage |
|---|---|---|
| Lucky Point | `#1E1450` | Primary brand indigo — buttons, links, primary actions |
| Radical Red | `#FF2261` | Accent — alerts, destructive actions, anomalies |
| Caribbean Green | `#00E68C` | Accent — success, positive status, secondary actions |
| Maverick | `#F5F3F5` | Light neutral — light mode backgrounds, text on dark |
| Cinder | `#0F0F19` | Dark neutral — dark mode backgrounds, text on light |

**Rules:**
- No tints, shades, or variations of these colors (no pastel red, no lighter indigo)
- No colors outside this palette in the UI
- For lighter/darker surface variants, use opacity on brand colors — never invent new hex values
- All text is either Cinder or Maverick. **No colored body text** (no green text, no red text). Status is shown via badges or icons, not colored text. The one accepted exception is short status microcopy inside a colored badge (e.g. dark green text on a green-tinted badge background) — this is a badge, not body copy.
- Use CSS custom properties (HSL) for theme tokens. Reference via Tailwind: `bg-primary`, `text-muted-foreground`, etc.

### Dark mode
- Dark mode: Cinder (`#0F0F19`) background, Maverick (`#F5F3F5`) text
- Light mode: Maverick/white background, Cinder text
- Brand accent colors stay the same in both modes

### Official gradients (sparingly — hero sections and decorative accents only)

```css
/* DP World Master — corporate */
background: linear-gradient(135deg, #1E1450 0%, #FF2261 50%, #00E68C 100%);
/* Ports and Terminals */
background: linear-gradient(135deg, #1E1450 0%, #00E68C 100%);
/* Economic Zones */
background: linear-gradient(135deg, #1E1450 0%, #FF2261 100%);
```

No custom gradient combinations. No gradients on text. Solid colors for interactive elements.

---

## 4. Interactive Elements — Cursor, Hover, Focus, Active (Non-Negotiable)

**Every clickable element MUST have all four states.** A button without these is a bug, not a stylistic choice.

| State | Required class | Why |
|---|---|---|
| Cursor | `cursor-pointer` | Users see they can click — `<button>` does NOT do this on its own |
| Hover | `hover:bg-accent hover:text-accent-foreground` (or equivalent) | Visible feedback before clicking |
| Focus (keyboard) | `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` | Keyboard users must see focus |
| Active (press) | `active:bg-accent/80` (or `active:translate-y-0` for lift buttons) | Confirms the click landed |
| Transition | `transition-colors` | Smooth, not jumpy |

**Standard interactive class pattern:**
```tsx
className="cursor-pointer hover:bg-accent hover:text-accent-foreground active:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
```

**This applies to:** buttons, links, nav items, toggles, tab triggers, dropdown items, accordion triggers, sortable column headers, clickable table rows, swatch tiles, filter chips, icon buttons, pagination links, dropdown triggers, dialog/sheet/popover triggers, theme toggles, mobile menu buttons.

If you find yourself building a clickable element, **before you submit**, manually check on `/designsystem`: hover with the mouse, then tab to it with the keyboard. If you can't see what's interactive, you've shipped a bug.

---

## 5. Header — Mandatory Layout

Every DP World app has this exact header structure:

```
[Logo] | [Title + Subtitle] | [Nav Items] .............. [Theme Toggle] [Mobile Menu]
```

Nav items are grouped LEFT with logo and title. Right side has only theme toggle and mobile menu. **Every Shipping Solutions app must include a "Design System" nav link to `/designsystem`** so the canonical reference is one click away.

### Exact element specs (do not deviate)

| Element | className | style (inline) |
|---------|-----------|-----------------|
| **Header bar** | `sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60` | — |
| **Header inner** | `flex h-14 items-center px-3 sm:px-4` | — |
| **Logo** | `h-8 sm:h-9 lg:h-12` | — |
| **Dividers** | `h-6 w-px bg-border/50` | — |
| **App name (h1)** | `font-normal text-[16px]` | `{{ fontFamily: 'Pilat Demi' }}` |
| **Subtitle (p)** | `text-xs text-muted-foreground` | `{{ fontFamily: 'Inter, sans-serif' }}` |
| **Nav button / link** | `cursor-pointer inline-flex h-9 items-center justify-center rounded-md px-3 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors` | `{{ fontFamily: 'Inter, sans-serif' }}` |
| **Theme toggle / mobile btn** | Same as nav button + `w-9 justify-center` (mobile btn adds `md:hidden`) | — |

### Theme-aware logo

```tsx
const { theme } = useTheme();
const logoSrc = theme === "dark"
  ? `${import.meta.env.BASE_URL}assets/logos/DP_World_Logo_Colour_BlackBG_Vertical_CMYK-01.png`
  : `${import.meta.env.BASE_URL}assets/logos/DP_World_Logo_Colour_WhiteBG_Vertical_CMYK-01.png`;
```

Switch with React state via `useTheme()`, NOT CSS `dark:hidden` classes (unreliable).

### Header rules
- Nav items are **text-only** — no icons in header nav buttons
- Desktop nav hidden on mobile (`hidden md:flex`), mobile menu hidden on desktop (`md:hidden`)
- All interactive elements must have `cursor-pointer`, hover, active, and focus-visible states
- Dropdowns in header: Inter at `text-sm`, no Pilat fonts in menus

---

## 6. UX Patterns — How the System Behaves (Not Optional)

These patterns are enforced. The live specimen for each is on `/designsystem`. Copy from there.

### 6.1 Filtering & Search — the canonical layout

For any data view (table, list, grid):

- **Search input top-left** of the data region, with a `Search` icon inside on the left
- **Filter chips top-right** of the data region (status pills, category toggles)
- **Active filters are visible** as chips with an `X` to remove individually
- **"Clear all"** link appears only when at least one filter or query is active
- **Empty results** show an explicit "no match" state — never an empty table with no message
- **Inline filtering** (client-side, ≤500 items): filter on every keystroke, no debounce
- **Inline filtering** (client-side, >500 items): debounce 150ms
- **Server-backed search**: debounce 300ms; show a subtle spinner inside the input while loading
- **Global cross-app search** belongs in the ⌘K command palette, not in inline search

Don't:
- Hide all filters behind a single "Filters" button by default — surface the common ones
- Mount a filter sheet for ≤4 filter dimensions; chips inline are better
- Show an empty table when nothing matches — show the no-match state

### 6.2 The required trio: loading · empty · error

Any view that fetches data MUST implement all three states. A blank screen during fetch is a bug. A blank screen on no-data is a bug. An unhandled error is a bug.

| State | Pattern |
|---|---|
| **Loading** | Skeleton rows for tables/lists, `Progress` for known-duration jobs, centered `Loader2` spinner with label for short fetches |
| **Empty** | Icon + headline (Pilat Demi) + one-line lede (Inter, muted) + primary CTA |
| **Error** | Top-border accent (`border-t-2` Radical Red) + icon + headline + lede + retry button |

See `/designsystem` § Feedback for the canonical implementations. Copy them; don't invent.

### 6.3 Color contrast — earn the accent (no grey-on-grey)

Grey-on-grey is the most common failure mode. A KPI card with muted text on a muted background is invisible.

**Rules:**
- Primary numbers and headlines: `color: Cinder` (light mode) — never `text-muted-foreground`
- Use one accent (Lucky Point border-left, or a green/red status pill) per card to earn attention
- Muted text is for *secondary* labels only ("vs last week", "updated 5m ago") — never for the primary value
- If the eye doesn't land on the most important number within 200ms, the contrast is wrong

See `/designsystem` § UX Patterns → "Color contrast — earn the accent" for a side-by-side example.

### 6.4 Whitespace over borders

Already covered in § 1, repeated here because it's the most violated rule:

- Group with `space-y-3`, not bordered containers
- If you must have a border, use `border-border/30` or lighter
- The header is the only place that uses `border-border/50`
- Cards: pick `shadow-sm` OR a border, never both. Most cards need neither — use `bg-card` and let it sit on the muted page background

### 6.5 Hover affordance for non-button interactive elements

- **Sortable column headers**: `cursor-pointer` + `hover:text-foreground` + show direction arrow when active
- **Clickable table rows**: `cursor-pointer` + `hover:bg-muted/40` + entire row clickable, not just one cell
- **Swatch / preview tiles**: `cursor-pointer` + `hover:-translate-y-0.5 hover:shadow-md transition-all`
- **Dropdown / accordion triggers**: same four states as buttons (cursor, hover, focus, active)

### 6.6 Forms

- Label **above** the input, not floating
- Hint text **below** in `text-xs text-muted-foreground`
- Error text **replaces** hint on validation failure, in Radical Red, `text-xs`
- Validate on **blur**, never on every keystroke (except for length/format hints like "0/280")
- Required indicator: asterisk after label in Radical Red — never replace the label with an icon

---

## 7. Forbidden Patterns

These are **never** acceptable in a DP World app:

### Typography violations
- Using Pilat Wide Heavy in web apps (print only)
- Using Arial, Helvetica, or system fonts as primary body font
- Using Tailwind `font-sans` class instead of explicit `fontFamily: 'Inter, sans-serif'`
- Changing header element sizes from the mandatory spec
- Making app names uppercase in headers

### Color violations
- Using tints or shades of brand colors (no pastel red, no lighter indigo)
- Using non-brand colors anywhere in the UI
- Using colored text for body copy (use badges/icons for status)
- Inventing new gradient combinations
- **Grey-on-grey** primary content (muted-foreground value on muted background)

### Interactive element violations
- **Missing `cursor-pointer`** on any clickable element — every button, link, nav item, toggle, sortable header, clickable card, swatch, chip, tab trigger, accordion trigger
- **Missing hover states** — every interactive element needs visible hover feedback
- **Missing focus-visible states** — keyboard users must see focus rings
- **Missing active/press states** — clicks need confirmation feedback

### UX pattern violations
- Data view without **loading state** (blank during fetch)
- Data view without **empty state** (blank when no data)
- Data view without **error state** (silent failure)
- Filter UI without an **active-filter chip + clear-all** affordance
- Search input not in the top-left of its data region
- Filter chips not in the top-right of their data region
- Tables that hide their toolbar entirely behind a button when ≤4 filter dimensions exist
- Form validation that fires on every keystroke

### Visual weight violations — THE MOST COMMON PROBLEMS
- Adding borders to cards, sections, or containers by default — only add a border when there is a specific reason
- Using `border-border` at full opacity — if you must use a border, use `border-border/30` (header is the one exception at `/50`)
- Wrapping lists in bordered containers — use spacing between items instead
- Using `divide-y` as a default list separator — use `space-y` gap instead
- Adding shadows AND borders to the same element — pick one or neither
- Using heavy horizontal rules or `<hr>` to separate sections — use vertical spacing (`mt-8`, `pt-8`)
- Creating dense, boxed-in layouts where every piece of content is inside a bordered rectangle
- Using solid background colors to create visual sections when whitespace would suffice
- Adding icons to header navigation — text-only nav

### The tests
Before shipping any screen:
1. **Open `/designsystem` side by side.** Does my screen look like it belongs to the same product?
2. **Hover every clickable element.** Does the cursor change? Does anything visibly respond?
3. **Tab through with the keyboard.** Can you see where focus is at every step?
4. **Disable the network.** Do all data views show loading, then either content, empty, or error?
5. **Could I remove this border/shadow/divider** and still understand the layout? If yes, remove it.

---

## 8. Ensure `replit.md` References This Skill

When bootstrapping a new project, add to `replit.md`:

```markdown
## Branding
Read `.agents/skills/dpworld-branding/SKILL.md` before making any UI changes. It defines the official DP World brand colors, Pilat/Inter typography, header layout, mandatory interactive states (cursor-pointer + hover + focus + active), and UX patterns (filtering, the loading/empty/error trio, color contrast). Open `/designsystem` in the running app for the live reference specimen.
```

## Font Files Reference

- `src/assets/fonts/PilatDemi.ttf` — Pilat Demi (400) — headings, app title
- `src/assets/fonts/PilatWideBook.ttf` — Pilat Wide Book (300) — KPI numbers only
- `src/assets/fonts/PilatWideHeavy.ttf` — **NOT for web apps** (print/presentations only)
