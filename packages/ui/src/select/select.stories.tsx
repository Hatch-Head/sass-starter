import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  type SelectProps,
} from "./select";

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
    <SelectGroup>
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
      <SelectItem value="option3">Option 3</SelectItem>
      <SelectItem value="option4">Option 4</SelectItem>
    </SelectGroup>
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
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
    <SelectItem value="option4">Option 4</SelectItem>
  </Select>
);

WithError.args = {
  error: "Pet type is required",
  label: "Select a pet",
};

export const Grouped: Story = (args: SelectProps) => (
  <Select placeholder="Select a pet" className="w-[180px]" {...args}>
    <SelectGroup>
      <SelectLabel>Dogs</SelectLabel>
      <SelectItem value="French bulldog">French bulldog</SelectItem>
      <SelectItem value="Poodle">Poodle</SelectItem>
      <SelectSeparator />
      <SelectLabel>Cats</SelectLabel>
      <SelectItem value="option1">Siamese</SelectItem>
      <SelectItem value="option2">Tonkinese</SelectItem>
    </SelectGroup>
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
    <SelectGroup>
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2" disabled>
        Option 2
      </SelectItem>
      <SelectItem value="option3">Option 3</SelectItem>
      <SelectItem value="option4">Option 4</SelectItem>
    </SelectGroup>
  </Select>
);
DisabledOptions.args = {};
