import type { Meta, StoryObj } from "@storybook/react";
import Component from "./logo";

const meta: Meta<typeof Component> = {
  component: Component,
  tags: ["autodocs"],
  title: "components/Logo",
  parameters: {
    docs: {
      description: {
        component: "Vector logo element",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Logo: Story = {
  args: {},
  argTypes: {},
};
