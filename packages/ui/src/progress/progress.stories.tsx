import type { Meta, StoryObj } from "@storybook/react";
import Component from "./progress";
const meta: Meta<typeof Component> = {
  component: Component,
  title: "components/Progress",
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Progress: Story = {
  args: {
    progress: 0.5,
    labelPosition: "left",
    className: "min-w-[400px]",
  },
  argTypes: {
    progress: {
      control: {
        type: "range",
        min: 0,
        max: 100,
        steps: 1,
      },
    },
    label: {
      control: { type: "boolean" },
    },
    labelPosition: {
      options: ["left", "bottom"],
      control: { type: "select" },
    },
    base: {
      control: { type: "number" },
    },
  },
};
