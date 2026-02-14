"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------
   Variants
   --------------------------------------------------------------- */

const textFieldVariants = cva(
  [
    "flex items-center bg-[var(--bg-primary)]",
    "transition-[box-shadow]",
    "shadow-input [&:hover:not(:focus-within)]:shadow-input-hover",
  ],
  {
    variants: {
      size: {
        sm: "min-h-8 text-label-14 px-3 gap-2 rounded-md",
        md: "min-h-10 text-label-14 px-3 gap-2 rounded-lg",
        lg: "min-h-12 text-label-16 px-3 gap-2 rounded-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/* Icon size classes per field size */
const iconSizeMap = {
  sm: "size-4",
  md: "size-4",
  lg: "size-4",
} as const;

/* ---------------------------------------------------------------
   Props
   --------------------------------------------------------------- */

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof textFieldVariants> {
  label?: string;
  hint?: string;
  error?: string;
  leadAddon?: React.ReactNode;
  tailAddon?: React.ReactNode;
}

/* ---------------------------------------------------------------
   Component
   --------------------------------------------------------------- */

function TextField({
  className,
  size = "md",
  label,
  hint,
  error,
  leadAddon,
  tailAddon,
  disabled,
  maxLength,
  id: idProp,
  defaultValue,
  value: valueProp,
  onChange,
  ...props
}: TextFieldProps) {
  const reactId = React.useId();
  const id = idProp ?? reactId;
  const hintId = `${id}-hint`;

  const sizeKey = size ?? "md";
  const iconClass = iconSizeMap[sizeKey as keyof typeof iconSizeMap];

  /* Track character count for both controlled and uncontrolled */
  const [charCount, setCharCount] = React.useState(() => {
    if (valueProp != null) return String(valueProp).length;
    if (defaultValue != null) return String(defaultValue).length;
    return 0;
  });

  React.useEffect(() => {
    if (valueProp != null) {
      setCharCount(String(valueProp).length);
    }
  }, [valueProp]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (valueProp == null) {
        setCharCount(e.target.value.length);
      }
      onChange?.(e);
    },
    [valueProp, onChange]
  );

  if (process.env.NODE_ENV === "development" && !label && !props["aria-label"]) {
    console.warn("TextField: provide a label or aria-label for accessibility.");
  }

  const hasHintRow = hint || error || maxLength != null;

  return (
    <div data-slot="text-field" data-size={sizeKey} className="flex flex-col gap-1.5">
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className="text-label-14 font-medium text-[var(--text-primary)]"
        >
          {label}
        </label>
      )}

      {/* Input container */}
      <div
        data-slot="text-field-input"
        className={cn(
          textFieldVariants({ size }),
          error
            ? "shadow-input-error [&:hover:not(:focus-within)]:shadow-input-error-hover focus-within:shadow-input-error-focus"
            : "focus-within:shadow-input-focus",
          disabled && "shadow-input bg-[var(--bg-disabled)] pointer-events-none",
          className
        )}
      >
        {/* Lead addon */}
        {leadAddon && (
          <span className={cn("shrink-0 whitespace-nowrap text-[var(--text-secondary)] [&_svg]:size-4")}>
            {leadAddon}
          </span>
        )}

        {/* Input */}
        <input
          id={id}
          disabled={disabled}
          maxLength={maxLength}
          value={valueProp}
          defaultValue={defaultValue}
          onChange={handleChange}
          aria-describedby={hasHintRow ? hintId : undefined}
          aria-invalid={error ? true : undefined}
          className={cn(
            "flex-1 min-w-0 bg-transparent outline-none",
            "text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]",
            "disabled:text-[var(--text-disabled)] disabled:cursor-not-allowed"
          )}
          {...props}
        />

        {/* Tail addon */}
        {tailAddon && (
          <span className={cn("shrink-0 whitespace-nowrap text-[var(--text-secondary)] [&_svg]:size-4")}>
            {tailAddon}
          </span>
        )}
      </div>

      {/* Hint / Error / Character count */}
      {hasHintRow && (
        <div id={hintId} className="flex justify-between gap-4">
          {(error || hint) && (
            <p
              className={cn(
                "text-label-14",
                error ? "text-[var(--text-error)]" : "text-[var(--text-tertiary)]"
              )}
            >
              {error ?? hint}
            </p>
          )}
          {maxLength != null && (
            <span className="ml-auto text-label-14 text-[var(--text-tertiary)]">
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export { TextField, textFieldVariants };
