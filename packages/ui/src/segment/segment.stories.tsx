import type { Meta, StoryObj } from "@storybook/react";
import Component, { type SegmentProps } from "./segment";

const meta: Meta<typeof Component> = {
  component: Component,
  tags: ["autodocs"],
  title: "components/Segment",
  parameters: {
    docs: {
      description: {
        component: "Buttons communicate actions that users can take.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Default: Story = (args: SegmentProps) => {
  return (
    <Component {...args}>
      <Component.Segment label="Tab 1">Tab 1</Component.Segment>
      <Component.Segment label="Tab 2">Tab 2</Component.Segment>
      <Component.Segment label="Tab 3">Tab 3</Component.Segment>
    </Component>
  );
};
Default.args = {
  defaultActiveTab: 1,
  segmentAlign: "center",
};
Default.argTypes = {
  segmentAlign: {
    options: ["left", "center", "right"],

    control: {
      type: "select",
    },
  },
  segmentClass: {
    control: {
      type: "text",
    },
  },
  segmentWidth: {
    control: {
      type: "number",
    },
  },
};
