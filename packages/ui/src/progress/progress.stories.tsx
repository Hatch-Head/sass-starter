import type { Meta, StoryObj } from "@storybook/react";
import Component from "./progress";
const meta: Meta<typeof Component> = {
  component: Component,
  title: "components/Progress",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Progress bar is used to indicate the progress of an operation. When completed, the progress bar will be styled to show success.",
      },
    },
  },
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
    error: {
      control: { type: "text" },
    },
  },
};

export const Error: Story = {
  args: {
    error: "Something went wrong",
    className: "min-w-[400px]",
    label: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "When an error is passed, the progress bar will be styled to show error and will appear full. The label will be replaced with the error message and forced into the `bottom` position.",
      },
    },
  },
};
