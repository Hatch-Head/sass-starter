import type { Meta, StoryObj } from "@storybook/react";
import { Zap } from "lucide-react";
import Component from "./iconFeature";
const meta: Meta<typeof Component> = {
  component: Component,
  title: "components/IconFeature",
};

export default meta;
type Story = StoryObj<typeof Component>;

export const IconFeature: Story = {
  args: {
    children: <Zap />,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    size: {
      control: {
        type: "select",
      },
      options: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md",
    },
    shape: {
      control: {
        type: "select",
      },
      options: ["circle", "square"],
      defaultValue: "circle",
    },
    variant: {
      control: {
        type: "select",
      },
      options: ["primary", "neutral", "error", "warning", "success"],
      defaultValue: "primary",
    },
    tintMethod: {
      control: {
        type: "select",
      },
      options: ["stroke", "fill"],
      defaultValue: "stroke",
    },
  },
};
