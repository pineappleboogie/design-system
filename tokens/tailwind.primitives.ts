/* =================================================================
   Primitive Color Tokens for Tailwind CSS
   =================================================================
   Maps CSS custom properties to Tailwind color utilities.
   Usage: bg-neutral-500, text-error-600, border-success-300, etc.
   ================================================================= */

function colorVar(name: string) {
  return `var(--color-${name})`;
}

export const primitiveColors = {
  base: {
    white: colorVar("base-white"),
    black: colorVar("base-black"),
  },

  neutral: {
    50: colorVar("neutral-50"),
    100: colorVar("neutral-100"),
    200: colorVar("neutral-200"),
    300: colorVar("neutral-300"),
    400: colorVar("neutral-400"),
    500: colorVar("neutral-500"),
    600: colorVar("neutral-600"),
    700: colorVar("neutral-700"),
    800: colorVar("neutral-800"),
    900: colorVar("neutral-900"),
    950: colorVar("neutral-950"),
  },

  "neutral-alpha-light": {
    50: colorVar("neutral-alpha-light-50"),
    100: colorVar("neutral-alpha-light-100"),
    200: colorVar("neutral-alpha-light-200"),
    300: colorVar("neutral-alpha-light-300"),
    400: colorVar("neutral-alpha-light-400"),
    500: colorVar("neutral-alpha-light-500"),
    600: colorVar("neutral-alpha-light-600"),
    700: colorVar("neutral-alpha-light-700"),
    800: colorVar("neutral-alpha-light-800"),
    900: colorVar("neutral-alpha-light-900"),
    950: colorVar("neutral-alpha-light-950"),
  },

  "neutral-alpha-dark": {
    50: colorVar("neutral-alpha-dark-50"),
    100: colorVar("neutral-alpha-dark-100"),
    200: colorVar("neutral-alpha-dark-200"),
    300: colorVar("neutral-alpha-dark-300"),
    400: colorVar("neutral-alpha-dark-400"),
    500: colorVar("neutral-alpha-dark-500"),
    600: colorVar("neutral-alpha-dark-600"),
    700: colorVar("neutral-alpha-dark-700"),
    800: colorVar("neutral-alpha-dark-800"),
    900: colorVar("neutral-alpha-dark-900"),
    950: colorVar("neutral-alpha-dark-950"),
  },

  information: {
    25: colorVar("information-25"),
    50: colorVar("information-50"),
    100: colorVar("information-100"),
    200: colorVar("information-200"),
    300: colorVar("information-300"),
    400: colorVar("information-400"),
    500: colorVar("information-500"),
    600: colorVar("information-600"),
    700: colorVar("information-700"),
    800: colorVar("information-800"),
    900: colorVar("information-900"),
    950: colorVar("information-950"),
  },

  success: {
    25: colorVar("success-25"),
    50: colorVar("success-50"),
    100: colorVar("success-100"),
    200: colorVar("success-200"),
    300: colorVar("success-300"),
    400: colorVar("success-400"),
    500: colorVar("success-500"),
    600: colorVar("success-600"),
    700: colorVar("success-700"),
    800: colorVar("success-800"),
    900: colorVar("success-900"),
    950: colorVar("success-950"),
  },

  error: {
    25: colorVar("error-25"),
    50: colorVar("error-50"),
    100: colorVar("error-100"),
    200: colorVar("error-200"),
    300: colorVar("error-300"),
    400: colorVar("error-400"),
    500: colorVar("error-500"),
    600: colorVar("error-600"),
    700: colorVar("error-700"),
    800: colorVar("error-800"),
    900: colorVar("error-900"),
    950: colorVar("error-950"),
  },

  warning: {
    25: colorVar("warning-25"),
    50: colorVar("warning-50"),
    100: colorVar("warning-100"),
    200: colorVar("warning-200"),
    300: colorVar("warning-300"),
    400: colorVar("warning-400"),
    500: colorVar("warning-500"),
    600: colorVar("warning-600"),
    700: colorVar("warning-700"),
    800: colorVar("warning-800"),
    900: colorVar("warning-900"),
    950: colorVar("warning-950"),
  },

  brand: {
    25: colorVar("brand-25"),
    50: colorVar("brand-50"),
    100: colorVar("brand-100"),
    200: colorVar("brand-200"),
    300: colorVar("brand-300"),
    400: colorVar("brand-400"),
    500: colorVar("brand-500"),
    600: colorVar("brand-600"),
    700: colorVar("brand-700"),
    800: colorVar("brand-800"),
    900: colorVar("brand-900"),
    950: colorVar("brand-950"),
  },
} as const;
