import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";
import "./button.css";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap font-semibold",
    "transition-colors cursor-pointer",
    "outline-2 outline-offset-2 outline-transparent focus-visible:outline-[var(--focus-ring)]",
    "disabled:cursor-not-allowed",
  ],
  {
    variants: {
      hierarchy: {
        "accent-primary": [
          "bg-[var(--bg-brand-solid)] text-[var(--text-on-color)]",
          "shadow-xs-skeuomorphic",
          "hover:bg-[var(--bg-brand-solid-hover)]",
          "active:bg-[var(--bg-brand-solid-active)]",

          "disabled:bg-[var(--bg-disabled)] disabled:text-[var(--text-disabled)] disabled:shadow-none",
        ],
        "neutral-primary": [
          "bg-[var(--bg-primary-solid)] text-[var(--text-on-color)]",
          "shadow-xs-skeuomorphic",
          "hover:bg-[var(--bg-primary-solid-hover)]",
          "active:bg-[var(--bg-primary-solid-active)]",

          "disabled:bg-[var(--bg-disabled)] disabled:text-[var(--text-disabled)] disabled:shadow-none",
        ],
        secondary: [
          "bg-[var(--bg-secondary)] text-[var(--text-secondary)]",
          "hover:bg-[var(--bg-secondary-hover)] hover:text-[var(--text-secondary-hover)]",
          "active:bg-[var(--bg-secondary-active)] active:text-[var(--text-secondary-active)]",

          "disabled:bg-[var(--bg-disabled)] disabled:text-[var(--text-disabled)]",
        ],
        outline: [
          "bg-[var(--bg-primary)] text-[var(--text-secondary)]",
          "border border-[var(--border-tertiary)]",
          "shadow-xs-skeuomorphic",
          "hover:bg-[var(--bg-primary-hover)] hover:text-[var(--text-secondary-hover)]",
          "active:bg-[var(--bg-primary-active)] active:text-[var(--text-secondary-active)]",

          "disabled:bg-[var(--bg-disabled)] disabled:text-[var(--text-disabled)] disabled:border-[var(--border-disabled)] disabled:shadow-none",
        ],
        ghost: [
          "bg-transparent text-[var(--text-secondary)]",
          "hover:bg-[var(--bg-secondary)] hover:text-[var(--text-secondary-hover)]",
          "active:bg-[var(--bg-secondary-active)] active:text-[var(--text-secondary-active)]",

          "disabled:bg-transparent disabled:text-[var(--text-disabled)]",
        ],
        "link-color": [
          "bg-transparent text-[var(--text-brand-secondary)]",
          "hover:text-[var(--text-brand-secondary-hover)]",
          "active:text-[var(--text-brand-secondary-active)]",

          "disabled:text-[var(--text-disabled)]",
        ],
        "link-gray": [
          "bg-transparent text-[var(--text-secondary)]",
          "hover:text-[var(--text-secondary-hover)]",
          "active:text-[var(--text-secondary-active)]",

          "disabled:text-[var(--text-disabled)]",
        ],
      },
      size: {
        sm: "h-8 gap-1 rounded-lg text-sm px-3",
        md: "h-10 gap-1 rounded-lg text-sm px-3.5",
        lg: "h-11 gap-1.5 rounded-lg text-base px-4",
        xl: "h-12 gap-1.5 rounded-lg text-base px-[18px]",
      },
      iconOnly: {
        true: "p-0",
        false: "",
      },
    },
    compoundVariants: [
      { iconOnly: true, size: "sm", className: "w-8 px-0" },
      { iconOnly: true, size: "md", className: "w-10 px-0" },
      { iconOnly: true, size: "lg", className: "w-11 px-0" },
      { iconOnly: true, size: "xl", className: "w-12 px-0" },
      /* Link variants render inline — strip fixed height and padding */
      { hierarchy: "link-color", size: "sm", className: "h-auto py-0 px-0" },
      { hierarchy: "link-color", size: "md", className: "h-auto py-0 px-0" },
      { hierarchy: "link-color", size: "lg", className: "h-auto py-0 px-0" },
      { hierarchy: "link-color", size: "xl", className: "h-auto py-0 px-0" },
      { hierarchy: "link-gray", size: "sm", className: "h-auto py-0 px-0" },
      { hierarchy: "link-gray", size: "md", className: "h-auto py-0 px-0" },
      { hierarchy: "link-gray", size: "lg", className: "h-auto py-0 px-0" },
      { hierarchy: "link-gray", size: "xl", className: "h-auto py-0 px-0" },
    ],
    defaultVariants: {
      hierarchy: "accent-primary",
      size: "md",
      iconOnly: false,
    },
  }
);

/* Icon size classes per button size */
const iconSizeMap = {
  sm: "size-5",
  md: "size-5",
  lg: "size-5",
  xl: "size-6",
} as const;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  iconLeading?: React.ReactNode;
  iconTrailing?: React.ReactNode;
}

function Button({
  className,
  hierarchy = "accent-primary",
  size = "md",
  iconOnly = false,
  asChild = false,
  loading = false,
  iconLeading,
  iconTrailing,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  const sizeKey = size ?? "md";
  const iconClass = iconSizeMap[sizeKey as keyof typeof iconSizeMap];

  if (process.env.NODE_ENV === "development" && iconOnly && !props["aria-label"]) {
    console.warn("Button: iconOnly buttons should have an aria-label for accessibility.");
  }

  return (
    <Comp
      data-slot="button"
      data-hierarchy={hierarchy}
      data-size={size}
      disabled={disabled}
      aria-disabled={loading || disabled || undefined}
      className={cn(
        "relative",
        buttonVariants({ hierarchy, size, iconOnly, className }),
        loading && "pointer-events-none"
      )}
      {...props}
    >
      {/* Actual content — invisible when loading to hold width */}
      <span
        className={cn(
          "inline-flex items-center justify-center gap-[inherit]",
          loading && "invisible"
        )}
      >
        {iconLeading && (
          <span className={cn("shrink-0", iconClass, "[&>svg]:size-full")}>
            {iconLeading}
          </span>
        )}
        {!iconOnly && <span className="px-[2px]">{children}</span>}
        {iconTrailing && (
          <span className={cn("shrink-0", iconClass, "[&>svg]:size-full")}>
            {iconTrailing}
          </span>
        )}
      </span>

      {/* Loading spinner — absolutely centered overlay */}
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner className={iconClass} />
        </span>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
