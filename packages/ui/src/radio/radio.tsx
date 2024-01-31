"use client";

import { VariantProps, cva } from "class-variance-authority";
import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../utils";

const containerClass = cva("relative inline-flex cursor-pointer flex-start", {
  variants: {
    disabled: {
      true: "opacity-50",
    },
  },
});

const switchClass = cva(
  "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
  {
    variants: {
      disabled: {
        true: "opacity-50",
      },
    },
  },
);

const labelClass = cva("shrink pt-[2px] ml-3 space-y-0.5");

interface Props
  extends InputHTMLAttributes<HTMLInputElement>,
    Omit<VariantProps<typeof containerClass>, "disabled"> {
  label?: string;
  description?: string;
  className?: string;
}

const Radio = forwardRef<HTMLInputElement, Props>(
  ({ label, value, disabled, description, className, ...props }, ref) => {
    return (
      <label className={cn(containerClass({ disabled }), className)}>
        <div>
          <input
            ref={ref}
            type="radio"
            value={value}
            className={switchClass({ disabled })}
            disabled={disabled}
            {...props}
          />
        </div>
        <span className={labelClass()}>
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

export default Radio;
