import type { Meta, StoryObj } from "@storybook/react";
import Components from "./avatarGroup";

const meta: Meta<typeof Components> = {
  component: Components,
  title: "components/AvatarGroup",
};

export default meta;
type Story = StoryObj<typeof Components>;

export const AvatarGroup: Story = {
  args: {
    users: [
      { name: "Andrew Morton", tooltip: "Andrew Morton" },
      { name: "Barry Smith", tooltip: "Barry Smith" },
      { name: "C C", url: "https://placebeard.it/250/250" },
      { name: "D D", url: "https://placebeard.it/250/250" },
      { name: "E E" },
      { name: "F F", url: "https://placebeard.it/250/250" },
    ],
    size: "md",
    max: 5,
    onAddUser: undefined,
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
    },
    tooltip: {
      control: { type: "text" },
    },
    onAddUser: {
      action: "onAddUser",
    },
  },
};

export const AddUserButton: Story = {
  args: {
    users: [
      { name: "Andrew Morton", tooltip: "Andrew Morton" },
      { name: "Barry Smith", tooltip: "Barry Smith" },
      { name: "C C" },
      { name: "D D" },
      { name: "E E" },
      { name: "F F" },
    ],
    size: "md",
    max: 5,
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
    },
    tooltip: {
      control: { type: "text" },
    },
    onAddUser: {
      action: "onAddUser",
    },
    onUserClick: {
      action: "onUserClick",
    },
  },
};
