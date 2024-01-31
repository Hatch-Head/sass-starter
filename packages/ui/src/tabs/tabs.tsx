"use client";

import React, { HTMLAttributes, ReactNode, useState } from "react";
import { cn } from "../utils";
import Tab from "./tab";

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultActiveTab?: number;
}

export const TabContent = ({ children, active = false, icon }: TabProps) => (
  <div className={`tab-item ${active ? "active" : ""}`}>{children}</div>
);
TabContent.displayName = "Tab";

interface TabProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  label: string;
  icon?: ReactNode;
  className?: string;
}

const Tabs = ({ children, defaultActiveTab = 0, className }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<number>(defaultActiveTab);

  const tabs = React.Children.toArray(children);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs-container">
      <nav className="flex flex-wrap text-center font-medium text-gray-500 dark:text-gray-400">
        {tabs.map((tab: any, index: number) => (
          <Tab onClick={() => handleTabClick(index)}>{tab.props.label}</Tab>
        ))}
      </nav>
      <div className={cn("tab-content py-4", className)}>{tabs[activeTab]}</div>
    </div>
  );
};
Tabs.displayName = "Tabs";
Tabs.Tab = TabContent;

export default Tabs;
