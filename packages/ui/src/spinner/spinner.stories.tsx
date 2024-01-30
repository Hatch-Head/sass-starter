import type { Meta, StoryObj } from "@storybook/react";
import Components from "./spinner";

const meta: Meta<typeof Components> = {
  component: Components,
  tags: ["autodocs"],
  title: "components/Spinner",
  parameters: {
    docs: {
      description: {
        component: `The Loader indicates network or processing activity. They can be used as the only element of a page as the content loader, within individual sections of a page as the data is loaded or within buttons as the icon if data is being saved to the server.
          
When displayed, the spinner constantly rotates 360 degrees in a linear motion over 1.3 seconds`,
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Gx6UxDt0ZjtPD4pYpOjoKI/Hatch-Head-Base-UI-Template-(Copy)?type=design&node-id=5307-36690&mode=design&t=VX4WxzhpOoqtm6UJ-4",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Components>;

export const Spinner: Story = {
  args: {
    size: "md",
  },
  argTypes: {
    size: {
      options: ["sm", "md", "lg", "xl"],
      control: { type: "select" },
    },
    variant: {
      options: ["primary", "neutral", "white"],
      control: { type: "select" },
    },
  },
};
