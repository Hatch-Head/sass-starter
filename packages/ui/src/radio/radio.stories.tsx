import type { Meta, StoryObj } from "@storybook/react";
import Components from "./radio";

const meta: Meta<typeof Components> = {
  component: Components,
  title: "components/Radio",
};

export default meta;
type Story = StoryObj<typeof Components>;

export const Radio: Story = {
  args: {
    label: "This is a radio",
    description: "This is a description",
    disabled: false,
  },
};
