import type { Meta, StoryObj } from "@storybook/react";
import Components from "./toggle";

const meta: Meta<typeof Components> = {
  component: Components,
  title: "components/Toggle",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Toggles (also known as “switches”) is a UI control that has two mutually-exclusive states, such as ON and OFF. The design and functionality of this component is based on a physical switch that allows users to turn things ON or OFF. Toggles are a great visual cue for settings, especially on mobile, because they take less screen estate (in comparison with two radio buttons).",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Components>;

export const Toggle: Story = {
  args: {
    label: "This is a toggle",
    description: "This is a description",
    reversed: false,
    disabled: false,
    variant: "primary",
  },
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["primary", "neutral", "success"],
      defaultValue: "primary",
    },
  },
};
