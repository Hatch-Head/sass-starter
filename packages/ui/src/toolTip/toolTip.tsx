"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { cva, VariantProps } from "class-variance-authority";
import React, { ReactElement } from "react";
const toolTip = cva(
  "shadow-lg max-w-xs space-y-1 rounded-lg p-3 text-xs text-gray-500 dark:bg-black dark:text-white dark:bg-gray-900 dark:text-white z-10",
  {
    variants: {},
  },
);

export interface ToolTipProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    Tooltip.PopperContentProps,
    VariantProps<typeof toolTip> {
  children: React.ReactNode;
  content?: string;
  title?: string;
}

const ToolTip = ({
  children,
  content,
  title,
  className,
  ...props
}: ToolTipProps) => {
  return (
    <Tooltip.Provider delayDuration={300}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild className="cursor-pointer">
          <span className={className}>{children}</span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content {...props} className={toolTip()} sideOffset={5}>
            {title && <div className="font-medium">{title}</div>}
            {content}
            <Tooltip.Arrow className="fill-white dark:fill-black" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export type InfoDisclosureProps = {
  content?: string;
  title?: string;
};

export const InfoDisclosure = ({ content, title }: InfoDisclosureProps) => (
  <ToolTip content={content} title={title}>
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1054_159)">
        <path
          d="M6.05998 5.99998C6.21672 5.55442 6.52608 5.17872 6.93328 4.9394C7.34048 4.70009 7.81924 4.61261 8.28476 4.69245C8.75028 4.7723 9.17252 5.01433 9.4767 5.37567C9.78087 5.737 9.94735 6.19433 9.94665 6.66665C9.94665 7.99998 7.94665 8.66665 7.94665 8.66665M7.99998 11.3333H8.00665M14.6666 7.99998C14.6666 11.6819 11.6819 14.6666 7.99998 14.6666C4.31808 14.6666 1.33331 11.6819 1.33331 7.99998C1.33331 4.31808 4.31808 1.33331 7.99998 1.33331C11.6819 1.33331 14.6666 4.31808 14.6666 7.99998Z"
          stroke="#98A2B3"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1054_159">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </ToolTip>
);

export function withTooltip<P>(
  ComponentInstance: ReactElement<P>,
  tooltipContent: string,
  title?: string,
) {
  return (
    <ToolTip title={title} content={tooltipContent}>
      {ComponentInstance}
    </ToolTip>
  );
}

export default ToolTip;
