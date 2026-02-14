/* =================================================================
   Semantic Tokens for Tailwind CSS
   =================================================================
   Maps semantic CSS custom properties to Tailwind utilities.

   These reference primitives via CSS vars defined in semantic.css.
   Use semantic tokens in components instead of primitives directly.

   Usage:
     bg-brand-solid         → var(--bg-brand-solid)         → var(--color-brand-600)
     text-on-color          → var(--text-on-color)          → var(--color-base-white)
     border-tertiary        → var(--border-tertiary)        → var(--color-neutral-alpha-light-100)
     shadow-xs-skeuomorphic → var(--shadow-xs-skeuomorphic)
   ================================================================= */

function sVar(name: string) {
  return `var(--${name})`;
}

/* ---------------------------------------------------------------
   Background colors
   Usage: bg-brand-solid, bg-primary-solid, bg-primary, etc.
   --------------------------------------------------------------- */
export const semanticBackgroundColors = {
  "brand-solid":         { DEFAULT: sVar("bg-brand-solid"),       hover: sVar("bg-brand-solid-hover") },
  "primary-solid":       { DEFAULT: sVar("bg-primary-solid"),     hover: sVar("bg-primary-solid-hover") },
  primary:               { DEFAULT: sVar("bg-primary"),           hover: sVar("bg-primary-hover") },
  secondary:             { DEFAULT: sVar("bg-secondary"),         hover: sVar("bg-secondary-hover") },
  disabled:              sVar("bg-disabled"),
} as const;

/* ---------------------------------------------------------------
   Text colors
   Usage: text-on-color, text-secondary, text-brand-secondary, etc.
   --------------------------------------------------------------- */
export const semanticTextColors = {
  primary:               sVar("text-primary"),
  "on-color":            { DEFAULT: sVar("text-on-color") },
  "on-color-secondary":  { DEFAULT: sVar("text-on-color-secondary"),  hover: sVar("text-on-color-secondary-hover") },
  "on-color-tertiary":   { DEFAULT: sVar("text-on-color-tertiary"),   hover: sVar("text-on-color-tertiary-hover") },
  secondary:             { DEFAULT: sVar("text-secondary"),           hover: sVar("text-secondary-hover") },
  tertiary:              { DEFAULT: sVar("text-tertiary"),            hover: sVar("text-tertiary-hover") },
  disabled:              sVar("text-disabled"),
  error:                 sVar("text-error"),
  "brand-secondary":     { DEFAULT: sVar("text-brand-secondary"),     hover: sVar("text-brand-secondary-hover") },
} as const;

/* ---------------------------------------------------------------
   Border colors
   Usage: border-tertiary, border-disabled
   --------------------------------------------------------------- */
export const semanticBorderColors = {
  primary:               { DEFAULT: sVar("border-primary"),  hover: sVar("border-primary-hover") },
  tertiary:              sVar("border-tertiary"),
  disabled:              sVar("border-disabled"),
  error:                 { DEFAULT: sVar("border-error"),    hover: sVar("border-error-hover") },
} as const;

/* ---------------------------------------------------------------
   Icon colors
   Usage: text-icon-brand (via textColor)
   --------------------------------------------------------------- */
export const semanticIconColors = {
  "icon-brand":          { DEFAULT: sVar("icon-brand"),  hover: sVar("icon-brand-hover") },
} as const;

/* ---------------------------------------------------------------
   Focus ring color
   --------------------------------------------------------------- */
export const semanticFocusColors = {
  "focus-ring":          sVar("focus-ring"),
  "focus-ring-error":    sVar("focus-ring-error"),
} as const;

/* ---------------------------------------------------------------
   Box shadows
   Usage: shadow-xs, shadow-xs-skeuomorphic, shadow-focus-ring, etc.
   --------------------------------------------------------------- */
export const semanticShadows = {
  "xs":                         sVar("shadow-xs"),
  "xs-skeuomorphic":            sVar("shadow-xs-skeuomorphic"),
  "focus-ring":                 sVar("shadow-focus-ring"),
  "focus-ring-xs":              sVar("shadow-focus-ring-xs"),
  "focus-ring-xs-skeuomorphic": sVar("shadow-focus-ring-xs-skeuomorphic"),
  "input":                      sVar("shadow-input"),
  "input-hover":                sVar("shadow-input-hover"),
  "input-focus":                sVar("shadow-input-focus"),
  "input-error":                sVar("shadow-input-error"),
  "input-error-hover":          sVar("shadow-input-error-hover"),
  "input-error-focus":          sVar("shadow-input-error-focus"),
} as const;
