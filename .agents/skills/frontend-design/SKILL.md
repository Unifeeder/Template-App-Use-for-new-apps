---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces. Provides guidelines for visual hierarchy, layout systems, component architecture, responsive design, accessibility, and modern CSS patterns. Originally by Anthropic (community skill).
---

# Frontend Design

## When to Use

Use this skill when:
- Designing or building new UI pages or layouts
- Creating component libraries or design systems
- Improving visual hierarchy, spacing, or typography
- Building responsive layouts across breakpoints
- Implementing animations, transitions, or micro-interactions
- Reviewing UI for production readiness

## Core Principles

### 1. Visual Hierarchy

Establish clear information hierarchy through:
- **Size contrast** — Primary content should be noticeably larger than secondary
- **Weight contrast** — Use font weight to distinguish headings from body text
- **Color contrast** — Reserve high-contrast colors for primary actions and critical info
- **Spacing** — Use generous whitespace to group related elements and separate sections
- **Depth** — Use subtle shadows and elevation to indicate interactive or elevated elements

### 2. Layout Systems

#### Grid-Based Layouts
- Use CSS Grid for two-dimensional layouts (dashboards, galleries, complex pages)
- Use Flexbox for one-dimensional alignment (navbars, card rows, form fields)
- Maintain consistent column counts: 12-column grid for desktop, 4-column for mobile
- Use `gap` property instead of margins for grid/flex spacing

#### Container Patterns
```css
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .container { padding: 0 1.5rem; }
}

@media (min-width: 1024px) {
  .container { padding: 0 2rem; }
}
```

### 3. Responsive Design

- **Mobile-first** — Start with mobile layout, enhance for larger screens
- **Breakpoints** — Use consistent breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
- **Fluid typography** — Use `clamp()` for responsive font sizes
- **Flexible images** — Always set `max-width: 100%` on images
- **Touch targets** — Minimum 44x44px for interactive elements on mobile

### 4. Component Architecture

#### Composable Components
- Build small, focused components that do one thing well
- Use composition over configuration — prefer `children` and slots over complex prop APIs
- Separate container (data/logic) from presentational (visual) components
- Keep component files under 200 lines; extract sub-components when growing

#### State Management in UI
- Lift state only as high as necessary
- Use controlled components for forms
- Derive visual states from data states (loading, error, empty, populated)
- Always handle all states: loading skeletons, error boundaries, empty states

### 5. Accessibility

- **Semantic HTML** — Use appropriate elements (`button`, `nav`, `main`, `article`, `section`)
- **ARIA labels** — Add `aria-label` to icon-only buttons and non-obvious controls
- **Keyboard navigation** — All interactive elements must be keyboard-accessible
- **Focus management** — Visible focus rings, logical tab order
- **Color contrast** — Minimum 4.5:1 for normal text, 3:1 for large text (WCAG AA)
- **Screen reader text** — Use `sr-only` class for context visible only to screen readers

### 6. Modern CSS Patterns

#### CSS Custom Properties for Theming
```css
:root {
  --color-primary: #1E1450;
  --color-accent: #FF2261;
  --radius-md: 0.5rem;
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
```

#### Smooth Transitions
```css
.interactive {
  transition: all 0.2s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .interactive {
    transition: none;
  }
}
```

#### Modern Scrolling
```css
.scroll-container {
  overflow-y: auto;
  overscroll-behavior: contain;
  scroll-behavior: smooth;
  scrollbar-width: thin;
}
```

### 7. Performance

- **Lazy load** images and heavy components below the fold
- **Optimize images** — Use WebP/AVIF with fallbacks, provide `width`/`height` attributes
- **Minimize layout shifts** — Set explicit dimensions on images, use skeleton loaders
- **Code split** — Lazy-load route-level components
- **Font loading** — Use `font-display: swap` to avoid invisible text during load

### 8. Production Checklist

- [ ] All interactive elements have hover/focus/active states
- [ ] Loading, error, and empty states are handled for all data-dependent views
- [ ] Responsive layout tested at mobile (375px), tablet (768px), and desktop (1280px)
- [ ] Keyboard navigation works for all flows
- [ ] No horizontal scroll on any viewport
- [ ] Images have alt text
- [ ] Forms have labels and validation feedback
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Color contrast meets WCAG AA
- [ ] No console errors or warnings in production build
