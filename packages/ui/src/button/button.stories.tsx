import type { Meta, StoryObj } from "@storybook/react";
import { ChevronRight, FileEdit } from "lucide-react";
import Button from "./button";

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],
  title: "components/Button",
  parameters: {
    docs: {
      description: {
        component: "Buttons communicate actions that users can take.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

const ICONS = {
  None: undefined,
  FileEdit: <FileEdit />,
  ChevronRight: <ChevronRight />,
};

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  argTypes: {
    variant: {
      options: ["primary", "secondary"],
      control: { type: "select" },
    },
    destructive: { control: "boolean" },
    children: { control: "text", defaultValue: "Button CTA" },
    size: {
      options: ["sm", "md", "lg", "xl", "2xl"],
      control: { type: "select" },
    },
    onClick: {
      control: { action: "clicked" },
    },
    leftIcon: {
      options: Object.keys(ICONS),
      mapping: ICONS,
      control: {
        type: "select",
      },
    },
    rightIcon: {
      options: Object.keys(ICONS),
      mapping: ICONS,
      control: {
        type: "select",
      },
    },
  },
  args: {
    children: "Button CTA",
    size: "md",
    loading: false,
    destructive: false,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Gx6UxDt0ZjtPD4pYpOjoKI/Hatch-Head-Base-UI-Template-(Copy)?type=design&node-id=1038-34411&mode=design&t=TZBuwu1ZT8Jd4Shg-4",
    },
  },
};
