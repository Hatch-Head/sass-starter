"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";
import Error from "../error/error";
import { cn } from "../utils";

const selectStyles = cva(
  "bg-background data-placeholder:text-gray-500 shadow-xs flex w-full items-center justify-between text-sm text-gray-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 px-3 [&>span]:line-clamp-1 h-[44px]",
  {
    variants: {
      asChild: {
        true: "",
        false:
          "h-10 border-gray-300 py-2 rounded-md border focus:ring-4 data-[state=open]:ring-4",
      },
      error: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        asChild: false,
        error: true,
        className:
          "border-error-500 focus:ring-error-50 text-error-500 data-[state=open]:ring-error-50 data-[state=open]:border-error-600",
      },
      {
        asChild: false,
        error: false,
        className:
          "focus:border active:ring-primary-50 active:border-primary-600 data-[state=open]:ring-primary-50 data-[state=open]:border-primary-600",
      },
    ],
    defaultVariants: {
      asChild: false,
    },
  },
);

export interface SelectProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
    Omit<VariantProps<typeof selectStyles>, "error"> {
  children: React.ReactNode;
  className?: string;
  placeholder?: string;
  isLoading?: boolean;
  error?: string;
  label?: string;
  description?: string;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
}

interface SelectComponent
  extends React.ForwardRefExoticComponent<
    React.PropsWithChildren<SelectProps> &
      React.RefAttributes<HTMLSelectElement>
  > {
  Item: typeof SelectItem;
  Group: typeof SelectGroup;
  Separator: typeof SelectSeparator;
  Label: typeof SelectLabel;
}

const Select = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Root>,
  SelectProps
>(
  (
    {
      className,
      placeholder,
      description,
      error,
      asChild,
      label,
      children,
      side,
      align,
      ...props
    },
    ref,
  ) => (
    <div className="flex-1 space-y-0.5">
      {label && (
        <label className="label inline-flex items-center space-x-2 text-sm font-medium text-gray-700">
          {label && <span className="label-text">{label}</span>}
          {/* {tooltip && <InfoDisclosure {...tooltip} />} */}
        </label>
      )}
      <SelectPrimitive.Root ref={ref} {...props}>
        <SelectPrimitive.Trigger
          className={cn(selectStyles({ asChild, error: !!error }), className)}
          {...props}
        >
          <SelectPrimitive.Value className="flex-1" placeholder={placeholder} />
          <SelectContent
            className="bg-white p-0"
            side={side}
            align={align}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            {children}
          </SelectContent>
          <SelectPrimitive.Icon asChild>
            <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
      </SelectPrimitive.Root>
      {description && !error && (
        <div className="shrink grow text-xs text-gray-500">{description}</div>
      )}
      <Error message={error} />
    </div>
  ),
) as SelectComponent;

const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", side, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-0", // padding for the scrollable area
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-4 py-2 text-xs text-gray-500", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "focus:bg-accent focus:text-accent-foreground relative flex h-[44px] w-full cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm outline-none hover:bg-gray-50 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-50 data-[state=checked]:bg-gray-50 data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    {" "}
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <span className="absolute right-4 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="stroke-primary-600 h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-gray-200", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// Sub components
Select.Item = SelectItem;
Select.Group = SelectGroup;
Select.Separator = SelectSeparator;
Select.Label = SelectLabel;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
