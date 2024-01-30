import type { Meta, StoryObj } from "@storybook/react";
import Components from "./badge";

const meta: Meta<typeof Components> = {
  component: Components,
  title: "components/Badge",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Badges help highlight important information, such as notifications or new and unread messages. They’re primarily used for communicating secondary or additional information to text.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Components>;

export const Badge: Story = {
  args: {
    children: "Label",
    variant: "success",
    size: "sm",
  },
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: [
        "gray",
        "success",
        "warning",
        "danger",
        "info",
        "blueLight",
        "primary",
        "blueGray",
        "blue",
        "indigo",
        "purple",
        "pink",
        "rose",
        "orange",
      ],
      defaultValue: "blueGray",
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Gx6UxDt0ZjtPD4pYpOjoKI/Hatch-Head-Base-UI-Template-(Copy)?type=design&node-id=12-539&mode=design",
    },
  },
};
