import { cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils";

const tabStyles = cva("tab-item px-6 py-2 border-b transition-all ", {
  variants: {
    active: {
      true: "border-primary-600 text-primary-600",
      false: "border-primary-300 hover:border-primary-300 text-gray-400",
    },
  },
});

export const ButtonDefaultAsType = "button" as const;
export type ButtonDefaultAsType = typeof ButtonDefaultAsType;

export type ButtonOwnProps<E extends React.ElementType> = {
  children: React.ReactNode;
  as?: E;
};

export type ButtonProps<E extends React.ElementType> = ButtonOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof ButtonOwnProps<E>> & { active?: boolean };

export const Tab = <E extends React.ElementType = ButtonDefaultAsType>({
  children,
  as,
  active,
  className,
  label,
  ...otherProps
}: ButtonProps<E>) => {
  const Tag = as || ButtonDefaultAsType;

  return (
    <Tag
      key={label}
      className={cn(tabStyles({ active }), className)}
      {...otherProps}
    >
      {children}
    </Tag>
  );
};

export default Tab;
