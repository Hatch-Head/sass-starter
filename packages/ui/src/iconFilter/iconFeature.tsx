import { cva, type VariantProps } from "class-variance-authority";
import { cloneElement, type ReactElement } from "react";
import { cn } from "../utils";

const styles = cva("", {
  variants: {
    size: {
      xs: "p-0",
      sm: "p-0",
      md: "p-1",
      lg: "p-1",
      xl: "p-1",
    },
    shape: {
      circle: "rounded-full",
      square: "rounded-lg",
    },
    tintMethod: {
      stroke: "",
      fill: "",
    },
    variant: {
      primary: "",
      neutral: "",
      error: "",
      warning: "",
      success: "",
    },
  },

  compoundVariants: [
    // Strokes
    {
      variant: "primary",
      tintMethod: "stroke",
      className: "stroke-primary-600 bg-primary-100",
    },
    {
      variant: "neutral",
      tintMethod: "stroke",
      className: "stroke-gray-600 bg-gray-100",
    },
    {
      variant: "error",
      tintMethod: "stroke",
      className: "stroke-error-600 bg-error-100",
    },
    {
      variant: "warning",
      tintMethod: "stroke",
      className: "stroke-warning-600 bg-warning-100",
    },
    {
      variant: "success",
      tintMethod: "stroke",
      className: "stroke-success-600 bg-success-100",
    },

    // Fills
    {
      variant: "primary",
      tintMethod: "fill",
      className: "fill-primary-600 bg-primary-100",
    },
    {
      variant: "neutral",
      tintMethod: "fill",
      className: "fill-gray-600 bg-gray-100",
    },
    {
      variant: "error",
      tintMethod: "fill",
      className: "fill-error-600 bg-error-100",
    },
    {
      variant: "warning",
      tintMethod: "fill",
      className: "fill-warning-600 bg-warning-100",
    },
    {
      variant: "success",
      tintMethod: "fill",
      className: "fill-success-600 bg-success-100",
    },
  ],

  defaultVariants: {
    size: "md",
    shape: "circle",
    variant: "primary",
    tintMethod: "stroke",
  },
});

export interface IconFeatureProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styles> {
  children: ReactElement<{ size?: number; className?: string }>;
  iconSize?: number;
}

const IconFeature = ({
  className = "inline-flex items-center justify-center",
  size = "md",
  shape = "circle",
  variant = "primary",
  tintMethod,
  iconSize,
  ...props
}: IconFeatureProps) => {
  const sizes = {
    xs: 20,
    sm: 25,
    md: 35,
    lg: 38,
    xl: 40,
  };

  // TODO: Fix explicit ! non-null assertion
  const iconSizeStyle = iconSize ? iconSize : sizes[size!];

  return (
    <div
      className={cn(styles({ size, shape, variant, tintMethod }), className)}
      {...props}
    >
      {cloneElement(props.children, {
        className: cn(styles({ variant, tintMethod })),
        size: iconSizeStyle,
      })}
    </div>
  );
};

export default IconFeature;
