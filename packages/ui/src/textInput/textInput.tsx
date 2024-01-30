import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import React, { forwardRef } from "react";
import { type FieldError } from "react-hook-form";
import InputMask, { Props as InputMaskProps } from "react-input-mask";
import Error from "../error/error";
import Spinner from "../spinner/spinner";
import { cn } from "../utils";

import { InfoDisclosure, type InfoDisclosureProps } from "../toolTip/toolTip";

const containerVariants = cva(
  "focus-within:border-primary-300 focus-within:outline disabled-within:bg-error-500 flex w-full grow items-stretch rounded-md border items-center outline outline-0 bg-white",
  {
    variants: {
      disabled: {
        true: "bg-gray-50",
        false: "",
      },
      error: {
        true: "border-error-500 text-error-500",
        false: "text-gray-900 border-neutral-300 text-gray-900",
      },
      advancedAddon: {
        true: "pr-3.5",
        false: "px-3.5",
      },
    },
    defaultVariants: {
      advancedAddon: false,
    },
  },
);

export interface InputProps extends Omit<InputMaskProps, "advancedAddon"> {
  label?: string;
  isLoading?: boolean;
  error?: string | FieldError;
  leftAccessory?: React.ReactElement;
  rightAccessory?: React.ReactElement;
  className?: string;
  description?: string;
  tooltip?: InfoDisclosureProps;
  addon?: string | React.ReactElement;
  mask?: string;
}

const TextInput = forwardRef<InputMask, InputProps>(
  (
    {
      addon,
      className = "",
      label = undefined,
      error,
      isLoading,
      description,
      leftAccessory,
      rightAccessory,
      tooltip = undefined,
      mask = "",
      disabled,
      ...props
    }: InputProps,
    ref,
  ) => {
    const errorMessage: string | undefined =
      typeof error === "string" ? error : error?.message;

    const showLabel =
      (label !== undefined && label !== "") || typeof tooltip === "object";

    const isAdvancedAddon = typeof addon === "object";

    const rightItem = () => {
      if (isLoading === true) {
        return (
          <div className="relative">
            <Spinner size="md" className="absolute -top-[14px] right-0" />
          </div>
        );
      } else if (rightAccessory !== undefined) {
        return (
          <div className="relative ml-2 flex items-center text-gray-500">
            <Slot size={16}>{rightAccessory}</Slot>
          </div>
        );
      }
      return undefined;
    };

    return (
      <div className={`form-control w-full space-y-1.5 ${className}`}>
        {showLabel && (
          <label className="label inline-flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-white">
            {label && <span className="label-text">{label}</span>}
            {tooltip && <InfoDisclosure {...tooltip} />}
          </label>
        )}
        <div
          className={cn(
            containerVariants({
              disabled,
              error: errorMessage !== undefined,
              advancedAddon: isAdvancedAddon,
            }),
          )}
        >
          {addon && (
            <div
              className={`flex h-[44px] h-full grow items-center justify-center border-r border-neutral-500 ${
                !isAdvancedAddon ? "mr-3 pr-2" : "mr-2 mr-3"
              }  text-gray-500`}
            >
              {addon}
            </div>
          )}

          {leftAccessory && (
            <div className="mr-2 flex items-center text-gray-500">
              <Slot size={16} className="">
                {leftAccessory}
              </Slot>
            </div>
          )}
          <InputMask
            mask={mask}
            type="text"
            className="flex shrink grow appearance-none border-0 bg-transparent py-2 ring-0 focus:outline-none active:outline-0 disabled:bg-transparent"
            disabled={disabled}
            {...props}
            ref={ref}
          />
          {rightItem()}
        </div>
        {description && !error && (
          <div className="shrink grow text-xs text-gray-500">{description}</div>
        )}
        <Error message={errorMessage} />
      </div>
    );
  },
);
TextInput.displayName = "TextInput";
export default TextInput;
