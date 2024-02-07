import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

import Spinner from "../spinner/spinner";
import { cn } from "../utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 relative active:ring",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-600 text-white hover:bg-primary-700 active:ring-primary-300",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-gray-500",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "text-primary hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 rounded-md px-4 py-3 text-sm",
        md: "h-9 rounded-md px-4 py-2.5 px-4",
        lg: "rounded-md px-7 py-2.5 px-5 text-base font-lg",
        xl: "rounded-md px-7 py-3 px-5 text-base font-xl",
        "2xl": "rounded-md px-7 py-4 text-base font-2xl",
      },
      destructive: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        destructive: true,
        className: "bg-error-600 hover:bg-error-700 active:ring-error-100",
      },
      {
        variant: "secondary",
        destructive: true,
        className: "bg-red-100 text-red-600 hover:bg-error/90",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      destructive: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant,
      destructive,
      size,
      loading,
      disabled,
      leftIcon,
      rightIcon,
      ...props
    },
    ref,
  ) => {
    const leftAccessory = () => {
      if (leftIcon !== undefined && loading === true) {
        return (
          <Spinner
            variant="white"
            size={size === "sm" || size === "md" ? "sm" : "md"}
          />
        );
      } else if (leftIcon !== undefined) {
        return (
          <Slot size={16} className="mr-2">
            {leftIcon}
          </Slot>
        );
      }
      return undefined;
    };

    const showLoaderAsContent = loading && leftIcon === undefined;

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          buttonVariants({ variant, size, destructive, className }),
        )}
        {...props}
      >
        {leftAccessory()}
        {showLoaderAsContent ? (
          <span className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
            <Spinner
              variant="white"
              size={size === "sm" || size === "md" ? "sm" : "md"}
            />
          </span>
        ) : null}
        <span className={!showLoaderAsContent ? "" : "opacity-0"}>
          {children}
        </span>
        {rightIcon && (
          <Slot size={16} className="ml-2">
            {rightIcon}
          </Slot>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
