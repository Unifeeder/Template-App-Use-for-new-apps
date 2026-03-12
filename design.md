# DP World Marine Services — Design System

## Brand Colors

All apps in the Shipping Solutions suite MUST use these exact colors. No tints, shades, or approximations are allowed.

| Name             | Hex       | Usage                                      |
|------------------|-----------|---------------------------------------------|
| Lucky Point      | `#1E1450` | Primary brand color, headers, nav backgrounds |
| Radical Red      | `#FF2261` | Accent, CTAs, destructive actions            |
| Caribbean Green  | `#00E68C` | Success states, positive indicators          |
| Maverick         | `#F5F3F5` | Light backgrounds, cards, surfaces           |
| Cinder           | `#0F0F19` | Dark mode backgrounds, dark text             |

### CSS Custom Properties (HSL)

Define these in `index.css` at the `:root` level for light mode and `.dark` for dark mode:

```css
:root {
  --lucky-point: 254 62% 20%;
  --radical-red: 345 100% 57%;
  --caribbean-green: 155 100% 45%;
  --maverick: 300 8% 95%;
  --cinder: 240 18% 8%;

  --background: var(--maverick);
  --foreground: var(--cinder);
  --primary: var(--lucky-point);
  --primary-foreground: 0 0% 100%;
  --accent: var(--radical-red);
  --accent-foreground: 0 0% 100%;
  --success: var(--caribbean-green);
  --success-foreground: var(--cinder);
  --card: 0 0% 100%;
  --card-foreground: var(--cinder);
  --border: 240 6% 85%;
  --input: 240 6% 85%;
  --ring: var(--lucky-point);
}

.dark {
  --background: var(--cinder);
  --foreground: var(--maverick);
  --primary: var(--lucky-point);
  --primary-foreground: 0 0% 100%;
  --accent: var(--radical-red);
  --accent-foreground: 0 0% 100%;
  --success: var(--caribbean-green);
  --success-foreground: var(--cinder);
  --card: 240 15% 12%;
  --card-foreground: var(--maverick);
  --border: 240 10% 20%;
  --input: 240 10% 20%;
  --ring: var(--radical-red);
}
```

## Typography

All Shipping Solutions apps use the **Pilat** font family exclusively. No Inter, system fonts, or other typefaces as primary fonts.

### Font Files

Located in `public/assets/fonts/`:

| File                  | Weight/Style     | Usage                     |
|-----------------------|------------------|---------------------------|
| `PilatLight.ttf`      | Light (300)      | Body text, paragraphs     |
| `PilatDemi.ttf`       | Demi/Semi (600)  | h3, h4, labels, emphasis  |
| `PilatWideBook.ttf`   | Book (400) Wide  | Subheadings, navigation   |
| `PilatWideHeavy.ttf`  | Heavy (900) Wide | h1, h2, hero text         |

### @font-face Declarations

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
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Pilat Wide';
  src: url('/assets/fonts/PilatWideBook.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Pilat Wide';
  src: url('/assets/fonts/PilatWideHeavy.ttf') format('truetype');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}
```

### Typography Scale

| Element   | Font Family  | Weight | Size         |
|-----------|-------------|--------|--------------|
| h1        | Pilat Wide  | 900    | 2.5rem+      |
| h2        | Pilat Wide  | 900    | 2rem         |
| h3        | Pilat       | 600    | 1.5rem       |
| h4        | Pilat       | 600    | 1.25rem      |
| body      | Pilat       | 300    | 1rem         |
| small     | Pilat       | 300    | 0.875rem     |
| nav items | Pilat Wide  | 400    | 0.875–1rem   |

## Components

- Use **shadcn/ui** primitives as the base component library
- All domain-specific components must compose shadcn/ui primitives
- Every interactive and display element MUST have a descriptive `data-testid` attribute

## Dark Mode

- Implement class-based dark mode using `.dark` class on `<html>` or `<body>`
- Persist user preference in `localStorage`
- Default to system preference via `prefers-color-scheme`

## Logo

Two variants are provided in `attached_assets/`:
- `DP_World_Logo_Colour_WhiteBG_Vertical_CMYK-01.png` — Light mode (white/light backgrounds)
- `DP_World_Logo_Colour_BlackBG_Vertical_CMYK-01.png` — Dark mode (dark backgrounds)

The logo MUST appear in the app header on every page. Switch variant based on current theme.

```tsx
import lightLogo from "@assets/DP_World_Logo_Colour_WhiteBG_Vertical_CMYK-01.png";
import darkLogo from "@assets/DP_World_Logo_Colour_BlackBG_Vertical_CMYK-01.png";
```

## Layout & Spacing

- Mobile-first responsive design
- Standard breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
- Spacing rhythm: 4px base unit (0.25rem increments)
- Container max-width: 1280px centered
- Card padding: 1.5rem (24px)
- Section gaps: 2rem (32px)

## Required Pages

Every Shipping Solutions app MUST include:
- A `/docs` route that renders `documentation.md` as a styled page
- The docs page must follow the app's design system (colors, typography, dark mode)
- The docs page should be accessible from navigation or header
