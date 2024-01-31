"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import React, { forwardRef, type InputHTMLAttributes } from "react";
import { type FieldError } from "react-hook-form";
import Error from "../error/error";
import Spinner from "../spinner/spinner";
import { InfoDisclosure, type InfoDisclosureProps } from "../toolTip/toolTip";
import { cn } from "../utils";
import AddOn from "./addOn";

const containerVariants = cva(
  "focus-within:outline focus-within:ring-4 disabled-within:bg-error-500 flex w-full rounded-md border items-center outline outline-0 bg-white dark:bg-gray-900 overflow-hidden ",
  {
    variants: {
      disabled: {
        true: "bg-gray-50",
        false: "",
      },
      error: {
        true: "border-error-500 text-error-500 focus-within:border-error-300 focus-within:ring-error-100",
        false:
          "text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 text-gray-900 focus-within:border-primary-300 focus-within:ring-primary-100 dark:focus-within:border-primary-600 dark:focus-within:ring-primary-900",
      },
      advancedAddon: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      advancedAddon: false,
    },
  },
);

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isLoading?: boolean;
  error?: string | FieldError;
  leftAccessory?: React.ReactElement;
  rightAccessory?: React.ReactElement;
  className?: string;
  description?: string;
  tooltip?: InfoDisclosureProps;
  leftAddon?: string | React.ReactElement;
  rightAddon?: string | React.ReactElement;
  mask?: string | Array<string | RegExp>;
  inputClassName?: string;
}

const TextInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      leftAddon,
      rightAddon,
      className = "",
      label = undefined,
      error,
      isLoading,
      description,
      leftAccessory,
      rightAccessory,
      inputClassName,
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
      <div
        className={`form-control flex w-full  flex-col space-y-1.5 ${className}`}
      >
        {showLabel && (
          <label className="label inline-flex items-center space-x-2 text-sm font-bold text-gray-700">
            {label && <span className="label-text">{label}</span>}
            {tooltip && <InfoDisclosure {...tooltip} />}
          </label>
        )}
        <div
          className={cn(
            containerVariants({
              disabled,
              error: errorMessage !== undefined,
            }),
          )}
        >
          {leftAddon && (
            <AddOn isAdvanced={typeof leftAddon === "object"}>
              {leftAddon}
            </AddOn>
          )}
          {leftAccessory && (
            <div className="mr-2 flex items-center text-gray-500">
              <Slot size={16} className="">
                {leftAccessory}
              </Slot>
            </div>
          )}
          <input
            //mask={mask}
            type="text"
            className={`flex h-[37px] w-full shrink grow appearance-none border-0 bg-transparent px-4 ring-0 focus:outline-none active:outline-0 ${inputClassName}`}
            disabled={disabled}
            {...props}
            ref={ref}
          />
          {rightItem()}
          {rightAddon && (
            <AddOn isAdvanced={typeof rightAddon === "object"} right>
              {rightAddon}
            </AddOn>
          )}
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
