import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

export const badge = cva(
  [
    "inline-flex",
    "rounded-full",
    "font-regular",
    "leading-tight",
    "items-center",
    "just0ify-center",
  ],
  {
    variants: {
      variant: {
        // Aliases
        success: ["bg-success-50", "text-success-700"],
        warning: ["bg-orange-50", "text-orange-700"],
        danger: ["bg-red-50", "text-red-700"],
        primary: ["bg-primary-50", "text-primary-700"],
        // Colors
        gray: ["bg-gray-100", "text-gray-700"],
        blueLight: ["bg-blueLight-50", "text-blueLight-700"],
        blueGray: ["bg-blueGray-50", "text-blueGray-700"],
        blue: ["bg-blue-50", "text-blue-700"],
        indigo: ["bg-indigo-50", "text-indigo-700"],
        purple: ["bg-purple-50", "text-purple-700"],
        pink: ["bg-pink-50", "text-pink-700"],
        rose: ["bg-rose-50", "text-rose-700"],
        orange: ["bg-orange-50", "text-orange-700"],
      },
      size: {
        sm: "py-1 px-2 text-xs",
        md: "py-1 px-3 text-sm",
        lg: "py-1 px-3 text-md",
      },
    },
    defaultVariants: {
      variant: "gray",
      size: "sm",
    },
  },
);

export interface BadgeProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badge> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Badge = ({
  children,
  className,
  variant,
  leftIcon,
  rightIcon,
  size = "sm",
  ...props
}: BadgeProps) => (
  <span className={badge({ variant, size, className })} {...props}>
    {leftIcon && <Slot className="mr-1">{leftIcon}</Slot>}
    {children}
    {rightIcon && <Slot className="ml-1">{rightIcon}</Slot>}
  </span>
);

Badge.displayName = "Badge";

export default Badge;
