"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type PrimitiveScale = { label: string; token: string; value: string };

type PrimitiveGroup = {
  name: string;
  scales: PrimitiveScale[];
};

const primitiveColors: PrimitiveGroup[] = [
  {
    name: "Base",
    scales: [
      { label: "White", token: "--color-base-white", value: "#FFFFFF" },
      { label: "Black", token: "--color-base-black", value: "#000000" },
    ],
  },
  {
    name: "Neutral",
    scales: [
      { label: "50", token: "--color-neutral-50", value: "#FAFAFA" },
      { label: "100", token: "--color-neutral-100", value: "#F5F5F5" },
      { label: "200", token: "--color-neutral-200", value: "#E5E5E5" },
      { label: "300", token: "--color-neutral-300", value: "#D4D4D4" },
      { label: "400", token: "--color-neutral-400", value: "#A3A3A3" },
      { label: "500", token: "--color-neutral-500", value: "#737373" },
      { label: "600", token: "--color-neutral-600", value: "#525252" },
      { label: "700", token: "--color-neutral-700", value: "#404040" },
      { label: "800", token: "--color-neutral-800", value: "#262626" },
      { label: "900", token: "--color-neutral-900", value: "#171717" },
      { label: "950", token: "--color-neutral-950", value: "#0A0A0A" },
    ],
  },
  {
    name: "Neutral Alpha (Light)",
    scales: [
      { label: "50", token: "--color-neutral-alpha-light-50", value: "rgba(0,0,0,0.02)" },
      { label: "100", token: "--color-neutral-alpha-light-100", value: "rgba(0,0,0,0.04)" },
      { label: "200", token: "--color-neutral-alpha-light-200", value: "rgba(0,0,0,0.10)" },
      { label: "300", token: "--color-neutral-alpha-light-300", value: "rgba(0,0,0,0.17)" },
      { label: "400", token: "--color-neutral-alpha-light-400", value: "rgba(0,0,0,0.36)" },
      { label: "500", token: "--color-neutral-alpha-light-500", value: "rgba(0,0,0,0.55)" },
      { label: "600", token: "--color-neutral-alpha-light-600", value: "rgba(0,0,0,0.68)" },
      { label: "700", token: "--color-neutral-alpha-light-700", value: "rgba(0,0,0,0.75)" },
      { label: "800", token: "--color-neutral-alpha-light-800", value: "rgba(0,0,0,0.85)" },
      { label: "900", token: "--color-neutral-alpha-light-900", value: "rgba(0,0,0,0.91)" },
      { label: "950", token: "--color-neutral-alpha-light-950", value: "#0A0A0A" },
    ],
  },
  {
    name: "Neutral Alpha (Dark)",
    scales: [
      { label: "50", token: "--color-neutral-alpha-dark-50", value: "rgba(255,255,255,0.02)" },
      { label: "100", token: "--color-neutral-alpha-dark-100", value: "rgba(255,255,255,0.04)" },
      { label: "200", token: "--color-neutral-alpha-dark-200", value: "rgba(255,255,255,0.10)" },
      { label: "300", token: "--color-neutral-alpha-dark-300", value: "rgba(255,255,255,0.17)" },
      { label: "400", token: "--color-neutral-alpha-dark-400", value: "rgba(255,255,255,0.36)" },
      { label: "500", token: "--color-neutral-alpha-dark-500", value: "rgba(255,255,255,0.55)" },
      { label: "600", token: "--color-neutral-alpha-dark-600", value: "rgba(255,255,255,0.68)" },
      { label: "700", token: "--color-neutral-alpha-dark-700", value: "rgba(255,255,255,0.75)" },
      { label: "800", token: "--color-neutral-alpha-dark-800", value: "rgba(255,255,255,0.85)" },
      { label: "900", token: "--color-neutral-alpha-dark-900", value: "rgba(255,255,255,0.91)" },
      { label: "950", token: "--color-neutral-alpha-dark-950", value: "#FFFFFF" },
    ],
  },
  {
    name: "Brand",
    scales: [
      { label: "25", token: "--color-brand-25", value: "#F5F8FF" },
      { label: "50", token: "--color-brand-50", value: "#EFF4FF" },
      { label: "100", token: "--color-brand-100", value: "#D1E0FF" },
      { label: "200", token: "--color-brand-200", value: "#B2CCFF" },
      { label: "300", token: "--color-brand-300", value: "#84ADFF" },
      { label: "400", token: "--color-brand-400", value: "#528BFF" },
      { label: "500", token: "--color-brand-500", value: "#2970FF" },
      { label: "600", token: "--color-brand-600", value: "#155EEF" },
      { label: "700", token: "--color-brand-700", value: "#004EEB" },
      { label: "800", token: "--color-brand-800", value: "#0040C1" },
      { label: "900", token: "--color-brand-900", value: "#00359E" },
      { label: "950", token: "--color-brand-950", value: "#002266" },
    ],
  },
  {
    name: "Information",
    scales: [
      { label: "25", token: "--color-information-25", value: "#F5F8FF" },
      { label: "50", token: "--color-information-50", value: "#EFF4FF" },
      { label: "100", token: "--color-information-100", value: "#D1E0FF" },
      { label: "200", token: "--color-information-200", value: "#B2CCFF" },
      { label: "300", token: "--color-information-300", value: "#84ADFF" },
      { label: "400", token: "--color-information-400", value: "#528BFF" },
      { label: "500", token: "--color-information-500", value: "#2970FF" },
      { label: "600", token: "--color-information-600", value: "#155EEF" },
      { label: "700", token: "--color-information-700", value: "#004EEB" },
      { label: "800", token: "--color-information-800", value: "#0040C1" },
      { label: "900", token: "--color-information-900", value: "#00359E" },
      { label: "950", token: "--color-information-950", value: "#002266" },
    ],
  },
  {
    name: "Success",
    scales: [
      { label: "25", token: "--color-success-25", value: "#F6FEF9" },
      { label: "50", token: "--color-success-50", value: "#ECFDF3" },
      { label: "100", token: "--color-success-100", value: "#DCFAE6" },
      { label: "200", token: "--color-success-200", value: "#ABEFC6" },
      { label: "300", token: "--color-success-300", value: "#75E0A7" },
      { label: "400", token: "--color-success-400", value: "#47CD89" },
      { label: "500", token: "--color-success-500", value: "#17B26A" },
      { label: "600", token: "--color-success-600", value: "#079455" },
      { label: "700", token: "--color-success-700", value: "#067647" },
      { label: "800", token: "--color-success-800", value: "#085D3A" },
      { label: "900", token: "--color-success-900", value: "#074D31" },
      { label: "950", token: "--color-success-950", value: "#053321" },
    ],
  },
  {
    name: "Error",
    scales: [
      { label: "25", token: "--color-error-25", value: "#FFFBFA" },
      { label: "50", token: "--color-error-50", value: "#FEF3F2" },
      { label: "100", token: "--color-error-100", value: "#FEE4E2" },
      { label: "200", token: "--color-error-200", value: "#FECDCA" },
      { label: "300", token: "--color-error-300", value: "#FDA29B" },
      { label: "400", token: "--color-error-400", value: "#F97066" },
      { label: "500", token: "--color-error-500", value: "#F04438" },
      { label: "600", token: "--color-error-600", value: "#D92D20" },
      { label: "700", token: "--color-error-700", value: "#B42318" },
      { label: "800", token: "--color-error-800", value: "#912018" },
      { label: "900", token: "--color-error-900", value: "#7A271A" },
      { label: "950", token: "--color-error-950", value: "#55160C" },
    ],
  },
  {
    name: "Warning",
    scales: [
      { label: "25", token: "--color-warning-25", value: "#FFFCF5" },
      { label: "50", token: "--color-warning-50", value: "#FFFAEB" },
      { label: "100", token: "--color-warning-100", value: "#FEF0C7" },
      { label: "200", token: "--color-warning-200", value: "#FEDF89" },
      { label: "300", token: "--color-warning-300", value: "#FEC84B" },
      { label: "400", token: "--color-warning-400", value: "#FDB022" },
      { label: "500", token: "--color-warning-500", value: "#F79009" },
      { label: "600", token: "--color-warning-600", value: "#DC6803" },
      { label: "700", token: "--color-warning-700", value: "#B54708" },
      { label: "800", token: "--color-warning-800", value: "#93370D" },
      { label: "900", token: "--color-warning-900", value: "#7A2E0E" },
      { label: "950", token: "--color-warning-950", value: "#4E1D09" },
    ],
  },
];

const radiusTokens = [
  { label: "none", token: "--radius-none", value: "0px" },
  { label: "xxs", token: "--radius-xxs", value: "2px" },
  { label: "xs", token: "--radius-xs", value: "4px" },
  { label: "sm", token: "--radius-sm", value: "6px" },
  { label: "md", token: "--radius-md", value: "8px" },
  { label: "lg", token: "--radius-lg", value: "12px" },
  { label: "xl", token: "--radius-xl", value: "16px" },
  { label: "2xl", token: "--radius-2xl", value: "20px" },
  { label: "3xl", token: "--radius-3xl", value: "24px" },
  { label: "full", token: "--radius-full", value: "9999px" },
];

type SemanticToken = {
  token: string;
  primitiveRef: string;
  resolvedValue: string;
};

type SemanticGroup = {
  name: string;
  tokens: SemanticToken[];
};

const semanticTokens: SemanticGroup[] = [
  {
    name: "Background",
    tokens: [
      { token: "--bg-brand-solid", primitiveRef: "--color-brand-600", resolvedValue: "#155EEF" },
      { token: "--bg-brand-solid-hover", primitiveRef: "--color-brand-700", resolvedValue: "#004EEB" },
      { token: "--bg-brand-solid-active", primitiveRef: "--color-brand-800", resolvedValue: "#0040C1" },
      { token: "--bg-primary-solid", primitiveRef: "--color-neutral-950", resolvedValue: "#0A0A0A" },
      { token: "--bg-primary-solid-hover", primitiveRef: "--color-neutral-800", resolvedValue: "#262626" },
      { token: "--bg-primary-solid-active", primitiveRef: "--color-neutral-900", resolvedValue: "#171717" },
      { token: "--bg-primary", primitiveRef: "--color-base-white", resolvedValue: "#FFFFFF" },
      { token: "--bg-primary-hover", primitiveRef: "--color-neutral-50", resolvedValue: "#FAFAFA" },
      { token: "--bg-primary-active", primitiveRef: "--color-neutral-100", resolvedValue: "#F5F5F5" },
      { token: "--bg-secondary", primitiveRef: "--color-neutral-50", resolvedValue: "#FAFAFA" },
      { token: "--bg-secondary-hover", primitiveRef: "--color-neutral-100", resolvedValue: "#F5F5F5" },
      { token: "--bg-secondary-active", primitiveRef: "--color-neutral-200", resolvedValue: "#E5E5E5" },
      { token: "--bg-disabled", primitiveRef: "--color-neutral-50", resolvedValue: "#FAFAFA" },
    ],
  },
  {
    name: "Text",
    tokens: [
      { token: "--text-secondary", primitiveRef: "--color-neutral-alpha-light-500", resolvedValue: "rgba(0,0,0,0.55)" },
      { token: "--text-secondary-hover", primitiveRef: "--color-neutral-alpha-light-600", resolvedValue: "rgba(0,0,0,0.68)" },
      { token: "--text-secondary-active", primitiveRef: "--color-neutral-alpha-light-700", resolvedValue: "rgba(0,0,0,0.75)" },
      { token: "--text-tertiary", primitiveRef: "--color-neutral-alpha-light-400", resolvedValue: "rgba(0,0,0,0.36)" },
      { token: "--text-tertiary-hover", primitiveRef: "--color-neutral-alpha-light-500", resolvedValue: "rgba(0,0,0,0.55)" },
      { token: "--text-disabled", primitiveRef: "--color-neutral-alpha-light-300", resolvedValue: "rgba(0,0,0,0.17)" },
    ],
  },
  {
    name: "Text — Brand",
    tokens: [
      { token: "--text-brand-secondary", primitiveRef: "--color-brand-700", resolvedValue: "#004EEB" },
      { token: "--text-brand-secondary-hover", primitiveRef: "--color-brand-600", resolvedValue: "#155EEF" },
      { token: "--text-brand-secondary-active", primitiveRef: "--color-brand-800", resolvedValue: "#0040C1" },
    ],
  },
  {
    name: "Text — On Color",
    tokens: [
      { token: "--text-on-color", primitiveRef: "--color-base-white", resolvedValue: "#FFFFFF" },
      { token: "--text-on-color-secondary", primitiveRef: "--color-neutral-alpha-dark-900", resolvedValue: "rgba(255,255,255,0.91)" },
      { token: "--text-on-color-secondary-hover", primitiveRef: "--color-neutral-alpha-dark-800", resolvedValue: "rgba(255,255,255,0.85)" },
      { token: "--text-on-color-tertiary", primitiveRef: "--color-neutral-alpha-dark-600", resolvedValue: "rgba(255,255,255,0.68)" },
      { token: "--text-on-color-tertiary-hover", primitiveRef: "--color-neutral-alpha-dark-500", resolvedValue: "rgba(255,255,255,0.55)" },
    ],
  },
  {
    name: "Border",
    tokens: [
      { token: "--border-tertiary", primitiveRef: "--color-neutral-alpha-light-100", resolvedValue: "rgba(0,0,0,0.04)" },
      { token: "--border-disabled", primitiveRef: "--color-neutral-alpha-light-200", resolvedValue: "rgba(0,0,0,0.10)" },
    ],
  },
  {
    name: "Icon",
    tokens: [
      { token: "--icon-brand", primitiveRef: "--color-brand-300", resolvedValue: "#84ADFF" },
      { token: "--icon-brand-hover", primitiveRef: "--color-brand-200", resolvedValue: "#B2CCFF" },
    ],
  },
  {
    name: "Focus",
    tokens: [
      { token: "--focus-ring", primitiveRef: "--color-brand-500", resolvedValue: "#2970FF" },
    ],
  },
];

const shadowTokens = [
  { token: "--shadow-xs", value: "0px 1px 2px 0px rgba(10,13,18,0.05)" },
  { token: "--shadow-xs-skeuomorphic", value: "0px 1px 2px rgba(10,13,18,0.05), inset 0 -2px 0 rgba(10,13,18,0.05), inset 0 0 0 1px rgba(10,13,18,0.18)" },
  { token: "--shadow-focus-ring", value: "0 0 0 2px var(--bg-primary), 0 0 0 4px var(--focus-ring)" },
  { token: "--shadow-focus-ring-xs", value: "focus-ring + shadow-xs" },
  { token: "--shadow-focus-ring-xs-skeuomorphic", value: "focus-ring + shadow-xs-skeuomorphic" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function isLight(hex: string): boolean {
  if (hex.startsWith("rgba")) {
    // For rgba, check if it's mostly transparent (light bg will show through)
    const match = hex.match(/[\d.]+/g);
    if (!match) return true;
    const [r, g, b, a] = match.map(Number);
    // Blend against white
    const blendedR = r * a + 255 * (1 - a);
    const blendedG = g * a + 255 * (1 - a);
    const blendedB = b * a + 255 * (1 - a);
    const lum = (blendedR * 299 + blendedG * 587 + blendedB * 114) / 1000;
    return lum > 160;
  }
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const lum = (r * 299 + g * 587 + b * 114) / 1000;
  return lum > 160;
}

function Swatch({ color, className = "" }: { color: string; className?: string }) {
  return (
    <div
      className={`h-8 w-8 shrink-0 rounded-md border border-[var(--border-tertiary)] ${className}`}
      style={{ backgroundColor: color }}
    />
  );
}

function TokenName({ children }: { children: React.ReactNode }) {
  return (
    <code className="text-[13px] font-medium text-[var(--color-neutral-950)]">
      {children}
    </code>
  );
}

function TokenValue({ children }: { children: React.ReactNode }) {
  return (
    <code className="text-[12px] text-[var(--text-tertiary)]">
      {children}
    </code>
  );
}

function Arrow() {
  return (
    <svg width="20" height="12" viewBox="0 0 20 12" fill="none" className="shrink-0 text-[var(--text-tertiary)]">
      <path d="M1 6h16m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Section heading                                                    */
/* ------------------------------------------------------------------ */

function SectionHeading({ id, children, description }: { id: string; children: React.ReactNode; description?: string }) {
  return (
    <div id={id} className="scroll-mt-8">
      <h2 className="text-lg font-semibold text-[var(--color-neutral-950)]">{children}</h2>
      {description && (
        <p className="mt-1 text-sm text-[var(--text-tertiary)]">{description}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tab navigation                                                     */
/* ------------------------------------------------------------------ */

type Tab = "primitives" | "semantic" | "mapping";

function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string }[] = [
    { id: "primitives", label: "Primitives" },
    { id: "semantic", label: "Semantic" },
    { id: "mapping", label: "Mapping" },
  ];
  return (
    <div className="flex gap-1 rounded-lg bg-[var(--bg-secondary)] p-1">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            active === t.id
              ? "bg-[var(--bg-primary)] text-[var(--color-neutral-950)] shadow-[var(--shadow-xs)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-secondary-hover)]"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Primitives tab                                                     */
/* ------------------------------------------------------------------ */

function PrimitivesTab() {
  return (
    <div className="space-y-10">
      {/* Color palettes */}
      {primitiveColors.map((group) => (
        <div key={group.name} className="space-y-3">
          <SectionHeading id={`prim-${group.name}`}>{group.name}</SectionHeading>
          <div className="overflow-hidden rounded-xl border border-[var(--border-tertiary)]">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--border-tertiary)] bg-[var(--bg-secondary)]">
                  <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Swatch</th>
                  <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Step</th>
                  <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Token</th>
                  <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Value</th>
                </tr>
              </thead>
              <tbody>
                {group.scales.map((s, i) => (
                  <tr key={s.token} className={i < group.scales.length - 1 ? "border-b border-[var(--border-tertiary)]" : ""}>
                    <td className="px-4 py-2.5">
                      <Swatch color={s.value} />
                    </td>
                    <td className="px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)]">{s.label}</td>
                    <td className="px-4 py-2.5"><TokenName>{s.token}</TokenName></td>
                    <td className="px-4 py-2.5"><TokenValue>{s.value}</TokenValue></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Radius */}
      <div className="space-y-3">
        <SectionHeading id="prim-radius">Radius</SectionHeading>
        <div className="overflow-hidden rounded-xl border border-[var(--border-tertiary)]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--border-tertiary)] bg-[var(--bg-secondary)]">
                <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Preview</th>
                <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Name</th>
                <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Token</th>
                <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Value</th>
              </tr>
            </thead>
            <tbody>
              {radiusTokens.map((r, i) => (
                <tr key={r.token} className={i < radiusTokens.length - 1 ? "border-b border-[var(--border-tertiary)]" : ""}>
                  <td className="px-4 py-2.5">
                    <div
                      className="h-8 w-8 border-2 border-[var(--color-brand-500)] bg-[var(--bg-secondary)]"
                      style={{ borderRadius: r.value }}
                    />
                  </td>
                  <td className="px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)]">{r.label}</td>
                  <td className="px-4 py-2.5"><TokenName>{r.token}</TokenName></td>
                  <td className="px-4 py-2.5"><TokenValue>{r.value}</TokenValue></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Semantic tab                                                       */
/* ------------------------------------------------------------------ */

function SemanticTab() {
  return (
    <div className="space-y-10">
      {semanticTokens.map((group) => (
        <div key={group.name} className="space-y-3">
          <SectionHeading id={`sem-${group.name}`}>{group.name}</SectionHeading>
          <div className="overflow-hidden rounded-xl border border-[var(--border-tertiary)]">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--border-tertiary)] bg-[var(--bg-secondary)]">
                  <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Swatch</th>
                  <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Semantic Token</th>
                  <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">References</th>
                  <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Resolved Value</th>
                </tr>
              </thead>
              <tbody>
                {group.tokens.map((t, i) => (
                  <tr key={t.token} className={i < group.tokens.length - 1 ? "border-b border-[var(--border-tertiary)]" : ""}>
                    <td className="px-4 py-2.5">
                      <Swatch color={t.resolvedValue} />
                    </td>
                    <td className="px-4 py-2.5"><TokenName>{t.token}</TokenName></td>
                    <td className="px-4 py-2.5"><TokenValue>{t.primitiveRef}</TokenValue></td>
                    <td className="px-4 py-2.5"><TokenValue>{t.resolvedValue}</TokenValue></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Shadows */}
      <div className="space-y-3">
        <SectionHeading id="sem-shadows">Shadows</SectionHeading>
        <div className="overflow-hidden rounded-xl border border-[var(--border-tertiary)]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--border-tertiary)] bg-[var(--bg-secondary)]">
                <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Preview</th>
                <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Token</th>
                <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Value</th>
              </tr>
            </thead>
            <tbody>
              {shadowTokens.map((s, i) => (
                <tr key={s.token} className={i < shadowTokens.length - 1 ? "border-b border-[var(--border-tertiary)]" : ""}>
                  <td className="px-4 py-3">
                    <div
                      className="h-10 w-20 rounded-lg bg-[var(--bg-primary)]"
                      style={{ boxShadow: `var(${s.token})` }}
                    />
                  </td>
                  <td className="px-4 py-2.5"><TokenName>{s.token}</TokenName></td>
                  <td className="max-w-xs px-4 py-2.5"><TokenValue>{s.value}</TokenValue></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mapping tab — shows the connection between semantic and primitive  */
/* ------------------------------------------------------------------ */

function MappingTab() {
  const [filter, setFilter] = useState("");
  const allMappings = semanticTokens.flatMap((g) =>
    g.tokens.map((t) => ({ ...t, group: g.name }))
  );
  const filtered = filter
    ? allMappings.filter(
        (m) =>
          m.token.toLowerCase().includes(filter.toLowerCase()) ||
          m.primitiveRef.toLowerCase().includes(filter.toLowerCase()) ||
          m.group.toLowerCase().includes(filter.toLowerCase())
      )
    : allMappings;

  return (
    <div className="space-y-4">
      <SectionHeading
        id="mapping"
        description="How every semantic token maps back to a primitive. Shows the full chain: semantic intent → primitive alias → raw value."
      >
        Token Mapping
      </SectionHeading>

      {/* Filter */}
      <input
        type="text"
        placeholder="Filter tokens..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full max-w-sm rounded-lg border border-[var(--border-tertiary)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--color-neutral-950)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:ring-offset-2"
      />

      <div className="overflow-hidden rounded-xl border border-[var(--border-tertiary)]">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[var(--border-tertiary)] bg-[var(--bg-secondary)]">
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Category</th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Semantic Token</th>
              <th className="w-10 px-2 py-2.5"></th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Primitive Token</th>
              <th className="w-10 px-2 py-2.5"></th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Raw Value</th>
              <th className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">Color</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => (
              <tr key={m.token} className={i < filtered.length - 1 ? "border-b border-[var(--border-tertiary)]" : ""}>
                <td className="px-4 py-2.5">
                  <span className="inline-flex items-center rounded-md bg-[var(--bg-secondary)] px-2 py-0.5 text-[11px] font-medium text-[var(--text-secondary)]">
                    {m.group}
                  </span>
                </td>
                <td className="px-4 py-2.5"><TokenName>{m.token}</TokenName></td>
                <td className="px-2 py-2.5 text-center"><Arrow /></td>
                <td className="px-4 py-2.5"><TokenValue>{m.primitiveRef}</TokenValue></td>
                <td className="px-2 py-2.5 text-center"><Arrow /></td>
                <td className="px-4 py-2.5"><TokenValue>{m.resolvedValue}</TokenValue></td>
                <td className="px-4 py-2.5">
                  <Swatch color={m.resolvedValue} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="py-8 text-center text-sm text-[var(--text-tertiary)]">
          No tokens match &ldquo;{filter}&rdquo;
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TokensPage() {
  const [tab, setTab] = useState<Tab>("primitives");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Design Tokens</h1>
        <p className="mt-1 text-sm text-[var(--text-tertiary)]">
          All primitive values, semantic aliases, and how they connect.
        </p>
      </div>

      <TabBar active={tab} onChange={setTab} />

      {tab === "primitives" && <PrimitivesTab />}
      {tab === "semantic" && <SemanticTab />}
      {tab === "mapping" && <MappingTab />}
    </div>
  );
}
