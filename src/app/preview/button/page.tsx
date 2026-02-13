"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Plus, Star, Upload } from "lucide-react";

const hierarchies = [
  "accent-primary",
  "neutral-primary",
  "secondary",
  "outline",
  "ghost",
  "link-color",
  "link-gray",
] as const;

const sizes = ["sm", "md", "lg", "xl"] as const;

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[var(--text-secondary)]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function HierarchyLabel({ hierarchy }: { hierarchy: string }) {
  return (
    <span className="w-36 shrink-0 text-xs font-medium text-[var(--text-tertiary)]">
      {hierarchy}
    </span>
  );
}

export default function ButtonPreviewPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-bold">Button</h1>
        <p className="mt-1 text-sm text-[var(--text-tertiary)]">
          All hierarchies, sizes, and states.
        </p>
      </div>

      {/* All hierarchies × all sizes */}
      <Section title="Hierarchy × Size">
        <div className="space-y-3">
          {hierarchies.map((h) => (
            <div key={h} className="flex items-center gap-3">
              <HierarchyLabel hierarchy={h} />
              {sizes.map((s) => (
                <Button key={s} hierarchy={h} size={s}>
                  Button
                </Button>
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* Disabled state */}
      <Section title="Disabled">
        <div className="space-y-3">
          {hierarchies.map((h) => (
            <div key={h} className="flex items-center gap-3">
              <HierarchyLabel hierarchy={h} />
              <Button hierarchy={h} disabled>
                Button
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* Loading state */}
      <Section title="Loading">
        <div className="space-y-3">
          {hierarchies.map((h) => (
            <div key={h} className="flex items-center gap-3">
              <HierarchyLabel hierarchy={h} />
              <Button hierarchy={h} loading>
                Submitting...
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* With icons */}
      <Section title="With Icons">
        <div className="space-y-3">
          {hierarchies.map((h) => (
            <div key={h} className="flex items-center gap-3">
              <HierarchyLabel hierarchy={h} />
              <Button hierarchy={h} iconLeading={<Mail />}>
                Leading
              </Button>
              <Button hierarchy={h} iconTrailing={<ArrowRight />}>
                Trailing
              </Button>
              <Button
                hierarchy={h}
                iconLeading={<Upload />}
                iconTrailing={<ArrowRight />}
              >
                Both
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* Icon only × sizes */}
      <Section title="Icon Only × Size">
        <div className="flex items-center gap-3">
          <HierarchyLabel hierarchy="sizes" />
          {sizes.map((s) => (
            <Button key={s} size={s} iconOnly iconLeading={<Plus />} />
          ))}
        </div>
      </Section>

      {/* Icon only × hierarchies */}
      <Section title="Icon Only × Hierarchy">
        <div className="space-y-3">
          {hierarchies.map((h) => (
            <div key={h} className="flex items-center gap-3">
              <HierarchyLabel hierarchy={h} />
              {sizes.map((s) => (
                <Button
                  key={s}
                  hierarchy={h}
                  size={s}
                  iconOnly
                  iconLeading={<Star />}
                />
              ))}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
