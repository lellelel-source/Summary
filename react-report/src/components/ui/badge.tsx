import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-sky-500/90 text-white shadow hover:bg-sky-600",
        secondary:
          "border-transparent bg-violet-500/90 text-white shadow hover:bg-violet-600",
        destructive:
          "border-transparent bg-red-500/90 text-white shadow hover:bg-red-600",
        outline: "border-gray-600 text-gray-300 hover:bg-gray-800",
        success:
          "border-transparent bg-green-500/90 text-white shadow hover:bg-green-600",
        warning:
          "border-transparent bg-amber-500/90 text-white shadow hover:bg-amber-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
