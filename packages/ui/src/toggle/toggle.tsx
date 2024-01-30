import { VariantProps, cva } from "class-variance-authority";
import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../utils";

const containerClass = cva("relative inline-flex cursor-pointer flex-start", {
  variants: {
    variant: {
      primary: "",
      neutral: "",
    },
    reversed: {
      true: "flex-row-reverse",
    },
  },
});

const switchClass = cva(
  "peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']   peer-checked:after:border-white peer-focus:ring-4  dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800",
  {
    variants: {
      variant: {
        primary: "peer-checked:bg-primary-500 peer-focus:ring-primary-300",
        neutral: "peer-checked:bg-gray-600 peer-focus:ring-gray-300",
        success: "peer-checked:bg-success-500 peer-focus:ring-success-300",
      },
      reversed: {
        false: "after:left-[2px] peer-checked:after:translate-x-full",
        true: "after:right-[2px] peer-checked:after:-translate-x-full",
      },
      disabled: {
        true: "opacity-50",
      },
    },
    defaultVariants: {
      reversed: false,
      variant: "primary",
    },
  },
);

const labelClass = cva("shrink pt-[2px] space-y-0.5", {
  variants: {
    reversed: {
      false: "ml-3",
      true: "mr-3",
    },
  },
});

interface Props
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof containerClass> {
  label?: string;
  description?: string;
  className?: string;
}

const Toggle = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      value,
      disabled,
      description,
      className,
      variant,
      reversed = false,
      ...props
    },
    ref,
  ) => {
    return (
      <label className={cn(containerClass({ variant, reversed }), className)}>
        <div>
          <input
            ref={ref}
            type="checkbox"
            value={value}
            className="peer sr-only"
            disabled={disabled}
            {...props}
          />
          <div className={switchClass({ reversed, disabled, variant })}></div>
        </div>
        <span className={labelClass({ reversed })}>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </div>
          {description && (
            <div className="text-xs  text-gray-500">{description}</div>
          )}
        </span>
      </label>
    );
  },
);

export default Toggle;
