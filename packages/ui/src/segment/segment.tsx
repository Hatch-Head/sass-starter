"use client";

import { cva } from "class-variance-authority";
import React, { Children, HTMLAttributes, useState } from "react";
import { ButtonDefaultAsType, ButtonProps, cn } from "../utils";

const segmentStyle = cva(
  "flex py-2 basis-1/2 text-center items-center text-sm font-medium leading-none h-[40px] justify-center overflow-hidden truncate transition-all",
  {
    variants: {
      active: {
        true: "text-gray-900",
        false: "text-gray-500 hover:text-gray-900",
      },
    },
  },
);

interface TabProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  label: string;
  className?: string;
}

export const SegmentContent = ({ children, active = false }: TabProps) => (
  <div className={`tab-item ${active ? "active" : ""}`}>{children}</div>
);
SegmentContent.displayName = "SegmentContent";

const defaultElement = "button";

export const SegmentButton = <
  E extends React.ElementType = ButtonDefaultAsType,
>({
  children,
  as,
  active,
  className,
  ...otherProps
}: ButtonProps<E>) => {
  const Tag = as || ButtonDefaultAsType;

  return (
    <Tag className={cn(segmentStyle({ active }), className)} {...otherProps}>
      {children}
    </Tag>
  );
};

export interface SegmentProps extends HTMLAttributes<HTMLDivElement> {
  defaultActiveTab?: number;
  segmentClass?: string;
  contentClass?: string;
  segmentAlign?: "left" | "center" | "right";
  segmentWidth?: number;
}

const Segment = ({
  children,
  defaultActiveTab = 0,
  segmentClass = "",
  segmentAlign = "center",
  contentClass = "",
  className,
  segmentWidth = 600,
}: SegmentProps) => {
  const tabs = Children.toArray(children);
  const [activeTab, setActiveTab] = useState<number>(defaultActiveTab);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const segmentClassMap = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div className={cn("min-w-sm w-full overflow-hidden", className)}>
      <div
        className={`relative flex w-full overflow-hidden ${segmentClassMap[segmentAlign]}`}
      >
        <div
          className={cn(
            "relative h-[40px] rounded-[10px] bg-gray-200",
            segmentClass,
          )}
          style={{ minWidth: `${segmentWidth}px` }}
        >
          <div
            className="in-expo absolute left-0 top-0 h-[40px] rounded-md p-1 shadow-md transition duration-300"
            style={{
              width: `${100 / tabs.length}%`,
              transform: `translateX(${100 * activeTab}%)`,
            }}
          >
            <div className="h-full w-full rounded-[8px] bg-white shadow-sm" />
          </div>

          <nav className="absolute flex w-full">
            {tabs.map((tab: any, index: number) => (
              <SegmentButton
                active={activeTab === index}
                onClick={() => handleTabClick(index)}
              >
                {tab.props.label}
              </SegmentButton>
            ))}
          </nav>
        </div>
      </div>
      <div className={cn("tab-content pt-4", contentClass)}>
        <div className={`animate-fade-in-up ${activeTab}`} key={activeTab}>
          {tabs[activeTab]}
        </div>
      </div>
    </div>
  );
};

Segment.Segment = SegmentContent;

export default Segment;
