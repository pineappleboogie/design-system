import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "label-12", "label-12-caps", "label-13", "label-14", "label-16", "label-18", "label-20",
            "copy-12", "copy-13", "copy-14", "copy-16", "copy-18", "copy-20",
            "heading-14", "heading-16", "heading-20", "heading-24", "heading-32",
            "heading-40", "heading-48", "heading-56", "heading-64", "heading-72",
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
