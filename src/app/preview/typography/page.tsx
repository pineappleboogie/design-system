function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-heading-20 font-semibold text-[var(--text-secondary)]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function TypeRow({
  utility,
  weight,
  children,
}: {
  utility: string;
  weight?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-6">
      <code className="w-52 shrink-0 text-label-12 text-[var(--text-tertiary)] tabular-nums">
        {utility}
        {weight ? ` ${weight}` : ""}
      </code>
      <div>{children}</div>
    </div>
  );
}

export default function TypographyPreview() {
  const sampleText = "The quick brown fox jumps over the lazy dog";
  const sampleParagraph =
    "Typography is the art and technique of arranging type to make written language legible, readable and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing.";

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-heading-32 font-bold text-[var(--text-primary)]">
          Typography
        </h1>
        <p className="mt-2 text-copy-16 text-[var(--text-tertiary)]">
          Three choreographies: <strong>Label</strong> (single-line, tight
          leading), <strong>Copy</strong> (multi-line, looser leading), and{" "}
          <strong>Heading</strong> (titles with negative tracking).
        </p>
      </div>

      {/* ---- Label ---- */}
      <Section title="Label — single-line UI text">
        <div className="space-y-3">
          <TypeRow utility="text-label-12">
            <span className="text-label-12">{sampleText}</span>
          </TypeRow>
          <TypeRow utility="text-label-12-caps" weight="font-medium">
            <span className="text-label-12-caps uppercase font-medium">
              {sampleText}
            </span>
          </TypeRow>
          <TypeRow utility="text-label-13">
            <span className="text-label-13">{sampleText}</span>
          </TypeRow>
          <TypeRow utility="text-label-14">
            <span className="text-label-14">{sampleText}</span>
          </TypeRow>
          <TypeRow utility="text-label-14" weight="font-medium">
            <span className="text-label-14 font-medium">{sampleText}</span>
          </TypeRow>
          <TypeRow utility="text-label-16">
            <span className="text-label-16">{sampleText}</span>
          </TypeRow>
          <TypeRow utility="text-label-18">
            <span className="text-label-18">{sampleText}</span>
          </TypeRow>
          <TypeRow utility="text-label-20">
            <span className="text-label-20">{sampleText}</span>
          </TypeRow>
        </div>
      </Section>

      {/* ---- Label: Tabular Nums ---- */}
      <Section title="Label — tabular numbers">
        <div className="space-y-3">
          <TypeRow utility="text-label-13" weight="tabular-nums">
            <span className="text-label-13 tabular-nums">
              1,234,567.89 — 9,876,543.21
            </span>
          </TypeRow>
          <TypeRow utility="text-label-14" weight="tabular-nums">
            <span className="text-label-14 tabular-nums">
              1,234,567.89 — 9,876,543.21
            </span>
          </TypeRow>
        </div>
      </Section>

      {/* ---- Copy ---- */}
      <Section title="Copy — multi-line body text">
        <div className="space-y-6">
          <TypeRow utility="text-copy-12">
            <p className="text-copy-12 max-w-prose">{sampleParagraph}</p>
          </TypeRow>
          <TypeRow utility="text-copy-13">
            <p className="text-copy-13 max-w-prose">{sampleParagraph}</p>
          </TypeRow>
          <TypeRow utility="text-copy-14">
            <p className="text-copy-14 max-w-prose">{sampleParagraph}</p>
          </TypeRow>
          <TypeRow utility="text-copy-16">
            <p className="text-copy-16 max-w-prose">{sampleParagraph}</p>
          </TypeRow>
          <TypeRow utility="text-copy-18">
            <p className="text-copy-18 max-w-prose">{sampleParagraph}</p>
          </TypeRow>
          <TypeRow utility="text-copy-20">
            <p className="text-copy-20 max-w-prose">{sampleParagraph}</p>
          </TypeRow>
        </div>
      </Section>

      {/* ---- Heading ---- */}
      <Section title="Heading — titles and headings">
        <div className="space-y-4">
          <TypeRow utility="text-heading-14" weight="font-semibold">
            <span className="text-heading-14 font-semibold">{sampleText}</span>
          </TypeRow>
          <TypeRow utility="text-heading-16" weight="font-semibold">
            <span className="text-heading-16 font-semibold">{sampleText}</span>
          </TypeRow>
          <TypeRow utility="text-heading-20" weight="font-semibold">
            <span className="text-heading-20 font-semibold">{sampleText}</span>
          </TypeRow>
          <TypeRow utility="text-heading-24" weight="font-semibold">
            <span className="text-heading-24 font-semibold">{sampleText}</span>
          </TypeRow>
          <TypeRow utility="text-heading-32" weight="font-bold">
            <span className="text-heading-32 font-bold">{sampleText}</span>
          </TypeRow>
          <TypeRow utility="text-heading-40" weight="font-bold">
            <span className="text-heading-40 font-bold">{sampleText}</span>
          </TypeRow>
          <TypeRow utility="text-heading-48" weight="font-bold">
            <span className="text-heading-48 font-bold">{sampleText}</span>
          </TypeRow>
          <TypeRow utility="text-heading-56" weight="font-bold">
            <span className="text-heading-56 font-bold">{sampleText}</span>
          </TypeRow>
          <TypeRow utility="text-heading-64" weight="font-bold">
            <span className="text-heading-64 font-bold">{sampleText}</span>
          </TypeRow>
          <TypeRow utility="text-heading-72" weight="font-bold">
            <span className="text-heading-72 font-bold">{sampleText}</span>
          </TypeRow>
        </div>
      </Section>
    </div>
  );
}
