import type { Meta, StoryObj } from "@storybook/react";
import Button from "../button/button";
import { Card as Component } from "./card";
const meta: Meta<typeof Component> = {
  component: Component,
  tags: ["autodocs"],
  title: "components/Card",
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

export const Card: Story = {
  args: {},
  argTypes: {},
};

export const Default: Story = () => (
  <Component className="w-[500px]">
    <Component.Header>
      <Component.Title>Card Title</Component.Title>
    </Component.Header>
    <Component.Content>
      <p>Card Content</p>
    </Component.Content>
    <Component.Footer>
      <Button variant="outline">Cancel</Button>
      <Button>Save </Button>
    </Component.Footer>
  </Component>
);

Default.argTypes = {};
