import Link from "next/link";

const components = [
  { name: "Tokens", href: "/preview/tokens" },
  { name: "Typography", href: "/preview/typography" },
  { name: "Button", href: "/preview/button" },
  { name: "Text Field", href: "/preview/text-field" },
];

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <nav className="w-56 shrink-0 border-r border-[var(--border-tertiary)] bg-[var(--bg-primary)] p-4">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
          Components
        </h2>
        <ul className="space-y-1">
          {components.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="block rounded-md px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-secondary-hover)]"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
