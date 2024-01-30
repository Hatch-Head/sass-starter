import { VariantProps, cva } from "class-variance-authority";
import { InputHTMLAttributes, forwardRef, useEffect, useRef } from "react";
import { cn } from "../utils";

const containerClass = cva("relative inline-flex cursor-pointer flex-start", {
  variants: {
    disabled: {
      true: "opacity-50",
    },
  },
});

const switchClass = cva(
  "w-4 h-4 mt-1 text-purple-600 bg-gray-100 border-gray-300 rounded-2xl focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
  {
    variants: {
      disabled: {
        true: "opacity-50",
      },
    },
  },
);

const labelClass = cva("shrink ml-3 space-y-0");

interface Props
  extends InputHTMLAttributes<HTMLInputElement>,
    Omit<VariantProps<typeof containerClass>, "disabled"> {
  label?: string;
  description?: string;
  className?: string;
  indeterminate?: boolean;
}

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean;
}

const GhostCheckbox = ({ indeterminate = false, checked }: CheckboxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className="mt-[2px] inline-flex items-center">
      <label
        className="relative flex cursor-pointer items-center rounded-sm"
        htmlFor="checkbox"
      >
        <input
          ref={inputRef}
          type="checkbox"
          className="before:content[''] border-primary-50 before:bg-blue-gray-500 checked:bg-primary-50 checked:before:bg-primary-600 checked:border-primary-600 indeterminate:bg-primary-100 border-primary-600 peer relative h-5 w-5 cursor-pointer appearance-none rounded-sm border transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity hover:before:opacity-10"
          checked={checked}
        />

        <span className="peer-checked:text-primary-600 pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100  peer-indeterminate:opacity-0">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            stroke="none"
            className="stroke-0"
          >
            <path
              d="M10 3L4.5 8.5L2 6"
              stroke="#7F56D9"
              stroke-width="1.6666"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>

        <span className="peer-indeterminate:text-primary-600 pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-indeterminate:opacity-100">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            stroke="currentColor"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 6H9.5"
              stroke="currentColor"
              stroke-width="1.66666"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </label>
    </div>
  );
};

const Checkbox = forwardRef<HTMLInputElement, Props>(
  (
    { label, value, disabled, description, indeterminate, checked, className },
    ref,
  ) => {
    return (
      <label className={cn(containerClass({ disabled }), className)}>
        <div>
          <GhostCheckbox
            checked={checked}
            indeterminate={indeterminate}
            disabled
          />
        </div>
        <span className={labelClass()}>
          <label
            data-testid="checkbox-label"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
          {description && (
            <div
              data-testid="checkbox-description"
              className="text-xs text-gray-500"
            >
              {description}
            </div>
          )}
        </span>
      </label>
    );
  },
);

export default Checkbox;
