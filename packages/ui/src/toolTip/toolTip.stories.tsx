import type { Meta, StoryObj } from "@storybook/react";
import Components from "./toolTip";

const meta: Meta<typeof Components> = {
  component: Components,
  title: "components/Tooltip",
};

export default meta;
type Story = StoryObj<typeof Components>;

export const ToolTip: Story = {
  args: {
    side: "top",
    children: <button>Hover me</button>,
    title: "I am a tool tip",
    content:
      "Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand the meaning, function or alt-text of an element.",
  },

  argTypes: {
    side: {
      control: {
        type: "select",
      },
      options: ["top", "bottom", "left", "right"],
    },
  },
};
