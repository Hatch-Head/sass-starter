import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";

import { expect } from "@storybook/jest";
import Components, { type CheckboxProps } from "./checkbox";

const meta: Meta<typeof Components> = {
  component: Components,
  title: "components/Checkbox",
};

export default meta;
type Story = StoryObj<typeof Components>;

export const Checkbox: Story = {
  args: {
    label: "This is a checkbox",
    description: "This is a description",
    disabled: false,
  },

  argTypes: {
    checked: {
      control: {
        type: "boolean",
      },
    },
    indeterminate: {
      control: {
        type: "boolean",
      },
    },
  },

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Check the checkbox", async () => {
      await userEvent.click(canvas.getByTestId("checkbox-input"));
      await expect(canvas.getByTestId("checkbox-input")).toBeChecked();
    });

    await step("Uncheck the checkbox", async () => {
      await userEvent.click(canvas.getByTestId("checkbox-input"));
      await expect(canvas.getByTestId("checkbox-input")).not.toBeChecked();
    });
  },
};

export const Disabled: Story = {
  args: {
    label: "This is a checkbox",
    description: "This is a description",
    disabled: true,
  },

  argTypes: {
    indeterminate: {
      control: {
        type: "boolean",
      },
    },
  },

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Clicking the checkbox should have no effect", async () => {
      await userEvent.click(canvas.getByTestId("checkbox-input"));
      await expect(canvas.getByTestId("checkbox-input")).not.toBeChecked();
    });
  },
};

export const Indeterminate = (args: CheckboxProps) => {
  return (
    <ul>
      <li>
        <Components label="Option 1" checked={false} />
      </li>
      <li>
        <Components label="Option 2" indeterminate checked={true} />
        <ul className="pl-5">
          <li>
            <Components label="Option 2.1" checked />
          </li>
        </ul>
      </li>
      <li>
        <Components label="Option 3" checked={false} />
      </li>
    </ul>
  );
};
