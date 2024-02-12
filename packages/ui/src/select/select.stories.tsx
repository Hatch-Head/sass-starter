import type { Meta, StoryObj } from "@storybook/react";
import { Select, SelectGroup, SelectItem, type SelectProps } from "./select";

const meta: Meta<SelectProps> = {
  component: Select,
  title: "components/Select",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Select is a dropdown component allowing users to choose one option from a list. Use `SelectItem` components to list the options.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = (args: SelectProps) => (
  <Select className="w-[180px]" {...args}>
    <Select.Group>
      <Select.Item value="option1">Option 1</Select.Item>
      <Select.Item value="option2">Option 2</Select.Item>
      <Select.Item value="option3">Option 3</Select.Item>
      <Select.Item value="option4">Option 4</Select.Item>
    </Select.Group>
  </Select>
);

Default.argTypes = {
  isLoading: {
    control: "boolean",
  },
  error: {
    control: "text",
  },
  className: {
    control: "text",
  },
  label: {
    control: "text",
  },
  onValueChange: {
    action: "onValueChange",
  },
  disabled: {
    control: "boolean",
  },
};

Default.args = {
  label: "Label",
  isLoading: false,
  placeholder: "Placeholder",
  description: "Description",
};

export const WithError: Story = (args: SelectProps) => (
  <Select placeholder="Select an option" className="w-[180px]" {...args}>
    <Select.Group>
      <Select.Item value="option1">Option 1</Select.Item>
      <Select.Item value="option2">Option 2</Select.Item>
      <Select.Item value="option3">Option 3</Select.Item>
      <Select.Item value="option4">Option 4</Select.Item>
    </Select.Group>
  </Select>
);

WithError.args = {
  error: "Pet type is required",
  label: "Select a pet",
};

export const Grouped: Story = (args: SelectProps) => (
  <Select placeholder="Select a pet" className="w-[180px]" {...args}>
    <Select.Group>
      <Select.Label>Dogs</Select.Label>
      <Select.Item value="French bulldog">French bulldog</Select.Item>
      <Select.Item value="Poodle">Poodle</Select.Item>
      <Select.Separator />
      <Select.Label>Cats</Select.Label>
      <Select.Item value="option1">Siamese</Select.Item>
      <Select.Item value="option2">Tonkinese</Select.Item>
    </Select.Group>
  </Select>
);

Grouped.args = {};

Grouped.parameters = {
  docs: {
    description: {
      component:
        "Select is a dropdown component allowing users to choose one option from a list. Use `SelectItem` components to list the options.",
    },
  },
};

export const DisabledOptions: Story = (args: SelectProps) => (
  <Select className="w-[180px]" {...args} value="option1">
    <Select.Group>
      <Select.Item value="option1">Option 1</Select.Item>
      <Select.Item value="option2" disabled>
        Option 2
      </Select.Item>
      <Select.Item value="option3">Option 3</Select.Item>
      <Select.Item value="option4">Option 4</Select.Item>
    </Select.Group>
  </Select>
);
DisabledOptions.args = {};

export const Advanced: Story = (args: SelectProps) => (
  <Select className="w-[180px]" {...args} value="option1">
    <SelectGroup>
      <SelectItem value="option1">Option 1</SelectItem>
      <Select.Item value="option2" disabled>
        Option 2
      </Select.Item>
      <Select.Item value="option3">Option 3</Select.Item>
      <Select.Item value="option4">Option 4</Select.Item>
    </SelectGroup>
  </Select>
);
Advanced.args = {};
