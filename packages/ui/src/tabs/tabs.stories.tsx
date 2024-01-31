import type { Meta, StoryObj } from "@storybook/react";
import Tabs from "./tabs";

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  tags: ["autodocs"],
  title: "components/Tabs",
  parameters: {
    docs: {
      description: {
        component: "Buttons communicate actions that users can take.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = () => (
  <Tabs>
    <Tabs.Tab label="Tab 1">Tab 1 content</Tabs.Tab>
    <Tabs.Tab label="Tab 2">Tab 2 content</Tabs.Tab>
  </Tabs>
);

Default.args = {};
