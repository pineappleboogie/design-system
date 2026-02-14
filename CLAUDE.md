# Gabriel Design System — Claude Code Guide

## Project Overview

- **Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, CVA, Radix UI
- **Package manager:** pnpm
- **Path alias:** `@/*` → `./src/*`
- **Dev server:** `pnpm dev`
- **Icons:** lucide-react

## Token Architecture

Three-tier system: **Primitive → Semantic → Component**.

```
Primitive (raw value)  →  Semantic (intent)    →  Component (usage)
--color-brand-600      →  --bg-brand-solid     →  button bg
```

### Rules

- **Always use semantic tokens** in components via `var(--token-name)` — never raw primitives or hex values.
- In Tailwind classes, reference tokens with the bracket syntax: `bg-[var(--bg-brand-solid)]`.
- Use Tailwind's theme tokens for shadows and radii (e.g., `shadow-xs-skeuomorphic`, `rounded-lg`).

### Naming Convention

```
--{category}-{variant}-{state}
```

Categories: `bg`, `text`, `border`, `icon`, `focus`, `shadow`, `radius`

State progression for interactive tokens: **base → hover → active** (3 states).

```css
--bg-brand-solid            /* base */
--bg-brand-solid-hover      /* hover */
--bg-brand-solid-active     /* active */
```

### File Locations

| File | Purpose |
|---|---|
| `tokens/primitives.css` | Raw color scales (neutral, brand, info, success, error, warning) |
| `tokens/primitives.radius.css` | Border radius scale (xxs through full) |
| `tokens/primitives.typography.css` | Font family, weight, size, line-height, tracking primitives |
| `tokens/semantic.css` | Intent-based aliases that reference primitives |
| `tokens/tailwind.primitives.ts` | Exports primitive colors for Tailwind theme |
| `tokens/tailwind.semantic.ts` | Exports semantic colors, shadows, etc. for Tailwind theme |
| `src/app/globals.css` | Imports all token files and registers Tailwind `@theme` (including `--text-*` typography utilities) |

### Key Semantic Tokens

**Backgrounds:** `--bg-brand-solid`, `--bg-primary-solid`, `--bg-primary`, `--bg-secondary`, `--bg-disabled`
**Text:** `--text-secondary`, `--text-tertiary`, `--text-disabled`, `--text-on-color`, `--text-brand-secondary`
**Border:** `--border-tertiary`, `--border-disabled`
**Icon:** `--icon-brand`
**Focus:** `--focus-ring` (brand-200), `--focus-ring-error` (error-200)

### Shadow Tokens

| Token | Usage |
|---|---|
| `shadow-xs` | Subtle elevation |
| `shadow-xs-skeuomorphic` | Elevated solid elements (includes inset shadows) |
| `shadow-focus-ring` | 4px ring using `--focus-ring` (brand-200) |
| `shadow-focus-ring-xs-skeuomorphic` | Focus ring combined with skeuomorphic shadow |
| `shadow-input` | Default input border (1px) + drop shadow |
| `shadow-input-hover` | Darker border on hover |
| `shadow-input-focus` | Border + drop shadow + focus ring |
| `shadow-input-error` | Error border + drop shadow |
| `shadow-input-error-focus` | Error border + drop shadow + error focus ring |

### Shadow Layering Order

Box-shadow layers paint front-to-back (first listed = topmost). When composing shadow tokens, always order:

1. **Border** (1px spread) — crisp edge, renders on top
2. **Drop shadow** (blur-based) — subtle depth beneath the border
3. **Focus ring** (4px spread) — outermost glow, sits behind everything

This creates an overlay effect where the border stays visually sharp above the softer shadows.

### Typography Tokens

Three choreographies named by intent, sized by pixel value (not t-shirt sizes):

| Choreography | Prefix | Purpose | Leading | Tracking |
|---|---|---|---|---|
| **Label** | `text-label-*` | Single-line UI text (buttons, inputs, nav) | Tight | Normal |
| **Copy** | `text-copy-*` | Multi-line body text (paragraphs, descriptions) | Loose | Normal |
| **Heading** | `text-heading-*` | Titles and headings | Moderate | Negative at 24px+ |

**Font:** Inter (via `--font-inter` CSS variable, `next/font/google`). Monospace remains Geist Mono.

#### Usage

```tsx
{/* Label — single-line UI text */}
<span className="text-label-14 font-medium">Field label</span>

{/* Copy — multi-line paragraphs */}
<p className="text-copy-16">Body paragraph...</p>

{/* Heading — titles */}
<h1 className="text-heading-32 font-bold">Page Title</h1>

{/* Caps variant — compose with uppercase + weight */}
<span className="text-label-12-caps uppercase font-medium">OVERLINE</span>

{/* Tabular numbers — compose with tabular-nums */}
<span className="text-label-14 tabular-nums">1,234.56</span>
```

#### Rules

- **Never use raw `text-sm`, `text-base`, etc.** — always use `text-label-*`, `text-copy-*`, or `text-heading-*`.
- Weight is always a separate utility: `font-medium`, `font-semibold`, `font-bold`.
- `text-label-12-caps` sets size + line-height + wide tracking; compose with `uppercase` and a weight.

#### Label Scale

| Utility | Size | Line Height |
|---|---|---|
| `text-label-12` | 12px | 16px |
| `text-label-12-caps` | 12px | 16px (tracking: 0.05em) |
| `text-label-13` | 13px | 16px |
| `text-label-14` | 14px | 20px |
| `text-label-16` | 16px | 20px |
| `text-label-18` | 18px | 24px |
| `text-label-20` | 20px | 32px |

#### Copy Scale

| Utility | Size | Line Height |
|---|---|---|
| `text-copy-12` | 12px | 18px |
| `text-copy-13` | 13px | 18px |
| `text-copy-14` | 14px | 20px |
| `text-copy-16` | 16px | 24px |
| `text-copy-18` | 18px | 28px |
| `text-copy-20` | 20px | 36px |

#### Heading Scale

| Utility | Size | Line Height | Tracking |
|---|---|---|---|
| `text-heading-14` | 14px | 20px | normal |
| `text-heading-16` | 16px | 24px | normal |
| `text-heading-20` | 20px | 28px | normal |
| `text-heading-24` | 24px | 32px | -0.025em |
| `text-heading-32` | 32px | 40px | -0.025em |
| `text-heading-40` | 40px | 56px | -0.025em |
| `text-heading-48` | 48px | 56px | -0.04em |
| `text-heading-56` | 56px | 64px | -0.04em |
| `text-heading-64` | 64px | 72px | -0.04em |
| `text-heading-72` | 72px | 80px | -0.04em |

## Component Conventions

### File Structure

```
src/components/ui/{component-name}.tsx    ← Required: component + CVA variants
src/components/ui/{component-name}.css    ← Optional: effects that can't be expressed in Tailwind
```

### Variant System (CVA)

Every component uses `class-variance-authority` for variant definitions:

```typescript
import { cva, type VariantProps } from "class-variance-authority";

const componentVariants = cva(
  ["base", "classes", "shared", "by-all-variants"],
  {
    variants: {
      hierarchy: { /* visual style variants */ },
      size: { /* size scale: sm, md, lg, xl */ },
    },
    compoundVariants: [ /* combinations */ ],
    defaultVariants: { hierarchy: "accent-primary", size: "md" },
  }
);
```

Export both the component and its variants:

```typescript
export { Component, componentVariants };
```

### Props Pattern

Extend the native HTML element's props, merge in CVA VariantProps, then add custom props:

```typescript
export interface ComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof componentVariants> {
  asChild?: boolean;
  loading?: boolean;
  // ... component-specific props
}
```

### Data Attributes

Every component must set data attributes for CSS hooks and testing:

```typescript
data-slot="component-name"       // Component type identifier
data-hierarchy={hierarchy}       // Visual hierarchy variant
data-size={size}                 // Size variant
```

These enable targeted CSS in the companion `.css` file (e.g., `[data-slot="button"][data-hierarchy="accent-primary"]::after`).

### Class Merging

Use `cn()` from `@/lib/utils` for all className composition:

```typescript
import { cn } from "@/lib/utils";

className={cn(componentVariants({ hierarchy, size, className }))}
```

### Polymorphism (asChild)

Use Radix `Slot` for the `asChild` pattern:

```typescript
import { Slot } from "radix-ui";

const Comp = asChild ? Slot.Root : "button";
return <Comp data-slot="component-name" {...props}>{children}</Comp>;
```

### Icon Sizing

Maintain an `iconSizeMap` keyed by component size:

```typescript
const iconSizeMap = {
  sm: "size-5",
  md: "size-5",
  lg: "size-5",
  xl: "size-6",
} as const;
```

Wrap icon slots with `[&>svg]:size-full` to make SVGs fill the container:

```tsx
<span className={cn("shrink-0", iconClass, "[&>svg]:size-full")}>{icon}</span>
```

### Accessibility

Warn in development when accessible labels are missing:

```typescript
if (process.env.NODE_ENV === "development" && iconOnly && !props["aria-label"]) {
  console.warn("Component: iconOnly should have an aria-label for accessibility.");
}
```

## Design Principles

### Skeuomorphic Inner Border

Solid buttons (`accent-primary`, `neutral-primary`) get a white-to-transparent gradient inner border via CSS `::after` + mask:

```css
[data-slot="button"][data-hierarchy="accent-primary"]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 2px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.20), rgba(255,255,255,0));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

Hide on disabled: `[data-slot="button"]:disabled::after { display: none; }`

### Focus Ring

Uses CSS outline (not box-shadow) for focus:

```
outline-2 outline-offset-2 outline-transparent focus-visible:outline-[var(--focus-ring)]
```

### Disabled State

Consistent across all components:
- Background: `--bg-disabled`
- Text: `--text-disabled`
- Border (if applicable): `--border-disabled`
- Shadows: removed (`shadow-none`)
- Cursor: `cursor-not-allowed`
- Skeuomorphic `::after`: hidden

### Loading State

Overlay spinner pattern — invisible content holds width, spinner centered absolutely:

```tsx
<button className={cn("relative", loading && "pointer-events-none")}>
  <span className={cn("inline-flex items-center justify-center gap-[inherit]", loading && "invisible")}>
    {/* actual content */}
  </span>
  {loading && (
    <span className="absolute inset-0 flex items-center justify-center">
      <Spinner className={iconClass} />
    </span>
  )}
</button>
```

## Preview Page Convention

### File Location

```
src/app/preview/{component-name}/page.tsx
```

### Pattern

Each preview page showcases **all** combinations:
1. Hierarchy × Size grid
2. Disabled state (all hierarchies)
3. Loading state (all hierarchies)
4. With icons (leading, trailing, both)
5. Icon-only × Size and × Hierarchy

Use helper components for consistent layout:

```tsx
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[var(--text-secondary)]">{title}</h2>
      {children}
    </section>
  );
}
```

### Navigation

Add every new component to the `components` array in `src/app/preview/layout.tsx`:

```typescript
const components = [
  { name: "Tokens", href: "/preview/tokens" },
  { name: "Button", href: "/preview/button" },
  // { name: "NewComponent", href: "/preview/new-component" },
];
```

## When Creating a New Component

1. **Create** `src/components/ui/{name}.tsx` — CVA variants, props extending native element + VariantProps, data attributes, `cn()`, `asChild` support
2. **Create** `src/components/ui/{name}.css` (if needed) — for effects that can't be expressed in Tailwind (skeuomorphic borders, mask effects)
3. **Import the CSS** in the component file if a companion CSS file is created
4. **Create** `src/app/preview/{name}/page.tsx` — showcase all variants × sizes, disabled, loading, icon combinations
5. **Add to navigation** in `src/app/preview/layout.tsx` (`components` array)
6. **Use semantic tokens only** — never raw color values or primitives
7. **Follow Button** (`src/components/ui/button.tsx`) as the reference implementation
8. **Verify** with `pnpm dev` that the preview page renders correctly
