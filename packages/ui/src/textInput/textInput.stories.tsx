import type { Meta, StoryObj } from "@storybook/react";
import { ChevronRight, FileEdit } from "lucide-react";
import { useState } from "react";
import { Select, SelectItem } from "../select/select";
import Components from "./textInput";

const meta: Meta<typeof Components> = {
  component: Components,
  title: "components/Text Input",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Select is a dropdown component allowing users to choose one option from a list. Use `SelectItem` components to list the options.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Gx6UxDt0ZjtPD4pYpOjoKI/Hatch-Head-Base-UI-Template-(Copy)?type=design&node-id=1090-57817&mode=design&t=VX4WxzhpOoqtm6UJ-4",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Components>;

const ICONS = {
  None: undefined,
  FileEdit: <FileEdit />,
  ChevronRight: <ChevronRight />,
};

export const Default: Story = {
  args: {
    label: "Email",
    isLoading: false,
    description: "This is a hint text to help user.",
    tooltip: {
      title: "Tip",
      // cspell: disable-next-line
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    mask: "",
    placeholder: "name@email.com",
  },
  argTypes: {
    leftAccessory: {
      options: Object.keys(ICONS),
      mapping: ICONS,
      control: {
        type: "select",
      },
    },
    rightAccessory: {
      options: Object.keys(ICONS),
      mapping: ICONS,
      control: {
        type: "select",
      },
    },
    error: {
      control: {
        type: "text",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    defaultValue: {
      control: {
        type: "text",
      },
    },
    onChange: {
      action: "onValueChange",
    },
  },
};

export const WithError: Story = () => {
  const [value, setValue] = useState("us");

  return (
    <Components
      label="Phone number"
      placeholder="Enter a phone number"
      error="Phone number is required"
    />
  );
};

WithError.args = {};
WithError.parameters = {
  docs: {
    description: {
      story: "Error state can be shown by passing an error string.",
    },
  },
};

export const AddOns: Story = () => (
  <div className="flex flex-col space-y-3">
    <Components
      label="Website"
      placeholder="Enter a phone number"
      leftAddon="http://"
    />
    <Components label="Price" placeholder="$0.00" rightAddon="USD" />
  </div>
);
AddOns.args = {};
AddOns.parameters = {
  docs: {
    description: {
      story:
        "Addons can be added to the left or right of the input. Addons support strings or react components.",
    },
  },
};

export const SelectAddon: Story = () => {
  const [value, setValue] = useState("us");
  const [textValue, setTextValue] = useState("");

  return (
    <div className="flex flex-col space-y-4">
      <Components
        label="Phone number"
        placeholder="Enter a phone number"
        onChange={(e) => setTextValue(e.target.value)}
        leftAddon={
          <Select
            asChild
            className="w-[80px]"
            placeholder="$"
            value={value}
            onValueChange={setValue}
          >
            <SelectItem value="us">US</SelectItem>
            <SelectItem value="au">AUD</SelectItem>
          </Select>
        }
      />
      <code className="w-[302px] rounded-lg bg-gray-100 p-4 text-sm text-gray-600">
        <pre>{JSON.stringify({ selectValue: value, textValue }, null, 4)}</pre>
      </code>
    </div>
  );
};

SelectAddon.args = {};
SelectAddon.parameters = {
  docs: {
    description: {
      story:
        "Example using a `<Select />` component as an addon using the `asChild` prop to removing select styling. Note that the value of each element is managed individually.",
    },
    source: {
      code: `
import Select from '@ui/select';
import TextInput from '@ui/textInput';

const [value, setValue] = useState("us");
const [textValue, setTextValue] = useState("");

<TextInput
  label="Phone number"
  placeholder="Enter a phone number"
  onChange={(e) => setTextValue(e.target.value)}
  addon={
    <Select
      asChild
      className="w-[80px]"
      placeholder="$"
    >
      <SelectItem value="us">US</SelectItem>
      <SelectItem value="au">AUD</SelectItem>
    </Select>
  }
/>
      `,
    },
  },
};

export const RightAddOn: Story = () => {
  const [value, setValue] = useState("us");

  return (
    <div className="flex flex-col space-y-4">
      <Components
        label="Phone number"
        placeholder="Enter a phone number"
        rightAddon={
          <Select
            asChild
            className="w-[80px]"
            placeholder="$"
            value={value}
            align="end"
            onValueChange={setValue}
          >
            <SelectItem value="us">US</SelectItem>
            <SelectItem value="au">AUD</SelectItem>
          </Select>
        }
      />
    </div>
  );
};

RightAddOn.args = {};

RightAddOn.parameters = {
  docs: {
    description: {
      story:
        "Using a select as a right addon requires setting the correct `align` prop on the ```<Select />``` component.",
    },
    source: {
      code: `
import { Select, SelectItem } from '@ui/select';
import TextInput from '@ui/textInput';

<TextInput
  label="Phone number"
  placeholder="Enter a phone number"
  rightAddon={
    <Select
      asChild
      className="w-[80px]"
      placeholder="$"
      value={value}
      align="end"
      onValueChange={setValue}
    >
      <SelectItem value="us">US</SelectItem>
      <SelectItem value="au">AUD</SelectItem>
    </Select>
  }
/>
      `,
    },
  },
};

export const InputMasks: Story = () => {
  return (
    <Components
      label="Credit card"
      placeholder="Enter a credit card number"
      mask={"9999 9999 9999 9999"}
      maskChar={" "}
      className="w-[260px]"
    />
  );
};

InputMasks.args = {};
InputMasks.parameters = {
  docs: {
    description: {
      story: "The component supports input masks to properly format strings.",
    },
    source: {
      code: `
import TextInput from '@ui/textInput';

<TextInput
  label="Credit card"
  placeholder="Enter a credit card number"
  mask={"9999 9999 9999 9999"}
  maskChar={" "}
  className="w-[260px]"
/>

      `,
    },
  },
};
