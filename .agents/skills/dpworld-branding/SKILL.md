---
name: dpworld-branding
description: Enforces official DP World brand compliance. Mandates Pilat fonts, the five official brand colors, no tints, and Cinder/Maverick-only text. Use before any styling, color, typography, or branding decision.
---

# DP World Branding Enforcement

## When to Use

Use this skill before any task involving styling, colors, theming, typography, layout, components, pages, branding, logo placement, or visual identity.

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
  body {
    font-family: 'Inter', system-ui, sans-serif;
  }
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
  h1, h2, h3, h4 {
    font-family: 'Pilat Demi', sans-serif;
  }
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
- Monospace (code blocks): JetBrains Mono is acceptable
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
| Radical Red | `#FF2261` | Accent — alerts, destructive actions, highlights |
| Caribbean Green | `#00E68C` | Accent — success, positive status, secondary actions |
| Maverick | `#F5F3F5` | Light neutral — light mode backgrounds, text on dark |
| Cinder | `#0F0F19` | Dark neutral — dark mode backgrounds, text on light |

**Rules:**
- No tints, shades, or variations of these colors (no pastel red, no lighter indigo)
- No colors outside this palette in the UI
- For lighter/darker surface variants, use opacity on brand colors — never invent new hex values
- All text is either Cinder or Maverick. No colored body text (no green text, no red text). Status is shown via badges or icons, not colored text.
- Use CSS custom properties (HSL) for theme tokens. Reference via Tailwind: `bg-primary`, `text-muted-foreground`, etc.

### Dark mode
- Dark mode: Cinder (`#0F0F19`) background, Maverick (`#F5F3F5`) text
- Light mode: Maverick/white background, Cinder text
- Brand accent colors stay the same in both modes

### Official gradients (use sparingly — hero sections and decorative accents only)

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

## 4. Header — Mandatory Layout

Every DP World app has this exact header structure:

```
[Logo] | [Title + Subtitle] | [Nav Items] .............. [Theme Toggle] [Mobile Menu]
```

Nav items are grouped LEFT with logo and title. Right side has only theme toggle and mobile menu.

### Exact sizes (do not deviate)

| Element | Spec |
|---------|------|
| Header bar | `h-14` (56px) |
| Logo | `h-8 sm:h-9 lg:h-12` |
| App name | 16px, Pilat Demi, `font-normal` |
| Subtitle | `text-xs`, Inter, `text-muted-foreground` |
| Nav items | `text-sm`, Inter, `text-muted-foreground` |
| Dividers | `h-6 w-px bg-border/50` |

### Theme-aware logo

```tsx
const { theme } = useTheme();
const dpWorldLogo = theme === "dark" ? dpWorldLogoDark : dpWorldLogoLight;
```

Import both `WhiteBG` (light mode) and `BlackBG` (dark mode) variants. Switch with React state, NOT CSS `dark:hidden` classes (unreliable).

### Copy-paste header

```tsx
<header className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/95 backdrop-blur">
  <div className="flex h-14 items-center px-3 sm:px-4">
    <div className="flex items-center gap-2">
      <img src={dpWorldLogo} alt="DP World" className="h-8 sm:h-9 lg:h-12" />
      <div className="h-6 w-px bg-border/50" />
      <div>
        <h1 className="font-normal text-[16px]" style={{ fontFamily: 'Pilat Demi' }}>
          App Name
        </h1>
        <p className="text-xs text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
          Marine Services
        </p>
      </div>
      <div className="hidden md:block h-6 w-px bg-border/50" />
      <nav className="hidden md:flex items-center gap-1">
        <button className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
          Page One
        </button>
      </nav>
    </div>
    <div className="flex items-center gap-2 ml-auto">
      <ThemeToggle />
      <MobileMenuButton className="md:hidden" />
    </div>
  </div>
</header>
```

### Header rules
- Nav items are **text-only** — no icons in header nav buttons
- Desktop nav hidden on mobile (`hidden md:flex`), mobile menu hidden on desktop (`md:hidden`)
- All interactive elements have hover and focus-visible states
- Dropdowns in header (team selectors, etc.): Inter at `text-sm`, no Pilat fonts in menus

---

## 5. Forbidden Patterns

These are **never** acceptable in a DP World app:

### Typography violations
- Using Pilat Wide Heavy in web apps (print only)
- Using Arial, Helvetica, or system fonts as primary body font
- Using Tailwind `font-sans` class instead of explicit `fontFamily: 'Inter, sans-serif'`
- Changing header element sizes from the mandatory spec
- Making app names uppercase in headers

### Color violations
- Using tints or shades of brand colors
- Using non-brand colors anywhere in the UI
- Using colored text for body copy (use badges/icons for status)
- Inventing new gradient combinations

### Visual weight violations — THE MOST COMMON PROBLEM
- **Adding borders to cards, sections, or containers by default** — only add a border when there is a specific reason (e.g., a form input field needs a visible boundary)
- **Using `border-border` at full opacity** — if you must use a border, use `border-border/30` maximum
- **Wrapping lists in bordered containers** — use spacing between items instead
- **Using `divide-y` as a default list separator** — use `space-y` gap instead
- **Adding shadows AND borders to the same element** — pick one or neither
- **Using heavy horizontal rules or `<hr>` to separate sections** — use vertical spacing (`mt-8`, `pt-8`)
- **Creating dense, boxed-in layouts** where every piece of content is inside a bordered rectangle
- **Using solid background colors to create visual sections** when whitespace would suffice
- **Adding icons to header navigation** — text-only nav

### The test
Look at your UI and ask: "Could I remove this border/shadow/divider and still understand the layout?" If yes, remove it.

---

## 6. Ensure `replit.md` References This Skill

When bootstrapping a new project, add to `replit.md`:

```markdown
## Branding
Read `.agents/skills/dpworld-branding/SKILL.md` before making any UI changes. It defines the official DP World brand colors, Pilat/Inter typography, header layout, and design philosophy (clean, airy, minimal borders).
```

## Font Files Reference

- `src/assets/fonts/PilatDemi.ttf` — Pilat Demi (400) — headings, app title
- `src/assets/fonts/PilatWideBook.ttf` — Pilat Wide Book (300) — KPI numbers only
- `src/assets/fonts/PilatWideHeavy.ttf` — **NOT for web apps** (print/presentations only)
