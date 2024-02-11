import { VariantProps, cva } from "class-variance-authority";
import React from "react";

export const badge = cva(
  [
    "inline-block",
    "rounded-full",
    "px-3",
    "py-1",
    "text-xs",
    "uppercase",
    "font-semibold",
    "leading-tight",
  ],
  {
    variants: {
      status: {
        success: ["bg-success-500/10", "text-success-500"],
        info: ["bg-primary/10", "text-primary"],
        warning: ["bg-warning-500/10", "text-warning-500"],
        error: ["bg-error-500/10", "text-error-500"],
      },
    },
    defaultVariants: {
      status: "info",
    },
  },
);

export type BadgeProps = React.HtmlHTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badge>;

export const Badge = ({
  children,
  className,
  status,
  ...props
}: BadgeProps) => (
  <span className={badge({ status, className })} {...props}>
    {children}
  </span>
);

Badge.displayName = "Badge";
