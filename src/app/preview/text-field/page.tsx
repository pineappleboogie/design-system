"use client";

import { useState } from "react";
import { TextField } from "@/components/ui/text-field";
import { Info, Mail, Search, Eye, EyeOff } from "lucide-react";

const sizes = ["sm", "md", "lg"] as const;

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

function PasswordToggle() {
  const [show, setShow] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setShow(!show)}
      className="inline-flex items-center justify-center cursor-pointer text-inherit"
      aria-label={show ? "Hide password" : "Show password"}
    >
      {show ? <EyeOff /> : <Eye />}
    </button>
  );
}

export default function TextFieldPreviewPage() {
  const [controlled, setControlled] = useState("");

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-bold">Text Field</h1>
        <p className="mt-1 text-sm text-[var(--text-tertiary)]">
          All sizes, states, and compositions.
        </p>
      </div>

      {/* Sizes */}
      <Section title="Sizes">
        <div className="flex items-end gap-4">
          {sizes.map((s) => (
            <div key={s} className="w-64">
              <TextField size={s} label={`Size: ${s}`} placeholder="Placeholder" />
            </div>
          ))}
        </div>
      </Section>

      {/* States */}
      <Section title="States">
        <div className="grid max-w-xl gap-6">
          <TextField label="Default" placeholder="Enter text..." />
          <TextField label="Filled" defaultValue="Hello world" />
          <TextField label="Disabled" placeholder="Disabled" disabled />
          <TextField
            label="Error"
            defaultValue="bad-email"
            error="Please enter a valid email address."
          />
        </div>
      </Section>

      {/* With addons */}
      <Section title="With Addons">
        <div className="grid max-w-xl gap-6">
          <TextField
            label="Lead icon"
            leadAddon={<Search />}
            placeholder="Search..."
          />
          <TextField
            label="Tail icon"
            tailAddon={<Info />}
            placeholder="Enter value"
          />
          <TextField
            label="Lead text"
            leadAddon={
              <span className="text-sm text-[var(--text-secondary)]">https://</span>
            }
            placeholder="example.com"
          />
          <TextField
            label="Lead + tail"
            leadAddon={<Mail />}
            tailAddon={<PasswordToggle />}
            placeholder="Email or password"
          />
        </div>
      </Section>

      {/* Character count */}
      <Section title="Character Count (maxLength)">
        <div className="grid max-w-xl gap-6">
          <TextField
            label="Bio"
            hint="Write a short introduction."
            placeholder="Tell us about yourself"
            maxLength={80}
            value={controlled}
            onChange={(e) => setControlled(e.target.value)}
          />
          <TextField
            label="Uncontrolled"
            placeholder="Type here..."
            maxLength={40}
          />
        </div>
      </Section>

      {/* Full composition */}
      <Section title="Full Composition">
        <div className="grid max-w-xl gap-6">
          <TextField
            label="Email"
            hint="We'll never share your email."
            leadAddon={<Mail />}
            placeholder="you@example.com"
            type="email"
          />
          <TextField
            label="Username"
            error="This username is already taken."
            leadAddon={
              <span className="text-sm text-[var(--text-secondary)]">@</span>
            }
            defaultValue="gabriel"
          />
        </div>
      </Section>
    </div>
  );
}
