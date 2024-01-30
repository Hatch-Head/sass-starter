import type { Meta, StoryObj } from "@storybook/react";
import Components from "./avatar";

const meta: Meta<typeof Components> = {
  component: Components,
  title: "components/Avatar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Represents a user or entity within the application.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Components>;

export const Avatar: Story = {
  args: {
    name: "Andrew Morton",
    size: "md",
    url: "https://placebeard.it/250/250",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Gx6UxDt0ZjtPD4pYpOjoKI/Hatch-Head-Base-UI-Template-(Copy)?type=design&node-id=18-1350&mode=design",
    },
  },
};

export const NoImage: Story = {
  args: {
    name: "Andrew Morton",
    size: "md",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Gx6UxDt0ZjtPD4pYpOjoKI/Hatch-Head-Base-UI-Template-(Copy)?type=design&node-id=18-1350&mode=design",
    },
  },
};
